import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/services/header.service';
import { GastoService } from 'src/app/services/gasto.service';
import { RendaService } from 'src/app/services/renda.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  month: number = 1;

  constructor(
    private headerService: HeaderService,
    private gastoService: GastoService,
    private rendaService: RendaService
  ) { }

  ngOnInit() {
    this.month = this.headerService.getMonth();
  }

  onChangeMonth() {
    this.headerService.setMonth(this.month);
    this.gastoService.loadGastos();
    this.rendaService.loadRendas();
  }

}
