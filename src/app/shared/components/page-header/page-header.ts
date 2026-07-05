import { Component, inject, input } from '@angular/core';
import { ThemeService } from '../../../core/services/theme/theme';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.html',
  styleUrl: './page-header.scss',
})
export class PageHeader {
  public readonly eyebrow = input.required<string>();
  public readonly title = input.required<string>();
  public readonly description = input<string>('');
  public readonly highlight = input<string>('');
  public readonly showThemeButton = input<boolean>(false);

  protected readonly themeService: ThemeService = inject<ThemeService>(ThemeService);
}
