import { Component, inject } from '@angular/core';
import { BudgetService } from '../../../core/services/budget/budget';
import { MoneyFormatter } from '../../services/moeny-formatter/money-formatter';

@Component({
  selector: 'app-income-card',
  imports: [],
  templateUrl: './income-card.html',
  styleUrl: './income-card.scss',
})
export class IncomeCard {
  protected readonly budgetService: BudgetService = inject<BudgetService>(BudgetService);
  protected readonly moneyFormatterService: MoneyFormatter = inject<MoneyFormatter>(MoneyFormatter);

  protected updateIncome(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.budgetService.updateIncome(Number(input.value) || 0);
  }
}
