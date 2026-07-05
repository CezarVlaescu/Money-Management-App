import { Component, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast/toast';

@Component({
  selector: 'app-toast-container',
  imports: [],
  templateUrl: './toast-container.html',
  styleUrl: './toast-container.scss',
})
export class ToastContainer {
  protected readonly toastService: ToastService = inject<ToastService>(ToastService);
}
