declare let google: any;
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../../../services/user.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  myForm: FormGroup = new FormGroup({});

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
    google.account.id.initialize({
      client_id:
        '856076861704-tdfb7v4b6fvs1q10ss9ov01oeutd5neq.apps.googleusercontent.com',
      callback: (response: any) => {},
      // auto_prompt: true,
    });

    google.account.id.renderButton(document.getElementById('google-btn'), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle',
      with: 350,
    });
  }

  onLogin() {
    this.authService.onLogin(
      this.myForm?.value.email,
      this.myForm?.value.password
    );
  }

  getUsers() {
    this.userService.getUsers();
  }
}
