import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth-service';

const authenticatedGuard: CanMatchFn = () => {
  const authService: AuthService = inject<AuthService>(AuthService);
  const router: Router = inject<Router>(Router);

  if (authService.isLoggedIn()) return true;

  return router.createUrlTree(['/auth/login']);
};

const authPageGuard: CanMatchFn = () => {
  const authService: AuthService = inject<AuthService>(AuthService);
  const router: Router = inject<Router>(Router);

  if (authService.isLoggedIn()) return router.createUrlTree(['/dashboard']);

  return true;
};

export { authenticatedGuard, authPageGuard }
