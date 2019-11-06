import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Extrato } from '../model/extrato.model';

@Injectable({
  providedIn: 'root'
})
export class ExtratoService {

  constructor(private httpClient: HttpClient) {
    this.loadActualExtract();
  }

  listActualExtract: Array<Extrato>;
  listFutureExtract: Array<Extrato>;

  private getUrl(): string {
    return environment.REQUEST_URL + 'extrato';
  }

  saveExtract(extrato: Extrato) {
    this.httpClient.post<Extrato>(this.getUrl(), extrato).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  loadActualExtract() {
    this.httpClient.get<Array<Extrato>>(this.getUrl()).pipe(
      retry(3),
      catchError(this.handleError)
    ).subscribe(
      (data: Array<Extrato>) => {
        let actualDate = new Date();
        this.listActualExtract = data.filter(extract => new Date(extract.date) <= actualDate);
      }
    );
  }

  loadFutureExtract() {
    this.httpClient.get<Array<Extrato>>(this.getUrl()).pipe(
      retry(3),
      catchError(this.handleError)
    ).subscribe(
      (data: Array<Extrato>) => {
        let actualDate = new Date();
        this.listFutureExtract = data.filter(extract => new Date(extract.date) >= actualDate);
      }
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
