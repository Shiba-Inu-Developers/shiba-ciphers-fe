import { Component, ElementRef, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cipher-text',
  templateUrl: './cipher-text.component.html',
  styleUrls: ['./cipher-text.component.css'],
})
export class CipherTextComponent {
  @Output() cipherText: string = '';
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
      reader.readAsDataURL(file);
    } else {
      // Handle non-image files or errors
      console.error('Selected file is not an image.');
      this.imagePreview.nativeElement.src = ''; // Clear previous preview
    }
  }

  // onFileChange(event: Event) {
  //   const file = this.getSelectedFile();
  //   if (file && this.isImage(file)) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       this.imagePreview.nativeElement.src = e.target.result;
  //     };
  //     reader.readAsDataURL(file);
  //   } else {
  //     // Handle non-image files or errors
  //     console.error("Selected file is not an image.");
  //   }

  //   // Vložte kód na zobrazenie nahľadu súboru
  //   const previewElement = document.createElement('div');
  //   previewElement.classList.add('flex', 'items-center', 'justify-center', 'p-4', 'border', 'border-gray-300', 'rounded-lg', 'mt-4');
  //   const previewImage = document.createElement('img');
  //   previewImage.classList.add('w-24', 'h-24', 'object-cover');
  //   previewImage.src = URL.createObjectURL(file);
  //   previewElement.appendChild(previewImage);

  //   const removeButton = document.createElement('button');
  //   removeButton.classList.add('ml-4', 'text-red-500', 'hover:text-red-700');
  //   removeButton.textContent = 'Odstrániť';
  //   removeButton.addEventListener('click', () => {
  //     this.imagePreview.nativeElement.src = '';
  //     previewElement.parentNode.removeChild(previewElement);
  //   });

  //   previewElement.appendChild(removeButton);

  //   document.getElementById('file-previews').appendChild(previewElement);
  // }

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
