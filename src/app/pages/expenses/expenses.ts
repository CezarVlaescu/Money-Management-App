import { Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { ExpensesService } from '../../core/services/expenses/expenses';
import { BudgetCategory } from '../../core/models/types/core.types';
import { CategoryFilter } from '../../shared/models/interfaces/shared.interface';
import { EXPENSES_FILTERS } from '../../shared/constants/app.constants';
import { Expense } from '../../core/models/interface/core.interface';
import { FormsModule } from '@angular/forms';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { AddExpenseCard } from '../../shared/components/add-expense-card/add-expense-card';
import { ExpenseItem } from '../../shared/components/expense-item/expense-item';
import { MoneyFormatter } from '../../shared/services/moeny-formatter/money-formatter';
import { ToastService } from '../../core/services/toast/toast';
import { EmptyState } from '../../shared/components/empty-state/empty-state';
import { AddExpensesSheetService } from '../../core/services/add-expenses-sheet/add-expenses-sheet';

@Component({
  selector: 'app-expenses',
  imports: [FormsModule, PageHeader, AddExpenseCard, ExpenseItem, EmptyState],
  templateUrl: './expenses.html',
  styleUrl: './expenses.scss',
})
export class Expenses {
  protected readonly expensesService: ExpensesService = inject<ExpensesService>(ExpensesService);
  protected readonly moneyFormatter: MoneyFormatter = inject<MoneyFormatter>(MoneyFormatter);
  private readonly toastService: ToastService = inject<ToastService>(ToastService);
  private readonly addExpenseSheetService: AddExpensesSheetService = inject<AddExpensesSheetService>(AddExpensesSheetService);

  protected readonly selectedCategory: WritableSignal<BudgetCategory | 'all'> = signal<BudgetCategory | 'all'>('all');
  protected readonly expensesFilters: CategoryFilter[] = EXPENSES_FILTERS;
  protected readonly filteredExpenses: Signal<Expense[]> = computed<Expense[]>(() => {
    const category = this.selectedCategory();
    if (category === 'all') return this.expensesService.expenses();
    return this.expensesService.expenses().filter(expense => expense.category === category);
  });

  protected onExpenseAdded(): void {
    this.selectedCategory.set('all');
  }

  protected selectCategory(category: BudgetCategory | 'all'): void {
    this.selectedCategory.set(category);
  }

  protected deleteExpense(expenseId: string): void {
    this.expensesService.deleteExpense(expenseId);
    this.toastService.info('Transaction deleted');
  }

  protected openAddTransaction(): void {
    void this.addExpenseSheetService.open();
  }
}
