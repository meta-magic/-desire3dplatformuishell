import {ModuleWithProviders, NgModule} from '@angular/core';
import { AmexioWidgetModule } from 'amexio-ng-extensions';
import {HttpClientModule} from '@angular/common/http';
import {PlatformCommonsModule} from 'platform-commons';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {TaskUIComponent} from "./taskui/taskui.component";
import {InstanceUIComponent} from "./instance-manager/instance.manager.component";
import {CodePipelineNotificationComponent} from "./notification.component";
import {SourceCodeComponent} from "./sourceCodeConfigration/sourceCode.component";

const routes: Routes = [
  {
    path: 'task-ui',
    component: TaskUIComponent
  },
  {
    path: 'instance-manager',
    component: InstanceUIComponent
  },
  {
    path: 'gitConfiguration',
    component: SourceCodeComponent
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
    TaskUIComponent,
    InstanceUIComponent,
    CodePipelineNotificationComponent,
    SourceCodeComponent
  ],
  exports: [
    TaskUIComponent,
    InstanceUIComponent,
    CodePipelineNotificationComponent,
    SourceCodeComponent
  ]
})
export class CodePipeLineMsUiModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CodePipeLineMsUiModule,
      providers: []
    };
  }
}

