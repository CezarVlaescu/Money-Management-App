import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { DashboardSetupComponent } from "../dashboard-setup/dashboard-setup.component";
import { DashboardSetupService } from '../dashboard-setup/services/dashboard-setup.service';

@Component({
  selector: 'app-dashboard',
  imports: [DashboardSetupComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  protected readonly dashboardSetupService: DashboardSetupService = inject<DashboardSetupService>(DashboardSetupService);
}
