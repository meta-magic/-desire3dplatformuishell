/**
 * Created by ketangote on 1/3/18.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserAuthenticGuard} from 'platform-commons';


const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path : 'login', loadChildren: './wrapper-modules/auth-ms/auth.wrapper.module#AuthWrapperModule'
  },
  {
    path: 'home', canLoad: [UserAuthenticGuard], loadChildren: './home/home.module#HomeModule',
  },
  {
    path: 'user' , loadChildren : './wrapper-modules/user-ms/user.ms.module#UserMSWrapperModule'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash : true}) ],
  exports: [ RouterModule ]
})
export class AppRouting {}
