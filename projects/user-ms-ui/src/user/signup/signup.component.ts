import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupService } from './signupservice';
import { LoaderService } from 'platform-commons';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { NotificationService } from 'platform-commons';

@Component({
  selector: 'sign-up',
  template: `
      <div class="loadingnav" *ngIf="loaderService.isLoading"></div>
  <div *ngIf="userCreated" style="color: black;text-align: center;padding:10%">
    <amexio-row>
        <amexio-column size="3"> </amexio-column>
        <amexio-column size="6">
            <amexio-card [header]="false" [footer]="false">
                <amexio-body>
                    <amexio-row>
                        <amexio-column size="12">
                            <h1>Thank You</h1>
                            <h5>Thank you for signing up. For more info contact info@metamagic.in
                            </h5>
                        </amexio-column>
                         <amexio-column size="9">
                        </amexio-column>
                        <amexio-column size="3">
                           <amexio-button [label]="'Go to login'" [icon]="'fa fa-arrow-left'" [type]="'secondary'" [size]="'default'"  (onClick)="onClick()">
              </amexio-button>
                        </amexio-column>
                    </amexio-row>

                </amexio-body>
            </amexio-card>
        </amexio-column>
        <amexio-column size="3"> </amexio-column>
    </amexio-row>

</div>
<ng-container *ngIf="!userCreated">
    <amexio-nav [logo]="'assets/images/logo.png'">
     <amexio-nav-item position-right [type]="'link'" [title]="'Home'" [icon]="'fa fa-home fa-fw fa-lg'"
      (onNavItemClick)="onHomeClick()">
    </amexio-nav-item>
    <amexio-nav-item position-right *ngFor="let menus of amexiotechmenus" 
    [type]="'menu'" 
    [title]="menus.text"
    [icon]="menus.icon"
    [data]="menus.submenus"
      (onNavItemClick)="externalLink($event)">
    </amexio-nav-item>
    </amexio-nav>
</ng-container>


<div *ngIf="!userCreated" style="padding:85px 50px 0px 50px">
    <amexio-row>
        <amexio-column size="12">
            <amexio-steps [icon]="true">
                <amexio-step-block [label]="'Developer Info'" [icon]="'fa fa-user-circle fa-2x'" [active]="activeStep.subscription"></amexio-step-block>
                <amexio-step-block [label]="'Accept License'" [icon]="'fa fa-check-circle-o fa-2x'" [active]="activeStep.license"></amexio-step-block>
                <amexio-step-block [label]="'Payment Details'" [icon]="'fa fa-shopping-cart fa-2x'" [active]="activeStep.payment"></amexio-step-block>
            </amexio-steps>
        </amexio-column>
    </amexio-row>

    <amexio-dialogue [show-dialogue]="isValidateForm" [message-type]="'error'" [closable]="true" [title]="'Error'" [type]="'alert'" [custom]="true" (close)="isValidateForm = !isValidateForm">
        <amexio-body>
            <ol>
                <li *ngFor="let msgObj of validationMsgArray let index=index">{{msgObj}}</li>
            </ol>

        </amexio-body>
        <amexio-action>
            <amexio-button type="primary" (onClick)="okErrorBtnClick()" [label]="'Ok'">
            </amexio-button>
        </amexio-action>
    </amexio-dialogue>
    <amexio-row>
        <amexio-column size="12">
        <amexio-form [form-name]="'validateForm'" [header]="true" [show-error]="true" [footer-align]="'right'"  [body-height]="70">            
                <amexio-form-header>{{headerName}}</amexio-form-header>
                <amexio-form-body>
                    <amexio-row *ngIf="activeStep.subscription">
                        <amexio-column size="2">
                            <amexio-radio-group name="licenseType" [field-label]="'License Type'" [data-reader]="'response.data'" [display-field]="'type'" [value-field]="'id'" [http-method]="'get'" [horizontal]="false" [http-url]="'assets/licensetype.json'" [default-value]="'1'"
                                (onSelection)="selectedLicenseType($event)"></amexio-radio-group>
                        </amexio-column>
                        <amexio-column size="2">
                            <amexio-radio-group name="subscription" [field-label]="'Developer Type'" [data-reader]="'response.data'"   [display-field]="'type'" [value-field]="'id'" [http-method]="'get'" [horizontal]="false" [http-url]="'assets/developertype.json'" [default-value]="'1'"
                                (onSelection)="selectedDeveloperType($event)"></amexio-radio-group>
                        </amexio-column>
                        <amexio-column size="2">
                            <amexio-image path="assets/images/desire3d_products.png"></amexio-image>
                        </amexio-column>
                        <amexio-column size="2">
                            <amexio-radio-group name="product_canvas" [data-reader]="'response.data'" [display-field]="'label'" [value-field]="'product'" [horizontal]="true" [http-method]="'get'" [default-value]="'1'" (onSelection)="onProductCheck($event)" [http-url]="'assets/product_canvas.json'"></amexio-radio-group>
                        </amexio-column>
                        <amexio-column size="2">
                            <amexio-radio-group name="product_droit" [data-reader]="'response.data'" [display-field]="'label'" [value-field]="'product'" [horizontal]="true" [http-method]="'get'" [default-value]="'1'" [http-url]="'assets/product_droit.json'"></amexio-radio-group>
                        </amexio-column>
                        <amexio-column size="2">
                            <amexio-checkbox [field-label]="'Code Pipeline'" [(ngModel)]="codepipeline" [disabled]="true" name="codepipeline"></amexio-checkbox>
                        </amexio-column>
                    </amexio-row>

                    <div *ngIf="activeStep.subscription">
                        <amexio-row>

                            <amexio-column size="12">
                                <amexio-accordion transparent="true" angle-icon="true">
                                    <amexio-accordion-tab header="Personal Info" [active]="true">
                                        <amexio-row>
                                            <amexio-column size="1">
                                                <amexio-dropdown [search]="true" [allow-blank]="false" [place-holder]="'Title'" [(ngModel)]="userSignupModel.salutationId" name="userSignupModel.salutationId" [data-reader]="'response'" [field-label]="'Title'" [http-url]="'/api/user/insecure/Salutation/findAll'" [http-method]="'get'"
                                                                 (onSingleSelect)="onTitleSelect($event)" [display-field]="'label'" [value-field]="'salutationId'"></amexio-dropdown>
                                            </amexio-column>
                                            <amexio-column size="5">
                                                <amexio-text-input enable-popover="true"  field-label="First Name" name="userSignupModel.firstName" [(ngModel)]="userSignupModel.firstName" place-holder="Enter First Name" allow-blank="false" error-msg="Please Enter First Name" min-length="1" min-error-msg="Minimum 1 char required"
                                                    max-length="128" max-error-msg="Maximum 128 char allowed" icon-feedback="true"></amexio-text-input>
                                            </amexio-column>
                                            <amexio-column size="6">
                                                <amexio-text-input enable-popover="true"  field-label="Last Name" name="userSignupModel.lastName" [(ngModel)]="userSignupModel.lastName" place-holder="Enter Last Name" allow-blank="false" error-msg="Please Enter Last Name" min-length="1" min-error-msg="Minimum 1 char required"
                                                    max-length="128" max-error-msg="Maximum 128 char allowed" icon-feedback="true"></amexio-text-input>
                                            </amexio-column>
                                        </amexio-row>
                                        <amexio-row>
                                            <amexio-column size="6">
                                                <amexio-date-time-picker [field-label]="'Date Of Birth'" [required]="false" [time-picker]="false" [date-picker]="true" [(ngModel)]="userSignupModel.dateOfBirth"></amexio-date-time-picker>
                                            </amexio-column>
                                            <amexio-column size="6">
                                                <amexio-radio-group [field-label]="'Gender'" name="gender" [data-reader]="'data'" [display-field]="'gender'" [value-field]="'genderId'" [allow-blank]="false" [default-value]="userSignupModel.genderId" [http-method]="'get'" [horizontal]="true" [http-url]="'assets/gender.json'"
                                                    (onSelection)="setGenderSelection($event)"></amexio-radio-group>
                                            </amexio-column>
                                        </amexio-row>
                                        <amexio-row>
                                            <amexio-column size="6">
                                                <amexio-text-input [field-label]="'Login Id'" [place-holder]="'Enter Login Id'" name="userSignupModel.loginId" [(ngModel)]="userSignupModel.loginId" [allow-blank]="false" [error-msg]="'Please Enter Login Id'" min-length="4" min-error-msg="Minimum 4 char required"
                                                    max-length="128" max-error-msg="Maximum 128 char allowed" [enable-popover]="true" [icon-feedback]="true"></amexio-text-input>
                                            </amexio-column>
                                            <amexio-column size="6">
                                                <amexio-text-input [field-label]="'Confirm Login Id'" [place-holder]="'Enter Confirm Login Id'" name="confirmLoginId" [(ngModel)]="confirmLoginId" [allow-blank]="false" min-length="4" min-error-msg="Minimum 4 char required" max-length="128" max-error-msg="Maximum 128 char allowed"
                                                    [error-msg]="'Please Enter Confirm Login Id'" [enable-popover]="true" [icon-feedback]="true" (onBlur)="onConfirmLoginChange($event)"></amexio-text-input>
                                            </amexio-column>
                                        </amexio-row>
                                        <amexio-row>
                                            <amexio-column size="6">
                                                <amexio-email-input [field-label]="'Email Id'" name="userSignupModel.emailId" [(ngModel)]="userSignupModel.emailId" [place-holder]="'Enter Email Id'" [allow-blank]="false" [error-msg]="'Please Enter Email Id'" [enable-popover]="true" [icon-feedback]="true"></amexio-email-input>
                                            </amexio-column>
                                            <amexio-column size="6">
                                                <amexio-number-input [enable-popover]="true" [field-label]="'Phone Number'" [place-holder]="'Enter Phone Number'" [allow-blank]="false" name="'userSignupModel.phoneNumber'" [error-msg]="'Enter valid Phone Number'"
                                                     [icon-feedback]="true" [(ngModel)]="userSignupModel.phoneNumber">
                                                </amexio-number-input>
                                            </amexio-column>
                                        </amexio-row>

                                    </amexio-accordion-tab>
                                    <amexio-accordion-tab header="Address">

                                        <amexio-row>
                                            <amexio-column size="6">
                                                <amexio-textarea-input [enable-popover]="true" [field-label]="'Address Label'" [place-holder]="'Permanent Address'" [allow-blank]="false" [error-msg]="'Please Enter Address'" [icon-feedback]="true" [rows]="'1'" [columns]="'2'" name="userSignupModel.addressLabel"
                                                    [(ngModel)]="userSignupModel.addressLabel"></amexio-textarea-input>
                                            </amexio-column>
                                            <amexio-column size="6">
                                                <amexio-textarea-input [enable-popover]="true" [field-label]="'Address Line 1'" [place-holder]="'Please Enter Address Line1'" [allow-blank]="false" [error-msg]="'Please Enter Address'" [icon-feedback]="true" [rows]="'1'" [columns]="'2'" name="userSignupModel.address1"
                                                    [(ngModel)]="userSignupModel.address1"></amexio-textarea-input>
                                            </amexio-column>
                                        </amexio-row>
                                        <amexio-row>
                                            <amexio-column size="6">
                                                <amexio-textarea-input [enable-popover]="true" [field-label]="'Address Line 2'" [place-holder]="'Please Enter Address Line 2'" [allow-blank]="true" [error-msg]="'Please Enter Address Line 2'" [icon-feedback]="true" [rows]="'1'" [columns]="'2'" name="userSignupModel.address2"
                                                    [(ngModel)]="userSignupModel.address2"></amexio-textarea-input>
                                            </amexio-column>
                                            <amexio-column size="6">
                                                <amexio-dropdown [search]="true" [place-holder]="'Choose Country'" [data-reader]="'response'" [field-label]="'Country'" [http-url]="'/api/user/insecure/Country/findAll'" [http-method]="'get'" [display-field]="'countryName'" [value-field]="'countryId'" [allow-blank]="false"
                                                    name="userSignupModel.countryId" [(ngModel)]="userSignupModel.countryId" (onSingleSelect)="onCountrySelect($event)"></amexio-dropdown>
                                            </amexio-column>
                                        </amexio-row>
                                        <amexio-row>
                                            <amexio-column size="6">
                                                <amexio-dropdown [search]="true" [allow-blank]="false"  [place-holder]="'Choose Province'" name="userSignupModel.stateId" [(ngModel)]="userSignupModel.stateId" [field-label]="'Province'" [data]="stateData" [display-field]="'stateName'" [value-field]="'stateId'" (onSingleSelect)="onStateSelect($event)"></amexio-dropdown>
                                            </amexio-column>
                                            <amexio-column size="6">
                                                <amexio-text-input enable-popover="true" field-label="City" name="userSignupModel.cityName" [(ngModel)]="userSignupModel.cityName" place-holder="Enter City Name" allow-blank="true" error-msg="Please Enter City Name" min-length="2" min-error-msg="Minimum 2 character required"
                                                    icon-feedback="true" max-length="256" max-error-msg="Maximum 256 characters allowed"></amexio-text-input>
                                                <!-- <amexio-dropdown [search]="true" [place-holder]="'Choose City'" [field-label]="'City'" [data]="cityData" name="userSignupModel.cityId" [(ngModel)]="userSignupModel.cityId" [display-field]="'cityName'" [value-field]="'cityId'"></amexio-dropdown> -->
                                            </amexio-column>
                                        </amexio-row>
                                        <amexio-row>
                                            <amexio-column size="6">
                                                <amexio-number-input enable-popover="true" field-label="Zip Code" name="userSignupModel.zipCode" [(ngModel)]="userSignupModel.zipCode" place-holder="Enter Zip Code " allow-blank="false" error-msg="Please Enter Zip Code" 
                                                     icon-feedback="true"></amexio-number-input>
                                            </amexio-column>
                                        </amexio-row>

                                    </amexio-accordion-tab>
                                    <amexio-accordion-tab header="Company Info" disabled="true">

                                        <amexio-row>
                                            <amexio-column size="6">
                                                <amexio-text-input enable-popover="true" field-label="Name" name="userSignupModel.orgName" [(ngModel)]="userSignupModel.orgName" place-holder="Enter Name" allow-blank="true" error-msg="Please Enter Name" min-length="1" min-error-msg="Minimum 1 char required"
                                                    max-length="20" max-error-msg="Maximum 20 char allowed" icon-feedback="true"></amexio-text-input>
                                            </amexio-column>
                                            <amexio-column size="6">
                                                <amexio-textarea-input [enable-popover]="true" [field-label]="'Description'" name="userSignupModel.orgDescription" [(ngModel)]="userSignupModel.orgDescription" [place-holder]="'Enter Description'" [allow-blank]="true" [error-msg]="'Please Enter Description'"
                                                    [icon-feedback]="true" [rows]="'1'" [columns]="'2'"></amexio-textarea-input>
                                            </amexio-column>
                                        </amexio-row>
                                        <amexio-row>
                                            <amexio-column size="6">
                                                <amexio-dropdown [search]="true" [place-holder]="'Choose Class'" [(ngModel)]="userSignupModel.orgClassId" name="userSignupModel.orgClassId" [data-reader]="'response'" [field-label]="'Class'" [http-url]="'/api/user/insecure/OrganizationClass/findAll'"
                                                allow-blank="true" [http-method]="'get'" [display-field]="'orgClassLabel'" [value-field]="'orgClassId'"></amexio-dropdown>
                                            </amexio-column>
                                            <amexio-column size="6">
                                                <amexio-dropdown [search]="true" [place-holder]="'Choose Type'" [(ngModel)]="userSignupModel.orgTypeId" name="userSignupModel.orgTypeId" [data-reader]="'response'" [field-label]="'Type'" [http-url]="'/api/user/insecure/OrganizationType/findAll'" [http-method]="'get'"
                                                   allow-blank="true"  [display-field]="'orgTypeLabel'" [value-field]="'orgTypeId'"></amexio-dropdown>
                                            </amexio-column>
                                        </amexio-row>
                                        <amexio-row>
                                            <amexio-column size="6">
                                                <amexio-dropdown [search]="true" [place-holder]="'Choose Category'" [(ngModel)]="userSignupModel.orgCategoryId" name="userSignupModel.orgCategoryId" [data-reader]="'response'" [field-label]="'Category'" [http-url]="'/api/user/insecure/OrganizationCategory/findAll'"
                                                allow-blank="true" [http-method]="'get'" [display-field]="'orgCategoryLabel'" [value-field]="'orgCategoryId'"></amexio-dropdown>
                                            </amexio-column>
                                        </amexio-row>

                                    </amexio-accordion-tab>
                                </amexio-accordion>
                            </amexio-column>
                        </amexio-row>
                    </div>

                    <!-- License  -->
                    <ng-container *ngIf="activeStep.license">

                        <amexio-row>
                            <amexio-column size="12">
                                <amexio-card [header]="false" footer="true" [body-height]="50" [footer-align]="'left'">
                                    <amexio-body>
                                        <license></license>
                                    </amexio-body>
                                    <amexio-action>
                                        <amexio-checkbox [field-label]="'I agree all terms and conditions.'" [(ngModel)]="agree" name="agree" (onSelection)="onCheckClick($event)"></amexio-checkbox>
                                    </amexio-action>
                                </amexio-card>

                            </amexio-column>
                        </amexio-row>
                    </ng-container>
                    <!-- Payment -->
                    <ng-container *ngIf="activeStep.payment">
                        <amexio-row>
                            <amexio-column size="12">
                                <amexio-card [header]="false" footer="true" [body-height]="50" [footer-align]="'left'">
                                    <amexio-body>
                                        <payment-gateway></payment-gateway>
                                    </amexio-body>
                                    <amexio-action>
                                        <amexio-checkbox [field-label]="'I agree'" [(ngModel)]="paymentAgree" name="paymentAgree" (onSelection)="onAgreeClick($event)"></amexio-checkbox>
                                    </amexio-action>
                                </amexio-card>
                            </amexio-column>
                        </amexio-row>
                    </ng-container>
                </amexio-form-body>
                <amexio-form-action>
                    <amexio-button [size]="'default'" label="Prev" type="primary" [icon]="'fa fa-arrow-left'" (onClick)="previousClick()" [disabled]="previousButton"></amexio-button>
                    <amexio-button [size]="'default'" [loading]="isLoading" [label]="nextButtonLabel" [icon]="nextBtnIcon" [form-bind]="'validateForm'" type="primary" (onClick)="nextClick()" [disabled]="nextButton"></amexio-button>
                </amexio-form-action>
             </amexio-form>
        </amexio-column>
    </amexio-row>
</div>
    <platform-notification></platform-notification>

 `
})
export class SignupComponent implements OnInit {
  activeStep: ActiveSteps;
  check: boolean = false;
  previousButton: boolean = true;
  nextButton: boolean = false;
  agree: boolean = false;
  paymentAgree: boolean = false;
  headerName: string;
  nextButtonLabel: string;
  nextBtnIcon: string;
  codepipeline: boolean = true;
  isEnterprise: boolean = false;
  stateData: any;
  cityData: any;
  messageArray: any = [];
  confirmLoginId: string;
  userSignupModel: UserSignupModel;
  isUserValidate: boolean = true;
  userCreated: boolean = false;
  isLoading: boolean = false;
  validationMsgArray: any = [];
  isValidateForm: boolean = false;
  height: number;
  amexiotechmenus: any[];
  constructor(
    private http: HttpClient,
    private signupservice: SignupService,
    public loaderService: LoaderService,
    public _notificationService: NotificationService,
    private router: Router,
    @Inject(DOCUMENT) private document: any
  ) {
    this.activeStep = new ActiveSteps();
    this.signupservice.setSteps(this.activeStep);
    this.headerName = 'Developer Info';
    this.nextButtonLabel = 'Next';
    this.nextBtnIcon = 'fa fa-arrow-right';
    this.userSignupModel = new UserSignupModel();
    this.userSignupModel.developerType = '1';
    this.userSignupModel.product = '1';
    this.userSignupModel.genderId = '2';
    this.userSignupModel.licenseType = '1';
    this.userSignupModel.salutationId = '3';

    this.onResize(null);
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
  }

  ngOnInit() {}
  externalLink(event: any) {
    if (event.data.node.link)
      //this.document.location.href=event.data.node.link;
      window.open(event.data.node.link, '_blank');
  }

  onHomeClick() {
    this.router.navigate(['login']);
  }
  onResize(event: any) {
    if (window.innerWidth <= 320) {
      this.height = 250;
    } else if (window.innerWidth > 320 && window.innerWidth <= 450) {
      if (window.innerWidth == 412) {
        this.height = 290;
      } else {
        this.height = 260;
      }
    } else if (window.innerWidth > 450 && window.innerWidth <= 600) {
      this.height = 500;
    } else if (window.innerWidth > 600 && window.innerWidth <= 767) {
      this.height = 560;
    } else if (window.innerWidth > 767 && window.innerWidth <= 799) {
      this.height = 700;
    } else if (window.innerWidth > 799 && window.innerWidth <= 959) {
    } else if (window.innerWidth > 959 && window.innerWidth <= 1024) {
      this.height = 980;
    } else if (
      window.innerWidth > 1024 &&
      window.innerWidth <= 1280 &&
      window.innerHeight == 800
    ) {
      this.height = 480;
    } else if (
      window.innerWidth > 1024 &&
      window.innerWidth <= 1280 &&
      window.innerHeight == 950
    ) {
      this.height = 600;
    } else if (window.innerWidth > 1280 && window.innerWidth <= 1302) {
      this.height = 350;
    }
  }
  onTitleSelect(data:any){

    if(data && data.salutationId){
      const t = data.salutationId+"";
      if(t == "2" || t == "1"){
        this.userSignupModel.genderId = "1";
      }else{
        this.userSignupModel.genderId = "2";
      }

    }
  }
  // Address Details UI Methods

  onCountrySelect(data: any) {
    if (data.countryId) {
      this.getStateData(data.countryId);
    }
  }

  // To Close Window
  okErrorBtnClick() {
    this.isValidateForm = false;
  }

  //USED WHEN STATE DROPDOWN CHANGE
  onStateSelect(data: any) {
    // if (data.stateId) {
    //   this.getCityData(data.stateId);
    // }
  }

  getStateData(countryId: any) {
    let stateResponse: any;
    this.http
      .get('/api/user/insecure/State/findByCountryId?countryId=' + countryId)
      .subscribe(
        response => {
          stateResponse = response;
        },
        err => {
          this.validationMsgArray.push('Unable to connect to server');
          // this.isValidateForm = true;
          this.createErrorData();
        },
        () => {
          this.stateData = stateResponse.response;
        }
      );
  }

  getCityData(stateId: any) {
    let cityResponse: any;
    this.http
      .get('/api/user/insecure/City/findByStateId?stateId=' + stateId)
      .subscribe(
        response => {
          cityResponse = response;
        },
        err => {
          this.validationMsgArray.push('Unable to connect to server');
          // this.isValidateForm = true;
          this.createErrorData();
        },
        () => {
          this.cityData = cityResponse.response;
        }
      );
  }
  // SELECT ON PRODUCT CHECK CLICK
  onProductCheck(data: any) {
    if (data.product) {
      this.userSignupModel.product = data.product;
    }
  }
  //Checkbox click event
  onCheckClick(agree: any) {
    if (agree) {
      this.agree = true;
      this.nextButton = false;
    }
  }
  //On AGREE CLICK OF PAYEMNT GATEWAY
  onAgreeClick(agree: any) {
    if (agree) {
      this.nextButton = false;
    } else {
      this.nextButton = true;
    }
  }
  // PREVIOUS BUTTON CLICK
  previousClick() {
    let activStepName = this.signupservice.getActiveStepbox();
    if (activStepName == 'license') {
      this.setStepActiveFlag(true, false, false);
      this.previousButton = false;
      this.headerName = 'Developer Info';
      this.nextButton = false;
      this.nextButtonLabel = 'Next';
      this.nextBtnIcon = 'fa fa-arrow-right';
    } else if (activStepName == 'payment') {
      this.setStepActiveFlag(false, true, false);
      this.headerName = 'Payment Details';
      this.nextButton = false;
      this.previousButton = false;
      this.nextButtonLabel = 'Next';
      this.nextBtnIcon = 'fa fa-arrow-right';
    }
  }

  createErrorData() {
    let errorData: any[] = [];
    let errorObj: any = {};
    errorObj['data'] = [];
    errorObj.data = this.validationMsgArray;
    errorData.push(errorObj);
    this._notificationService.showerrorData('Error Message', errorData);
  }

  createInvalidCompErrorData() {
    let errorData: any[] = [];
    let errorObj: any = {};
    errorObj['data'] = [];
    errorObj.data = this.validationMsgArray;
    errorData.push(errorObj);
    this._notificationService.showerrorData('Invalid Component', errorData);
  }

  // NEXT BUTTON CLICK
  nextClick() {
    let activStepName = this.signupservice.getActiveStepbox();
    if (activStepName == 'subscription') {
      this.validateFormFields();
      if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
        // this.isValidateForm = true;
        this.createInvalidCompErrorData();
      } else {
        // this.isValidateForm = false;
        if (this.userSignupModel.loginId != this.confirmLoginId) {
          this._notificationService.setWarningData('Please enter correct login id.');
        } else {
          this.userValidate();
          //     this.setStepActiveFlag(false,false,true);
        }
      }
    } else if (activStepName == 'license') {
      this.setStepActiveFlag(false, false, true);
      this.headerName = 'Payment Details';
      this.nextButtonLabel = 'Submit';
      this.nextBtnIcon = 'fa fa-save';
    } else if (activStepName == 'payment') {
      this.isLoading = true;
      this.nextButton = false;
      this.previousButton = false;
      this.saveData();
    }
  }

  //Validate Form Fields
  validateFormFields() {
    let isValid: boolean = false;
    this.validationMsgArray = [];
    if (this.userSignupModel.salutationId == '') {
      this.validationMsgArray.push('Invalid (Blank) Title.');
    }
    if (this.userSignupModel.firstName == '') {
      this.validationMsgArray.push('Invalid (Blank) First Name.');
    }
    if (this.userSignupModel.lastName == '') {
      this.validationMsgArray.push('Invalid (Blank) Last Name.');
    }
    if (this.userSignupModel.dateOfBirth == null) {
      this.validationMsgArray.push('Invalid Date Of Birth.');
    }
    if (
      this.userSignupModel.loginId == null ||
      this.userSignupModel.loginId == ''
    ) {
      this.validationMsgArray.push('Invalid (Blank) Login Id.');
    }
    if (this.userSignupModel.emailId == null) {
      this.validationMsgArray.push('Invalid (Blank) Email Id.');
    }
    if (this.userSignupModel.phoneNumber == null) {
      this.validationMsgArray.push('Invalid (Empty) Phone Number.');
    } else {
      this.validateMobileNumber();
    }
    if (this.userSignupModel.address1 == '') {
      this.validationMsgArray.push('Invalid (Blank) Address 1.');
    }
    if (this.userSignupModel.addressLabel == '') {
      this.validationMsgArray.push('Invalid (Blank) Address Label.');
    }
    if (this.userSignupModel.countryId == '') {
      this.validationMsgArray.push('Invalid (Blank) Country Name.');
    }
    if (this.userSignupModel.stateId == '') {
      this.validationMsgArray.push('Invalid (Blank) Province.');
    }
    // if(this.userSignupModel.cityName==null){
    //   this.validationMsgArray.push('Invalid (Blank) City Name.')
    // }
    if (this.userSignupModel.zipCode) {
      this.validateZipcode();
    }
    //   else if (
    //   this.userSignupModel.zipCode == '' ||
    //   this.userSignupModel.zipCode == null
    // ) {

    //  this.validationMsgArray.push('Invalid (Empty) Zip code.');
    // }
    if (this.userSignupModel.loginId) {
      let trimmedLoginId = this.userSignupModel.loginId.replace(/\s/g, '');
      if (this.userSignupModel.loginId != trimmedLoginId) {
        this.validationMsgArray.push(
          'Invalid Login id, No white spaces are not allowed!'
        );
      }
    }
  }
  validateMobileNumber() {
    let number = this.userSignupModel.phoneNumber;
    let numberStr = number + '';
    if ((numberStr && numberStr.length > 15) || numberStr.length < 7) {
      this.validationMsgArray.push(
        'Phone Number must be  7 to 15 digits, country code may required'
      );
    }
  }

  validateZipcode() {
    let zipcode = this.userSignupModel.zipCode;
    let zipcodeStr = zipcode + '';
    if ((zipcodeStr && zipcodeStr.length < 4) || zipcodeStr.length > 10) {
      this.validationMsgArray.push('Zipcode must be  4 to 10 digits');
    }
  }
  // SELECT SUBSCRIPTION TYPE
  selectedDeveloperType(data: any) {
    if (data.id) {
      this.userSignupModel.developerType = data.id;
    }
    if (data.id == '2') {
      this.isEnterprise = true;
    } else {
      this.isEnterprise = false;
    }
  }
  //SELECT LICENSE TYPE
  selectedLicenseType(data: any) {
    if (data.id) {
      this.userSignupModel.licenseType = data.id;
    }
  }

  // ON GENDER SELECTION
  setGenderSelection(data: any) {
    if (data.genderId) {
      this.userSignupModel.genderId = data.genderId;
    }
  }

  // ON CONFIRM LOGIN CHANGE
  onConfirmLoginChange(data: any) {
    this.messageArray = [];
    if (this.userSignupModel.loginId != this.confirmLoginId) {
      this.messageArray.push('Please enter correct login id.');
      this._notificationService.setWarningData('Please enter correct login id.');
    }
  }

  // User Validate
  userValidate() {
    let validatData: any;
    this.validationMsgArray = [];
    const requestJson = {
      loginId: this.userSignupModel.loginId,
      emailId: this.userSignupModel.emailId,
      phoneNumber: this.userSignupModel.phoneNumber
    };
    this.http
      .post(
        '/api/user/insecure/UserConstraintQuery/checkConstraints',
        requestJson
      )
      .subscribe(
        response => {
          validatData = response;
        },
        err => {
          this.validationMsgArray.push('Unable to connect to server');
          // this.isValidateForm = true;
          this.createErrorData();
        },
        () => {
          if (!validatData.success) {
            this.validationMsgArray.push(validatData.errorMessage);
            // this.isValidateForm = true;
            this.createErrorData();
            this.isUserValidate = false;
            this.setStepActiveFlag(true, false, false);
          } else {
            this.isUserValidate = true;
            this.setStepActiveFlag(false, true, false);
            this.previousButton = false;
            this.nextButton = true;
            if (!this.agree) {
              this.nextButton = true;
            }
            this.headerName = 'Accept License';
            this.nextButtonLabel = 'Next';
            this.nextBtnIcon = 'fa fa-arrow-right';
          }
        }
      );
  }
  // SAVE USER DATA
  saveData() {
    if (this.isUserValidate) {
      let userResponse: any;
      this.validationMsgArray = [];
      this.messageArray = [];
      this.loaderService.showLoader();
      const requestJson = this.userSignupModel;
      this.http
        .post('/api/user/insecure/SignupRequest/save', requestJson)
        .subscribe(
          res => {
            userResponse = res;
          },
          err => {
            this.validationMsgArray = [];
            this.validationMsgArray.push('Unable to connect to server');
            // this.isValidateForm = true;
            this.createErrorData();
            this.loaderService.hideLoader();
          },
          () => {
            if (!userResponse.success) {
              this.validationMsgArray = [];
              this.validationMsgArray.push(userResponse.errorMessage);
              // this.isValidateForm = true;
              userResponse.errors.forEach((error: any, index: any) => {
                this.validationMsgArray.push(error);
              });
              this.createErrorData();
              this.loaderService.hideLoader();
              this.isLoading = false;
            } else {
              this._notificationService.setSuccessData(userResponse.successMessage);
              this.userCreated = true;
              this.userSignupModel = new UserSignupModel();
              this.isLoading = false;
              this.loaderService.hideLoader();
            }
          }
        );
    }
  }

  setStepActiveFlag(subscription: any, license: any, payment: any) {
    this.activeStep.subscription = subscription;
    this.activeStep.license = license;
    this.activeStep.payment = payment;
  }

  //Navigate to login page
  onClick() {
    this.router.navigate(['login']);
  }
}

export class ActiveSteps {
  subscription: boolean;
  userinfo: boolean;
  license: boolean;
  payment: boolean;
  constructor() {
    this.subscription = true;
    this.userinfo = false;
    this.license = false;
    this.payment = false;
  }
}

export class UserSignupModel {
  salutationId: string;
  product: string;
  firstName: string;
  middleName: any;
  lastName: string;
  emailId: any;
  phoneNumber: any;
  genderId: string;
  dateOfBirth: any;
  loginId: string;
  developerType: string;
  licenseType: string;
  orgName: any;
  orgDescription: any;
  orgClassId: any;
  orgTypeId: any;
  orgCategoryId: any;
  addressLabel: string;
  address1: string;
  address2: string;
  countryId: string;
  stateId: string;
  // cityId: string;
  cityName: string;
  zipCode: any;
  constructor() {
    this.product = '';
    this.salutationId = '';
    this.firstName = '';
    this.middleName = null;
    this.lastName = '';
    this.dateOfBirth = null;
    this.genderId = 'male';
    this.emailId = null;
    this.phoneNumber = null;
    this.loginId = '';
    this.developerType = '';
    this.licenseType = '';
    this.orgName = null;
    this.orgDescription = null;
    this.orgClassId = null;
    this.orgTypeId = null;
    this.orgCategoryId = null;
    this.addressLabel = '';
    this.address1 = '';
    this.address2 = '';
    this.countryId = '';
    this.stateId = '';
    // this.cityId = null;
    this.cityName = '';
    this.zipCode = null;
  }
}
