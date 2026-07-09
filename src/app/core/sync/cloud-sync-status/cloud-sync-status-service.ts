import { Injectable, inject } from '@angular/core';
import { CloudSyncStatus } from '../../models/interface/core.interface';
import { CloudExpensesService } from '../../services/cloud-expenses/cloud-expenses-service';
import { CloudSavingsGoalsService } from '../../services/cloud-savings-goals/cloud-savings-goals-service';
import { CloudUserSettingsService } from '../../services/cloud-user-settings/cloud-user-settings-service';

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

  public async getCloudSyncStatus(): Promise<CloudSyncStatus> {
    const [settings, expenses, goals] = await Promise.all([
      this.cloudUserSettingsService.getSettings(),
      this.cloudExpensesService.getExpenses(),
      this.cloudSavingsGoalsService.getGoals(),
    ]);

    return {
      hasCloudData: !!settings || expenses.length > 0 || goals.length > 0,
      hasSettings: !!settings,
      expensesCount: expenses.length,
      goalsCount: goals.length,
      checkedAt: new Date().toISOString(),
    };
  }
}
