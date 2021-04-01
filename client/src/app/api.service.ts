import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface Beep {
  username: string;
  content: string;
  created: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private API_URL = 'http://localhost:3000/beeps';
  public beeps$: BehaviorSubject<Beep[]> = new BehaviorSubject<Beep[]>([]);

  constructor(private readonly http: HttpClient) {}

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

    console.log(body);
    return this.http.post(this.API_URL, body, { headers }).pipe(
      tap((beep) => {
        const localBeeps = this.beeps$.getValue();
        localBeeps.unshift(beep as Beep);
        localBeeps.reverse();
        this.beeps$.next(localBeeps);
      }),
      catchError(this.handleError<Beep[]>('getBeeps', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any) => {
      console.error(error);
      return of(result as T);
    };
  }
}
