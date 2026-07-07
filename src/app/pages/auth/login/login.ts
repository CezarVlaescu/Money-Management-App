import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly formBuilder: FormBuilder = inject<FormBuilder>(FormBuilder);
  private readonly router: Router = inject<Router>(Router);
  private readonly authService: AuthService = inject<AuthService>(AuthService);

  protected readonly loading: WritableSignal<boolean> = signal<boolean>(false);
  protected readonly error: WritableSignal<string | null> = signal<string | null>(null);

  protected readonly form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  protected async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    try {
      this.loading.set(true);
      this.error.set(null);

      const { email, password } = this.form.getRawValue();

      await this.authService.signIn(email, password);
      await this.router.navigate(['/dashboard']);
    } catch (error) {
      this.error.set(this.authService.getErrorMessage(error));
    } finally {
      this.loading.set(false);
    }
  }

  protected async continueAsGuest(): Promise<void> {
    await this.router.navigate(['/dashboard']);
  }
}
