import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm!: FormGroup;
  isSubmitted = false;
  responseMessage: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private ngxService: NgxUiLoaderService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this._initSignupForm();
  }

  private _initSignupForm() {
    this.signUpForm = this.fb.group({
      myUsername: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.ngxService.start();
    this.isSubmitted = true;

    const user: User = {
      myUsername: this.signUpFormError['myUsername'].value,
      phone: this.signUpFormError['phone'].value,
      email: this.signUpFormError['email'].value,
      password: this.signUpFormError['password'].value,
    }

    console.log('inside-signup: ', user);

    this.authService.signup(user).subscribe((res: any) => {
      this.ngxService.stop();
      this.responseMessage = res?.message;
      this.notificationService.showSuccess("Sign up successfully", 'SUCCESS');
      this.router.navigate(['/login']);
    }, (error) => {
      this.ngxService.stop();
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = this.notificationService.showError("Something went wrong", "BAD REQUEST");
      }
      this.notificationService.showError(this.responseMessage, "ERROR");
    })
  }


  // errors
  get signUpFormError() {
    return this.signUpForm.controls;
  }

}
