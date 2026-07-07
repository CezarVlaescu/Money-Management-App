import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../cloud/supabase.client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly user: WritableSignal<User | null> = signal<User | null>(null);
  public readonly loading: WritableSignal<boolean> = signal<boolean>(true);
  public readonly error: WritableSignal<string | null> = signal<string | null>(null);

  public readonly isLoggedIn: Signal<boolean> = computed<boolean>(() => !!this.user());
  public readonly isGuest: Signal<boolean> = computed<boolean>(() => !this.user());

  public getCurrentUserId(): string {
    const userId = this.user()?.id;
    if (!userId) throw new Error('You must be signed in to use cloud sync.');
    return userId;
  }

  public async initSession(): Promise<void> {
    try {
      this.loading.set(true);
      this.error.set(null);

      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      this.user.set(data.session?.user ?? null);

      supabase.auth.onAuthStateChange((_event, session) => {
        this.user.set(session?.user ?? null);
      });
    } catch (error) {
      this.user.set(null);
      this.error.set(this.getErrorMessage(error));
    } finally {
      this.loading.set(false);
    }
  }

  public async signUp(email: string, password: string): Promise<void> {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/login`
      }
    });

    if (error) throw error;
  }

  public async signIn(email: string, password: string): Promise<void> {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }

  public async resetPassword(email: string): Promise<void> {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`
    });
    if (error) throw error;
  }

  public async updatePassword(password: string): Promise<void> {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) throw error;
  }

  public async signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    this.user.set(null);
  }

  public getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    return 'Something went wrong. Please try again.';
  }
}