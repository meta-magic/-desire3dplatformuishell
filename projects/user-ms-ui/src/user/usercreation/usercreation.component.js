"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
/**
 * Created by pratik on 15/2/18.
 */
var core_1 = require("@angular/core");
var UserCreationComponent = (function () {
    function UserCreationComponent(cookieService, loaderService, _notificationService, http) {
        this.cookieService = cookieService;
        this.loaderService = loaderService;
        this._notificationService = _notificationService;
        this.http = http;
        this.validationMsgArray = [];
        this.isValidateForm = false;
        this.isPrimaryFlag = true;
        this.hiddenflag = false;
        this.fieldDisableFlag = false;
        this.userCreationModel = new UserCreationModel();
        this.msgData = [];
        this.getUserData();
        this.showCard = false;
    }
    UserCreationComponent.prototype.ngOnInit = function () { };
    //To Set Gender
    UserCreationComponent.prototype.setGender = function (genderData) {
        this.userCreationModel.genderId = genderData.genderId;
    };
    // To Close Window
    UserCreationComponent.prototype.okErrorBtnClick = function () {
        this.isValidateForm = false;
        this.validationMsgArray = [];
    };
    UserCreationComponent.prototype.createInvalidCompErrorData = function () {
        var errorData = [];
        var errorObj = {};
        errorObj['data'] = [];
        errorObj.data = this.validationMsgArray;
        errorData.push(errorObj);
        this._notificationService.showerrorData('Invalid Component', errorData);
    };
    UserCreationComponent.prototype.createErrorData = function () {
        var errorData = [];
        var errorObj = {};
        errorObj['data'] = [];
        errorObj.data = this.validationMsgArray;
        errorData.push(errorObj);
        this._notificationService.showerrorData('Error Message', errorData);
    };
    //To get the list of Users
    UserCreationComponent.prototype.getUserData = function () {
        var _this = this;
        var userResponse;
        this.http.get('/api/user/person/findAllUsers').subscribe(function (response) {
            userResponse = response;
        }, function (err) {
            _this.validationMsgArray.push('Unable to connect to server');
            // this.isValidateForm = true;
            _this.createErrorData();
        }, function () {
            if (userResponse.success) {
                _this.userData = userResponse;
            }
            else {
                _this.validationMsgArray.push(userResponse.errorMessage);
                // this.isValidateForm = true;
                _this.createErrorData();
            }
        });
    };
    UserCreationComponent.prototype.onConfirmLoginId = function () {
        this.msgData = [];
        if (this.userCreationModel.loginId == this.userCreationModel.confirmLoginId) {
            return true;
        }
        this.msgData.push('Login Ids does not match');
        // this.isValidateForm = true;
        this._notificationService.showWarningData(this.msgData);
    };
    //Create user Method
    UserCreationComponent.prototype.createUser = function () {
        var _this = this;
        var response;
        this.saveFlag = true;
        this.msgData = [];
        this.loaderService.showLoader();
        var requestJson = this.userCreationModel;
        this.http.post('/api/user/person/createUser', requestJson).subscribe(function (res) {
            response = res;
        }, function (err) {
            _this.validationMsgArray.push('Unable to connect to server');
            // this.isValidateForm = true;
            _this.createErrorData();
            _this.saveFlag = false;
            _this.loaderService.hideLoader();
        }, function () {
            if (response.success) {
                _this.msgData.push(response.successMessage);
                _this._notificationService.showSuccessData(_this.msgData);
                _this.getUserData();
                _this.clearData();
                _this.showCard = false;
                _this.showCard = true;
                _this.saveFlag = false;
                _this.loaderService.hideLoader();
            }
            else {
                // this.isValidateForm = true;
                _this.validationMsgArray.push(response.errorMessage);
                _this.createErrorData();
                _this.saveFlag = false;
                _this.loaderService.hideLoader();
            }
        });
    };
    UserCreationComponent.prototype.onSelectedUser = function (data) {
        var _this = this;
        var usersData;
        this.http
            .get('/api/user/person/findUserByPersonId?personUUID=' + data.personUUID)
            .subscribe(function (response) {
            data = response;
        }, function (err) {
            _this.validationMsgArray.push('Unable to connect to server');
            // this.isValidateForm = true;
            _this.createErrorData();
        }, function () {
            _this.userCreationModel = data.response;
            _this.hiddenflag = false;
            _this.showCard = true;
            _this.fieldDisableFlag = true;
            _this.disabledflag = true;
        });
    };
    //Contraint Validation Method
    UserCreationComponent.prototype.saveAndValidateUser = function () {
        var _this = this;
        if (this.onConfirmLoginId()) {
            var validatData_1;
            var requestJson = {
                loginId: this.userCreationModel.loginId,
                emailId: this.userCreationModel.emailId,
                phoneNumber: this.userCreationModel.phoneNumber
            };
            this.http
                .post('/api/user/insecure/UserConstraintQuery/checkConstraints', requestJson)
                .subscribe(function (response) {
                validatData_1 = response;
            }, function (err) {
                _this.validationMsgArray.push('Unable to connect to server');
                // this.isValidateForm = true;\
                _this.createErrorData();
            }, function () {
                if (!validatData_1.success) {
                    _this.validationMsgArray.push(validatData_1.errorMessage);
                    _this.createErrorData();
                    // this.isValidateForm = true;
                }
                else {
                    _this.createUser();
                }
            });
        }
    };
    //To Reset Data
    UserCreationComponent.prototype.clearData = function () {
        this.userCreationModel = new UserCreationModel();
    };
    //OPEN NEW MODEL DEFINITION UI
    UserCreationComponent.prototype.openNewUi = function () {
        this.showCard = true;
        this.fieldDisableFlag = false;
        this.disabledflag = false;
        this.hiddenflag = true;
        this.userCreationModel = new UserCreationModel();
    };
    // Save Button Click
    UserCreationComponent.prototype.saveClick = function () {
        this.validateFormFields();
        if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
            // this.isValidateForm = true;
            this.createInvalidCompErrorData();
        }
        else {
            // this.isValidateForm = false;
            this.saveAndValidateUser();
        }
    };
    //Validate Form Fields
    UserCreationComponent.prototype.validateFormFields = function () {
        var isValid = false;
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
        }
        else {
            this.validateMobileNumber();
        }
        if (this.userCreationModel.loginId) {
            var trimmedLoginId = this.userCreationModel.loginId.replace(/\s/g, '');
            if (this.userCreationModel.loginId != trimmedLoginId) {
                this.validationMsgArray.push('Invalid Login id, white spaces are not allowed!');
            }
        }
    };
    UserCreationComponent.prototype.validateMobileNumber = function () {
        var number = this.userCreationModel.phoneNumber;
        var numberStr = number + '';
        if ((numberStr && numberStr.length > 15) || numberStr.length < 7) {
            this.validationMsgArray.push('Phone Number must be  7 to 15 digits, country code may required');
        }
    };
    return UserCreationComponent;
}());
UserCreationComponent = __decorate([
    core_1.Component({
        selector: 'usercreation',
        template: "\n       <div class=\"loadingnav\" *ngIf=\"loaderService.isLoading\"></div>\n  <amexio-row>\n  <amexio-column [size]=3>\n      <amexio-card [header]=\"false\" [footer]=\"true\" [show]=\"true\" [body-height]=\"77\" [footer-align]=\"'right'\">\n          <amexio-body  [padding]=\"'0px'\">\n              <amexio-listbox [enable-checkbox]=\"false\" \n                             [header]=\"'Users'\" \n                             [search-placeholder]=\"'Search'\" \n                             [data]=\"userData\" [filter]=\"true\"\n                              [data-reader]=\"'response'\" \n                              (onRowClick)=\"onSelectedUser($event)\">\n                  <ng-template #amexioBodyTmpl let-row=\"row\">\n                      <amexio-row>\n                          <amexio-column [size]=\"8\">\n                              {{row.firstName}}&nbsp;{{row.lastName}}\n                          </amexio-column>\n                      </amexio-row>\n                  </ng-template>\n              </amexio-listbox>\n          </amexio-body>\n          <amexio-action>\n              <amexio-button [label]=\"'New'\" [icon]=\"'fa fa-plus fa-lg'\" [type]=\"'secondary'\" [size]=\"'default'\" [tooltip]=\"'New'\" (onClick)=\"openNewUi()\">\n              </amexio-button>\n          </amexio-action>\n      </amexio-card>\n  </amexio-column>\n  <amexio-column [size]=9>\n      <ng-container *ngIf=\"showCard\">\n          <amexio-card [header]=\"true\" [footer]=\"true\" [body-height]=\"75\" [footer-align]=\"'right'\">\n              <amexio-header>\n                  User Creation\n              </amexio-header>\n              <amexio-body>\n                 <amexio-row>\n                          <amexio-column [size]=\"1\">\n                              <amexio-dropdown [(ngModel)]=\"userCreationModel.salutationId\" [place-holder]=\"'Select'\" name=\"userCreationModel.salutationId\"\n                                  [data-reader]=\"'response'\" [error-msg]=\"'Select Title'\" [field-label]=\"'Title'\" [http-url]=\"'/api/user/salutationQuery/findAll'\"\n                                  [disabled]=\"fieldDisableFlag\" [http-method]=\"'get'\" [display-field]=\"'label'\" [value-field]=\"'salutationId'\">\n                              </amexio-dropdown>\n                          </amexio-column>\n\n                          <amexio-column [size]=\"4\">\n                              <amexio-text-input field-label=\"First Name\" [disabled]=\"fieldDisableFlag\" name=\"userCreationModel.firstName\" place-holder=\"Enter First Name\"\n                                [enable-popover]=\"true\" allow-blank=\"false\" error-msg=\"Please Enter First Name\" min-length=\"1\" min-error-msg=\"Minimum 1 char required\"\n                             max-length=\"128\" max-error-msg=\"Maximum 128 char allowed\"\n                                  [(ngModel)]=\"userCreationModel.firstName\" icon-feedback=\"true\">\n                              </amexio-text-input>\n                          </amexio-column>\n\n                          <amexio-column [size]=\"3\">\n                              <amexio-text-input field-label=\"Middle Name\" [disabled]=\"fieldDisableFlag\" name=\"userCreationModel.middleName\" place-holder=\"Enter Middle Name\"\n                        allow-blank=\"false\"   [enable-popover]=\"true\" error-msg=\"Please Enter Middle Name\" min-length=\"1\" min-error-msg=\"Minimum 1 char required\"\n                              max-length=\"128\" max-error-msg=\"Maximum 128 char allowed\"   \n                              [(ngModel)]=\"userCreationModel.middleName\" icon-feedback=\"true\">\n                              </amexio-text-input>\n                          </amexio-column>\n\n                          <amexio-column [size]=\"4\">\n                              <amexio-text-input field-label=\"Last Name\" [disabled]=\"fieldDisableFlag\" name=\"userCreationModel.lastName\" place-holder=\"Enter Last Name\"\n                                [enable-popover]=\"true\" allow-blank=\"false\" error-msg=\"Please Enter Last Name\" min-length=\"1\" min-error-msg=\"Minimum 1 char required\"\n                              max-length=\"128\" max-error-msg=\"Maximum 128 char allowed\"   \n                              [(ngModel)]=\"userCreationModel.lastName\" icon-feedback=\"true\">\n                              </amexio-text-input>\n                          </amexio-column>\n\n                          <amexio-column [size]=\"6\">\n                              <amexio-radio-group [field-label]=\"'Gender'\" [disabled]=\"fieldDisableFlag\" name=\"Gender\" [allow-blank]=\"false\" [data-reader]=\"'response'\" [display-field]=\"'label'\"\n                                  [value-field]=\"'genderId'\" [http-url]=\"'/api/user/genderQuery/findAll'\" [http-method]=\"'get'\"\n                                  [horizontal]=\"true\" [default-value]=\"userCreationModel.genderId\" (onSelection)=\"setGender($event)\">\n                              </amexio-radio-group>\n                          </amexio-column>\n\n                          <amexio-column [size]=\"6\">\n                              <amexio-date-time-picker [field-label]=\"'Date Of Birth'\" [time-picker]=\"false\" [date-picker]=\"true\"\n                                 [required]=\"false\"  [(ngModel)]=\"userCreationModel.dateOfBirth\">\n                              </amexio-date-time-picker>\n                          </amexio-column>\n\n                          <ng-container *ngIf=\"hiddenflag\">\n                              <amexio-column [size]=\"6\">\n                                  <amexio-text-input field-label=\"Login ID\" name=\"userCreationModel.loginId\" place-holder=\"Enter Login ID\" [(ngModel)]=\"userCreationModel.loginId\"\n                                  [allow-blank]=\"false\" [error-msg]=\"'Please Enter Login Id'\" min-length=\"4\" min-error-msg=\"Minimum 4 char required\"\n                                   max-length=\"128\" max-error-msg=\"Maximum 128 char allowed\" [enable-popover]=\"true\"    icon-feedback=\"true\">\n                                  </amexio-text-input>\n                              </amexio-column>\n\n                              <amexio-column [size]=\"6\">\n                                  <amexio-text-input field-label=\"Confirm Login ID\" name=\"userCreationModel.confirmLoginId\" place-holder=\"Confirm Login ID\"\n                                  [allow-blank]=\"false\" min-length=\"4\" min-error-msg=\"Minimum 4 char required\" max-length=\"128\" max-error-msg=\"Maximum 128 char allowed\"\n                                  [error-msg]=\"'Please Enter Confirm Login Id'\" [enable-popover]=\"true\"    [(ngModel)]=\"userCreationModel.confirmLoginId\" (onBlur)=\"onConfirmLoginId()\" icon-feedback=\"true\">\n                                  </amexio-text-input>\n                              </amexio-column>\n                          </ng-container>\n\n\n                          <amexio-column [size]=\"12\">\n\n                              <amexio-row>\n                                  <amexio-column [size]=6>\n                                      <amexio-number-input [enable-popover]=\"true\" [field-label]=\"'Phone Number'\" [place-holder]=\"'Enter Primary Phone Number'\"\n                                          [disabled]=\"fieldDisableFlag\" [allow-blank]=\"false\" [error-msg]=\"'Enter valid  Phone Number'\"\n                                           [(ngModel)]=\"userCreationModel.phoneNumber\"\n                                          [icon-feedback]=\"true\">\n                                      </amexio-number-input>\n                                  </amexio-column>\n\n                                  <amexio-column [size]=6>\n                                      <amexio-email-input [field-label]=\"'Email'\" name=\"userCreationModel.emailId\" [place-holder]=\"'Enter Primary Email'\" [allow-blank]=\"false\"\n                                          [disabled]=\"fieldDisableFlag\" [error-msg]=\"'Enter primary Valid Email Id'\" [enable-popover]=\"true\"\n                                          [(ngModel)]=\"userCreationModel.emailId\" [icon-feedback]=\"true\">\n                                      </amexio-email-input>\n                                  </amexio-column>\n                              </amexio-row>\n                          </amexio-column>\n                  </amexio-row>\n              </amexio-body>\n              <amexio-action>\n                  <amexio-button [label]=\"'Cancel'\" [icon]=\"'fa fa-close'\" [disabled]=\"disabledflag\" [type]=\"'secondary'\" [size]=\"'default'\" [tooltip]=\"'Cancel'\"\n                      (onClick)=\"clearData()\">\n                  </amexio-button>\n                  <amexio-button [label]=\"'Save'\" [icon]=\"'fa fa-save'\" [disabled]=\"disabledflag\" [loading]=\"saveFlag\" [type]=\"'primary'\" [size]=\"'default'\" [tooltip]=\"'Save'\"\n                      (onClick)=\"saveClick()\">\n                  </amexio-button>\n              </amexio-action>\n          </amexio-card>\n      </ng-container>\n      <ng-container *ngIf=\"!showCard\">\n          <amexio-card [header]=\"true\" [footer]=\"false\" [show]=\"true\" [footer-align]=\"'right'\" [body-height]=\"75\">\n              <amexio-header>\n                  Help Document\n              </amexio-header>\n              <amexio-body>\n              </amexio-body>\n          </amexio-card>\n      </ng-container>\n   <app-notification></app-notification>\n\n  </amexio-column>\n</amexio-row>\n<amexio-dialogue [show-dialogue]=\"isValidateForm\" [message-type]=\"'error'\" [closable]=\"true\" [title]=\"'Error'\" [type]=\"'alert'\"\n  [custom]=\"true\" (close)=\"isValidateForm = !isValidateForm\">\n  <amexio-body>\n      <ol>\n          <li *ngFor=\"let msgObj of validationMsgArray let index=index\">{{msgObj}}</li>\n      </ol>\n  </amexio-body>\n  <amexio-action>\n      <amexio-button type=\"primary\" (onClick)=\"okErrorBtnClick()\" [label]=\"'Ok'\">\n      </amexio-button>\n  </amexio-action>\n</amexio-dialogue>\n  "
    })
], UserCreationComponent);
exports.UserCreationComponent = UserCreationComponent;
// tslint:disable-next-line:class-name
var UserCreationModel = (function () {
    function UserCreationModel() {
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
    return UserCreationModel;
}());
exports.UserCreationModel = UserCreationModel;
