import { Component, computed, inject, Signal, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BudgetCategory } from '../../../core/models/types/core.types';
import { CategoryService } from '../../../core/services/category/category';
import { ExpensesService } from '../../../core/services/expenses/expenses';
import { AddExpensesSheetService } from '../../../core/services/add-expenses-sheet/add-expenses-sheet';
import { ToastService } from '../../../core/services/toast/toast';

@Component({
  selector: 'app-quick-add-expense-sheet',
  imports: [FormsModule],
  templateUrl: './quick-add-expense-sheet.html',
  styleUrl: './quick-add-expense-sheet.scss',
})
export class QuickAddExpenseSheet {
  protected readonly sheetService: AddExpensesSheetService = inject<AddExpensesSheetService>(AddExpensesSheetService);
  protected readonly expensesService: ExpensesService = inject<ExpensesService>(ExpensesService);
  protected readonly categoryService: CategoryService = inject<CategoryService>(CategoryService);
  protected readonly toastService: ToastService = inject<ToastService>(ToastService);

  protected readonly title: WritableSignal<string> = signal<string>('');
  protected readonly amount: WritableSignal<number | null> = signal<number | null>(null);

  protected readonly detectedCategory: Signal<BudgetCategory> = computed<BudgetCategory>(() => {
    const title = this.title().trim();
    if (!title) return 'uncategorized';
    return this.categoryService.detectCategory(title);
  });

  protected addExpense(): void {
    const title = this.title().trim();
    const amount = this.amount();

    if (!title || !amount || amount <= 0) {
      this.toastService.error('Please add a valid description and amount');
      return;
    }

    this.expensesService.addExpense({ title, amount });
    this.toastService.success('Transaction added');
    this.resetForm();
    this.sheetService.close();
  }

  protected close(): void {
    this.sheetService.close();
  }

  private resetForm(): void {
    this.title.set('');
    this.amount.set(null);
  }
}
