import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

export interface Beep {
  username: string;
  content: string;
  created: string;
}
export interface Credentials {
  username: string;
  password: string;
}
export interface User {
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private API_URL = 'http://localhost:3000/beeps';
  private AUTH_URL = 'http://localhost:3000/auth';
  public beeps$: BehaviorSubject<Beep[]> = new BehaviorSubject<Beep[]>([]);

  constructor(private readonly http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public getBeeps(): Observable<Beep[]> {
    return this.http.get<Beep[]>(this.API_URL).pipe(
      tap((beeps) => this.beeps$.next(beeps)),
      catchError(this.handleError<Beep[]>('getBeeps', []))
    );
  }

  // tslint:disable-next-line: typedef
  public postBeep(data: Beep) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(data);

    return this.http.post(this.API_URL, body, { headers }).pipe(
      tap((beep) => {
        const localBeeps = this.beeps$.getValue();
        localBeeps.unshift((beep as unknown) as Beep);
        localBeeps.reverse();
        this.beeps$.next(localBeeps);
      }),
      catchError(this.handleError<Beep[]>('postBeep', []))
    );
  }

  // tslint:disable-next-line: typedef
  public postSignUp(data: Credentials) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(data);

    return this.http.post(`${this.AUTH_URL}/signup`, body, { headers }).pipe(
      map((user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user as any);
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  // tslint:disable-next-line: typedef
  public postLogIn(data: Credentials): any {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(data);

    return this.http.post(`${this.AUTH_URL}/login`, body, { headers }).pipe(
      map((user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user as any);
      }),
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next({ username: '' });
  }

  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any) => {
      return of(result as T);
    };
  }
}
