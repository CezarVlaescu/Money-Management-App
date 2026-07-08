import { Injectable, inject } from '@angular/core';
import { CloudRestoreService } from '../cloud-restore/cloud-restore-service';
import { CloudSyncStatusService } from '../cloud-sync-status/cloud-sync-status-service';
import { CLOUD_RESTORE_PROMPT_KEY } from '../../../shared/constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class CloudRestorePromptService {
  private readonly cloudRestoreService: CloudRestoreService = inject<CloudRestoreService>(CloudRestoreService);
  private readonly cloudSyncStatusService: CloudSyncStatusService = inject<CloudSyncStatusService>(CloudSyncStatusService);

  public async askToRestoreCloudDataIfNeeded(): Promise<void> {
    if (this.wasPromptAlreadyShown()) return;

    const status = await this.cloudSyncStatusService.getCloudSyncStatus();

    if (!status.hasCloudData) return;

    const shouldRestore = window.confirm(
      `Cloud backup found.\n\n` +
      `We found ${status.expensesCount} expenses and ${status.goalsCount} savings goals saved in your cloud account.\n\n` +
      `Do you want to restore them on this device?\n\n` +
      `This will replace your current local Money Bloom data.`
    );

    this.markPromptAsShown();

    if (!shouldRestore) return;

    await this.cloudRestoreService.restoreCloudDataToLocal();
    window.location.reload();
  }

  public resetPromptState(): void {
    localStorage.removeItem(CLOUD_RESTORE_PROMPT_KEY);
  }

  private wasPromptAlreadyShown(): boolean {
    return localStorage.getItem(CLOUD_RESTORE_PROMPT_KEY) === 'true';
  }

  private markPromptAsShown(): void {
    localStorage.setItem(CLOUD_RESTORE_PROMPT_KEY, 'true');
  }
}
