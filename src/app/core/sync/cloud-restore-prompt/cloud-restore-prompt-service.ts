import { Injectable, inject } from '@angular/core';
import { CloudRestoreService } from '../cloud-restore/cloud-restore-service';
import { CloudSyncStatusService } from '../cloud-sync-status/cloud-sync-status-service';
import { CLOUD_RESTORE_PROMPT_KEY } from '../../../shared/constants/app.constants';
import { BudgetService } from '../../services/budget/budget';
import { ExpensesService } from '../../services/expenses/expenses';
import { SavingsGoalsService } from '../../services/savings/savings';
import { ConfirmDialogService } from '../../services/confirm-dialog/confirm-dialog-service';
import { CloudSyncStatus } from '../../models/interface/core.interface';

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
      message: this.getRestorePromptMessage(status),
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

  private getRestorePromptMessage(status: CloudSyncStatus): string {
    const parts: string[] = [];

    if (status.expensesCount > 0) {
      parts.push(`${status.expensesCount} expenses`);
    }

    if (status.goalsCount > 0) {
      parts.push(`${status.goalsCount} savings goals`);
    }

    if (status.savingsAccountsCount > 0) {
      parts.push(`${status.savingsAccountsCount} savings places`);
    }

    if (status.spendingPeriodsCount > 0) {
      parts.push(`${status.spendingPeriodsCount} spending periods`);
    }

    if (status.subscriptionsCount > 0) {
      parts.push(`${status.subscriptionsCount} recurring payments`);
    }

    if (status.subscriptionPaymentsCount > 0) {
      parts.push(`${status.subscriptionPaymentsCount} recurring payment records`);
    }

    const cloudDataLabel = parts.length ? parts.join(', ') : 'cloud data';

    return `We found ${cloudDataLabel} saved in your cloud account. Restore them on this device?`;
  }
}
