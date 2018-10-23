import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AmexioFormsModule, AmexioPaneModule, AmexioWidgetModule} from 'amexio-ng-extensions';
import {FormsModule} from '@angular/forms';
import {AppRouting} from './app.routing';
import {PlatformCommonsModule} from 'platform-commons';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,  FormsModule, PlatformCommonsModule.forRoot(),
    AppRouting,
    AmexioWidgetModule, AmexioFormsModule, AmexioPaneModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
