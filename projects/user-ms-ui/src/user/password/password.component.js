"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var PasswordComponent = (function () {
    // isValidateForm: boolean = false;
    function PasswordComponent(cookieService, http, _notificationService, loaderService) {
        this.cookieService = cookieService;
        this.http = http;
        this._notificationService = _notificationService;
        this.loaderService = loaderService;
        this.asyncFlag = false;
        this.validationMsgArray = [];
        this.passwordModel = new PasswordModel();
        this.msgData = [];
    }
    PasswordComponent.prototype.ngOnInit = function () { };
    PasswordComponent.prototype.createErrorData = function () {
        var errorData = [];
        var errorObj = {};
        errorObj['data'] = [];
        errorObj.data = this.validationMsgArray;
        errorData.push(errorObj);
        this._notificationService.showerrorData('Error Message', errorData);
    };
    PasswordComponent.prototype.validateFormFields = function () {
        var isValid = false;
        this.validationMsgArray = [];
        if (this.passwordModel.currentPassword == null ||
            this.passwordModel.currentPassword == '') {
            this.validationMsgArray.push('Invalid (Blank) Current Password.');
        }
        if (this.passwordModel.newPassword == null ||
            this.passwordModel.newPassword == '') {
            this.validationMsgArray.push('Invalid (Blank) New Password.');
        }
    };
    //  To Close Window
    // okErrorBtnClick() {
    //   this.isValidateForm = false;
    //   this.validationMsgArray = [];
    // }
    PasswordComponent.prototype.onConfirmPassword = function () {
        this.msgData = [];
        if (this.passwordModel.newPassword == this.passwordModel.confirmPassword) {
            return true;
        }
        this.msgData.push('Passwords dont match');
        this._notificationService.showWarningData(this.msgData);
    };
    PasswordComponent.prototype.onChangePassword = function () {
        this.validateFormFields();
        if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
            // this.isValidateForm = true;
            // return;
            this.createErrorData();
        }
        else {
            // this.isValidateForm = false;
            this.changePassword();
        }
    };
    PasswordComponent.prototype.changePassword = function () {
        var _this = this;
        if (this.onConfirmPassword()) {
            this.asyncFlag = true;
            this.msgData = [];
            this.loaderService.showLoader();
            var response_1;
            var requestJson = {
                currentPassword: this.passwordModel.currentPassword,
                newPassword: this.passwordModel.newPassword
            };
            this.http
                .post('/api/auth/PasswordManagement/changePassword', requestJson)
                .subscribe(function (res) {
                response_1 = res;
            }, function (err) {
                _this.validationMsgArray.push('Unable to connect to server');
                // this.isValidateForm = true;
                _this.createErrorData();
                _this.asyncFlag = false;
                _this.loaderService.hideLoader();
            }, function () {
                if (response_1.success) {
                    _this.msgData.push(response_1.successMessage);
                    _this._notificationService.showSuccessData(_this.msgData);
                    _this.reset();
                    _this.asyncFlag = false;
                    _this.loaderService.hideLoader();
                }
                else {
                    _this.validationMsgArray.push(response_1.errorMessage);
                    _this.createErrorData();
                    // this.isValidateForm = true;
                    _this.asyncFlag = false;
                    _this.loaderService.hideLoader();
                }
            });
        }
    };
    PasswordComponent.prototype.reset = function () {
        this.passwordModel = new PasswordModel();
    };
    return PasswordComponent;
}());
PasswordComponent = __decorate([
    core_1.Component({
        selector: 'password',
        template: "\n  <amexio-row>\n  <amexio-column [size]=\"3\"></amexio-column>\n  <amexio-column [size]=\"6\">\n    <amexio-form [form-name]=\"'validateForm'\" [header]=\"true\" \n   [show-error]=\"true\" [footer-align]=\"'right'\">\n     <amexio-form-header>Password management</amexio-form-header>\n     <amexio-form-body>\n     <amexio-row>\n     <amexio-column [size]=\"12\">\n     <amexio-password-input\n     [enable-popover]=\"true\"\n     [field-label]=\"'Current Password'\"\n     name =\"currentPassword\"\n     [place-holder]=\"'Enter Current Password'\"\n     [allow-blank]=\"false\"\n     [error-msg] =\"' Please Enter Current Password'\"\n     [min-length]=\"6\"\n     [min-error-msg]=\"'Minimum 6 char required'\"\n     [max-length]=\"32\"\n     [max-error-msg]=\"'Maximum 32 char allowed'\"\n     [icon-feedback]=\"true\"\n     [(ngModel)]=\"passwordModel.currentPassword\">\n</amexio-password-input>\n<amexio-password-input\n     [enable-popover]=\"true\"\n     [field-label]=\"'New Password'\"\n     name =\"newPassword\"\n     [place-holder]=\"'Enter New Password'\"\n     [allow-blank]=\"false\"\n     [error-msg] =\"' Please Enter New Password'\"\n     [min-length]=\"6\"\n     [min-error-msg]=\"'Minimum 6 char required'\"\n     [max-length]=\"32\"\n     [max-error-msg]=\"'Maximum 32 char allowed'\"\n     [icon-feedback]=\"true\"\n     [(ngModel)]=\"passwordModel.newPassword\">\n</amexio-password-input>\n<amexio-password-input\n     [enable-popover]=\"true\"\n     [field-label]=\"'Confirm Password'\"\n     name =\"passwordModel.confirmPassword\"\n     [place-holder]=\"' Confirm Password'\"\n     [allow-blank]=\"false\"\n     [error-msg] =\"' Please Confirm Password'\"\n     [min-length]=\"6\"\n     [min-error-msg]=\"'Minimum 6 char required'\"\n     [max-length]=\"32\"\n     [max-error-msg]=\"'Maximum 32 char allowed'\"\n     [icon-feedback]=\"true\"\n     [(ngModel)]=\"passwordModel.confirmPassword\"\n     (onBlur)=\"onConfirmPassword()\">\n</amexio-password-input>\n</amexio-column>\n</amexio-row>\n     </amexio-form-body>\n     <amexio-form-action>\n     <amexio-button\n     [label]=\"'Change Password'\"\n     [type]=\"'primary'\"\n     [size]=\"'default'\"\n     [loading]=\"asyncFlag\"\n   [form-bind]=\"'validateForm'\"\n     [tooltip]=\"'Change Password'\" \n     (onClick)=\"onChangePassword()\">\n     </amexio-button>\n     </amexio-form-action>\n   </amexio-form>\n   </amexio-column>\n<app-notification></app-notification>\n\n<!--<amexio-dialogue [show-dialogue]=\"isValidateForm\" [message-type]=\"'error'\" [closable]=\"true\" [title]=\"'Error'\" [type]=\"'alert'\" [custom]=\"true\" (close)=\"isValidateForm = !isValidateForm\">\n<amexio-body>\n    <ol>\n        <li *ngFor=\"let msgObj of validationMsgArray let index=index\">{{msgObj}}</li>\n    </ol>\n</amexio-body>\n<amexio-action>\n    <amexio-button type=\"primary\" (onClick)=\"okErrorBtnClick()\" [label]=\"'Ok'\">\n    </amexio-button>\n</amexio-action>\n</amexio-dialogue>-->\n  <amexio-column [size]=\"3\"></amexio-column>\n \n</amexio-row>\n "
    })
], PasswordComponent);
exports.PasswordComponent = PasswordComponent;
var PasswordModel = (function () {
    function PasswordModel() {
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
    }
    return PasswordModel;
}());
exports.PasswordModel = PasswordModel;
