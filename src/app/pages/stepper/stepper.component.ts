import {Component} from '@angular/core';
import {UserService} from "../../services/user.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css'],
})

export class StepperComponent {

  selectedFile: File | null = null;
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


  helpSetSelectedFile(file: File | null) {
    this.selectedFile = file;
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
    this.userService.sendImageToBE_s0(this.selectedFileText).subscribe({
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
    this.userService.sendImageToBE_s0(this.selectedFileText).subscribe({
      next: (data) => {
        console.log('Data:', data);
      },
      error: (error) => console.error('There was an error!', error)
    });
  }


  onS0Process(file: File | null) {
    console.log('S0 processing')
    this.selectedFileText = file;
    console.log("IMAGE: ",this.selectedFileText)

    this.userService.sendImageToBE_s0(this.selectedFileText).subscribe({
      next: (data: string) => {
        try {
          const jsonData = JSON.parse(data);
          console.log('Data:', jsonData);
          //TODO: update component element

        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      },
      error: (error) => console.error('There was an error!', error)
    });
  }

  onS1Process(file: File | null) {
    console.log('S1 processing')
  }

  onS2tProcess() {
    console.log('S2t processing')
  }

  onS3tProcess() {
    console.log('S3t processing')
  }

  onS2kProcess() {
    console.log('S2k processing')
  }

  onS3kProcess() {
    console.log('S3k processing')
  }

  onS4Process() {
    console.log('S4 processing')
  }

  onS5Process() {
    console.log('S5 processing')
  }



























  // NEW STEPPER FUNCTIONS

  //S1-Classification
  //Ulož: originál textImage do DataStore
  //Vráť: segmentovaný textImage (JSON)
  onClassificationProcess() {
    console.log('Classification processing')
    var image = this.selectedFileText;
    this.userService.sendImageToBE_s0(this.selectedFileText).subscribe({
      next: (data) => {
        console.log('Data:', data);
      },
      error: (error) => console.error('There was an error!', error)
    });
  }

  //S2t-Segmentation
  //Ulož: (upravený) segmentovaný textImage do DataStore
  //Vráť: JSON
  onTextSegmentationProcess() {
    console.log('Text segmentation processing')
  }

  //S3t-Decrypt
  //Ulož: (upravený) JSON do DataStore
  //Vráť: nič
  onTextDecryptProcess() {
    console.log('Text decrypt processing')
  }

  //S2k-Upload
  //Ulož: original keyImage do Datastore + segmentovaný keyImage do DataStore
  //Vráť: JSON
  onKeyUploadProcess(){
    console.log('Key upload processing')
  }

  //S3k-Segmentation-Decrypt
  //Ulož: (upravený) JSON do DataStore
  //Vráť: nič
  onKeySegmentationDecryptProcess(){
    console.log('Key segmentation & decrypt processing')
  }

  //S4-Decipher
  //Vybraný text a key pošli na BE (buď uložené v DataStore alebo priamo z FE)
  //Vráť: dešifrovaný text
  onDecipherProcess(){
    console.log('Decipher processing')
  }

  //S5-Decipher-Result
  onDecipherResult(){
    console.log('Decrypt result processing')
  }

}
