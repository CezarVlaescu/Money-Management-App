import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ExpensesService } from '../../../core/services/expenses/expenses';
import { CategoryService } from '../../../core/services/category/category';
import { MoneyFormatter } from '../../services/moeny-formatter/money-formatter';
import { EmptyState } from '../empty-state/empty-state';

@Component({
  selector: 'app-recent-expenses',
  imports: [DatePipe, RouterLink, EmptyState],
  templateUrl: './recent-expenses.html',
  styleUrl: './recent-expenses.scss',
})
export class RecentExpenses {
  protected readonly expensesService: ExpensesService = inject<ExpensesService>(ExpensesService);
  protected readonly categoryService: CategoryService = inject<CategoryService>(CategoryService);
  protected readonly moneyFormatterService: MoneyFormatter = inject<MoneyFormatter>(MoneyFormatter);
}
