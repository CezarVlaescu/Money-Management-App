import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { CloudSyncMeta } from '../../models/interface/core.interface';
import {
  CLOUD_SYNC_META_SERVICE_KEY,
  DEFAULT_CLOUD_SYNC_META,
} from '../../../shared/constants/app.constants';

@Injectable({
  providedIn: 'root',
})
export class CloudSyncMetaService {
  public readonly meta: WritableSignal<CloudSyncMeta> = signal<CloudSyncMeta>(this.loadMeta());

  public readonly statusLabel: Signal<string> = computed<string>(() => {
    const meta = this.meta();

    if (meta.state === 'syncing') return 'Syncing...';
    if (meta.state === 'error') return 'Sync error';
    if (meta.lastBackupAt || meta.lastRestoreAt) return 'Synced';

    return 'Not synced yet';
  });

  public markSyncing(): void {
    this.updateMeta({ state: 'syncing' });
  }

  public readonly lastBackupLabel = computed<string>(() =>
    this.formatDate(this.meta().lastBackupAt),
  );

  public readonly lastRestoreLabel = computed<string>(() =>
    this.formatDate(this.meta().lastRestoreAt),
  );

  public markBackupSuccess(): void {
    this.updateMeta({
      lastBackupAt: new Date().toISOString(),
      lastErrorAt: null,
      lastErrorMessage: null,
      state: 'synced',
    });
  }

  public markRestoreSuccess(): void {
    this.updateMeta({
      lastRestoreAt: new Date().toISOString(),
      lastErrorAt: null,
      lastErrorMessage: null,
      state: 'synced',
    });
  }

  public markError(error: unknown): void {
    this.updateMeta({
      lastErrorAt: new Date().toISOString(),
      lastErrorMessage: this.getErrorMessage(error),
      state: 'error',
    });
  }

  public reset(): void {
    this.meta.set(DEFAULT_CLOUD_SYNC_META);
    localStorage.removeItem(CLOUD_SYNC_META_SERVICE_KEY);
  }

  public clearError(): void {
    this.updateMeta({
      lastErrorAt: null,
      lastErrorMessage: null,
      state: this.meta().lastBackupAt || this.meta().lastRestoreAt ? 'synced' : 'idle',
    });
  }

  private updateMeta(partialMeta: Partial<CloudSyncMeta>): void {
    const nextMeta: CloudSyncMeta = {
      ...this.meta(),
      ...partialMeta,
    };

    this.meta.set(nextMeta);
    localStorage.setItem(CLOUD_SYNC_META_SERVICE_KEY, JSON.stringify(nextMeta));
  }

  private loadMeta(): CloudSyncMeta {
    const rawMeta = localStorage.getItem(CLOUD_SYNC_META_SERVICE_KEY);

    if (!rawMeta) return DEFAULT_CLOUD_SYNC_META;

    try {
      return {
        ...DEFAULT_CLOUD_SYNC_META,
        ...JSON.parse(rawMeta),
      };
    } catch {
      return DEFAULT_CLOUD_SYNC_META;
    }
  }

  private formatDate(value: string | null): string {
    if (!value) return 'Never';

    return new Intl.DateTimeFormat('ro-RO', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(value));
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    return 'Something went wrong.';
  }
}
