import { Component } from '@angular/core';
import { ApiService, User } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentUser: User;

  constructor(private apiService: ApiService) {
    this.apiService.currentUser.subscribe((x) => (this.currentUser = x));
  }
}
