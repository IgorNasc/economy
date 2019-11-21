import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Operation } from '../model/operations.model';
import { Gastos } from '../model/gasto.model';
import { HeaderService } from './header.service';
import { Category } from '../model/category.model';

@Injectable({
  providedIn: 'root'
})
export class GastoService {

  constructor(
    private httpClient: HttpClient,
    private headerService: HeaderService) {
    this.loadGastos();
  }

  listGastos: Array<Gastos> = new Array<Gastos>();
  listPastGastos: Array<Gastos> = new Array<Gastos>();
  listFutureGastos: Array<Gastos> = new Array<Gastos>();
  gastoTotal: number = 0;

  private getUrl(): string {
    return environment.REQUEST_URL + 'gastos';
  }

  saveGasto(operation: Operation, date: Date) {
    let request: Observable<any>;
    let gasto: Gastos;

    if (this.listGastos != null) {
      gasto = this.listGastos.find(gasto =>
        new Date(gasto.date).getDate() == date.getDate()
        && new Date(gasto.date).getMonth() == date.getMonth()
        && new Date(gasto.date).getFullYear() == date.getFullYear()
      );
    }

    if (gasto != null) {
      if (operation.id == null) {
        operation.id = gasto.operations[gasto.operations.length - 1].id + 1;
        gasto.operations.push(operation);
      }

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
        let dia = date.getMonth() != this.headerService.getMonth() ? date.getDate() : 31;

        data = data.sort((g1, g2) => {
          if (new Date(g1.date) < new Date(g2.date)) return -1;
          if (new Date(g1.date) > new Date(g2.date)) return 1;
          return 0;
        });

        this.listGastos = data;
        this.listPastGastos = data.filter(gasto =>
          new Date(gasto.date).getDate() <= dia
          && new Date(gasto.date).getMonth() == this.headerService.getMonth()
          && new Date(gasto.date).getFullYear() <= date.getFullYear()
        );
        this.listFutureGastos = data.filter(gasto =>
          new Date(gasto.date).getDate() > dia
          && new Date(gasto.date).getMonth() == this.headerService.getMonth()
          && new Date(gasto.date).getFullYear() >= date.getFullYear()
        );

        // this.maxGastoValue();
      }
    );
  }

  deleteGasto(operation: Operation) {
    let gasto: Gastos;

    if (this.listGastos != null) {
      gasto = this.listGastos.find(gasto =>
        gasto.operations.find(oper => oper == operation)
      );
    }

    gasto.operations = gasto.operations.filter(oper => oper != operation);

    this.httpClient.put(this.getUrl() + '/' + gasto.id, gasto).subscribe(
      () => {
        this.loadGastos();
      }
    );
  }

  maxGastoValue(): number[] {
    let listTotal = new Array<number>();
    let total = 0;
    this.listPastGastos.forEach(gasto => gasto.operations.forEach(
      operation => total += operation.value
    ));
    listTotal.push(total);

    return listTotal;
  }

  maxGastoByCategory(category: Category): number {
    let total = 0;
    this.listPastGastos.forEach(gasto => gasto.operations.forEach(
      operation => {
        if(operation.category.name == category.name) total += operation.value;
      }
    ));

    return total;
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
