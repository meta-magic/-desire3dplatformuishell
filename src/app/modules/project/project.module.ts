/**
 * Created by dattaram on 31/10/18.
 */
import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AmexioWidgetModule} from 'amexio-ng-extensions';
import {HttpClientModule} from '@angular/common/http';
import {PlatformCommonsModule} from 'platform-commons';
import {CreateProjectComponent} from './create/createproject.component';
import {PrismComponent} from './prism/prism.component';
import {CodeExplorerComponent} from './code-explorer/code-explorer.component';
import {TabcodeComponent} from './code-explorer/tabcode.component';

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
    HttpClientModule,
    PlatformCommonsModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [
    CreateProjectComponent,
    PrismComponent,
    CodeExplorerComponent,
    TabcodeComponent
  ],
  entryComponents: [TabcodeComponent]
})
export class ProjectModule {
}
