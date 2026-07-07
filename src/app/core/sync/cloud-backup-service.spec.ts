import { TestBed } from '@angular/core/testing';

import { CloudBackupService } from './cloud-backup-service';

describe('CloudBackupService', () => {
  let service: CloudBackupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudBackupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
