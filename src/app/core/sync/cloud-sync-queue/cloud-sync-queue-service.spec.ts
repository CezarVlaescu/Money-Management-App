import { TestBed } from '@angular/core/testing';

import { CloudSyncQueueService } from './cloud-sync-queue-service';

describe('CloudSyncQueueService', () => {
  let service: CloudSyncQueueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudSyncQueueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
