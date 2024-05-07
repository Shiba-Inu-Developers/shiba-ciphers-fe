import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-s2t-segmentation',
  templateUrl: './s2t-segmentation.component.html',
  styleUrls: ['./s2t-segmentation.component.css']
})
export class S2tSegmentationComponent {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  private context!: CanvasRenderingContext2D;

  private isDrawing: boolean = false;
  private points: { x: number, y: number }[] = [];
  private predefinedPoints: { x: number, y: number }[] = [ // Preddefinované body pre vykreslenie
    { x: 100, y: 100 },
    { x: 200, y: 100 },
    { x: 200, y: 200 },
    { x: 100, y: 200 }
  ];

  constructor() { }

  ngAfterViewInit() {
    this.context = this.canvas.nativeElement.getContext('2d')!;
    this.drawPredefinedPolygon();
  }

  private drawPredefinedPolygon() {
    if (!this.context) return;

    this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.context.beginPath();
    this.context.moveTo(this.predefinedPoints[0].x, this.predefinedPoints[0].y);

    for (let i = 1; i < this.predefinedPoints.length; i++) {
      this.context.lineTo(this.predefinedPoints[i].x, this.predefinedPoints[i].y);
    }

    this.context.closePath();
    this.context.stroke();
  }

  private drawPolygon() {
    if (!this.context) return;

    this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.context.beginPath();
    this.context.moveTo(this.points[0].x, this.points[0].y);

    for (let i = 1; i < this.points.length; i++) {
      this.context.lineTo(this.points[i].x, this.points[i].y);
    }

    if (this.isDrawing) {
      this.context.lineTo(this.points[this.points.length - 1].x, this.points[this.points.length - 1].y);
    }

    this.context.closePath();
    this.context.stroke();
  }

  onCanvasMouseDown(event: MouseEvent) {
    this.isDrawing = true;
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    this.points.push({ x, y });
    this.drawPolygon();
  }

  onCanvasMouseUp(event: MouseEvent) {
    this.isDrawing = false;
  }

  onCanvasMouseMove(event: MouseEvent) {
    if (this.isDrawing) {
      const rect = this.canvas.nativeElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      this.points.push({ x, y });
      this.drawPolygon();
    }
  }
}
