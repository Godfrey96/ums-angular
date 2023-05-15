import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable, tap } from 'rxjs';
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

  user$!: Observable<User>;
  editForm!: FormGroup;
  isSubmitted = false;
  responseMessage!: any;
  currentLoggedInUser!: User;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private fb: FormBuilder,
    private ngxService: NgxUiLoaderService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.currentLoggedInUser = this.authService.getUser().user;

    this._editForm();
  }

  _editForm() {
    this.editForm = this.fb.group({
      myUsername: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    })

   this._populateCurrentUserEditForm();
  }

  _populateCurrentUserEditForm() {
    this.userService.getCurrentUser().subscribe((res: User)=> {
      this.editFormError['myUsername'].setValue(res.myUsername)
      this.editFormError['phone'].setValue(res.phone)
      this.editFormError['email'].setValue(res.email)
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
      console.log('res-: ', res.data)
      this.ngxService.stop();
      this.responseMessage = res?.message;
      this.notificationService.showSuccess(this.responseMessage, 'SUCCESS');
    }, (error) => {
      this.ngxService.stop();
      if (error.status === 200) {
        this.notificationService.showSuccess("User updated successfully", 'SUCCESS');
        return;
      }
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
