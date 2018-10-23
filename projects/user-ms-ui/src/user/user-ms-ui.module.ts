import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { AmexioWidgetModule, IconLoaderService } from 'amexio-ng-extensions';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { PlatformCommonsModule } from 'platform-commons';
import { PasswordComponent } from './password/password.component';
import { PasswordrecoveryComponent } from './passwordrecovery/passwordrecovery.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { UserCreationComponent } from './usercreation/usercreation.component';
import { SignupComponent } from './signup/signup.component';
import { LicenseComponent } from './signup/subscription/license';
import { PaymentGatewayComponent } from './signup/paymentgateway/payment_gateway';
import { SignupService } from './signup/signupservice';
import {ApprovalComponent} from './approval/approval.component';
import {CookieService} from "ngx-cookie-service";



const routes: Routes = [
  {
    path: 'approval',
    component: ApprovalComponent
  },
  {
    path: 'userprofile',
    component: UserprofileComponent
  },
  {
    path: 'password',
    component: PasswordComponent
  },
  {
    path: 'password-recovery',
    component: PasswordrecoveryComponent
  },
  {
    path: 'usercreation',
    component: UserCreationComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AmexioWidgetModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    PlatformCommonsModule.forRoot(),
  ],
  declarations: [
    ApprovalComponent,
    UserprofileComponent,
    PasswordComponent,
    PasswordrecoveryComponent,
    UserCreationComponent,
    SignupComponent,
    LicenseComponent,
    PaymentGatewayComponent
  ],
  exports: [
    ApprovalComponent,
    UserprofileComponent,
    PasswordComponent,
    PasswordrecoveryComponent,
    UserCreationComponent,
    SignupComponent,
    LicenseComponent,
    PaymentGatewayComponent
  ]
})
export class UserMsUiModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UserMsUiModule,
      providers: [IconLoaderService, SignupService, CookieService]
    };
  }
}
