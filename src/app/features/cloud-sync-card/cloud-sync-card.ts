import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth-service';
import { CloudBackupService } from '../../core/sync/cloud-backup/cloud-backup-service';
import { CloudRestoreService } from '../../core/sync/cloud-restore/cloud-restore-service';
import { CloudSyncStatusService } from '../../core/sync/cloud-sync-status/cloud-sync-status-service';
import { CloudSyncStatus } from '../../core/models/interface/core.interface';
import { CloudRestorePromptService } from '../../core/sync/cloud-restore-prompt/cloud-restore-prompt-service';
import { CloudSyncMetaService } from '../../core/sync/cloud-sync-meta/cloud-sync-meta-service';

@Component({
  selector: 'app-cloud-sync-card',
  imports: [RouterLink],
  templateUrl: './cloud-sync-card.html',
  styleUrl: './cloud-sync-card.scss',
})
export class CloudSyncCard implements OnInit {
  protected readonly authService: AuthService = inject<AuthService>(AuthService);
  protected readonly cloudSyncMetaService: CloudSyncMetaService =
    inject<CloudSyncMetaService>(CloudSyncMetaService);
  private readonly cloudSyncStatusService: CloudSyncStatusService =
    inject<CloudSyncStatusService>(CloudSyncStatusService);
  private readonly router: Router = inject<Router>(Router);
  private readonly cloudBackupService: CloudBackupService =
    inject<CloudBackupService>(CloudBackupService);
  private readonly cloudRestoreService: CloudRestoreService =
    inject<CloudRestoreService>(CloudRestoreService);
  private readonly cloudRestorePromptService: CloudRestorePromptService =
    inject<CloudRestorePromptService>(CloudRestorePromptService);

  protected readonly statusLoading: WritableSignal<boolean> = signal<boolean>(false);
  protected readonly cloudStatus: WritableSignal<CloudSyncStatus | null> =
    signal<CloudSyncStatus | null>(null);
  protected readonly restoreLoading: WritableSignal<boolean> = signal<boolean>(false);
  protected readonly restoreSuccess: WritableSignal<string | null> = signal<string | null>(null);
  protected readonly backupLoading: WritableSignal<boolean> = signal<boolean>(false);
  protected readonly backupSuccess: WritableSignal<string | null> = signal<string | null>(null);
  protected readonly loading: WritableSignal<boolean> = signal<boolean>(false);
  protected readonly error: WritableSignal<string | null> = signal<string | null>(null);

  public ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      void this.loadCloudStatus();
    }
  }

  protected async loadCloudStatus(): Promise<void> {
    try {
      this.statusLoading.set(true);
      this.error.set(null);
      const status = await this.cloudSyncStatusService.getCloudSyncStatus();
      this.cloudStatus.set(status);
    } catch (error) {
      this.error.set(this.authService.getErrorMessage(error));
    } finally {
      this.statusLoading.set(false);
    }
  }

  protected async restoreFromCloud(): Promise<void> {
    const confirmed = window.confirm(
      'This will replace your local Money Bloom data with the data saved in cloud. Continue?',
    );
    if (!confirmed) return;

    try {
      this.restoreLoading.set(true);
      this.error.set(null);
      this.backupSuccess.set(null);
      this.restoreSuccess.set(null);

      const result = await this.cloudRestoreService.restoreCloudDataToLocal();
      await this.loadCloudStatus();

      this.restoreSuccess.set(
        `Cloud data restored: ${result.expensesCount} expenses and ${result.goalsCount} goals.`,
      );
    } catch (error) {
      this.error.set(this.authService.getErrorMessage(error));
    } finally {
      this.restoreLoading.set(false);
    }
  }

  protected async backupToCloud(): Promise<void> {
    try {
      this.backupLoading.set(true);
      this.error.set(null);
      this.backupSuccess.set(null);

      this.cloudSyncMetaService.clearError();
      await this.cloudBackupService.backupLocalDataToCloud();
      await this.loadCloudStatus();

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
      this.backupSuccess.set(null);
      this.restoreSuccess.set(null);
      this.cloudRestorePromptService.resetPromptState();

      await this.authService.signOut();
      await this.router.navigate(['/dashboard']);
    } catch (error) {
      this.error.set(this.authService.getErrorMessage(error));
    } finally {
      this.loading.set(false);
    }
  }
}
