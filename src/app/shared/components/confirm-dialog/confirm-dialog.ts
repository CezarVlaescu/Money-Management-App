import { Component, HostListener, inject } from '@angular/core';
import { ConfirmDialogService } from '../../../core/services/confirm-dialog/confirm-dialog-service';

@Component({
  selector: 'app-confirm-dialog',
  imports: [],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.scss',
})
export class ConfirmDialog {
  protected readonly confirmDialogService: ConfirmDialogService = inject<ConfirmDialogService>(ConfirmDialogService);

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.confirmDialogService.isOpen()) this.confirmDialogService.cancel();
  }
}
