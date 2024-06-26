import { Component } from '@angular/core';
import {AuthService} from "./pages/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'timak-app';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.initAuthStatus();
  }
}
