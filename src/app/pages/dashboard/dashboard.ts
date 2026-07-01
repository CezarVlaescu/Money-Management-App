import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Budget } from '../../core/services/budget/budget';
import { Theme } from '../../core/services/theme/theme';
import { IncomeCard } from "../../shared/components/income-card/income-card";
import { BudgetCard } from "../../shared/components/budget-card/budget-card";
import { BudgetOverview } from '../../shared/components/budget-overview/budget-overview';
import { SmartInsight } from '../../shared/components/smart-insight/smart-insight';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule, 
    IncomeCard, 
    BudgetCard, 
    BudgetOverview, 
    SmartInsight
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  protected readonly budgetService: Budget = inject<Budget>(Budget);
  protected readonly themeService: Theme = inject<Theme>(Theme);
}
