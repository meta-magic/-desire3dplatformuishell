/**
 * Created by sagar on 23/2/18.
 */
import { Router } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService, LoaderService, NotificationService } from 'platform-commons';
import {CookieService} from 'ngx-cookie-service';
import { DOCUMENT } from '@angular/platform-browser';
@Component({
  selector: 'auth-login',
  template: `    
  <amexio-nav [logo]="'assets/auth_images/logo.png'" (onNavLogoClick)="onMetamagicClick()">
   <amexio-nav-item position-right [type]="'link'" [title]="'Home'" [icon]="'fa fa-home fa-fw fa-lg'"
      (onNavItemClick)="homeLink('https://amexio.tech/')">
    </amexio-nav-item>
    <amexio-nav-item position-right *ngFor="let menus of amexiotechmenus"
    [type]="'menu'"
    [title]="menus.text"
    [icon]="menus.icon"
    [data]="menus.submenus"
      (onNavItemClick)="externalLink($event)">
    </amexio-nav-item>
    </amexio-nav>
  <div style="padding-left:5px;padding-right:5px;top: 12.5%;position: absolute;">
  <amexio-borderlayout>
  <amexio-borderlayout-item position="center">
  <amexio-row >
     <div class="loadingnav" *ngIf="loaderService.isLoading"></div>
  <amexio-column size="4">
   <amexio-card [header]="true" [footer]="false" [body-height]="60">
  <amexio-header>Amexio API</amexio-header>
      <amexio-body>
        <amexio-row>
        <amexio-column size="1">
        </amexio-column>
       <amexio-column size="10">
Amexio API Angular 6 API for your Web and Smart Device Apps. Completely open sourced based on Apache 2 License.
         <ul><li>120+ UI Components</li></ul>
         <ul><li>70+ additional UI Features</li></ul>
         <ul><li>Drag And Drop UI</li></ul>
        <ul><li>Charts / Maps / Dashboard / Layouts</li></ul>
         <ul><li> 57 Material Design Themes</li></ul>
          <ul><li>16 Amexio Themes</li></ul>
          <ul><li>Responsive Design</li></ul>
        <amexio-button [label]="'API Docs'"
                  [type]="'primary'"
                  [icon]="'fa fa-external-link-square'"
                  [tooltip]="'Amexio API'"
                  (onClick)="onImageClick('api')">
              </amexio-button>

          <amexio-button [label]="'Amexio Demo'"
                  [type]="'primary'"
                  [icon]="'fa fa-external-link-square'"
                  [tooltip]="'Amexio Demo'"
                  (onClick)="onImageClick('sed')">
              </amexio-button>
       </amexio-column>
        <amexio-column size="1">
        </amexio-column>
       </amexio-row>
      </amexio-body>
    </amexio-card>
    </amexio-column>
  <amexio-column size="4">
 <amexio-card [header]="true" [footer]="false" [body-height]="60">
   <amexio-header>Amexio Canvas</amexio-header>

      <amexio-body>
         <amexio-row>
        <amexio-column size="1">
        </amexio-column>
       <amexio-column size="10">

         <amexio-label
             size="medium-bold">
        Angular UI Automation Platform
        </amexio-label>
        <br>
                <ul><li>Drag and Drop</li></ul>
        <ul><li>Hot deploy</li></ul>
         <ul><li>Service Bindings</li></ul>
          <ul><li>Behaviors and Relationships</li></ul>
          <ul><li>Authentication</li></ul>
        <p>
        <br>
        <amexio-button [label]="'Amexio Tech'"
                  [type]="'primary'"
                  [icon]="'fa fa-external-link-square'"
                  [tooltip]="'Amexio Tech'"
                  [block]="true"
                  (onClick)="onImageClick('features')">
              </amexio-button>
        </p>
       </amexio-column>
        <amexio-column size="1">
        </amexio-column>
       </amexio-row>
      </amexio-body>
    </amexio-card>   </amexio-column>
  <amexio-column size="4">
  <amexio-card [header]="true" [footer]="false" [body-height]="60">
  <amexio-header>{{cardHeader}}</amexio-header>
  <amexio-body>
    <ng-container *ngIf="loginScreen">
    <amexio-row>
    <amexio-column size="1">
    </amexio-column>
    <amexio-column size="10">

    <amexio-image path="assets/auth_images/canvas.png"></amexio-image>
    </amexio-column>
    <amexio-column size="1">
    </amexio-column>
    </amexio-row>

    <amexio-row>
    <amexio-column size="1">
    </amexio-column>
    <amexio-column size="10">
    <amexio-text-input [field-label]="'Login Id'" [allow-blank]="false" [error-msg]="'Please Enter Login Id'"
    [(ngModel)]="login.loginId" name="login.loginId" [icon-feedback]="true"
                        [place-holder]="'Login Id'">
    </amexio-text-input>
    </amexio-column>
    <amexio-column size="1">
    </amexio-column>
  </amexio-row>

  <amexio-row>
  <amexio-column size="1">
    </amexio-column>
  <amexio-column size="10">
  <amexio-button  [block]="true"  [label]="'Next'" [loading]="asyncFlag" (onClick)="validateLoginId($event)" [type]="'primary'" [tooltip]="'Next to Password'"></amexio-button>
  </amexio-column>
  <amexio-column size="1">
  </amexio-column>
  </amexio-row>

  <amexio-row>
  <amexio-column size="1">
    </amexio-column>
  <amexio-column size="10">
    No account? <a  style="cursor:pointer;color:#1565C0"  [routerLink]="['/user/signup']" >Create one!</a>
  </amexio-column>
  <amexio-column size="1">
    </amexio-column>
  </amexio-row>
  <br> <br>
    </ng-container>


    <ng-container *ngIf="passwordScreen">
    <amexio-row>
    <amexio-column size="1">
    </amexio-column>
    <amexio-column size="10">
    <amexio-image path="assets/auth_images/canvas.png"></amexio-image>
    </amexio-column>
    <amexio-column size="1">
    </amexio-column>
    </amexio-row>

    <amexio-row>
    <amexio-column size="12">
    <div class="identityBanner">
      <div class="identity">
      <amexio-label size="medium">{{loggedUserName}}</amexio-label>
      <img src="assets/auth_images/user.png" width="20" height="30" class="img-fluid" style="background-color: #2196f3;padding: 1px;">
      </div>
      </div>
    </amexio-column>
    </amexio-row>

    <amexio-row>
    <amexio-column size="1">
    </amexio-column>
    <amexio-column size="10">
    <amexio-password-input [field-label]="'Enter Password'" [allow-blank]="false" [error-msg] ="'Please Enter Password'"
    [(ngModel)]="login.password"  name="login.password" [place-holder]="'Password'" [icon-feedback]="true"
    > </amexio-password-input>
    </amexio-column>
    <amexio-column size="1">
    </amexio-column>
  </amexio-row>

  <amexio-row>
  <amexio-column size="1">
  </amexio-column>
  <amexio-column size="5">
  <amexio-button [block]="true"  [label]="'Back'"  (onClick)="backFromPassword($event)"  [type]="'secondary'" [tooltip]="'Back to login id'"></amexio-button>
  </amexio-column>
  <amexio-column size="5">
  <amexio-button [block]="true" [label]="'Sign in'" [loading]="loginSyncFlag" (onClick)="doLogin($event)" [type]="'primary'" [tooltip]="'Login in'"></amexio-button>
  </amexio-column>
  <amexio-column size="1">
  </amexio-column>
  </amexio-row>

  <amexio-row>
  <amexio-column size="1">
    </amexio-column>
  <amexio-column size="10">
  <a style="cursor:pointer;color:#1565C0" (click)="forgotPasswordClick()">Forgot password</a>
  </amexio-column>
  <amexio-column size="1">
    </amexio-column>
  </amexio-row>
    </ng-container>

    <ng-container *ngIf="forgotPasswordScreen">
    <amexio-row>
    <amexio-column size="12">
    <ng-container *ngIf="!newPasswordScreen">
    <amexio-text-input [field-label]="'Login Id'" [allow-blank]="false" [error-msg]="'Please Enter Login Id'"
    [(ngModel)]="passwordRecovery.loginId" name="passwordRecovery.loginId" [icon-feedback]="true"
                        [place-holder]="'Login Id'">
    </amexio-text-input>
    </ng-container>

    <ng-container *ngIf="newPasswordScreen">
    <amexio-text-input [field-label]="'Token '"
                  name ="passwordModel.token"
                  [place-holder]="'Enter Token'"
                  [allow-blank]="false"
                  [error-msg] ="'Enter Token'"
                  [icon-feedback]="true"
                  [(ngModel)]="passwordModel.token">
             </amexio-text-input>

  <amexio-password-input
   [enable-popover]="true"
   [field-label]="'New Password'"
   name ="passwordModel.newPassword"
   [place-holder]="'Enter New Password'"
   [allow-blank]="false"
   [error-msg] ="'Please Enter Valid New Password'"
   [min-length]="6"
   [min-error-msg]="'Minimum 6 char required'"
   [max-length]="32"
   [max-error-msg]="'Maximum 32 char allowed'"
   [icon-feedback]="true"
   [(ngModel)]="passwordModel.newPassword">
  </amexio-password-input>
  <amexio-password-input
  [field-label]="'Confirm Password'"
   name ="passwordModel.confirmPassword"
  [place-holder]="'Confirm New Password'"
  [allow-blank]="false"
  [error-msg] ="'Please Confirm password'"
  [icon-feedback]="true"
  [(ngModel)]="passwordModel.confirmPassword">
 </amexio-password-input>
    </ng-container>
    </amexio-column>
    </amexio-row>
    <amexio-row>
  <amexio-column size="1">
    </amexio-column>
  <amexio-column size="10">
  <ng-container *ngIf="!newPasswordScreen">
  <amexio-button [block]="true" [loading]="syncSendTonen"  [label]="'Send Token'" [type]="'primary'" [tooltip]="'Send token'" (onClick)="sendToken($event)"></amexio-button>
  </ng-container>
  <ng-container *ngIf="newPasswordScreen">
  <amexio-button
  [block]="true"
  [label]="'Change Password'"
  [loading]="changePassAsyncFlag"
  (onClick)="onChangePasswordClick($event)"
  [type]="'primary'"
  [tooltip]="'Change Password'">
  </amexio-button>
  </ng-container>

  </amexio-column>
  <amexio-column size="1">
  </amexio-column>
  </amexio-row>
    </ng-container>


  </amexio-body>

</amexio-card>
  </amexio-column>
  </amexio-row>
<amexio-row >
  <amexio-column size="6">
    <amexio-card [header]="false" [footer]="false" [body-height]="50">
      <amexio-body>
       <amexio-image path="assets/auth_images/blueqube.png"></amexio-image>
       <amexio-row>
       <amexio-column size="12">
        <p>A Blue Qube category product will provide you with ready-to-use API libraries that you can insert into your own codebase. You take the code provided by the Blue Qube to achieve a particular functionality and manage it yourself.
        </p>
        <p>Amexio API is a Blue Qube that allows you to leverage ready-to-use Web and Smart Device UI and UX code.
        </p>
        <br>
       </amexio-column>
       </amexio-row>
      </amexio-body>
    </amexio-card>
    </amexio-column>
    <amexio-column size="6">
     <amexio-card [header]="false" [footer]="false" [body-height]="50">
  <amexio-body>
   <amexio-image path="assets/auth_images/desire3d.png"></amexio-image>
   <amexio-row>
   <amexio-column size="12">
    <p>A Desire3D category product will provide you with application grade code across the full stack of your application based on the design documents you provide to the product.
    </p>
    <p  style="padding-bottom:6px">Amexio Canvas is a Desire3D product that provides the API libraries as well as a drag-and-drop environment to generate full code for your Web and Smart Device Apps.
    </p>
    <br>
   </amexio-column>
   </amexio-row>
  </amexio-body>
</amexio-card>
  </amexio-column>
  <amexio-column [size]="5">
  </amexio-column>
  <amexio-column [size]="3" style="cursor: pointer;">
  <br>
    <ng-container *ngFor="let media of mediaLink">
      <amexio-image  [icon-class]="media.icon"
                     (onClick)="onIconClick(media.url)">
      </amexio-image>
    </ng-container>
    </amexio-column>
    <amexio-column [size]="4">
  </amexio-column>

  <amexio-column  [size]="'9pt5'">

      <div id="footer1" style="bottom: 0;">
        <p style="text-align: center;">  © 2017 MetaMagic Global Inc, NJ, USA.  All Rights Reserved. Source Code :  <a href="http://amexio.org/showcaseapp/v4/license.html" target="_blank">Apache 2 License</a>  Docs by <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank">CC By 3.0</a></p>
      </div>
    </amexio-column>
</amexio-row>

  </amexio-borderlayout-item>
  </amexio-borderlayout>
  </div>
  <platform-notification></platform-notification>


  `,
  styles: [
    `
    .dialogue-middle {
      text-align: left!important;
  }
  .identityBanner {
    background: #f2f2f2;
}
  .imageround{
    width: 50px!important;
    height: 50px!important;
    border-radius: 50%!important;
    vertical-align: middle!important;
  }

.identity {
  line-height: 48px;
  vertical-align:middle;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: right;
  width: calc(100% - 36px);
}

  `
  ]
})
export class LoginComponent implements OnInit {
  login: Login;
  passwordRecovery: PasswordRecovery;
  loginScreen = true;
  passwordScreen: boolean;
  forgotPasswordScreen: boolean;
  loggedUserName: string;
  asyncFlag: boolean;
  syncSendTonen: boolean;
  loginSyncFlag: boolean;
  notificationMessageData: any = [];
  cardHeader: string;
  newPasswordScreen: boolean;
  passwordModel: PasswordModel;
  changePassAsyncFlag: boolean;
  amexiotechmenus: any[];
  mediaLink: any[] = [];

  constructor(
    private http: HttpClient,
    private _cookieService: CookieService,
    private ls: LocalStorageService,
    private router: Router,
    public loaderService: LoaderService,
    public _notificationService: NotificationService,
    @Inject(DOCUMENT) private document: any
  ) {
    this.newPasswordScreen = false;
    this.cardHeader = 'Canvas (Beta) : Sign into your account';
    this.login = new Login();
    this.passwordRecovery = new PasswordRecovery();
    this.passwordModel = new PasswordModel();
    this.amexiotechmenus = [
      {
        text: 'Products',
        icon: 'fa fa-snowflake-o fa-fw',
        submenus: [
          {
            text: 'Amexio API',
            link: 'https://amexio.tech/amexio-api'
          },
          {
            text: 'Amexio Canvas',
            link: 'https://amexio.tech/amexio-canvas'
          },
          {
            text: 'Amexio Colors',
            link: 'https://amexio.tech/amexio-colors'
          }
        ]
      },
      {
        text: 'Start Using',
        icon: 'fa fa-television fa-fw',
        submenus: [
          {
            text: 'Component Example',
            link: 'http://amexio.org/demo/se/v4.1/index.html#/home'
          },
          {
            text: 'Pricing',
            link: 'https://amexio.tech/pricing'
          },
          {
            text: 'Downloads',
            link: 'https://amexio.tech/download'
          },
          {
            text: 'Subscribe',
            link: 'https://canvas.amexio.org/signup/'
          },
          {
            text: 'Canvas Login (Beta)',
            link: 'https://canvas.amexio.org/'
          },
          {
            text: 'License and Other Docs',
            link: 'https://amexio.tech/license-and-other-docs-1'
          }
        ]
      },
      {
        text: 'Training',
        icon: 'fa fa-user fa-fw',
        submenus: [
          {
            text: 'Amexio Training',
            link: 'http://metaarivu.com/amexio-training'
          }
        ]
      },
      {
        text: 'Engage',
        icon: 'fa fa-envelope fa-fw',
        submenus: [
          {
            text: 'Events',
            link: 'https://metamagicglobal.com/events'
          },
          {
            text: 'Forums',
            link: 'http://forum.metamagicglobal.com/'
          },
          {
            text: 'Blogs',
            link: 'http://blog.metamagicglobal.com/'
          },
          {
            text: 'Node Package Manager',
            link: 'https://www.npmjs.com/package/amexio-ng-extensions'
          },
          {
            text: 'GitHub - Source Code',
            link: 'https://github.com/meta-magic/amexio.github.io'
          }
        ]
      },
      {
        text: 'About Us',
        icon: 'fa fa-address-book-o fa-fw',
        submenus: [
          {
            text: 'Contact',
            link: 'https://metamagicglobal.com/contact'
          },
          {
            text: 'Company',
            link: 'http://www.metamagicglobal.com/company'
          },
          {
            text: 'MetaMagic',
            link: 'https://www.metamagicglobal.com/'
          }
        ]
      }
    ];

    this.mediaLink = [
      {
        "icon": "fa fa-facebook-official fa-lg",
        "url": "https://www.facebook.com/metamagicglobalinc"
      },
      {
        "icon": "fa fa-twitter fa-lg",
        "url": "https://twitter.com/metamagicglobal"
      },
      {
        "icon": "fa fa-instagram fa-lg",
        "url": "https://www.instagram.com/metamagicglobal"
      },
      {
        "icon": "fa fa-pinterest-p fa-lg",
        "url": "https://www.pinterest.com/metamagicglobal"
      },
      {
        "icon": "fa fa-linkedin fa-lg",
        "url": "https://www.linkedin.com/m/login/"
      },
      {
        "icon": "fa fa-youtube-play fa-lg",
        "url": "https://www.youtube.com/channel/UC1sPlg3OhP4jQ6td90kspyg"
      },
      {
        "icon": "fa fa-google-plus fa-lg",
        "url": "https://plus.google.com/104840532038625549863"
      }
    ];
  }
  ngOnInit() {
    if (this._cookieService.get('tokenid')) {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['login']);
    }
  }

  getPlatformInfo() {
    let response: any;
    this.http.get('assets/platform/platform.json').subscribe(
      res => {
        response = res;
      },
      error => {
        console.log(response);
      },
      () => {
        this.ls.set('platformInfo', response);
      }
    );
  }

  externalLink(event: any) {
    if (event.data.node.link) {
      //this.document.location.href=event.data.node.link;
      window.open(event.data.node.link, '_blank');
    }
  }
  homeLink(link: any) {
    this.document.location.href = link;
  }
  onImageClick(imageId: string) {
    if (imageId == 'api') {
      window.open('https://amexio.tech/amexio-api');
    } else if (imageId == 'sed') {
      window.open('http://demo.amexio.tech/');
    } else if (imageId == 'features') {
      window.open('https://amexio.tech');
    }
  }
  onIconClick(url: string) {
    window.open(url);
  }

  //Back the window to user id window
  backFromPassword(data: any) {
    this.loginScreen = true;
    this.login.password = '';
    this.passwordScreen = false;
    const waringmsg: any[] = [];
  }

  onMetamagicClick() {
    this.loginScreen = true;
    this.cardHeader = 'Canvas (Beta) : Sign into your account';
    this.passwordScreen = false;
    this.forgotPasswordScreen = false;
    this.newPasswordScreen = false;
  }

  //THIS METHOD USED FOR VALIDATE LOGIN ID
  validateLoginId(data: any) {
    if (this.login.loginId) {
      this.loggedUserName = this.login.loginId;
      let response: any;
      this.asyncFlag = true;
      this.notificationMessageData = [];
      const requestJson = {
        loginId: this.login.loginId
      };
      const httpOptions = { headers: new HttpHeaders({ laodFlag: 'true' }) };
      this.http
        .post(
          '/api/auth/authenticate/validateloginid',
          requestJson,
          httpOptions
        )
        .subscribe(
          (res: any) => {
            response = res;
          },
          (error: any) => {
            this._notificationService.setErrorData('Unable to connect to server');
          },
          () => {
            if (response.success) {
              this.asyncFlag = false;
              this.loginScreen = false;
              this.passwordScreen = true;
            } else {
              this._notificationService.setErrorData(response.errorMessage);
              this.asyncFlag = false;
            }
          }
        );
    } else {
      this._notificationService.setErrorData('Enter valid login id');
    }
  }
  // DO LOGIN HERE
  doLogin(data: any) {
    let response: any;
    if (this.login.password == null && this.login.password == '') {
      this._notificationService.setErrorData('Enter a password.');
      return;
    } else {
      this.loginSyncFlag = true;
      this.notificationMessageData = [];
      this.loaderService.showLoader();
      const requestJson = this.login;
      this.http
        .post('/api/auth/authenticate/authenticate', requestJson)
        .subscribe(
          (res: any) => {
            response = res;
          },
          (error: any) => {
            this._notificationService.setErrorData('Unable to connect to server');
            this.loaderService.hideLoader();
          },
          () => {
            if (response.success) {
              this.loginSyncFlag = false;
              if (response.response && response.response.tokenid) {
                // this.notificationMessageData.push(response.successMessage);
                // this._notificationService.showSuccessData(
                //   this.notificationMessageData
                // );
                this._cookieService.set('tokenid', response.response.tokenid);
                this.router.navigate(['home']);
                this.loaderService.hideLoader();
                this.login = new Login();
                this.getPlatformInfo();
              }
            } else {
              this._notificationService.setErrorData(response.errorMessage);
              this.loaderService.hideLoader();
              this.loginSyncFlag = false;
            }
          }
        );
    }
  }
  // HERE THIS CODE IS USED FOR FORGOT PASSWORD SCREEN
  forgotPasswordClick() {
    this.forgotPasswordScreen = true;
    this.loginScreen = false;
    this.passwordScreen = false;
    this.passwordRecovery.loginId = '';
    this.cardHeader = 'Recover your account';
  }
  //SEND TOKEN FOR RESET PASSWORD
  sendToken(data: any) {
    let passwordScreenFlag = false;
    this.notificationMessageData = [];
    let response: any;
    if (
      this.passwordRecovery &&
      (this.passwordRecovery.loginId != null ||
        this.passwordRecovery.loginId == '')
    ) {
      this.syncSendTonen = true;
      this.passwordModel.loginId = this.passwordRecovery.loginId;
      const requestJson = this.passwordRecovery;

      this.http
        .post('/api/auth/ForgotPasswordAPI/sendRecoveryToken', requestJson)
        .subscribe(
          (res: any) => {
            response = res;
          },
          (error: any) => {
            this._notificationService.setErrorData('Unable to connect to server');
            this.syncSendTonen = false;
            passwordScreenFlag = true;
          },
          () => {
            if (response.success) {
              this.notificationMessageData.push(response.successMessage);
              this._notificationService.showSuccessData(
                this.notificationMessageData
              );
              passwordScreenFlag = true;
              this.syncSendTonen = false;
              this.loginScreen = false;
              this.forgotPasswordScreen = true;
              this.newPasswordScreen = true;
              //this.passwordScreen = true;
              //this.login.password = '';
              //this.cardHeader = 'Canvas : Sign In Your Account';
            } else {
              this._notificationService.setErrorData(response.errorMessage);
              this.syncSendTonen = false;
            }
          }
        );
    } else {
      this._notificationService.setWarningData('Enter a valid login id');
    }
  }

  // THIS METHOD IS USED FOR CHANGE PASSWORD OF USER
  onChangePasswordClick(event: any) {
    this.changePassAsyncFlag = true;
    let response: any;
    if (!this.passwordModel.token) {
      this._notificationService.setWarningData('Token id should not be null.');
      this.changePassAsyncFlag = false;
    } else if (
      (this.passwordModel.newPassword &&
        this.passwordModel.confirmPassword &&
        this.passwordModel.newPassword.length < 6) ||
      (this.passwordModel.newPassword &&
        this.passwordModel.confirmPassword &&
        this.passwordModel.newPassword.length > 32)
    ) {
      this._notificationService.setWarningData('Password length shuold be between 6 to 32 characters.');
      this.changePassAsyncFlag = false;
    } else if (
      this.passwordModel.newPassword != this.passwordModel.confirmPassword
    ) {
      this._notificationService.setWarningData('Password and Confirm password is not match.');
      this.changePassAsyncFlag = false;
    } else {
      const requestJson = {
        loginId: this.passwordModel.loginId,
        token: this.passwordModel.token,
        newPassword: this.passwordModel.newPassword
      };
      this.http
        .post('/api/auth/ForgotPasswordAPI/forgotPassword', requestJson)
        .subscribe(
          (res: any) => {
            response = res;
          },
          (error: any) => {
            this._notificationService.setErrorData('Unable to connect to server');
            this.changePassAsyncFlag = false;
          },
          () => {
            if (response.success) {
              this.notificationMessageData.push(response.successMessage);
              this._notificationService.showSuccessData(
                this.notificationMessageData
              );
              this.forgotPasswordScreen = false;
              this.changePassAsyncFlag = false;
              this.passwordScreen = true;
              this.passwordModel = new PasswordModel();
            } else {
              // this.isValidate = false;
              this._notificationService.setErrorData(response.errorMessage);
              this.changePassAsyncFlag = false;
            }
          }
        );
    }
  }
}
export class Login {
  loginId: string;
  password: string;
  constructor() {}
}
// THIS CLASS USED FOR PASSWORD RECOVERY
export class PasswordRecovery {
  loginId: string;
  constructor() {}
}

export class PasswordModel {
  loginId: any;
  token: any;
  newPassword: any;
  confirmPassword: any;

  constructor() {
    this.loginId = null;
    this.token = null;
    this.newPassword = null;
    this.confirmPassword = null;
  }
}
