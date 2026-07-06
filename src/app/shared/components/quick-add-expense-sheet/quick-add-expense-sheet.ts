import { Component, computed, effect, ElementRef, HostListener, inject, Signal, signal, viewChild, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BudgetCategory } from '../../../core/models/types/core.types';
import { CategoryService } from '../../../core/services/category/category';
import { ExpensesService } from '../../../core/services/expenses/expenses';
import { AddExpensesSheetService } from '../../../core/services/add-expenses-sheet/add-expenses-sheet';
import { ToastService } from '../../../core/services/toast/toast';
import { CATEGORIES_CONST } from '../../constants/app.constants';

@Component({
  selector: 'app-quick-add-expense-sheet',
  imports: [FormsModule],
  templateUrl: './quick-add-expense-sheet.html',
  styleUrl: './quick-add-expense-sheet.scss',
})
export class QuickAddExpenseSheet {
  private readonly titleInputElement: Signal<ElementRef<HTMLInputElement> | undefined> = viewChild<ElementRef<HTMLInputElement>>('titleInput');
  
  protected readonly sheetService: AddExpensesSheetService = inject<AddExpensesSheetService>(AddExpensesSheetService);
  protected readonly expensesService: ExpensesService = inject<ExpensesService>(ExpensesService);
  protected readonly categoryService: CategoryService = inject<CategoryService>(CategoryService);
  protected readonly toastService: ToastService = inject<ToastService>(ToastService);

  protected readonly title: WritableSignal<string> = signal<string>('');
  protected readonly amount: WritableSignal<number | null> = signal<number | null>(null);
  protected readonly selectedCategory = signal<BudgetCategory | 'auto'>('auto');
  protected readonly categories: BudgetCategory[] = CATEGORIES_CONST;

  protected readonly canSubmit: Signal<boolean> = computed<boolean>(() => {
    const title = this.title().trim();
    const amount = this.amount();

    return !!title && !!amount && amount > 0;
  });

  protected readonly detectedCategory: Signal<BudgetCategory> = computed<BudgetCategory>(() => {
    const title = this.title().trim();
    if (this.selectedCategory() !== 'auto') return this.selectedCategory() as BudgetCategory;
    return title ? this.categoryService.detectCategory(title) : 'uncategorized';
  });
  protected readonly sheetTitle: Signal<string> = computed<string>(() =>
    this.sheetService.isEditMode() ? 'Edit transaction' : 'New transaction'
  );
  protected readonly submitLabel: Signal<string> = computed<string>(() =>
    this.sheetService.isEditMode() ? 'Save changes' : 'Add transaction'
  );

  public constructor() {
    effect(() => {
      const expense = this.sheetService.selectedExpense();

      if (!expense) {
        this.resetForm();
        return;
      }

      this.title.set(expense.title);
      this.amount.set(expense.amount);
      this.selectedCategory.set(expense.category);
    });

    effect(() => {
      if (!this.sheetService.isOpen()) return;

      setTimeout(() => {
        this.titleInputElement()?.nativeElement.focus();
      }, 120);
    });
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.sheetService.isOpen()) this.close();
  }

  protected submitExpense(): void {
    const title = this.title().trim();
    const amount = this.amount();

    if (!amount || !this.canSubmit()) {
      this.toastService.error('Please add a valid description and amount');
      return;
    }

    const category = this.detectedCategory();
    const selectedExpense = this.sheetService.selectedExpense();

    if (selectedExpense) {
      this.expensesService.updateExpense(selectedExpense.id, { title, amount, category });
      this.toastService.success('Transaction updated');
    } else {
      this.expensesService.addExpense({ title, amount, category });
      this.toastService.success('Transaction added');
    }

    this.resetForm();
    this.sheetService.close();
  }

  protected close(): void {
    this.sheetService.close();
  }

  private resetForm(): void {
    this.title.set('');
    this.amount.set(null);
    this.selectedCategory.set('auto');
  }
}
