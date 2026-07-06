import { Component, inject, signal, WritableSignal } from '@angular/core';
import { BudgetService } from '../../core/services/budget/budget';
import { ExpensesService } from '../../core/services/expenses/expenses';
import { SavingsGoalsService } from '../../core/services/savings/savings';
import { ThemeService } from '../../core/services/theme/theme';
import { MoneyFormatter } from '../../shared/services/moeny-formatter/money-formatter';
import { FormsModule } from '@angular/forms';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { RouterLink } from '@angular/router';
import { InstallAppCard } from '../../shared/components/install-app-card/install-app-card';
import { ConfirmDialogService } from '../../core/services/confirm-dialog/confirm-dialog-service';
import { ToastService } from '../../core/services/toast/toast';

@Component({
  selector: 'app-settings',
  imports: [FormsModule, PageHeader, RouterLink, InstallAppCard],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings {
  protected readonly themeService: ThemeService = inject<ThemeService>(ThemeService);
  protected readonly budgetService: BudgetService = inject<BudgetService>(BudgetService);
  protected readonly expensesService: ExpensesService = inject<ExpensesService>(ExpensesService);
  protected readonly savingsGoalsService: SavingsGoalsService = inject<SavingsGoalsService>(SavingsGoalsService);
  protected readonly moneyFormatter: MoneyFormatter = inject<MoneyFormatter>(MoneyFormatter);
  private readonly confirmDialogService: ConfirmDialogService = inject<ConfirmDialogService>(ConfirmDialogService);
  private readonly toastService: ToastService = inject<ToastService>(ToastService);

  protected readonly incomeDraft: WritableSignal<number> = signal<number>(this.budgetService.income());

  protected saveIncome(): void {
    void this.budgetService.updateIncome(Number(this.incomeDraft()) || 0);
  }

  protected async resetExpenses(): Promise<void> {
    const confirmed = await this.confirmDialogService.confirm({
      title: 'Reset all expenses?',
      message: 'All local transactions will be deleted. You can export a backup before doing this.',
      confirmLabel: 'Reset',
      cancelLabel: 'Cancel',
      tone: 'danger'
    });

    if (!confirmed) return;

    this.expensesService.clearExpenses();
    this.toastService.info('Expenses reset');
  }

  protected async resetGoals(): Promise<void> {
    const confirmed = await this.confirmDialogService.confirm({
      title: 'Reset savings goals?',
      message: 'All local savings goals and progress will be deleted.',
      confirmLabel: 'Reset',
      cancelLabel: 'Cancel',
      tone: 'danger'
    });


    if (!confirmed) return;

    this.savingsGoalsService.clearGoals();
    this.toastService.info('Savings goals reset');
  }
}
