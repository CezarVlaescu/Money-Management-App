import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly storageKey = 'money-bloom-theme';

  readonly isDarkMode = signal<boolean>(this.getInitialTheme());

  toggleTheme(): void {
    const nextValue = !this.isDarkMode();
    this.isDarkMode.set(nextValue);
    this.applyTheme(nextValue);
    localStorage.setItem(this.storageKey, nextValue ? 'dark' : 'light');
  }

  initializeTheme(): void {
    this.applyTheme(this.isDarkMode());
  }

  private getInitialTheme(): boolean {
    const savedTheme = localStorage.getItem(this.storageKey);

    if (savedTheme) {
      return savedTheme === 'dark';
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  private applyTheme(isDark: boolean): void {
    document.documentElement.classList.toggle('dark', isDark);
  }
}
