import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  editForm!: FormGroup;
  isSubmitted = false;
  responseMessage!: any;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private fb: FormBuilder,
    private ngxService: NgxUiLoaderService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this._editForm();
  }

  _editForm() {
    this.editForm = this.fb.group({
      myUsername: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    })
  }

  onSubmit() {
    this.ngxService.start();
    this.isSubmitted = true;

    const user: User = {
      myUsername: this.editFormError['myUsername'].value,
      phone: this.editFormError['phone'].value,
      email: this.editFormError['email'].value,
    }

    this.userService.updateUser(user).subscribe((res: any) => {
      this.ngxService.stop();
      this.responseMessage = res?.message;
      this.notificationService.showSuccess(this.responseMessage, 'SUCCESS');
    }, (error) => {
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = this.notificationService.showError("Something went wrong", "BAD REQUEST");
      }
      this.notificationService.showError(this.responseMessage, "ERROR");
    })

  }

  // errors
  get editFormError() {
    return this.editForm.controls;
  }

}
