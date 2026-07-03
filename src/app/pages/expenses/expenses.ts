import { AfterViewInit, Component, computed, ElementRef, inject, Signal, signal, viewChild, WritableSignal } from '@angular/core';
import { CategoryService } from '../../core/services/category/category';
import { ExpensesService } from '../../core/services/expenses/expenses';
import { BudgetCategory } from '../../core/models/types/core.types';
import { CategoryFilter } from '../../shared/models/interfaces/shared.interface';
import { MoneyFormatter } from '../../shared/services/moeny-formatter/money-formatter';
import { EXPENSES_FILTERS } from '../../shared/constants/app.constants';
import { Expense } from '../../core/models/interface/core.interface';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-expenses',
  imports: [FormsModule, DatePipe],
  templateUrl: './expenses.html',
  styleUrl: './expenses.scss',
})
export class Expenses implements AfterViewInit {
  private readonly titleInputRef: Signal<ElementRef<HTMLInputElement> | undefined> = viewChild<ElementRef<HTMLInputElement>>('titleInput');
  private readonly addExpensesCardRef: Signal<ElementRef<HTMLElement> | undefined> = viewChild<ElementRef<HTMLElement>>('addExpenseCard');
  protected readonly expensesService: ExpensesService = inject<ExpensesService>(ExpensesService);
  protected readonly categoryService: CategoryService = inject<CategoryService>(CategoryService);
  protected readonly moneyFormatter: MoneyFormatter = inject<MoneyFormatter>(MoneyFormatter);
  private readonly activatedRoute: ActivatedRoute = inject<ActivatedRoute>(ActivatedRoute);
  private readonly router: Router = inject<Router>(Router);

  protected readonly selectedCategory: WritableSignal<BudgetCategory | 'all'> = signal<BudgetCategory | 'all'>('all');
  protected readonly title: WritableSignal<string> = signal<string>('');
  protected readonly amount: WritableSignal<number | null> = signal<number | null>(null);
  protected readonly expensesFilters: CategoryFilter[] = EXPENSES_FILTERS;
  protected readonly filteredExpenses: Signal<Expense[]> = computed<Expense[]>(() => {
    const category = this.selectedCategory();
    if (category === 'all') return this.expensesService.expenses();
    return this.expensesService.expenses().filter(expense => expense.category === category);
  });

  public ngAfterViewInit(): void {
    const shouldOpenAddForm = this.activatedRoute.snapshot.queryParamMap.get('add') === 'true';

    if (!shouldOpenAddForm) return;

    setTimeout(() => {
      this.addExpensesCardRef()?.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      this.titleInputRef()?.nativeElement.focus();
    }, 120);

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {},
      replaceUrl: true
    });
  }

  protected addExpense(): void {
    const title = this.title().trim();
    const amount = this.amount();

    if (!title || !amount || amount <= 0) return;

    this.selectedCategory.set('all');
    this.title.set('');
    this.amount.set(null);
  }

  protected selectCategory(category: BudgetCategory | 'all'): void {
    this.selectedCategory.set(category);
  }

  protected deleteExpense(expenseId: string): void {
    this.expensesService.deleteExpense(expenseId);
  }
}
