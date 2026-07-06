import { Component, computed, inject, output, OutputEmitterRef, Signal, signal, WritableSignal } from '@angular/core';
import { SavingsGoalsService } from '../../../core/services/savings/savings';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../core/services/toast/toast';

@Component({
  selector: 'app-add-savings-goal-card',
  imports: [FormsModule],
  templateUrl: './add-savings-goal-card.html',
  styleUrl: './add-savings-goal-card.scss',
})
export class AddSavingsGoalCard {
  public readonly goalAdded: OutputEmitterRef<void> = output<void>();
  private readonly savingsGoalsService: SavingsGoalsService = inject(SavingsGoalsService);
  private readonly toastService: ToastService = inject<ToastService>(ToastService);

  protected readonly title: WritableSignal<string> = signal<string>('');
  protected readonly targetAmount: WritableSignal<number | null> = signal<number | null>(null);
  protected readonly currentAmount: WritableSignal<number | null> = signal<number | null>(null);
  protected readonly monthlyContribution: WritableSignal<number | null> = signal<number | null>(null);

  protected readonly canSubmit: Signal<boolean> = computed<boolean>(() => {
    const title = this.title().trim();
    const targetAmount = this.targetAmount();
    const currentAmount = this.currentAmount() ?? 0;

    return !!title && !!targetAmount && targetAmount > 0 && currentAmount >= 0;
  });

  protected addGoal(): void {
    const title = this.title().trim();
    const targetAmount = this.targetAmount();

    if (!title || !targetAmount || targetAmount <= 0) {
      this.toastService.error('Please add a valid title and target amount');
      return;
    }

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
    this.toastService.success('Savings goal created');
    this.goalAdded.emit();
  }
}
