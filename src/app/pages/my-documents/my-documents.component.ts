import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-documents',
  templateUrl: './my-documents.component.html',
  styleUrls: ['./my-documents.component.css']
})
export class MyDocumentsComponent implements OnInit{

  documents: any[] = [];
  documentTexts: any[] = [];
  documentKeys: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllDocumentsText()
    this.getAllDocumentsKeys()
  }

  getAllDocumentsText() {
    this.http.get<any[]>('/api/myimages/text-records').subscribe((documents: any[]) => {
      this.documentTexts = documents;
    });
  }
  getAllDocumentsKeys() {
    this.http.get<any[]>('/api/myimages/key-records').subscribe((documents: any[]) => {
      this.documentKeys = documents;
    });
  }
}
