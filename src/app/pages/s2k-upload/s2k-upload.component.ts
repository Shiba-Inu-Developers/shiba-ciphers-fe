import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit, Output, EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-s2k-upload',
  templateUrl: './s2k-upload.component.html',
  styleUrls: ['./s2k-upload.component.css'],
})
export class S2kUploadComponent{
  @Output() selectedFile = new EventEmitter<File>();
  @ViewChild('backgroundElement', { static: true }) backgroundElement!: ElementRef<HTMLDivElement>;



  constructor() { }

  onFileChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (file) {
      const reader = new FileReader();
      this.selectedFile.emit(file);
      reader.onload = () => {
        this.backgroundElement.nativeElement.style.backgroundImage = `url(${reader.result})`;
      };
      reader.readAsDataURL(file);
    }
  }
}
