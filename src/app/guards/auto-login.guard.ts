import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  async canLoad(
    route: Route,
    segments: UrlSegment[]): Promise<boolean> {
    try {
      const user = await this.authService.userValue;
      console.log('inside-canload', user);
      if (user) {
        this.router.navigateByUrl('/', { replaceUrl: true })
        return false;
      } else {
        return true;
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
