
import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Observable} from 'rxjs';


export const TOKENKEY = 'tokenid';
export const COOKIE_NAME = TOKENKEY;

@Injectable()
export class CommonHttpInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    debugger;
    console.log('interceptor');
    const changedReq = req.clone({headers : req.headers.set(TOKENKEY, this.getTokenCookieValue())});
    return next.handle(changedReq);
  }

  getTokenCookieValue(): string {
    const allCookie = this.cookieService.get(COOKIE_NAME);
    return allCookie;
  }
}
