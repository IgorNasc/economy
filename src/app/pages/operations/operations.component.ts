import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';

import { GastoService } from 'src/app/services/gasto.service';
import { RendaService } from 'src/app/services/renda.service';
import { Operation } from 'src/app/model/operations.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  constructor(
    private gastoService: GastoService,
    private rendaService: RendaService,
    private modal: NgbModal,) { }

  @Input() futureOperations: boolean = false;

  ngOnInit() {
  }

  editOperation(operation: Operation) {
    console.log(operation);
    this.modal.open(this.modalContent, { size: 'lg' });
  }

}
