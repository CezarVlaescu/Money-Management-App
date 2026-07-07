import { TestBed } from '@angular/core/testing';

import { CloudExpensesService } from './cloud-expenses-service';

describe('CloudExpensesService', () => {
  let service: CloudExpensesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudExpensesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
