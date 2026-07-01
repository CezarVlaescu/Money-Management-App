import { BudgetCategory } from "../types/core.types";

interface BudgetBucket {
  category: BudgetCategory;
  label: string;
  percentage: number;
  amount: number;
  spent: number;
  remaining: number;
  progress: number;
  icon: string;
  description: string;
  actionLabel: string;
}

interface BudgetSummary {
  income: number;
  needs: BudgetBucket;
  wants: BudgetBucket;
  savings: BudgetBucket;
  totalSpent: number;
  totalRemaining: number;
  yearlySavingsPotential: number;
}

interface Expense {
  id: string;
  title: string;
  amount: number;
  category: BudgetCategory;
  date: string;
  note?: string;
  merchant?: string;
  createdAt: string;
}

interface SavingsGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  monthlyContribution?: number;
  icon: string;
  color?: string;
  createdAt: string;
}

interface CategoryRule {
  category: BudgetCategory;
  keywords: string[];
}

interface CreateExpensePayload {
  title: string;
  amount: number;
  date?: string;
  note?: string;
  category?: BudgetCategory;
}

interface CreateSavingsGoalPayload {
  title: string;
  targetAmount: number;
  currentAmount?: number;
  monthlyContribution?: number;
  icon?: string;
  color?: string;
}

export type { 
  BudgetBucket, 
  BudgetSummary, 
  Expense, 
  SavingsGoal, 
  CategoryRule, 
  CreateExpensePayload, 
  CreateSavingsGoalPayload 
};