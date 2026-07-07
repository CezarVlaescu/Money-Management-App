import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth-service';
import { CloudBackupService } from '../../core/sync/cloud-backup-service';

@Component({
  selector: 'app-cloud-sync-card',
  imports: [RouterLink],
  templateUrl: './cloud-sync-card.html',
  styleUrl: './cloud-sync-card.scss',
})
export class CloudSyncCard {
  protected readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);
  private readonly cloudBackupService: CloudBackupService = inject<CloudBackupService>(CloudBackupService);

  protected readonly backupLoading: WritableSignal<boolean> = signal<boolean>(false);
  protected readonly backupSuccess: WritableSignal<string | null> = signal<string | null>(null);
  protected readonly loading: WritableSignal<boolean> = signal<boolean>(false);
  protected readonly error: WritableSignal<string | null> = signal<string | null>(null);

  protected async backupToCloud(): Promise<void> {
    try {
      this.backupLoading.set(true);
      this.error.set(null);
      this.backupSuccess.set(null);

      await this.cloudBackupService.backupLocalDataToCloud();

      this.backupSuccess.set('Your local Money Bloom data was backed up to the cloud.');
    } catch (error) {
      this.error.set(this.authService.getErrorMessage(error));
    } finally {
      this.backupLoading.set(false);
    }
  }

  protected async logout(): Promise<void> {
    try {
      this.loading.set(true);
      this.error.set(null);

      await this.authService.signOut();
      await this.router.navigate(['/dashboard']);
    } catch (error) {
      this.error.set(this.authService.getErrorMessage(error));
    } finally {
      this.loading.set(false);
    }
  }
}
