import { Component, input, InputSignal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CardComponentConfig } from '../../models/interfaces';

@Component({
  selector: 'app-card',
  imports: [MatCardModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  public cardConfig: InputSignal<CardComponentConfig> = input.required<CardComponentConfig>(); 
}
