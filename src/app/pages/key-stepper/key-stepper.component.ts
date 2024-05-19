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
    this.decryptedKeyTextJson = this.s3kDecrypt.updateRectangles(
      this.s3kDecrypt.rectangles
    );
    await new Promise((resolve) => setTimeout(resolve, 500));
    let decryptedKeyTextObject = JSON.parse(
      this.decryptedKeyTextJson.__zone_symbol__value
    );
    let decryptedKeyTextString = JSON.stringify(decryptedKeyTextObject);
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

  onS2tProcess() {
    this.temporaryJson = 'AreasJson';
    var areas = this.temporaryJson;

    this.userService.sendAreasToBE_s2t(areas).subscribe({
      next: (data: any) => {
        try {
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      },
      error: (error) => console.error('There was an error!', error),
    });
  }

  onS2kProcess() {
    this.selectedFileKey = this.selectedFile;

    this.userService.sendImageToBE_s2k(this.selectedFileText).subscribe({
      next: (data: string) => {
        try {
          const jsonData = JSON.parse(data);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      },
      error: (error) => console.error('There was an error!', error),
    });
  }

  onS3kProcess() {
    this.temporaryJson = 'AreasJson';
    var areas = this.temporaryJson;

    this.userService.sendAreasToBE_s3k(areas).subscribe({
      next: (data: any) => {
        try {
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      },
      error: (error) => console.error('There was an error!', error),
    });
  }

  finish() {
    this.router.navigate(['/']);
  }
}
