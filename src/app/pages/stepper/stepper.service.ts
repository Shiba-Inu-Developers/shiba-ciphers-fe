import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StepperService {
  constructor(private http: HttpClient) {}

  step1(data: any) {
    return this.http.post('/api/step1', data);
  }

  step2(data: any) {
    return this.http.post('/api/step2', data);
  }

  step3(data: any) {
    return this.http.post('/api/step3', data);
  }

  // Add more steps as needed
}
