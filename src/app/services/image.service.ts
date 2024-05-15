import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private imageFile: File | null = null;

  setImage(file: File) {
    this.imageFile = file;
    const reader = new FileReader();
    reader.onload = (event) => {
      localStorage.setItem('selectedFile', event.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  getImage(): File | null {
    return this.imageFile;
  }

  getImageUrl(): string | null {
    return localStorage.getItem('selectedFile');
  }
}
