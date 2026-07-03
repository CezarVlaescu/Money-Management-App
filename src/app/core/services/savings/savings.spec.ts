import { TestBed } from '@angular/core/testing';
import { SavingsGoalsService } from './savings';

describe('SavingsGoalsService', () => {
  let service: SavingsGoalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavingsGoalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
