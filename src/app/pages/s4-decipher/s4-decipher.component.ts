import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-s4-decipher',
  templateUrl: './s4-decipher.component.html',
  styleUrls: ['./s4-decipher.component.css'],
})
export class S4DecipherComponent implements OnInit{
  imageKey: string | null = null;
  imageText: string | null = null;
  selectedKey: string = '';
  selectedText: string = '';
  selectedKeyTitle: string = '';
  selectedTextTitle: string = '';
  keyOptions: string[] = [];
  textOptions: string[] = [];
  keyContents: string[] = [];
  textContents: string[] = [];

  allImages: any;
  loading = true;
  selectedTextContent: string = '';
  selectedKeyContent: string = '';

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getAllImages().subscribe(images => {
      this.allImages = images;

      let keyTitles: string[] = [];
      let keyContents: string[] = [];
      let textTitles: string[] = [];
      let textContents: string[] = [];

      this.allImages.forEach((image: any) => {
        if (image.type === 'key') {
          keyTitles.push(image.title);
          keyContents.push(image.content);
        } else if (image.type === 'text') {
          textTitles.push(image.title);
          textContents.push(image.content);
        }
      });

      this.keyOptions = keyTitles;
      this.textOptions = textTitles;

      this.keyContents = keyContents;
      this.textContents = textContents;

      this.loading = false;
    });
  }

  onKeyImageChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.imageKey = file ? URL.createObjectURL(file) : null;
  }

  onTextImageChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.imageText = file ? URL.createObjectURL(file) : null;
  }

  onKeyChange(event: Event) {
    const selectedIndex = (event.target as HTMLSelectElement).selectedIndex;
    this.selectedKeyTitle = this.keyOptions[selectedIndex];
    this.selectedKey = this.keyContents[selectedIndex];
  }

  onTextChange(event: Event) {
    const selectedIndex = (event.target as HTMLSelectElement).selectedIndex;
    this.selectedTextTitle = this.textOptions[selectedIndex];
    this.selectedText = this.textContents[selectedIndex];
  }
}
