import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient, private router: Router) {}

  getUserInfo(id: number) {
    return this.http.get('/api/User/' + id);
  }

  deletUser(id: number) {
    this.http.delete('/api/User/' + id).subscribe((result) => {});
  }

  updatePost(
    id: number,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string
  ) {
    const data = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
    };

    this.http.put('/api/User', data).subscribe((result) => {});
  }

  deletePic(id: number) {
    this.http.delete('/api/User/ProfilePic/' + id).subscribe((result) => {});
  }

  editPic(id: number, imageBlob: Blob) {
    const formData = new FormData();
    formData.append('image', imageBlob);

    this.http.put(`/api/User/${id}/pic`, formData).subscribe((result) => {});
  }
}
