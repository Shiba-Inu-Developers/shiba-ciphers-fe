import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-s5-decipher-result',
  templateUrl: './s5-decipher-result.component.html',
  styleUrls: ['./s5-decipher-result.component.css'],
})
export class S5DecipherResultComponent implements OnInit {
  keyImageUrl: string = '';
  textImageUrl: string = '';
  decryptedText: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadDataFromBackend();
  }

  loadDataFromBackend(): void {
    // TODO - load data from backend
    this.http
      .get<{
        keyImageUrl: string;
        textImageUrl: string;
        decryptedText: string;
      }>('/api/decipher-result')
      .subscribe(
        (data) => {
          this.keyImageUrl = data.keyImageUrl;
          this.textImageUrl = data.textImageUrl;
          this.decryptedText = data.decryptedText;
        },
        (error) => {
          console.error('Error loading data from backend', error);
        }
      );
  }
}
