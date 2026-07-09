import { Injectable, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import {
  SavingsGoal,
  CreateSavingsGoalPayload,
  UpdateSavingsGoalPayload,
} from '../../models/interface/core.interface';
import { StorageService } from '../storage/storage';
import { SAVINGS_STORE_KEY } from '../../../shared/constants/app.constants';
import { CloudSyncQueueService } from '../../sync/cloud-sync-queue/cloud-sync-queue-service';
import { LocalDeletionTombstoneService } from '../../sync/local-deletion-tombstone/local-deletion-tombstone-service';
@Injectable({ providedIn: 'root' })
export class SavingsGoalsService {
  private readonly storageService: StorageService = inject<StorageService>(StorageService);
  private readonly cloudSyncQueueService: CloudSyncQueueService =
    inject<CloudSyncQueueService>(CloudSyncQueueService);
  private readonly localDeletionTombstoneService: LocalDeletionTombstoneService =
    inject<LocalDeletionTombstoneService>(LocalDeletionTombstoneService);

  public readonly goals: WritableSignal<SavingsGoal[]> = signal<SavingsGoal[]>(
    this.getInitialGoals(),
  );
  public readonly totalTargetAmount: Signal<number> = computed<number>(() =>
    this.goals().reduce((total, goal) => total + goal.targetAmount, 0),
  );
  public readonly totalCurrentAmount: Signal<number> = computed<number>(() =>
    this.goals().reduce((total, goal) => total + goal.currentAmount, 0),
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
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.goals.update((goals) => [goal, ...goals]);
    this.saveGoals();
    this.cloudSyncQueueService.requestAutoBackup('goals-changed');
  }

  public updateGoal(goalId: string, payload: UpdateSavingsGoalPayload): void {
    this.goals.update((goals) =>
      goals.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              ...payload,
              updatedAt: new Date().toISOString(),
            }
          : goal,
      ),
    );

    this.saveGoals();
    this.cloudSyncQueueService.requestAutoBackup('goals-changed');
  }

  public addContribution(goalId: string, amount: number): void {
    this.goals.update((goals) =>
      goals.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              currentAmount: goal.currentAmount + amount,
              updatedAt: new Date().toISOString(),
            }
          : goal,
      ),
    );

    this.saveGoals();
    this.cloudSyncQueueService.requestAutoBackup('goals-changed');
  }

  public deleteGoal(goalId: string): void {
    this.goals.update((goals) => goals.filter((goal) => goal.id !== goalId));
    this.localDeletionTombstoneService.add('goal', goalId);
    this.saveGoals();
    this.cloudSyncQueueService.requestAutoBackup('goals-changed');
  }

  public addMoneyToGoal(goalId: string, amount: number): void {
    this.goals.update((goals) =>
      goals.map((goal) => {
        if (goal.id !== goalId) return goal;
        return {
          ...goal,
          currentAmount: Math.min(goal.currentAmount + amount, goal.targetAmount),
        };
      }),
    );

    this.saveGoals();
    this.cloudSyncQueueService.requestAutoBackup('goals-changed');
  }

  public getGoalProgress(goal: SavingsGoal): number {
    if (!goal.targetAmount) return 0;
    return Math.min(Math.round((goal.currentAmount / goal.targetAmount) * 100), 100);
  }

  public clearGoals(): void {
    this.goals.set([]);
    this.saveGoals();
    this.cloudSyncQueueService.requestAutoBackup('goals-changed');
  }

  public replaceGoals(goals: SavingsGoal[], options?: { skipAutoSync?: boolean }): void {
    this.goals.set(goals);
    this.saveGoals();

    if (!options?.skipAutoSync) this.cloudSyncQueueService.requestAutoBackup('goals-changed');
  }

  private getInitialGoals(): SavingsGoal[] {
    return this.storageService.getItem<SavingsGoal[]>(SAVINGS_STORE_KEY, []);
  }

  private saveGoals(): void {
    void this.storageService.setItem(SAVINGS_STORE_KEY, this.goals());
  }
}
