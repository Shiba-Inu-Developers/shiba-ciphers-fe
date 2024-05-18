import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private rootURL = "https://localhost:44460/weatherforecast";

  private hashT = "";
  private hashK = "";

  setHashT(hashT: string) {
    this.hashT = hashT;
  }

  getHashT() {
    return this.hashT;
  }

  setHashK(hashK: string) {
    this.hashK = hashK;
  }

  getHashK() {
    return this.hashK;
  }


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




  // STEPPER
  sendImageToBE_s0(file: File | null) {
    const formData = new FormData();
    // @ts-ignore
    formData.append('image', file);
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.put('api/myimages/stepper-s0', formData, { headers: headers, responseType: 'text' });
  }


  sendAreasToBE_s1() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.post<string>('api/myimages/stepper-s1', { headers: headers, responseType: 'text' });
  }

  sendAreasToBE_s2t(areas: any) {
    var formData = new FormData();
    formData.append('areas', areas);
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.post('api/myimages/stepper-s2t', formData, { headers: headers, responseType: 'text'});
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
    formData.append('image', file);
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.post('api/myimages/stepper-s2k', formData, { headers: headers, responseType: 'text' });
  }

  sendAreasToBE_s3k(areas: any) {
    var formData = new FormData();
    formData.append('areas', areas);
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.post('api/myimages/stepper-s3k', formData, { headers: headers, responseType: 'text'});
  }

  sendImagesToBE_s4(file1: File | null, file2: File | null) {
    const formData = new FormData();
    // @ts-ignore
    formData.append('text', file1);
    // @ts-ignore
    formData.append('key', file2);
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
