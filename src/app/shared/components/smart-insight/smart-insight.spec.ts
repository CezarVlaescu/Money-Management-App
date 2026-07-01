import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartInsight } from './smart-insight';

describe('SmartInsight', () => {
  let component: SmartInsight;
  let fixture: ComponentFixture<SmartInsight>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartInsight],
    }).compileComponents();

    fixture = TestBed.createComponent(SmartInsight);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
