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
var ApprovalComponent = (function () {
    function ApprovalComponent(http, cookieService, _notificationService, loaderService) {
        this.http = http;
        this.cookieService = cookieService;
        this._notificationService = _notificationService;
        this.loaderService = loaderService;
        this.validationMsgArray = [];
        this.isValidateForm = false;
        this.getPendingData();
        this.messageArray = [];
        this.pendingData = [];
        this.approvedData = [];
        this.rejectedData = [];
    }
    ApprovalComponent.prototype.ngOnInit = function () { };
    ApprovalComponent.prototype.okErrorBtnClick = function () {
        this.isValidateForm = false;
        this.validationMsgArray = [];
    };
    ApprovalComponent.prototype.createErrorData = function () {
        var errorData = [];
        var errorObj = {};
        errorObj['data'] = [];
        errorObj.data = this.validationMsgArray;
        errorData.push(errorObj);
        this._notificationService.showerrorData('Error Message', errorData);
    };
    ApprovalComponent.prototype.onApprove = function (row) {
        var _this = this;
        var response;
        var requestJson = {
            requestId: row.requestId
        };
        this.http
            .post('/api/user/SignupRequestCommand/approve', requestJson)
            .subscribe(function (res) {
            response = res;
        }, function (err) {
            _this.validationMsgArray.push('Unable to connect to server');
            // this.isValidateForm = true;
            _this.createErrorData();
        }, function () {
            if (response.success) {
                _this.messageArray.push(response.successMessage);
                _this._notificationService.showSuccessData(_this.messageArray);
                _this.getPendingData();
            }
            else {
                _this.validationMsgArray.push(response.errorMessage);
                // this.isValidateForm = true;
                _this.createErrorData();
            }
        });
    };
    ApprovalComponent.prototype.onReject = function (row) {
        var _this = this;
        var response;
        var requestJson = {
            requestId: row.requestId
        };
        this.http
            .post('/api/user/SignupRequestCommand/reject', requestJson)
            .subscribe(function (res) {
            response = res;
        }, function (err) {
            _this.validationMsgArray.push('Unable to connect to server');
            // this.isValidateForm = true;
            _this.createErrorData();
        }, function () {
            if (response.success) {
                _this.messageArray.push(response.successMessage);
                _this._notificationService.showSuccessData(_this.messageArray);
                _this.getPendingData();
            }
            else {
                _this.validationMsgArray.push(response.errorMessage);
                // this.isValidateForm = true;
                _this.createErrorData();
            }
        });
    };
    ApprovalComponent.prototype.getPendingData = function () {
        var _this = this;
        var dataresponse;
        this.loaderService.showLoader();
        this.http
            .get('/api/user/SignupRequestQuery/findAllPendingRequest')
            .subscribe(function (response) {
            dataresponse = response;
        }, function (error) {
            _this.validationMsgArray.push('Unable to connect to server');
            // this.isValidateForm = true;
            _this.createErrorData();
            _this.loaderService.hideLoader();
        }, function () {
            if (dataresponse.success) {
                _this.pendingData = dataresponse.response;
                _this.loaderService.hideLoader();
            }
            else {
                _this.validationMsgArray.push(dataresponse.errorMessage);
                // this.isValidateForm = true;
                _this.createErrorData();
                _this.loaderService.hideLoader();
            }
        });
    };
    ApprovalComponent.prototype.getApprovedData = function () {
        var _this = this;
        var dataresponse;
        this.loaderService.showLoader();
        this.http
            .get('/api/user/SignupRequestQuery/findAllApprovedRequest')
            .subscribe(function (response) {
            dataresponse = response;
        }, function (error) {
            _this.validationMsgArray.push('Unable to connect to server');
            // this.isValidateForm = true;
            _this.createErrorData();
            _this.loaderService.hideLoader();
        }, function () {
            if (dataresponse.success) {
                _this.approvedData = dataresponse.response;
                _this.loaderService.hideLoader();
            }
            else {
                _this.validationMsgArray.push(dataresponse.errorMessage);
                // this.isValidateForm = true;
                _this.createErrorData();
                _this.loaderService.hideLoader();
            }
        });
    };
    ApprovalComponent.prototype.getRejectedData = function () {
        var _this = this;
        var dataresponse;
        this.loaderService.showLoader();
        this.http
            .get('/api/user/SignupRequestQuery/findAllRejectedRequest')
            .subscribe(function (response) {
            dataresponse = response;
        }, function (error) {
            _this.validationMsgArray.push('Unable to connect to server');
            // this.isValidateForm = true;
            _this.createErrorData();
            _this.loaderService.hideLoader();
        }, function () {
            if (dataresponse.success) {
                _this.rejectedData = dataresponse.response;
                _this.loaderService.hideLoader();
            }
            else {
                _this.validationMsgArray.push(dataresponse.errorMessage);
                // this.isValidateForm = true;
                _this.createErrorData();
                _this.loaderService.hideLoader();
            }
        });
    };
    ApprovalComponent.prototype.onTabClick = function (event) {
        if (event.title == 'Pending Requests') {
            this.getPendingData();
        }
        else if (event.title == 'Approved Requests') {
            this.getApprovedData();
        }
        else if (event.title == 'Rejected Requests') {
            this.getRejectedData();
        }
    };
    return ApprovalComponent;
}());
ApprovalComponent = __decorate([
    core_1.Component({
        selector: 'approval-user',
        template: "\n    <amexio-row>\n    <amexio-column [size]=12>\n                   <div class=\"loadingnav\" *ngIf=\"loaderService.isLoading\"></div>\n\n                         <amexio-tab-view [closable]=\"false\"  (onClick)=\"onTabClick($event)\">\n<amexio-tab title=\"Pending Requests\" [active]=\"true\">\n <amexio-row>\n        <amexio-column [size] =12 >\n            <amexio-datagrid  title=\"\"\n                [data]=\"pendingData\"\n                [page-size] = \"10\"\n                [enable-data-filter]=\"false\">\n        <amexio-data-table-column [data-index]=\"'developerTypeDisplay'\"\n         [width]=\"10\" [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'Developer Type'\">\n        </amexio-data-table-column>\n         <amexio-data-table-column [data-index]=\"'licenseTypeDisplay'\" [width]=\"15\"\n         [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'License Type'\">\n        </amexio-data-table-column> \n        <amexio-data-table-column [data-index]=\"'productDisplay'\" [width]=\"15\"\n         [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'Product'\">\n        </amexio-data-table-column>\n        <amexio-data-table-column [data-index]=\"'firstName'\" [width]=\"15\"\n         [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'First Name'\">\n        </amexio-data-table-column>\n        <amexio-data-table-column [data-index]=\"'lastName'\" [width]=\"12\"\n         [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'Last Name'\">\n        </amexio-data-table-column>\n         <amexio-data-table-column [data-index]=\"'loginId'\" [width]=\"25\"\n         [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'Login Id'\">\n        </amexio-data-table-column>\n        <amexio-data-table-column [data-index]=\"'emailId'\" [width]=\"25\"\n         [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'Email Id'\">\n        </amexio-data-table-column>\n        <amexio-data-table-column [data-index]=\"'phoneNumber'\" [width]=\"15\"\n         [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'Phone Number'\">\n        </amexio-data-table-column>\n           <amexio-data-table-column [data-index]=\"'requestId'\" [width]=\"15\"\n         [data-type]=\"'string'\" [hidden]=\"true\" [text]=\"'requestId'\">\n        </amexio-data-table-column>       \n        <amexio-data-table-column [width]=\"15\"\n                    [data-index]=\"'signUpAction'\"\n                    [data-type]=\"'string'\" [hidden]=\"false\"\n                    [text]=\"'Action'\">\n                    <ng-template #amexioBodyTmpl let-column let-row=\"row\">\n                    <span>\n                    <amexio-image style=\"color:green;\" [icon-class]=\"'fa fa-check fa-2x'\"\n                    [tooltip]=\"'Approve'\" (onClick)=\"onApprove(row)\">\n                   </amexio-image>\n                   <amexio-image style=\"color:red;\" [icon-class]=\"'fa fa-times fa-2x'\"\n                    [tooltip]=\"'Reject'\" (onClick)=\"onReject(row)\">\n                   </amexio-image>\n                    </span>\n                    </ng-template>\n                </amexio-data-table-column>\n            </amexio-datagrid>\n        </amexio-column>\n    </amexio-row>\n</amexio-tab>\n<amexio-tab title=\"Approved Requests\" [active]=\"false\">\n<amexio-row>\n        <amexio-column [size] =12 >\n            <amexio-datagrid  title=\"\"\n                [data]=\"approvedData\"\n                [page-size] = \"10\"\n                [enable-data-filter]=\"false\">\n        <amexio-data-table-column [data-index]=\"'developerTypeDisplay'\"\n         [width]=\"10\" [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'Developer Type'\">\n        </amexio-data-table-column>\n         <amexio-data-table-column [data-index]=\"'licenseTypeDisplay'\" [width]=\"15\"\n         [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'License Type'\">\n        </amexio-data-table-column> \n        <amexio-data-table-column [data-index]=\"'productDisplay'\" [width]=\"15\"\n         [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'Product'\">\n        </amexio-data-table-column>\n        <amexio-data-table-column [data-index]=\"'firstName'\" [width]=\"15\"\n         [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'First Name'\">\n        </amexio-data-table-column>\n        <amexio-data-table-column [data-index]=\"'lastName'\" [width]=\"15\"\n         [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'Last Name'\">\n        </amexio-data-table-column>\n         <amexio-data-table-column [data-index]=\"'loginId'\" [width]=\"25\"\n         [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'Login Id'\">\n        </amexio-data-table-column>\n        <amexio-data-table-column [data-index]=\"'emailId'\" [width]=\"25\"\n         [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'Email Id'\">\n        </amexio-data-table-column>\n        <amexio-data-table-column [data-index]=\"'phoneNumber'\" [width]=\"15\"\n         [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'Phone Number'\">\n        </amexio-data-table-column>\n           <amexio-data-table-column [data-index]=\"'requestId'\" [width]=\"15\"\n         [data-type]=\"'string'\" [hidden]=\"true\" [text]=\"'requestId'\">\n        </amexio-data-table-column>       \n            </amexio-datagrid>\n        </amexio-column>\n    </amexio-row>\n</amexio-tab>\n<amexio-tab title=\"Rejected Requests\" [active]=\"false\">\n<amexio-row>\n        <amexio-column [size] =12 >\n            <amexio-datagrid  title=\"\"\n                [data]=\"rejectedData\"\n                [page-size] = \"10\"\n                [enable-data-filter]=\"false\">\n        <amexio-data-table-column [data-index]=\"'developerTypeDisplay'\"\n         [width]=\"10\" [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'Developer Type'\">\n        </amexio-data-table-column>\n         <amexio-data-table-column [data-index]=\"'licenseTypeDisplay'\" [width]=\"15\"\n         [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'License Type'\">\n        </amexio-data-table-column> \n        <amexio-data-table-column [data-index]=\"'productDisplay'\" [width]=\"15\"\n         [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'Product'\">\n        </amexio-data-table-column>\n        <amexio-data-table-column [data-index]=\"'firstName'\" [width]=\"15\"\n         [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'First Name'\">\n        </amexio-data-table-column>\n        <amexio-data-table-column [data-index]=\"'lastName'\" [width]=\"15\"\n         [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'Last Name'\">\n        </amexio-data-table-column>\n         <amexio-data-table-column [data-index]=\"'loginId'\" [width]=\"25\"\n         [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'Login Id'\">\n        </amexio-data-table-column>\n        <amexio-data-table-column [data-index]=\"'emailId'\" [width]=\"25\"\n         [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'Email Id'\">\n        </amexio-data-table-column>\n        <amexio-data-table-column [data-index]=\"'phoneNumber'\" [width]=\"15\"\n         [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'Phone Number'\">\n        </amexio-data-table-column>\n           <amexio-data-table-column [data-index]=\"'requestId'\" [width]=\"15\"\n         [data-type]=\"'string'\" [hidden]=\"true\" [text]=\"'requestId'\">\n        </amexio-data-table-column>       \n            </amexio-datagrid>\n        </amexio-column>\n    </amexio-row>\n</amexio-tab>\n            </amexio-tab-view>\n    </amexio-column>\n   <app-notification></app-notification>\n    </amexio-row>\n    <amexio-dialogue [show-dialogue]=\"isValidateForm\" [message-type]=\"'error'\" [closable]=\"true\" [title]=\"'Error'\" [type]=\"'alert'\" [custom]=\"true\" (close)=\"isValidateForm = !isValidateForm\">\n<amexio-body>\n    <ol>\n        <li *ngFor=\"let msgObj of validationMsgArray let index=index\">{{msgObj}}</li>\n    </ol>\n</amexio-body>\n<amexio-action>\n    <amexio-button type=\"primary\" (onClick)=\"okErrorBtnClick()\" [label]=\"'Ok'\">\n    </amexio-button>\n</amexio-action>\n</amexio-dialogue>\n  "
    })
], ApprovalComponent);
exports.ApprovalComponent = ApprovalComponent;
