import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../services/category.service';
import { Category } from '../model/category.model';
import { Extrato } from '../model/extrato.model';
import { ExtratoService } from '../services/extrato.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  listCategory: Array<Category>;
  extrato: Extrato = new Extrato();
  categorySelected: number;

  constructor(private modal: NgbModal,
    private categoryService: CategoryService,
    private extratoService: ExtratoService) { }

  ngOnInit() {
    this.loadCategory();
  }

  openModal(): void {
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  loadCategory() {
    this.categoryService.loadCategory().subscribe(
      (data: Array<Category>) => {
        this.listCategory = data;
      }
    );
  }

  submit() {
    this.extrato.category = this.listCategory.find(category => category.id == this.categorySelected);

    this.extratoService.saveExtract(this.extrato);

    this.modal.dismissAll();
  }

}
