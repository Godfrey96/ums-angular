import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.apiUrl + "/user";

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getAllUsersAndAdmins() {
    return this.http.get(this.apiUrl + "/get-all-users");
  }

  getAllUsers() {
    return this.http.get(this.apiUrl + "/get-users-only");
  }

  getCurrentUser() {
    return this.http.get(this.apiUrl + "/get-user");
  }

  updateUserStatus(status: string) {
    return this.http.put(this.apiUrl + "/update-status", status);
  }

  updateUser(user: User) {
    return this.http.post(this.apiUrl + "/update-user", user);
  }

  deleteUser(userId: number) {
    return this.http.delete(this.apiUrl + "/delete/" + userId);
  }

  changePassword(data: any): Observable<string> {
    return this.http.post<string>(this.apiUrl + "/change-password", data);
  }

  public roleMatch(allowedRoles: string): any {
    let isMatch = false;
    const userRoles: any = this.authService.getUserRole();
    // console.log('userRoles: ', userRoles)

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
