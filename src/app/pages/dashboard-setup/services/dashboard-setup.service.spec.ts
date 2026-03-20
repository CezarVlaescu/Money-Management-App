import { TestBed } from '@angular/core/testing';

import { DashboardSetupService } from './dashboard-setup.service';

describe('DashboardSetupService', () => {
  let service: DashboardSetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardSetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
