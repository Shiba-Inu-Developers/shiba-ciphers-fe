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
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;

  private rootURL = 'https://localhost:44460/weatherforecast';

  private email: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  setEmail(email: string) {
    this.email = email;
  }

  getIsAuth() {
    return this.isAthenticated;
  }

  getEmail(): string {
    return this.email;
  }

  getToken() {
    return this.token || localStorage.getItem('token');
  }

  private saveAuthData(token: string) {
    localStorage.setItem('token', token);
  }

  onRegistration(email: string, password: string) {
    const data = {
      email: email,
      password: password,
    };

    this.http.post('/api/User', data).subscribe((result) => {
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

    this.http
      .post<{ token: string }>('/api/Login', data)
      .subscribe((response) => {
        const token = response.token;
        this.token = token;
        if (token) {
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.saveAuthData(token);
          this.router.navigate(['/home']);
        }
        // localStorage.setItem('token', this.token);
        // this.authStatusListener.next(true);
        // this.router.navigate(['/home']);
      });
  }

  onVerify(otp: string) {
    const data = {
      otp: otp,
      email: this.getEmail(),
    };

    this.http.post('/api/VerifyOtp', data).subscribe((result) => {
      console.warn('result', result);
      this.router.navigate(['/login']);
    });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    this.token = authInformation.token;
    this.isAuthenticated = true;
    this.authStatusListener.next(true);
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    return {
      token: token,
    };
  }

  private clearAuthData() {
    localStorage.removeItem('token');
  }

  logout() {
    this.token = '';
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
    this.router.navigate(['/']);
    this.http.post('/api/logout', {}).subscribe();
  }
}
