import {Component} from '@angular/core';
import {AuthService} from "../auth.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent {
  myForm: FormGroup = new FormGroup({})

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      otp: new FormControl('')
    });
  }

  onVerify() {
    this.authService.setEmail(history.state.email);
    this.authService.onVerify(this.myForm?.value.otp);
  }

}
