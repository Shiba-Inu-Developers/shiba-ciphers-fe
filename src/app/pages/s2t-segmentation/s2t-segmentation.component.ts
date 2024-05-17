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
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  selectedFileName!: string;
  ctx!: CanvasRenderingContext2D;
  start: { x: number; y: number } | null = null;
  rectangle: {
    start: { x: number; y: number };
    end: { x: number; y: number };
  } | null = null;
  rectangles: {
    start: { x: number; y: number };
    end: { x: number; y: number };
  }[] = [];
  rectangleNames: string[] = [];

  constructor(private imageService: ImageService) {}

  ngOnInit() {
    this.selectedFileName = this.imageService.getImageUrl() ?? '';
  }

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
  }

  onCanvasMouseDown(event: MouseEvent) {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.start = { x, y };
  }

  onCanvasMouseUp(event: MouseEvent) {
    if (this.start === null) return;

    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.rectangle = { start: this.start, end: { x, y } };
    this.start = null;
    this.drawAllRectangles();
    this.printAllRectanglesCoordinates();
  }

  // private drawRectangle() {
  //   if (!this.context || !this.rectangle) return;

  //   this.context.clearRect(
  //     0,
  //     0,
  //     this.canvas.nativeElement.width,
  //     this.canvas.nativeElement.height
  //   );

  //   this.context.beginPath();
  //   this.context.rect(
  //     this.rectangle.start.x,
  //     this.rectangle.start.y,
  //     this.rectangle.end.x - this.rectangle.start.x,
  //     this.rectangle.end.y - this.rectangle.start.y
  //   );
  //   this.context.stroke();
  // }

  private drawAllRectangles() {
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

  // private printCoordinates() {
  //   if (!this.rectangle) return;

  //   console.log(
  //     `Start: (${this.rectangle.start.x}, ${this.rectangle.start.y})`
  //   );
  //   console.log(
  //     `Suradnice: (x: ${this.rectangle.end.x}, y: ${this.rectangle.end.y}, ${
  //       this.rectangle.start.x - this.rectangle.end.x
  //     }, ${this.rectangle.start.y - this.rectangle.end.y})`
  //   );
  //   console.log(`End: (${this.rectangle.end.x}, ${this.rectangle.end.y})`);
  // }

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
    this.ctx.clearRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );
    this.drawAllRectangles();
  }
}
