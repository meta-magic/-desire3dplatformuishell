import {ModuleWithProviders, NgModule} from '@angular/core';
import { AmexioWidgetModule } from 'amexio-ng-extensions';
import {HttpClientModule} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {PlatformCommonsModule} from 'platform-commons';
import {LoginComponent} from './login/auth.login.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '', component: LoginComponent
  }
];


@NgModule({
  imports: [
   CommonModule, FormsModule, RouterModule,
    AmexioWidgetModule, HttpClientModule,
    PlatformCommonsModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class AuthMsUiModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthMsUiModule,
      providers: [CookieService]
    };
  }
}
