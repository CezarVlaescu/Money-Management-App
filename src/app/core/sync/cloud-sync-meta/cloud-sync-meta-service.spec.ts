import { TestBed } from '@angular/core/testing';

import { CloudSyncMetaService } from './cloud-sync-meta-service';

describe('CloudSyncMetaService', () => {
  let service: CloudSyncMetaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudSyncMetaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
