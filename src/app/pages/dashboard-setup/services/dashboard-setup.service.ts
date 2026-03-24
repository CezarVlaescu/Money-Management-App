import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { DashboardSetupSteps } from '../../../shared/models/enums';

@Injectable({
  providedIn: 'root'
})
export class DashboardSetupService {
  public isDialogOpen: WritableSignal<boolean> = signal<boolean>(false);
  public isSetupFinalized: WritableSignal<boolean> = signal<boolean>(false);
  public currentStep: WritableSignal<DashboardSetupSteps> = signal<DashboardSetupSteps>(DashboardSetupSteps.FIRST);
  public readonly DashboardSetupSteps = DashboardSetupSteps;
  public readonly progressValue: Signal<number> = computed<number>(() => (this.currentStep() / DashboardSetupSteps.THIRD) * 100);

  public createTheBudgetButtonAction(): void {
    this.currentStep.set(DashboardSetupSteps.FIRST);
    this.isDialogOpen.set(true);
    this.isSetupFinalized.set(false);
  }

  public nextStep(): void {
    this.currentStep.update((step: DashboardSetupSteps) =>
      step < DashboardSetupSteps.THIRD ? step + 1 : step
    );
  }

  public previousStep(): void {
    this.currentStep.update((step: DashboardSetupSteps) =>
      step > DashboardSetupSteps.FIRST ? step - 1 : step
    );
  }

  public onSetupFinalized(): void {
    this.isDialogOpen.set(false);
    this.isSetupFinalized.set(true);
  }

  public onCloseDialog(): void {
    this.isDialogOpen.set(false);
  }
}
