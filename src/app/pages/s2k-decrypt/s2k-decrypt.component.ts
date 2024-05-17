import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-s2k-decrypt',
  templateUrl: './s2k-decrypt.component.html',
  styleUrls: ['./s2k-decrypt.component.css'],
})
export class S2kDecryptComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('image', { static: true })
  imageElement!: ElementRef<HTMLImageElement>;
  ctx!: CanvasRenderingContext2D;
  start: { x: number; y: number } | null = null;
  rectangles: {
    start: { x: number; y: number };
    end: { x: number; y: number };
  }[] = [];
  isTutorialPage: boolean = false;
  rectangleNames: string[] = [];
  selectedFileName!: string;
  backendText: string = '';

  constructor(private imageService: ImageService, private router: Router) {
    // Získanie aktuálnej URL cesty
    const currentUrl = this.router.url;
    // Overenie, či aktuálna URL cesta zodpovedá tutoriálovej URL ceste
    this.isTutorialPage = currentUrl.includes('tutorial-key-stepper');
  }

  ngOnInit() {
    if (!this.isTutorialPage) {
      this.selectedFileName = this.imageService.getImageUrl() ?? '';
    } else {
      this.selectedFileName = 'assets/pics/tutorialKey.jpg';
      this.backendText =
        'This is a tutorial page for key decryption. Please select the key area. You can select multiple areas.';
    }
  }

  ngAfterViewInit() {
    const canvas = this.canvas.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.adjustCanvasSize(this.imageElement.nativeElement);
  }

  adjustCanvasSize(image: HTMLImageElement): void {
    const canvas = this.canvas.nativeElement;
    const width = 600;
    const height = image.naturalHeight * (width / image.naturalWidth);
    canvas.width = width;
    canvas.height = height;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.drawImage(image, 0, 0, width, height);
    this.drawAllRectangles();
  }

  onCanvasMouseDown(event: MouseEvent): void {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    this.start = { x, y };
  }

  onCanvasMouseUp(event: MouseEvent): void {
    if (!this.start) return;

    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.rectangles.push({ start: this.start, end: { x, y } });
    this.rectangleNames.push(`Rectangle ${this.rectangles.length}`);
    this.start = null;
    this.drawAllRectangles();
    this.printAllRectanglesCoordinates();
  }

  drawAllRectangles(): void {
    const canvas = this.canvas.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.drawImage(
      this.imageElement.nativeElement,
      0,
      0,
      canvas.width,
      canvas.height
    );
    this.rectangles.forEach((rectangle) => {
      this.ctx.beginPath();
      this.ctx.rect(
        rectangle.start.x,
        rectangle.start.y,
        rectangle.end.x - rectangle.start.x,
        rectangle.end.y - rectangle.start.y
      );
      this.ctx.stroke();
    });
  }

  printAllRectanglesCoordinates(): void {
    this.rectangles.forEach((rectangle, index) => {
      console.log(`Rectangle ${index + 1}:`);
      console.log(
        `Coordinates: (x: ${rectangle.end.x}, y: ${rectangle.end.y}, ${
          rectangle.start.x - rectangle.end.x
        }, ${rectangle.start.y - rectangle.end.y})`
      );
    });
  }

  removeRectangle(index: number): void {
    this.rectangles.splice(index, 1);
    this.rectangleNames.splice(index, 1);
    this.drawAllRectangles();
  }
}
