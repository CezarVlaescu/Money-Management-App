import { Component, inject, input, InputSignal } from '@angular/core';
import { BudgetBucket } from '../../../core/models/interface/core.interface';
import { MoneyFormatter } from '../../services/moeny-formatter/money-formatter';

@Component({
  selector: 'app-budget-card',
  imports: [],
  templateUrl: './budget-card.html',
  styleUrl: './budget-card.scss',
})
export class BudgetCard {
  public readonly budgetBucket: InputSignal<BudgetBucket> = input.required<BudgetBucket>();
  public readonly moneyFormatterService: MoneyFormatter = inject<MoneyFormatter>(MoneyFormatter);
}
