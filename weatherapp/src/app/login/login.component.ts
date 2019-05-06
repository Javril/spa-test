import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UsersService } from '../services/users/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoginSuccess = false;
  errorMessage = '';
  isLoginFail = false;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) { }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.usersService.login(this.loginForm.value)
      .subscribe(
        (res: any) => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/weather']);
        },
        err => {
          this.isLoginFail = true;
          this.errorMessage = err.error.error[0].detail;
          setTimeout(() => this.isLoginFail = false, 2500);
        }
      );
  }

}
