import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService, AuthService, Beep, User } from '../core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  public beeps: Beep[] = [];
  public currentUser: User;
  public isAuth = false;
  public isLoading = false;
  public partsOfBeeps: Beep[] = [];

  private slicerPosition = 10;
  private sub: Subscription = new Subscription();

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {
    // tslint:disable-next-line: deprecation
    this.authService.currentUser.subscribe((x) => {
      this.currentUser = x;
      this.currentUser.username ? (this.isAuth = true) : (this.isAuth = false);
    });
  }

  ngOnInit(): void {
    this.getBeeps();

    this.sub.add(
      this.apiService.beeps$
        .pipe(
          tap((beeps) => {
            beeps.reverse();
            this.beeps = beeps;
            this.partsOfBeeps = beeps.slice(0, this.slicerPosition);
          })
        )
        // tslint:disable-next-line: deprecation
        .subscribe()
    );
  }

  public onSubmit(form: NgForm): void {
    this.isLoading = true;
    const beep = form.value;
    beep.username = this.currentUser.username;
    // tslint:disable-next-line: deprecation
    this.sub.add(this.apiService.postBeep(beep).subscribe());
    form.resetForm();
    this.isLoading = false;
  }

  private getBeeps(): void {
    // tslint:disable-next-line: deprecation
    this.sub.add(this.apiService.getBeeps().subscribe());
  }

  public onScroll(): void {
    this.slicerPosition += 10;
    // tslint:disable-next-line: deprecation
    this.getBeeps();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
