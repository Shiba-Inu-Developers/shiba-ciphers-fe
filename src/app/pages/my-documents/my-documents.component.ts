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
  documentTextsHashes: string[] = [];
  documentKeysHashes: string[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllImages();
  }

  getAllImages() {
    this.http.get<any[]>('/api/myimages/all-images').subscribe((documents: any[]) => {
      this.documents = documents;
      this.documentTexts = documents.filter(document => document.type === 'text');
      this.documentKeys = documents.filter(document => document.type === 'key');
      this.documentTextsHashes = this.documentTexts.map(document => document.hash);
      this.documentKeysHashes = this.documentKeys.map(document => document.hash);
    });
  }

  changePriorityText(index: number, isPublic: boolean) {
    const hash = this.documentTextsHashes[index];
    const ppublic = !isPublic;
    this.http.post(`/api/myimages/change-public/${hash}`, { ppublic: ppublic }).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  changePriorityKey(index: number, isPublic: boolean) {
    const hash = this.documentKeysHashes[index];
    const ppublic = !isPublic;
    this.http.post(`/api/myimages/change-public/${hash}`, { ppublic: ppublic }).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

}
