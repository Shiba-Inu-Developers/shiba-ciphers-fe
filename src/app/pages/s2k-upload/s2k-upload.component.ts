import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-s2k-upload',
  templateUrl: './s2k-upload.component.html',
  styleUrls: ['./s2k-upload.component.css'],
})
export class S2kUploadComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas', { static: true })
  canvasElement!: ElementRef;

  private canvas!: CanvasRenderingContext2D;
  private image!: HTMLImageElement;
  private polygon!: Path2D;

  constructor() {}

  ngOnInit(): void {
    this.canvas = this.canvasElement.nativeElement.getContext('2d');
    this.image = new Image();
    this.polygon = new Path2D();
  }

  ngAfterViewInit(): void {
    this.image.onload = () => {
      this.canvas.drawImage(
        this.image,
        0,
        0,
        this.canvas.canvas.width,
        this.canvas.canvas.height
      );

      // vytvorenie polygonu
      this.polygon.moveTo(10, 10);
      this.polygon.lineTo(50, 30);
      this.polygon.lineTo(40, 70);
      this.polygon.lineTo(60, 50);
      this.polygon.lineTo(100, 150);
      this.polygon.lineTo(40, 100);
      this.polygon.closePath();

      // vykreslenie polygonu
      this.canvas.fill(this.polygon);
    };

    // Načítanie obrázka z backendu
    this.image.src = 'URL_OBRAZKA';
  }
}
