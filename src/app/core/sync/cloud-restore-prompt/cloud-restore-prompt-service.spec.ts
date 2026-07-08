import { TestBed } from '@angular/core/testing';

import { CloudRestorePromptService } from './cloud-restore-prompt-service';

describe('CloudRestorePromptService', () => {
  let service: CloudRestorePromptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudRestorePromptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
