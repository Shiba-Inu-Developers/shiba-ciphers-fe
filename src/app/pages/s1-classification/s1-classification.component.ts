import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-s1-classification',
  templateUrl: './s1-classification.component.html',
  styleUrls: ['./s1-classification.component.css']
})
export class S1ClassificationComponent {
  @Output() selectedFile = new EventEmitter<File>();
  @ViewChild('dropzoneFile') dropzoneFile!: ElementRef;

  onFileChange(event: Event) {
    const file = this.getSelectedFile();
    if (file && this.isImage(file)) {
      const reader = new FileReader();
      this.selectedFile.emit(file);
      reader.readAsDataURL(file);
    } else {
      // Handle non-image files or errors
      console.error('Selected file is not an image.');
    }
  }

  onFileDrop(event: any) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (this.isImage(file)) {
        this.selectedFile.emit(file);
      } else {
        console.error('Dropped file is not an image.');
      }
    }
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
}
