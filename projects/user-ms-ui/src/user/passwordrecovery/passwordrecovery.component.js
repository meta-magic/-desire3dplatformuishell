"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
/**
 * Created by Ashwini on 20/2/18.
 */
var core_1 = require("@angular/core");
var PasswordrecoveryComponent = (function () {
    function PasswordrecoveryComponent(http, cookieService) {
        this.http = http;
        this.cookieService = cookieService;
        this.asyncFlag = false;
        this.validationMsgArray = [];
        this.isValidateForm = false;
        this.loginDisableFlag = false;
        this.showcard = false;
        this.messageArray = [];
        this.passwordModel = new PasswordRecoveryModel();
    }
    PasswordrecoveryComponent.prototype.onConfirmLoginChange = function (data) {
        if (this.passwordModel.newPassword == this.passwordModel.confirmPassword) {
            return true;
        }
        this.messageArray.push('Passwords dont match');
    };
    PasswordrecoveryComponent.prototype.onValidate = function () {
        this.validateFormFields(1);
        if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
            this.isValidateForm = true;
            return;
        }
        else {
            this.isValidateForm = false;
            this.sendToken();
        }
    };
    PasswordrecoveryComponent.prototype.sendToken = function () {
        var _this = this;
        if (this.passwordModel.loginId == null) {
            this.validationMsgArray.push('Please Enter Valid Login Id');
            this.isValidateForm = true;
        }
        else {
            this.asyncFlag = true;
            this.showcard = false;
            var tokenresponse_1;
            var requestJson = {
                loginId: this.passwordModel.loginId
            };
            this.http
                .post('/api/auth/ForgotPasswordAPI/sendRecoveryToken', requestJson)
                .subscribe(function (res) {
                tokenresponse_1 = res;
            }, function (err) {
                _this.validationMsgArray.push('Unable to connect to server');
                _this.isValidateForm = true;
                _this.asyncFlag = false;
            }, function () {
                if (tokenresponse_1.success) {
                    _this.showcard = true;
                    _this.loginDisableFlag = true;
                    _this.asyncFlag = false;
                    _this.messageArray.push(tokenresponse_1.successMessage);
                }
                else {
                    _this.validationMsgArray.push(tokenresponse_1.errorMessage);
                    _this.isValidateForm = true;
                    _this.asyncFlag = false;
                }
            });
        }
    };
    PasswordrecoveryComponent.prototype.validateFormFields = function (num) {
        if (num == 1) {
            debugger;
            var isValid = false;
            this.validationMsgArray = [];
            if (this.passwordModel.loginId == null ||
                this.passwordModel.loginId == '') {
                this.validationMsgArray.push('Invalid (Blank) Login Id.');
            }
        }
        else if (num == 2) {
            if (this.passwordModel.token == null || this.passwordModel.token == '') {
                this.validationMsgArray.push('Invalid (Blank) Token.');
            }
            if (this.passwordModel.newPassword == null ||
                this.passwordModel.newPassword == '') {
                this.validationMsgArray.push('Invalid (Blank) New Password.');
            }
        }
    };
    // To Close Window
    PasswordrecoveryComponent.prototype.okErrorBtnClick = function () {
        this.isValidateForm = false;
        this.validationMsgArray = [];
    };
    PasswordrecoveryComponent.prototype.onConfirmPassword = function () {
        if (this.passwordModel.newPassword == this.passwordModel.confirmPassword) {
            return true;
        }
        this.messageArray.push('Passwords dont match');
    };
    PasswordrecoveryComponent.prototype.onSubmit = function () {
        this.validateFormFields(2);
        if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
            this.isValidateForm = true;
            return;
        }
        else {
            this.isValidateForm = false;
            this.forgotPassword();
        }
    };
    PasswordrecoveryComponent.prototype.forgotPassword = function () {
        var _this = this;
        if (this.onConfirmPassword()) {
            this.asyncFlag = true;
            var response_1;
            var requestJson = {
                loginId: this.passwordModel.loginId,
                token: this.passwordModel.token,
                newPassword: this.passwordModel.newPassword
            };
            this.http
                .post('/api/auth/ForgotPasswordAPI/forgotPassword', requestJson)
                .subscribe(function (res) {
                response_1 = res;
            }, function (err) {
                _this.validationMsgArray.push('Unable to connect to server');
                _this.isValidateForm = true;
                _this.asyncFlag = false;
            }, function () {
                if (response_1.success) {
                    _this.messageArray.push(response_1.successMessage);
                    _this.asyncFlag = false;
                    //   this._route.navigate(['login']);
                }
                else {
                    _this.validationMsgArray.push(response_1.errorMessage);
                    _this.isValidateForm = true;
                    _this.asyncFlag = false;
                }
            });
        }
    };
    PasswordrecoveryComponent.prototype.ngOnInit = function () { };
    return PasswordrecoveryComponent;
}());
PasswordrecoveryComponent = __decorate([
    core_1.Component({
        selector: 'password-recovery',
        template: "\n<amexio-row>\n  <amexio-column [size]=\"3\"></amexio-column>\n  <amexio-column [size]=\"6\">\n      <amexio-card [show]=\"true\" [footer]=\"true\" [header] = \"true\">\n        <amexio-header>\n          Forgot Password\n        </amexio-header>\n        <amexio-body>\n          <amexio-row>\n            <amexio-column [size]=\"12\" >\n              <amexio-text-input [field-label]=\"'Login Id'\" name =\"passwordModel.loginId\"\n                  [place-holder]=\"'Enter Login ID'\"\n                  [allow-blank]=\"false\"\n                  [error-msg]=\"'Please Enter Login Id'\" \n                  [enable-popover]=\"true\" \n                  [icon-feedback]=\"true\"\n                  [disabled]=\"loginDisableFlag\"\n                  [(ngModel)]=\"passwordModel.loginId\">\n             </amexio-text-input>\n             <ng-container *ngIf=\"showcard\">\n             <amexio-text-input [field-label]=\"'Token '\" name =\"passwordModel.token\"\n                  [place-holder]=\"'Enter Token'\"\n                  [allow-blank]=\"false\"\n                  [error-msg] =\"'Enter Token'\"\n                  [icon-feedback]=\"true\"\n                  [(ngModel)]=\"passwordModel.token\">\n             </amexio-text-input>  \n              <amexio-password-input\n                [field-label]=\"' New Password'\" name=\"passwordModel.newPassword\"\n                [place-holder]=\"' Password'\"\n                [enable-popover]=\"true\"\n                [allow-blank]=\"false\" \n                [error-msg] =\"'Please Enter Valid Password'\"\n                [min-length]=\"6\" \n                [min-error-msg]=\"'Minimum 6 char required'\"\n                [max-length]=\"32\"  \n                [max-error-msg]=\"'Maximum 32 char allowed'\"\n                [icon-feedback]=\"true\"\n                [(ngModel)]=\"passwordModel.newPassword\">\n            </amexio-password-input>\n            <amexio-password-input\n                [field-label]=\"'Confirm Password'\" name=\"passwordModel.confirmPassword\"\n                [place-holder]=\"'Confirm New Password'\"\n                [enable-popover]=\"true\"\n                [allow-blank]=\"false\" \n                [error-msg] =\"'Please Confirm New Password'\"\n                [icon-feedback]=\"true\"\n                [(ngModel)]=\"passwordModel.confirmPassword\"\n                (onBlur)=\"onConfirmLoginChange($event)\">\n            </amexio-password-input>\n            </ng-container>\n            </amexio-column>\n          </amexio-row>\n        </amexio-body>\n        <br /><br /><br /><br />\n        <amexio-action>\n    <ng-container *ngIf=\"!showcard\">    \n    <amexio-button [label]=\"'Send Token'\" [type]=\"'primary'\" [tooltip]=\"'Send Token'\" [loading]=\"asyncFlag\" (onClick)=\"onValidate()\"></amexio-button>\n     </ng-container>\n    <ng-container *ngIf=\"showcard\">\n    <amexio-button [label]=\"'Submit'\" [type]=\"'primary'\" [tooltip]=\"'Submit'\" (onClick)=\"onSubmit()\"></amexio-button>\n    </ng-container>\n        \n        </amexio-action>\n      </amexio-card>\n  </amexio-column>\n  <amexio-column [size]=\"3\"></amexio-column>\n  <amexio-notification [data]=\"messageArray\" [vertical-position]=\"'top'\" [horizontal-position]=\"'right'\" [auto-dismiss-msg]=\"true\" [auto-dismiss-msg-interval]=\"4000\">\n        </amexio-notification>\n  <amexio-dialogue [show-dialogue]=\"isValidateForm\" [message-type]=\"'error'\" [closable]=\"false\" [title]=\"'Error'\" [type]=\"'alert'\" [custom]=\"true\">\n<amexio-body>\n    <ol>\n        <li *ngFor=\"let msgObj of validationMsgArray let index=index\">{{msgObj}}</li>\n    </ol>\n</amexio-body>\n<amexio-action>\n    <amexio-button type=\"primary\" (onClick)=\"okErrorBtnClick()\" [label]=\"'Ok'\">\n    </amexio-button>\n</amexio-action>\n</amexio-dialogue>      \n</amexio-row>\n\n "
    })
], PasswordrecoveryComponent);
exports.PasswordrecoveryComponent = PasswordrecoveryComponent;
var PasswordRecoveryModel = (function () {
    function PasswordRecoveryModel() {
        this.loginId = '';
        this.token = '';
        this.newPassword = '';
        this.confirmPassword = '';
    }
    return PasswordRecoveryModel;
}());
exports.PasswordRecoveryModel = PasswordRecoveryModel;
