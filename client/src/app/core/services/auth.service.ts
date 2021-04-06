import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Credentials, User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private AUTH_URL = 'http://localhost:3000/auth';
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private readonly http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public postSignUp(data: Credentials): any {
    return this.post('signup', data);
  }

  public postLogIn(data: Credentials): any {
    return this.post('login', data);
  }

  private post(type: string, data: Credentials): any {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(data);

    return this.http.post(`${this.AUTH_URL}/${type}`, body, { headers }).pipe(
      map((user) => this.storeUserAndRefreshUserSubject(user)),
      catchError((err) => throwError(err))
    );
  }

  public deleteUser(id: string): any {
    return this.http.delete(`${this.AUTH_URL}/delete/${id}`).pipe(
      map((res: any) => {
        return res;
      }),
      catchError((err) => throwError(err))
    );
  }

  public getUserId(username: string): any {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify({ username });

    return this.http.post(`${this.AUTH_URL}/userid`, body, { headers }).pipe(
      map((id) => id),
      catchError((err) => throwError(err))
    );
  }

  private storeUserAndRefreshUserSubject(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user as any);
  }

  public logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next({ username: '' });
  }
}
