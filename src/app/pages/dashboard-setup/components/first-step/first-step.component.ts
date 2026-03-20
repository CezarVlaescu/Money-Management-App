import { Component } from '@angular/core';
import { CardComponent } from '../../../../shared/components/card-component/card.component';
import { InputComponent } from '../../../../shared/components/input-component/input.component';
import { CardComponentConfig, InputComponentConfig } from '../../../../shared/models/interfaces';
import { InputTypes } from '../../../../shared/models/enums';


@Component({
  selector: 'app-first-step',
  imports: [InputComponent, CardComponent],
  templateUrl: './first-step.component.html',
  styleUrl: './first-step.component.scss'
})
export class FirstStepComponent {
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

  protected readonly totalMonthlyCardConfig: CardComponentConfig = {
    cardTitle: 'Total monthly budget',
    cardSubtitle: '$ 0.00',
    cardBackground: 'var(--input-background)'
  }
}
