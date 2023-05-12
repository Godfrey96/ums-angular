import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject } from 'rxjs';
import { JwtResponse } from 'src/app/model/jwt-response';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit, OnDestroy {

  allUsers!: User[];
  responseMessage!: any;
  user!: Partial<JwtResponse>;
  endsub$: Subject<any> = new Subject();

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private ngxService: NgxUiLoaderService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.authService.userValue
    this.user = this.authService.userValue
    this._getAllUsersOnly();
  }


  private _getAllUsersOnly() {
    this.ngxService.start();
    this.userService.getAllUsers().subscribe((res: any) => {
      this.ngxService.stop();
      this.allUsers = res;
      console.log('user all: ', this.allUsers)
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

  ngOnDestroy() {
    this.endsub$.next(1);
    this.endsub$.complete()
  }

}
