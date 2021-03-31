import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

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
  isLoading = false;
  beeps: Beep[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.listAllBeeps();
  }

  // tslint:disable-next-line: typedef
  onSubmit(form: NgForm) {
    this.isLoading = true;
    const beep = form.value;

    fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(beep),
      headers: { 'content-type': 'application/json' },
    })
      .then((response) => {
        response.json();
      })
      .then((createdBeep) => {});
    this.isLoading = false;
  }

  // tslint:disable-next-line: typedef
  listAllBeeps() {
    fetch(API_URL)
      .then((response) => response.json())
      .then((beepsres) => {
        beepsres.forEach((beep: Beep) => {
          this.beeps.push({
            username: beep.username,
            content: beep.content,
            created: beep.created,
          });
        });
      });
  }
}
