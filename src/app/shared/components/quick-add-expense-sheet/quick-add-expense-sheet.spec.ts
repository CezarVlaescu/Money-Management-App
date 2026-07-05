import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickAddExpenseSheet } from './quick-add-expense-sheet';

describe('QuickAddExpenseSheet', () => {
  let component: QuickAddExpenseSheet;
  let fixture: ComponentFixture<QuickAddExpenseSheet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickAddExpenseSheet],
    }).compileComponents();

    fixture = TestBed.createComponent(QuickAddExpenseSheet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
