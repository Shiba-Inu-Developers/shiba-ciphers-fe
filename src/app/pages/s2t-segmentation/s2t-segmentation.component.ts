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
import {UserService} from "../../services/user.service";

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
  backendText: string | undefined = '';

  constructor(private imageService: ImageService, private userService: UserService) {}

  ngOnInit() {
    this.selectedFileName = this.imageService.getImageUrl() ?? '';
  }

  ngAfterViewInit() {
    const canvas = this.canvas.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.adjustCanvasSize(this.imageElement.nativeElement);
  }




  async updateRectangles(rectangles: any): Promise<string | undefined> {
    let rectanglesArray: {
      x: number;
      y: number;
      width: number;
      height: number;
    }[] = [];

    rectangles.forEach((rectangle: { start: { x: number; y: number; }; end: { x: number; y: number; }; }) => {
      let x = rectangle.start.x;
      let y = rectangle.start.y;
      let width = rectangle.end.x - rectangle.start.x;
      let height = rectangle.end.y - rectangle.start.y;

      rectanglesArray.push({ x, y, width, height });
    });

    let serverAreas = rectanglesArray.map((area: any) => ({
      x: Math.round(area.x),
      y: Math.round(area.y),
      width: Math.round(area.width),
      height: Math.round(area.height),
      type: area.type || null,
    }));

    let rectanglesJson = JSON.stringify({ areas: serverAreas });
    console.log(rectanglesJson);

    this.backendText = await this.userService.sendAreasToBE_s2t(serverAreas).toPromise();

    console.log("BACKEND_TEXT2:", this.backendText);
    return this.backendText;
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
