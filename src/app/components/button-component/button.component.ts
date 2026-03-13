import { Component, input, InputSignal } from '@angular/core';
import { ButtonComponentConfig, IconComponentConfig } from '../../models/interfaces';
import { IconComponent } from '../icon-component/icon.component';

@Component({
  selector: 'app-button',
  imports: [IconComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  public buttonComponentConfig: InputSignal<ButtonComponentConfig> = input.required<ButtonComponentConfig>();

  protected get iconComponentConfig(): IconComponentConfig {
    return {
      iconName: this.buttonComponentConfig().buttonIcon as string,
      containerColor: 'none'
    } as IconComponentConfig;
  }
}
