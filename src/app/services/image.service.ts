import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  apiUrl = environment.apiUrl + "/images/";

  constructor(private http: HttpClient) { }

  getImage(filename: any) {
    return this.http.get(this.apiUrl + filename);
  }

}
