import { TestBed } from '@angular/core/testing';

import { CloudSavingsGoalsService } from './cloud-savings-goals-service';

describe('CloudSavingsGoalsService', () => {
  let service: CloudSavingsGoalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudSavingsGoalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
