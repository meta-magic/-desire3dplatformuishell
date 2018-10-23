
import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { COOKIE_NAME } from '../http-interceptor/platform.http.interceptor';
import { Router} from '@angular/router';

@Injectable()
export class UserAuthenticGuard implements CanLoad {
  constructor(private cookieService: CookieService, private _route: Router) {}

  canLoad() {
    if (this.isLoggedIn()) {
      return true;
    } else {
      this._route.navigate(['login']);
      return false;
    }
  }

  isLoggedIn(): boolean {
    let isUserValid = false;
    const cookieData = this.cookieService.get(COOKIE_NAME);
    if (cookieData != '') {
      isUserValid = true;
    } else {
      isUserValid = false;
    }
    return isUserValid;
  }
}
