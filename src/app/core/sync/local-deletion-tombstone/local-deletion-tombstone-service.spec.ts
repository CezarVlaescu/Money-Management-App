import { TestBed } from '@angular/core/testing';

import { LocalDeletionTombstoneService } from './local-deletion-tombstone-service';

describe('LocalDeletionTombstoneService', () => {
  let service: LocalDeletionTombstoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalDeletionTombstoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
