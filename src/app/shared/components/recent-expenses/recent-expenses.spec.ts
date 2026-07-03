import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentExpenses } from './recent-expenses';

describe('RecentExpenses', () => {
  let component: RecentExpenses;
  let fixture: ComponentFixture<RecentExpenses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentExpenses],
    }).compileComponents();

    fixture = TestBed.createComponent(RecentExpenses);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
