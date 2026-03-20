import { Component } from '@angular/core';
import { CardComponent } from '../../../../shared/components/card-component/card.component';
import { InputComponent } from '../../../../shared/components/input-component/input.component';
import { CardComponentConfig, InputComponentConfig } from '../../../../shared/models/interfaces';
import { InputTypes } from '../../../../shared/models/enums';

@Component({
  selector: 'app-third-step',
  imports: [InputComponent, CardComponent],
  templateUrl: './third-step.component.html',
  styleUrl: './third-step.component.scss'
})
export class ThirdStepComponent {
  protected readonly dailySpendInputConfig: InputComponentConfig = {
    inputContentType: InputTypes.NUMBER,
    inputHeaderText: 'Daily Spend Input',
    inputHeaderIcon: 'event_repeat',
    inputHeaderIconColor: 'var(--emerald-600)',
    inputContentIcon: 'attach_money',
    inputContentIconColor: 'var(--gray-500)',
    inputContentPlaceholder: '0.00' 
  }

  protected readonly suggestedBugetCardConfig: CardComponentConfig = {
    cardTitle: '💡 Suggested daily budget:',
    cardSubtitle: '$ 0.00',
    cardBackground: 'var(--emerald-900)',
  }
}
