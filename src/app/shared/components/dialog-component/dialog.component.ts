import { Component, inject, input, InputSignal } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from "../button-component/button.component";
import { ButtonComponentConfig, DialogComponentConfig } from '../../models/interfaces';
import { DashboardSetupService } from '../../../pages/dashboard-setup/services/dashboard-setup.service';

@Component({
  selector: 'app-dialog',
  imports: [ButtonComponent, MatButtonModule, MatDialogModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  public dialogConfig: InputSignal<DialogComponentConfig> = input.required<DialogComponentConfig>();
  private readonly dashboardSetupService: DashboardSetupService = inject<DashboardSetupService>(DashboardSetupService);

  protected readonly buttonConfig: ButtonComponentConfig = { 
    buttonIcon: 'close', 
    buttonColor: 'none',
    buttonIconColor: 'var(--white-100)',
    buttonAction: () => this.dashboardSetupService.onCloseDialog() 
  }
}
