import { TestBed } from '@angular/core/testing';

import { CloudUserSettingsService } from './cloud-user-settings-service';

describe('CloudUserSettingsService', () => {
  let service: CloudUserSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudUserSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
