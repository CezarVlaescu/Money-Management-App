import { Injectable, inject } from '@angular/core';
import { AuthService } from '../../auth/auth-service';
import { supabase } from '../../cloud/supabase.client';
import { CloudSubscription, CreateCloudSubscriptionPayload, UpdateCloudSubscriptionPayload } from '../../models/interface/core.interface';

@Injectable({
  providedIn: 'root'
})
export class CloudSubscriptionsService {
  private readonly authService: AuthService = inject<AuthService>(AuthService);

  public async getSubscriptions(): Promise<CloudSubscription[]> {
    const userId = this.authService.getCurrentUserId();

    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .is('deleted_at', null)
      .order('due_day', { ascending: true });

    if (error) throw error;

    return data ?? [];
  }

  public async getActiveSubscriptions(): Promise<CloudSubscription[]> {
    const userId = this.authService.getCurrentUserId();

    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .is('deleted_at', null)
      .order('due_day', { ascending: true });

    if (error) throw error;

    return data ?? [];
  }

  public async createSubscription(
    payload: Omit<CreateCloudSubscriptionPayload, 'user_id'>
  ): Promise<CloudSubscription> {
    const userId = this.authService.getCurrentUserId();

    const { data, error } = await supabase
      .from('subscriptions')
      .insert({
        ...payload,
        user_id: userId,
        currency: payload.currency ?? 'RON',
        frequency: payload.frequency ?? 'monthly',
        is_active: payload.is_active ?? true
      })
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  public async updateSubscription(
    id: string,
    payload: UpdateCloudSubscriptionPayload
  ): Promise<CloudSubscription> {
    const userId = this.authService.getCurrentUserId();

    const { data, error } = await supabase
      .from('subscriptions')
      .update({
        ...payload,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  public async softDeleteSubscription(id: string): Promise<void> {
    const userId = this.authService.getCurrentUserId();

    const { error } = await supabase
      .from('subscriptions')
      .update({
        deleted_at: new Date().toISOString(),
        is_active: false,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .eq('user_id', userId);

    if (error) throw error;
  }
}
