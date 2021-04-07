import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Beep } from '../models';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // private API_URL = 'http://localhost:3000/beeps';
  private API_URL = environment.API_URL;
  public beeps$: BehaviorSubject<Beep[]> = new BehaviorSubject<Beep[]>([]);

  constructor(private readonly http: HttpClient) {}

  public getBeeps(): Observable<Beep[]> {
    return this.http.get<Beep[]>(this.API_URL).pipe(
      tap((beeps) => this.beeps$.next(beeps)),
      catchError(this.handleError<Beep[]>('getBeeps', []))
    );
  }

  public postBeep(data: Beep): any {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'content-type': 'application/json',
    };
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

  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any) => {
      return of(result as T);
    };
  }
}
