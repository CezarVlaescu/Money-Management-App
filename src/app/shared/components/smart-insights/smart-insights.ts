import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MoneyInsight } from '../../../core/models/interface';

@Component({
  selector: 'app-smart-insights',
  imports: [RouterLink],
  templateUrl: './smart-insights.html',
  styleUrl: './smart-insights.scss',
})
export class SmartInsights {
  @Input({ required: true })
  public insights: MoneyInsight[] = [];

  @Input()
  public loading = false;

  @Output()
  public readonly refreshRequested = new EventEmitter<void>();

  protected refreshInsights(): void {
    if (this.loading) {
      return;
    }

    this.refreshRequested.emit();
  }

  protected getInsightLabel(type: MoneyInsight['type']): string {
    const labels: Record<MoneyInsight['type'], string> = {
      info: 'Insight',
      success: 'On track',
      warning: 'Attention',
      danger: 'Important',
    };

    return labels[type];
  }
}
