import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsersService } from '../services/users/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {

  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (this.usersService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/']);
    }
  }
}
