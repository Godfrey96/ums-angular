import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-dash',
  templateUrl: './user-dash.component.html',
  styleUrls: ['./user-dash.component.css']
})
export class UserDashComponent implements OnInit {

  allUsers: any[] = [];
  role: any;

  constructor(
    private UserService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // this._getAllUsers();

    // let token = localStorage.getItem('token');
    // let decodedJWT = JSON.parse(window.atob(token!.split('.')[1]));

    // this.role = decodedJWT.role;
    // console.log('role role: ', this.role);

    // console.log('name: ' + decodedJWT.username);
    // console.log('role: ' + decodedJWT.role);
  }

  private _getAllUsers() {
    this.UserService.getAllUsers().subscribe((res: any) => {
      this.allUsers = res;
      console.log('users: ', this.allUsers)
    })
  }

}
