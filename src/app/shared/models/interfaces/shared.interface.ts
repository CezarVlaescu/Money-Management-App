import { BudgetCategory } from "../../../core/models/types/core.types";

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

export type { NavigationItem, CategoryFilter };