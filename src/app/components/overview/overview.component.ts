import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  currentLoggedInUser!: User;

  constructor(
    private userService: UserService,
    ) { }

  ngOnInit(): void {
    this.userService.getSingleUser().subscribe((user)=>{
      this.currentLoggedInUser = user
    })
  }


}
