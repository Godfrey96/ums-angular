import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-of-users',
  templateUrl: './list-of-users.component.html',
  styleUrls: ['./list-of-users.component.css']
})
export class ListOfUsersComponent implements OnInit {

  allUsersAndAdmins: any[] = [];
  role: any;

  constructor(
    private UserService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this._getAllUsersAndAdmins();

    let token = localStorage.getItem('token');
    let decodedJWT = JSON.parse(window.atob(token!.split('.')[1]));

    this.role = decodedJWT.role;
    console.log('role role: ', this.role);

    console.log('name: ' + decodedJWT.username);
    console.log('role: ' + decodedJWT.role);
  }

  private _getAllUsersAndAdmins() {
    this.UserService.getAllUsersAndAdmins().subscribe((res: any) => {
      this.allUsersAndAdmins = res;
      console.log('users: ', this.allUsersAndAdmins)
    })
  }

}
