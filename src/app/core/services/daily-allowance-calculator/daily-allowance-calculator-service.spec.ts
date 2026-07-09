import { TestBed } from '@angular/core/testing';

import { DailyAllowanceCalculatorService } from './daily-allowance-calculator-service';

describe('DailyAllowanceCalculatorService', () => {
  let service: DailyAllowanceCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyAllowanceCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
