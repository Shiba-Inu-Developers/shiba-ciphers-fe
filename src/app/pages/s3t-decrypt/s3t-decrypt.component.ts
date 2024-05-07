import {
  Component,
} from '@angular/core';

@Component({
  selector: 'app-s3t-decrypt',
  templateUrl: './s3t-decrypt.component.html',
  styleUrls: ['./s3t-decrypt.component.css'],
})
export class S3tDecryptComponent {
  backendText: string = ''; // Text zo servera
  polygonCoordinates: { x: number, y: number }[] = [ // Falošné súradnice pre kreslenie polygonu
    { x: 100, y: 100 },
    { x: 200, y: 100 },
    { x: 200, y: 200 },
    { x: 100, y: 200 }
  ];
  backgroundImageUrl: string = 'background-image-url.jpg'; // Falošná URL adresa obrázka na pozadí

  constructor() {
    this.fetchFakeData(); // Načítanie falošných údajov pri inicializácii komponentu
  }

  fetchFakeData() {
    // Simulácia načítania údajov zo servera po krátkom časovom intervale
    setTimeout(() => {
      this.backendText = this.generateFakeText(); // Generovanie falošného textu
    }, 1000); // Napríklad počkáme 1 sekundu pred zobrazením falošných údajov
  }

  generateFakeText(): string {
    // Generovanie falošného textu
    return `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`;
  }
}
