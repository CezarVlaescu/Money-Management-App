import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword {
  private readonly formBuilder: FormBuilder = inject<FormBuilder>(FormBuilder);
  private readonly authService: AuthService = inject<AuthService>(AuthService);

  protected readonly loading: WritableSignal<boolean> = signal<boolean>(false);
  protected readonly error: WritableSignal<string | null> = signal<string | null>(null);
  protected readonly success: WritableSignal<string | null> = signal<string | null>(null);

  protected readonly form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]]
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

      const { email } = this.form.getRawValue();

      await this.authService.resetPassword(email);

      this.success.set('Password reset email sent. Please check your inbox.');
      this.form.reset();
    } catch (error) {
      this.error.set(this.authService.getErrorMessage(error));
    } finally {
      this.loading.set(false);
    }
  }
}
