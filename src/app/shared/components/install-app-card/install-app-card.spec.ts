import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallAppCard } from './install-app-card';

describe('InstallAppCard', () => {
  let component: InstallAppCard;
  let fixture: ComponentFixture<InstallAppCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstallAppCard],
    }).compileComponents();

    fixture = TestBed.createComponent(InstallAppCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
