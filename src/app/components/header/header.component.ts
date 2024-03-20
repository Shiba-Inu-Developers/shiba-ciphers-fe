import { AuthService } from 'src/app/pages/auth/auth.service';
import { UserService } from './../../services/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isLogged = false;
  // isLogged = this.authService.getIsAuth();
  constructor(private authService: AuthService) {}

  switchText(isLogged: boolean) {
    this.isLogged = !isLogged;
  }
}
