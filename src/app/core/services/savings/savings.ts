import { Injectable, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { SavingsGoal, CreateSavingsGoalPayload } from '../../models/interface/core.interface';
import { StorageService } from '../storage/storage';
import { SAVINGS_STORE_KEY } from '../../../shared/constants/app.constants';
@Injectable({ providedIn: 'root' })
export class SavingsGoalsService {
  private readonly storageService: StorageService = inject<StorageService>(StorageService);
  
  public readonly goals: WritableSignal<SavingsGoal[]> = signal<SavingsGoal[]>(this.getInitialGoals());
  public readonly totalTargetAmount: Signal<number> = computed<number>(() => 
    this.goals().reduce((total, goal) => total + goal.targetAmount, 0)
  );
  public readonly totalCurrentAmount: Signal<number> = computed<number>(() =>
    this.goals().reduce((total, goal) => total + goal.currentAmount, 0)
  );
  public readonly totalProgress: Signal<number> = computed<number>(() => {
    const target = this.totalTargetAmount();
    if (!target) return 0;

    return Math.min(Math.round((this.totalCurrentAmount() / target) * 100), 100);
  });

  public addGoal(payload: CreateSavingsGoalPayload): void {
    const goal: SavingsGoal = {
      id: crypto.randomUUID(),
      title: payload.title,
      targetAmount: payload.targetAmount,
      currentAmount: payload.currentAmount ?? 0,
      monthlyContribution: payload.monthlyContribution,
      icon: payload.icon ?? '🎯',
      color: payload.color,
      createdAt: new Date().toISOString()
    };

    this.goals.update(goals => [goal, ...goals]);
    this.saveGoals();
  }

  public updateGoal(updatedGoal: SavingsGoal): void {
    this.goals.update(goals => goals.map(goal => goal.id === updatedGoal.id ? updatedGoal : goal));
    this.saveGoals();
  }

  public deleteGoal(goalId: string): void {
    this.goals.update(goals => goals.filter(goal => goal.id !== goalId));
    this.saveGoals();
  }

  public addMoneyToGoal(goalId: string, amount: number): void {
    this.goals.update(goals =>
      goals.map(goal => {
        if (goal.id !== goalId) return goal;
        return {
          ...goal,
          currentAmount: Math.min(goal.currentAmount + amount, goal.targetAmount)
        };
      })
    );

    this.saveGoals();
  }

  public getGoalProgress(goal: SavingsGoal): number {
    if (!goal.targetAmount) return 0;
    return Math.min(Math.round((goal.currentAmount / goal.targetAmount) * 100), 100);
  }

  private getInitialGoals(): SavingsGoal[] {
    return this.storageService.getItem<SavingsGoal[]>(SAVINGS_STORE_KEY, [
      {
        id: crypto.randomUUID(),
        title: 'Emergency Fund',
        targetAmount: 10000,
        currentAmount: 5000,
        monthlyContribution: 700,
        icon: '🛟',
        color: 'savings',
        createdAt: new Date().toISOString()
      },
      {
        id: crypto.randomUUID(),
        title: 'Vacation',
        targetAmount: 3000,
        currentAmount: 1200,
        monthlyContribution: 400,
        icon: '🏖️',
        color: 'wants',
        createdAt: new Date().toISOString()
      }
    ]);
  }

  private saveGoals(): void {
    void this.storageService.setItem(SAVINGS_STORE_KEY, this.goals());
  }
}