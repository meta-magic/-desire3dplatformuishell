
import {ModuleWithProviders, NgModule} from '@angular/core';
import {PrismComponent} from '../prism/prism.component';
import {TabcodeComponent} from './code-explorer/tabcode.component';
import {CodeExplorerComponent} from './code-explorer/code-explorer.component';
import {ProjectNotificationComponent} from './notification.component';
import {CreateProjectComponent} from './create/createproject.component';
import {PlatformCommonsModule} from 'platform-commons';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AmexioFormsModule, AmexioPaneModule, AmexioWidgetModule} from 'amexio-ng-extensions';
import {CookieService} from 'ngx-cookie-service';
const routes: Routes = [
  {
    path: 'create',
    component: CreateProjectComponent
  },
  {
    path: 'code-explorer',
    component: CodeExplorerComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AmexioWidgetModule,
    AmexioPaneModule,
    AmexioFormsModule,
    HttpClientModule,
    PlatformCommonsModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  entryComponents: [TabcodeComponent],
  declarations: [
    CreateProjectComponent,
    ProjectNotificationComponent,
    CodeExplorerComponent,
    TabcodeComponent,
    PrismComponent
  ],
  exports: [
    CreateProjectComponent,
    ProjectNotificationComponent,
    CodeExplorerComponent,
    TabcodeComponent,
    PrismComponent

  ]
})
export class ProjectMsUIModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ProjectMsUIModule,
      providers: [CookieService]
    };
  }
}
