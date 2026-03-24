import { UnionType } from "typescript";

type UserMonthlyBudgetData = {
    cashIncome: number;
    ticketsVouchers: number;
    basedIncome: number;
    totalMonthlyBudget: number;
}

type UserPeriodBudgetData = {
    budgetPeriod: string;
}

type UserDailyBudgetData = {
    dailySpend: number
    suggestedDailyBudget: number;
}

type UserBudgetData = UserMonthlyBudgetData & UserPeriodBudgetData & UserDailyBudgetData;

export type { 
    UserMonthlyBudgetData,
    UserPeriodBudgetData,
    UserDailyBudgetData,
    UserBudgetData
 }