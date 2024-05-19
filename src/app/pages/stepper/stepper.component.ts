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
  temporaryJson: any;

  currentStep = 1;

  constructor(
    private userService: UserService,
  ) {}

  ngOnInit() {}

  onBack() {
    this.currentStep--;
  }
/*
  onNext() {
    if (this.currentStep == 1) {
      this.onS1Process();
    }
    else if (this.currentStep == 2) {
      this.onS2tProcess();
    }
    this.currentStep++;
  }
*/
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
/*
  onS1Process() {
    console.log('S1 processing')
    this.userService.sendAreasToBE_s1().subscribe({
      next: (data: any) => {
        try {
          var helpData = JSON.stringify(data);
          const jsonDataS1 = JSON.parse(helpData);
          console.log('Data:', jsonDataS1);
          //TODO: update component element

        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      },
      error: (error) => console.error('There was an error!', error)
    });
  }
*/

  onS2tProcess() {
    console.log('S2t processing');
    this.temporaryJson = "AreasJson";
    var areas = this.temporaryJson;

    this.userService.sendAreasToBE_s2t(areas).subscribe({
      next: (data: any) => {
        try {
          console.log('Data:', data);
          //TODO: update component element

        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      },
      error: (error) => console.error('There was an error!', error)
    });
  }

  onS3tProcess() {
    //maybe not needed
    console.log('S3t processing')
  }

  onS2kProcess() {
    console.log('S2k processing')
    this.selectedFileKey = this.selectedFile;
    console.log("KEY: ",this.selectedFileKey)

    this.userService.sendImageToBE_s2k(this.selectedFileText).subscribe({
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

  onS3kProcess() {
    console.log('S3k processing')
    this.temporaryJson = "AreasJson";
    var areas = this.temporaryJson;

    this.userService.sendAreasToBE_s3k(areas).subscribe({
      next: (data: any) => {
        try {
          console.log('Data:', data);
          //TODO: update component element

        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      },
      error: (error) => console.error('There was an error!', error)
    });
  }

  onS4Process() {
    console.log('S4 processing')
  }

  onS5Process() {
    console.log('S5 processing')
  }



























  // NEW STEPPER FUNCTIONS

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
