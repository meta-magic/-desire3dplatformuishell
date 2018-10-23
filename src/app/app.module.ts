import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AmexioFormsModule, AmexioPaneModule, AmexioWidgetModule} from 'amexio-ng-extensions';
import {FormsModule} from '@angular/forms';
import {AppRouting} from './app.routing';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,  FormsModule,
    AppRouting,
    AmexioWidgetModule, AmexioFormsModule, AmexioPaneModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
