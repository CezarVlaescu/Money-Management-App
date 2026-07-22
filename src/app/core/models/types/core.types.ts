type AppTheme = 'light' | 'dark';
type BudgetCategory = 'needs' | 'wants' | 'savings' | 'uncategorized';
type SubscriptionCategoryType = BudgetCategory;
type SubscriptionFrequency = 'monthly';
type ToastType = 'success' | 'error' | 'info';
type ConfirmDialogTone = 'danger' | 'warning' | 'info';
type CloudSyncState = 'idle' | 'syncing' | 'synced' | 'error';
type CloudSyncReason = 'expenses-changed' | 'goals-changed' | 'settings-changed';
type DeletedEntityType = 'expense' | 'goal';
type CalendarDayStatus = 'future' | 'today' | 'under-budget' | 'over-budget' | 'no-spending';
type MonthState = 'past' | 'current' | 'future';
type SubscriptionPaymentStatus = 'pending' | 'paid' | 'skipped';
type SourceType = 'manual' | 'subscription';
type SavingsAccountType = 'cash' | 'bank_account' | 'investment' | 'deposit' | 'other';
type MoneyInsightType = 'info' | 'success' | 'warning' | 'danger';
type MoneyInsightCategory =
  | 'spending'
  | 'subscriptions'
  | 'savings'
  | 'daily_allowance'
  | 'goals'
  | 'forecast'
  | 'budget_split';

export type {
  AppTheme,
  BudgetCategory,
  ToastType,
  ConfirmDialogTone,
  CloudSyncState,
  CloudSyncReason,
  DeletedEntityType,
  CalendarDayStatus,
  MonthState,
  SubscriptionCategoryType,
  SubscriptionFrequency,
  SubscriptionPaymentStatus,
  SourceType,
  SavingsAccountType,
  MoneyInsightCategory,
  MoneyInsightType,
};
