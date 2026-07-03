import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SavingsGoalsService } from '../../core/services/savings/savings';
import { MoneyFormatter } from '../../shared/services/moeny-formatter/money-formatter';

@Component({
  selector: 'app-saving-goals',
  imports: [FormsModule],
  templateUrl: './saving-goals.html',
  styleUrl: './saving-goals.scss',
})
export class SavingGoals {
    protected readonly savingsGoalsService: SavingsGoalsService = inject<SavingsGoalsService>(SavingsGoalsService);
  protected readonly moneyFormatter: MoneyFormatter = inject<MoneyFormatter>(MoneyFormatter);

  protected readonly title: WritableSignal<string> = signal<string>('');
  protected readonly targetAmount: WritableSignal<number | null> = signal<number | null>(null);
  protected readonly currentAmount: WritableSignal<number | null> = signal<number | null>(null);
  protected readonly monthlyContribution: WritableSignal<number | null> = signal<number | null>(null);

  protected addGoal(): void {
    const title = this.title().trim();
    const targetAmount = this.targetAmount();

    if (!title || !targetAmount || targetAmount <= 0) return;

    this.savingsGoalsService.addGoal({
      title,
      targetAmount,
      currentAmount: this.currentAmount() ?? 0,
      monthlyContribution: this.monthlyContribution() ?? undefined,
      icon: '🎯'
    });

    this.title.set('');
    this.targetAmount.set(null);
    this.currentAmount.set(null);
    this.monthlyContribution.set(null);
  }

  protected addMoney(goalId: string): void {
    this.savingsGoalsService.addMoneyToGoal(goalId, 100);
  }

  protected deleteGoal(goalId: string): void {
    this.savingsGoalsService.deleteGoal(goalId);
  }
}
