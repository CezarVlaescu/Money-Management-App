import { Component } from '@angular/core';
import { IconComponent } from "../../components/icon-component/icon.component";
import { ButtonComponentConfig, IconComponentConfig } from '../../models/interfaces';
import { ButtonComponent } from "../../components/button-component/button.component";

@Component({
  selector: 'app-dashboard-setup',
  imports: [IconComponent, ButtonComponent],
  templateUrl: './dashboard-setup.component.html',
  styleUrl: './dashboard-setup.component.scss'
})
export class DashboardSetupComponent {
  protected readonly iconComponentConfig: IconComponentConfig = {
    iconName: 'attach_money',
    containerColor: 'var(--primary-gradient)',
    containerWidth: 100,
    containerHeight: 100,
    iconSize: 60
  }

  protected readonly buttonComponentConfig: ButtonComponentConfig = {
    buttonColor: 'var(--primary-gradient)',
    buttonText: 'Create your budget',
    buttonIcon: 'add'
  }
}
