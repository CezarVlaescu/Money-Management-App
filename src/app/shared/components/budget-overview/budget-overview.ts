import { Component, inject } from '@angular/core';
import { MoneyFormatter } from '../../services/moeny-formatter/money-formatter';
import { BudgetService } from '../../../core/services/budget/budget';

@Component({
  selector: 'app-budget-overview',
  imports: [],
  templateUrl: './budget-overview.html',
  styleUrl: './budget-overview.scss',
})
export class BudgetOverview {
  protected readonly budgetService: BudgetService = inject<BudgetService>(BudgetService);
  protected readonly moneyFormatterService: MoneyFormatter = inject<MoneyFormatter>(MoneyFormatter);
}
