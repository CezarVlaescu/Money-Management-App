import { TestBed } from '@angular/core/testing';

import { SmartInsightsService } from './smart-insights-service';

describe('SmartInsightsService', () => {
  let service: SmartInsightsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmartInsightsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
