import {
  BudgetCategory,
  CalendarDayStatus,
  CloudSyncReason,
  CloudSyncState,
  ConfirmDialogTone,
  DeletedEntityType,
  MoneyInsightCategory,
  MoneyInsightType,
  SavingsAccountType,
  SourceType,
  SubscriptionCategoryType,
  SubscriptionFrequency,
  SubscriptionPaymentStatus,
  ToastType,
} from '../types/core.types';

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
  updatedAt?: string;
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
  updatedAt?: string;
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
  category: BudgetCategory;
  expense_date: string;
  source_type: SourceType;
  subscription_payment_id: string | null;
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
  source_type?: SourceType;
  subscription_payment_id?: string | null;
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

interface CloudRestoreResult {
  settingsRestored: boolean;
  expensesCount: number;
  goalsCount: number;
  spendingPeriodsCount: number;
  subscriptionsCount: number;
  subscriptionPaymentsCount: number;
  savingsAccountsCount: number;
}

interface CloudSyncStatus {
  hasCloudData: boolean;
  hasSettings: boolean;
  expensesCount: number;
  goalsCount: number;
  spendingPeriodsCount: number;
  subscriptionsCount: number;
  subscriptionPaymentsCount: number;
  checkedAt: string;
  savingsAccountsCount: number;
}

interface CloudSyncMeta {
  lastBackupAt: string | null;
  lastRestoreAt: string | null;
  lastErrorAt: string | null;
  lastErrorMessage: string | null;
  state: CloudSyncState;
}

interface CloudSyncRequest {
  reason: CloudSyncReason;
  requestedAt: string;
}

interface LocalDeletionTombstone {
  entityType: DeletedEntityType;
  localId: string;
  deletedAt: string;
}

interface UpdateSavingsGoalPayload {
  title?: string;
  targetAmount?: number;
  currentAmount?: number;
  monthlyContribution?: number;
  icon?: string;
}

interface CloudSpendingPeriod {
  id: string;
  user_id: string;
  period_start: string;
  period_end: string;
  daily_limit: number;
  currency: string;
  include_planned_recurring: boolean;
  created_at: string;
  updated_at: string;
}

interface CreateCloudSpendingPeriodPayload {
  user_id: string;
  period_start: string;
  period_end: string;
  daily_limit: number;
  currency?: string;
  include_planned_recurring?: boolean;
}

interface UpdateCloudSpendingPeriodPayload {
  daily_limit?: number;
  currency?: string;
  include_planned_recurring?: boolean;
  updated_at?: string;
}

interface CalendarDayBudget {
  date: string;
  dayNumber: number;
  isToday: boolean;
  isFuture: boolean;
  spent: number;
  allowanceAtStartOfDay: number;
  remainingAfterSpend: number;
  status: CalendarDayStatus;
}

interface DailyAllowanceSummary {
  periodStart: string;
  periodEnd: string;
  dailyLimit: number;
  monthlyBudget: number;
  spentBeforeToday: number;
  spentToday: number;
  spentThisMonth: number;
  daysLeftIncludingToday: number;
  adaptiveDailyAllowance: number;
  todayRemaining: number;
  remainingMonthlyBudget: number;
  isOverBudget: boolean;
}

interface AllowanceExpense {
  id: string;
  amount: number;
  date: string;
}

interface CloudSubscription {
  id: string;
  user_id: string;
  name: string;
  amount: number;
  currency: string;
  category_type: SubscriptionCategoryType;
  frequency: SubscriptionFrequency;
  due_day: number;
  start_date: string;
  end_date: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

interface CreateCloudSubscriptionPayload {
  user_id: string;
  name: string;
  amount: number;
  currency?: string;
  category_type: SubscriptionCategoryType;
  frequency?: SubscriptionFrequency;
  due_day: number;
  start_date?: string;
  end_date?: string | null;
  is_active?: boolean;
}

interface UpdateCloudSubscriptionPayload {
  name?: string;
  amount?: number;
  currency?: string;
  category_type?: SubscriptionCategoryType;
  frequency?: SubscriptionFrequency;
  due_day?: number;
  start_date?: string;
  end_date?: string | null;
  is_active?: boolean;
  updated_at?: string;
  deleted_at?: string | null;
}

interface CloudSubscriptionPayment {
  id: string;
  user_id: string;
  subscription_id: string;
  period_start: string;
  due_date: string;
  amount: number;
  currency: string;
  status: SubscriptionPaymentStatus;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  cleared_at: string | null;
}
interface CreateCloudSubscriptionPaymentPayload {
  user_id: string;
  subscription_id: string;
  period_start: string;
  due_date: string;
  amount: number;
  currency?: string;
  status?: SubscriptionPaymentStatus;
  paid_at?: string | null;
}
interface UpdateCloudSubscriptionPaymentPayload {
  amount?: number;
  currency?: string;
  due_date?: string;
  status?: SubscriptionPaymentStatus;
  paid_at?: string | null;
  updated_at?: string;
  deleted_at?: string | null;
  cleared_at?: string | null;
}

interface SubscriptionPaymentItem {
  payment: CloudSubscriptionPayment;
  subscription: CloudSubscription | null;
  name: string;
  amount: number;
  currency: string;
  dueDate: string;
  status: CloudSubscriptionPayment['status'];
}

interface CreateSubscriptionExpenseParams {
  paymentId: string;
  subscriptionName: string;
  amount: number;
  expenseDate: string;
  categoryType: BudgetCategory;
}

interface CloudSavingsAccount {
  id: string;
  user_id: string;
  name: string;
  type: SavingsAccountType;
  current_amount: number;
  currency: string;
  institution: string | null;
  note: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

interface CreateCloudSavingsAccountPayload {
  user_id: string;
  name: string;
  type: SavingsAccountType;
  current_amount: number;
  currency?: string;
  institution?: string | null;
  note?: string | null;
  is_active?: boolean;
}

interface UpdateCloudSavingsAccountPayload {
  name?: string;
  type?: SavingsAccountType;
  current_amount?: number;
  currency?: string;
  institution?: string | null;
  note?: string | null;
  is_active?: boolean;
  updated_at?: string;
  deleted_at?: string | null;
}

interface MoneyInsight {
  id: string;
  type: MoneyInsightType;
  category: MoneyInsightCategory;
  title: string;
  message: string;
  icon: string;
  priority: number;
  actionLabel?: string;
  route?: string;
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
  UpsertCloudUserSettingsPayload,
  CloudRestoreResult,
  CloudSyncStatus,
  CloudSyncMeta,
  CloudSyncRequest,
  LocalDeletionTombstone,
  UpdateSavingsGoalPayload,
  CalendarDayBudget,
  DailyAllowanceSummary,
  AllowanceExpense,
  CloudSpendingPeriod,
  CreateCloudSpendingPeriodPayload,
  UpdateCloudSpendingPeriodPayload,
  CloudSubscription,
  CreateCloudSubscriptionPayload,
  UpdateCloudSubscriptionPayload,
  CreateCloudSubscriptionPaymentPayload,
  UpdateCloudSubscriptionPaymentPayload,
  SubscriptionPaymentItem,
  CreateSubscriptionExpenseParams,
  CloudSubscriptionPayment,
  CloudSavingsAccount,
  CreateCloudSavingsAccountPayload,
  UpdateCloudSavingsAccountPayload,
  MoneyInsight,
};
