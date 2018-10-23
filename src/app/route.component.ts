import {Component} from "@angular/core";
import {Router, Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import {CookieService} from 'platform-commons';
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";

@Component({
    selector : 'route-component',
    template : `

    <div class="loadingnav" *ngIf="isRouteLoading"></div>
    <div>
    <router-outlet></router-outlet>
    </div>
<amexio-dialogue [show-dialogue]="confirmdialogue"
               [closable]="false"
               [title]="'Info'"
               [custom]="true" (close)="confirmdialogue = !confirmdialogue"
               [type]="'alert'">
               <amexio-body>
   {{sessionMsg}}
</amexio-body>
<amexio-action>
    <amexio-button type="primary" (onClick)="okWarningBtnClick()" [label]="'Ok'">
    </amexio-button>
</amexio-action>
</amexio-dialogue>

    `
})
export class RouteComponent implements OnInit{
  isRouteLoading : boolean = false;
  confirmdialogue:boolean;
  sessionMsg:string;
    constructor(public _router : Router, private cookieService: CookieService){
          this._router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.isRouteLoading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.isRouteLoading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
    }

    navigate(path:string){
       let checkCookie: any;
    checkCookie = this.cookieService.get('tokenid');
    if (checkCookie) {
     this._router.navigate([path]);
    } else {
    this.confirmdialogue=true;
   this.sessionMsg='Session time out, Please login again'
    }
        
    }
 okWarningBtnClick() {
     this.confirmdialogue=false;
    this._router.navigate(['login']);
          }
    

ngOnInit(){
}
}
