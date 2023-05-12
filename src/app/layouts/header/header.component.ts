import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmDialogService } from 'src/app/services/confirm-dialog.service';
import { NotificationService } from 'src/app/services/notification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user!: Partial<User> | undefined;
  currentLoggedInUser!: User;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthService,
    private ngxService: NgxUiLoaderService,
    private confirmDialogService: ConfirmDialogService,
    private notificationService: NotificationService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this._getCurrentUser();
    this.currentLoggedInUser = this.authService.getUser().user;
  }

  _getCurrentUser() {
    this.authService.currentUser$.subscribe(x => this.user = x.user);
  }

  sidebarToggle() {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }

  logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to logout.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes.',
      cancelButtonText: 'No',
    }).then((result) => {
      this.ngxService.start();
      if (result.value) {
        Swal.fire('Logout!', 'You are logout successfully.', 'success');
        this.authService.logout();
        this.ngxService.stop();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.ngxService.stop();
        Swal.fire('Cancelled', 'You are not logout.)', 'error');
      }
    });
  }
}

