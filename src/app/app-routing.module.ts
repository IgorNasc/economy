import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ExtratoComponent } from './extrato/extrato.component';
import { AgendamentoComponent } from './agendamento/agendamento.component';
import { AddFormComponent } from './add-form/add-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'extrato', component: ExtratoComponent },
  { path: 'agendamento', component: AgendamentoComponent },
  { path: 'form', component: AddFormComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
