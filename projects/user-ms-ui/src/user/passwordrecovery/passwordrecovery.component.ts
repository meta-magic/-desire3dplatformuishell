/**
 * Created by Ashwini on 20/2/18.
 */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'password-recovery',
  template: `
<amexio-row>
  <amexio-column [size]="3"></amexio-column>
  <amexio-column [size]="6">
      <amexio-card [show]="true" [footer]="true" [header] = "true">
        <amexio-header>
          Forgot Password
        </amexio-header>
        <amexio-body>
          <amexio-row>
            <amexio-column [size]="12" >
              <amexio-text-input [field-label]="'Login Id'" name ="passwordModel.loginId"
                  [place-holder]="'Enter Login ID'"
                  [allow-blank]="false"
                  [error-msg]="'Please Enter Login Id'" 
                  [enable-popover]="true" 
                  [icon-feedback]="true"
                  [disabled]="loginDisableFlag"
                  [(ngModel)]="passwordModel.loginId">
             </amexio-text-input>
             <ng-container *ngIf="showcard">
             <amexio-text-input [field-label]="'Token '" name ="passwordModel.token"
                  [place-holder]="'Enter Token'"
                  [allow-blank]="false"
                  [error-msg] ="'Enter Token'"
                  [icon-feedback]="true"
                  [(ngModel)]="passwordModel.token">
             </amexio-text-input>  
              <amexio-password-input
                [field-label]="' New Password'" name="passwordModel.newPassword"
                [place-holder]="' Password'"
                [enable-popover]="true"
                [allow-blank]="false" 
                [error-msg] ="'Please Enter Valid Password'"
                [min-length]="6" 
                [min-error-msg]="'Minimum 6 char required'"
                [max-length]="32"  
                [max-error-msg]="'Maximum 32 char allowed'"
                [icon-feedback]="true"
                [(ngModel)]="passwordModel.newPassword">
            </amexio-password-input>
            <amexio-password-input
                [field-label]="'Confirm Password'" name="passwordModel.confirmPassword"
                [place-holder]="'Confirm New Password'"
                [enable-popover]="true"
                [allow-blank]="false" 
                [error-msg] ="'Please Confirm New Password'"
                [icon-feedback]="true"
                [(ngModel)]="passwordModel.confirmPassword"
                (onBlur)="onConfirmLoginChange($event)">
            </amexio-password-input>
            </ng-container>
            </amexio-column>
          </amexio-row>
        </amexio-body>
        <br /><br /><br /><br />
        <amexio-action>
    <ng-container *ngIf="!showcard">    
    <amexio-button [label]="'Send Token'" [type]="'primary'" [tooltip]="'Send Token'" [loading]="asyncFlag" (onClick)="onValidate()"></amexio-button>
     </ng-container>
    <ng-container *ngIf="showcard">
    <amexio-button [label]="'Submit'" [type]="'primary'" [tooltip]="'Submit'" (onClick)="onSubmit()"></amexio-button>
    </ng-container>
        
        </amexio-action>
      </amexio-card>
  </amexio-column>
  <amexio-column [size]="3"></amexio-column>
  <amexio-notification [data]="messageArray" [vertical-position]="'top'" [horizontal-position]="'right'" [auto-dismiss-msg]="true" [auto-dismiss-msg-interval]="4000">
        </amexio-notification>
  <amexio-dialogue [show-dialogue]="isValidateForm" [message-type]="'error'" [closable]="false" [title]="'Error'" [type]="'alert'" [custom]="true">
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
</amexio-row>

 `
})
export class PasswordrecoveryComponent implements OnInit {
  passwordModel: PasswordRecoveryModel;
  loginDisableFlag: boolean;
  messageArray: any[];
  showcard: boolean;
  asyncFlag: boolean = false;
  validationMsgArray: any = [];
  isValidateForm: boolean = false;
  constructor(private http: HttpClient) {
    this.loginDisableFlag = false;
    this.showcard = false;
    this.messageArray = [];
    this.passwordModel = new PasswordRecoveryModel();
  }

  onConfirmLoginChange(data: any) {
    if (this.passwordModel.newPassword == this.passwordModel.confirmPassword) {
      return true;
    }
    this.messageArray.push('Passwords dont match');
  }
  onValidate() {
    this.validateFormFields(1);
    if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
      this.isValidateForm = true;
      return;
    } else {
      this.isValidateForm = false;
      this.sendToken();
    }
  }
  sendToken() {
    if (this.passwordModel.loginId == null) {
      this.validationMsgArray.push('Please Enter Valid Login Id');
      this.isValidateForm = true;
    } else {
      this.asyncFlag = true;
      this.showcard = false;
      let tokenresponse: any;
      const requestJson = {
        loginId: this.passwordModel.loginId
      };
      this.http
        .post('/api/auth/ForgotPasswordAPI/sendRecoveryToken', requestJson)
        .subscribe(
          (res: any) => {
            tokenresponse = res;
          },
          err => {
            this.validationMsgArray.push('Unable to connect to server');
            this.isValidateForm = true;
            this.asyncFlag = false;
          },
          () => {
            if (tokenresponse.success) {
              this.showcard = true;
              this.loginDisableFlag = true;
              this.asyncFlag = false;
              this.messageArray.push(tokenresponse.successMessage);
            } else {
              this.validationMsgArray.push(tokenresponse.errorMessage);
              this.isValidateForm = true;
              this.asyncFlag = false;
            }
          }
        );
    }
  }
  validateFormFields(num: number) {
    if (num == 1) {
      debugger;
      let isValid: boolean = false;
      this.validationMsgArray = [];
      if (
        this.passwordModel.loginId == null ||
        this.passwordModel.loginId == ''
      ) {
        this.validationMsgArray.push('Invalid (Blank) Login Id.');
      }
    } else if (num == 2) {
      if (this.passwordModel.token == null || this.passwordModel.token == '') {
        this.validationMsgArray.push('Invalid (Blank) Token.');
      }
      if (
        this.passwordModel.newPassword == null ||
        this.passwordModel.newPassword == ''
      ) {
        this.validationMsgArray.push('Invalid (Blank) New Password.');
      }
    }
  }
  // To Close Window
  okErrorBtnClick() {
    this.isValidateForm = false;
    this.validationMsgArray = [];
  }

  onConfirmPassword() {
    if (this.passwordModel.newPassword == this.passwordModel.confirmPassword) {
      return true;
    }
    this.messageArray.push('Passwords dont match');
  }

  onSubmit() {
    this.validateFormFields(2);
    if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
      this.isValidateForm = true;
      return;
    } else {
      this.isValidateForm = false;
      this.forgotPassword();
    }
  }
  forgotPassword() {
    if (this.onConfirmPassword()) {
      this.asyncFlag = true;
      let response: any;
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
          err => {
            this.validationMsgArray.push('Unable to connect to server');
            this.isValidateForm = true;
            this.asyncFlag = false;
          },
          () => {
            if (response.success) {
              this.messageArray.push(response.successMessage);
              this.asyncFlag = false;
              //   this._route.navigate(['login']);
            } else {
              this.validationMsgArray.push(response.errorMessage);
              this.isValidateForm = true;
              this.asyncFlag = false;
            }
          }
        );
    }
  }

  ngOnInit() {}
}
export class PasswordRecoveryModel {
  loginId: string;
  token: string;
  newPassword: string;
  confirmPassword: string;

  constructor() {
    this.loginId = '';
    this.token = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }
}
