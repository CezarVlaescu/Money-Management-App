import { Injectable, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { StorageService } from '../storage/storage';
import { ExpensesService } from '../expenses/expenses';
import { INCOME_STORAGE_KEY } from '../../../shared/constants/app.constants';
import { BudgetSummary, BudgetBucket } from '../../models/interface/core.interface';
import { BudgetCategory } from '../../models/types/core.types';

@Injectable({ providedIn: 'root' })
export class BudgetService {
  public readonly storageService: StorageService = inject<StorageService>(StorageService);
  public readonly expensesService: ExpensesService = inject<ExpensesService>(ExpensesService);
  public readonly income: WritableSignal<number> = signal<number>(this.storageService.getItem<number>(INCOME_STORAGE_KEY, 5000));
  public readonly needsAmount: Signal<number> = computed<number>(() => this.income() * 0.5);
  public readonly wantsAmount: Signal<number> = computed<number>(() => this.income() * 0.3);
  public readonly savingsAmount: Signal<number> = computed<number>(() => this.income() * 0.2);
  public readonly budgetSummary: Signal<BudgetSummary> = computed<BudgetSummary>(() => {
    const income: number = this.income();
    const needs: BudgetBucket = this.createBucket({
      category: 'needs',
      label: 'Needs',
      percentage: 50,
      amount: income * 0.5,
      spent: this.expensesService.needsSpent(),
      icon: '🧺',
      description: 'Rent, bills, food, transport',
      actionLabel: 'used'
    });
    const wants: BudgetBucket = this.createBucket({
      category: 'wants',
      label: 'Wants',
      percentage: 30,
      amount: income * 0.3,
      spent: this.expensesService.wantsSpent(),
      icon: '🛍️',
      description: 'Fun, shopping, restaurants',
      actionLabel: 'used'
    });

    const savings: BudgetBucket = this.createBucket({
      category: 'savings',
      label: 'Savings',
      percentage: 20,
      amount: income * 0.2,
      spent: this.expensesService.savingsSpent(),
      icon: '🐷',
      description: 'Investments, emergency fund',
      actionLabel: 'used'
    });

    const totalSpent: number = needs.spent + wants.spent + savings.spent;

    return {
      income,
      needs,
      wants,
      savings,
      totalSpent,
      totalRemaining: income - totalSpent,
      yearlySavingsPotential: savings.amount * 12
    };
  });

  public readonly budgetBuckets: Signal<BudgetBucket[]> = computed<BudgetBucket[]>(() => {
    const summary: BudgetSummary = this.budgetSummary();
    return [ summary.needs, summary.wants, summary.savings ];
  });

  public updateIncome(income: number): void {
    const safeIncome = Math.max(income, 0);
    this.income.set(safeIncome);
    this.storageService.setItem(INCOME_STORAGE_KEY, safeIncome);
  }

  private createBucket(payload: {
    category: BudgetCategory;
    label: string;
    percentage: number;
    amount: number;
    spent: number;
    icon: string;
    description: string;
    actionLabel: string;
  }): BudgetBucket {
    const remaining = payload.amount - payload.spent;
    const progress = payload.amount > 0
      ? Math.min(Math.round((payload.spent / payload.amount) * 100), 100)
      : 0;

    return {
      ...payload,
      remaining,
      progress
    };
  }
}