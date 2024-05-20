import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-s3k-segmentation-decrypt',
  templateUrl: './s3k-segmentation-decrypt.component.html',
  styleUrls: ['./s3k-segmentation-decrypt.component.css'],
})
export class S3kSegmentationDecryptComponent implements OnInit {
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
  isTutorialPage: boolean = false;
  tmpRectangle: { x: number, y: number, x2: number, y2: number } | undefined = undefined

  constructor(
    private imageService: ImageService,
    private router: Router,
    private userService: UserService
  ) {
    // Získanie aktuálnej URL cesty
    const currentUrl = this.router.url;
    // Overenie, či aktuálna URL cesta zodpovedá tutoriálovej URL ceste
    this.isTutorialPage = currentUrl.includes('tutorial-key-stepper');
  }

  ngOnInit(): void {
    if (!this.isTutorialPage) {
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

      if (rectangleArray) {
        rectangleArray.forEach((rectangle) => {
          this.rectangles.push(rectangle);
        });
      }

      this.drawAllRectangles();
    } else {
      const context = this.canvas.nativeElement.getContext('2d');
      if (!context) {
        throw new Error('Could not get 2D rendering context from canvas');
      }
      this.ctx = context;
      this.loadImage('assets/pics/tutorialKey.jpg');
    }
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
      .sendAreasToBE_s2k(serverAreas)
      .toPromise();
    return this.backendText;
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

  adjustCanvasSize(image: HTMLImageElement): void {
    const canvas = this.canvas.nativeElement;
    const width = 1000;
    const height = image.naturalHeight * (width / image.naturalWidth);
    canvas.width = width;
    canvas.height = height;
    this.drawAllRectangles();
  }

  onCanvasMouseDown(event: MouseEvent): void {
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const scaleX = this.canvas.nativeElement.width / rect.width;
    const scaleY = this.canvas.nativeElement.height / rect.height;
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;
    this.start = { x, y };
    this.tmpRectangle = { x, y, x2: x, y2: y }
  }

  onCanvasMouseMove(event: MouseEvent): void {
    if (!this.tmpRectangle) {
      return
    };
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const scaleX = this.canvas.nativeElement.width / rect.width;
    const scaleY = this.canvas.nativeElement.height / rect.height;
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;
    this.tmpRectangle.x2 = x
    this.tmpRectangle.y2 = y
    this.drawAllRectangles()
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

    if (this.tmpRectangle) {
      this.tmpRectangle = undefined
    }

    this.drawAllRectangles();
  }

  drawAllRectangles(): void {
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
    this.rectangles.forEach((rectangle) => {
      this.ctx.beginPath();
      this.ctx.lineWidth = 3;
      this.ctx.rect(
        rectangle.start.x,
        rectangle.start.y,
        rectangle.end.x - rectangle.start.x,
        rectangle.end.y - rectangle.start.y
      );
      this.ctx.fillStyle = "rgba(255,0,0,0.3)"
      this.ctx.fill()
      this.ctx.stroke();
    });

    if (this.tmpRectangle) {
      this.ctx.fillStyle = "rgba(0,0,255,0.3)"
      this.ctx.fillRect(this.tmpRectangle.x, this.tmpRectangle.y, this.tmpRectangle.x2 - this.tmpRectangle.x, this.tmpRectangle.y2 - this.tmpRectangle.y)
    }
  }

  removeRectangle(index: number): void {
    this.rectangles.splice(index, 1);
    this.rectangleNames.splice(index, 1);
    this.drawAllRectangles();
  }
}
