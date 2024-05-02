import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAthenticated = false;
  private token: string = '';
  public authStatusListener = new Subject<boolean>();

  private rootURL = 'https://localhost:44460/weatherforecast';

  private email: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  setEmail(email: string) {
    this.email = email;
  }

  getEmail(): string {
    return this.email;
  }

  getToken() {
    return this.token || localStorage.getItem('token');
  }

  getIsAuth() {
    return this.isAthenticated;
  }

  onRegistration(email: string, password: string) {
    const data = {
      email: email,
      password: password,
    };

    this.http.post('/api/weatherforecast/User', data).subscribe((result) => {
      console.warn('result', result);
      this.router.navigate(['/otp-verification'], {
        state: { email: data.email },
      });
    });
  }

  onLogin(email: string, password: string) {
    const data = {
      email: email,
      password: password,
    };

    this.http.post('/api/weatherforecast/Login', data).subscribe((result) => {
      console.warn('result', result);
      this.isAthenticated = true;
      // @ts-ignore
      this.token = result['token'];
      localStorage.setItem('token', this.token);
      this.authStatusListener.next(true);
      this.router.navigate(['/home']);
    });
  }

  onVerify(otp: string) {
    const data = {
      otp: otp,
      email: this.getEmail(),
    };

    this.http.post('/api/weatherforecast/VerifyOtp', data).subscribe((result) => {
      console.warn('result', result);
      this.router.navigate(['/login']);
    });
  }

  getAuthData() {
    const token = localStorage.getItem('token');
    return token ? { token } : null;
  }

  initAuthStatus() {
    const authData = this.getAuthData();
    if (authData) {
      this.isAthenticated = true;
      this.authStatusListener.next(true);
    }
  }
}
