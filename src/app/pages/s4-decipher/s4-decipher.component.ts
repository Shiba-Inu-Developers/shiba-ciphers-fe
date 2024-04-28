import { Component } from '@angular/core';

@Component({
  selector: 'app-s4-decipher',
  templateUrl: './s4-decipher.component.html',
  styleUrls: ['./s4-decipher.component.css'],
})
export class S4DecipherComponent {
  imageKey: string | null = null;
  imageText: string | null = null;

  onKeyImageChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.imageKey = file ? URL.createObjectURL(file) : null;
  }

  onTextImageChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.imageText = file ? URL.createObjectURL(file) : null;
  }
}
