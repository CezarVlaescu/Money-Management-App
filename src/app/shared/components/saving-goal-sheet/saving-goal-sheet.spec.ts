import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingGoalSheet } from './saving-goal-sheet';

describe('SavingGoalSheet', () => {
  let component: SavingGoalSheet;
  let fixture: ComponentFixture<SavingGoalSheet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavingGoalSheet],
    }).compileComponents();

    fixture = TestBed.createComponent(SavingGoalSheet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
