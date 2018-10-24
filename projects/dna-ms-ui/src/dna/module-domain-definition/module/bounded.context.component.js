"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var BoundedContextComponent = (function () {
    function BoundedContextComponent(_router, ls, loaderService, cookieService, http, _notificationService, bs) {
        this._router = _router;
        this.ls = ls;
        this.loaderService = loaderService;
        this.cookieService = cookieService;
        this.http = http;
        this._notificationService = _notificationService;
        this.bs = bs;
        this.msgData = [];
        this.validationMsgArray = [];
        this.isValidateForm = false;
        this.boundedContextModel = new BoundedContextModel();
    }
    BoundedContextComponent.prototype.ngOnInit = function () { };
    // SAVE BUTTON CLICK
    // saveClick() {
    //   this.validateFormFields();
    //   if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
    //     this.isValidateForm = true;
    //   } else {
    //     this.isValidateForm = false;
    //     this.saveBoundedContext();
    //   }
    // }
    // To Close Window
    BoundedContextComponent.prototype.okErrorBtnClick = function () {
        this.isValidateForm = false;
    };
    BoundedContextComponent.prototype.createErrorData = function () {
        var errorData = [];
        var errorObj = {};
        errorObj['data'] = [];
        errorObj.data = this.validationMsgArray;
        errorData.push(errorObj);
        this._notificationService.showerrorData('Error Message', errorData);
    };
    //Save bounded context and update list of bounded context
    BoundedContextComponent.prototype.saveBoundedContext = function () {
        var _this = this;
        var response;
        var bCDetails;
        this.asyncFlag = true;
        this.msgData = [];
        this.validationMsgArray = [];
        this.loaderService.showLoader();
        var requestJson = this.boundedContextModel;
        this.http.post('/api/dna/bcontext/save ', requestJson).subscribe(function (res) {
            response = res;
        }, function (err) {
            _this.validationMsgArray.push('Unable to connect to the server');
            // this.isValidateForm = true;
            _this.createErrorData();
            _this.loaderService.hideLoader();
        }, function () {
            if (response.success) {
                _this.bs.getBContextList().subscribe(function (response) {
                    bCDetails = response;
                }, function (error) {
                    _this.validationMsgArray.push('Unable to connect to the server');
                    // this.isValidateForm = true;
                    _this.createErrorData();
                }, function () {
                    _this.bs.bContextList = bCDetails;
                });
                _this.msgData.push(response.successMessage);
                _this._notificationService.showSuccessData(_this.msgData);
                _this.reset();
                _this.asyncFlag = false;
                _this.loaderService.hideLoader();
            }
            if (response.errorMessage) {
                _this.validationMsgArray.push(response.errorMessage);
                // this.isValidateForm = true;
                _this.createErrorData();
                _this.asyncFlag = false;
                _this.loaderService.hideLoader();
            }
        });
    };
    //To Reset Data
    BoundedContextComponent.prototype.reset = function () {
        this.boundedContextModel = new BoundedContextModel();
    };
    return BoundedContextComponent;
}());
BoundedContextComponent = __decorate([
    core_1.Component({
        selector: 'bounded-context',
        template: "\n  <amexio-row>\n  <amexio-column [size]=2>\n  </amexio-column>\n   <div class=\"loadingnav\" *ngIf=\"loaderService.isLoading\"></div>\n  <amexio-column [size] =8>\n   <amexio-form [form-name]=\"'validateForm'\" [header]=\"true\" \n   [show-error]=\"true\" [footer-align]=\"'right'\">\n   <amexio-form-header>\n      Bounded Context\n  </amexio-form-header>\n   <amexio-form-body>\n    <amexio-row>\n     \n     <amexio-column [size] = 12 >\n      <amexio-text-input\n      field-label=\"Bounded Context Name\"\n      name=\"boundedContextModel.name\"\n      place-holder=\"Enter Bounded Context Name\"\n      icon-feedback=\"true\"\n      [allow-blank]=\"false\"\n      [enable-popover]=\"true\"\n      [error-msg] =\"' Please Enter Bounded Context Name'\"\n      [(ngModel)]=\"boundedContextModel.name\">\n      </amexio-text-input>\n\n     <amexio-textarea-input\n      field-label=\"Description\"\n      name=\"boundedContextModel.description\"\n      [place-holder]=\"'Enter Description'\"\n      icon-feedback=\"true\"\n      [allow-blank]=\"true\"\n      [(ngModel)]=\"boundedContextModel.description\"\n       [rows]=\"'2'\" [columns]=\"'2'\">\n     </amexio-textarea-input>\n     </amexio-column>\n\n    </amexio-row>\n  </amexio-form-body>\n  <amexio-form-action>\n   \n   <amexio-button\n   [label]=\"'Cancel'\"\n   [icon]=\"'fa fa-close'\"\n   [type]=\"'secondary'\"\n   [size]=\"'default'\"\n   [tooltip]=\"'Cancel'\" \n   (onClick)=\"reset()\">\n   </amexio-button>\n   <amexio-button\n   [label]=\"'Save'\"\n   [icon]=\"'fa fa-save'\"\n   [form-bind]=\"'validateForm'\"\n   [type]=\"'primary'\"\n   [size]=\"'default'\"\n   [tooltip]=\"'Save'\" \n   [loading]=\"asyncFlag\"\n   (onClick)=\"saveBoundedContext()\">\n   </amexio-button>\n   </amexio-form-action>\n    </amexio-form>\n<dna-notification></dna-notification>\n\n</amexio-column>\n</amexio-row>\n<amexio-dialogue [show-dialogue]=\"isValidateForm\" [message-type]=\"'error'\" [closable]=\"true\" [title]=\"'Error'\" [type]=\"'alert'\" [custom]=\"true\" (close)=\"isValidateForm = !isValidateForm\">\n<amexio-body>\n    <ol>\n        <li *ngFor=\"let msgObj of validationMsgArray let index=index\">{{msgObj}}</li>\n    </ol>\n</amexio-body>\n<amexio-action>\n    <amexio-button type=\"primary\" (onClick)=\"okErrorBtnClick()\" [label]=\"'Ok'\">\n    </amexio-button>\n</amexio-action>\n</amexio-dialogue>\n"
    })
], BoundedContextComponent);
exports.BoundedContextComponent = BoundedContextComponent;
var BoundedContextModel = (function () {
    function BoundedContextModel() {
        this.name = '';
        this.description = '';
    }
    return BoundedContextModel;
}());
exports.BoundedContextModel = BoundedContextModel;
