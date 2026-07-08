import { Injectable, inject } from '@angular/core';
import { BudgetService } from '../../services/budget/budget';
import { ExpensesService } from '../../services/expenses/expenses';
import { SavingsGoalsService } from '../../services/savings/savings';
import { ThemeService } from '../../services/theme/theme';
import { CloudExpensesService } from '../../services/cloud-expenses/cloud-expenses-service';
import { CloudSavingsGoalsService } from '../../services/cloud-savings-goals/cloud-savings-goals-service';
import { CloudUserSettingsService } from '../../services/cloud-user-settings/cloud-user-settings-service';
import { CloudSyncMetaService } from '../cloud-sync-meta/cloud-sync-meta-service';
import { LocalDeletionTombstoneService } from '../local-deletion-tombstone/local-deletion-tombstone-service';


@Injectable({
  providedIn: 'root'
})
export class CloudBackupService {
  private readonly budgetService: BudgetService = inject<BudgetService>(BudgetService);
  private readonly expensesService: ExpensesService = inject<ExpensesService>(ExpensesService);
  private readonly savingsGoalsService: SavingsGoalsService = inject<SavingsGoalsService>(SavingsGoalsService);
  private readonly themeService: ThemeService = inject<ThemeService>(ThemeService);
  private readonly cloudExpensesService: CloudExpensesService = inject<CloudExpensesService>(CloudExpensesService);
  private readonly cloudSavingsGoalsService: CloudSavingsGoalsService = inject<CloudSavingsGoalsService>(CloudSavingsGoalsService);
  private readonly cloudUserSettingsService: CloudUserSettingsService = inject<CloudUserSettingsService>(CloudUserSettingsService);
  private readonly cloudSyncMetaService: CloudSyncMetaService = inject<CloudSyncMetaService>(CloudSyncMetaService);
  private readonly localDeletionTombstoneService: LocalDeletionTombstoneService = inject<LocalDeletionTombstoneService>(LocalDeletionTombstoneService);

  public async backupLocalDataToCloud(): Promise<void> {
    try {
      this.cloudSyncMetaService.markSyncing();
      
      await this.backupUserSettings();
      await this.backupExpenses();
      await this.backupSavingsGoals();

      this.cloudSyncMetaService.markBackupSuccess();
    } 
    catch (error) {
      this.cloudSyncMetaService.markError(error);
      throw error;
    }
  }

  private async backupUserSettings(): Promise<void> {
    await this.cloudUserSettingsService.upsertSettings({
      monthly_income: this.budgetService.income(),
      currency: 'RON',
      needs_percentage: 50,
      wants_percentage: 30,
      savings_percentage: 20,
      theme: this.themeService.isDarkMode() ? 'dark' : 'light'
    });
  }

  private async backupExpenses(): Promise<void> {
    const localExpenses = this.expensesService.expenses();
    const cloudExpenses = await this.cloudExpensesService.getExpenses();
    const cloudExpensesByLocalId = new Map(
    cloudExpenses
      .filter(expense => !!expense.local_id)
      .map(expense => [expense.local_id as string, expense])
    );

    const payloadWithMeta = localExpenses.map(expense => ({
      local_id: this.getStringValue(expense, 'id'),
      title: this.getStringValue(expense, 'title', 'Untitled expense'),
      amount: this.getNumberValue(expense, 'amount'),
      category: this.getStringValue(expense, 'category', 'wants'),
      expense_date: this.getDateValue(expense, ['date', 'expenseDate', 'createdAt']),
      note: this.getNullableStringValue(expense, 'note'),
      localUpdatedAt: this.getLocalUpdatedAt(expense)
    }));

    const expensesToUpload = payloadWithMeta
    .filter(expense => {
      const cloudExpense = expense.local_id
      ? cloudExpensesByLocalId.get(expense.local_id)
      : undefined;

      if (!cloudExpense) return true;

      return this.isLocalNewerOrEqual(expense.localUpdatedAt, cloudExpense.updated_at);
    })
    .map(expense => ({
      local_id: expense.local_id,
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      expense_date: expense.expense_date,
      note: expense.note
    }));

    if (expensesToUpload.length) await this.cloudExpensesService.upsertExpenses(expensesToUpload);

    await this.syncDeletedExpenses(cloudExpensesByLocalId);
  }

  private async backupSavingsGoals(): Promise<void> {
    const localGoals = this.savingsGoalsService.goals();
    const cloudGoals = await this.cloudSavingsGoalsService.getGoals();
    const cloudGoalsByLocalId = new Map(
      cloudGoals
      .filter(goal => !!goal.local_id)
      .map(goal => [goal.local_id as string, goal])
    );

    const payloadWithMeta = localGoals.map(goal => ({
      local_id: this.getStringValue(goal, 'id'),
      name: this.getStringFromKeys(goal, ['name', 'title', 'label'], 'Untitled goal'),
      target_amount: this.getNumberValue(goal, 'targetAmount'),
      current_amount: this.getNumberValue(goal, 'currentAmount'),
      deadline: this.getNullableDateValue(goal, ['deadline', 'targetDate']),
      icon: this.getNullableStringValue(goal, 'icon'),
      localUpdatedAt: this.getLocalUpdatedAt(goal)
    }));

    const goalsToUpload = payloadWithMeta
    .filter(goal => {
      const cloudGoal = goal.local_id
      ? cloudGoalsByLocalId.get(goal.local_id)
      : undefined;

      if (!cloudGoal) return true;

      return this.isLocalNewerOrEqual(goal.localUpdatedAt, cloudGoal.updated_at);
    })
    .map(goal => ({
      local_id: goal.local_id,
      name: goal.name,
      target_amount: goal.target_amount,
      current_amount: goal.current_amount,
      deadline: goal.deadline,
      icon: goal.icon
    }));

    if (goalsToUpload.length) await this.cloudSavingsGoalsService.upsertGoals(goalsToUpload);

    await this.syncDeletedGoals(cloudGoalsByLocalId);
  }

  private getStringValue<T extends object>(
    item: T,
    key: string,
    fallback = ''
  ): string {
    const value = this.getValue(item, key);
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return String(value);
    return fallback;
  }

  private getNullableStringValue<T extends object>(
    item: T,
    key: string
  ): string | null {
    const value = this.getValue(item, key);
    if (typeof value === 'string' && value.trim()) return value;
    return null;
  }

  private getNumberValue<T extends object>(
    item: T,
    key: string
  ): number {
    const value = this.getValue(item, key);
    if (typeof value === 'number') return value;

    if (typeof value === 'string') {
      const parsedValue = Number(value);
      return Number.isFinite(parsedValue) ? parsedValue : 0;
    }

    return 0;
  }

  private getDateValue<T extends object>(
    item: T,
    keys: string[]
  ): string {
    return this.getNullableDateValue(item, keys) ?? new Date().toISOString().slice(0, 10);
  }

  private getNullableDateValue<T extends object>(
    item: T,
    keys: string[]
  ): string | null {
    for (const key of keys) {
      const value = this.getValue(item, key);
      if (value instanceof Date) return value.toISOString().slice(0, 10);
      if (typeof value === 'string' && value.trim()) return value.slice(0, 10);
    }

    return null;
  }

  private getValue<T extends object>(item: T, key: string): unknown {
    return (item as Record<string, unknown>)[key];
  }

  private getStringFromKeys<T extends object>(
  item: T,
  keys: string[],
  fallback = ''
  ): string {
    for (const key of keys) {
      const value = this.getValue(item, key);

      if (typeof value === 'string' && value.trim()) return value;
      if (typeof value === 'number') return String(value);
    }

    return fallback;
  }

  private async syncDeletedExpenses(
    cloudExpensesByLocalId: Map<string, { id: string; updated_at: string }>
  ): Promise<void> {
    const tombstones = this.localDeletionTombstoneService.getByEntityType('expense');

    if (!tombstones.length) return;

    const cloudIdsToDelete: string[] = [];
    const processedLocalIds: string[] = [];

    for (const tombstone of tombstones) {
      const cloudExpense = cloudExpensesByLocalId.get(tombstone.localId);

      if (!cloudExpense) {
        processedLocalIds.push(tombstone.localId);
        continue;
      }

      if (this.isLocalNewerOrEqual(tombstone.deletedAt, cloudExpense.updated_at)) {
        cloudIdsToDelete.push(cloudExpense.id);
      }

      processedLocalIds.push(tombstone.localId);
    }

    if (cloudIdsToDelete.length) await this.cloudExpensesService.softDeleteExpenses(cloudIdsToDelete);

    this.localDeletionTombstoneService.remove('expense', processedLocalIds);
  }

  private async syncDeletedGoals(
    cloudGoalsByLocalId: Map<string, { id: string; updated_at: string }>
  ): Promise<void> {
    const tombstones = this.localDeletionTombstoneService.getByEntityType('goal');

    if (!tombstones.length) return;

    const cloudIdsToDelete: string[] = [];
    const processedLocalIds: string[] = [];

    for (const tombstone of tombstones) {
      const cloudGoal = cloudGoalsByLocalId.get(tombstone.localId);

      if (!cloudGoal) {
        processedLocalIds.push(tombstone.localId);
        continue;
      }

      if (this.isLocalNewerOrEqual(tombstone.deletedAt, cloudGoal.updated_at)) cloudIdsToDelete.push(cloudGoal.id);

      processedLocalIds.push(tombstone.localId);
    }

    if (cloudIdsToDelete.length) await this.cloudSavingsGoalsService.softDeleteGoals(cloudIdsToDelete);

    this.localDeletionTombstoneService.remove('goal', processedLocalIds);
  }

  private getLocalUpdatedAt<T extends object>(item: T): string {
    const updatedAt = this.getValue(item, 'updatedAt');

    if (typeof updatedAt === 'string' && updatedAt.trim()) return updatedAt;

    const createdAt = this.getValue(item, 'createdAt');

    if (typeof createdAt === 'string' && createdAt.trim()) return createdAt;

    return '1970-01-01T00:00:00.000Z';
  }

  private isLocalNewerOrEqual(localUpdatedAt: string, cloudUpdatedAt: string): boolean {
    return new Date(localUpdatedAt).getTime() >= new Date(cloudUpdatedAt).getTime();
  }
}
