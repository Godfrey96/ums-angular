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
  }

  private _getAllUsersAndAdmins() {
    this.UserService.getAllUsersAndAdmins().subscribe((res: any) => {
      this.allUsersAndAdmins = res;
      console.log('users: ', this.allUsersAndAdmins)
    })
  }

}
