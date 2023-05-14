import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm!: FormGroup;
  isSubmitted = false;
  responseMessage: any;

  constructor(
    private fb: FormBuilder,
    // private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this._initChangePasswordForm();
  }

  private _initChangePasswordForm() {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }

  validatePassword() {
    if (this.changePasswordFormError['newPassword'].value != this.changePasswordFormError['confirmPassword'].value)
      return true;
    else
      return false;

  }



  onSubmit() {
    this.ngxService.start();
    this.isSubmitted = true;

    const data: any = {
      oldPassword: this.changePasswordFormError['oldPassword'].value,
      newPassword: this.changePasswordFormError['newPassword'].value,
      confirmPassword: this.changePasswordFormError['confirmPassword'].value,
    }

    console.log("data-password: ", data);

    this.userService.changePassword(data).subscribe((res: any) => {
      console.log("data-user: ", res)
      this.ngxService.stop();
      this.responseMessage = res?.message;
      this.notificationService.showSuccess("Password changed successfully", 'SUCCESS');
    }, (error) => {
      this.ngxService.stop();
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        console.log("data-error: ", error)
        this.responseMessage = this.notificationService.showError("Something went wrong", "BAD REQUEST");
      }
      console.log("ERROR: ", error)
      this.notificationService.showError("Failed to change password", "ERROR");
    })
  }

  // errors
  get changePasswordFormError() {
    return this.changePasswordForm.controls;
  }

}
