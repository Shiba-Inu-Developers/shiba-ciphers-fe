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
  sendImageToCache(file: File | null, imageType: string, step: string) {
    const formData = new FormData();
    // @ts-ignore
    formData.append('image', file, file.name);
    formData.append('imageType', imageType);

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'imageType': imageType,
      'step': step
    });
    return this.http.post('api/myimages/save-image-ds', formData, { headers: headers });
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
