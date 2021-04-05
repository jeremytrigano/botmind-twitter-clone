import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService, User } from '../api.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  currentUser: User;
  isAuth = false;
  isSigningUp = false;
  isLoggingIn = false;
  errMessage = '';
  isDropdownMenuActive = false;

  constructor(private apiService: ApiService) {
    this.apiService.currentUser.subscribe((x) => {
      this.currentUser = x;
      this.currentUser.username ? (this.isAuth = true) : (this.isAuth = false);
    });
  }

  ngOnInit(): void {}

  signingUp(): void {
    this.isSigningUp = true;
  }

  onSignUp(form: NgForm): void {
    const credentials = form.value;
    // tslint:disable-next-line: deprecation
    this.apiService.postSignUp(credentials).subscribe(
      (response: any) => {
        if (response) {
          this.isAuth = true;
          form.resetForm();
          this.isSigningUp = false;
        }
      },
      (error) => {
        if (error.status === 409 && error.statusText === 'Conflict') {
          this.errMessage = 'Username already taken';
        }
      }
    );
  }

  loggingIn(): void {
    this.isLoggingIn = true;
  }

  onLoggingIn(form: NgForm): void {
    const credentials = form.value;
    // tslint:disable-next-line: deprecation
    this.apiService.postLogIn(credentials).subscribe(
      (response: any) => {
        if (response) {
          this.isAuth = true;
          form.resetForm();
          this.isLoggingIn = false;
        }
      },
      (error: any) => {
        this.errMessage = 'Wrong username and/or password';
      }
    );
  }

  onLogOut(): void {
    this.apiService.logout();
  }

  dropdownMenu(): void {
    this.isDropdownMenuActive = !this.isDropdownMenuActive;
  }

  onCloseModal(): void {
    this.errMessage = '';
  }
}
