import {ModuleWithProviders, NgModule} from '@angular/core';
import { AmexioWidgetModule } from 'amexio-ng-extensions';
import {MessagingService} from './module-comunicator/module.message.communicator';
import {LoaderService} from './loader-service/loader.service';
import {LocalStorageService} from './local-storage-service/local.storage.service';
import {UserAuthenticGuard} from './route-guards/session.token.guards';
import {NotificationService} from './notification-service/notification.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CommonHttpInterceptor} from './http-interceptor/platform.http.interceptor';
import {RestCallService} from './rest-call-service/restcall.service';
import {CookieService} from 'ngx-cookie-service';
import {PlatformNotificationComponent} from './platform-notification/platform.notification.component';

@NgModule({
  imports: [
    AmexioWidgetModule, HttpClientModule
  ],
  declarations: [PlatformNotificationComponent],
  exports: [PlatformNotificationComponent]
})
export class PlatformCommonsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PlatformCommonsModule,
      providers: [
        CookieService, RestCallService,
        MessagingService, LoaderService,
        LocalStorageService, UserAuthenticGuard,
        NotificationService,
        {
          provide: HTTP_INTERCEPTORS, useClass: CommonHttpInterceptor, multi: true
        }
      ]
    };
  }
}
