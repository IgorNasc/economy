import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { throwError, Observable } from 'rxjs';
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
  listPastGastos: Array<Gastos>;
  listFutureGastos: Array<Gastos>;

  private getUrl(): string {
    return environment.REQUEST_URL + 'gastos';
  }

  saveGasto(operation: Operation, date: Date) {
    let request: Observable<any>;
    let gasto: Gastos;

    if(this.listGastos != null){
      gasto = this.listGastos.find(gasto =>
        new Date(gasto.date).getDate() == date.getDate()
        && new Date(gasto.date).getMonth() == date.getMonth()
        && new Date(gasto.date).getFullYear() == date.getFullYear()
      );
    }

    if (gasto != null) {
      operation.id = gasto.operations[gasto.operations.length - 1].id + 1;
      gasto.operations.push(operation);

      request = this.httpClient.put(this.getUrl() + '/' + gasto.id, gasto);
    }
    else {
      gasto = new Gastos();
      // gasto.id = this.listGastos[this.listGastos.length - 1].id + 1;
      gasto.date = date;
      gasto.operations = new Array<Operation>();
      operation.id = 0;
      gasto.operations.push(operation);

      request = this.httpClient.post(this.getUrl(), gasto);
    }

    request.pipe(
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
        let date = new Date();

        data = data.sort((g1, g2) => {
          if (new Date(g1.date) < new Date(g2.date)) return -1;
          if (new Date(g1.date) > new Date(g2.date)) return 1;
          return 0;
        });

        this.listGastos = data;
        this.listPastGastos = data.filter(gasto =>
          new Date(gasto.date).getDate() <= date.getDate()
          && new Date(gasto.date).getMonth() <= date.getMonth()
          && new Date(gasto.date).getFullYear() <= date.getFullYear()
        );
        this.listFutureGastos = data.filter(gasto =>
          new Date(gasto.date).getDate() > date.getDate()
          && new Date(gasto.date).getMonth() >= date.getMonth()
          && new Date(gasto.date).getFullYear() >= date.getFullYear()
        );
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
