import { TestBed } from '@angular/core/testing';

import { CloudRestoreService } from './cloud-restore-service';

describe('CloudRestoreService', () => {
  let service: CloudRestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudRestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
