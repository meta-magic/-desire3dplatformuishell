import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AmexioFormsModule, AmexioPaneModule, AmexioWidgetModule} from 'amexio-ng-extensions';
import {FormsModule} from '@angular/forms';
import {AppRouting} from './app.routing';
import {PlatformCommonsModule} from 'platform-commons';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CommonHttpInterceptor} from "./http-interceptor/platform.http.interceptor";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,  FormsModule, PlatformCommonsModule.forRoot(),
    AppRouting,
    HttpClientModule,
    AmexioWidgetModule, AmexioFormsModule, AmexioPaneModule
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS, useClass: CommonHttpInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
