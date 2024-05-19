import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { S3kSegmentationDecryptComponent } from '../s3k-segmentation-decrypt/s3k-segmentation-decrypt.component';

@Component({
  selector: 'app-key-stepper',
  templateUrl: './key-stepper.component.html',
  styleUrls: ['./key-stepper.component.css'],
})
export class KeyStepperComponent implements OnInit {
  @Input() file: File | null = null;
  @ViewChild('s3kDecrypt') s3kDecrypt!: S3kSegmentationDecryptComponent;

  selectedFile: File | null = null;
  selectedFileText: File | null = null;
  selectedFileKey: File | null = null;
  temporaryJson: any;
  isTutorialPage: boolean = false;
  currentStep = 1;
  rectangles: any;
  decryptedKeyTextJson: any;
  areas: any;

  constructor(private userService: UserService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.areas = navigation?.extras.state?.result;
    // Získanie aktuálnej URL cesty
    const currentUrl = this.router.url;
    // Overenie, či aktuálna URL cesta zodpovedá tutoriálovej URL ceste
    this.isTutorialPage = currentUrl.includes('tutorial-key-stepper');
  }

  ngOnInit() {
    const selectedFileName = localStorage.getItem('selectedFile');
    if (selectedFileName) {
      fetch(selectedFileName)
        .then((response) => response.blob())
        .then((blob) => {
          this.file = new File([blob], selectedFileName);
        });
    } else {
      fetch('path/to/default/image.png') // Nahraďte 'path/to/default/image.png' cestou k predvolenému obrázku
        .then((response) => response.blob())
        .then((blob) => {
          this.file = new File([blob], 'default.png');
        });
    }
  }
  onBack() {
    this.currentStep--;
  }

  async onNext() {
    console.log('SS:', this.s3kDecrypt.rectangles);
    this.decryptedKeyTextJson = this.s3kDecrypt.updateRectangles(
      this.s3kDecrypt.rectangles
    );
    await new Promise((resolve) => setTimeout(resolve, 500));
    let decryptedKeyTextObject = JSON.parse(
      this.decryptedKeyTextJson.__zone_symbol__value
    );
    console.log('DecryptedKeyTextObject:', decryptedKeyTextObject);
    let decryptedKeyTextString = JSON.stringify(decryptedKeyTextObject);
    console.log('DecryptedKeyTextString:', decryptedKeyTextString);
    this.decryptedKeyTextJson = decryptedKeyTextString;
    this.currentStep++;
  }

  /*
  onNext() {
    if (this.currentStep == 1) {
      this.onS1Process();
    } else if (this.currentStep == 2) {
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
    console.log('S1 processing');
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
      error: (error) => console.error('There was an error!', error),
    });
  }
*/
  onS2tProcess() {
    console.log('S2t processing');
    this.temporaryJson = 'AreasJson';
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
      error: (error) => console.error('There was an error!', error),
    });
  }

  onS3tProcess() {
    //maybe not needed
    console.log('S3t processing');
  }

  onS2kProcess() {
    console.log('S2k processing');
    this.selectedFileKey = this.selectedFile;
    console.log('KEY: ', this.selectedFileKey);

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
      error: (error) => console.error('There was an error!', error),
    });
  }

  onS3kProcess() {
    console.log('S3k processing');
    this.temporaryJson = 'AreasJson';
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
      error: (error) => console.error('There was an error!', error),
    });
  }

  onS4Process() {
    console.log('S4 processing');
  }

  onS5Process() {
    console.log('S5 processing');
  }

  // NEW STEPPER FUNCTIONS

  //S2t-Segmentation
  //Ulož: (upravený) segmentovaný textImage do DataStore
  //Vráť: JSON
  onTextSegmentationProcess() {
    console.log('Text segmentation processing');
  }

  //S3t-Decrypt
  //Ulož: (upravený) JSON do DataStore
  //Vráť: nič
  onTextDecryptProcess() {
    console.log('Text decrypt processing');
  }

  //S2k-Upload
  //Ulož: original keyImage do Datastore + segmentovaný keyImage do DataStore
  //Vráť: JSON
  onKeyUploadProcess() {
    console.log('Key upload processing');
  }

  //S3k-Segmentation-Decrypt
  //Ulož: (upravený) JSON do DataStore
  //Vráť: nič
  onKeySegmentationDecryptProcess() {
    console.log('Key segmentation & decrypt processing');
  }

  //S4-Decipher
  //Vybraný text a key pošli na BE (buď uložené v DataStore alebo priamo z FE)
  //Vráť: dešifrovaný text
  onDecipherProcess() {
    console.log('Decipher processing');
  }

  //S5-Decipher-Result
  onDecipherResult() {
    console.log('Decrypt result processing');
  }
}
