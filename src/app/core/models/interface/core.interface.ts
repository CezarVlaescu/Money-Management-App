import { BudgetCategory, ConfirmDialogTone, ToastType } from "../types/core.types";

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

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
}
interface ConfirmDialogConfig {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: ConfirmDialogTone;
}

interface CloudExpense {
  id: string;
  user_id: string;
  local_id: string | null;
  title: string;
  amount: number;
  category: string;
  expense_date: string;
  note: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

interface CreateCloudExpensePayload {
  user_id: string;
  local_id?: string | null;
  title: string;
  amount: number;
  category: string;
  expense_date: string;
  note?: string | null;
}

interface UpdateCloudExpensePayload {
  title?: string;
  amount?: number;
  category?: string;
  expense_date?: string;
  note?: string | null;
  deleted_at?: string | null;
}

interface CloudSavingsGoal {
  id: string;
  user_id: string;
  local_id: string | null;
  name: string;
  target_amount: number;
  current_amount: number;
  deadline: string | null;
  icon: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

interface CreateCloudSavingsGoalPayload {
  user_id: string;
  local_id?: string | null;
  name: string;
  target_amount: number;
  current_amount: number;
  deadline?: string | null;
  icon?: string | null;
}

interface UpdateCloudSavingsGoalPayload {
  name?: string;
  target_amount?: number;
  current_amount?: number;
  deadline?: string | null;
  icon?: string | null;
  deleted_at?: string | null;
}

interface CloudUserSettings {
  id: string;
  user_id: string;
  monthly_income: number;
  currency: string;
  needs_percentage: number;
  wants_percentage: number;
  savings_percentage: number;
  theme: string | null;
  created_at: string;
  updated_at: string;
}

interface UpsertCloudUserSettingsPayload {
  user_id: string;
  monthly_income: number;
  currency: string;
  needs_percentage: number;
  wants_percentage: number;
  savings_percentage: number;
  theme?: string | null;
}

export type { 
  BudgetBucket, 
  BudgetSummary, 
  Expense, 
  SavingsGoal, 
  CategoryRule, 
  CreateExpensePayload, 
  CreateSavingsGoalPayload,
  Toast,
  BeforeInstallPromptEvent,
  ConfirmDialogConfig,
  CloudExpense,
  CreateCloudExpensePayload,
  UpdateCloudExpensePayload,
  CloudSavingsGoal,
  CreateCloudSavingsGoalPayload,
  UpdateCloudSavingsGoalPayload,
  CloudUserSettings,
  UpsertCloudUserSettingsPayload
};