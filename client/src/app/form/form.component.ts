import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService, User } from '../api.service';

const API_URL = 'http://localhost:3000/beeps';

export interface Beep {
  username: string;
  content: string;
  created: string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  currentUser: User;
  isAuth = false;
  // tslint:disable-next-line: no-inferrable-types
  public isLoading: boolean = false;

  private sub: Subscription = new Subscription();
  beeps: Beep[] = [];
  partsOfBeeps: Beep[] = [];
  slicerPosition = 10;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.apiService.currentUser.subscribe((x) => {
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

  onScroll(): void {
    this.slicerPosition += 10;
    // tslint:disable-next-line: deprecation
    this.getBeeps();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
