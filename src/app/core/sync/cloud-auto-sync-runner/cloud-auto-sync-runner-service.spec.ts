import { TestBed } from '@angular/core/testing';

import { CloudAutoSyncRunnerService } from './cloud-auto-sync-runner-service';

describe('CloudAutoSyncRunnerService', () => {
  let service: CloudAutoSyncRunnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudAutoSyncRunnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
