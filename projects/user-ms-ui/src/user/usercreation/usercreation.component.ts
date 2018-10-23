/**
 * Created by pratik on 15/2/18.
 */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from 'platform-commons';
import { NotificationService } from 'platform-commons';
@Component({
  selector: 'usercreation',
  template: `
       <div class="loadingnav" *ngIf="loaderService.isLoading"></div>
  <amexio-row>
  <amexio-column [size]=3>
      <amexio-card [header]="false" [footer]="true" [show]="true" [body-height]="77" [footer-align]="'right'">
          <amexio-body  [padding]="'0px'">
              <amexio-listbox [enable-checkbox]="false" 
                             [header]="'Users'" 
                             [search-placeholder]="'Search'" 
                             [data]="userData" [filter]="true"
                              [data-reader]="'response'" 
                              (onRowClick)="onSelectedUser($event)">
                  <ng-template #amexioBodyTmpl let-row="row">
                      <amexio-row>
                          <amexio-column [size]="8">
                              {{row.firstName}}&nbsp;{{row.lastName}}
                          </amexio-column>
                      </amexio-row>
                  </ng-template>
              </amexio-listbox>
          </amexio-body>
          <amexio-action>
              <amexio-button [label]="'New'" [icon]="'fa fa-plus fa-lg'" [type]="'secondary'" [size]="'default'" [tooltip]="'New'" (onClick)="openNewUi()">
              </amexio-button>
          </amexio-action>
      </amexio-card>
  </amexio-column>
  <amexio-column [size]=9>
      <ng-container *ngIf="showCard">
          <amexio-card [header]="true" [footer]="true" [body-height]="75" [footer-align]="'right'">
              <amexio-header>
                  User Creation
              </amexio-header>
              <amexio-body>
                 <amexio-row>
                          <amexio-column [size]="1">
                              <amexio-dropdown [(ngModel)]="userCreationModel.salutationId" [place-holder]="'Select'" name="userCreationModel.salutationId"
                                  [data-reader]="'response'" [error-msg]="'Select Title'" [field-label]="'Title'" [http-url]="'/api/user/salutationQuery/findAll'"
                                  [disabled]="fieldDisableFlag" [http-method]="'get'" [display-field]="'label'" [value-field]="'salutationId'">
                              </amexio-dropdown>
                          </amexio-column>

                          <amexio-column [size]="4">
                              <amexio-text-input field-label="First Name" [disabled]="fieldDisableFlag" name="userCreationModel.firstName" place-holder="Enter First Name"
                                [enable-popover]="true" allow-blank="false" error-msg="Please Enter First Name" min-length="1" min-error-msg="Minimum 1 char required"
                             max-length="128" max-error-msg="Maximum 128 char allowed"
                                  [(ngModel)]="userCreationModel.firstName" icon-feedback="true">
                              </amexio-text-input>
                          </amexio-column>

                          <amexio-column [size]="3">
                              <amexio-text-input field-label="Middle Name" [disabled]="fieldDisableFlag" name="userCreationModel.middleName" place-holder="Enter Middle Name"
                        allow-blank="false"   [enable-popover]="true" error-msg="Please Enter Middle Name" min-length="1" min-error-msg="Minimum 1 char required"
                              max-length="128" max-error-msg="Maximum 128 char allowed"   
                              [(ngModel)]="userCreationModel.middleName" icon-feedback="true">
                              </amexio-text-input>
                          </amexio-column>

                          <amexio-column [size]="4">
                              <amexio-text-input field-label="Last Name" [disabled]="fieldDisableFlag" name="userCreationModel.lastName" place-holder="Enter Last Name"
                                [enable-popover]="true" allow-blank="false" error-msg="Please Enter Last Name" min-length="1" min-error-msg="Minimum 1 char required"
                              max-length="128" max-error-msg="Maximum 128 char allowed"   
                              [(ngModel)]="userCreationModel.lastName" icon-feedback="true">
                              </amexio-text-input>
                          </amexio-column>

                          <amexio-column [size]="6">
                              <amexio-radio-group [field-label]="'Gender'" [disabled]="fieldDisableFlag" name="Gender" [allow-blank]="false" [data-reader]="'response'" [display-field]="'label'"
                                  [value-field]="'genderId'" [http-url]="'/api/user/genderQuery/findAll'" [http-method]="'get'"
                                  [horizontal]="true" [default-value]="userCreationModel.genderId" (onSelection)="setGender($event)">
                              </amexio-radio-group>
                          </amexio-column>

                          <amexio-column [size]="6">
                              <amexio-date-time-picker [field-label]="'Date Of Birth'" [time-picker]="false" [date-picker]="true"
                                 [required]="false"  [(ngModel)]="userCreationModel.dateOfBirth">
                              </amexio-date-time-picker>
                          </amexio-column>

                          <ng-container *ngIf="hiddenflag">
                              <amexio-column [size]="6">
                                  <amexio-text-input field-label="Login ID" name="userCreationModel.loginId" place-holder="Enter Login ID" [(ngModel)]="userCreationModel.loginId"
                                  [allow-blank]="false" [error-msg]="'Please Enter Login Id'" min-length="4" min-error-msg="Minimum 4 char required"
                                   max-length="128" max-error-msg="Maximum 128 char allowed" [enable-popover]="true"    icon-feedback="true">
                                  </amexio-text-input>
                              </amexio-column>

                              <amexio-column [size]="6">
                                  <amexio-text-input field-label="Confirm Login ID" name="userCreationModel.confirmLoginId" place-holder="Confirm Login ID"
                                  [allow-blank]="false" min-length="4" min-error-msg="Minimum 4 char required" max-length="128" max-error-msg="Maximum 128 char allowed"
                                  [error-msg]="'Please Enter Confirm Login Id'" [enable-popover]="true"    [(ngModel)]="userCreationModel.confirmLoginId" (onBlur)="onConfirmLoginId()" icon-feedback="true">
                                  </amexio-text-input>
                              </amexio-column>
                          </ng-container>


                          <amexio-column [size]="12">

                              <amexio-row>
                                  <amexio-column [size]=6>
                                      <amexio-number-input [enable-popover]="true" [field-label]="'Phone Number'" [place-holder]="'Enter Primary Phone Number'"
                                          [disabled]="fieldDisableFlag" [allow-blank]="false" [error-msg]="'Enter valid  Phone Number'"
                                           [(ngModel)]="userCreationModel.phoneNumber"
                                          [icon-feedback]="true">
                                      </amexio-number-input>
                                  </amexio-column>

                                  <amexio-column [size]=6>
                                      <amexio-email-input [field-label]="'Email'" name="userCreationModel.emailId" [place-holder]="'Enter Primary Email'" [allow-blank]="false"
                                          [disabled]="fieldDisableFlag" [error-msg]="'Enter primary Valid Email Id'" [enable-popover]="true"
                                          [(ngModel)]="userCreationModel.emailId" [icon-feedback]="true">
                                      </amexio-email-input>
                                  </amexio-column>
                              </amexio-row>
                          </amexio-column>
                  </amexio-row>
              </amexio-body>
              <amexio-action>
                  <amexio-button [label]="'Cancel'" [icon]="'fa fa-close'" [disabled]="disabledflag" [type]="'secondary'" [size]="'default'" [tooltip]="'Cancel'"
                      (onClick)="clearData()">
                  </amexio-button>
                  <amexio-button [label]="'Save'" [icon]="'fa fa-save'" [disabled]="disabledflag" [loading]="saveFlag" [type]="'primary'" [size]="'default'" [tooltip]="'Save'"
                      (onClick)="saveClick()">
                  </amexio-button>
              </amexio-action>
          </amexio-card>
      </ng-container>
      <ng-container *ngIf="!showCard">
          <amexio-card [header]="true" [footer]="false" [show]="true" [footer-align]="'right'" [body-height]="75">
              <amexio-header>
                  Help Document
              </amexio-header>
              <amexio-body>
              </amexio-body>
          </amexio-card>
      </ng-container>
   <app-notification></app-notification>

  </amexio-column>
</amexio-row>
<amexio-dialogue [show-dialogue]="isValidateForm" [message-type]="'error'" [closable]="true" [title]="'Error'" [type]="'alert'"
  [custom]="true" (close)="isValidateForm = !isValidateForm">
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
  `
})
export class UserCreationComponent implements OnInit {
  userCreationModel: UserCreationModel;
  isPrimaryFlag: boolean;
  msgData: any[];
  validationMsgArray: any = [];
  isValidateForm: boolean = false;
  saveFlag: boolean;
  userData: any;
  showCard: boolean;
  disabledflag: boolean;
  hiddenflag: boolean;
  fieldDisableFlag: boolean;

  constructor(
    public loaderService: LoaderService,
    public _notificationService: NotificationService,
    private http: HttpClient
  ) {
    this.isPrimaryFlag = true;
    this.hiddenflag = false;
    this.fieldDisableFlag = false;
    this.userCreationModel = new UserCreationModel();
    this.msgData = [];
    this.getUserData();
    this.showCard = false;
  }

  ngOnInit() {}

  //To Set Gender
  setGender(genderData: any) {
    this.userCreationModel.genderId = genderData.genderId;
  }

  // To Close Window
  okErrorBtnClick() {
    this.isValidateForm = false;
    this.validationMsgArray = [];
  }

  createInvalidCompErrorData() {
    let errorData: any[] = [];
    let errorObj: any = {};
    errorObj['data'] = [];
    errorObj.data = this.validationMsgArray;
    errorData.push(errorObj);
    this._notificationService.showerrorData('Invalid Component', errorData);
  }

  createErrorData() {
    let errorData: any[] = [];
    let errorObj: any = {};
    errorObj['data'] = [];
    errorObj.data = this.validationMsgArray;
    errorData.push(errorObj);
    this._notificationService.showerrorData('Error Message', errorData);
  }

  //To get the list of Users
  getUserData() {
    let userResponse: any;
    this.http.get('/api/user/person/findAllUsers').subscribe(
      response => {
        userResponse = response;
      },
      err => {
        this.validationMsgArray.push('Unable to connect to server');
        // this.isValidateForm = true;
        this.createErrorData();
      },
      () => {
        if (userResponse.success) {
          this.userData = userResponse;
        } else {
          this.validationMsgArray.push(userResponse.errorMessage);
          // this.isValidateForm = true;
          this.createErrorData();
        }
      }
    );
  }
  onConfirmLoginId() {
    this.msgData = [];
    if (
      this.userCreationModel.loginId == this.userCreationModel.confirmLoginId
    ) {
      return true;
    }
    this._notificationService.setWarningData('Login Ids does not match');
  }

  //Create user Method
  createUser() {
    let response: any;
    this.saveFlag = true;
    this.msgData = [];
    this.loaderService.showLoader();
    const requestJson = this.userCreationModel;
    this.http.post('/api/user/person/createUser', requestJson).subscribe(
      res => {
        response = res;
      },
      err => {
        this.validationMsgArray.push('Unable to connect to server');
        // this.isValidateForm = true;
        this.createErrorData();
        this.saveFlag = false;
        this.loaderService.hideLoader();
      },
      () => {
        if (response.success) {
          this._notificationService.setSuccessData(response.successMessage);
          this.getUserData();
          this.clearData();
          this.showCard = false;
          this.showCard = true;
          this.saveFlag = false;
          this.loaderService.hideLoader();
        } else {
          // this.isValidateForm = true;
          this.validationMsgArray.push(response.errorMessage);
          this.createErrorData();
          this.saveFlag = false;
          this.loaderService.hideLoader();
        }
      }
    );
  }

  onSelectedUser(data: any) {
    let usersData: any;
    this.http
      .get('/api/user/person/findUserByPersonId?personUUID=' + data.personUUID)
      .subscribe(
        response => {
          data = response;
        },
        err => {
          this.validationMsgArray.push('Unable to connect to server');
          // this.isValidateForm = true;
          this.createErrorData();
        },
        () => {
          this.userCreationModel = data.response;
          this.hiddenflag = false;
          this.showCard = true;
          this.fieldDisableFlag = true;
          this.disabledflag = true;
        }
      );
  }

  //Contraint Validation Method
  saveAndValidateUser() {
    if (this.onConfirmLoginId()) {
      let validatData: any;
      const requestJson = {
        loginId: this.userCreationModel.loginId,
        emailId: this.userCreationModel.emailId,
        phoneNumber: this.userCreationModel.phoneNumber
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
            // this.isValidateForm = true;\
            this.createErrorData();
          },
          () => {
            if (!validatData.success) {
              this.validationMsgArray.push(validatData.errorMessage);
              this.createErrorData();
              // this.isValidateForm = true;
            } else {
              this.createUser();
            }
          }
        );
    }
  }

  //To Reset Data
  clearData() {
    this.userCreationModel = new UserCreationModel();
  }

  //OPEN NEW MODEL DEFINITION UI
  openNewUi() {
    this.showCard = true;
    this.fieldDisableFlag = false;
    this.disabledflag = false;
    this.hiddenflag = true;
    this.userCreationModel = new UserCreationModel();
  }

  // Save Button Click
  saveClick() {
    this.validateFormFields();
    if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
      // this.isValidateForm = true;
      this.createInvalidCompErrorData();
    } else {
      // this.isValidateForm = false;
      this.saveAndValidateUser();
    }
  }

  //Validate Form Fields
  validateFormFields() {
    let isValid: boolean = false;
    this.validationMsgArray = [];
    if (this.userCreationModel.salutationId == '') {
      this.validationMsgArray.push('Select  Title.');
    }
    if (this.userCreationModel.firstName == '') {
      this.validationMsgArray.push('Please Enter First Name.');
    }
    if (this.userCreationModel.middleName == '') {
      this.validationMsgArray.push('Please Enter Middle Name.');
    }
    if (this.userCreationModel.lastName == '') {
      this.validationMsgArray.push('Please Enter Last Name.');
    }
    if (this.userCreationModel.dateOfBirth == '') {
      this.validationMsgArray.push('Please Enter Date Of Birth.');
    }
    if (this.userCreationModel.genderId == '') {
      this.validationMsgArray.push('Please Select Gender.');
    }
    if (this.userCreationModel.loginId == '') {
      this.validationMsgArray.push('Please Enter Valid Login Id.');
    }
    if (this.userCreationModel.emailId == '') {
      this.validationMsgArray.push('Please Enter Valid Email Id.');
    }

    if (this.userCreationModel.phoneNumber == '') {
      this.validationMsgArray.push('Please Enter Phone Number.');
    } else {
      this.validateMobileNumber();
    }
    if (this.userCreationModel.loginId) {
      let trimmedLoginId = this.userCreationModel.loginId.replace(/\s/g, '');
      if (this.userCreationModel.loginId != trimmedLoginId) {
        this.validationMsgArray.push(
          'Invalid Login id, white spaces are not allowed!'
        );
      }
    }
  }

  validateMobileNumber() {
    let number = this.userCreationModel.phoneNumber;
    let numberStr = number + '';
    if ((numberStr && numberStr.length > 15) || numberStr.length < 7) {
      this.validationMsgArray.push(
        'Phone Number must be  7 to 15 digits, country code may required'
      );
    }
  }
}
// tslint:disable-next-line:class-name

export class UserCreationModel {
  salutationId: any;
  firstName: string;
  middleName: string;
  lastName: string;
  emailId: string;
  phoneNumber: any;
  genderId: any;
  dateOfBirth: any;
  loginId: string;
  confirmLoginId: string;

  constructor() {
    this.salutationId = '';
    this.firstName = '';
    this.middleName = '';
    this.lastName = '';
    this.dateOfBirth = '';
    this.genderId = 1;
    this.emailId = '';
    this.phoneNumber = '';
    this.loginId = '';
    this.confirmLoginId = '';
  }
}
