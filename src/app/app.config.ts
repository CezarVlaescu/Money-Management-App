import { ApplicationConfig, inject, provideAppInitializer } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AuthService } from './core/auth/auth-service';
import { CloudAutoSyncRunnerService } from './core/sync/cloud-auto-sync-runner/cloud-auto-sync-runner-service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAppInitializer(() => {
      const authService: AuthService = inject<AuthService>(AuthService);
      return authService.initSession();
    }),
    provideAppInitializer(() => {
      const cloudAutoSyncRunnerService: CloudAutoSyncRunnerService =
        inject<CloudAutoSyncRunnerService>(CloudAutoSyncRunnerService);
      cloudAutoSyncRunnerService.init();
    }),
  ],
};
