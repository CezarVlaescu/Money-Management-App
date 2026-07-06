import { TestBed } from '@angular/core/testing';

import { SavingsGoalSheetService } from './savings-goal-sheet-service';

describe('SavingsGoalSheetService', () => {
  let service: SavingsGoalSheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavingsGoalSheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
