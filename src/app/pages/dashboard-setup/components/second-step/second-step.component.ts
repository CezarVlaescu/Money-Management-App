import { Component } from '@angular/core';
import { CardComponent } from '../../../../shared/components/card-component/card.component';
import { InputComponent } from '../../../../shared/components/input-component/input.component';
import { CardComponentConfig, InputComponentConfig } from '../../../../shared/models/interfaces';
import { InputTypes } from '../../../../shared/models/enums';

@Component({
  selector: 'app-second-step',
  imports: [InputComponent, CardComponent],
  templateUrl: './second-step.component.html',
  styleUrl: './second-step.component.scss'
})
export class SecondStepComponent {
  protected readonly inputSelectPeriodConfig: InputComponentConfig = {
    inputContentType: InputTypes.MONTH,
    inputHeaderText: 'Budget Period',
    inputHeaderIcon: 'calendar_month',
    inputHeaderIconColor: 'var(--purple-500)',
    inputContentPlaceholder: ''
  }

  protected readonly infoSelectBugetCardConfig: CardComponentConfig = {
    cardTitle: '💡 Your budget will be active for the entire selected month. You can update it anytime.',
    cardBackground: 'none',
    cardBorder: '1px solid var(--blue-600)'
  }
}
