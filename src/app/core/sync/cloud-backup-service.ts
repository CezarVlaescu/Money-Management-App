import { Injectable, inject } from '@angular/core';
import { BudgetService } from '../services/budget/budget';
import { ExpensesService } from '../services/expenses/expenses';
import { SavingsGoalsService } from '../services/savings/savings';
import { ThemeService } from '../services/theme/theme';
import { CloudExpensesService } from '../services/cloud-expenses/cloud-expenses-service';
import { CloudSavingsGoalsService } from '../services/cloud-savings-goals/cloud-savings-goals-service';
import { CloudUserSettingsService } from '../services/cloud-user-settings/cloud-user-settings-service';


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

  public async backupLocalDataToCloud(): Promise<void> {
    await this.backupUserSettings();
    await this.backupExpenses();
    await this.backupSavingsGoals();
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
    const expenses = this.expensesService.expenses();

    if (!expenses.length) return;

    const payload = expenses.map(expense => ({
      local_id: this.getStringValue(expense, 'id'),
      title: this.getStringValue(expense, 'title', 'Untitled expense'),
      amount: this.getNumberValue(expense, 'amount'),
      category: this.getStringValue(expense, 'category', 'wants'),
      expense_date: this.getDateValue(expense, ['date', 'expenseDate', 'createdAt']),
      note: this.getNullableStringValue(expense, 'note')
    }));

    await this.cloudExpensesService.upsertExpenses(payload);
  }

  private async backupSavingsGoals(): Promise<void> {
    const goals = this.savingsGoalsService.goals();

    if (!goals.length) return;

    const payload = goals.map(goal => ({
      local_id: this.getStringValue(goal, 'id'),
      name: this.getStringFromKeys(goal, ['name', 'title', 'label'], 'Untitled goal'),
      target_amount: this.getNumberValue(goal, 'targetAmount'),
      current_amount: this.getNumberValue(goal, 'currentAmount'),
      deadline: this.getNullableDateValue(goal, ['deadline', 'targetDate']),
      icon: this.getNullableStringValue(goal, 'icon')
    }));

    await this.cloudSavingsGoalsService.upsertGoals(payload);
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
}
