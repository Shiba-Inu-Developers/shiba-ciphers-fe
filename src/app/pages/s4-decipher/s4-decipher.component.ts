import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-s4-decipher',
  templateUrl: './s4-decipher.component.html',
  styleUrls: ['./s4-decipher.component.css'],
})
export class S4DecipherComponent implements OnInit{
  @Output() keyId: EventEmitter<number> = new EventEmitter<number>();
  @Output() textId: EventEmitter<number> = new EventEmitter<number>();
  @Output() keyHash: EventEmitter<string> = new EventEmitter<string>();
  @Output() textHash: EventEmitter<string> = new EventEmitter<string>();
  imageKey: string | null = null;
  imageText: string | null = null;
  selectedKey: string = '';
  selectedText: string = '';
  selectedKeyTitle: string = '';
  selectedTextTitle: string = '';
  selectedKeyHash: string = '';
  selectedTextHash: string = '';
  selectedKeyId: number = 0;
  selectedTextId: number = 0;
  keyOptions: string[] = [];
  textOptions: string[] = [];
  keyContents: string[] = [];
  textContents: string[] = [];
  keyHashes: string[] = [];
  textHashes: string[] = [];
  keyIds: number[] = [];
  textIds: number[] = [];

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
      let keyHashes: string[] = [];
      let keyIds: number[] = [];
      let textTitles: string[] = [];
      let textContents: string[] = [];
      let textHashes: string[] = [];
      let textIds: number[] = [];

      this.allImages.forEach((image: any) => {
        if (image.type === 'key') {
          keyTitles.push(image.title);
          keyContents.push(image.content);
          keyHashes.push(image.hash);
          keyIds.push(image.id);
        } else if (image.type === 'text') {
          textTitles.push(image.title);
          textContents.push(image.content);
          textHashes.push(image.hash);
          textIds.push(image.id);
        }
      });

      this.keyOptions = keyTitles;
      this.textOptions = textTitles;

      this.keyContents = keyContents;
      this.textContents = textContents;

      this.keyHashes = keyHashes;
      this.textHashes = textHashes;

      this.keyIds = keyIds;
      this.textIds = textIds;

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
    this.selectedKeyHash = this.keyHashes[selectedIndex];
    this.keyId.emit(this.keyIds[selectedIndex]);
    this.keyHash.emit(this.selectedKeyHash);
  }

  onTextChange(event: Event) {
    const selectedIndex = (event.target as HTMLSelectElement).selectedIndex;
    this.selectedTextTitle = this.textOptions[selectedIndex];
    this.selectedText = this.textContents[selectedIndex];
    this.selectedTextHash = this.textHashes[selectedIndex];
    this.textId.emit(this.textIds[selectedIndex]);
    this.textHash.emit(this.selectedTextHash);
  }
}
