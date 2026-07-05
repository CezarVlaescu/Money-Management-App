import { Injectable, signal, WritableSignal } from '@angular/core';
import { BeforeInstallPromptEvent } from '../../models/interface/core.interface';

@Injectable({
  providedIn: 'root',
})
export class PwaInstallService {
  private deferredPrompt: BeforeInstallPromptEvent | null = null;

  public readonly canInstall: WritableSignal<boolean> = signal<boolean>(false);
  public readonly isInstalled: WritableSignal<boolean> = signal<boolean>(this.isRunningStandalone());

  public initialize(): void {
    window.addEventListener('beforeinstallprompt', event => {
      event.preventDefault();

      this.deferredPrompt = event as BeforeInstallPromptEvent;
      this.canInstall.set(true);
    });

    window.addEventListener('appinstalled', () => {
      this.isInstalled.set(true);
      this.canInstall.set(false);
      this.deferredPrompt = null;
    });
  }

  public async install(): Promise<void> {
    if (!this.deferredPrompt) {
      return;
    }

    await this.deferredPrompt.prompt();

    const choice = await this.deferredPrompt.userChoice;

    if (choice.outcome === 'accepted') {
      this.isInstalled.set(true);
    }

    this.canInstall.set(false);
    this.deferredPrompt = null;
  }

  public isIos(): boolean {
    return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
  }

  private isRunningStandalone(): boolean {
    return window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
  }
}
