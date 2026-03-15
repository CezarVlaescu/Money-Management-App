import { Component } from '@angular/core';
import { IconComponent } from "../../components/icon-component/icon.component";
import { ButtonComponentConfig, DialogComponentConfig, IconComponentConfig } from '../../models/interfaces';
import { ButtonComponent } from "../../components/button-component/button.component";
import { DialogComponent } from "../../components/dialog-component/dialog.component";
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-dashboard-setup',
  imports: [IconComponent, ButtonComponent, DialogComponent, MatProgressBarModule],
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
}
