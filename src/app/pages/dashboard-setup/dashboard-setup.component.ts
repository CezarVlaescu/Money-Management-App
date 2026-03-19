import { Component } from '@angular/core';
import { IconComponent } from "../../components/icon-component/icon.component";
import { ButtonComponentConfig, CardComponentConfig, DialogComponentConfig, IconComponentConfig, InputComponentConfig } from '../../models/interfaces';
import { ButtonComponent } from "../../components/button-component/button.component";
import { DialogComponent } from "../../components/dialog-component/dialog.component";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { InputComponent } from "../../components/input-component/input.component";
import { InputTypes } from '../../models/enums';
import { CardComponent } from "../../components/card-component/card.component";

@Component({
  selector: 'app-dashboard-setup',
  imports: [IconComponent, ButtonComponent, DialogComponent, MatProgressBarModule, InputComponent, InputComponent, CardComponent],
  templateUrl: './dashboard-setup.component.html',
  styleUrl: './dashboard-setup.component.scss'
})
export class DashboardSetupComponent {
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
    buttonIconColor: 'var(--white-100)'
  }

  protected readonly dialogConfig: DialogComponentConfig = { dialogHeaderTitle: "Budget Setup" }

  protected readonly inputCashIncomeConfig: InputComponentConfig = {
    inputContentType: InputTypes.NUMBER,
    inputHeaderText: 'Cash Income',
    inputHeaderIcon: 'credit_card',
    inputHeaderIconColor: 'var(--purple-500)',
    inputContentIcon: 'attach_money',
    inputContentIconColor: 'var(--gray-500)',
    inputContentPlaceholder: '0.00' 
  }

  protected readonly inputTicketsConfig: InputComponentConfig = {
    inputContentType: InputTypes.NUMBER,
    inputHeaderText: 'Tickets/Vouchers',
    inputHeaderIcon: 'confirmation_number',
    inputHeaderIconColor: 'var(--blue-600)',
    inputContentIcon: 'attach_money',
    inputContentIconColor: 'var(--gray-500)',
    inputContentPlaceholder: '0.00' 
  }

  protected readonly inputBasedIncomeConfig: InputComponentConfig = {
    inputContentType: InputTypes.NUMBER,
    inputHeaderText: 'Based Income',
    inputHeaderIcon: 'show_chart',
    inputHeaderIconColor: 'var(--emerald-600)',
    inputContentIcon: 'attach_money',
    inputContentIconColor: 'var(--gray-500)',
    inputContentPlaceholder: '0.00' 
  }

  protected readonly continueButtonConfig: ButtonComponentConfig = {
    buttonText: 'Continue',
    buttonColor: 'var(--primary-gradient)'
  }

  protected readonly backButtonConfig: ButtonComponentConfig = {
    buttonText: 'Back',
    buttonColor: 'transparent',
    buttonBorder: '1px solid var(--gray-500)'
  }

  protected readonly totalMonthlyCardConfig: CardComponentConfig = {
    cardTitle: 'Total monthly budget',
    cardSubtitle: '$ 0.00',
    cardBackground: 'var(--input-background)'
  }

  protected readonly infoSelectBugetCardConfig: CardComponentConfig = {
    cardTitle: '💡 Your budget will be active for the entire selected month. You can update it anytime.',
    cardBackground: 'none',
    cardBorder: '1px solid var(--blue-600)'
  }

  protected readonly inputSelectPeriodConfig: InputComponentConfig = {
    inputContentType: InputTypes.MONTH,
    inputHeaderText: 'Budget Period',
    inputHeaderIcon: 'calendar_month',
    inputHeaderIconColor: 'var(--purple-500)',
    inputContentPlaceholder: ''
  }

  protected readonly suggestedBugetCardConfig: CardComponentConfig = {
    cardTitle: '💡 Suggested daily budget:',
    cardSubtitle: '$ 0.00',
    cardBackground: 'var(--emerald-900)',
  }

  protected readonly dailySpendInputConfig: InputComponentConfig = {
    inputContentType: InputTypes.NUMBER,
    inputHeaderText: 'Daily Spend Input',
    inputHeaderIcon: 'event_repeat',
    inputHeaderIconColor: 'var(--emerald-600)',
    inputContentIcon: 'attach_money',
    inputContentIconColor: 'var(--gray-500)',
    inputContentPlaceholder: '0.00' 
  }

  protected readonly continueFinalButtonConfig: ButtonComponentConfig = {
    buttonText: 'Continue',
    buttonColor: 'var(--success-gradient)'
  }
}
