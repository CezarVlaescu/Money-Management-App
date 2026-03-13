import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IconComponentConfig } from '../../models/interfaces';

@Component({
  selector: 'app-icon',
  imports: [MatIconModule],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent {
  public iconComponentConfig: InputSignal<IconComponentConfig> = input.required<IconComponentConfig>();
}
