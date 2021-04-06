import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, User } from '../core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  public currentUser: User;
  public isAuth = false;
  public isSigningUp = false;
  public isLoggingIn = false;
  public errMessage = '';
  public isDropdownMenuActive = false;
  public isBurgerMenuOpen = false;

  constructor(private authService: AuthService) {
    // tslint:disable-next-line: deprecation
    this.authService.currentUser.subscribe((x) => {
      this.currentUser = x;
      this.currentUser.username ? (this.isAuth = true) : (this.isAuth = false);
    });
  }

  ngOnInit(): void {
    document.addEventListener('DOMContentLoaded', () => {
      const $navbarBurgers = Array.prototype.slice.call(
        document.querySelectorAll('.navbar-burger'),
        0
      );

      if ($navbarBurgers.length > 0) {
        $navbarBurgers.forEach((el) => {
          el.addEventListener('click', () => {
            const target = el.dataset.target;
            const $target = document.getElementById(target);

            el.classList.toggle('is-active');
            $target?.classList.toggle('is-active');
            this.isBurgerMenuOpen = !this.isBurgerMenuOpen;
            if (!this.isBurgerMenuOpen) {
              this.isSigningUp = false;
              this.isLoggingIn = false;
            }
          });
        });
      }
    });
  }

  public signingUp(): void {
    this.isSigningUp = true;
  }

  public onSignUp(form: NgForm): void {
    const credentials = form.value;
    // tslint:disable-next-line: deprecation
    this.authService.postSignUp(credentials).subscribe(
      (response: any) => {
        if (response) {
          this.isAuth = true;
          form.resetForm();
          this.isSigningUp = false;
        }
      },
      (error: any) => {
        if (error.status === 409 && error.statusText === 'Conflict') {
          this.errMessage = 'Username already taken';
        } else {
          this.errMessage =
            'Username must contain only alphanumeric characters or _\n \
          Username must be between 2 and 30 characters\n \
          Password must be at least 10 characters long';
        }
      }
    );
  }

  public loggingIn(): void {
    this.isLoggingIn = true;
  }

  public onLoggingIn(form: NgForm): void {
    const credentials = form.value;
    // tslint:disable-next-line: deprecation
    this.authService.postLogIn(credentials).subscribe(
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

  public onDeleteUser(): void {
    this.authService.getUserId(this.currentUser.username).subscribe(
      (response: any) => {
        if (response) {
          this.authService.deleteUser(response.id).subscribe(
            // tslint:disable-next-line: no-shadowed-variable
            (response: any) => {
              if (response) {
                this.onLogOut();
              }
            },
            (error: any) => {
              this.errMessage = 'Error occurs when deleting account';
            }
          );
        }
      },
      (error: any) => {
        this.errMessage = 'User not found';
      }
    );
  }

  public onLogOut(): void {
    this.authService.logout();
    this.isSigningUp = false;
    this.isLoggingIn = false;
  }

  public dropdownMenu(): void {
    this.isDropdownMenuActive = !this.isDropdownMenuActive;
  }

  public onCloseModal(): void {
    this.errMessage = '';
  }
}
