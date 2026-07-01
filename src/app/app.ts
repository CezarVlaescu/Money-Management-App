import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Theme } from './core/services/theme/theme';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private readonly themeService: Theme = inject<Theme>(Theme);

  public ngOnInit(): void {
    this.themeService.initializeTheme();
  }
}
