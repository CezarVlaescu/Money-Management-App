import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartInsights } from './smart-insights';

describe('SmartInsights', () => {
  let component: SmartInsights;
  let fixture: ComponentFixture<SmartInsights>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartInsights],
    }).compileComponents();

    fixture = TestBed.createComponent(SmartInsights);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
