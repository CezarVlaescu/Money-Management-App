import { Component, inject, signal, WritableSignal } from '@angular/core';
import { BudgetService } from '../../core/services/budget/budget';
import { ExpensesService } from '../../core/services/expenses/expenses';
import { SavingsGoalsService } from '../../core/services/savings/savings';
import { ThemeService } from '../../core/services/theme/theme';
import { MoneyFormatter } from '../../shared/services/moeny-formatter/money-formatter';
import { FormsModule } from '@angular/forms';
import { PageHeader } from '../../shared/components/page-header/page-header';

@Component({
  selector: 'app-settings',
  imports: [FormsModule, PageHeader],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings {
  protected readonly themeService: ThemeService = inject<ThemeService>(ThemeService);
  protected readonly budgetService: BudgetService = inject<BudgetService>(BudgetService);
  protected readonly expensesService: ExpensesService = inject<ExpensesService>(ExpensesService);
  protected readonly savingsGoalsService: SavingsGoalsService = inject<SavingsGoalsService>(SavingsGoalsService);
  protected readonly moneyFormatter: MoneyFormatter = inject<MoneyFormatter>(MoneyFormatter);

  protected readonly incomeDraft: WritableSignal<number> = signal<number>(this.budgetService.income());

  protected saveIncome(): void {
    void this.budgetService.updateIncome(Number(this.incomeDraft()) || 0);
  }

  protected resetExpenses(): void {
    const confirmed = window.confirm('Are you sure you want to delete all expenses?');
    if (!confirmed) return;
    this.expensesService.clearExpenses();
  }

  protected resetGoals(): void {
    const confirmed = window.confirm('Are you sure you want to delete all savings goals?');
    if (!confirmed) return;
    this.savingsGoalsService.clearGoals();
  }
}
