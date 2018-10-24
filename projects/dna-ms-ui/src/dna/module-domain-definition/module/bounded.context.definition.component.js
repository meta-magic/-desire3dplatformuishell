"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var domain_component_1 = require("../domain/domain.component");
var BoundedContextDefinitionComponent = (function () {
    function BoundedContextDefinitionComponent(_router, ls, cookieService, _notificationService, http, bs) {
        this._router = _router;
        this.ls = ls;
        this.cookieService = cookieService;
        this._notificationService = _notificationService;
        this.http = http;
        this.bs = bs;
        // isValidateForm: boolean = false;
        this.validationMsgArray = [];
        this.bcDetails = [];
        this.getBContextList();
        // this._router.navigateByUrl(
        //   '/home/dna/boundedcontextDefinition/boundedContext'
        // );
        this.cardflag = true;
    }
    BoundedContextDefinitionComponent.prototype.createErrorData = function () {
        var errorData = [];
        var errorObj = {};
        errorObj['data'] = [];
        errorObj.data = this.validationMsgArray;
        errorData.push(errorObj);
        this._notificationService.showerrorData('Error Message', errorData);
    };
    BoundedContextDefinitionComponent.prototype.getBContextList = function () {
        var _this = this;
        this.bs.getBContextList().subscribe(function (response) {
            _this.bcDetails = response;
        }, function (error) {
            _this.validationMsgArray.push('Unable to connect the server');
            // this.isValidateForm = true;
            _this.createErrorData();
        }, function () {
            _this.bs.bContextList = _this.bcDetails;
        });
    };
    //Open domain screen uder selected Bounded Context
    BoundedContextDefinitionComponent.prototype.onNodeClick = function (data) {
        var _this = this;
        this.validationMsgArray = [];
        if (data.children != null && data.children.length >= 0) {
            var bContextData_1;
            this.bs.bcTextflag = true;
            this.bs.bcDropdownflag = false;
            this.bs.disabledflag = false;
            this.bs.domainBtnflag = true;
            this.cardflag = false;
            this.domainModel = new domain_component_1.DomainModel();
            var requestJson = {
                id: data.id
            };
            this.http.post('/api/dna/bcontext/findById', requestJson).subscribe(function (response) {
                bContextData_1 = response;
            }, function (err) {
                _this.validationMsgArray.push('Unable to connect the server');
                // this.isValidateForm = true;
                _this.createErrorData();
            }, function () {
                if (bContextData_1.success) {
                    var BContextId = new Date().getTime();
                    _this.ls.set('BContextId', bContextData_1.response.id);
                    _this._router.navigate([
                        'home/designPipeline/boundedcontextDefinition/module/' +
                            BContextId
                    ]);
                }
                if (bContextData_1.errorMessage) {
                    _this.validationMsgArray.push(bContextData_1.errorMessage);
                    // this.isValidateForm = true;
                    _this.createErrorData();
                }
            });
        }
        else {
            var domainData_1;
            this.bs.bcTextflag = false;
            this.bs.bcDropdownflag = false;
            this.bs.domainBtnflag = false;
            this.bs.disabledflag = true;
            this.cardflag = false;
            this.domainModel = new domain_component_1.DomainModel();
            var requestJson = {
                id: data.id
            };
            this.http.post('/api/dna/domain/findById', requestJson).subscribe(function (response) {
                domainData_1 = response;
            }, function (err) {
                _this.validationMsgArray.push('Unable to connect the server');
                // this.isValidateForm = true;
                _this.createErrorData();
            }, function () {
                if (domainData_1.success) {
                    var domainId = new Date().getTime();
                    _this.ls.set('domainId', domainData_1.response.id);
                    _this._router.navigate([
                        'home/designPipeline/boundedcontextDefinition/module/' + domainId
                    ]);
                }
                if (domainData_1.errorMessage) {
                    _this.validationMsgArray.push(domainData_1.errorMessage);
                    // this.isValidateForm = true;
                    _this.createErrorData();
                }
            });
        }
    };
    BoundedContextDefinitionComponent.prototype.ngOnInit = function () {
        // this.loadBCTreeData();
    };
    // Open bounded context screen
    BoundedContextDefinitionComponent.prototype.newBoundedContext = function () {
        this.cardflag = false;
        this._router.navigate([
            'home/designPipeline/boundedcontextDefinition/boundedContext'
        ]);
    };
    //Open Domain Screen
    BoundedContextDefinitionComponent.prototype.newDomain = function () {
        this.cardflag = false;
        this._router.navigate([
            'home/designPipeline/boundedcontextDefinition/module'
        ]);
        this.bs.bcDropdownflag = true;
        this.bs.domainBtnflag = true;
        this.bs.bcTextflag = false;
        this.bs.disabledflag = false;
    };
    return BoundedContextDefinitionComponent;
}());
BoundedContextDefinitionComponent = __decorate([
    core_1.Component({
        selector: 'bounded-context-definition',
        template: "\n\n     <amexio-row>\n          <amexio-column [size] = \"3\">\n          <div class=\"boundedContext-component-pane\">\n                  <amexio-card [header]=\"true\"\n          [footer]=\"true\"\n          [show]=\"true\"\n          [body-height]=\"80\">\n              <amexio-header>\n                  Modules\n              </amexio-header>\n              <amexio-body>\n                  <amexio-tree-filter-view [data-reader]=\"'response'\" [data]=\"bs.bContextList\" (nodeClick)=\"onNodeClick($event)\">\n                  </amexio-tree-filter-view>\n              </amexio-body>\n              <amexio-action>\n              <amexio-button\n              [label]=\"'BC'\"\n              [type]=\"'secondary'\"\n              [tooltip]=\"'New Bounded Context'\"\n              [size]=\"'default'\"\n              [icon]=\"'fa fa-plus fa-lg'\"\n              (onClick)=\"newBoundedContext()\">\n              </amexio-button>\n              <amexio-button\n              [label]=\"'Module'\"\n              [type]=\"'secondary'\"\n              [tooltip]=\"'New Domain'\"\n              [icon]=\"'fa fa-plus fa-lg'\"\n              [size]=\"'default'\"\n              (onClick)=\"newDomain()\">\n              </amexio-button>\n          </amexio-action>\n          </amexio-card>\n          </div>\n           </amexio-column>\n         <amexio-column [size]=\"9\">\n        <ng-container *ngIf=\"!cardflag\">\n         <router-outlet></router-outlet>\n        </ng-container>\n        <ng-container *ngIf=\"cardflag\">\n        <amexio-card [header]=\"true\"\n                     [footer]=\"false\"\n                     [show]=\"true\"\n                     [body-height]=\"80\"\n                     [footer-align]=\"'right'\">\n                    <amexio-header>\n                       Help Document\n                    </amexio-header>\n        <amexio-body>\n          Help Document\n        </amexio-body>\n        </amexio-card>\n        </ng-container>\n         </amexio-column>\n         </amexio-row>\n<dna-notification></dna-notification>\n\n      <!--<amexio-dialogue [show-dialogue]=\"isValidateForm\" [message-type]=\"'error'\" [closable]=\"true\" [title]=\"'Error'\" [type]=\"'alert'\" [custom]=\"true\" (close)=\"isValidateForm = !isValidateForm\">\n<amexio-body>\n    <ol>\n        <li *ngFor=\"let msgObj of validationMsgArray let index=index\">{{msgObj}}</li>\n    </ol>\n</amexio-body>\n<amexio-action>\n    <amexio-button type=\"primary\" (onClick)=\"okErrorBtnClick()\" [label]=\"'Ok'\">\n    </amexio-button>\n</amexio-action>\n</amexio-dialogue>-->\n  "
    })
], BoundedContextDefinitionComponent);
exports.BoundedContextDefinitionComponent = BoundedContextDefinitionComponent;
