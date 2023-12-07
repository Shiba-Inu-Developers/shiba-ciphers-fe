import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

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


}
