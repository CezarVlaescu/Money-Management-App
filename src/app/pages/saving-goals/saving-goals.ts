import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SavingsGoalsService } from '../../core/services/savings/savings';
import { MoneyFormatter } from '../../shared/services/moeny-formatter/money-formatter';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { SavingsGoalCard } from '../../shared/components/savings-goal-card/savings-goal-card';
import { AddSavingsGoalCard } from '../../shared/components/add-savings-goal-card/add-savings-goal-card';
import { ToastService } from '../../core/services/toast/toast';

@Component({
  selector: 'app-saving-goals',
  imports: [FormsModule, PageHeader, SavingsGoalCard, AddSavingsGoalCard],
  templateUrl: './saving-goals.html',
  styleUrl: './saving-goals.scss',
})
export class SavingGoals {
  protected readonly savingsGoalsService: SavingsGoalsService = inject<SavingsGoalsService>(SavingsGoalsService);
  protected readonly moneyFormatter: MoneyFormatter = inject<MoneyFormatter>(MoneyFormatter);
  private readonly toastService: ToastService = inject<ToastService>(ToastService);

  protected addMoney(goalId: string): void {
    this.savingsGoalsService.addMoneyToGoal(goalId, 100);
    this.toastService.success('Added 100 RON to goal');
  }

  protected deleteGoal(goalId: string): void {
    this.savingsGoalsService.deleteGoal(goalId);
    this.toastService.info('Goal deleted');
  }

  protected onGoalAdded(): void {
    // Momentan nu trebuie să facă nimic.
    // Lăsăm metoda pentru extensie: toast, scroll, analytics, etc.
  }

}
