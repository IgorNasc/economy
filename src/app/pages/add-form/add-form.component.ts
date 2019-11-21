import { Component, OnInit, TemplateRef, ViewChild, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { CategoryService } from '../../services/category.service';
import { GastoService } from '../../services/gasto.service';
import { RendaService } from 'src/app/services/renda.service';

import { Category } from '../../model/category.model';
import { Operation } from '../../model/operations.model';

@Component({
  selector: 'ngbd-modal-content',
  template: `
  <div class="modal-header">
  <h5 class="modal-title">Adicionar um gasto ou renda</h5>
  <button type="button" class="close" (click)="activeModal.close()">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
<div class="modal-body">
  <form (ngSubmit)="submit()">
    <div class="form-group">
      <label for="nome">Nome</label>
      <input type="text" class="form-control" id="nome" name="nome" [(ngModel)]="operation.name">
    </div>
    <div class="mb-1">
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="tipo" id="renda" [value]="keyRenda" checked [(ngModel)]="operation.type">
        <label class="form-check-label" for="renda">
          Renda
        </label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="tipo" id="gasto" [value]="keyGasto" [(ngModel)]="operation.type">
        <label class="form-check-label" for="gasto">
          Gasto
        </label>
      </div>
    </div>
    <div class="form-group">
      <label for="valor">Valor</label>
      <input type="number" class="form-control" id="valor" name="valor" [(ngModel)]="operation.value">
    </div>
    <div class="form-group">
      <label for="categoria">Categoria</label>
      <select type="number" class="form-control" id="categoria" name="categoria" [(ngModel)]="operation.category">
        <option value="">Selecione</option>
        <option *ngFor="let category of listCategory" [ngValue]="category">{{category.name}}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="data">Data</label>
      <input type="text" placeholder="Datepicker" class="form-control" name="data" [bsConfig]="{ dateInputFormat: 'DD/MM/YYYY' }" bsDatepicker [(ngModel)]="date">
    </div>
    <button type="submit" class="btn btn-outline-secondary">
      Salvar
    </button>
  </form>
</div>
  `
})
export class NgbdModalContent implements OnInit {

  keyGasto: string = 'gasto';
  keyRenda: string = 'renda';

  listCategory: Array<Category> = new Array<Category>();

  @Input() date: Date;
  @Input() operation: Operation = new Operation();

  constructor(
    public activeModal: NgbActiveModal,
    private categoryService: CategoryService,
    private gastoService: GastoService,
    private rendaService: RendaService) {

  }

  ngOnInit(): void {
    this.loadCategory();
    this.date = new Date(this.date);

  }

  loadCategory() {
    this.categoryService.loadCategory().subscribe(
      (data: Array<Category>) => {
        this.listCategory = data;

        this.operation.category = this.listCategory.find(x => x.name == this.operation.category.name);
      },
      (error: any) => {
        alert(error);
      }
    );
  }

  submit() {
    if (this.operation.type == this.keyGasto) this.gastoService.saveGasto(this.operation, this.date);
    else if (this.operation.type == this.keyRenda) this.rendaService.saveRenda(this.operation, this.date);

    this.activeModal.dismiss();
  }
}

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent {

  constructor(
    private modal: NgbModal) { }

  openModal() {
    const modalRef = this.modal.open(NgbdModalContent);
    modalRef.componentInstance.name = 'World';
  }

}
