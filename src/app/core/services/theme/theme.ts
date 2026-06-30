import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { THEME_STORAGE_KEY } from '../../../shared/constants/app.constants';
import { AppTheme } from '../../models/types/core.types';
import { Storage } from '../storage/storage';

@Injectable({ providedIn: 'root' })
export class Theme {
  private readonly storageService: Storage = inject<Storage>(Storage);
  private readonly theme: WritableSignal<AppTheme> = signal<AppTheme>(this.getInitialTheme());
  private readonly isDarkMode: WritableSignal<boolean> = signal<boolean>(this.theme() === 'dark');

  public initializeTheme(): void {
    void this.applyTheme(this.theme());
  }

  public toggleTheme(): void {
    const nextTheme: AppTheme = this.theme() === 'dark' ? 'light' : 'dark';
    void this.setTheme(nextTheme);
  }

  public setTheme(theme: AppTheme): void {
    this.theme.set(theme);
    this.isDarkMode.set(theme === 'dark');
    this.storageService.setItem(THEME_STORAGE_KEY, theme);
    this.applyTheme(theme);
  }

  private getInitialTheme(): AppTheme {
    const savedTheme = this.storageService.getItem<AppTheme | null>(THEME_STORAGE_KEY, null);
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  private applyTheme(theme: AppTheme): void {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }
}