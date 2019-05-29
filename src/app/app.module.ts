import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { InputBankCodeComponent } from './input-bank-code/input-bank-code.component';
import { InputAddressComponent } from './input-address/input-address.component';

@NgModule({
  declarations: [
    AppComponent,
    InputBankCodeComponent,
    InputAddressComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
