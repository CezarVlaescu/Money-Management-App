import { TestBed } from '@angular/core/testing';

import { CloudSubscriptionsService } from './cloud-subscriptions-service';

describe('CloudSubscriptionsService', () => {
  let service: CloudSubscriptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudSubscriptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
