import { Component } from '@angular/core';
import { StepperService } from './stepper.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
})
export class StepperComponent {
  currentStep = 1;

  constructor(private stepperService: StepperService) {}

  ngOnInit() {}

  onBack() {
    this.currentStep--;
  }

  onNext() {
    this.currentStep++;
  }

  onStepChange(step: number) {
    this.currentStep = step;
    console.log('Current step:', this.currentStep);
  }

  // onStep1(data: any): void {
  //   this.stepperService.step1(data).subscribe((result) => {
  //     // Handle the result
  //   });
  // }

  // onStep2(data: any): void {
  //   this.stepperService.step2(data).subscribe((result) => {
  //     // Handle the result
  //   });
  // }

  // onStep3(data: any): void {
  //   this.stepperService.step3(data).subscribe((result) => {
  //     // Handle the result
  //   });
  // }

  // Add more steps as needed
}
