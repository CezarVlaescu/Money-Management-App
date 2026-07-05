import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BOTTOM_NAVIGATION_ITEMS } from '../../constants/app.constants';
import { NavigationItem } from '../../models/interfaces/shared.interface';
import { AddExpensesSheetService } from '../../../core/services/add-expenses-sheet/add-expenses-sheet';

@Component({
  selector: 'app-bottom-navigation',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './bottom-navigation.html',
  styleUrl: './bottom-navigation.scss',
})
export class BottomNavigation {
  protected readonly addExpensesSheetService: AddExpensesSheetService = inject<AddExpensesSheetService>(AddExpensesSheetService);
  protected readonly bottomNavigationItems: NavigationItem[] = BOTTOM_NAVIGATION_ITEMS;
}
