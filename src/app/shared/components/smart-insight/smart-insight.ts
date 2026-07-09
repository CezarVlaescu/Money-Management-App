import { Component, computed, inject, Signal } from '@angular/core';
import { MoneyFormatter } from '../../services/moeny-formatter/money-formatter';
import { BudgetService } from '../../../core/services/budget/budget';

@Component({
  selector: 'app-smart-insight',
  imports: [],
  templateUrl: './smart-insight.html',
  styleUrl: './smart-insight.scss',
})
export class SmartInsight {
  protected readonly budgetService: BudgetService = inject<BudgetService>(BudgetService);
  protected readonly moneyFormatter: MoneyFormatter = inject<MoneyFormatter>(MoneyFormatter);

  protected readonly insightTitle: Signal<string> = computed<string>(() => {
    const summary = this.budgetService.budgetSummary();

    if (summary.savings.spent >= summary.savings.amount) return 'Great job, you are on track.';
    if (summary.wants.progress > 90) return 'Careful with lifestyle spending.';

    return 'You are building a healthy habit.';
  });

  protected readonly insightDescription: Signal<string> = computed<string>(() => {
    const summary = this.budgetService.budgetSummary();
    const yearlySavings = this.moneyFormatter.format(summary.yearlySavingsPotential);

    if (summary.savings.spent >= summary.savings.amount)
      return `If you keep this rhythm, you could save around ${yearlySavings} in one year.`;
    if (summary.wants.progress > 90)
      return 'Your wants category is almost full. Try reducing optional spending this month.';

    return `Following the 50/30/20 rule, your yearly saving potential is ${yearlySavings}.`;
  });
}
