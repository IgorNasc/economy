import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Operation } from '../model/operations.model';
import { Gastos } from '../model/gasto.model';

@Injectable({
  providedIn: 'root'
})
export class GastoService {

  constructor(private httpClient: HttpClient) {
    this.loadGastos();
  }

  listGastos: Array<Gastos>;

  private getUrl(): string {
    return environment.REQUEST_URL + 'gastos';
  }

  saveGasto(operation: Operation, date: Date) {
    let gasto = this.listGastos.find(gasto =>
      new Date(gasto.date).getDate() == date.getDate()
      && new Date(gasto.date).getMonth() == date.getMonth()
      && new Date(gasto.date).getFullYear() == date.getFullYear()
    );

    if (gasto != null) {
      operation.id = gasto.operations[gasto.operations.length - 1].id + 1;
      gasto.operations.push(operation);
    }
    else {
      gasto = new Gastos();
      gasto.id = 0;
      gasto.date = date;
      gasto.operations = new Array<Operation>();
      operation.id = 0;
      gasto.operations.push(operation);
    }

    this.httpClient.put(this.getUrl() + '/' + gasto.id, this.listGastos).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    ).subscribe(
      () => {
        this.loadGastos();
      }
    );
  }

  loadGastos() {
    this.httpClient.get<Array<Gastos>>(this.getUrl()).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    ).subscribe(
      (data: Array<Gastos>) => {
        this.listGastos = data;
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
