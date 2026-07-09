import { TestBed } from '@angular/core/testing';

import { SpendingPeriodsService } from './spending-periods-service';

describe('SpendingPeriodsService', () => {
  let service: SpendingPeriodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpendingPeriodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
