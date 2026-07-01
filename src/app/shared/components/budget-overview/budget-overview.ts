import { Component, inject } from '@angular/core';
import { MoneyFormatter } from '../../services/moeny-formatter/money-formatter';
import { Budget } from '../../../core/services/budget/budget';

@Component({
  selector: 'app-budget-overview',
  imports: [],
  templateUrl: './budget-overview.html',
  styleUrl: './budget-overview.scss',
})
export class BudgetOverview {
  protected readonly budgetService: Budget = inject<Budget>(Budget);
  protected readonly moneyFormatterService: MoneyFormatter = inject<MoneyFormatter>(MoneyFormatter);
}
