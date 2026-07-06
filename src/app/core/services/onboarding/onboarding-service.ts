import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { StorageService } from '../storage/storage';
import { ONBOARDING_STORAGE_KEY } from '../../../shared/constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {
  private readonly storageService: StorageService = inject<StorageService>(StorageService);
  private readonly storageKey: string = ONBOARDING_STORAGE_KEY;

  public readonly isOpen: WritableSignal<boolean> = signal<boolean>(false);

  public initialize(): void {
    const completed = this.storageService.getItem<boolean>(this.storageKey, false);
    if (completed) return;
    setTimeout(() => { this.isOpen.set(true); }, 500);
  }

  public open(): void {
    this.isOpen.set(true);
  }

  public complete(): void {
    this.storageService.setItem(this.storageKey, true);
    this.isOpen.set(false);
  }

  public close(): void {
    this.isOpen.set(false);
  }
}
