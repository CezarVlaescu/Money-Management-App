import { Injectable, inject } from '@angular/core';
import { CloudSyncStatus } from '../../models/interface';
import { CloudExpensesService } from '../../services/cloud-expenses/cloud-expenses-service';
import { CloudSavingsGoalsService } from '../../services/cloud-savings-goals/cloud-savings-goals-service';
import { CloudUserSettingsService } from '../../services/cloud-user-settings/cloud-user-settings-service';
import { SpendingPeriodsService } from '../../services/spending-periods/spending-periods-service';
import { CloudSubscriptionsService } from '../../services/cloud-subscriptions/cloud-subscriptions-service';
import { CloudSubscriptionPaymentsService } from '../../services/cloud-subscription-payments/cloud-subscription-payments-service';
import { CloudSavingsAccountsService } from '../../services/cloud-savings-accounts/cloud-savings-accounts-service';

@Injectable({
  providedIn: 'root',
})
export class CloudSyncStatusService {
  private readonly cloudExpensesService: CloudExpensesService =
    inject<CloudExpensesService>(CloudExpensesService);
  private readonly cloudSavingsGoalsService: CloudSavingsGoalsService =
    inject<CloudSavingsGoalsService>(CloudSavingsGoalsService);
  private readonly cloudUserSettingsService: CloudUserSettingsService =
    inject<CloudUserSettingsService>(CloudUserSettingsService);

  private readonly cloudSpendingPeriodsService: SpendingPeriodsService =
    inject<SpendingPeriodsService>(SpendingPeriodsService);

  private readonly cloudSubscriptionsService: CloudSubscriptionsService =
    inject<CloudSubscriptionsService>(CloudSubscriptionsService);

  private readonly cloudSubscriptionPaymentsService: CloudSubscriptionPaymentsService =
    inject<CloudSubscriptionPaymentsService>(CloudSubscriptionPaymentsService);
  private readonly cloudSavingsAccountsService: CloudSavingsAccountsService =
    inject<CloudSavingsAccountsService>(CloudSavingsAccountsService);

  public async getCloudSyncStatus(): Promise<CloudSyncStatus> {
    const [
      settings,
      expenses,
      goals,
      spendingPeriods,
      subscriptions,
      subscriptionPayments,
      savingsAccounts,
    ] = await Promise.all([
      this.cloudUserSettingsService.getSettings(),
      this.cloudExpensesService.getExpenses(),
      this.cloudSavingsGoalsService.getGoals(),
      this.cloudSpendingPeriodsService.getSpendingPeriods(),
      this.cloudSubscriptionsService.getSubscriptions(),
      this.cloudSubscriptionPaymentsService.getPayments(),
      this.cloudSavingsAccountsService.getSavingsAccounts(),
    ]);

    return {
      hasCloudData:
        !!settings ||
        expenses.length > 0 ||
        goals.length > 0 ||
        spendingPeriods.length > 0 ||
        subscriptions.length > 0 ||
        subscriptionPayments.length > 0 ||
        savingsAccounts.length > 0,

      hasSettings: !!settings,

      expensesCount: expenses.length,
      goalsCount: goals.length,

      spendingPeriodsCount: spendingPeriods.length,
      subscriptionsCount: subscriptions.length,
      subscriptionPaymentsCount: subscriptionPayments.length,

      savingsAccountsCount: savingsAccounts.length,

      checkedAt: new Date().toISOString(),
    };
  }
}
