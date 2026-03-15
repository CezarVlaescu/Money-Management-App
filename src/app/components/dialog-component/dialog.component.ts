import { Component, input, InputSignal } from '@angular/core';
import { MatDialogModule, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from "../button-component/button.component";
import { ButtonComponentConfig, DialogComponentConfig } from '../../models/interfaces';

@Component({
  selector: 'app-dialog',
  imports: [MatDialogContent, MatDialogActions, ButtonComponent, MatButtonModule, MatDialogModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  public dialogConfig: InputSignal<DialogComponentConfig> = input.required<DialogComponentConfig>();
  protected readonly buttonConfig: ButtonComponentConfig = { 
    buttonIcon: 'close', 
    buttonColor: 'none', 
  }
}
