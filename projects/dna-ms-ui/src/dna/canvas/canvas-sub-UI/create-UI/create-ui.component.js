"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
/**
 * Created by dattaram on 21/6/18.
 */
var CreateUIComponent = (function () {
    function CreateUIComponent(_restCallService, _notificationService, _sharedDataService) {
        this._restCallService = _restCallService;
        this._notificationService = _notificationService;
        this._sharedDataService = _sharedDataService;
        this.templateOptions = [];
        this.showChange = new core_1.EventEmitter();
        this.onCreateClick = new core_1.EventEmitter();
        this.createUIModel = new CreateUIModel();
    }
    CreateUIComponent.prototype.ngOnInit = function () {
        var _this = this;
        var bcResponse;
        this._restCallService
            .getRestCall('assets/dna/template/templates_menu.json')
            .subscribe(function (resp) {
            _this.templateOptions = resp;
            _this.selectedTemplate = _this.templateOptions.find(function (temp) { return temp.key == 'blank'; });
        });
        this._restCallService.getRestCall('/api/dna/bcontext/findAll').subscribe(function (bcResp) {
            bcResponse = bcResp;
        }, function (error) { return console.warn(error); }, function () {
            _this.bcLocalData = bcResponse.response;
            _this.createUIModel.boundedcontextId = _this.bcLocalData[0].id;
            _this.selectBoundedContext(_this.bcLocalData[0]);
        });
    };
    CreateUIComponent.prototype.closeWindow = function () {
        this.show = false;
        this.showChange.emit(this.show);
    };
    CreateUIComponent.prototype.selectBoundedContext = function (boundedC) {
        var _this = this;
        this.createUIModel.boundedcontext = boundedC.hiddenName;
        var response;
        var requestJson = {
            id: boundedC.id
        };
        this._restCallService
            .postRestCall('/api/dna/domain/findByBContextId', requestJson)
            .subscribe(function (res) {
            response = res;
        }, function (error) { return console.warn(error); }, function () {
            _this.domainData = response.response;
            _this.createUIModel.domainId = _this.domainData[0].id;
            _this.createUIModel.domain = _this.domainData[0].hiddenName;
        });
    };
    CreateUIComponent.prototype.selectDomain = function (domain) {
        this.createUIModel.domainId = domain.id;
        this.createUIModel.domain = domain.hiddenName;
    };
    CreateUIComponent.prototype.onTemplateClick = function (template) {
        if (this.templateOptions != null) {
            this.templateOptions.forEach(function (item) {
                item.selected = false;
            });
            template.selected = true;
        }
        this.selectedTemplate = template;
    };
    CreateUIComponent.prototype.createUI = function () {
        /*  this.createUIModel.boundedcontextId = 'sdfsdfsdf';
        this.createUIModel.domainId = 'sfwefwev';*/
        var errorMsg = [];
        if (this.createUIModel.name == '') {
            errorMsg.push('UI name is mandatory.');
        }
        if (this.createUIModel.boundedcontextId == '') {
            errorMsg.push('Bounded context is mandatory.');
        }
        if (this.createUIModel.domainId == '') {
            errorMsg.push('Domain is mandatory.');
        }
        if (errorMsg.length > 0) {
            this._notificationService.setCustomDialogueData(true, errorMsg, 'Error');
        }
        else {
            this.createTemplateData();
        }
    };
    CreateUIComponent.prototype.createTemplateData = function () {
        var _this = this;
        if (this.selectedTemplate) {
            var templateToLoad_1;
            this._restCallService
                .getRestCall('assets/dna/template/' + this.selectedTemplate.key + '.json')
                .subscribe(function (response) { return (templateToLoad_1 = response); }, function (error) { return console.warn('Invalid template File Name'); }, function () {
                _this._sharedDataService.uiDetails = _this.createUIModel;
                _this.onCreateClick.emit({
                    createModel: _this.createUIModel,
                    template: templateToLoad_1.metadata
                });
            });
        }
    };
    return CreateUIComponent;
}());
__decorate([
    core_1.Input()
], CreateUIComponent.prototype, "show");
__decorate([
    core_1.Output()
], CreateUIComponent.prototype, "showChange");
__decorate([
    core_1.Output()
], CreateUIComponent.prototype, "onCreateClick");
CreateUIComponent = __decorate([
    core_1.Component({
        selector: 'create-ui',
        template: "\n\n    <amexio-window [vertical-position]=\"'center'\" [horizontal-position]=\"'center'\" [show]=\"show\" (showChange)=\"closeWindow()\" footer-align=\"right\"\n                   type=\"window\" [footer]=\"true\" [closable]=\"true\">\n      <amexio-header>\n        <i class=\"fa fa-file-code-o\"></i> New Component\n      </amexio-header>\n      <amexio-body>\n        <amexio-row>\n          <amexio-column [size]=\"4\">\n            <amexio-dropdown [(ngModel)]=\"createUIModel.boundedcontextId\"\n                             [place-holder]=\"'Choose Bounded Context'\"\n                             [field-label]=\"' Bounded Context'\"\n                             [display-field]=\"'name'\"\n                             [value-field]=\"'id'\"\n                             [data]=\"bcLocalData\"\n                             [readonly]=\"true\"\n                             (onSingleSelect)=\"selectBoundedContext($event)\">\n            </amexio-dropdown>\n          </amexio-column>\n          <amexio-column [size]=\"4\">\n            <amexio-dropdown [(ngModel)]=\"createUIModel.domainId\"\n                             [place-holder]=\"'Choose Module'\"\n                             [field-label]=\"'Module'\"\n                             [display-field]=\"'name'\"\n                             [value-field]=\"'id'\"\n                             [data]=\"domainData\"\n                             [readonly]=\"true\"\n                             (onSingleSelect)=\"selectDomain($event)\">\n            </amexio-dropdown>\n          </amexio-column>\n          <amexio-column [size]=\"4\">\n            <amexio-text-input [field-label]=\"'UI Name'\"\n                               [(ngModel)]=\"createUIModel.name\"\n                               [place-holder]=\"'Enter Name'\"\n                               [icon-feedback]=\"true\">\n            </amexio-text-input>\n          </amexio-column>\n        </amexio-row>\n        <amexio-row>\n          <amexio-column size=\"12\">\n            <amexio-card [header]=\"true\"\n                         [footer]=\"false\"\n                         [header-align]=\"'center'\">\n              <amexio-header>\n                Templates\n              </amexio-header>\n              <amexio-body>\n                <amexio-row>\n                  <amexio-column [size]=\"'2'\" *ngFor=\"let template of templateOptions\">\n                    <amexio-card [header]=\"false\"\n                                 [footer]=\"true\"\n                                 [footer-align]=\"'center'\">\n                      <amexio-body>\n                        <div style=\"cursor: pointer\" [ngClass]=\"{'template-content-highlight' : template.selected}\">\n                          <amexio-image (onClick)=\"onTemplateClick(template)\" [path]=\"'assets/dna/template/images/blank.jpg'\">\n                          </amexio-image>\n                        </div>\n                      </amexio-body>\n                      <amexio-action >\n                        <amexio-label>\n                          {{template.name}}\n                        </amexio-label>\n                      </amexio-action>\n                    </amexio-card>\n\n                  </amexio-column>\n                </amexio-row>\n\n              </amexio-body>\n            </amexio-card>\n          </amexio-column>\n        </amexio-row>\n      </amexio-body>\n      <amexio-action>\n        <amexio-button [label]=\"'Cancel'\" (onClick)=\"closeWindow()\">\n        </amexio-button>\n        <amexio-button type=\"primary\" [label]=\"'Create'\" (onClick)=\"createUI()\">\n        </amexio-button>\n      </amexio-action>\n    </amexio-window>\n\n  ",
        styles: [
            ".template-content-highlight{\n        outline: none;\n        z-index: 0.3;\n        border: 1px solid #68ACCE;\n      }"
        ]
    })
], CreateUIComponent);
exports.CreateUIComponent = CreateUIComponent;
var CreateUIModel = (function () {
    function CreateUIModel() {
        this.boundedcontextId = '';
        this.boundedcontext = '';
        this.domain = '';
        this.domainId = '';
        this.name = '';
    }
    return CreateUIModel;
}());
exports.CreateUIModel = CreateUIModel;
