import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  public getItem<T>(key: string, fallbackValue: T): T {
    const rawValue: string | null = localStorage.getItem(key);

    if (!rawValue) return fallbackValue;

    try { return JSON.parse(rawValue) as T; } 
    catch { return fallbackValue; }
  }

  public setItem<T>(key: string, value: T): void {
    void localStorage.setItem(key, JSON.stringify(value));
  }

  public removeItem(key: string): void {
    void localStorage.removeItem(key);
  }

  public clear(): void {
    void localStorage.clear();
  }
}
