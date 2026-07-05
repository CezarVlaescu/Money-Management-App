import { Component, ElementRef, inject, output, OutputEmitterRef, Signal, signal, viewChild, WritableSignal } from '@angular/core';
import { ExpensesService } from '../../../core/services/expenses/expenses';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../core/services/toast/toast';

@Component({
  selector: 'app-add-expense-card',
  imports: [FormsModule],
  templateUrl: './add-expense-card.html',
  styleUrl: './add-expense-card.scss',
})
export class AddExpenseCard {
  private readonly titleInputElement: Signal<ElementRef<HTMLInputElement> | undefined> = viewChild<ElementRef<HTMLInputElement>>('titleInput');
  private readonly expensesService: ExpensesService = inject<ExpensesService>(ExpensesService);
  private readonly hostElement: ElementRef<HTMLElement> = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly toastService: ToastService = inject<ToastService>(ToastService);

  public readonly expenseAdded: OutputEmitterRef<void> = output<void>();
  protected readonly title: WritableSignal<string> = signal<string>('');
  protected readonly amount: WritableSignal<number | null> = signal<number | null>(null);

  public scrollAndFocus(): void {
    this.hostElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
      this.titleInputElement()?.nativeElement.focus();
    }, 180);
  }

  protected addExpense(): void {
    const title = this.title().trim();
    const amount = this.amount();

    if (!title || !amount || amount <= 0) {
      this.toastService.error('Please add a valid description and amount');
      return;
    }

    this.expensesService.addExpense({ title, amount });
    this.title.set('');
    this.amount.set(null);
    this.toastService.success('Transaction added');
    this.expenseAdded.emit();
  }
}
