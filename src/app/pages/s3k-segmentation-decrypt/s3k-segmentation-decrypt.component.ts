import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit, Input,
} from '@angular/core';
import {ImageService} from "../../services/image.service";

@Component({
  selector: 'app-s3k-segmentation-decrypt',
  templateUrl: './s3k-segmentation-decrypt.component.html',
  styleUrls: ['./s3k-segmentation-decrypt.component.css'],
})
export class S3kSegmentationDecryptComponent implements OnInit
  // , AfterViewInit
{
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  canvasElement!: ElementRef;
  private ctx!: CanvasRenderingContext2D;
  private image!: HTMLImageElement;
  fileUrl: string | null = null;
  private polygon!: Path2D;
  selectedFileName: string | null = null;

  // Premenná pre text z backendu
  backendText: string = '';

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.fileUrl = localStorage.getItem('selectedFile');
    const context = this.canvas.nativeElement.getContext('2d');
    if (!context) {
      throw new Error('Could not get 2D rendering context from canvas');
    }
    this.ctx = context;
    this.image = new Image();

    // Set the fill style to red
    this.ctx.fillStyle = 'red';

    // Fill the entire canvas
    this.ctx.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    const selectedFileName = this.imageService.getImageUrl();
    if (selectedFileName) {
      fetch(selectedFileName)
        .then(response => response.blob())
        .then(blob => {
          console.log(selectedFileName)
          console.log(blob)
          const file = new File([blob], selectedFileName);
          console.log(file)
          const reader = new FileReader();
          console.log(reader)
          reader.onload = (event) => {
            this.image.onload = () => {
              console.log(this.image)
              this.ctx.drawImage(this.image, 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
            };
            this.image.src = event.target?.result as string;
          };
          reader.readAsDataURL(file);
        });
    }
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
