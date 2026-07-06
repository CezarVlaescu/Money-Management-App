import { computed, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { SavingsGoal } from '../../models/interface/core.interface';

@Injectable({
  providedIn: 'root',
})
export class SavingsGoalSheetService {
  public readonly isOpen: WritableSignal<boolean> = signal<boolean>(false);
  public readonly selectedGoal: WritableSignal<SavingsGoal | null> = signal<SavingsGoal | null>(null);

  public readonly isEditMode: Signal<boolean> = computed<boolean>(() => !!this.selectedGoal());

  public open(goal: SavingsGoal): void {
    this.selectedGoal.set(goal);
    this.isOpen.set(true);
  }

  public close(): void {
    this.isOpen.set(false);
    this.selectedGoal.set(null);
  }
}
