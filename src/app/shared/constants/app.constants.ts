import { CloudSyncMeta } from '../../core/models/interface/core.interface';
import { BudgetCategory } from '../../core/models/types/core.types';
import {
  CategoryFilter,
  NavigationItem,
  OnboardingStep,
} from '../models/interfaces/shared.interface';

const THEME_STORAGE_KEY = 'money-bloom-theme';
const INCOME_STORAGE_KEY = 'money-bloom-income';
const EXPENSES_STORE_KEY = 'money-bloom-expenses';
const SAVINGS_STORE_KEY = 'money-bloom-savings-goals';
const ONBOARDING_STORAGE_KEY = 'money-bloom-onboarding-completed';
const CLOUD_RESTORE_PROMPT_KEY = 'money-bloom-cloud-restore-prompt-seen';
const CLOUD_SYNC_META_SERVICE_KEY = 'money-bloom-cloud-sync-meta';
const LOCAL_DELETION_TOMBSTONE_KEY = 'money-bloom-local-deletion-tombstones';

const NEEDS_CONST: string[] = [
  'lidl',
  'kaufland',
  'carrefour',
  'mega image',
  'profi',
  'auchan',
  'penny',
  'rent',
  'chirie',
  'electricity',
  'curent',
  'gas',
  'gaz',
  'water',
  'apa',
  'internet',
  'orange',
  'digi',
  'vodafone',
  'bolt',
  'uber',
  'transport',
  'bus',
  'metro',
];
const WANTS_CONST: string[] = [
  'netflix',
  'spotify',
  'youtube',
  'cinema',
  'restaurant',
  'tazz',
  'glovo',
  'mcdonald',
  'kfc',
  'starbucks',
  'hm',
  'h&m',
  'zara',
  'fashion',
  'shopping',
  'emag',
  'altex',
];
const SAVINGS_CONST: string[] = [
  'xtb',
  'vanguard',
  'vwce',
  'savings',
  'economii',
  'deposit',
  'depozit',
  'investment',
  'investitii',
  'revolut vault',
];
const BOTTOM_NAVIGATION_ITEMS: NavigationItem[] = [
  {
    label: 'Home',
    icon: '🏠',
    route: '/dashboard',
  },
  {
    label: 'Expenses',
    icon: '📊',
    route: '/expenses',
  },
  {
    label: 'Goals',
    icon: '🎯',
    route: '/savings-goals',
  },
  {
    label: 'Settings',
    icon: '⚙️',
    route: '/settings',
  },
];
const EXPENSES_FILTERS: CategoryFilter[] = [
  {
    label: 'All',
    value: 'all',
    icon: '✨',
  },
  {
    label: 'Needs',
    value: 'needs',
    icon: '🧺',
  },
  {
    label: 'Wants',
    value: 'wants',
    icon: '🛍️',
  },
  {
    label: 'Savings',
    value: 'savings',
    icon: '🐷',
  },
];

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    icon: '🌷',
    eyebrow: 'Welcome',
    title: 'Make your money bloom',
    description:
      'Money Bloom helps you organize your monthly income using the simple 50/30/20 budgeting method.',
  },
  {
    icon: '💸',
    eyebrow: 'Track',
    title: 'Add your transactions',
    description:
      'Add expenses manually and Money Bloom will try to detect if they belong to Needs, Wants or Savings.',
  },
  {
    icon: '🎯',
    eyebrow: 'Plan',
    title: 'Create savings goals',
    description:
      'Track progress for your emergency fund, vacation, home, car or any other financial goal.',
  },
  {
    icon: '🔐',
    eyebrow: 'Local-first',
    title: 'Your data stays on this device',
    description:
      'Money Bloom V1 stores data locally in your browser. You can export a backup from Settings.',
  },
];

const CATEGORIES_CONST: BudgetCategory[] = ['needs', 'wants', 'savings'];
const ICON_OPTIONS_CONST: string[] = ['🎯', '🏖️', '🛟', '🏠', '🚗', '💻', '💍', '📚'];
const DEFAULT_CLOUD_SYNC_META: CloudSyncMeta = {
  lastBackupAt: null,
  lastRestoreAt: null,
  lastErrorAt: null,
  lastErrorMessage: null,
  state: 'idle',
};
const DAY_WEEK_CONST: string[] = ['Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sâm', 'Dum'];

export {
  THEME_STORAGE_KEY,
  INCOME_STORAGE_KEY,
  EXPENSES_STORE_KEY,
  SAVINGS_STORE_KEY,
  NEEDS_CONST,
  WANTS_CONST,
  SAVINGS_CONST,
  BOTTOM_NAVIGATION_ITEMS,
  EXPENSES_FILTERS,
  CATEGORIES_CONST,
  ICON_OPTIONS_CONST,
  ONBOARDING_STORAGE_KEY,
  ONBOARDING_STEPS,
  CLOUD_RESTORE_PROMPT_KEY,
  DEFAULT_CLOUD_SYNC_META,
  CLOUD_SYNC_META_SERVICE_KEY,
  LOCAL_DELETION_TOMBSTONE_KEY,
  DAY_WEEK_CONST,
};
