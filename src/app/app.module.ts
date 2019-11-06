import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

/* CALENDAR */
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';

/* ROUTING */
import { AppRoutingModule } from './app-routing.module';

/* CHARTS */
import { ChartsModule } from 'ng2-charts';

/* NG-BOOTSTRAP */
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

/* NGX-BOOTSTRAP */
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ExtratoComponent } from './extrato/extrato.component';
import { AgendamentoComponent } from './agendamento/agendamento.component';
import { HeaderComponent } from './header/header.component';
import { AddFormComponent } from './add-form/add-form.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExtratoComponent,
    AgendamentoComponent,
    HeaderComponent,
    AddFormComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ChartsModule,
    AppRoutingModule,
    NgbModalModule,
    BrowserAnimationsModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    BsDatepickerModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
