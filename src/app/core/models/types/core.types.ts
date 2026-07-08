type AppTheme = 'light' | 'dark';
type BudgetCategory = 'needs' | 'wants' | 'savings' | 'uncategorized';
type ToastType = 'success' | 'error' | 'info';
type ConfirmDialogTone = 'danger' | 'warning' | 'info';
type CloudSyncState = 'idle' | 'syncing' | 'synced' | 'error';
type CloudSyncReason =
  | 'expenses-changed'
  | 'goals-changed'
  | 'settings-changed';

export type { 
    AppTheme, 
    BudgetCategory, 
    ToastType, 
    ConfirmDialogTone, 
    CloudSyncState, 
    CloudSyncReason 
};