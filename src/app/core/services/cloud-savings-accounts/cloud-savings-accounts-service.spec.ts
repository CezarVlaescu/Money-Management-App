import { TestBed } from '@angular/core/testing';

import { CloudSavingsAccountsService } from '../cloud-savings-accounts-service';

describe('CloudSavingsAccountsService', () => {
  let service: CloudSavingsAccountsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudSavingsAccountsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
