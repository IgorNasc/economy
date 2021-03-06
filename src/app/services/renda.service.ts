import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Operation } from '../model/operations.model';
import { Renda } from '../model/renda.model';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class RendaService {

  constructor(
    private httpClient: HttpClient,
    private headerService: HeaderService) {
    this.loadRendas();
  }

  listRendas: Array<Renda> = new Array<Renda>();
  listPastRendas: Array<Renda> = new Array<Renda>();
  listFutureRendas: Array<Renda> = new Array<Renda>();
  rendaTotal: number = 0;

  private getUrl(): string {
    return environment.REQUEST_URL + 'rendas';
  }

  saveRenda(operation: Operation, date: Date) {
    let request: Observable<any>;
    let renda: Renda;

    if (this.listRendas != null) {
      renda = this.listRendas.find(renda =>
        new Date(renda.date).getDate() == date.getDate()
        && new Date(renda.date).getMonth() == date.getMonth()
        && new Date(renda.date).getFullYear() == date.getFullYear()
      );
    }

    if (renda != null) {
      if(operation.id == null) {
        operation.id = renda.operations[renda.operations.length - 1].id + 1;
        renda.operations.push(operation);
      }

      request = this.httpClient.put(this.getUrl() + '/' + renda.id, renda);
    }
    else {
      renda = new Renda();
      // renda.id = 0;
      renda.date = date;
      renda.operations = new Array<Operation>();
      operation.id = 0;
      renda.operations.push(operation);

      request = this.httpClient.post(this.getUrl(), renda);
    }

    request.pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    ).subscribe(
      () => {
        this.loadRendas();
      }
    );
  }

  loadRendas() {
    this.httpClient.get<Array<Renda>>(this.getUrl()).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    ).subscribe(
      (data: Array<Renda>) => {
        let date = new Date();
        let dia = date.getMonth() != this.headerService.getMonth() ? date.getDate() : 31;

        data = data.sort((g1, g2) => {
          if (new Date(g1.date) < new Date(g2.date)) return -1;
          if (new Date(g1.date) > new Date(g2.date)) return 1;
          return 0;
        });

        this.listRendas = data;
        this.listPastRendas = data.filter(renda =>
          new Date(renda.date).getDate() <= dia
          && new Date(renda.date).getMonth() == this.headerService.getMonth()
          && new Date(renda.date).getFullYear() <= date.getFullYear()
        );
        this.listFutureRendas = data.filter(renda =>
          new Date(renda.date).getDate() > dia
          && new Date(renda.date).getMonth() == this.headerService.getMonth()
          && new Date(renda.date).getFullYear() >= date.getFullYear()
        );

        // this.maxGastoValue();
      }
    );
  }

  deleteRenda(operation: Operation) {
    let renda: Renda;

    if (this.listRendas != null) {
      renda = this.listRendas.find(ren =>
        ren.operations.find(oper => oper == operation)
      );
    }

    renda.operations = renda.operations.filter(oper => oper != operation);

    this.httpClient.put(this.getUrl() + '/' + renda.id, renda).subscribe(
      () => {
        this.loadRendas();
      }
    );
  }

  maxRendaValue(): Array<number> {
    let listTotal = new Array<number>();
    let total = 0;
    this.listPastRendas.forEach(renda => renda.operations.forEach(
      operation => total += operation.value
    ));
    listTotal.push(total);

    return listTotal;
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
