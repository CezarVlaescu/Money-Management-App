import { Component, input, InputSignal, output, OutputEmitterRef, signal, WritableSignal } from '@angular/core';
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
  public outputInputValue: OutputEmitterRef<string | number | Date> = output<number | string | Date>();
  protected inputValue: string | number | Date = '';

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

  protected onValueChange(value: string): void {
    const type = this.inputConfig().inputContentType;

    if(type === 'number'){
      const parsedValue = value === '' ? 0 : Number(value);
      this.inputValue = parsedValue;
      this.outputInputValue.emit(parsedValue);
      return;
    }

    this.inputValue = value;
    this.outputInputValue.emit(value);
  }
}
