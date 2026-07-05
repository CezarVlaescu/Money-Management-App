import { Component, inject } from '@angular/core';
import { PwaInstallService } from '../../../core/services/pwa-install/pwa-install';
import { ToastService } from '../../../core/services/toast/toast';

@Component({
  selector: 'app-install-app-card',
  imports: [],
  templateUrl: './install-app-card.html',
  styleUrl: './install-app-card.scss',
})
export class InstallAppCard {
  protected readonly pwaInstallService: PwaInstallService = inject<PwaInstallService>(PwaInstallService);
  private readonly toastService: ToastService = inject<ToastService>(ToastService);

  protected async installApp(): Promise<void> {
    if (!this.pwaInstallService.canInstall()) {
      this.toastService.info('Use your browser menu to add Money Bloom to your home screen.');
      return;
    }

    await this.pwaInstallService.install();
  }
}
