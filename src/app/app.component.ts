import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private elementRef: ElementRef,
    private authService: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.loadScript();
    this.checkToken();
  }

  loadScript() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
  }

  checkToken() {
    this.authService.checkToken().subscribe((res: any) => {
      this.router.navigate(['/dashboard']);
    }, (error: any) => {
      console.log(error);
    })
  }

}
