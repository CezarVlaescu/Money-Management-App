import { Injectable, inject } from '@angular/core';
import { CloudRestoreService } from '../cloud-restore/cloud-restore-service';
import { CloudSyncStatusService } from '../cloud-sync-status/cloud-sync-status-service';
import { CLOUD_RESTORE_PROMPT_KEY } from '../../../shared/constants/app.constants';
import { BudgetService } from '../../services/budget/budget';
import { ExpensesService } from '../../services/expenses/expenses';
import { SavingsGoalsService } from '../../services/savings/savings';
import { ConfirmDialogService } from '../../services/confirm-dialog/confirm-dialog-service';

@Injectable({
  providedIn: 'root',
})
export class CloudRestorePromptService {
  private readonly budgetService: BudgetService = inject<BudgetService>(BudgetService);
  private readonly expensesService: ExpensesService = inject<ExpensesService>(ExpensesService);
  private readonly savingsGoalsService: SavingsGoalsService =
    inject<SavingsGoalsService>(SavingsGoalsService);
  private readonly confirmDialogService: ConfirmDialogService =
    inject<ConfirmDialogService>(ConfirmDialogService);
  private readonly cloudRestoreService: CloudRestoreService =
    inject<CloudRestoreService>(CloudRestoreService);
  private readonly cloudSyncStatusService: CloudSyncStatusService =
    inject<CloudSyncStatusService>(CloudSyncStatusService);

  public async askToRestoreCloudDataIfNeeded(): Promise<void> {
    const status = await this.cloudSyncStatusService.getCloudSyncStatus();

    if (!status.hasCloudData) return;

    if (this.isLocalDataEmpty()) {
      await this.cloudRestoreService.restoreCloudDataToLocal();
      this.markPromptAsShown();
      return;
    }

    if (this.wasPromptAlreadyShown()) return;

    const shouldRestore = await this.confirmDialogService.confirm({
      title: 'Cloud backup found',
      message: `We found ${status.expensesCount} expenses and ${status.goalsCount} savings goals saved in your cloud account. Restore them on this device?`,
      confirmLabel: 'Restore',
      cancelLabel: 'Not now',
    });

    this.markPromptAsShown();

    if (!shouldRestore) return;

    await this.cloudRestoreService.restoreCloudDataToLocal();
  }

  public resetPromptState(): void {
    localStorage.removeItem(CLOUD_RESTORE_PROMPT_KEY);
  }

  private isLocalDataEmpty(): boolean {
    return (
      this.budgetService.income() <= 0 &&
      this.expensesService.expenses().length === 0 &&
      this.savingsGoalsService.goals().length === 0
    );
  }

  private wasPromptAlreadyShown(): boolean {
    return localStorage.getItem(CLOUD_RESTORE_PROMPT_KEY) === 'true';
  }

  private markPromptAsShown(): void {
    localStorage.setItem(CLOUD_RESTORE_PROMPT_KEY, 'true');
  }
}
