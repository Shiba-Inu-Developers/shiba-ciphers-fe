import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-documents',
  templateUrl: './my-documents.component.html',
  styleUrls: ['./my-documents.component.css']
})
export class MyDocumentsComponent implements OnInit{

  documents: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllDocuments()
  }

  getAllDocuments() {
    this.http.get<any[]>('/api/myimages/history-images').subscribe((documents: any[]) => {
      this.documents = documents;
    });
  }
}
