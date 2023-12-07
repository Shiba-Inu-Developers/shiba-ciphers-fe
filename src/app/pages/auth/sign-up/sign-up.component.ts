import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {FormControl, FormGroup, FormBuilder, Validators} from "@angular/forms";
import {emailValidator} from "../../../services/validators/email.validator";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})


export class SignUpComponent implements OnInit {
  myForm: FormGroup = new FormGroup({})

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.myForm = this.fb.group({
      email: [''],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {

  }

  onRegistration() {
    const emailControl = this.myForm.get('email');
    emailControl?.setValidators([Validators.required, emailValidator()]);
    emailControl?.updateValueAndValidity();
    if (this.myForm?.valid) {
      this.authService.onRegistration(this.myForm?.value.email, this.myForm?.value.password);
    }
  }
}
