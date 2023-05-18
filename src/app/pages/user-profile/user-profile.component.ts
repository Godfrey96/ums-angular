import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  currentLoggedInUser!: User;

  constructor(private userService: UserService){}

  ngOnInit(){
    this.userService.getSingleUser().subscribe((user)=>{
      this.currentLoggedInUser = user
      console.log('kkk: ', this.currentLoggedInUser)
    })
  }

}
