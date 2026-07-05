import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDecorations } from './app-decorations';

describe('AppDecorations', () => {
  let component: AppDecorations;
  let fixture: ComponentFixture<AppDecorations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppDecorations],
    }).compileComponents();

    fixture = TestBed.createComponent(AppDecorations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
