import { Injectable, inject } from '@angular/core';
import { AuthService } from '../../auth/auth-service';
import { supabase } from '../../cloud/supabase.client';
import {
  CloudSubscriptionPayment,
  UpdateCloudSubscriptionPaymentPayload,
  CloudSubscription,
  CreateCloudSubscriptionPaymentPayload,
} from '../../models/interface/core.interface';
import { CloudExpensesService } from '../cloud-expenses/cloud-expenses-service';
import { CloudSubscriptionsService } from '../cloud-subscriptions/cloud-subscriptions-service';

@Injectable({
  providedIn: 'root',
})
export class CloudSubscriptionPaymentsService {
  private readonly authService: AuthService = inject<AuthService>(AuthService);
  private readonly cloudSubscriptionsService: CloudSubscriptionsService =
    inject<CloudSubscriptionsService>(CloudSubscriptionsService);
  private readonly cloudExpensesService: CloudExpensesService =
    inject<CloudExpensesService>(CloudExpensesService);

  public async getPaymentsForPeriod(
    periodStart: string,
    includeCleared = false,
  ): Promise<CloudSubscriptionPayment[]> {
    const userId = this.authService.getCurrentUserId();

    let query = supabase
      .from('subscription_payments')
      .select('*')
      .eq('user_id', userId)
      .eq('period_start', periodStart)
      .is('deleted_at', null)
      .order('due_date', { ascending: true });

    if (!includeCleared) {
      query = query.is('cleared_at', null);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data ?? [];
  }

  public async ensurePaymentsForPeriod(
    periodStart: string,
    periodEnd: string,
  ): Promise<CloudSubscriptionPayment[]> {
    const userId = this.authService.getCurrentUserId();

    const subscriptions = await this.cloudSubscriptionsService.getActiveSubscriptions();

    const allExistingPayments = await this.getPaymentsForPeriod(periodStart, true);

    const existingPaymentKeys = new Set(
      allExistingPayments.map((payment) => payment.subscription_id),
    );

    const missingPaymentsPayload = subscriptions
      .filter((subscription) =>
        this.subscriptionAppliesToPeriod(subscription, periodStart, periodEnd),
      )
      .filter((subscription) => !existingPaymentKeys.has(subscription.id))
      .map((subscription) => this.buildPaymentPayload(userId, subscription, periodStart));

    if (missingPaymentsPayload.length) {
      const { error } = await supabase.from('subscription_payments').insert(missingPaymentsPayload);

      if (error) throw error;
    }

    return this.getPaymentsForPeriod(periodStart);
  }

  public async clearCompletedPaymentsForPeriod(periodStart: string): Promise<void> {
    const userId = this.authService.getCurrentUserId();

    const { error } = await supabase
      .from('subscription_payments')
      .update({
        cleared_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .eq('period_start', periodStart)
      .is('deleted_at', null)
      .is('cleared_at', null)
      .in('status', ['paid', 'skipped']);

    if (error) throw error;
  }

  public async updatePayment(
    id: string,
    payload: UpdateCloudSubscriptionPaymentPayload,
  ): Promise<CloudSubscriptionPayment> {
    const userId = this.authService.getCurrentUserId();

    const { data, error } = await supabase
      .from('subscription_payments')
      .update({
        ...payload,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  public async markPaymentAsSkipped(paymentId: string): Promise<CloudSubscriptionPayment> {
    return this.updatePayment(paymentId, {
      status: 'skipped',
      paid_at: null,
      cleared_at: null,
    });
  }

  public async markPaymentAsPaid(
    payment: CloudSubscriptionPayment,
    subscription: CloudSubscription,
  ): Promise<CloudSubscriptionPayment> {
    await this.cloudExpensesService.createOrUpdateSubscriptionExpense({
      paymentId: payment.id,
      subscriptionName: subscription.name,
      amount: payment.amount,
      expenseDate: payment.due_date,
      categoryType: subscription.category_type,
    });

    return this.updatePayment(payment.id, {
      status: 'paid',
      paid_at: new Date().toISOString(),
      cleared_at: null,
    });
  }

  public async updatePendingPaymentFromSubscription(
    payment: CloudSubscriptionPayment,
    subscription: CloudSubscription,
  ): Promise<CloudSubscriptionPayment> {
    if (payment.status !== 'pending') {
      return payment;
    }

    return this.updatePayment(payment.id, {
      amount: subscription.amount,
      currency: subscription.currency,
      due_date: this.getDueDate(payment.period_start, subscription.due_day),
    });
  }

  public async softDeletePayment(paymentId: string): Promise<void> {
    const userId = this.authService.getCurrentUserId();

    const { error } = await supabase
      .from('subscription_payments')
      .update({
        deleted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', paymentId)
      .eq('user_id', userId);

    if (error) throw error;
  }

  public async getPayments(): Promise<CloudSubscriptionPayment[]> {
    const userId = this.authService.getCurrentUserId();

    const { data, error } = await supabase
      .from('subscription_payments')
      .select('*')
      .eq('user_id', userId)
      .is('deleted_at', null)
      .order('period_start', { ascending: false })
      .order('due_date', { ascending: true });

    if (error) throw error;

    return data ?? [];
  }

  private buildPaymentPayload(
    userId: string,
    subscription: CloudSubscription,
    periodStart: string,
  ): CreateCloudSubscriptionPaymentPayload {
    return {
      user_id: userId,
      subscription_id: subscription.id,
      period_start: periodStart,
      due_date: this.getDueDate(periodStart, subscription.due_day),
      amount: subscription.amount,
      currency: subscription.currency,
      status: 'pending',
      paid_at: null,
    };
  }

  private subscriptionAppliesToPeriod(
    subscription: CloudSubscription,
    periodStart: string,
    periodEnd: string,
  ): boolean {
    const startsBeforePeriodEnds = subscription.start_date <= periodEnd;
    const hasNoEndDate = !subscription.end_date;
    const endsAfterPeriodStarts = hasNoEndDate || subscription.end_date! >= periodStart;

    return startsBeforePeriodEnds && endsAfterPeriodStarts;
  }

  private getDueDate(periodStart: string, dueDay: number): string {
    const [year, month] = periodStart.split('-').map(Number);

    const lastDayOfMonth = new Date(year, month, 0).getDate();
    const safeDueDay = Math.min(dueDay, lastDayOfMonth);

    return this.formatDateOnly(new Date(year, month - 1, safeDueDay));
  }

  private formatDateOnly(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
