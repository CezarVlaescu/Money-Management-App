import { Component } from '@angular/core';
import { IconComponent } from "../../components/icon-component/icon.component";
import { ButtonComponentConfig, DialogComponentConfig, IconComponentConfig, InputComponentConfig } from '../../models/interfaces';
import { ButtonComponent } from "../../components/button-component/button.component";
import { DialogComponent } from "../../components/dialog-component/dialog.component";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { InputComponent } from "../../components/input-component/input.component";
import { InputTypes } from '../../models/enums';

@Component({
  selector: 'app-dashboard-setup',
  imports: [IconComponent, ButtonComponent, DialogComponent, MatProgressBarModule, InputComponent, InputComponent],
  templateUrl: './dashboard-setup.component.html',
  styleUrl: './dashboard-setup.component.scss'
})
export class DashboardSetupComponent {
  protected readonly iconConfig: IconComponentConfig = {
    iconName: 'attach_money',
    containerColor: 'var(--primary-gradient)',
    containerWidth: 100,
    containerHeight: 100,
    iconSize: 60
  }

  protected readonly buttonConfig: ButtonComponentConfig = {
    buttonColor: 'var(--primary-gradient)',
    buttonText: 'Create your budget',
    buttonIcon: 'add'
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
}
