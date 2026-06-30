export type BudgetCategory = 'needs' | 'wants' | 'savings';

export interface BudgetItem {
  id: number;
  label: string;
  percentage: number;
  amount: number;
  spent: number;
  category: BudgetCategory;
  icon: string;
  description: string;
}