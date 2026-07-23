import { DatePipe } from '@angular/common';
import { Component, inject, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { Expense } from '../../../core/models/interface';
import { CategoryService } from '../../../core/services/category/category';
import { MoneyFormatter } from '../../services/moeny-formatter/money-formatter';

@Component({
  selector: 'app-expense-item',
  imports: [DatePipe],
  templateUrl: './expense-item.html',
  styleUrl: './expense-item.scss',
})
export class ExpenseItem {
  public readonly expense: InputSignal<Expense> = input.required<Expense>();
  public readonly editExpense: OutputEmitterRef<Expense> = output<Expense>();
  public readonly deleteExpense: OutputEmitterRef<string> = output<string>();

  protected readonly categoryService: CategoryService = inject<CategoryService>(CategoryService);
  protected readonly moneyFormatter: MoneyFormatter = inject<MoneyFormatter>(MoneyFormatter);

  protected onDeleteExpense(): void {
    this.deleteExpense.emit(this.expense().id);
  }

  protected onEditExpense(): void {
    this.editExpense.emit(this.expense());
  }
}
