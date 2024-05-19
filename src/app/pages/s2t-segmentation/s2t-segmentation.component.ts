import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-s2t-segmentation',
  templateUrl: './s2t-segmentation.component.html',
  styleUrls: ['./s2t-segmentation.component.css'],
})
export class S2tSegmentationComponent implements OnInit {
  @Input() areas: any;
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('image', { static: true })
  imageElement!: ElementRef<HTMLImageElement>;
  private ctx!: CanvasRenderingContext2D;

  fileUrl: string | null = null;

  selectedFileName: string | null = null;

  rectangleNames: string[] = [];
  start: { x: number; y: number } | null = null;
  rectangles: {
    start: { x: number; y: number };
    end: { x: number; y: number };
  }[] = [];
  backendText: string | undefined = '';

  constructor(
    private imageService: ImageService,
    private userService: UserService
  ) {}

  ngOnInit() {
    // this.selectedFileName = this.imageService.getImageUrl() ?? '';
    this.fileUrl = localStorage.getItem('selectedFile');
    const context = this.canvas.nativeElement.getContext('2d');
    if (!context) {
      throw new Error('Could not get 2D rendering context from canvas');
    }
    this.ctx = context;

    const selectedFileName = this.imageService.getImageUrl();
    if (selectedFileName) {
      this.loadImage(selectedFileName);
    }
    let rectangleArray:
      | { start: { x: number; y: number }; end: { x: number; y: number } }[] =
      [];
    this.areas.areas.forEach(
      (area: {
        x: number;
        y: number;
        width: number;
        height: number;
        type: string;
      }) => {
        const x_start = area.x;
        const y_start = area.y;
        const x_end = area.x + area.width;
        const y_end = area.y + area.height;
        let rectangle1 = {
          start: { x: x_start, y: y_start },
          end: { x: x_end, y: y_end },
        };
        rectangleArray.push(rectangle1);
        this.rectangleNames.push(`Rectangle ${area.type}`);
      }
    );

    this.drawAllRectangles(rectangleArray);
  }

  loadImage(url: string): void {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const file = new File([blob], url);
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = this.imageElement.nativeElement;
          img.onload = () => this.adjustCanvasSize(img);
          img.src = event.target?.result as string;
        };
        reader.readAsDataURL(file);
      });
  }

  async updateRectangles(rectangles: any): Promise<string | undefined> {
    let rectanglesArray: {
      x: number;
      y: number;
      width: number;
      height: number;
    }[] = [];

    rectangles.forEach(
      (rectangle: {
        start: { x: number; y: number };
        end: { x: number; y: number };
      }) => {
        let x = rectangle.start.x;
        let y = rectangle.start.y;
        let width = rectangle.end.x - rectangle.start.x;
        let height = rectangle.end.y - rectangle.start.y;

        rectanglesArray.push({ x, y, width, height });
      }
    );

    let serverAreas = rectanglesArray.map((area: any) => ({
      x: Math.round(area.x),
      y: Math.round(area.y),
      width: Math.round(area.width),
      height: Math.round(area.height),
      type: area.type || null,
    }));

    let rectanglesJson = JSON.stringify({ areas: serverAreas });

    this.backendText = await this.userService
      .sendAreasToBE_s2t(serverAreas)
      .toPromise();

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
    const scaleX = this.canvas.nativeElement.width / rect.width;
    const scaleY = this.canvas.nativeElement.height / rect.height;
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;
    this.start = { x, y };
  }

  onCanvasMouseUp(event: MouseEvent): void {
    if (!this.start) return;
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const scaleX = this.canvas.nativeElement.width / rect.width;
    const scaleY = this.canvas.nativeElement.height / rect.height;
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;
    this.rectangles.push({ start: this.start, end: { x, y } });
    this.rectangleNames.push(`Rectangle ${this.rectangles.length}`);
    this.start = null;
    this.drawAllRectangles();
  }

  drawAllRectangles(
    rectangleArray?: {
      start: { x: number; y: number };
      end: { x: number; y: number };
    }[]
  ): void {
    this.ctx.clearRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );
    this.ctx.drawImage(
      this.imageElement.nativeElement,
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );
    if (rectangleArray) {
      rectangleArray.forEach((rectangle) => {
        this.rectangles.push(rectangle);
      });
    }
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

  removeRectangle(index: number): void {
    this.rectangles.splice(index, 1);
    this.rectangleNames.splice(index, 1);
    this.drawAllRectangles();
  }
}
