import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Expense } from '../../models/interface';

@Injectable({
  providedIn: 'root',
})
export class AddExpensesSheetService {
  public readonly isOpen: WritableSignal<boolean> = signal<boolean>(false);
  public readonly selectedExpense: WritableSignal<Expense | null> = signal<Expense | null>(null);
  public readonly isEditMode: Signal<boolean> = computed<boolean>(() => !!this.selectedExpense());

  public open(expense?: Expense): void {
    this.selectedExpense.set(expense ?? null);
    this.isOpen.set(true);
  }

  public close(): void {
    this.isOpen.set(false);
    this.selectedExpense.set(null);
  }

  public toggle(): void {
    this.isOpen.update((isOpen) => !isOpen);
  }
}
