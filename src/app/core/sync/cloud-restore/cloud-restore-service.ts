import { Injectable, inject } from '@angular/core';
import { CloudRestoreResult, CloudUserSettings, CloudExpense, CloudSavingsGoal, Expense, SavingsGoal } from '../../models/interface/core.interface';
import { BudgetService } from '../../services/budget/budget';
import { CloudExpensesService } from '../../services/cloud-expenses/cloud-expenses-service';
import { CloudSavingsGoalsService } from '../../services/cloud-savings-goals/cloud-savings-goals-service';
import { CloudUserSettingsService } from '../../services/cloud-user-settings/cloud-user-settings-service';
import { ExpensesService } from '../../services/expenses/expenses';
import { SavingsGoalsService } from '../../services/savings/savings';
import { ThemeService } from '../../services/theme/theme';
import { CloudSyncMetaService } from '../cloud-sync-meta/cloud-sync-meta-service';

@Injectable({
  providedIn: 'root'
})
export class CloudRestoreService {
  private readonly budgetService: BudgetService = inject<BudgetService>(BudgetService);
  private readonly expensesService: ExpensesService = inject<ExpensesService>(ExpensesService);
  private readonly savingsGoalsService: SavingsGoalsService = inject<SavingsGoalsService>(SavingsGoalsService);
  private readonly themeService: ThemeService = inject<ThemeService>(ThemeService);
  private readonly cloudExpensesService: CloudExpensesService = inject<CloudExpensesService>(CloudExpensesService);
  private readonly cloudSavingsGoalsService: CloudSavingsGoalsService = inject<CloudSavingsGoalsService>(CloudSavingsGoalsService);
  private readonly cloudUserSettingsService: CloudUserSettingsService = inject<CloudUserSettingsService>(CloudUserSettingsService);
  private readonly cloudSyncMetaService: CloudSyncMetaService = inject<CloudSyncMetaService>(CloudSyncMetaService);

  public async restoreCloudDataToLocal(): Promise<CloudRestoreResult> {
    try {
      const [settings, expenses, goals] = await Promise.all([
        this.cloudUserSettingsService.getSettings(),
        this.cloudExpensesService.getExpenses(),
        this.cloudSavingsGoalsService.getGoals()
      ]);

      if (settings) this.restoreSettings(settings);

      this.expensesService.replaceExpenses(expenses.map(expense => this.mapCloudExpenseToLocalExpense(expense)));
      this.savingsGoalsService.replaceGoals(goals.map(goal => this.mapCloudGoalToLocalGoal(goal)));
      this.cloudSyncMetaService.markRestoreSuccess();

      return { settingsRestored: !!settings, expensesCount: expenses.length, goalsCount: goals.length };
    } 
    catch (error) {
      this.cloudSyncMetaService.markError(error);
      throw error;
    }
  }

  private restoreSettings(settings: CloudUserSettings): void {
    this.budgetService.setIncome(Number(settings.monthly_income));

    if (settings.theme === 'dark' && !this.themeService.isDarkMode()) this.themeService.toggleTheme();
    if (settings.theme === 'light' && this.themeService.isDarkMode()) this.themeService.toggleTheme();
  }

  private mapCloudExpenseToLocalExpense(expense: CloudExpense): Expense {
    return {
      id: expense.local_id ?? expense.id,
      title: expense.title,
      amount: Number(expense.amount),
      category: expense.category,
      date: expense.expense_date,
      note: expense.note ?? undefined,
      createdAt: expense.created_at
    };
  }

  private mapCloudGoalToLocalGoal(goal: CloudSavingsGoal): SavingsGoal {
    return {
      id: goal.local_id ?? goal.id,
      title: goal.name,
      targetAmount: Number(goal.target_amount),
      currentAmount: Number(goal.current_amount),
      icon: goal.icon ?? '🎯',
      createdAt: goal.created_at
    };
  }
}