import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-cipher-text',
  templateUrl: './cipher-text.component.html',
  styleUrls: ['./cipher-text.component.css'],
})
export class CipherTextComponent {
  @Output() cipherText: string = '';
  @Output() selectedFile = new EventEmitter<File>();
  @ViewChild('dropzoneFile') dropzoneFile!: ElementRef;
  @ViewChild('textInput') textInput!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('imagePreview') imagePreview!: ElementRef<HTMLImageElement>;

  onFileChange(event: Event) {
    const file = this.getSelectedFile();
    if (file && this.isImage(file)) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview.nativeElement.src = e.target.result;
      };
      this.selectedFile.emit(file);
      reader.readAsDataURL(file);
    } else {
      // Handle non-image files or errors
      console.error('Selected file is not an image.');
      this.imagePreview.nativeElement.src = ''; // Clear previous preview
    }
  }

  isImage(file: File): boolean {
    return file.type.startsWith('image/');
  }

  getSelectedFile(): File | null {
    return this.dropzoneFile.nativeElement.files[0];
  }

  getTextInputValue(): string {
    return this.textInput.nativeElement.value;
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

    const textInputValue = this.getTextInputValue();
    console.log('Zadany text:', textInputValue);
  }
}
