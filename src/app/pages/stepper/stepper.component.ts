import { Component } from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
})
export class StepperComponent {

  selectedFileText: File | null = null;
  selectedFileKey: File | null = null;

  currentStep = 1;

  constructor(
    private userService: UserService,
  ) {}

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




  helpSetSelectedFileText(file: File | null) {
    this.selectedFileText = file;
  }

  helpSetSelectedFileKey(file: File | null) {
    this.selectedFileKey = file;
  }

  //TODO: VHODIT DO JEDNEJ FUNCKIE

  // Cookies pre BE:
  // imageType = ["Text", "Key"]
  onTextProcess(file: File | null) {
    console.log('Text processing')
    // take image from cipher-text
    this.selectedFileText = file;
    console.log("TEXT: ",this.selectedFileText)
    // send to API endpoint file and imageType

    var step = "s1";
    this.userService.sendImageToCache(this.selectedFileText, "Text", step).subscribe({
      next: (data) => {
        console.log('Data:', data);
      },
      error: (error) => console.error('There was an error!', error)
    });
  }

  onKeyProcess(file: File | null) {
    console.log('Key processing')
    // take image from cipher-key
    this.selectedFileKey = file;
    console.log("KEY: ",this.selectedFileKey)

    var step = "s1";
    this.userService.sendImageToCache(this.selectedFileText, "Key", step).subscribe({
      next: (data) => {
        console.log('Data:', data);
      },
      error: (error) => console.error('There was an error!', error)
    });
  }


  onStepProcess() {
    console.log('Step processing')
  }



  onDecipherProcess() {
    console.log('Decipher processing')
  }

}
