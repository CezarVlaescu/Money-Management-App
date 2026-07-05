import { Injectable, signal, WritableSignal } from '@angular/core';
import { Toast } from '../../models/interface/core.interface';
import { ToastType } from '../../models/types/core.types';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  public readonly toasts: WritableSignal<Toast[]> = signal<Toast[]>([]);

  public success(message: string): void {
    this.show(message, 'success');
  }

  public error(message: string): void {
    this.show(message, 'error');
  }

  public info(message: string): void {
    this.show(message, 'info');
  }

  public remove(toastId: string): void {
    this.toasts.update(toasts => toasts.filter(toast => toast.id !== toastId));
  }

  private show(message: string, type: ToastType): void {
    const toast: Toast = {
      id: crypto.randomUUID(),
      message,
      type
    };

    this.toasts.update(toasts => [toast, ...toasts]);

    setTimeout(() => {
      this.remove(toast.id);
    }, 2600);
  }
}
