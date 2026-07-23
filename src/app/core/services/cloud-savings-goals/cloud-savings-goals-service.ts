import { Injectable, inject } from '@angular/core';
import { AuthService } from '../../auth/auth-service';
import { supabase } from '../../cloud/supabase.client';
import {
  CloudSavingsGoal,
  CreateCloudSavingsGoalPayload,
  UpdateCloudSavingsGoalPayload,
} from '../../models/interface';

@Injectable({
  providedIn: 'root',
})
export class CloudSavingsGoalsService {
  private readonly authService: AuthService = inject<AuthService>(AuthService);

  public async softDeleteGoals(ids: string[]): Promise<void> {
    if (!ids.length) return;

    const userId = this.authService.getCurrentUserId();
    const { error } = await supabase
      .from('savings_goals')
      .update({ deleted_at: new Date().toISOString() })
      .eq('user_id', userId)
      .in('id', ids);

    if (error) throw error;
  }

  public async getGoals(): Promise<CloudSavingsGoal[]> {
    const userId = this.authService.getCurrentUserId();

    const { data, error } = await supabase
      .from('savings_goals')
      .select('*')
      .eq('user_id', userId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data ?? [];
  }

  public async createGoal(
    payload: Omit<CreateCloudSavingsGoalPayload, 'user_id'>,
  ): Promise<CloudSavingsGoal> {
    const userId = this.authService.getCurrentUserId();

    const { data, error } = await supabase
      .from('savings_goals')
      .insert({ ...payload, user_id: userId })
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  public async updateGoal(
    id: string,
    payload: UpdateCloudSavingsGoalPayload,
  ): Promise<CloudSavingsGoal> {
    const userId = this.authService.getCurrentUserId();

    const { data, error } = await supabase
      .from('savings_goals')
      .update(payload)
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  public async softDeleteGoal(id: string): Promise<void> {
    const userId = this.authService.getCurrentUserId();

    const { error } = await supabase
      .from('savings_goals')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id)
      .eq('user_id', userId);

    if (error) throw error;
  }

  public async upsertGoals(
    goals: Omit<CreateCloudSavingsGoalPayload, 'user_id'>[],
  ): Promise<CloudSavingsGoal[]> {
    const userId = this.authService.getCurrentUserId();

    const payload = goals.map((goal) => ({ ...goal, user_id: userId }));

    const { data, error } = await supabase
      .from('savings_goals')
      .upsert(payload, { onConflict: 'user_id,local_id' })
      .select();

    if (error) throw error;

    return data ?? [];
  }
}
