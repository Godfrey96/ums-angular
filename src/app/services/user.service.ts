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
  public userId!: any;

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

  getSingleUser() {
    return this.http.get(this.apiUrl + "/get-user");
  }

  getUserById(userId: number) {
    return this.http.get(this.apiUrl + "/get/" + userId);
  }

  updateUserStatus(status: string) {
    return this.http.put(this.apiUrl + "/update-status", status);
  }

  updateUser(user: User) {
    return this.http.put(this.apiUrl + "/update-user", user);
  }

  updateUserByAdmin(user: User) {
    return this.http.put(this.apiUrl + "/update-user-details", user);
  }

  // updateUserByAdmin(userId: number, user: User) {
  //   return this.http.put(this.apiUrl + "/updateUser/" + userId, user);
  // }

  deleteUser(userId: number) {
    return this.http.delete(this.apiUrl + "/delete/" + userId);
  }

  changePassword(data: any): Observable<string> {
    return this.http.post<string>(this.apiUrl + "/change-password", data);
  }

  uploadImage(data: any) {
    return this.http.post(this.apiUrl + "/pfp", data);
  }

  getTotalAdmins() {
    return this.http.get(this.apiUrl + "/total-admins");
  }

  getTotalUsers() {
    return this.http.get(this.apiUrl + "/total-users");
  }

  getTotalActive() {
    return this.http.get(this.apiUrl + "/total-active");
  }

  getTotalDisable() {
    return this.http.get(this.apiUrl + "/total-disable");
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

  }
}
