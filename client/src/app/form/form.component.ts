import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from '../api.service';

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
export class FormComponent implements OnInit {
  // tslint:disable-next-line: no-inferrable-types
  public isLoading: boolean = false;

  private sub: Subscription = new Subscription();
  beeps: Beep[] = [];

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.getBeeps();

    this.sub.add(
      this.apiService.beeps$
        .pipe(
          tap((beeps) => {
            beeps.reverse();
            this.beeps = beeps;
          })
        )
        // tslint:disable-next-line: deprecation
        .subscribe()
    );
  }

  // tslint:disable-next-line: typedef
  public onSubmit(form: NgForm): void {
    this.isLoading = true;
    const beep = form.value;
    // tslint:disable-next-line: deprecation
    this.sub.add(this.apiService.postBeep(beep).subscribe());
    form.resetForm();
    this.isLoading = false;
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private getBeeps(): void {
    // tslint:disable-next-line: deprecation
    this.sub.add(this.apiService.getBeeps().subscribe());
  }
}
