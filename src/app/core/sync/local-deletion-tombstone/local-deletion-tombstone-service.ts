import { Injectable, signal, WritableSignal } from '@angular/core';
import { LocalDeletionTombstone } from '../../models/interface/core.interface';
import { DeletedEntityType } from '../../models/types/core.types';
import { LOCAL_DELETION_TOMBSTONE_KEY } from '../../../shared/constants/app.constants';

@Injectable({
  providedIn: 'root',
})
export class LocalDeletionTombstoneService {
  public readonly tombstones: WritableSignal<LocalDeletionTombstone[]> = signal<
    LocalDeletionTombstone[]
  >(this.loadTombstones());

  public add(entityType: DeletedEntityType, localId: string): void {
    const nextTombstones = [
      ...this.tombstones().filter(
        (tombstone) => !(tombstone.entityType === entityType && tombstone.localId === localId),
      ),
      { entityType, localId, deletedAt: new Date().toISOString() },
    ];

    this.save(nextTombstones);
  }

  public getByEntityType(entityType: DeletedEntityType): LocalDeletionTombstone[] {
    return this.tombstones().filter((tombstone) => tombstone.entityType === entityType);
  }

  public remove(entityType: DeletedEntityType, localIds: string[]): void {
    const localIdsSet = new Set(localIds);

    const nextTombstones = this.tombstones().filter(
      (tombstone) => tombstone.entityType !== entityType || !localIdsSet.has(tombstone.localId),
    );

    this.save(nextTombstones);
  }

  private save(tombstones: LocalDeletionTombstone[]): void {
    this.tombstones.set(tombstones);
    localStorage.setItem(LOCAL_DELETION_TOMBSTONE_KEY, JSON.stringify(tombstones));
  }

  private loadTombstones(): LocalDeletionTombstone[] {
    const rawValue = localStorage.getItem(LOCAL_DELETION_TOMBSTONE_KEY);

    if (!rawValue) return [];
    try {
      return JSON.parse(rawValue) as LocalDeletionTombstone[];
    } catch {
      return [];
    }
  }
}
