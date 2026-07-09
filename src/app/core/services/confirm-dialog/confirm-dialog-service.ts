import { Injectable, signal, WritableSignal } from '@angular/core';
import { ConfirmDialogConfig } from '../../models/interface/core.interface';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  public readonly isOpen: WritableSignal<boolean> = signal<boolean>(false);
  public readonly config: WritableSignal<ConfirmDialogConfig | null> =
    signal<ConfirmDialogConfig | null>(null);

  private resolver: ((confirmed: boolean) => void) | null = null;

  public confirm(config: ConfirmDialogConfig): Promise<boolean> {
    this.config.set({
      cancelLabel: 'Cancel',
      confirmLabel: 'Confirm',
      tone: 'danger',
      ...config,
    });

    this.isOpen.set(true);

    return new Promise<boolean>((resolve) => {
      this.resolver = resolve;
    });
  }

  public accept(): void {
    this.close(true);
  }

  public cancel(): void {
    this.close(false);
  }

  private close(confirmed: boolean): void {
    this.isOpen.set(false);

    if (this.resolver) {
      this.resolver(confirmed);
      this.resolver = null;
    }

    setTimeout(() => {
      this.config.set(null);
    }, 180);
  }
}
