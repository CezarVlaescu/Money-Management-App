import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BudgetService } from '../../core/services/budget/budget';
import { ThemeService } from '../../core/services/theme/theme';
import { IncomeCard } from "../../shared/components/income-card/income-card";
import { BudgetCard } from "../../shared/components/budget-card/budget-card";
import { BudgetOverview } from '../../shared/components/budget-overview/budget-overview';
import { SmartInsight } from '../../shared/components/smart-insight/smart-insight';
import { RecentExpenses } from '../../shared/components/recent-expenses/recent-expenses';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule, 
    IncomeCard, 
    BudgetCard, 
    BudgetOverview, 
    SmartInsight,
    RecentExpenses
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  protected readonly budgetService: BudgetService = inject<BudgetService>(BudgetService);
  protected readonly themeService: ThemeService = inject<ThemeService>(ThemeService);
}
