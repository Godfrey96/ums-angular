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

  user!: Partial<User> | undefined;

  constructor(
    private elementRef: ElementRef,
    private authService: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.loadScript();
    this._getCurrentUser();

    if (this.authService.getUserRole() === 'ADMIN') {
      this.router.navigate(['/admin-dashboard'])
    } else if (this.authService.getUserRole() === 'USER') {
      this.router.navigate(['/user-dashboard'])
    } else {
      this.router.navigate(['/login'])
    }
  }

  loadScript() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
  }

  _getCurrentUser() {
    this.authService.currentUser$.subscribe(x => this.user = x.user);
  }

}
