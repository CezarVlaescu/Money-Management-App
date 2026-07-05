import { Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  imports: [],
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.scss',
})
export class EmptyState {
  public readonly icon: InputSignal<string> = input<string>('🌱');
  public readonly title: InputSignal<string> = input.required<string>();
  public readonly description: InputSignal<string> = input.required<string>();
  public readonly actionLabel: InputSignal<string | undefined> = input<string | undefined>();

  public readonly actionClicked: OutputEmitterRef<void> = output<void>();

  protected onActionClick(): void {
    this.actionClicked.emit();
  }
}
