import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';

import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { RadioComponent } from './components/radio/radio.component';
import { GetCepComponent } from './components/get-cep/get-cep.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { TableCrudComponent } from './components/table-crud/table-crud.component';
import { ButtonModule } from 'primeng/button';
import { AddNewRowDirective } from './directives/add-new-row.directive';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    CheckboxComponent,
    RadioComponent,
    GetCepComponent,
    TableCrudComponent,
    AddNewRowDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InputTextModule,
    TableModule,
    ButtonModule
  ],
  entryComponents: [],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
