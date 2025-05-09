import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageLoginComponent } from './login-page-login.component';

describe('LoginPageLoginComponent', () => {
  let component: LoginPageLoginComponent;
  let fixture: ComponentFixture<LoginPageLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPageLoginComponent]
    });
    fixture = TestBed.createComponent(LoginPageLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
