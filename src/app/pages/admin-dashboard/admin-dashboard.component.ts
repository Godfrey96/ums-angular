import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject } from 'rxjs';
import { JwtResponse } from 'src/app/model/jwt-response';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  totalAdmins: number = 0;
  totalUsers: number = 0;
  totalActive: number = 0;
  totalDisable: number = 0;

  constructor(
    private userService: UserService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {

    // fetching total number of admins
    this._fetchingTotalAdmins();

    // fetching total number of users
    this._fetchingTotalUsers();
    // fetching total number of active
    this._fetchingTotalActive();

    // fetching total number of disable
    this._fetchingTotalDisable();


  }

  _fetchingTotalAdmins() {
    this.userService.getTotalAdmins().subscribe({
      next: (res: any) => {
        this.totalAdmins = res;
      },
      error: () => {
        this.notificationService.showError("Failed to fetch total number of admins", "ERROR")
      }
    });
  }

  _fetchingTotalUsers() {
    this.userService.getTotalUsers().subscribe({
      next: (res: any) => {
        this.totalUsers = res;
      },
      error: () => {
        this.notificationService.showError("Failed to fetch total number of users", "ERROR")
      }
    });
  }

  _fetchingTotalActive() {
    this.userService.getTotalActive().subscribe({
      next: (res: any) => {
        this.totalActive = res;
      },
      error: () => {
        this.notificationService.showError("Failed to fetch total number of active users/admins", "ERROR")
      }
    });
  }

  _fetchingTotalDisable() {
    this.userService.getTotalDisable().subscribe({
      next: (res: any) => {
        this.totalDisable = res;
      },
      error: () => {
        this.notificationService.showError("Failed to fetch total number of deactive users/admins", "ERROR")
      }
    });
  }

}
