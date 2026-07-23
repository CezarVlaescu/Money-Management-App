import { Component, inject, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { SavingsGoal } from '../../../core/models/interface';
import { SavingsGoalsService } from '../../../core/services/savings/savings';
import { MoneyFormatter } from '../../services/moeny-formatter/money-formatter';

@Component({
  selector: 'app-savings-goal-card',
  imports: [],
  templateUrl: './savings-goal-card.html',
  styleUrl: './savings-goal-card.scss',
})
export class SavingsGoalCard {
  public readonly goal: InputSignal<SavingsGoal> = input.required<SavingsGoal>();
  public readonly addMoney: OutputEmitterRef<string> = output<string>();
  public readonly editGoal: OutputEmitterRef<SavingsGoal> = output<SavingsGoal>();
  public readonly deleteGoal: OutputEmitterRef<string> = output<string>();

  protected readonly savingsGoalsService: SavingsGoalsService =
    inject<SavingsGoalsService>(SavingsGoalsService);
  protected readonly moneyFormatter: MoneyFormatter = inject<MoneyFormatter>(MoneyFormatter);

  protected onAddMoney(): void {
    this.addMoney.emit(this.goal().id);
  }

  protected onDelete(): void {
    this.deleteGoal.emit(this.goal().id);
  }

  protected onEdit(): void {
    this.editGoal.emit(this.goal());
  }
}
