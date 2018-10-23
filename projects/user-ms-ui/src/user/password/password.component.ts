import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from 'platform-commons';
import { NotificationService } from 'platform-commons';
@Component({
  selector: 'password',
  template: `
  <amexio-row>
  <amexio-column [size]="3"></amexio-column>
  <amexio-column [size]="6">
    <amexio-form [form-name]="'validateForm'" [header]="true" 
   [show-error]="true" [footer-align]="'right'">
     <amexio-form-header>Password management</amexio-form-header>
     <amexio-form-body>
     <amexio-row>
     <amexio-column [size]="12">
     <amexio-password-input
     [enable-popover]="true"
     [field-label]="'Current Password'"
     name ="currentPassword"
     [place-holder]="'Enter Current Password'"
     [allow-blank]="false"
     [error-msg] ="' Please Enter Current Password'"
     [min-length]="6"
     [min-error-msg]="'Minimum 6 char required'"
     [max-length]="32"
     [max-error-msg]="'Maximum 32 char allowed'"
     [icon-feedback]="true"
     [(ngModel)]="passwordModel.currentPassword">
</amexio-password-input>
<amexio-password-input
     [enable-popover]="true"
     [field-label]="'New Password'"
     name ="newPassword"
     [place-holder]="'Enter New Password'"
     [allow-blank]="false"
     [error-msg] ="' Please Enter New Password'"
     [min-length]="6"
     [min-error-msg]="'Minimum 6 char required'"
     [max-length]="32"
     [max-error-msg]="'Maximum 32 char allowed'"
     [icon-feedback]="true"
     [(ngModel)]="passwordModel.newPassword">
</amexio-password-input>
<amexio-password-input
     [enable-popover]="true"
     [field-label]="'Confirm Password'"
     name ="passwordModel.confirmPassword"
     [place-holder]="' Confirm Password'"
     [allow-blank]="false"
     [error-msg] ="' Please Confirm Password'"
     [min-length]="6"
     [min-error-msg]="'Minimum 6 char required'"
     [max-length]="32"
     [max-error-msg]="'Maximum 32 char allowed'"
     [icon-feedback]="true"
     [(ngModel)]="passwordModel.confirmPassword"
     (onBlur)="onConfirmPassword()">
</amexio-password-input>
</amexio-column>
</amexio-row>
     </amexio-form-body>
     <amexio-form-action>
     <amexio-button
     [label]="'Change Password'"
     [type]="'primary'"
     [size]="'default'"
     [loading]="asyncFlag"
   [form-bind]="'validateForm'"
     [tooltip]="'Change Password'" 
     (onClick)="onChangePassword()">
     </amexio-button>
     </amexio-form-action>
   </amexio-form>
   </amexio-column>

<!--<amexio-dialogue [show-dialogue]="isValidateForm" [message-type]="'error'" [closable]="true" [title]="'Error'" [type]="'alert'" [custom]="true" (close)="isValidateForm = !isValidateForm">
<amexio-body>
    <ol>
        <li *ngFor="let msgObj of validationMsgArray let index=index">{{msgObj}}</li>
    </ol>
</amexio-body>
<amexio-action>
    <amexio-button type="primary" (onClick)="okErrorBtnClick()" [label]="'Ok'">
    </amexio-button>
</amexio-action>
</amexio-dialogue>-->
  <amexio-column [size]="3"></amexio-column>
    <platform-notification></platform-notification>
 
</amexio-row>
 `
})
export class PasswordComponent implements OnInit {
  passwordModel: PasswordModel;
  msgData: any[];
  asyncFlag: boolean = false;
  validationMsgArray: any = [];
  constructor(
    private http: HttpClient,
    public _notificationService: NotificationService,
    public loaderService: LoaderService
  ) {
    this.passwordModel = new PasswordModel();
    this.msgData = [];
  }

  ngOnInit() {}

  createErrorData() {
    let errorData: any[] = [];
    let errorObj: any = {};
    errorObj['data'] = [];
    errorObj.data = this.validationMsgArray;
    errorData.push(errorObj);
    this._notificationService.setErrorData('Error Message', errorData);
  }

  validateFormFields() {
    let isValid: boolean = false;
    this.validationMsgArray = [];
    if (
      this.passwordModel.currentPassword == null ||
      this.passwordModel.currentPassword == ''
    ) {
      this.validationMsgArray.push('Invalid (Blank) Current Password.');
    }
    if (
      this.passwordModel.newPassword == null ||
      this.passwordModel.newPassword == ''
    ) {
      this.validationMsgArray.push('Invalid (Blank) New Password.');
    }
  }
  //  To Close Window
  // okErrorBtnClick() {
  //   this.isValidateForm = false;
  //   this.validationMsgArray = [];
  // }
  onConfirmPassword() {
    if (this.passwordModel.newPassword == this.passwordModel.confirmPassword) {
      return true;
    }
    this._notificationService.setWarningData('Passwords dont match');
  }

  onChangePassword() {
    this.validateFormFields();
    if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
      // this.isValidateForm = true;
      // return;
      this.createErrorData();
    } else {
      // this.isValidateForm = false;
      this.changePassword();
    }
  }
  changePassword() {
    if (this.onConfirmPassword()) {
      this.asyncFlag = true;
      this.msgData = [];
      this.loaderService.showLoader();
      let response: any;
      const requestJson = {
        currentPassword: this.passwordModel.currentPassword,
        newPassword: this.passwordModel.newPassword
      };
      this.http
        .post('/api/auth/PasswordManagement/changePassword', requestJson)
        .subscribe(
          (res: any) => {
            response = res;
          },
          err => {
            this.validationMsgArray.push('Unable to connect to server');
            // this.isValidateForm = true;
            this.createErrorData();
            this.asyncFlag = false;
            this.loaderService.hideLoader();
          },
          () => {
            if (response.success) {
              this._notificationService.setSuccessData(response.successMessage);
              this.reset();
              this.asyncFlag = false;
              this.loaderService.hideLoader();
            } else {
              this.validationMsgArray.push(response.errorMessage);
              this.createErrorData();
              // this.isValidateForm = true;
              this.asyncFlag = false;
              this.loaderService.hideLoader();
            }
          }
        );
    }
  }

  reset() {
    this.passwordModel = new PasswordModel();
  }
}

export class PasswordModel {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  constructor() {
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }
}
