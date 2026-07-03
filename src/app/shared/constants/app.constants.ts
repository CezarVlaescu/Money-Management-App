import { CategoryFilter, NavigationItem } from "../models/interfaces/shared.interface";

const THEME_STORAGE_KEY = 'money-bloom-theme';
const INCOME_STORAGE_KEY = 'money-bloom-income';
const EXPENSES_STORE_KEY = 'money-bloom-expenses';
const SAVINGS_STORE_KEY = 'money-bloom-savings-goals';
const NEEDS_CONST: string[] = [
    'lidl', 'kaufland', 'carrefour', 'mega image',
    'profi', 'auchan', 'penny', 'rent', 'chirie',
    'electricity', 'curent', 'gas', 'gaz', 'water',
    'apa', 'internet', 'orange', 'digi', 'vodafone',
    'bolt', 'uber', 'transport', 'bus', 'metro'
];
const WANTS_CONST: string[] = [
    'netflix', 'spotify', 'youtube', 'cinema',
    'restaurant', 'tazz', 'glovo', 'mcdonald',
    'kfc', 'starbucks', 'hm', 'h&m', 'zara',
    'fashion', 'shopping', 'emag', 'altex'
];
const SAVINGS_CONST: string[] = [
    'xtb', 'vanguard', 'vwce', 'savings',
    'economii', 'deposit', 'depozit',
    'investment', 'investitii', 'revolut vault'
];
const BOTTOM_NAVIGATION_ITEMS: NavigationItem[] = [
    {
      label: 'Home',
      icon: '🏠',
      route: '/dashboard'
    },
    {
      label: 'Expenses',
      icon: '📊',
      route: '/expenses'
    },
    {
      label: 'Goals',
      icon: '🎯',
      route: '/savings-goals'
    }
];
const EXPENSES_FILTERS: CategoryFilter[] = [
    {
      label: 'All',
      value: 'all',
      icon: '✨'
    },
    {
      label: 'Needs',
      value: 'needs',
      icon: '🧺'
    },
    {
      label: 'Wants',
      value: 'wants',
      icon: '🛍️'
    },
    {
      label: 'Savings',
      value: 'savings',
      icon: '🐷'
    }
]

export { 
    THEME_STORAGE_KEY,
    INCOME_STORAGE_KEY,
    EXPENSES_STORE_KEY,
    SAVINGS_STORE_KEY,
    NEEDS_CONST,
    WANTS_CONST,
    SAVINGS_CONST,
    BOTTOM_NAVIGATION_ITEMS,
    EXPENSES_FILTERS
};