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
  public buttonConfig: InputSignal<ButtonComponentConfig> = input.required<ButtonComponentConfig>();

  protected get iconConfig(): IconComponentConfig {
    return {
      iconName: this.buttonConfig().buttonIcon as string,
      iconColor: this.buttonConfig().buttonIconColor as string,
      containerColor: 'none'
    } as IconComponentConfig;
  }
}
