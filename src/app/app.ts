import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme/theme';
import { PwaInstallService } from './core/services/pwa-install/pwa-install';
import { OnboardingService } from './core/services/onboarding/onboarding-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private readonly themeService: ThemeService = inject<ThemeService>(ThemeService);
  private readonly pwaInstallService: PwaInstallService = inject<PwaInstallService>(PwaInstallService);
  private readonly onboardingService: OnboardingService = inject<OnboardingService>(OnboardingService);

  public ngOnInit(): void {
    this.themeService.initializeTheme();
    this.pwaInstallService.initialize();
    this.onboardingService.initialize();
  }
}
