import { Injectable } from '@angular/core';
import {
  CloudSpendingPeriod,
  AllowanceExpense,
  DailyAllowanceSummary,
  CalendarDayBudget,
} from '../../models/interface/core.interface';

@Injectable({
  providedIn: 'root',
})
export class DailyAllowanceCalculatorService {
  public calculateSummary(
    period: CloudSpendingPeriod,
    expenses: AllowanceExpense[],
    today: Date = new Date(),
  ): DailyAllowanceSummary {
    const periodStart = this.parseDate(period.period_start);
    const periodEnd = this.parseDate(period.period_end);
    const todayDate = this.stripTime(today);
    const daysInPeriod = this.daysBetween(periodStart, periodEnd) + 1;
    const monthlyBudget = period.daily_limit * daysInPeriod;
    const spentBeforeToday = this.sumExpensesBeforeDate(expenses, todayDate);
    const spentToday = this.sumExpensesForDate(expenses, todayDate);
    const spentThisMonth = this.sumExpenses(expenses);

    const daysLeftIncludingToday = Math.max(this.daysBetween(todayDate, periodEnd) + 1, 0);

    const remainingBeforeToday = monthlyBudget - spentBeforeToday;

    const adaptiveDailyAllowance =
      daysLeftIncludingToday > 0 ? remainingBeforeToday / daysLeftIncludingToday : 0;

    const todayRemaining = adaptiveDailyAllowance - spentToday;
    const remainingMonthlyBudget = monthlyBudget - spentThisMonth;

    return {
      periodStart: period.period_start,
      periodEnd: period.period_end,

      dailyLimit: period.daily_limit,
      monthlyBudget,

      spentBeforeToday,
      spentToday,
      spentThisMonth,

      daysLeftIncludingToday,

      adaptiveDailyAllowance,
      todayRemaining,

      remainingMonthlyBudget,
      isOverBudget: remainingMonthlyBudget < 0,
    };
  }

  public buildCalendarDays(
    period: CloudSpendingPeriod,
    expenses: AllowanceExpense[],
    today: Date = new Date(),
  ): CalendarDayBudget[] {
    const periodStart = this.parseDate(period.period_start);
    const periodEnd = this.parseDate(period.period_end);
    const todayDate = this.stripTime(today);

    const days: CalendarDayBudget[] = [];
    const daysInPeriod = this.daysBetween(periodStart, periodEnd) + 1;
    const monthlyBudget = period.daily_limit * daysInPeriod;

    for (
      let current = new Date(periodStart);
      current <= periodEnd;
      current.setDate(current.getDate() + 1)
    ) {
      const currentDate = new Date(current);
      const dateOnly = this.toDateOnly(currentDate);

      const spentBeforeDay = this.sumExpensesBeforeDate(expenses, currentDate);
      const spentOnDay = this.sumExpensesForDate(expenses, currentDate);

      const daysLeftIncludingDay = this.daysBetween(currentDate, periodEnd) + 1;
      const remainingAtStartOfDay = monthlyBudget - spentBeforeDay;

      const allowanceAtStartOfDay =
        daysLeftIncludingDay > 0 ? remainingAtStartOfDay / daysLeftIncludingDay : 0;

      const remainingAfterSpend = allowanceAtStartOfDay - spentOnDay;

      const isToday = this.isSameDate(currentDate, todayDate);
      const isFuture = currentDate > todayDate;

      days.push({
        date: dateOnly,
        dayNumber: currentDate.getDate(),
        isToday,
        isFuture,
        spent: spentOnDay,
        allowanceAtStartOfDay,
        remainingAfterSpend,
        status: this.getDayStatus({
          isToday,
          isFuture,
          spent: spentOnDay,
          remainingAfterSpend,
        }),
      });
    }

    return days;
  }

  private getDayStatus(params: {
    isToday: boolean;
    isFuture: boolean;
    spent: number;
    remainingAfterSpend: number;
  }): CalendarDayBudget['status'] {
    if (params.isToday) return 'today';
    if (params.isFuture) return 'future';
    if (params.spent === 0) return 'no-spending';
    if (params.remainingAfterSpend < 0) return 'over-budget';

    return 'under-budget';
  }

  private sumExpenses(expenses: AllowanceExpense[]): number {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }

  private sumExpensesBeforeDate(expenses: AllowanceExpense[], date: Date): number {
    return expenses
      .filter((expense) => this.parseDate(expense.date) < this.stripTime(date))
      .reduce((total, expense) => total + expense.amount, 0);
  }

  private sumExpensesForDate(expenses: AllowanceExpense[], date: Date): number {
    return expenses
      .filter((expense) => this.isSameDate(this.parseDate(expense.date), date))
      .reduce((total, expense) => total + expense.amount, 0);
  }

  private daysBetween(start: Date, end: Date): number {
    const msPerDay = 1000 * 60 * 60 * 24;
    return Math.round((this.stripTime(end).getTime() - this.stripTime(start).getTime()) / msPerDay);
  }

  private parseDate(value: string): Date {
    const datePart = value.split('T')[0];
    const [year, month, day] = datePart.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  private stripTime(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  private isSameDate(first: Date, second: Date): boolean {
    return this.toDateOnly(first) === this.toDateOnly(second);
  }

  private toDateOnly(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
