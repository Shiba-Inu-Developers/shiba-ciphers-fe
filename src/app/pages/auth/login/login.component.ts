import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {UserService} from "../../../services/user.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup = new FormGroup({})

  constructor(private authService: AuthService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  onLogin() {
    this.authService.onLogin(this.myForm?.value.email, this.myForm?.value.password);
  }

  getUsers() {
    this.userService.getUsers();
  }

}
