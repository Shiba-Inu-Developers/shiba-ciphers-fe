import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { ImageService } from '../../services/image.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-s1-classification',
  templateUrl: './s1-classification.component.html',
  styleUrls: ['./s1-classification.component.css'],
})
export class S1ClassificationComponent {
  @Output() selectedFile = new EventEmitter<File>();
  @ViewChild('dropzoneFile') dropzoneFile!: ElementRef;
  fileUrl: string | null = null;
  backgroundImageStyle: { [klass: string]: any } = {};
  isImageProcessed = false;
  isTutorialPage: boolean = false;
  tutorialPic: boolean = false;
  keyPercentage: number = 0;
  textPercentage: number = 0;
  imageTitle: string = ''; // New field for image title
  showTitleError: boolean = false; // New field for title error message
  showImageError: boolean = false; // New field for image error message

  constructor(
    private userService: UserService,
    private imageService: ImageService,
    private router: Router
  ) {
    // Získanie aktuálnej URL cesty
    const currentUrl = this.router.url;
    // Overenie, či aktuálna URL cesta zodpovedá tutoriálovej URL ceste
    this.isTutorialPage = currentUrl.includes('tutorial-classification');
  }

  onFileChange(event: Event) {
    this.showImageError = false; // Reset image error message
    if (!this.isTutorialPage) {
      const file = this.getSelectedFile();
      if (file && this.isImage(file)) {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.fileUrl = event.target?.result as string;
          this.backgroundImageStyle = {
            'background-image': `url(${this.fileUrl})`,
            'background-size': 'cover',
            'background-position': 'center',
          };
          this.adjustContainerHeight(this.fileUrl);
        };
        reader.readAsDataURL(file);
        this.selectedFile.emit(file);
      } else {
        console.error('Selected file is not an image.');
      }
    } else {
      this.tutorialPic = true;
      // Ak je stránka tutorialu, nastavíme pozadie na preddefinovaný obrázok
      this.backgroundImageStyle = {
        'background-image': `url('assets/pics/tutorialClass.jpg')`, // Zmena na relatívnu cestu k obrázku
        'background-size': 'cover',
        'background-position': 'center',
      };
      this.adjustContainerHeight('assets/pics/tutorialClass.jpg');
    }
    console.log(this.tutorialPic);
  }

  isImage(file: File): boolean {
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif']; // Prípustné koncovky obrázkových súborov
    const fileNameParts = file.name.split('.'); // Rozdelíme názov súboru na časti podľa bodiek
    const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase(); // Získame koncovku súboru a prevádzime ju na malé písmená

    return allowedExtensions.includes(fileExtension); // Overíme, či je koncovka súboru v zozname prípustných koncoviek
  }

  getSelectedFile(): File | null {
    const input = this.dropzoneFile.nativeElement as HTMLInputElement;
    const files = input.files;
    return files ? files[0] : null;
  }

  ngOnDestroy(): void {
    const selectedFile = this.getSelectedFile();
    if (selectedFile) {
      console.log('Vybraný súbor:', selectedFile.name);
      console.log('Typ súboru:', selectedFile.type);
      // Ďalšie spracovanie súboru
    }
  }

  async saveTextInStorage() {
    if (!this.isTutorialPage) {
      const selectedFile = this.getSelectedFile();
      if (selectedFile) {
        this.imageService.setImage(selectedFile);
        this.userService.setHashT(this.userService.getRandomHash());

        this.userService.sendImageTextToSegmentation().subscribe((result) => {
          console.warn('result', result);
        });

        await new Promise((resolve) => setTimeout(resolve, 100));

        this.router.navigate(['/text-stepper']);
      }
    } else {
      this.router.navigate(['/tutorial-text-stepper']);
    }
  }

  async saveKeyInStorage() {
    if (!this.isTutorialPage) {
      const selectedFile = this.getSelectedFile();
      if (selectedFile) {
        this.imageService.setImage(selectedFile);
        this.userService.setHashK(this.userService.getRandomHash());

        this.userService.sendImageKeyToSegmentation().subscribe((result) => {
          console.warn('result', result);
        });

        await new Promise((resolve) => setTimeout(resolve, 100));

        this.router.navigate(['/key-stepper']);
      }
    } else {
      this.router.navigate(['/tutorial-key-stepper']);
    }
  }

  processImage(): void {
    this.showTitleError = !this.imageTitle; // Show error if title is empty
    this.showImageError = !this.fileUrl; // Show error if image is not selected

    if (this.showTitleError || this.showImageError) {
      return; // Exit if there is an error
    }

    const selectedFile = this.getSelectedFile();
    if (selectedFile) {
      this.imageService.setImage(selectedFile);

      this.userService.sendImageToBE_s0(selectedFile).subscribe((result) => {
        console.warn('result', result);
        let resJson = JSON.parse(result);
        this.userService.setRandomHash(resJson.hash);
        this.keyPercentage = Math.round(resJson.confidence.key * 100);
        this.textPercentage = Math.round(resJson.confidence.cyphertext * 100);
        this.isImageProcessed = true;
      });
    }
  }

  adjustContainerHeight(fileUrl?: string) {
    if (fileUrl) {
      const image = new Image();
      image.onload = () => {
        const aspectRatio = image.width / image.height; // Vypočítame pomer strán obrázka
        const container = this.dropzoneFile.nativeElement.parentElement;
        const containerWidth = container.offsetWidth;
        const containerHeight = containerWidth / aspectRatio; // Vypočítame výšku kontajnera na základe pomeru strán obrázka
        container.style.height = containerHeight + 'px'; // Nastavíme výšku kontajnera
      };
      image.src = fileUrl; // Nastavíme zdroj obrázka pre výpočet jeho rozmierov
    }
  }
}
