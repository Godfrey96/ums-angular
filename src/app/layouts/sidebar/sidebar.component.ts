import { Component } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  user!: Partial<User> | undefined;
  userRole!: string;

  constructor(public authService: AuthService) { }


  ngOnInit(): void {
    this._getCurrentUser();
    this._getUserRole();
    console.log('inside role-: ', this.authService.getUserRole())
  }

  _getCurrentUser() {
    this.authService.currentUser$.subscribe(x => this.user = x.user);
  }

  _getUserRole() {
    this.authService.getUserRole();
  }

}
