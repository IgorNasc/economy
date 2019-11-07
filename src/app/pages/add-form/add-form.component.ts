import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CategoryService } from '../../services/category.service';
import { GastoService } from '../../services/gasto.service';
import { RendaService } from 'src/app/services/renda.service';

import { Category } from '../../model/category.model';
import { Operation } from '../../model/operations.model';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {

  keyGasto: string = 'gasto';
  keyRenda: string = 'renda';

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  listCategory: Array<Category>;
  operation: Operation = new Operation();
  date: Date;

  constructor(private modal: NgbModal,
    private categoryService: CategoryService,
    private gastoService: GastoService,
    private rendaService: RendaService) { }

  ngOnInit() {
    this.loadCategory();
  }

  openModal() {
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  loadCategory() {
    this.categoryService.loadCategory().subscribe(
      (data: Array<Category>) => {
        this.listCategory = data;
      },
      (error: any) => {
        alert(error);
      }
    );
  }

  submit() {
    if (this.operation.type == this.keyGasto) this.gastoService.saveGasto(this.operation, this.date);
    else if (this.operation.type == this.keyRenda) this.rendaService.saveRenda(this.operation, this.date);
    
    this.modal.dismissAll();
  }

}
