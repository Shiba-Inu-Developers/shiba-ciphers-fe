import { Component } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
})
export class StepperComponent {
  currentStep = 1;

  constructor() {}

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





  //TODO: VHODIT DO JEDNEJ FUNCKIE
  onTextProcess() {
    console.log('Text processing')
  }

  onKeyProcess() {
    console.log('Key processing')
  }

  onDecipherProcess() {
    console.log('Decipher processing')
  }

}
