import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-s2t-segmentation',
  templateUrl: './s2t-segmentation.component.html',
  styleUrls: ['./s2t-segmentation.component.css'],
})
export class S2tSegmentationComponent implements OnInit, AfterViewInit {
  @Output() coordinatesChange: EventEmitter<
    {
      x: number;
      y: number;
      height: number;
      width: number;
    }[]
  > = new EventEmitter();
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('image', { static: true })
  imageElement!: ElementRef<HTMLImageElement>;
  ctx!: CanvasRenderingContext2D;
  start: { x: number; y: number } | null = null;
  rectangles: {
    start: { x: number; y: number };
    end: { x: number; y: number };
  }[] = [];
  rectangleNames: string[] = [];
  selectedFileName!: string;

  constructor(private imageService: ImageService) {}

  ngOnInit() {
    this.selectedFileName = this.imageService.getImageUrl() ?? '';
  }

  ngAfterViewInit() {
    const canvas = this.canvas.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.adjustCanvasSize(this.imageElement.nativeElement);
  }

  adjustCanvasSize(image: HTMLImageElement): void {
    const canvas = this.canvas.nativeElement;
    const width = 1000;
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
    this.emitCoordinates();
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
      this.ctx.lineWidth = 5;
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

  emitCoordinates(): void {
    this.coordinatesChange.emit(
      this.rectangles.map((rectangle) => ({
        x: rectangle.start.x,
        y: rectangle.start.y,
        width: rectangle.end.x - rectangle.start.x,
        height: rectangle.end.y - rectangle.start.y,
      }))
    );
  }
}
