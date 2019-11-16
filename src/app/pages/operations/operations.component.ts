import { Component, OnInit } from '@angular/core';

import { GastoService } from 'src/app/services/gasto.service';
import { RendaService } from 'src/app/services/renda.service';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {

  constructor(
    private gastoService: GastoService,
    private rendaService: RendaService) { }

  ngOnInit() {
  }

}
