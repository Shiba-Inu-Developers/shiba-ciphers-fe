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
    this.http.get('/api/Users').subscribe((result) => {
      console.warn('result', result);
    });
  }

  getUser(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any>('/api/user-info', { headers });
  }

  putUser(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.put<any>('/api/update-user-info', data, { headers });
  }


}
