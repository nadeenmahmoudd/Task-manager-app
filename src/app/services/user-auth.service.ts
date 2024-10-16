import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private usersUrl = 'assets/users.json';

  constructor( private _httpClient:HttpClient) { }

  getUsers(): Observable<any> {
    return this._httpClient.get(this.usersUrl);
  }
}
