import { Component, input, InputSignal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IconComponentConfig, InputComponentConfig } from '../../models/interfaces';
import { IconComponent } from '../icon-component/icon.component';

@Component({
  selector: 'app-input',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, IconComponent],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  public inputConfig: InputSignal<InputComponentConfig> = input.required<InputComponentConfig>();

  protected get headerIconConfig(): IconComponentConfig {
    return {
      iconName: this.inputConfig().inputHeaderIcon as string,
      iconColor: this.inputConfig().inputHeaderIconColor
    }
  }

  protected get contentIconConfig(): IconComponentConfig {
    return {
      iconName: this.inputConfig().inputContentIcon as string,
      iconColor: this.inputConfig().inputContentIconColor
    }
  }
  inputValue = ''
}
