import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { User } from './model/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  user!: User;

  constructor(
    private elementRef: ElementRef,
    private authService: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.loadScript();
    this.checkToken();
    this._getCurrentUser();
    console.log('inside app-: ', this.user)
    console.log('inside role-: ', this.authService.getUserRole())
  }

  loadScript() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
  }

  _getCurrentUser() {
    this.authService.currentUser$.subscribe(x => this.user = x);
  }


  checkToken() {
    this.authService.checkToken().subscribe((res: any) => {
      console.log('res: ', res);
      this.router.navigate(['/dashboard']);
    }, (error: any) => {
      console.log(error);
    })
  }

}
