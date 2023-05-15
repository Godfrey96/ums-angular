import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
export class AllUsersComponent  implements OnInit, OnDestroy {

  allUsers!: User[];
  responseMessage!: any;
  user!: Partial<JwtResponse>;
  endsub$: Subject<any> = new Subject();
  deleteUser!: any;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private ngxService: NgxUiLoaderService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.userValue
    this.user = this.authService.userValue
    this._getAllUsersOnly();
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
    }).then((result)=>{
      this.ngxService.start();
      if(result.value){
        Swal.fire('Delete!', 'User deleted successfully.', 'success');
        this.userService.deleteUser(userId).subscribe((res) => {
          console.log('res-deleted', res)
          this.ngxService.stop();
          this._getAllUsersOnly();
          // this.router.navigate(['/all-users'])
        })
        this.ngxService.stop();
      } else if(result.dismiss === Swal.DismissReason.cancel) {
        this.ngxService.stop();
        Swal.fire('Cancelled', 'User not deleted.', 'error');
      }
    })
  }

  ngOnDestroy() {
    this.endsub$.next(1);
    this.endsub$.complete()
  }

  // logout() {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: 'You are about to logout.',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes.',
  //     cancelButtonText: 'No',
  //   }).then((result) => {
  //     this.ngxService.start();
  //     if (result.value) {
  //       Swal.fire('Logout!', 'You are logout successfully.', 'success');
  //       this.authService.logout();
  //       this.ngxService.stop();
  //     } else if (result.dismiss === Swal.DismissReason.cancel) {
  //       this.ngxService.stop();
  //       Swal.fire('Cancelled', 'You are not logout.)', 'error');
  //     }
  //   });
  // }


}
