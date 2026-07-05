import { TestBed } from '@angular/core/testing';

import { AddExpensesSheetService } from './add-expenses-sheet';

describe('AddExpensesSheetService', () => {
  let service: AddExpensesSheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddExpensesSheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
