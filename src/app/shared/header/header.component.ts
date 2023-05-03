import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private confirmDialogService: ConfirmDialogService,
    private ngxService: NgxUiLoaderService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
  }

  changePassword() {
    this.router.navigate(['/change-password']);
  }

  logout() {
    this.confirmDialogService.confirm('Logout?', 'Are you sure you want want to logout?').then((confirmed: any) => {
      this.ngxService.start();
      this.authService.logout();
      this.notificationService.showSuccess("Successfully logged out", "SUCCESS");
      this.ngxService.stop();
    }).catch(() => {
      this.ngxService.stop();
      // this.notificationService.showError("Could not log out", "FAILURE");
    });
  }

}
