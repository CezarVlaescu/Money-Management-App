import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudSyncCard } from './cloud-sync-card';

describe('CloudSyncCard', () => {
  let component: CloudSyncCard;
  let fixture: ComponentFixture<CloudSyncCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloudSyncCard],
    }).compileComponents();

    fixture = TestBed.createComponent(CloudSyncCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
