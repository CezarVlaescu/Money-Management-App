import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSetupComponent } from './dashboard-setup.component';

describe('DashboardSetupComponent', () => {
  let component: DashboardSetupComponent;
  let fixture: ComponentFixture<DashboardSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardSetupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
