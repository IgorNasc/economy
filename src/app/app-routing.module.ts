import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ExtratoComponent } from './pages/extrato/extrato.component';
import { AgendamentoComponent } from './pages/agendamento/agendamento.component';
import { AddFormComponent } from './pages/add-form/add-form.component';

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
