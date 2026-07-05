import { Component, inject } from '@angular/core';
import { ThemeService } from '../../core/services/theme/theme';

@Component({
  selector: 'app-dashboard-hero',
  imports: [],
  templateUrl: './dashboard-hero.html',
  styleUrl: './dashboard-hero.scss',
})
export class DashboardHero {
  protected readonly themeService: ThemeService = inject<ThemeService>(ThemeService);
}
