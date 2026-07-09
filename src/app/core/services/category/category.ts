import { Injectable } from '@angular/core';
import { NEEDS_CONST, WANTS_CONST, SAVINGS_CONST } from '../../../shared/constants/app.constants';
import { CATEGORY } from '../../models/enums/enums.core';
import { CategoryRule } from '../../models/interface/core.interface';
import { BudgetCategory } from '../../models/types/core.types';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private readonly categoryRules: CategoryRule[] = [
    { category: CATEGORY.NEEDS, keywords: NEEDS_CONST },
    { category: CATEGORY.WANTS, keywords: WANTS_CONST },
    { category: CATEGORY.SAVINGS, keywords: SAVINGS_CONST },
  ];

  public detectCategory(value: string): BudgetCategory {
    const normalizedValue: string = this.normalize(value);
    const matchedRule: CategoryRule | undefined = this.categoryRules.find((rule) =>
      rule.keywords.some((keyword) => normalizedValue.includes(this.normalize(keyword))),
    );

    return matchedRule?.category ?? CATEGORY.UNCATEGORIZED;
  }

  public getCategoryLabel(category: BudgetCategory): string {
    const labels: Record<BudgetCategory, string> = {
      needs: CATEGORY.NEEDS,
      wants: CATEGORY.WANTS,
      savings: CATEGORY.SAVINGS,
      uncategorized: CATEGORY.UNCATEGORIZED,
    };

    return labels[category];
  }

  public getCategoryIcon(category: BudgetCategory): string {
    const icons: Record<BudgetCategory, string> = {
      needs: '🧺',
      wants: '🛍️',
      savings: '🐷',
      uncategorized: '✨',
    };

    return icons[category];
  }

  private normalize(value: string): string {
    return value.trim().toLowerCase();
  }
}
