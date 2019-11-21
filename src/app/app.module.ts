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
import { HomeComponent } from './pages/home/home.component';
import { ExtratoComponent } from './pages/extrato/extrato.component';
import { AgendamentoComponent } from './pages/agendamento/agendamento.component';
import { HeaderComponent } from './pages/header/header.component';
import { AddFormComponent, NgbdModalContent } from './pages/add-form/add-form.component';
import { HttpClientModule } from '@angular/common/http';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { OperationsComponent } from './pages/operations/operations.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExtratoComponent,
    AgendamentoComponent,
    HeaderComponent,
    AddFormComponent,
    OperationsComponent,
    NgbdModalContent
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
    TabsModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    NgbdModalContent
  ]
})
export class AppModule { }
