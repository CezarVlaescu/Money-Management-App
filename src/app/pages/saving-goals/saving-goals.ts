import { Component, ElementRef, inject, Signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SavingsGoalsService } from '../../core/services/savings/savings';
import { MoneyFormatter } from '../../shared/services/moeny-formatter/money-formatter';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { SavingsGoalCard } from '../../shared/components/savings-goal-card/savings-goal-card';
import { AddSavingsGoalCard } from '../../shared/components/add-savings-goal-card/add-savings-goal-card';
import { ToastService } from '../../core/services/toast/toast';
import { EmptyState } from '../../shared/components/empty-state/empty-state';
import { SavingsGoalSheetService } from '../../core/services/savings-goal-sheet/savings-goal-sheet-service';
import { SavingsGoal } from '../../core/models/interface/core.interface';
import { ConfirmDialogService } from '../../core/services/confirm-dialog/confirm-dialog-service';

@Component({
  selector: 'app-saving-goals',
  imports: [FormsModule, PageHeader, SavingsGoalCard, AddSavingsGoalCard, EmptyState],
  templateUrl: './saving-goals.html',
  styleUrl: './saving-goals.scss',
})
export class SavingGoals {
  private readonly addGoalSection: Signal<ElementRef<HTMLElement> | undefined> =
    viewChild<ElementRef<HTMLElement>>('addGoalSection');

  protected readonly savingsGoalsService: SavingsGoalsService =
    inject<SavingsGoalsService>(SavingsGoalsService);
  protected readonly moneyFormatter: MoneyFormatter = inject<MoneyFormatter>(MoneyFormatter);
  private readonly confirmDialogService: ConfirmDialogService =
    inject<ConfirmDialogService>(ConfirmDialogService);
  private readonly toastService: ToastService = inject<ToastService>(ToastService);
  private readonly savingsGoalSheetService: SavingsGoalSheetService =
    inject<SavingsGoalSheetService>(SavingsGoalSheetService);

  protected addMoney(goalId: string): void {
    this.savingsGoalsService.addContribution(goalId, 100);
    this.toastService.success('Added 100 RON to goal');
  }

  protected async deleteGoal(goalId: string): Promise<void> {
    const confirmed = await this.confirmDialogService.confirm({
      title: 'Delete savings goal?',
      message: 'This goal and its progress will be removed from your device.',
      confirmLabel: 'Delete',
      cancelLabel: 'Keep goal',
      tone: 'danger',
    });

    if (!confirmed) return;

    this.savingsGoalsService.deleteGoal(goalId);
    this.toastService.info('Goal deleted');
  }

  protected scrollToAddGoal(): void {
    this.addGoalSection()?.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }

  protected editGoal(goal: SavingsGoal): void {
    this.savingsGoalSheetService.open(goal);
  }

  protected onGoalAdded(): void {
    // Momentan nu trebuie să facă nimic.
    // Lăsăm metoda pentru extensie: toast, scroll, analytics, etc.
  }
}
