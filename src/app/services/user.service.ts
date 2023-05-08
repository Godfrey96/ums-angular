import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.apiUrl + "/users";

  constructor(
    private http: HttpClient
  ) { }

  getAllUsersAndAdmins() {
    return this.http.get(this.apiUrl + "/get-all");
  }

  getAllUsers() {
    return this.http.get(this.apiUrl + "/get");
  }
}
