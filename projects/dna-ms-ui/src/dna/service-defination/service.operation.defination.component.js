"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var ServiceOperationDefinationComponent = (function () {
    function ServiceOperationDefinationComponent(http) {
        this.http = http;
        this.isServiceDefination = true;
        this.isOperationDefination = false;
        this.serviceId = null;
        this.operationId = null;
        this.servicedefinationdata = [];
    }
    ServiceOperationDefinationComponent.prototype.ngOnInit = function () {
        this.loadServiceDefinitionsTree();
    };
    //LOAD SERVICE TREE
    ServiceOperationDefinationComponent.prototype.loadServiceDefinitionsTree = function () {
        var _this = this;
        var responsedata = {};
        this.http.get('/api/dna/servicedefinition/findAll').subscribe(function (response) {
            responsedata = response;
        }, function (err) {
            console.log('Unable to connect to service');
        }, function () {
            _this.servicedefinationdata = responsedata;
        });
    };
    ServiceOperationDefinationComponent.prototype.showServiceUI = function () {
        this.unsetData();
        this.isServiceDefination = true;
        this.isOperationDefination = false;
    };
    ServiceOperationDefinationComponent.prototype.showOperationUI = function () {
        this.unsetData();
        this.isServiceDefination = false;
        this.isOperationDefination = true;
    };
    ServiceOperationDefinationComponent.prototype.unsetData = function () {
        this.serviceId = null;
        this.operationId = null;
    };
    ServiceOperationDefinationComponent.prototype.onServiceDefinitionTreeClick = function (event) {
        if (event.type && event.type === '4') {
            this.showOperationUI();
            this.operationId = event.parentId + '###' + event.text;
        }
        else if (event.type && event.type === '3') {
            this.showServiceUI();
            this.serviceId = event.id;
        }
    };
    ServiceOperationDefinationComponent.prototype.reset = function () {
        this.unsetData();
        this.loadServiceDefinitionsTree();
    };
    return ServiceOperationDefinationComponent;
}());
ServiceOperationDefinationComponent = __decorate([
    core_1.Component({
        selector: 'service-operation-defination',
        template: "\n\n<amexio-row>\n\n    <amexio-column [size] =3 >\n        <amexio-card [header]=\"true\" [footer]=\"true\" [footer-align]=\"'right'\"  [body-height]=\"80\">\n            <amexio-header>Services</amexio-header>\n            <amexio-body>\n                <amexio-tree-filter-view [data-reader]=\"'response'\" [data]=\"servicedefinationdata\" (nodeClick)=\"onServiceDefinitionTreeClick($event)\">\n                </amexio-tree-filter-view>\n            </amexio-body>\n            <amexio-action>\n                <amexio-button *ngIf=\"isOperationDefination\" (onClick)=\"showServiceUI()\" [label]=\"'Service'\" [type]=\"'secondary'\" [size]=\"'default'\" [tooltip]=\"'New Service'\" [icon]=\"'fa fa-plus fa-lg'\">\n                </amexio-button>\n                <amexio-button *ngIf=\"isServiceDefination\"  (onClick)=\"showOperationUI()\"[label]=\"'Operation'\" [type]=\"'secondary'\" [size]=\"'default'\" [tooltip]=\"'New Operation'\" [icon]=\"'fa fa-plus fa-lg'\">\n                </amexio-button>\n            </amexio-action>\n        </amexio-card>\n    </amexio-column>\n\n    <amexio-column [size] =9 >\n\n        <service-defination   [id]=\"serviceId\" (reset)= \"reset()\" *ngIf=\"isServiceDefination\"></service-defination>\n\n        <operation-defination [id]=\"operationId\" (reset)= \"reset()\" *ngIf=\"isOperationDefination\"></operation-defination>\n\n    </amexio-column>\n\n</amexio-row>\n    "
    })
], ServiceOperationDefinationComponent);
exports.ServiceOperationDefinationComponent = ServiceOperationDefinationComponent;
