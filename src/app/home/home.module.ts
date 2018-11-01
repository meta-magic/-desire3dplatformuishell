import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import {AmexioWidgetModule} from 'amexio-ng-extensions';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import{HelpComponent} from '../help/help.component';
import {RouteComponent} from '../route.component';
import {PlatformCommonsModule, UserAuthenticGuard} from 'platform-commons';
import {FormsModule} from "@angular/forms";
import {AmexioTextField} from "../components/textfield/textfield.component";
import {AmexioInputHelperComponent} from "../components/textfield/input.helper.component";

const routes: Routes = [
  {path: '', component: HomeComponent,
    children: [
      {
        path: 'user' , loadChildren : './../wrapper-modules/user-ms/user.ms.module#UserMSWrapperModule'
      },
      {
        path: 'project', canLoad: [UserAuthenticGuard], loadChildren : './../modules/project/project.module#ProjectModule'
      },
      {
        path: 'designPipeline' , canLoad: [UserAuthenticGuard], loadChildren : './../wrapper-modules/dna-ms/dna.wrapper.module#DNAWrapperModule'
      },
      {
        path: 'codepipeline' , canLoad: [UserAuthenticGuard], loadChildren : './../wrapper-modules/codepipeline-ms/codepipeline.wrapper.module#CodePipeLineWrapperModule'
      }
    ]
  }
];


@NgModule({
  imports: [AmexioWidgetModule, FormsModule, CommonModule, PlatformCommonsModule.forRoot(),
 RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  entryComponents : [RouteComponent],
  declarations: [HomeComponent, HelpComponent, RouteComponent, AmexioTextField, AmexioInputHelperComponent],
  providers: []

})
export class HomeModule {}
