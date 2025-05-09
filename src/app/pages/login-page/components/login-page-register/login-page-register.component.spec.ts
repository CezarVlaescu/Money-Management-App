import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageRegisterComponent } from './login-page-register.component';

describe('LoginPageRegisterComponent', () => {
  let component: LoginPageRegisterComponent;
  let fixture: ComponentFixture<LoginPageRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPageRegisterComponent]
    });
    fixture = TestBed.createComponent(LoginPageRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
