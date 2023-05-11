import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.apiUrl + "/users";

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getAllUsersAndAdmins() {
    return this.http.get(this.apiUrl + "/get-all");
  }

  getAllUsers() {
    return this.http.get(this.apiUrl + "/get");
  }

  public roleMatch(allowedRoles: string): any {
    let isMatch = false;
    const userRoles: any = this.authService.getUserRole();
    console.log('userRoles: ', userRoles)

    if (userRoles === 'ADMIN' || userRoles === 'USER') {
      isMatch = true;
      return true;
    } {
      return false;
    }

    // if (userRoles != null && userRoles) {
    //   for (let i = 0; i < userRoles.length; i++) {
    //     for (let j = 0; j < allowedRoles.length; j++) {
    //       if (userRoles[i].role === allowedRoles) {
    //         isMatch = true;
    //         return isMatch;
    //       } else {
    //         return isMatch;
    //       }
    //     }
    //   }
    // }

  }
}
