import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private rootURL = "https://localhost:44460/weatherforecast";

  constructor(private http: HttpClient, private router: Router) {
  }

  getUsers() {
    this.http.get('/api/weatherforecast/Users').subscribe((result) => {
      console.warn('result', result);
    });
  }

  getUser(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any>('/api/weatherforecast/user-info', { headers });
  }

  putUser(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.put<any>('/api/weatherforecast/update-user-info', data, { headers });
  }




  // post to call API endpoint for uploading file and imageType
  // TODO: pridať step do cookies aby som to vedel poslať z BE do Datastoru
  sendImageToBE_s0(file: File | null) {
    const formData = new FormData();
    // @ts-ignore
    formData.append('image', file, file.name);
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.post('api/myimages/stepper-s0', formData, { headers: headers });
  }


  sendAreasToBE_s1() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.post('api/myimages/stepper-s1', { headers: headers });
  }

  sendAreasToBE_s2t(areas: any) {
    var formData = new FormData();
    formData.append('areas', areas);
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.post('api/myimages/stepper-s2t', formData, { headers: headers });
  }

  // ???
  // s3t
  // ???
  // ???
  // s3t
  // ???
  // ???
  // s3t
  // ???

  sendImageToBE_s2k(file: File | null) {
    const formData = new FormData();
    // @ts-ignore
    formData.append('image', file, file.name);
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.post('api/myimages/stepper-s2k', formData, { headers: headers });
  }

  sendAreasToBE_s3k(areas: any) {
    var formData = new FormData();
    formData.append('areas', areas);
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.post('api/myimages/stepper-s3k', formData, { headers: headers });
  }

  sendImagesToBE_s4(file1: File | null, file2: File | null) {
    const formData = new FormData();
    // @ts-ignore
    formData.append('text', file1, file1.name);
    // @ts-ignore
    formData.append('key', file2, file2.name);
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.post('api/myimages/stepper-s4', formData, { headers: headers });
  }







  // get to call API endpoint that will retrieve image/json/txt from cache based on step
  // steps will be sent in headers
  // steps: s1, s2, s3, s4, s5, s6
  getImageFromCache(step: string) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'step': step
    });
    return this.http.get('api/myimages/get-image-ds', {headers: headers});
  }

}
