import { Component, computed, Signal, signal, WritableSignal } from '@angular/core';
import { ButtonComponentConfig, DialogComponentConfig, IconComponentConfig } from '../../shared/models/interfaces';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ButtonComponent } from '../../shared/components/button-component/button.component';
import { IconComponent } from '../../shared/components/icon-component/icon.component';
import { FirstStepComponent } from "./components/first-step/first-step.component";
import { SecondStepComponent } from "./components/second-step/second-step.component";
import { ThirdStepComponent } from "./components/third-step/third-step.component";
import { DialogComponent } from '../../shared/components/dialog-component/dialog.component';
import { DashboardSetupSteps } from '../../shared/models/enums';

@Component({
  selector: 'app-dashboard-setup',
  imports: [IconComponent, ButtonComponent, MatProgressBarModule, FirstStepComponent, SecondStepComponent, ThirdStepComponent, DialogComponent],
  templateUrl: './dashboard-setup.component.html',
  styleUrl: './dashboard-setup.component.scss'
})
export class DashboardSetupComponent {
  protected readonly DashboardSetupSteps = DashboardSetupSteps;
  protected isDialogOpen: WritableSignal<boolean> = signal<boolean>(false);
  protected currentStep: WritableSignal<DashboardSetupSteps> = signal<DashboardSetupSteps>(DashboardSetupSteps.FIRST);
  protected readonly dialogConfig: DialogComponentConfig = { dialogHeaderTitle: "Budget Setup" };
  
  protected readonly iconConfig: IconComponentConfig = {
    iconName: 'attach_money',
    containerColor: 'var(--primary-gradient)',
    containerWidth: 100,
    containerHeight: 100,
    iconSize: 60,
    iconColor: 'var(--white-100)'
  }

  protected readonly createBudgetbuttonConfig: ButtonComponentConfig = {
    buttonColor: 'var(--primary-gradient)',
    buttonText: 'Create your budget',
    buttonIcon: 'add',
    buttonIconColor: 'var(--white-100)',
    buttonAction: () => this.createTheBudgetButtonAction()
  }

  protected readonly continueFinalButtonConfig: ButtonComponentConfig = {
    buttonText: 'Continue',
    buttonColor: 'var(--success-gradient)',
    buttonAction: () => this.isDialogOpen.set(false)
  }

  protected readonly continueButtonConfig: ButtonComponentConfig = {
    buttonText: 'Continue',
    buttonColor: 'var(--primary-gradient)',
    buttonAction: () => this.nextStep()
  }

  protected readonly backButtonConfig: ButtonComponentConfig = {
    buttonText: 'Back',
    buttonColor: 'transparent',
    buttonBorder: '1px solid var(--gray-500)',
    buttonAction: () => this.previousStep()
  }

  protected readonly progressValue: Signal<number> = computed<number>(() => (this.currentStep() / DashboardSetupSteps.THIRD) * 100);

  protected nextStep(): void {
    this.currentStep.update((step) =>
      step < DashboardSetupSteps.THIRD ? step + 1 : step
    );
  }

  protected previousStep(): void {
    this.currentStep.update((step) =>
      step > DashboardSetupSteps.FIRST ? step - 1 : step
    );
  }

  private createTheBudgetButtonAction(): void {
    this.currentStep.set(DashboardSetupSteps.FIRST);
    this.isDialogOpen.set(true);
  }
}
