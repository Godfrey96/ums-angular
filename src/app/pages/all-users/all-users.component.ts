import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject } from 'rxjs';
import { JwtResponse } from 'src/app/model/jwt-response';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit, OnDestroy {

  allUsers!: User[];
  responseMessage!: any;
  user!: Partial<JwtResponse>;
  endsub$: Subject<any> = new Subject();
  deleteUser!: any;
  isChecked!: boolean;
  updateForm!: FormGroup;
  isSubmitted = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private ngxService: NgxUiLoaderService,
    private notificationService: NotificationService,
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.authService.userValue
    this.user = this.authService.userValue
    this._initUpdateForm();
    this._getAllUsersOnly();
  }

  _initUpdateForm() {
    this.updateForm = this.fb.group({
      myUsername: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    })
  }


  private _getAllUsersOnly() {
    this.ngxService.start();
    this.userService.getAllUsersAndAdmins().subscribe((res: any) => {
      this.ngxService.stop();
      this.allUsers = res;
      console.log('user-admin all: ', this.allUsers)
    }, (error) => {
      this.ngxService.stop();
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = this.notificationService.showError("Something went wrong", "BAD REQUEST");
      }
      this.notificationService.showError("Failed to fetch users", "ERROR");
    })
  }

  openUpdateUserModal(userId: number) {
    this.userService.getUserById(userId).subscribe((user: User) => {
      this.updateFormError['myUsername'].setValue(user.myUsername);
      this.updateFormError['phone'].setValue(user.phone);
      this.updateFormError['email'].setValue(user.email);
    })
  }

  onSubmitUpdateUser() {
    this.ngxService.start();
    this.isSubmitted = true;

    const user: User = {
      myUsername: this.updateFormError['myUsername'].value,
      phone: this.updateFormError['phone'].value,
      email: this.updateFormError['email'].value,
    }

    console.log('data-user: ', user)

    this.userService.updateUser(user).subscribe((res: User) => {
      this.ngxService.stop();
      this.notificationService.showSuccess('User updated successfully', 'SUCCESS')
    }, (error) => {
      this.ngxService.stop();
      if (error.status === 200) {
        this.notificationService.showSuccess('User updated successfully', 'SUCCESS');
        return;
      } else {
        this.ngxService.stop();
        this.notificationService.showSuccess("Failed to update user", 'SUCCESS');
      }
    })
  }

  onDeleteUser(userId: number) {
    console.log('delete-user-id: ', userId)
    Swal.fire({
      title: 'Are you sure?',
      text: "You are about to delete this user!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes.',
      cancelButtonText: 'No',
      confirmButtonColor: '#3085d6',
    }).then((result) => {
      this.ngxService.start();
      if (result.value) {
        Swal.fire('Delete!', 'User deleted successfully.', 'success');
        this.userService.deleteUser(userId).subscribe({
          next: () => {
            this.ngxService.stop();
            this._getAllUsersOnly();
          },
          error: (error) => {
            this.ngxService.stop();
            if (error.status === 200) {
              this.notificationService.showSuccess("User updated successfully", 'SUCCESS');
              this._getAllUsersOnly();
              return;
            }
            // Swal.fire('Cancelled', 'Error while deleting user.', 'error');
          }
        })
        this.ngxService.stop();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.ngxService.stop();
        Swal.fire('Cancelled', 'User not deleted.', 'error');
      }
    })
  }


  onUpdateUserStatus(event: any, id: any) {

    var data: any = {
      status: (event.target.checked).toString(),
      id: id
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "You are about to update the status of this user!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes.',
      cancelButtonText: 'No',
      confirmButtonColor: '#3085d6',
    }).then((result) => {
      this.ngxService.start();
      if (result.value) {
        Swal.fire('Disable!', 'User status updated successfully.', 'success');
        this.userService.updateUserStatus(data).subscribe({
          next: () => {
            this.ngxService.stop();
          }, error: (error) => {
            this.ngxService.stop();
            if (error.status === 200) {
              this.notificationService.showSuccess("User disabled successfully", 'SUCCESS');
              this._getAllUsersOnly();
              return;
            }
          }
        })
        this.ngxService.stop();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.ngxService.stop();
        Swal.fire('Cancelled', 'User status not updated.', 'error');
      }
    })
  }

  ngOnDestroy() {
    this.endsub$.next(1);
    this.endsub$.complete()
  }

  // errors
  get updateFormError() {
    return this.updateForm.controls;
  }

}
