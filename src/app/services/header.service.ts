import { Injectable } from '@angular/core';
import { GastoService } from './gasto.service';
import { RendaService } from './renda.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  month: number = new Date().getMonth() + 1;

  constructor() { }

  setMonth(month: number) {
    this.month = month;
  }

  getMonth(): number {
    return this.month;
  }
}
