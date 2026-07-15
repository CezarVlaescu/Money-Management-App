import { Injectable, inject } from '@angular/core';
import { AuthService } from '../../auth/auth-service';
import { supabase } from '../../cloud/supabase.client';
import {
  CloudSavingsAccount,
  CreateCloudSavingsAccountPayload,
  UpdateCloudSavingsAccountPayload,
} from '../../models/interface/core.interface';

@Injectable({
  providedIn: 'root',
})
export class CloudSavingsAccountsService {
  private readonly authService: AuthService = inject<AuthService>(AuthService);

  public async getSavingsAccounts(): Promise<CloudSavingsAccount[]> {
    const userId = this.authService.getCurrentUserId();

    const { data, error } = await supabase
      .from('savings_accounts')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data ?? [];
  }

  public async createSavingsAccount(
    payload: Omit<CreateCloudSavingsAccountPayload, 'user_id'>,
  ): Promise<CloudSavingsAccount> {
    const userId = this.authService.getCurrentUserId();

    const { data, error } = await supabase
      .from('savings_accounts')
      .insert({
        ...payload,
        user_id: userId,
        currency: payload.currency ?? 'RON',
        is_active: payload.is_active ?? true,
      })
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  public async updateSavingsAccount(
    id: string,
    payload: UpdateCloudSavingsAccountPayload,
  ): Promise<CloudSavingsAccount> {
    const userId = this.authService.getCurrentUserId();

    const { data, error } = await supabase
      .from('savings_accounts')
      .update({
        ...payload,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;

    return data;
  }

  public async softDeleteSavingsAccount(id: string): Promise<void> {
    const userId = this.authService.getCurrentUserId();

    const { error } = await supabase
      .from('savings_accounts')
      .update({
        is_active: false,
        deleted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .eq('user_id', userId);

    if (error) throw error;
  }
}
