import { Injectable } from '@angular/core';
import { IUser } from './IUser';
import { AppSetting } from 'src/app/constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url = `${AppSetting.API_ENDPOINT}/users`;

  constructor(private httpClient: HttpClient) { }

  login = (user: IUser) => {
    return this.httpClient.post(`${this.url}/login`, user);
  }

  loggedIn() {
    return !!localStorage.getItem('token'); // Get boolean value
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
