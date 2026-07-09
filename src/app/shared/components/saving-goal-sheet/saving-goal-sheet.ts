import {
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  inject,
  Signal,
  signal,
  viewChild,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SavingsGoalSheetService } from '../../../core/services/savings-goal-sheet/savings-goal-sheet-service';
import { SavingsGoalsService } from '../../../core/services/savings/savings';
import { ToastService } from '../../../core/services/toast/toast';
import { ICON_OPTIONS_CONST } from '../../constants/app.constants';

@Component({
  selector: 'app-saving-goal-sheet',
  imports: [FormsModule],
  templateUrl: './saving-goal-sheet.html',
  styleUrl: './saving-goal-sheet.scss',
})
export class SavingGoalSheet {
  private readonly goalTitleInputElement: Signal<ElementRef<HTMLInputElement> | undefined> =
    viewChild<ElementRef<HTMLInputElement>>('goalTitleInput');

  protected readonly sheetService: SavingsGoalSheetService =
    inject<SavingsGoalSheetService>(SavingsGoalSheetService);
  private readonly savingsGoalsService: SavingsGoalsService =
    inject<SavingsGoalsService>(SavingsGoalsService);
  private readonly toastService: ToastService = inject<ToastService>(ToastService);

  protected readonly title: WritableSignal<string> = signal<string>('');
  protected readonly targetAmount: WritableSignal<number | null> = signal<number | null>(null);
  protected readonly currentAmount: WritableSignal<number | null> = signal<number | null>(null);
  protected readonly monthlyContribution: WritableSignal<number | null> = signal<number | null>(
    null,
  );
  protected readonly selectedIcon: WritableSignal<string> = signal<string>('🎯');
  protected readonly iconOptions: string[] = ICON_OPTIONS_CONST;

  protected readonly canSubmit: Signal<boolean> = computed<boolean>(() => {
    const title = this.title().trim();
    const targetAmount = this.targetAmount();
    const currentAmount = this.currentAmount() ?? 0;

    return !!title && !!targetAmount && targetAmount > 0 && currentAmount >= 0;
  });

  constructor() {
    effect(() => {
      const goal = this.sheetService.selectedGoal();

      if (!goal) {
        this.resetForm();
        return;
      }

      this.title.set(goal.title);
      this.targetAmount.set(goal.targetAmount);
      this.currentAmount.set(goal.currentAmount);
      this.monthlyContribution.set(goal.monthlyContribution ?? null);
      this.selectedIcon.set(goal.icon);
    });

    effect(() => {
      if (!this.sheetService.isOpen()) return;

      setTimeout(() => {
        this.goalTitleInputElement()?.nativeElement.focus();
      }, 120);
    });
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.sheetService.isOpen()) this.close();
  }

  protected saveGoal(): void {
    const goal = this.sheetService.selectedGoal();

    if (!goal) return;

    const title = this.title().trim();
    const targetAmount = this.targetAmount();
    const currentAmount = this.currentAmount() ?? 0;
    const monthlyContribution = this.monthlyContribution() ?? undefined;

    if (!targetAmount || !this.canSubmit()) {
      this.toastService.error('Please add a valid goal title and target amount');
      return;
    }

    if (currentAmount < 0) {
      this.toastService.error('Current amount cannot be negative');
      return;
    }

    this.savingsGoalsService.updateGoal(goal.id, {
      title,
      targetAmount,
      currentAmount,
      monthlyContribution,
      icon: this.selectedIcon(),
    });

    this.toastService.success('Goal updated');
    this.sheetService.close();
  }

  protected close(): void {
    this.sheetService.close();
  }

  private resetForm(): void {
    this.title.set('');
    this.targetAmount.set(null);
    this.currentAmount.set(null);
    this.monthlyContribution.set(null);
    this.selectedIcon.set('🎯');
  }
}
