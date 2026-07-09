import { BudgetCategory } from '../../../core/models/types/core.types';

interface NavigationItem {
  label: string;
  icon: string;
  route: string;
}
interface CategoryFilter {
  label: string;
  value: BudgetCategory | 'all';
  icon: string;
}
interface OnboardingStep {
  icon: string;
  eyebrow: string;
  title: string;
  description: string;
}

export type { NavigationItem, CategoryFilter, OnboardingStep };
