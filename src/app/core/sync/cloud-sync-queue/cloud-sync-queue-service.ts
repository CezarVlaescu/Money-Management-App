import { Injectable, signal, WritableSignal } from '@angular/core';
import { CloudSyncRequest } from '../../models/interface/core.interface';
import { CloudSyncReason } from '../../models/types/core.types';

@Injectable({
  providedIn: 'root',
})
export class CloudSyncQueueService {
  public readonly request: WritableSignal<CloudSyncRequest | null> = signal<CloudSyncRequest | null>(null);

  public requestAutoBackup(reason: CloudSyncReason): void {
    this.request.set({ reason, requestedAt: new Date().toISOString() });
  }
}
