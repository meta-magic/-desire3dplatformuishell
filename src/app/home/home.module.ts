import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import {AmexioWidgetModule} from 'amexio-ng-extensions';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import{HelpComponent} from '../help/help.component';
import {RouteComponent} from '../route.component';
import {PlatformCommonsModule, UserAuthenticGuard} from "platform-commons";
const routes: Routes = [
  {path: '', component: HomeComponent
  /*  children: [
       {
     path: 'project', canLoad: [UserAuthenticGuard], loadChildren : './../wrapper-modules/project-ms/project.creation.module#ProjectMSWrapperModule'
      },
      {
    path: 'designPipeline' , canLoad: [UserAuthenticGuard], loadChildren : './../wrapper-modules/dna-ms/dna.wrapper.module#DNAWrapperModule'
  },
   {
    path: 'user' , loadChildren : './../wrapper-modules/user-ms/use.ms.module#UserMSWrapperModule'
  },
   {
    path: 'codepipeline' , canLoad: [UserAuthenticGuard], loadChildren : './../wrapper-modules/codepipeline-ms/codepipeline.wrapper.module#CodePipeLineWrapperModule'
  }
    ]*/
  }
];


@NgModule({
  imports: [AmexioWidgetModule, CommonModule, PlatformCommonsModule.forRoot(),
 RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  entryComponents : [RouteComponent],
  declarations: [HomeComponent, HelpComponent, RouteComponent],
  providers: []

})
export class HomeModule {}
