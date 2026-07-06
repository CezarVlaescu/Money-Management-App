import { Component } from '@angular/core';
import { BottomNavigation } from '../../shared/components/bottom-navigation/bottom-navigation';
import { RouterOutlet } from '@angular/router';
import { QuickAddExpenseSheet } from '../../shared/components/quick-add-expense-sheet/quick-add-expense-sheet';
import { ToastContainer } from '../../shared/components/toast-container/toast-container';
import { AppDecorations } from '../../shared/components/app-decorations/app-decorations';
import { SavingGoalSheet } from "../../shared/components/saving-goal-sheet/saving-goal-sheet";
import { ConfirmDialog } from "../../shared/components/confirm-dialog/confirm-dialog";
import { OnboardingDialog } from "../../shared/components/onboarding-dialog/onboarding-dialog";

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, BottomNavigation, QuickAddExpenseSheet, ToastContainer, AppDecorations, SavingGoalSheet, ConfirmDialog, OnboardingDialog],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {}
