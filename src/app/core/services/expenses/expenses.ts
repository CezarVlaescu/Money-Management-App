import { Injectable, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { Expense, CreateExpensePayload } from '../../models/interface/core.interface';
import { BudgetCategory } from '../../models/types/core.types';
import { CategoryService} from '../category/category';
import { StorageService } from '../storage/storage';
import { EXPENSES_STORE_KEY } from '../../../shared/constants/app.constants';

@Injectable({ providedIn: 'root' })
export class ExpensesService {
  private readonly storageService: StorageService = inject<StorageService>(StorageService);
  private readonly categoryService: CategoryService = inject<CategoryService>(CategoryService);
  public readonly totalSpent: Signal<number> = computed<number>(() =>
    this.expenses().reduce((total, expense) => total + Math.abs(expense.amount), 0)
  );
  public readonly needsSpent: Signal<number> = computed<number>(() => this.getTotalByCategory('needs'));
  public readonly wantsSpent: Signal<number> = computed<number>(() => this.getTotalByCategory('wants'));
  public readonly savingsSpent: Signal<number> = computed<number>(() => this.getTotalByCategory('savings'));
  public readonly recentExpenses: Signal<Expense[]> = computed<Expense[]>(() => 
    [...this.expenses()]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)
  );
  public readonly expenses: WritableSignal<Expense[]> = signal<Expense[]>(this.getInitialExpenses());

  public addExpense(payload: CreateExpensePayload): void {
    const category = payload.category ?? this.categoryService.detectCategory(payload.title);

    const expense: Expense = {
      id: crypto.randomUUID(),
      title: payload.title,
      amount: Math.abs(payload.amount),
      category,
      date: payload.date ?? new Date().toISOString(),
      note: payload.note,
      createdAt: new Date().toISOString()
    };

    this.expenses.update(expenses => [expense, ...expenses]);
    this.saveExpenses();
  }

  public updateExpense(expenseId: string, expense: Partial<Expense>): void {
    this.expenses.update(expenses =>
      expenses.map(currentExpense =>
        currentExpense.id === expenseId
          ? { ...currentExpense, ...expense }
          : currentExpense
      )
    );

    this.saveExpenses();
  }

  public deleteExpense(expenseId: string): void {
    this.expenses.update(expenses => expenses.filter(expense => expense.id !== expenseId));
    this.saveExpenses();
  }

  public getExpensesByCategory(category: BudgetCategory): Expense[] {
    return this.expenses().filter(expense => expense.category === category);
  }

  public clearExpenses(): void {
    this.expenses.set([]);
    this.saveExpenses();
  }

  private getTotalByCategory(category: BudgetCategory): number {
    return this.expenses()
    .filter(expense => expense.category === category)
    .reduce((total, expense) => total + Math.abs(expense.amount), 0);
  }

  private getInitialExpenses(): Expense[] {
    return this.storageService.getItem<Expense[]>(EXPENSES_STORE_KEY, []);
  }

  private saveExpenses(): void {
    void this.storageService.setItem(EXPENSES_STORE_KEY, this.expenses());
  }
}