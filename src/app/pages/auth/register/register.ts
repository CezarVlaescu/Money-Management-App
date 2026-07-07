import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth-service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private readonly formBuilder: FormBuilder = inject<FormBuilder>(FormBuilder);
  private readonly authService: AuthService = inject<AuthService>(AuthService);

  protected readonly loading: WritableSignal<boolean> = signal<boolean>(false);
  protected readonly error: WritableSignal<string | null> = signal<string | null>(null);
  protected readonly success: WritableSignal<string | null> = signal<string | null>(null);

  protected readonly form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  protected async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    try {
      this.loading.set(true);
      this.error.set(null);
      this.success.set(null);

      const { email, password } = this.form.getRawValue();

      await this.authService.signUp(email, password);

      this.success.set('Account created. Please check your email to confirm your account.');
      this.form.reset();
    } catch (error) {
      this.error.set(this.authService.getErrorMessage(error));
    } finally {
      this.loading.set(false);
    }
  }
}
