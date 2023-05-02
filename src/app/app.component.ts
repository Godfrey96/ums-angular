import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.checkToken();
  }

  checkToken() {
    this.authService.checkToken().subscribe((res: any) => {
      this.router.navigate(['/dashboard']);
    }, (error: any) => {
      console.log(error);
    })
  }

}
