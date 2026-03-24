import { Component, inject, output, OutputEmitterRef } from '@angular/core';
import { ButtonComponentConfig, DialogComponentConfig, IconComponentConfig } from '../../shared/models/interfaces';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ButtonComponent } from '../../shared/components/button-component/button.component';
import { IconComponent } from '../../shared/components/icon-component/icon.component';
import { FirstStepComponent } from "./components/first-step/first-step.component";
import { SecondStepComponent } from "./components/second-step/second-step.component";
import { ThirdStepComponent } from "./components/third-step/third-step.component";
import { DialogComponent } from '../../shared/components/dialog-component/dialog.component';
import { DashboardSetupService } from './services/dashboard-setup.service';

@Component({
  selector: 'app-dashboard-setup',
  imports: [IconComponent, ButtonComponent, MatProgressBarModule, FirstStepComponent, SecondStepComponent, ThirdStepComponent, DialogComponent],
  templateUrl: './dashboard-setup.component.html',
  styleUrl: './dashboard-setup.component.scss'
})
export class DashboardSetupComponent {
  protected readonly dashboardSetupService: DashboardSetupService = inject<DashboardSetupService>(DashboardSetupService);
  protected readonly dialogConfig: DialogComponentConfig = { dialogHeaderTitle: "Budget Setup" };
  protected readonly iconConfig: IconComponentConfig = {
    iconName: 'attach_money',
    containerColor: 'var(--primary-gradient)',
    containerWidth: 100,
    containerHeight: 100,
    iconSize: 60,
    iconColor: 'var(--white-100)',
  }
  protected readonly createBudgetbuttonConfig: ButtonComponentConfig = {
    buttonColor: 'var(--primary-gradient)',
    buttonText: 'Create your budget',
    buttonIcon: 'add',
    buttonIconColor: 'var(--white-100)',
    buttonAction: () => this.dashboardSetupService.createTheBudgetButtonAction()
  }
  protected readonly continueButtonConfig: ButtonComponentConfig = {
    buttonText: 'Continue',
    buttonColor: 'var(--primary-gradient)',
    buttonAction: () => this.dashboardSetupService.nextStep()
  }
  protected readonly backButtonConfig: ButtonComponentConfig = {
    buttonText: 'Back',
    buttonColor: 'transparent',
    buttonBorder: '1px solid var(--gray-500)',
    buttonAction: () => this.dashboardSetupService.previousStep()
  }
  protected readonly finalButtonConfig: ButtonComponentConfig = {
    buttonText: 'Finalize',
    buttonColor: 'var(--success-gradient)',
    buttonAction: () => this.dashboardSetupService.onSetupFinalized()
  }
}
