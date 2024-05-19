import {Component, Input, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-s5-decipher-result',
  templateUrl: './s5-decipher-result.component.html',
  styleUrls: ['./s5-decipher-result.component.css'],
})
export class S5DecipherResultComponent implements OnInit {
  @Input() decryptedText: string = '';
  @Input() keyHash: string = '';
  @Input() textHash: string = '';
  keyImageUrl: string | ArrayBuffer | null = null;
  textImageUrl: string | ArrayBuffer | null = null;
  //decryptedText: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadDataFromBackend();

  }

  loadDataFromBackend(): void {
    const keyHash = this.keyHash;
    const textHash = this.textHash;
    console.log('keyHash:', keyHash);
    console.log('textHash:', textHash);

    this.http.get(`api/myimages/get-image-ds/${keyHash}`, {responseType: 'blob'}).pipe(
      concatMap(keyResponse => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            this.keyImageUrl = reader.result;
            resolve(null);
          };
          reader.onerror = reject;
          if (keyResponse) {
            reader.readAsDataURL(keyResponse);
          }
        });
      }),
      concatMap(() => {
        return this.http.get(`api/myimages/get-image-ds/${textHash}`, {responseType: 'blob'});
      })
    ).subscribe(
      textResponse => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.textImageUrl = reader.result;
        };
        if (textResponse) {
          reader.readAsDataURL(textResponse);
        }
      },
      error => {
        console.error(error); // handle the error here
      }
    );
  }
}
