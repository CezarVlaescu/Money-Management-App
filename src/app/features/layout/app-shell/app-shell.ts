import { Component } from '@angular/core';
import { BottomNavigation } from '../../../shared/components/bottom-navigation/bottom-navigation';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-app-shell',
  imports: [RouterOutlet, BottomNavigation],
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.scss',
})
export class AppShell {}
