import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExpenseCard } from './add-expense-card';

describe('AddExpenseCard', () => {
  let component: AddExpenseCard;
  let fixture: ComponentFixture<AddExpenseCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddExpenseCard],
    }).compileComponents();

    fixture = TestBed.createComponent(AddExpenseCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
