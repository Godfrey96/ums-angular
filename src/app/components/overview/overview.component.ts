import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  currentLoggedInUser!: User;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.currentLoggedInUser = this.authService.getUser().user;
  }


}
