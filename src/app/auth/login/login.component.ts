import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isSubmitted = false;
  responseMessage: any;
  role: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private ngxService: NgxUiLoaderService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this._initLoginForm();
  }

  private _initLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  onSubmit() {
    this.ngxService.start();
    this.isSubmitted = true;

    const data: any = {
      email: this.loginFormError['email'].value,
      password: this.loginFormError['password'].value,
    }

    if(data != null){
      console.log("valied")
    } else {
      console.log("not valied")
    }

    this.authService.login(data).subscribe((res: any) => {
      this.ngxService.stop();
      this.responseMessage = res?.message;
      this.notificationService.showSuccess("Successfully logged in", 'SUCCESS');

      if (this.authService.userValue && this.authService.getUserRole() === 'ADMIN') {
        this.router.navigate(['/admin-dashboard'])
      } else if (this.authService.userValue && this.authService.getUserRole() === 'USER') {
        this.router.navigate(['/user-dashboard'])
      } else {
        this.router.navigate(['/login'])
      }

    }, (error) => {
      this.ngxService.stop();
      if (error.status === 401) {
        this.responseMessage = this.notificationService.showError("You don't have permission to access this page", "UNAUTHORIZED");
      } else if(error.status === 403) {
        this.responseMessage = this.notificationService.showError("Your Account is Disabled. Wait for an Admin to activate", "FORBIDDEN");
      } else if(error.status === 500) {
        this.responseMessage = this.notificationService.showError("Something went wrong", "INTERNAL SERVER");
      }
    })
  }


  // errors
  get loginFormError() {
    return this.loginForm.controls;
  }



}
