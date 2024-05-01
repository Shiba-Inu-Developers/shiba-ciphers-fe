import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';

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

  isImage(file: File): boolean {
    return file.type.startsWith('image/');
  }

  getSelectedFile(): File | null {
    return this.dropzoneFile.nativeElement.files[0];
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    const selectedFile = this.getSelectedFile();
    if (selectedFile) {
      console.log('Vybraný súbor:', selectedFile.name);
      console.log('Typ súboru:', selectedFile.type);
      // Further processing of the file
    }
  }

}
