import { Component, inject } from '@angular/core';
import { BudgetService } from '../../core/services/budget/budget';
import { IncomeCard } from '../../shared/components/income-card/income-card';
import { BudgetCard } from '../../shared/components/budget-card/budget-card';
import { BudgetOverview } from '../../shared/components/budget-overview/budget-overview';
import { SmartInsight } from '../../shared/components/smart-insight/smart-insight';
import { RecentExpenses } from '../../shared/components/recent-expenses/recent-expenses';
import { DashboardHero } from '../../features/dashboard-hero/dashboard-hero';

@Component({
  selector: 'app-dashboard',
  imports: [IncomeCard, BudgetCard, BudgetOverview, SmartInsight, RecentExpenses, DashboardHero],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  protected readonly budgetService: BudgetService = inject<BudgetService>(BudgetService);
}
