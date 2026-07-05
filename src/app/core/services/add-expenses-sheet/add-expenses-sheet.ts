import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AddExpensesSheetService {
  public readonly isOpen: WritableSignal<boolean> = signal<boolean>(false);

  public open(): void {
    this.isOpen.set(true);
  }

  public close(): void {
    this.isOpen.set(false);
  }

  public toggle(): void {
    this.isOpen.update(isOpen => !isOpen);
  }
}
