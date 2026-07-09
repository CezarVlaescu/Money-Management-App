import { Injectable, inject } from '@angular/core';
import { AuthService } from '../../auth/auth-service';
import {
  CloudExpense,
  CreateCloudExpensePayload,
  CreateSubscriptionExpenseParams,
  UpdateCloudExpensePayload,
} from '../../models/interface/core.interface';
import { supabase } from '../../cloud/supabase.client';

@Injectable({
  providedIn: 'root',
})
export class CloudExpensesService {
  private readonly authService: AuthService = inject<AuthService>(AuthService);

  public async softDeleteExpenses(ids: string[]): Promise<void> {
    if (!ids.length) return;

    const userId = this.authService.getCurrentUserId();
    const { error } = await supabase
      .from('expenses')
      .update({ deleted_at: new Date().toISOString() })
      .eq('user_id', userId)
      .in('id', ids);

    if (error) throw error;
  }

  public async getExpenses(): Promise<CloudExpense[]> {
    const userId = this.authService.getCurrentUserId();

    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .eq('user_id', userId)
      .is('deleted_at', null)
      .order('expense_date', { ascending: false });

    if (error) throw error;

    return data ?? [];
  }

  public async createExpense(
    payload: Omit<CreateCloudExpensePayload, 'user_id'>,
  ): Promise<CloudExpense> {
    const userId = this.authService.getCurrentUserId();

    const { data, error } = await supabase
      .from('expenses')
      .insert({ ...payload, user_id: userId })
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  public async updateExpense(
    id: string,
    payload: UpdateCloudExpensePayload,
  ): Promise<CloudExpense> {
    const userId = this.authService.getCurrentUserId();

    const { data, error } = await supabase
      .from('expenses')
      .update(payload)
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  public async softDeleteExpense(id: string): Promise<void> {
    const userId = this.authService.getCurrentUserId();

    const { error } = await supabase
      .from('expenses')
      .update({
        deleted_at: new Date().toISOString(),
      })
      .eq('id', id)
      .eq('user_id', userId);

    if (error) throw error;
  }

  public async upsertExpenses(
    expenses: Omit<CreateCloudExpensePayload, 'user_id'>[],
  ): Promise<CloudExpense[]> {
    const userId = this.authService.getCurrentUserId();

    const payload = expenses.map((expense) => ({
      ...expense,
      user_id: userId,
    }));

    const { data, error } = await supabase
      .from('expenses')
      .upsert(payload, { onConflict: 'user_id,local_id' })
      .select();

    if (error) throw error;

    return data ?? [];
  }

  public async getExpensesByDateRange(startDate: string, endDate: string): Promise<CloudExpense[]> {
    const userId = this.authService.getCurrentUserId();
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .eq('user_id', userId)
      .is('deleted_at', null)
      .gte('expense_date', startDate)
      .lte('expense_date', endDate)
      .order('expense_date', { ascending: false });

    if (error) throw error;

    return data ?? [];
  }

  public async createOrUpdateSubscriptionExpense(
    params: CreateSubscriptionExpenseParams,
  ): Promise<CloudExpense> {
    const userId = this.authService.getCurrentUserId();

    const payload: CreateCloudExpensePayload = {
      user_id: userId,
      local_id: `subscription-${params.paymentId}`,
      title: params.subscriptionName,
      amount: params.amount,
      category: params.categoryType,
      expense_date: params.expenseDate,
      source_type: 'subscription',
      subscription_payment_id: params.paymentId,
      note: 'Recurring payment',
    };

    const { data, error } = await supabase
      .from('expenses')
      .upsert(payload, { onConflict: 'user_id,local_id' })
      .select()
      .single();

    if (error) throw error;

    return data;
  }
}
