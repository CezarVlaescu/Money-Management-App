import { effect, Injectable, inject } from '@angular/core';
import { AuthService } from '../../auth/auth-service';
import { CloudBackupService } from '../cloud-backup/cloud-backup-service';
import { CloudSyncQueueService } from '../cloud-sync-queue/cloud-sync-queue-service';

@Injectable({
  providedIn: 'root',
})
export class CloudAutoSyncRunnerService {
  private readonly authService: AuthService = inject<AuthService>(AuthService);
  private readonly cloudBackupService: CloudBackupService =
    inject<CloudBackupService>(CloudBackupService);
  private readonly cloudSyncQueueService: CloudSyncQueueService =
    inject<CloudSyncQueueService>(CloudSyncQueueService);

  private timeoutId: ReturnType<typeof setTimeout> | null = null;
  private running = false;
  private runAgainAfterCurrentBackup = false;

  public constructor() {
    effect(() => {
      const request = this.cloudSyncQueueService.request();
      if (!request || !this.authService.isLoggedIn()) return;
      this.scheduleBackup();
    });
  }

  public init(): void {
    // Keeps this service alive from app startup.
  }

  private scheduleBackup(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      void this.runBackup();
    }, 1500);
  }

  private async runBackup(): Promise<void> {
    if (this.running) {
      this.runAgainAfterCurrentBackup = true;
      return;
    }

    try {
      this.running = true;
      await this.cloudBackupService.backupLocalDataToCloud();
    } catch (error) {
      console.error('Auto cloud backup failed', error);
    } finally {
      this.running = false;

      if (this.runAgainAfterCurrentBackup) {
        this.runAgainAfterCurrentBackup = false;
        this.scheduleBackup();
      }
    }
  }
}
