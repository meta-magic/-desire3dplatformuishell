"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var OperationDefinationComponent = (function () {
    function OperationDefinationComponent(http, loaderService, _notificationService) {
        this.http = http;
        this.loaderService = loaderService;
        this._notificationService = _notificationService;
        this.saveBtnEnable = false;
        this.validateoutputdefination = true;
        this.validateinputdefination = true;
        this.reset = new core_1.EventEmitter();
        this.operationModel = new OperationDetailsModel();
        this.inputDefinationModel = new InputDefinationModel();
        this.outputDefinationModel = new OutputDefinationMOdel();
        this.notificationmsg = [];
    }
    OperationDefinationComponent.prototype.ngOnInit = function () {
        this.getBoundedContext();
        this.initiateServiceCalls();
    };
    OperationDefinationComponent.prototype.createErrorData = function () {
        var errorData = [];
        var errorObj = {};
        errorObj['data'] = [];
        errorObj.data = this.notificationmsg;
        errorData.push(errorObj);
        this._notificationService.showerrorData('Error Message', errorData);
    };
    Object.defineProperty(OperationDefinationComponent.prototype, "id", {
        set: function (id) {
            if (id) {
                var op = id.split('###');
                if (op.length === 2) {
                    this.fetchOperationDefination(op[0], op[1]);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    OperationDefinationComponent.prototype.initiateServiceCalls = function () {
        this.fetchPrimitiveData();
    };
    OperationDefinationComponent.prototype.fetchOperationDefination = function (serviceId, operationName) {
        var _this = this;
        this.notificationmsg = [];
        var responsedata;
        this.http
            .post('/api/dna/servicedefinition/findByServiceAndOperationName', {
            serviceId: serviceId,
            name: operationName
        })
            .subscribe(function (response) {
            responsedata = response;
        }, function (err) {
            _this.notificationmsg.push('Unable to connect to server');
            _this.createErrorData();
        }, function () {
            _this.setResponseData(responsedata);
        });
    };
    OperationDefinationComponent.prototype.setResponseData = function (responsedata) {
        if (responsedata.success) {
            this.operationModel.setData(responsedata.response);
            this.inputDefinationModel.setData(responsedata.response);
            this.outputDefinationModel.setData(responsedata.response);
            this.onBoundedContextSelect({ id: this.operationModel.boundedContextId });
            this.onDomainSelect({});
        }
    };
    OperationDefinationComponent.prototype.getBoundedContext = function () {
        var _this = this;
        var bcData;
        this.http.get('/api/dna/bcontext/findAll').subscribe(function (response) {
            bcData = response;
        }, function (err) {
            _this.notificationmsg.push('Unable to connect to server');
            _this.createErrorData();
        }, function () {
            _this.operationModel.boundedContextData = bcData.response;
            _this.operationModel.boundedContextId = _this.operationModel.boundedContextData[0].id;
            _this.onBoundedContextSelect(_this.operationModel.boundedContextData[0]);
        });
    };
    OperationDefinationComponent.prototype.onBoundedContextSelect = function (bcdata) {
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
            _this.operationModel.domainData = responedata.response;
            _this.operationModel.domainId = _this.operationModel.domainData[0].id;
            _this.onDomainSelect({});
        });
    };
    OperationDefinationComponent.prototype.onDomainSelect = function (ddata) {
        var _this = this;
        this.notificationmsg = [];
        var responedata;
        var req = {
            bContextId: this.operationModel.boundedContextId,
            domainId: this.operationModel.domainId
        };
        this.http
            .post('/api/dna/servicedefinition/findByBContextAndDomain', req)
            .subscribe(function (response) {
            responedata = response;
        }, function (err) {
            _this.notificationmsg.push('Unable to connect to server');
            _this.createErrorData();
        }, function () {
            _this.operationModel.serviceData = responedata.response;
            _this.fetchObjects();
        });
    };
    OperationDefinationComponent.prototype.fetchObjects = function () {
        var _this = this;
        var responsedata;
        this.http
            .get('/api/dna/objects/findByDomainId/' + this.operationModel.domainId)
            .subscribe(function (response) {
            responsedata = response;
        }, function (err) {
            _this.notificationmsg.push('Unable to connect to server');
            _this.createErrorData();
        }, function () {
            if (responsedata.success) {
                _this.inputDefinationModel.setInputDataTypeData(responsedata);
                _this.outputDefinationModel.setOutPutDataTypeData(responsedata);
            }
        });
    };
    OperationDefinationComponent.prototype.fetchPrimitiveData = function () {
        var _this = this;
        var responedata;
        this.http.get('/api/dna/primitive/findAll').subscribe(function (response) {
            responedata = response;
        }, function (err) { }, function () {
            if (responedata.response) {
                _this.inputDefinationModel.setPrimitiveData(responedata.response);
            }
        });
    };
    OperationDefinationComponent.prototype.onInputTypeSelect = function (data) {
        this.inputDefinationModel.onInputTypeSelect(data);
    };
    OperationDefinationComponent.prototype.onConsumerSelect = function (data) {
        this.validateinputdefination = this.operationModel.consumerType === '0';
    };
    OperationDefinationComponent.prototype.onProducerSelect = function (data) {
        this.validateoutputdefination = this.operationModel.producerType === '0';
    };
    OperationDefinationComponent.prototype.onSave = function () {
        this.saveOperation();
    };
    OperationDefinationComponent.prototype.saveOperation = function () {
        var _this = this;
        this.notificationmsg = [];
        var reqbody = this.saveModel();
        this.loaderService.showLoader();
        var responsedata;
        this.http
            .post('/api/dna/servicedefinition/saveoperation', reqbody)
            .subscribe(function (response) {
            responsedata = response;
        }, function (err) {
            _this.loaderService.hideLoader();
            _this.notificationmsg.push('Unable to connect to server');
            _this.createErrorData();
            _this.saveBtnEnable = true;
        }, function () {
            _this.onSaveOperation(responsedata);
            _this.saveBtnEnable = true;
        });
    };
    OperationDefinationComponent.prototype.saveModel = function () {
        var reqbody = this.operationModel.toSaveJSON();
        if (this.operationModel.consumerType == '0') {
            delete reqbody.inputParams;
        }
        else {
            reqbody.inputParams = this.inputDefinationModel.inputDataParam;
        }
        if (this.operationModel.producerType == '0') {
            delete reqbody.outputParam;
        }
        else {
            reqbody.outputParam = this.outputDefinationModel.toSaveJson();
        }
        return reqbody;
    };
    OperationDefinationComponent.prototype.onSaveOperation = function (resp) {
        this.notificationmsg = [];
        if (!resp.success && resp.errorMessage) {
            this.loaderService.hideLoader();
            this.notificationmsg.push(resp.errorMessage);
            this.createErrorData();
        }
        else {
            this.loaderService.hideLoader();
            this.notificationmsg.push('Operation defination saved successfully!');
            this._notificationService.showSuccessData(this.notificationmsg);
            var response = resp.response;
            this.id = response.operationId;
            this.resetData();
        }
    };
    OperationDefinationComponent.prototype.onCancel = function () {
        this.resetData();
    };
    OperationDefinationComponent.prototype.resetData = function () {
        this.operationModel.reset();
        this.inputDefinationModel.reset();
        this.inputDefinationModel.inputDataParam = [];
        this.outputDefinationModel.reset();
        this.reset.emit({ reset: true });
    };
    return OperationDefinationComponent;
}());
__decorate([
    core_1.Output()
], OperationDefinationComponent.prototype, "reset");
__decorate([
    core_1.Input('id')
], OperationDefinationComponent.prototype, "id");
OperationDefinationComponent = __decorate([
    core_1.Component({
        selector: 'operation-defination',
        template: "\n <div class=\"loadingnav\" *ngIf=\"loaderService.isLoading\"></div>\n<amexio-form [body-height]=\"80\" [header]=\"true\" form-name=\"operationdefination\"  [show-error]=\"true\">\n    <amexio-form-header>Operation Definition</amexio-form-header>\n    <amexio-form-body>\n        <amexio-tab-view  [closable]=\"false\">\n            <amexio-tab title=\"Details\" [active]=\"true\">\n            <amexio-row>\n                <amexio-column [size]=6>\n                    <amexio-dropdown [search]=\"true\" [allow-blank]=\"false\" [(ngModel)]=\"operationModel.boundedContextId\"\n                                    [place-holder]=\"'Select Bounded Context'\" name=\"operationModel.boundedContextId\"\n                                     [error-msg]=\"'Select Bounded Context'\" [field-label]=\"'Bounded Context'\" \n                                     [display-field]=\"'name'\" [data]=\"operationModel.boundedContextData\"\n                                    (onSingleSelect) = \"onBoundedContextSelect($event)\"\n                                    [value-field]=\"'id'\">\n                    </amexio-dropdown>\n                </amexio-column>\n                <amexio-column [size]=6>\n                    <amexio-dropdown [search]=\"true\" [allow-blank]=\"false\"  [(ngModel)]=\"operationModel.domainId\"\n                                    [place-holder]=\"'Select Module'\" name=\"operationModel.domainId\"\n                                    [error-msg]=\"'Select Module'\" [data]=\"operationModel.domainData\"\n                                    [field-label]=\"'Module'\" [display-field]=\"'name'\" [value-field]=\"'id'\"\n                                    (onSingleSelect) = \"onDomainSelect($event)\">\n                    </amexio-dropdown>\n                </amexio-column>\n            </amexio-row>\n            <amexio-row>\n                <amexio-column [size]=6>\n                    <amexio-dropdown  [search]=\"true\" [allow-blank]=\"false\"  [(ngModel)]=\"operationModel.serviceId\"\n                        [place-holder]=\"'Select Service'\" name=\"operationModel.serviceId\"\n                        [error-msg]=\"'Select Service'\" [data]=\"operationModel.serviceData\"\n                        [field-label]=\"'Service'\" [display-field]=\"'name'\" [value-field]=\"'id'\">\n                    </amexio-dropdown>\n                </amexio-column>\n                <amexio-column [size]=6>\n                    <amexio-text-input [allow-blank]=\"false\"  field-label=\"Operation Name\" [pattern]=\"'^[a-zA-Z][a-zA-Z0-9]*$'\" name=\"operationModel.operationName\"\n                        place-holder=\"Enter Operation Name\" [(ngModel)]=\"operationModel.operationName\"\n                        enable-popover=\"true\" error-msg=\"Please Enter Operation Name\" icon-feedback=\"true\">\n                    </amexio-text-input>\n                </amexio-column>\n            </amexio-row>\n            <amexio-row>\n                <amexio-column [size]=6>\n                    <amexio-text-input [allow-blank]=\"false\"  field-label=\"URL\" name=\"operationModel.operationUrl\"\n                        place-holder=\"Enter Operation URL\" [(ngModel)]=\"operationModel.operationUrl\"\n                        enable-popover=\"true\" error-msg=\"Please Enter Operation URL\" icon-feedback=\"true\">\n                    </amexio-text-input>\n                </amexio-column>\n                <amexio-column [size]=6>\n                    <amexio-dropdown [search]=\"true\" [(ngModel)]=\"operationModel.methodType\" [place-holder]=\"'Select Method'\" name=\"operationModel.methodType\"\n                        [error-msg]=\"'Select Method'\"\n                        [data]=\"operationModel.methodTypeData\" [field-label]=\"'Method Type'\" [display-field]=\"'methodType'\" [value-field]=\"'methodTypeId'\">\n                    </amexio-dropdown>\n                </amexio-column>\n            </amexio-row>\n            <amexio-row>\n                <amexio-column [size]=6>\n                    <amexio-dropdown [search]=\"true\" [(ngModel)]=\"operationModel.consumerType\" [place-holder]=\"'Select Consumer Type '\" name=\"operationModel.consumerType\"\n                        [error-msg]=\"'Select Consumer Type'\"  (onSingleSelect) = \"onConsumerSelect($event)\"\n                        [data]=\"operationModel.contentTypeData\" [field-label]=\"'Consumer Type'\" [display-field]=\"'contentType'\" [value-field]=\"'contentTypeId'\">\n                    </amexio-dropdown>\n                </amexio-column>\n                <amexio-column [size]=6>\n                    <amexio-dropdown [search]=\"true\" [(ngModel)]=\"operationModel.producerType\" [place-holder]=\"'Select Producer Type '\" name=\"operationModel.producerType\"\n                         [error-msg]=\"'Select Producer Type'\"  (onSingleSelect) = \"onProducerSelect($event)\"\n                        [data]=\"operationModel.contentTypeData\" [field-label]=\"'Producer Type'\" [display-field]=\"'contentType'\" [value-field]=\"'contentTypeId'\">\n                    </amexio-dropdown>\n                </amexio-column>\n            </amexio-row>\n            </amexio-tab>\n            <amexio-tab title=\"Input Definition\" [disabled]=\"(operationModel.consumerType == '0')\">\n            <amexio-row>\n                <amexio-column [size]=6>\n                    <amexio-dropdown [search]=\"true\" [(ngModel)]=\"inputDefinationModel.inputType\" [place-holder]=\"'Select Input Type '\" name=\"inputDefinationModel.inputType\"\n                        [allow-blank]=\"validateinputdefination\" [error-msg]=\"'Select Input Type'\"   (onSingleSelect)=\"onInputTypeSelect($event)\"\n                        [data]=\"inputDefinationModel.inputTypeData\" [field-label]=\"'Input Type'\" [display-field]=\"'inputType'\" [value-field]=\"'inputTypeId'\">\n                    </amexio-dropdown>\n                </amexio-column>\n                <amexio-column [size]=6>\n                    <amexio-text-input field-label=\"Input Name\" name=\"inputDefinationModel.inputName\"\n                        [allow-blank]=\"validateinputdefination\" place-holder=\"Enter Input name\" [(ngModel)]=\"inputDefinationModel.inputName\"\n                        enable-popover=\"true\" error-msg=\"Please Enter Input Name\" icon-feedback=\"true\">\n                    </amexio-text-input>\n                </amexio-column>\n            </amexio-row>\n            <amexio-row>\n                <amexio-column [size]=6>\n                    <amexio-dropdown [search]=\"true\" [(ngModel)]=\"inputDefinationModel.inputDataType\" [place-holder]=\"'Select Input Data Type '\" name=\"inputDefinationModel.inputDataType\"\n                        [allow-blank]=\"validateinputdefination\" [error-msg]=\"'Select Input Data Type '\"\n                        [data]=\"inputDefinationModel.bindInputDataTypeData\" [field-label]=\"'Input Data Type'\" [display-field]=\"'typeName'\" [value-field]=\"'id'\">\n                    </amexio-dropdown>\n                </amexio-column>\n                <amexio-column [size]=6>\n                    <amexio-checkbox [disabled]=\"(inputDefinationModel.inputType !='1' )\" [field-label]=\"'Collection'\" [(ngModel)]=\"inputDefinationModel.collection\">\n                    </amexio-checkbox>\n                </amexio-column>\n            </amexio-row>\n            <amexio-row>\n                <amexio-column [size]=6>\n                    <amexio-button [label]=\"'Add'\" [type]=\"'theme-backgroundcolor'\"  (onClick)=\"inputDefinationModel.addInput()\"> </amexio-button>\n                </amexio-column>\n            </amexio-row>\n            <amexio-row>\n                <amexio-column [size]=12>\n                    <amexio-datagrid title=\"Input Parameters\" [data]=\"inputDefinationModel.inputDataParam\" [page-size] = \"10\">\n                        <amexio-data-table-column [data-index]=\"'inputParamName'\" [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'Name'\">\n                        </amexio-data-table-column>\n                        <amexio-data-table-column [data-index]=\"'collection'\" [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'Is Collection'\">\n                        </amexio-data-table-column>\n                        <amexio-data-table-column [data-index]=\"''\" [data-type]=\"'string'\" [text]=\"'Action'\">\n                            <ng-template #amexioBodyTmpl let-column let-row=\"row\">\n                                <amexio-image style=\"color:red;\" [icon-class]=\"'fa fa-minus-circle fa-2x'\" [tooltip]=\"'Delete'\" (onClick)=\"inputDefinationModel.removeInput(row)\">\n                                 </amexio-image>\n                            </ng-template>\n                        </amexio-data-table-column>\n                    </amexio-datagrid>\n                </amexio-column>\n            </amexio-row>\n        </amexio-tab>\n        <amexio-tab title=\"Output Definition\"  [disabled]=\"(operationModel.producerType == '0')\">\n            <amexio-row>\n                    <amexio-column [size]=4>\n                        <amexio-text-input field-label=\"Output Name\" name=\"outputDefinationModel.outputName\"\n                            [allow-blank]=\"validateoutputdefination\" place-holder=\"Please Enter Output Name\" [(ngModel)]=\"outputDefinationModel.outputName\"\n                            enable-popover=\"true\" error-msg=\"Please Enter Output Name\" icon-feedback=\"true\">\n                        </amexio-text-input>\n                    </amexio-column>\n                    <amexio-column [size]=4>\n                        <amexio-dropdown [search]=\"true\" [(ngModel)]=\"outputDefinationModel.outputDataType\" [place-holder]=\"'Select Consumer Type '\" name=\"outputDefinationModel.outputDataType\"\n                            [allow-blank]=\"validateoutputdefination\" [error-msg]=\"'Select Output Data Type'\"\n                            [data]=\"outputDefinationModel.outputDataTypeData\" [field-label]=\"'Output Data Type'\" [display-field]=\"'typeName'\" [value-field]=\"'id'\">\n                        </amexio-dropdown>\n                    </amexio-column>\n                    <amexio-column [size]=4>\n                        <amexio-checkbox  [field-label]=\"'Collection'\" [(ngModel)]=\"outputDefinationModel.collection\">\n                        </amexio-checkbox>\n                    </amexio-column>\n            </amexio-row>\n        </amexio-tab>\n        </amexio-tab-view>\n    </amexio-form-body>\n    <amexio-form-action>\n        <amexio-button [label]=\"'Cancel'\" (onClick)=\"onCancel()\"  [icon]=\"'fa fa-close'\" [type]=\"'secondary'\" [size]=\"'default'\" [tooltip]=\"'Cancel'\"></amexio-button>\n        <amexio-button [label]=\"'Save'\" [disabled]=\"saveBtnEnable\" [form-bind]=\"'operationdefination'\" (onClick)=\"onSave()\" [icon]=\"'fa fa-save'\" [type]=\"'primary'\" [size]=\"'default'\" [tooltip]=\"'Save'\"></amexio-button>\n    </amexio-form-action>\n</amexio-form>\n<dna-notification></dna-notification>\n    "
    })
], OperationDefinationComponent);
exports.OperationDefinationComponent = OperationDefinationComponent;
var OperationDetailsModel = (function () {
    function OperationDetailsModel() {
        this.methodTypeData = [
            { methodType: 'GET', methodTypeId: '1' },
            { methodType: 'POST', methodTypeId: '2' },
            { methodType: 'PUT', methodTypeId: '3' },
            { methodType: 'DELETE', methodTypeId: '4' }
        ];
        this.contentTypeData = [
            { contentType: 'none', contentTypeId: '0' },
            { contentType: 'application/json', contentTypeId: '1' },
            { contentType: 'application/pdf', contentTypeId: '2' },
            { contentType: 'application/xml', contentTypeId: '3' }
        ];
        this.consumerType = '0';
        this.producerType = '0';
        this.domainData = [];
        this.serviceData = [];
    }
    OperationDetailsModel.prototype.setData = function (responsedata) {
        var opr = responsedata.operations[0];
        this.boundedContextId = responsedata.boundedContextId;
        this.domainId = responsedata.domainId;
        this.serviceId = responsedata.id;
        this.operationName = opr.operationName;
        this.operationUrl = opr.httpUrl;
        this.consumerType = opr.contentTypeId;
        this.producerType = opr.producerTypeId;
        this.methodType = opr.methodTypeId;
        this.operationId = opr.operationId;
    };
    OperationDetailsModel.prototype.reset = function () {
        this.boundedContextId = '';
        this.domainId = '';
        this.serviceId = '';
        this.operationName = '';
        this.operationUrl = '';
        this.consumerType = '0';
        this.producerType = '0';
        this.methodType = '1';
        this.domainData = [];
        this.serviceData = [];
        this.operationId = '';
    };
    OperationDetailsModel.prototype.toSaveJSON = function () {
        return {
            serviceId: this.serviceId,
            operationName: this.operationName,
            methodTypeId: this.methodType,
            consumerTypeId: this.consumerType,
            producerTypeId: this.producerType,
            httpUrl: this.operationUrl,
            operationId: this.operationId,
            inputParams: [],
            outputParam: {}
        };
    };
    return OperationDetailsModel;
}());
exports.OperationDetailsModel = OperationDetailsModel;
var InputDefinationModel = (function () {
    function InputDefinationModel() {
        this.inputDataParam = [];
        this.inputTypeData = [
            { inputType: 'Request Body (JSON)', inputTypeId: '1' },
            { inputType: 'Request Parameters', inputTypeId: '2' },
            { inputType: 'Path Vairables', inputTypeId: '3' }
        ];
        this.inputType = '1';
        this.collection = false;
        this.inputDataParam = [];
        this.primitiveData = [];
        this.inputDataTypeData = [];
        this.bindInputDataTypeData = this.inputDataTypeData;
    }
    InputDefinationModel.prototype.setPrimitiveData = function (data) {
        if (data) {
            this.primitiveData = data;
        }
    };
    InputDefinationModel.prototype.setData = function (data) {
        var opr = data.operations[0];
        this.inputDataParam = opr.inputParamList;
    };
    InputDefinationModel.prototype.setInputDataTypeData = function (data) {
        this.inputDataTypeData = data.response;
        this.updateInputDataTypeData();
    };
    InputDefinationModel.prototype.onInputTypeSelect = function (data) {
        if (data.inputTypeId && data.inputTypeId != '1') {
            this.collection = false;
        }
        this.updateInputDataTypeData();
    };
    InputDefinationModel.prototype.updateInputDataTypeData = function () {
        if (this.inputType != '1') {
            this.bindInputDataTypeData = this.primitiveData;
        }
        else {
            this.bindInputDataTypeData = this.inputDataTypeData;
        }
    };
    InputDefinationModel.prototype.toSaveJson = function () {
        return {
            inputParamTypeId: this.inputType,
            inputParamName: this.inputName,
            inputParamType: this.inputDataType,
            collection: this.collection
        };
    };
    InputDefinationModel.prototype.addInput = function () {
        if (this.inputName &&
            this.inputType &&
            this.inputDataType &&
            this.inputName.length > 0 &&
            this.inputType.length > 0 &&
            this.inputDataType.length > 0) {
            this.inputDataParam.push(this.toSaveJson());
        }
    };
    InputDefinationModel.prototype.removeInput = function (row) {
        var input = [];
        for (var i = 0; i < this.inputDataParam.length; i++) {
            var node = this.inputDataParam[i];
            if (!(node.inputParamName == row.inputParamName &&
                node.inputParamType == row.inputParamType)) {
                input.push(node);
            }
        }
        this.inputDataParam = input;
    };
    InputDefinationModel.prototype.reset = function () {
        this.inputType = '';
        this.inputName = '';
        this.inputDataType = '';
        this.collection = false;
        this.inputDataParam = [];
    };
    return InputDefinationModel;
}());
exports.InputDefinationModel = InputDefinationModel;
var OutputDefinationMOdel = (function () {
    function OutputDefinationMOdel() {
        this.outputDataTypeData = [];
    }
    OutputDefinationMOdel.prototype.setOutPutDataTypeData = function (data) {
        this.outputDataTypeData = data.response;
    };
    OutputDefinationMOdel.prototype.toSaveJson = function () {
        return {
            outputParamTypeId: '1',
            outputParamName: this.outputName,
            outputParamType: this.outputDataType,
            collection: this.collection
        };
    };
    OutputDefinationMOdel.prototype.setData = function (data) {
        var opr = data.operations[0];
        this.outputName = opr.outputParam.outputParamName;
        this.outputDataType = opr.outputParam.outputParamType;
        this.collection = opr.outputParam.collection;
    };
    OutputDefinationMOdel.prototype.reset = function () {
        this.outputName = '';
        this.outputDataType = '';
        this.collection = false;
    };
    return OutputDefinationMOdel;
}());
exports.OutputDefinationMOdel = OutputDefinationMOdel;
