"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var ServiceDefinationComponent = (function () {
    function ServiceDefinationComponent(http, loaderService, _notificationService) {
        this.http = http;
        this.loaderService = loaderService;
        this._notificationService = _notificationService;
        this.saveBtnEnable = false;
        this.reset = new core_1.EventEmitter();
        this.notificationmsg = [];
        this.servicemodel = new ServiceDefinationModel();
    }
    ServiceDefinationComponent.prototype.ngOnInit = function () {
        this.getBoundedContext();
    };
    ServiceDefinationComponent.prototype.createErrorData = function () {
        var errorData = [];
        var errorObj = {};
        errorObj['data'] = [];
        errorObj.data = this.notificationmsg;
        errorData.push(errorObj);
        this._notificationService.showerrorData('Error Message', errorData);
    };
    Object.defineProperty(ServiceDefinationComponent.prototype, "id", {
        set: function (id) {
            this.servicemodel.id = id;
            if (this.servicemodel.id != null && this.servicemodel.id != '') {
                this.fetchServiceDefination();
            }
        },
        enumerable: true,
        configurable: true
    });
    ServiceDefinationComponent.prototype.onIdChange = function (id) {
        //this.fetchServiceDefination();
    };
    ServiceDefinationComponent.prototype.fetchServiceDefination = function () {
        var _this = this;
        this.notificationmsg = [];
        var responsedata;
        this.http
            .post('/api/dna/servicedefinition/findById', { id: this.servicemodel.id })
            .subscribe(function (response) {
            responsedata = response;
        }, function (err) {
            _this.notificationmsg.push('Unable to connect to server');
            _this.createErrorData();
        }, function () {
            _this.setResponseData(responsedata);
        });
    };
    ServiceDefinationComponent.prototype.setResponseData = function (responsedata) {
        this.servicemodel.setData(responsedata);
        this.onBoundedContextSelect({ id: this.servicemodel.boundedContextId });
    };
    ServiceDefinationComponent.prototype.getBoundedContext = function () {
        var _this = this;
        var bcData;
        this.http.get('/api/dna/bcontext/findAll').subscribe(function (response) {
            bcData = response;
        }, function (err) {
            _this.notificationmsg.push('Unable to connect to server');
            _this.createErrorData();
        }, function () {
            _this.servicemodel.boundedContextData = bcData.response;
            _this.servicemodel.boundedContextId = _this.servicemodel.boundedContextData[0].id;
            _this.onBoundedContextSelect(_this.servicemodel.boundedContextData[0]);
        });
    };
    ServiceDefinationComponent.prototype.onBoundedContextSelect = function (bcdata) {
        var _this = this;
        this.notificationmsg = [];
        var responedata;
        this.http
            .post('/api/dna/domain/findByBContextId', { id: bcdata.id })
            .subscribe(function (response) {
            responedata = response;
        }, function (err) {
            _this.notificationmsg.push('Unable to connect to server');
            _this.createErrorData();
        }, function () {
            _this.servicemodel.domainData = responedata.response;
            _this.servicemodel.domainId = _this.servicemodel.domainData[0].id;
        });
    };
    ServiceDefinationComponent.prototype.save = function () {
        var _this = this;
        this.notificationmsg = [];
        this.loaderService.showLoader();
        var responsedata;
        this.http
            .post('/api/dna/servicedefinition/save', this.servicemodel.toSaveJSON())
            .subscribe(function (response) {
            responsedata = response;
        }, function (err) {
            _this.notificationmsg.push('Unable to connect to server');
            _this.createErrorData();
            _this.saveBtnEnable = true;
            _this.loaderService.hideLoader();
        }, function () {
            if (!responsedata.success && responsedata.errorMessage) {
                _this.notificationmsg.push(responsedata.errorMessage);
                _this.createErrorData();
                _this.loaderService.hideLoader();
            }
            else {
                _this.loaderService.hideLoader();
                _this.notificationmsg.push('Service defination saved successfully!');
                _this._notificationService.showSuccessData(_this.notificationmsg);
                _this.resetData();
            }
            _this.saveBtnEnable = true;
        });
    };
    ServiceDefinationComponent.prototype.cancel = function () {
        this.resetData();
    };
    ServiceDefinationComponent.prototype.resetData = function () {
        this.servicemodel.reset();
        this.reset.emit({ reset: true });
    };
    return ServiceDefinationComponent;
}());
__decorate([
    core_1.Output()
], ServiceDefinationComponent.prototype, "reset");
__decorate([
    core_1.Input('id')
], ServiceDefinationComponent.prototype, "id");
ServiceDefinationComponent = __decorate([
    core_1.Component({
        selector: 'service-defination',
        template: "\n             <div class=\"loadingnav\" *ngIf=\"loaderService.isLoading\"></div>\n<amexio-form [body-height]=\"80\" [header]=\"true\" form-name=\"servicedefinationform\"  [show-error]=\"true\">\n    <amexio-form-header>Service Builder</amexio-form-header>\n    <amexio-form-body>\n        <amexio-row>\n            <amexio-column [size]=6>\n                <amexio-dropdown [search]=\"true\" [(ngModel)]=\"servicemodel.boundedContextId\"\n                                [place-holder]=\"'Select Bounded Context'\" name=\"servicemodel.boundedContextId\"\n                                 [error-msg]=\"'Select Bounded Context'\"\n                                [field-label]=\"'Bounded Context'\" \n                                [data]=\"servicemodel.boundedContextData\" [display-field]=\"'name'\"\n                                (onSingleSelect) = \"onBoundedContextSelect($event)\"\n                                [value-field]=\"'id'\">\n                </amexio-dropdown>\n            </amexio-column>\n            <amexio-column [size]=6>\n                <amexio-dropdown [search]=\"true\" [(ngModel)]=\"servicemodel.domainId\" [place-holder]=\"'Select Module'\" name=\"servicemodel.domainId\"\n                     [error-msg]=\"'Select Module'\"\n                    [data]=\"servicemodel.domainData\" [field-label]=\"'Module'\" [display-field]=\"'name'\" [value-field]=\"'id'\">\n                </amexio-dropdown>\n            </amexio-column>\n        </amexio-row>\n        <amexio-row>\n            <amexio-column [size]=6>\n                <amexio-text-input field-label=\"Name\" [pattern]=\"'^[a-zA-Z][a-zA-Z0-9]*$'\" name=\"servicemodel.serviceName\"\n                        place-holder=\"Enter Service Name\" [(ngModel)]=\"servicemodel.serviceName\"\n                        enable-popover=\"true\" error-msg=\"Please Enter Service Name\" icon-feedback=\"true\">\n                </amexio-text-input>\n            </amexio-column>\n            <amexio-column [size]=6>\n                <amexio-text-input field-label=\"URL\" name=\"servicemodel.baseUrl\"\n                        place-holder=\"Enter Base URL\" [(ngModel)]=\"servicemodel.baseUrl\"\n                        enable-popover=\"true\" error-msg=\"Please Enter Service URL\" >\n                </amexio-text-input>\n            </amexio-column>\n        </amexio-row>\n    </amexio-form-body>\n    <amexio-form-action>\n        <amexio-button [label]=\"'Cancel'\" [icon]=\"'fa fa-close'\" [type]=\"'secondary'\"\n                    [size]=\"'default'\" [tooltip]=\"'Cancel'\"\n                    (onClick)=\"cancel()\">\n        </amexio-button>\n        <amexio-button [form-bind]=\"'servicedefinationform'\" [disabled]=\"saveBtnEnable\" [label]=\"'Save'\" [icon]=\"'fa fa-save'\"  [type]=\"'primary'\"\n                    [size]=\"'default'\" [tooltip]=\"'Save'\"\n                    (onClick)=\"save()\">\n        </amexio-button>\n    </amexio-form-action>\n</amexio-form>\n<dna-notification></dna-notification>\n    "
    })
], ServiceDefinationComponent);
exports.ServiceDefinationComponent = ServiceDefinationComponent;
var ServiceDefinationModel = (function () {
    function ServiceDefinationModel() {
    }
    ServiceDefinationModel.prototype.reset = function () {
        this.id = '';
        this.boundedContextId = '';
        this.domainId = '';
        this.serviceName = '';
        this.baseUrl = '';
        this.domainData = [];
    };
    ServiceDefinationModel.prototype.setDomainData = function (domainData) {
        this.domainData = domainData;
    };
    ServiceDefinationModel.prototype.setData = function (resp) {
        if (resp.success && resp.response) {
            var response = resp.response;
            this.id = response.id;
            this.serviceName = response.name;
            this.boundedContextId = response.boundedContextId;
            this.domainId = response.domainId;
            this.baseUrl = response.url;
        }
    };
    ServiceDefinationModel.prototype.toSaveJSON = function () {
        return {
            id: this.id,
            name: this.serviceName,
            boundedContextId: this.boundedContextId,
            domainId: this.domainId,
            description: '',
            url: this.baseUrl
        };
    };
    return ServiceDefinationModel;
}());
exports.ServiceDefinationModel = ServiceDefinationModel;
