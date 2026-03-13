import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboardSetupComponent } from "../dashboard-setup/dashboard-setup.component";

@Component({
  selector: 'app-dashboard',
  imports: [DashboardSetupComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

}
