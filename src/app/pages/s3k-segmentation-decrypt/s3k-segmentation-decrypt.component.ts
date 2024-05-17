import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
} from '@angular/core';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-s3k-segmentation-decrypt',
  templateUrl: './s3k-segmentation-decrypt.component.html',
  styleUrls: ['./s3k-segmentation-decrypt.component.css'],
})
// , AfterViewInit
export class S3kSegmentationDecryptComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  canvasElement!: ElementRef;
  private ctx!: CanvasRenderingContext2D;
  private image!: HTMLImageElement;
  fileUrl: string | null = null;
  private polygon!: Path2D;
  selectedFileName: string | null = null;
  rectangleNames: string[] = [];
  start: { x: number; y: number } | null = null;
  rectangles: {
    start: { x: number; y: number };
    end: { x: number; y: number };
  }[] = [];

  // Premenná pre text z backendu
  backendText: string = '';

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.fileUrl = localStorage.getItem('selectedFile');
    const context = this.canvas.nativeElement.getContext('2d');
    if (!context) {
      throw new Error('Could not get 2D rendering context from canvas');
    }
    this.ctx = context;
    this.image = new Image();

    // Fill the entire canvas
    this.ctx.fillRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );

    const selectedFileName = this.imageService.getImageUrl();
    if (selectedFileName) {
      fetch(selectedFileName)
        .then((response) => response.blob())
        .then((blob) => {
          console.log(selectedFileName);
          console.log(blob);
          const file = new File([blob], selectedFileName);
          console.log(file);
          const reader = new FileReader();
          console.log(reader);
          reader.onload = (event) => {
            this.image.onload = () => {
              console.log(this.image);
              this.ctx.drawImage(
                this.image,
                0,
                0,
                this.canvas.nativeElement.width,
                this.canvas.nativeElement.height
              );
            };
            this.image.src = event.target?.result as string;
          };
          reader.readAsDataURL(file);
        });
    }
  }
  onCanvasMouseUp(event: MouseEvent) {
    if (this.start === null) return;
    const rect = (event.target as HTMLCanvasElement).getBoundingClientRect();
    const scaleX = this.canvas.nativeElement.width / rect.width;
    const scaleY = this.canvas.nativeElement.height / rect.height;
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;

    this.rectangles.push({ start: this.start, end: { x, y } });
    this.rectangleNames.push(`Rectangle ${this.rectangles.length}`);
    this.start = null;
    this.drawAllRectangles();
    this.printAllRectanglesCoordinates();
  }

  onCanvasMouseDown(event: MouseEvent) {
    const rect = (event.target as HTMLCanvasElement).getBoundingClientRect();
    const scaleX = this.canvas.nativeElement.width / rect.width;
    const scaleY = this.canvas.nativeElement.height / rect.height;
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;

    this.start = { x, y };
  }

  // private drawAllRectangles() {
  //   this.rectangles.forEach((rectangle) => {
  //     this.ctx.beginPath();
  //     this.ctx.rect(
  //       rectangle.start.x,
  //       rectangle.start.y,
  //       rectangle.end.x - rectangle.start.x,
  //       rectangle.end.y - rectangle.start.y
  //     );
  //     this.ctx.stroke();
  //   });
  // }

  private drawAllRectangles() {
    // Clear the canvas
    this.ctx.clearRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );

    // Draw the image
    this.ctx.drawImage(
      this.image,
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );

    // Draw all rectangles
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

  private printAllRectanglesCoordinates() {
    this.rectangles.forEach((rectangle, index) => {
      console.log(`Rectangle ${index + 1}:`);
      console.log(
        `Suradnice: (x: ${rectangle.end.x}, y: ${rectangle.end.y}, ${
          rectangle.start.x - rectangle.end.x
        }, ${rectangle.start.y - rectangle.end.y})`
      );
      // console.log(`Start: (${rectangle.start.x}, ${rectangle.start.y})`);
      // console.log(`End: (${rectangle.end.x}, ${rectangle.end.y})`);
    });
  }

  removeRectangle(index: number) {
    this.rectangles.splice(index, 1);
    this.rectangleNames.splice(index, 1);
    this.drawAllRectangles();
    this.printAllRectanglesCoordinates();
  }

  // ngAfterViewInit(): void {
  //   this.image.onload = () => {
  //     this.ctx.drawImage(
  //       this.image,
  //       0,
  //       0,
  //       this.canvas.nativeElement.width,
  //       this.canvas.nativeElement.height
  //     );
  //
  //     // create polygon
  //     this.polygon = new Path2D();
  //     this.polygon.moveTo(10, 10);
  //     this.polygon.lineTo(50, 30);
  //     this.polygon.lineTo(40, 70);
  //     this.polygon.lineTo(60, 50);
  //     this.polygon.lineTo(100, 150);
  //     this.polygon.lineTo(40, 100);
  //     this.polygon.closePath();
  //
  //     // draw polygon
  //     this.ctx.fill(this.polygon);
  //   };
  //
  //   // Load image from backend
  //   this.image.src = 'URL_OF_THE_IMAGE';
  // }
}
