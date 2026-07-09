import { TestBed } from '@angular/core/testing';

import { CloudSubscriptionPaymentsService } from './cloud-subscription-payments-service';

describe('CloudSubscriptionPaymentsService', () => {
  let service: CloudSubscriptionPaymentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudSubscriptionPaymentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
