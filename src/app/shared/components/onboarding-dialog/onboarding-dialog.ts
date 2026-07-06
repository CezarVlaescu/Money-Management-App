import { Component, computed, HostListener, inject, Signal, signal, WritableSignal } from '@angular/core';
import { OnboardingService } from '../../../core/services/onboarding/onboarding-service';
import { ONBOARDING_STEPS } from '../../constants/app.constants';
import { OnboardingStep } from '../../models/interfaces/shared.interface';

@Component({
  selector: 'app-onboarding-dialog',
  imports: [],
  templateUrl: './onboarding-dialog.html',
  styleUrl: './onboarding-dialog.scss',
})
export class OnboardingDialog {
  protected readonly onboardingService: OnboardingService = inject<OnboardingService>(OnboardingService);

  protected readonly stepIndex: WritableSignal<number> = signal<number>(0);
  protected readonly steps: OnboardingStep[] = ONBOARDING_STEPS;
  protected readonly currentStep: Signal<OnboardingStep> = computed<OnboardingStep>(() => this.steps[this.stepIndex()]);
  protected readonly isLastStep: Signal<boolean> = computed<boolean>(() => this.stepIndex() === this.steps.length - 1);

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.onboardingService.isOpen()) this.skip();
  }

  protected next(): void {
    if (this.isLastStep()) {
      this.finish();
      return;
    }

    this.stepIndex.update(index => index + 1);
  }

  protected previous(): void {
    this.stepIndex.update(index => Math.max(0, index - 1));
  }

  protected finish(): void {
    this.stepIndex.set(0);
    this.onboardingService.complete();
  }

  protected skip(): void {
    this.finish();
  }
}
