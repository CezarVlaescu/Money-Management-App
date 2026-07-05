import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSavingsGoalCard } from './add-savings-goal-card';

describe('AddSavingsGoalCard', () => {
  let component: AddSavingsGoalCard;
  let fixture: ComponentFixture<AddSavingsGoalCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSavingsGoalCard],
    }).compileComponents();

    fixture = TestBed.createComponent(AddSavingsGoalCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
