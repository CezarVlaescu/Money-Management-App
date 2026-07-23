import {
  Component,
  computed,
  ElementRef,
  inject,
  OnInit,
  signal,
  Signal,
  viewChild,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SavingsGoalsService } from '../../core/services/savings/savings';
import { MoneyFormatter } from '../../shared/services/moeny-formatter/money-formatter';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { SavingsGoalCard } from '../../shared/components/savings-goal-card/savings-goal-card';
import { AddSavingsGoalCard } from '../../shared/components/add-savings-goal-card/add-savings-goal-card';
import { ToastService } from '../../core/services/toast/toast';
import { EmptyState } from '../../shared/components/empty-state/empty-state';
import { SavingsGoalSheetService } from '../../core/services/savings-goal-sheet/savings-goal-sheet-service';
import { CloudSavingsAccount, SavingsGoal } from '../../core/models/interface';
import { ConfirmDialogService } from '../../core/services/confirm-dialog/confirm-dialog-service';
import { CloudSavingsAccountsService } from '../../core/services/cloud-savings-accounts/cloud-savings-accounts-service';
import { SavingsAccountType } from '../../core/models/types/core.types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-saving-goals',
  imports: [FormsModule, PageHeader, SavingsGoalCard, AddSavingsGoalCard, EmptyState, CommonModule],
  templateUrl: './saving-goals.html',
  styleUrl: './saving-goals.scss',
})
export class SavingGoals implements OnInit {
  private readonly addGoalSection: Signal<ElementRef<HTMLElement> | undefined> =
    viewChild<ElementRef<HTMLElement>>('addGoalSection');

  protected readonly savingsGoalsService: SavingsGoalsService =
    inject<SavingsGoalsService>(SavingsGoalsService);
  protected readonly moneyFormatter: MoneyFormatter = inject<MoneyFormatter>(MoneyFormatter);
  private readonly confirmDialogService: ConfirmDialogService =
    inject<ConfirmDialogService>(ConfirmDialogService);
  private readonly toastService: ToastService = inject<ToastService>(ToastService);
  private readonly savingsGoalSheetService: SavingsGoalSheetService =
    inject<SavingsGoalSheetService>(SavingsGoalSheetService);
  private readonly cloudSavingsAccountsService: CloudSavingsAccountsService =
    inject<CloudSavingsAccountsService>(CloudSavingsAccountsService);

  protected readonly savingsAccounts: WritableSignal<CloudSavingsAccount[]> = signal<
    CloudSavingsAccount[]
  >([]);

  protected readonly loadingSavingsAccounts: WritableSignal<boolean> = signal<boolean>(false);

  protected readonly savingsAccountsError: WritableSignal<string | null> = signal<string | null>(
    null,
  );

  protected readonly addingSavingsAccount: WritableSignal<boolean> = signal<boolean>(false);

  protected readonly editingSavingsAccount: WritableSignal<CloudSavingsAccount | null> =
    signal<CloudSavingsAccount | null>(null);

  protected readonly savingSavingsAccount: WritableSignal<boolean> = signal<boolean>(false);

  protected readonly savingsAccountNameInput: WritableSignal<string> = signal<string>('');

  protected readonly savingsAccountAmountInput: WritableSignal<string> = signal<string>('');

  protected readonly savingsAccountTypeInput: WritableSignal<SavingsAccountType> =
    signal<SavingsAccountType>('bank_account');

  protected readonly savingsAccountInstitutionInput: WritableSignal<string> = signal<string>('');

  protected readonly savingsAccountNoteInput: WritableSignal<string> = signal<string>('');

  protected readonly totalSavingsAccountsAmount = computed<number>(() => {
    return this.savingsAccounts().reduce(
      (total, account) => total + Number(account.current_amount),
      0,
    );
  });

  protected readonly savingsAccountFormOpen = computed<boolean>(() => {
    return this.addingSavingsAccount() || !!this.editingSavingsAccount();
  });

  public async ngOnInit(): Promise<void> {
    await this.loadSavingsAccounts();
  }

  protected addMoney(goalId: string): void {
    this.savingsGoalsService.addContribution(goalId, 100);
    this.toastService.success('Added 100 RON to goal');
  }

  protected async deleteGoal(goalId: string): Promise<void> {
    const confirmed = await this.confirmDialogService.confirm({
      title: 'Delete savings goal?',
      message: 'This goal and its progress will be removed from your device.',
      confirmLabel: 'Delete',
      cancelLabel: 'Keep goal',
      tone: 'danger',
    });

    if (!confirmed) return;

    this.savingsGoalsService.deleteGoal(goalId);
    this.toastService.info('Goal deleted');
  }

  protected scrollToAddGoal(): void {
    this.addGoalSection()?.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }

  protected startAddingSavingsAccount(): void {
    this.editingSavingsAccount.set(null);

    this.savingsAccountNameInput.set('');
    this.savingsAccountAmountInput.set('');
    this.savingsAccountTypeInput.set('bank_account');
    this.savingsAccountInstitutionInput.set('');
    this.savingsAccountNoteInput.set('');

    this.addingSavingsAccount.set(true);
  }

  protected startEditingSavingsAccount(account: CloudSavingsAccount): void {
    this.addingSavingsAccount.set(false);
    this.editingSavingsAccount.set(account);

    this.savingsAccountNameInput.set(account.name);
    this.savingsAccountAmountInput.set(String(account.current_amount));
    this.savingsAccountTypeInput.set(account.type);
    this.savingsAccountInstitutionInput.set(account.institution ?? '');
    this.savingsAccountNoteInput.set(account.note ?? '');
  }

  protected cancelSavingsAccountForm(): void {
    this.addingSavingsAccount.set(false);
    this.editingSavingsAccount.set(null);

    this.savingsAccountNameInput.set('');
    this.savingsAccountAmountInput.set('');
    this.savingsAccountTypeInput.set('bank_account');
    this.savingsAccountInstitutionInput.set('');
    this.savingsAccountNoteInput.set('');
  }

  protected editGoal(goal: SavingsGoal): void {
    this.savingsGoalSheetService.open(goal);
  }

  protected onGoalAdded(): void {
    // Momentan nu trebuie să facă nimic.
    // Lăsăm metoda pentru extensie: toast, scroll, analytics, etc.
  }

  protected async saveSavingsAccount(): Promise<void> {
    const name = this.savingsAccountNameInput().trim();
    const amount = Number(this.savingsAccountAmountInput());
    const type = this.savingsAccountTypeInput();
    const institution = this.savingsAccountInstitutionInput().trim();
    const note = this.savingsAccountNoteInput().trim();

    if (!name) {
      this.savingsAccountsError.set('Please enter a savings place name.');
      return;
    }

    if (!Number.isFinite(amount) || amount < 0) {
      this.savingsAccountsError.set('Please enter a valid amount.');
      return;
    }

    try {
      this.savingSavingsAccount.set(true);
      this.savingsAccountsError.set(null);

      const editingAccount = this.editingSavingsAccount();

      if (editingAccount) {
        await this.cloudSavingsAccountsService.updateSavingsAccount(editingAccount.id, {
          name,
          type,
          current_amount: amount,
          currency: 'RON',
          institution: institution || null,
          note: note || null,
        });

        this.toastService.info('Savings place updated');
      } else {
        await this.cloudSavingsAccountsService.createSavingsAccount({
          name,
          type,
          current_amount: amount,
          currency: 'RON',
          institution: institution || null,
          note: note || null,
          is_active: true,
        });

        this.toastService.info('Savings place added');
      }

      this.cancelSavingsAccountForm();
      await this.loadSavingsAccounts();
    } catch (error) {
      this.savingsAccountsError.set(
        error instanceof Error ? error.message : 'Could not save savings place.',
      );
    } finally {
      this.savingSavingsAccount.set(false);
    }
  }

  protected async deleteSavingsAccount(account: CloudSavingsAccount): Promise<void> {
    const confirmed = await this.confirmDialogService.confirm({
      title: 'Delete savings place?',
      message: `This will remove ${account.name} from your savings overview.`,
      confirmLabel: 'Delete',
      cancelLabel: 'Cancel',
      tone: 'danger',
    });

    if (!confirmed) return;

    try {
      this.savingsAccountsError.set(null);

      await this.cloudSavingsAccountsService.softDeleteSavingsAccount(account.id);

      this.toastService.info('Savings place deleted');
      await this.loadSavingsAccounts();
    } catch (error) {
      this.savingsAccountsError.set(
        error instanceof Error ? error.message : 'Could not delete savings place.',
      );
    }
  }

  protected getSavingsAccountTypeLabel(type: SavingsAccountType): string {
    const labels: Record<SavingsAccountType, string> = {
      cash: 'Cash',
      bank_account: 'Bank account',
      investment: 'Investment',
      deposit: 'Deposit',
      other: 'Other',
    };

    return labels[type];
  }

  protected getSavingsAccountIcon(type: SavingsAccountType): string {
    const icons: Record<SavingsAccountType, string> = {
      cash: '💵',
      bank_account: '🏦',
      investment: '📈',
      deposit: '🔒',
      other: '💰',
    };

    return icons[type];
  }

  private async loadSavingsAccounts(): Promise<void> {
    try {
      this.loadingSavingsAccounts.set(true);
      this.savingsAccountsError.set(null);

      const accounts = await this.cloudSavingsAccountsService.getSavingsAccounts();

      this.savingsAccounts.set(accounts);
    } catch (error) {
      this.savingsAccountsError.set(
        error instanceof Error ? error.message : 'Could not load savings accounts.',
      );
    } finally {
      this.loadingSavingsAccounts.set(false);
    }
  }
}
