"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
/**
 * Created by pratik on 5/3/18.
 */
var core_1 = require("@angular/core");
var datasource_model_1 = require("../canvas-models/datasource.model");
var canvas_constant_1 = require("../canvas-models/canvas.constant");
var DataSourceComponent = (function () {
    function DataSourceComponent(_restCallService, cdf, _sharedDataService) {
        this._restCallService = _restCallService;
        this.cdf = cdf;
        this._sharedDataService = _sharedDataService;
        this.dataAccordion = false;
        this.localTreeData = [];
        this.notificationData = [];
        this.change = true;
        this.parentJsonStructure = [];
        this.dataSourceTab = true;
        this.dataMappingTab = false;
        this.dataMapperDisabled = true;
        this.conformWindow = false;
        this.serviceLocalRadioGroupData = [
            {
                serviceName: 'Remote Call',
                servicetype: '1'
            },
            {
                serviceName: 'Local Data',
                servicetype: '2'
            }
        ];
    }
    DataSourceComponent.prototype.ngOnInit = function () {
        this.componentInstance.dataSource.metadata.bcId = this._sharedDataService.uiDetails.boundedcontextId;
        this.componentInstance.dataSource.metadata.domainId = this._sharedDataService.uiDetails.domainId;
        this.selectDomain();
        this.setEditModeData();
    };
    DataSourceComponent.prototype.backToCanvas = function () {
        this.componentInstance._eventHndl.showDataSource = false;
        this.componentInstance._eventHndl.showCanvas = true;
        this.componentInstance._eventHndl.showRelationship = false;
    };
    DataSourceComponent.prototype.setEditModeData = function () {
        if (this.componentInstance.dataSource.local != null &&
            this.componentInstance.dataSource.local.hasOwnProperty('data') &&
            this.componentInstance.dataSource.local.data != null) {
            this.parentJsonStructure.push(JSON.parse(this.componentInstance.dataSource.local.data));
            this.treeLocalData = this.parseObject(this.parentJsonStructure[0]);
            if (this.componentInstance.dataSource.localTreeData) {
                this.componentInstance.dataSource.localTreeData.expanded = false;
                this.localTreeData = [this.componentInstance.dataSource.localTreeData];
                this.dataMapperDisabled = false;
            }
        }
        else {
            this.localTreeData = [];
            this.treeLocalData = this.componentInstance.dataSource.localTreeData;
            if (this.componentInstance.dataSource.metadata.serviceId) {
                var seriveData = {
                    id: this.componentInstance.dataSource.metadata.serviceId
                };
                this.selectService(seriveData);
            }
        }
    };
    DataSourceComponent.prototype.onClose = function () {
        this.componentInstance.dataSource.local.data = null;
        this.componentInstance.dataSource.localTreeData = null;
        this.componentInstance.dataSource.remote = null;
        this.componentInstance.dataSource.metadata.bcId = '';
        this.componentInstance.dataSource.metadata.domainId = '';
        this.componentInstance.dataSource.metadata.serviceId = '';
        this.componentInstance.dataSource.metadata.operationId = '';
        this.componentInstance.dataSource.metadata.methodType = '';
        this.componentInstance.dataSource.dataReader = '';
        if (this.componentInstance.dataSource.hasOwnProperty('displayField')) {
            this.componentInstance.dataSource.displayField = '';
        }
        if (this.componentInstance.dataSource.hasOwnProperty('valueField')) {
            this.componentInstance.dataSource.valueField = '';
        }
    };
    DataSourceComponent.prototype.confirmWindowCloseEvent = function (status) {
        if (status == 'ok') {
            this.confirmWindowClose = false;
            this.showDatasource = false;
        }
        else {
            this.confirmWindowClose = false;
        }
    };
    DataSourceComponent.prototype.selectDomain = function () {
        var _this = this;
        var response;
        var requestJson = {
            bContextId: this.componentInstance.dataSource.metadata.bcId,
            domainId: this.componentInstance.dataSource.metadata.domainId
        };
        this._restCallService
            .postRestCall(canvas_constant_1.prefixUrl + '/api/dna/servicedefinition/findByBContextAndDomain', requestJson)
            .subscribe(function (res) {
            response = res;
        }, function (err) { }, function () {
            if (response) {
                _this.serviceLocalData = response;
            }
        });
    };
    DataSourceComponent.prototype.selectService = function (service) {
        var _this = this;
        var response;
        var requestJson = {
            id: service.id
        };
        this._restCallService
            .postRestCall(canvas_constant_1.prefixUrl + '/api/dna/servicedefinition/getOperationsByServiceId', requestJson)
            .subscribe(function (res) {
            response = res;
        }, function (err) { }, function () {
            if (response) {
                _this.operationLocalData = response;
            }
        });
    };
    DataSourceComponent.prototype.selectOperation = function (operation) {
        var _this = this;
        if (this.componentInstance.dataSource.remote != null) {
            this.componentInstance.dataSource.remote.httpMethod =
                operation.methodTypeId;
            this.componentInstance.dataSource.remote.httpUrl = operation.httpUrl;
        }
        this.componentInstance.dataSource.metadata.methodType =
            operation.methodTypeId;
        if (operation.outputParam.outputParamTypeId == 1) {
            var response_1;
            var requestJson = {
                id: operation.operationId,
                serviceId: this.componentInstance.dataSource.metadata.serviceId
            };
            this._restCallService
                .postRestCall(canvas_constant_1.prefixUrl + '/api/dna/servicedefinition/findByOperationId', requestJson)
                .subscribe(function (res) {
                response_1 = res;
            }, function (err) {
                console.log(err);
            }, function () {
                if (response_1) {
                    _this.treeLocalData = response_1.response.outputs;
                }
            });
        }
    };
    DataSourceComponent.prototype.setSelectedServiceLocalData = function (selectedData) {
        this.selectedRadioData = selectedData;
        this.componentInstance.dataSource.servicetype = this.selectedRadioData.servicetype;
        this.conformWindow = true;
    };
    DataSourceComponent.prototype.closeDialogueBox = function () {
        this.cdf.detectChanges();
        if (this.selectedRadioData.servicetype == '2') {
            this.componentInstance.dataSource.servicetype = '1';
        }
        else if (this.selectedRadioData.servicetype == '1') {
            this.componentInstance.dataSource.servicetype = '2';
        }
        this.clearDataStatus = false;
        this.conformWindow = false;
    };
    DataSourceComponent.prototype.clearDataStatusEvent = function (statusData) {
        if (statusData == 'ok') {
            this.clearDataStatus = true;
            this.conformWindow = false;
            this.changeServiceType(this.selectedRadioData);
            this.cdf.detectChanges();
            this.dataMapperDisabled = true;
            this.componentInstance.dataSource.servicetype = this.selectedRadioData.servicetype;
        }
        else if (statusData == 'cancel') {
            this.closeDialogueBox();
        }
        this.clearDataStatus = false;
        this.conformWindow = false;
    };
    DataSourceComponent.prototype.changeServiceType = function (selectedData) {
        if (this.clearDataStatus) {
            if (selectedData.servicetype == '2') {
                this.localTreeData.length = 0;
                this.parentJsonStructure = [];
                this.componentInstance.dataSource.localDataName =
                    'localData' + Math.floor(Math.random() * 90000) + 10000;
                this.componentInstance.dataSource.servicetype =
                    selectedData.servicetype;
                this.resetSetRemoteCallData();
            }
            else {
                this.componentInstance.dataSource.servicetype =
                    selectedData.servicetype;
                this.componentInstance.dataSource.localDataName = null;
                this.componentInstance.dataSource.local = null;
                this.resetSetRemoteCallData();
                this.componentInstance.dataSource.remote = new datasource_model_1.Remote();
            }
        }
    };
    DataSourceComponent.prototype.resetSetRemoteCallData = function () {
        this.componentInstance.dataSource.remote = null;
        this.componentInstance.dataSource.dataReader = '';
        this.componentInstance.dataSource.hasOwnProperty('displayField')
            ? (this.componentInstance.dataSource.displayField = '')
            : null;
        this.componentInstance.dataSource.hasOwnProperty('valueField')
            ? (this.componentInstance.dataSource.valueField = '')
            : null;
        this.treeLocalData = [];
        this.componentInstance.dataSource.metadata.recordData = [];
    };
    /*LocalData*/
    DataSourceComponent.prototype.showKeyIcon = function (row) {
        if (row.type == 'array' || row.type == 'key') {
            return false;
        }
        else {
            return true;
        }
    };
    DataSourceComponent.prototype.showRepeatIcon = function (row) {
        if (row.type == 'array' &&
            row.hasOwnProperty('children') &&
            row.children.length >= 1) {
            return true;
        }
        else
            return false;
    };
    DataSourceComponent.prototype.showRepeatIconInverse = function (row) {
        if (row.type == 'array' &&
            row.hasOwnProperty('children') &&
            row.children.length >= 1) {
            return false;
        }
        else
            return true;
    };
    DataSourceComponent.prototype.addParentObject = function () {
        var treeDataObjectStructure = this.createObjectStructure('object');
        treeDataObjectStructure.key = '{}';
        treeDataObjectStructure.readOnly = true;
        this.localTreeData[0] = treeDataObjectStructure;
        this.createJsonData();
    };
    DataSourceComponent.prototype.addParentArray = function () {
        var treeDataObjectStructure = this.createObjectStructure('array');
        treeDataObjectStructure.key = '[]';
        treeDataObjectStructure.readOnly = true;
        this.localTreeData[0] = treeDataObjectStructure;
        this.createJsonData();
    };
    DataSourceComponent.prototype.repeatObject = function (type, rowData, index) {
        var cloneData;
        cloneData = JSON.parse(JSON.stringify(rowData.children[0]));
        rowData.children.push(this.createCloneData(cloneData, rowData.children.length));
        this.toogle(rowData, index);
        this.createJsonData();
    };
    DataSourceComponent.prototype.addDataObject = function (type, rowData, index) {
        var treeDataObjectStructure = this.createObjectStructure(type);
        if (rowData.hasOwnProperty('children')) {
            if (rowData.type == 'array' && type == 'object') {
                treeDataObjectStructure.key = '[' + rowData.children.length + ']';
                treeDataObjectStructure['readOnly'] = true;
            }
            else if (rowData.type == 'array' && type == 'array') {
                treeDataObjectStructure.key = '[]';
                treeDataObjectStructure['readOnly'] = true;
                rowData.children.push(treeDataObjectStructure);
            }
            else {
                rowData.children.push(treeDataObjectStructure);
            }
        }
        else {
            rowData['children'] = [];
            if (rowData.type == 'array' && type == 'object') {
                treeDataObjectStructure.key = '[' + rowData.children.length + ']';
                treeDataObjectStructure['readOnly'] = true;
            }
            else if (rowData.type == 'array' && type == 'array') {
                treeDataObjectStructure.key = '[]';
                treeDataObjectStructure['readOnly'] = true;
            }
            rowData.children.push(treeDataObjectStructure);
        }
        this.toogle(rowData, index);
        this.createJsonData();
    };
    DataSourceComponent.prototype.createCloneData = function (cloneData, index) {
        var test = [];
        var treeDataObjectStructure = this.createObjectStructure(cloneData.type);
        if (cloneData.type == 'object') {
            treeDataObjectStructure.key = '[' + index + ']';
        }
        else {
            treeDataObjectStructure.key = '[]';
        }
        treeDataObjectStructure.readOnly = true;
        if (cloneData.hasOwnProperty('children')) {
            treeDataObjectStructure['children'] = [];
            this.childSearch(cloneData, treeDataObjectStructure);
        }
        test.push(treeDataObjectStructure);
        return test[0];
    };
    DataSourceComponent.prototype.childSearch = function (child, parentRef) {
        var _this = this;
        child.children.forEach(function (opt) {
            var treeDataObjectStructure = _this.createObjectStructure(opt.type);
            treeDataObjectStructure.key = opt.key;
            if (opt.hasOwnProperty('children')) {
                treeDataObjectStructure['children'] = [];
                _this.childSearch(opt, treeDataObjectStructure);
            }
            parentRef.children.push(treeDataObjectStructure);
        });
    };
    DataSourceComponent.prototype.keyOnChange = function (event, data) {
        data.key = event;
        this.createJsonData();
    };
    DataSourceComponent.prototype.valueOnChange = function (event, data) {
        data.value = event;
        this.createJsonData();
    };
    DataSourceComponent.prototype.createJsonData = function () {
        this.buildingJson(this.localTreeData[0]);
    };
    DataSourceComponent.prototype.buildingJson = function (treeData) {
        this.parentJsonStructure = [];
        var structure;
        if (treeData.type == 'object') {
            structure = {};
            if (treeData.hasOwnProperty('children')) {
                this.buildingObjectJson(treeData, structure);
            }
        }
        else {
            structure = [];
            if (treeData.hasOwnProperty('children')) {
                this.buildingArrayJson(treeData, structure);
            }
        }
        this.parentJsonStructure.push(structure);
        this.treeLocalData = this.parseObject(this.parentJsonStructure[0]);
    };
    DataSourceComponent.prototype.createObjectStructure = function (type) {
        if (type == 'object') {
            var treeDataObjectStructure = new TreeDataObjectStructure();
            treeDataObjectStructure.type = 'object';
            treeDataObjectStructure.key =
                'object_' + Math.floor(Math.random() * 90000) + 1;
            treeDataObjectStructure.value = '{}';
            treeDataObjectStructure['readOnly'] = false;
            return treeDataObjectStructure;
        }
        else if (type == 'array') {
            var treeDataObjectStructure = new TreeDataObjectStructure();
            treeDataObjectStructure.type = 'array';
            treeDataObjectStructure.key =
                'array_' + Math.floor(Math.random() * 90000) + 1;
            treeDataObjectStructure.value = '[]';
            treeDataObjectStructure['readOnly'] = false;
            return treeDataObjectStructure;
        }
        else {
            var treeDataObjectStructure = new TreeDataObjectStructure();
            treeDataObjectStructure.type = 'key';
            treeDataObjectStructure.key =
                'key_' + Math.floor(Math.random() * 90000) + 1;
            treeDataObjectStructure.value = 'key';
            treeDataObjectStructure['readOnly'] = false;
            return treeDataObjectStructure;
        }
    };
    DataSourceComponent.prototype.buildingObjectJson = function (data, parentRef) {
        var _this = this;
        data.children.forEach(function (option, index) {
            if (option.type == 'object') {
                parentRef[option.key] = {};
                if (option.hasOwnProperty('children')) {
                    _this.buildingObjectJson(option, parentRef[option.key]);
                }
            }
            else if (option.type == 'array') {
                parentRef[option.key] = [];
                if (option.hasOwnProperty('children')) {
                    _this.buildingArrayJson(option, parentRef[option.key]);
                }
            }
            else {
                parentRef[option.key] = option.value;
            }
        });
    };
    DataSourceComponent.prototype.buildingArrayJson = function (data, parentRef) {
        var _this = this;
        data.children.forEach(function (option, index) {
            if (option.type == 'array') {
                var localArray = void 0;
                localArray = [];
                parentRef.push(localArray);
                if (option.hasOwnProperty('children')) {
                    /* need to change parameter*/
                    _this.buildingArrayJson(option, parentRef[index]);
                }
            }
            else if (option.type == 'object') {
                var localArray = void 0;
                localArray = {};
                parentRef.push(localArray);
                if (option.hasOwnProperty('children')) {
                    /* need to change parameter*/
                    _this.buildingObjectJson(option, parentRef[index]);
                }
            }
        });
    };
    /* remove object*/
    DataSourceComponent.prototype.onRemove = function (row) {
        if (this.localTreeData == row) {
            this.localTreeData = [];
        }
        else {
            if (row.hasOwnProperty('children')) {
                this.removeRows(row);
                this.searchInChild(this.localTreeData, row);
            }
            else {
                this.searchInChild(this.localTreeData, row);
            }
        }
        this.cdf.detectChanges();
        this.createJsonData();
    };
    DataSourceComponent.prototype.searchInChild = function (rowData, searchObject) {
        var _this = this;
        rowData.forEach(function (opt, index) {
            if (opt.id == searchObject.id) {
                rowData.splice(index, 1);
            }
            else if (opt.hasOwnProperty('children')) {
                _this.searchInChild(opt.children, searchObject);
            }
        });
    };
    DataSourceComponent.prototype.toogle = function (row, index) {
        row.expanded = true;
        if (row.expanded) {
            this.addRows(row, index);
        }
    };
    DataSourceComponent.prototype.addRows = function (row, index) {
        this.removeRows(row);
        if (row.hasOwnProperty('children')) {
            for (var i = 0; i < row.children.length; i++) {
                var node = row.children[i];
                if (!row.level) {
                    row.level = 1;
                }
                if (node.children) {
                    node.expanded = false;
                }
                node.level = row.level + 1;
                this.localTreeData.splice(index + (i + 1), 0, node);
            }
        }
    };
    DataSourceComponent.prototype.removeRows = function (node) {
        for (var i = 0; i < node.children.length; i++) {
            for (var j = 0; j < this.localTreeData.length; j++) {
                if (this.localTreeData[j] === node.children[i]) {
                    if (node.children[i].children) {
                        this.removeRows(node.children[i]);
                    }
                    this.localTreeData.splice(this.localTreeData.indexOf(node.children[i]), 1);
                }
            }
        }
    };
    //TO PARSE THE DATA TO TREE DATA
    DataSourceComponent.prototype.parseObject = function (jsondata) {
        var tmpjson = JSON.parse(JSON.stringify(jsondata));
        var ary = [];
        this.getTreeJSON(tmpjson, ary);
        return ary;
    };
    //GET THE TREE DATA
    DataSourceComponent.prototype.getTreeJSON = function (json, tmp) {
        if (json) {
            if (json.length > 1) {
                for (var j in json[0]) {
                    var child = {};
                    child['text'] = j;
                    tmp.push(child);
                }
            }
            else {
                for (var j in json) {
                    var sub_key = j;
                    var sub_val = json[j];
                    var child = {};
                    child['text'] = sub_key;
                    if (sub_val instanceof Array) {
                        child['children'] = [];
                        var innerjson = this.getTreeJSON(sub_val[0], child['children']);
                        if (innerjson)
                            child['children'].push(innerjson);
                    }
                    else if (sub_val instanceof Object) {
                        child['children'] = [];
                        var innerjson = this.getTreeJSON(sub_val, child['children']);
                        if (innerjson)
                            child['children'].push(innerjson);
                    }
                    tmp.push(child);
                }
            }
        }
    };
    /*save data*/
    DataSourceComponent.prototype.onSaveClick = function () {
        if (this.componentInstance.dataSource.servicetype == '2') {
            this.componentInstance.dataSource.remote = null;
            this.componentInstance.dataSource.local = new datasource_model_1.Local();
            this.componentInstance.dataSource.local.data = JSON.stringify(this.parentJsonStructure[0]);
            this.componentInstance.dataSource.localDataName =
                this.componentInstance.name + 'Data';
            this.componentInstance.dataSource.localTreeData = this.localTreeData[0];
        }
        else {
            this.componentInstance.dataSource.localTreeData = this.treeLocalData;
        }
        this.showDatasource = false;
        this.backToCanvas();
    };
    DataSourceComponent.prototype.checkValidation = function () {
        if (this.componentInstance.dataSource.metadata.bcId != '' &&
            this.componentInstance.dataSource.metadata.domainId != '' &&
            this.componentInstance.dataSource.metadata.servicetype != '' &&
            this.componentInstance.dataSource.metadata.operationId != '') {
            return true;
        }
        else
            return false;
    };
    DataSourceComponent.prototype.onNextClick = function () {
        if (this.componentInstance.dataSource.servicetype == '1') {
            if (this.checkValidation()) {
                this.dataMapperDisabled = false;
                this.dataSourceTab = false;
                this.dataMappingTab = true;
            }
            else {
                this.dataMapperDisabled = true;
                this.notificationData.push('please fill all data');
            }
        }
        else if (this.localTreeData.length >= 1) {
            this.dataMapperDisabled = false;
            this.dataSourceTab = false;
            this.dataMappingTab = true;
        }
        else {
            this.dataMapperDisabled = true;
            this.notificationData.push('please add local data');
        }
    };
    return DataSourceComponent;
}());
__decorate([
    core_1.Input()
], DataSourceComponent.prototype, "showDatasource");
__decorate([
    core_1.Input()
], DataSourceComponent.prototype, "componentInstance");
DataSourceComponent = __decorate([
    core_1.Component({
        selector: 'data-source',
        template: "    \n    <amexio-card [header]=\"true\"\n                 [footer]=\"false\"\n                 [footer-align]=\"'right'\"\n                 [body-height]=\"85\">\n      <amexio-header>\n        <i (click)=\"backToCanvas()\" style=\"cursor: pointer\" class=\"fa fa-chevron-left\" aria-hidden=\"true\"></i>&nbsp;&nbsp;Component Datasource\n      </amexio-header>\n      <amexio-body>\n        \n        <amexio-tab-view [closable]=\"false\" [action]=\"true\">\n\n          <amexio-tab-action>\n            <ng-container *ngIf=\"change\">\n              <amexio-radio-group\n                name=\"service\"\n                [field-label]=\"''\"\n                horizontal=\"true\"\n                [display-field]=\"'serviceName'\"\n                [value-field]=\"'servicetype'\"\n                (onSelection)=\"setSelectedServiceLocalData($event)\"\n                [default-value]=\"componentInstance.dataSource.servicetype\"\n                [data]=\"serviceLocalRadioGroupData\">\n              </amexio-radio-group>\n            </ng-container>\n          </amexio-tab-action>\n          <amexio-tab title=\"Data Store\" [active]=\"dataSourceTab\">\n\n            <amexio-card [header]=\"false\"\n                         [footer]=\"true\"\n                         [footer-align]=\"'right'\" [body-height]=\"60\">\n              <amexio-body>\n                <ng-container *ngIf=\"componentInstance.dataSource.servicetype != 2\">\n                  <amexio-row>\n                    <amexio-column size=\"6\">\n                      <amexio-new-dropdown [(ngModel)]=\"componentInstance.dataSource.metadata.serviceId\"\n                                       [place-holder]=\"'Choose'\"\n                                       name=\"componentInstance.dataSource.metadata.serviceId\"\n                                       [data-reader]=\"'response'\"\n                                       [field-label]=\"'Service'\"\n                                       [display-field]=\"'name'\"\n                                       [value-field]=\"'id'\"\n                                       [data]=\"serviceLocalData\"\n                                       (onSingleSelect)=\"selectService($event)\">\n                      </amexio-new-dropdown>\n                    </amexio-column>\n\n                    <amexio-column size=\"6\">\n                      <amexio-new-dropdown [(ngModel)]=\"componentInstance.dataSource.metadata.operationId\"\n                                       [place-holder]=\"'Choose Operation'\"\n                                       [data-reader]=\"'response'\"\n                                       [field-label]=\"'Operation'\"\n                                       [display-field]=\"'operationName'\"\n                                       [value-field]=\"'operationId'\"\n                                       [data]=\"operationLocalData\"\n                                       (onSingleSelect)=\"selectOperation($event)\">\n                      </amexio-new-dropdown>\n                    </amexio-column>\n\n                  </amexio-row>\n\n                  <amexio-row>\n                    <amexio-column [size]=\"6\">\n                      <ng-container *ngIf=\"componentInstance.dataSource.remote != null\">\n                        <amexio-text-input [field-label]=\"'Service Url'\"\n                                           [place-holder]=\"'service url'\"\n                                           [enable-popover]=\"false\"\n                                           [icon-feedback]=\"true\"\n                                           [allow-blank]=\"false\"\n                                           [disabled]=\"false\"\n                                           name=\"componentInstance.dataSource.remote.httpUrl\"\n                                           [(ngModel)]=\"componentInstance.dataSource.remote.httpUrl\">\n                        </amexio-text-input>\n                      </ng-container>\n\n                    </amexio-column>\n                    <!--  <amexio-column [size]=\"6\">\n                        <amexio-text-input [field-label]=\"'Data Reader'\" name=\"componentInstance.dataSource.dataReader\"\n                                           [enable-popover]=\"false\"\n                                           [icon-feedback]=\"true\"\n                                           [allow-blank]=\"false\"\n                                           [place-holder]=\"'placeholder'\"\n                                           [disabled]=\"false\"\n                                           [(ngModel)]=\"componentInstance.dataSource.dataReader\">\n                        </amexio-text-input>\n                      </amexio-column>-->\n                  </amexio-row>\n\n                  <br>\n                </ng-container>\n                <ng-container *ngIf=\"componentInstance.dataSource.servicetype == '2'\">\n                  <amexio-row>\n                    <!-- // localData-->\n                    <amexio-column [size]=\"'7'\">\n                      <canvas-tree-data-table [data]=\"localTreeData\" [height]=\"270\">\n                        <canvas-tree-column [data-index]=\"'key'\"\n                                            [data-type]=\"'string'\" [hidden]=\"false\"\n                                            [text]=\"'Key'\" [width]=\"50\">\n                          <ng-template #amexioBodyTmpl let-column let-row=\"row\" let-index=\"index\">\n                            <ng-container *ngIf=\"row?.readOnly;else key_else\">\n                              {{row.key}}\n                            </ng-container>\n                            <ng-template #key_else>\n                              <input type=\"text\" [ngModel]=\"row.key\" (ngModelChange)=\"keyOnChange($event,row)\"/>\n                            </ng-template>\n                          </ng-template>\n                        </canvas-tree-column>\n                        <canvas-tree-column [data-index]=\"'value'\"\n                                            [data-type]=\"'string'\" [hidden]=\"false\"\n                                            [text]=\"'Value'\" [width]=\"30\">\n                          <ng-template #amexioBodyTmpl let-column let-row=\"row\">\n                            <ng-container *ngIf=\"row.type == 'key';else value_else\">\n                              <input type=\"text\" [ngModel]=\"row.value\" (ngModelChange)=\"valueOnChange($event,row)\"/>\n                            </ng-container>\n                            <ng-template #value_else>\n                              {{row.value}}\n                            </ng-template>\n\n\n                          </ng-template>\n                        </canvas-tree-column>\n                        <canvas-tree-column\n                          [data-type]=\"'string'\"\n                          [text]=\"'Action'\" [width]=\"20\">\n                          <ng-template #amexioHeaderTmpl let-column=\"column\" let-index=\"index\">\n                            {{column.text}} &nbsp;\n                            <amexio-image [icon-class]=\"'fa fa-code'\" style=\"padding-left: 2px;\"\n                                          [tooltip]=\"'Object'\" (onClick)=\"addParentObject('object')\">\n                            </amexio-image>\n                            <amexio-image [icon-class]=\"'fa fa-table'\" style=\"padding-left: 2px;\"\n                                          [tooltip]=\"'Array'\" (onClick)=\"addParentArray('array')\">\n                            </amexio-image>\n                          </ng-template>\n\n\n                          <ng-template #amexioBodyTmpl let-column let-row=\"row\" let-index=\"index\">\n                            <ng-container *ngIf=\"row.type != 'key' && showRepeatIconInverse(row)\">\n                              <amexio-image [icon-class]=\"'fa fa-code'\"\n                                            [tooltip]=\"'Object'\" (onClick)=\"addDataObject('object',row, index)\">\n                              </amexio-image>\n\n                              <amexio-image [icon-class]=\"'fa fa-table'\"\n                                            [tooltip]=\"'Array'\" (onClick)=\"addDataObject('array',row, index)\">\n                              </amexio-image>\n                            </ng-container>\n                            <ng-container *ngIf=\"showKeyIcon(row)\">\n                              <amexio-image [icon-class]=\"'fa fa-columns'\"\n                                            [tooltip]=\"'Key'\" (onClick)=\"addDataObject('key',row, index)\">\n                              </amexio-image>\n                            </ng-container>\n\n                            <ng-container *ngIf=\"showRepeatIcon(row)\">\n                              <amexio-image [icon-class]=\"'fa fa-repeat'\"\n                                            [tooltip]=\"'repeat'\" (onClick)=\"repeatObject('key',row, index)\">\n                              </amexio-image>\n                            </ng-container>\n\n\n                            <amexio-image [icon-class]=\"'fa fa-trash'\"\n                                          [tooltip]=\"'Key'\" (onClick)=\"onRemove(row)\">\n                            </amexio-image>\n                          </ng-template>\n                        </canvas-tree-column>\n                      </canvas-tree-data-table>\n                    </amexio-column>\n                    <amexio-column [size]=\"'5'\">\n                      <amexio-card [header]=\"true\"\n                                   [footer]=\"false\"\n                                   [show]=\"true\"\n                                   [body-height]=\"38\">\n                        <amexio-header>\n                          Output Data\n                        </amexio-header>\n                        <amexio-body>\n                          <amexio-row>\n                            <div *ngFor=\"let data of parentJsonStructure\">\n                              <pre><code></code>{{data | json}}</pre>\n                            </div>\n                          </amexio-row>\n                        </amexio-body>\n                      </amexio-card>\n                    </amexio-column>\n\n                  </amexio-row>\n                </ng-container>\n              </amexio-body>\n              <amexio-action>\n                <amexio-button [label]=\"'Next'\" [icon]=\"'fa fa-angle-right'\" (onClick)=\"onNextClick()\"\n                               [type]=\"'theme-color'\">\n                </amexio-button>\n              </amexio-action>\n            </amexio-card>\n\n          </amexio-tab>\n\n          <amexio-tab title=\"Data Mapping\" [active]=\"dataMappingTab\" [disabled]=\"dataMapperDisabled\">\n\n\n            <amexio-card [header]=\"false\"\n                         [footer]=\"true\"\n                         [footer-align]=\"'right'\" [body-height]=\"52\">\n              <amexio-body>\n                <response-mapper [component]=\"componentInstance\" [treeLocalData]=\"treeLocalData\"></response-mapper>\n              </amexio-body>\n              <amexio-action>\n                <amexio-button [label]=\"'Save'\" [icon]=\"'fa fa-floppy-o'\"\n                               [type]=\"'theme-color'\" (onClick)=\"onSaveClick()\">\n                </amexio-button>\n              </amexio-action>\n            </amexio-card>\n          </amexio-tab>\n\n        </amexio-tab-view>\n\n\n      </amexio-body>\n    </amexio-card>\n    <amexio-dialogue [show-dialogue]=\"conformWindow\"\n                     [title]=\"'Confirm'\"\n                     [message]=\"'Are you sure you want to Erase Data.?'\"\n                     [message-type]=\"'confirm'\"\n                     [type]=\"'confirm'\"\n                     [closable]=\"false\"\n                     [primary-action-label]=\"'ok'\"\n                     [secondary-action-label]=\"'cancel'\"\n                     (actionStatus)=\"clearDataStatusEvent($event)\">\n    </amexio-dialogue>\n\n    <amexio-dialogue [show-dialogue]=\"confirmWindowClose\"\n                     [title]=\"'Confirm Action'\"\n                     [message]=\"'Continue with empty Datasource'\"\n                     [message-type]=\"'confirm'\"\n                     [type]=\"'confirm'\"\n                     [primary-action-label]=\"'ok'\"\n                     [secondary-action-label]=\"'cancel'\"\n                     (actionStatus)=\"confirmWindowCloseEvent($event)\">\n    </amexio-dialogue>\n\n\n    <amexio-notification [data]=\"notificationData\"\n                         [vertical-position]=\"'top'\"\n                         [horizontal-position]=\"'right'\"\n                         [auto-dismiss-msg]=\"true\"\n                         [auto-dismiss-msg-interval]=\"4000\">\n    </amexio-notification>\n\n  "
    })
], DataSourceComponent);
exports.DataSourceComponent = DataSourceComponent;
var TreeDataObjectStructure = (function () {
    function TreeDataObjectStructure() {
        this.key = 'Object';
        this.type = 'Object';
        this.value = '{}';
        this.expanded = true;
        this.id = Math.floor(Math.random() * 90000) + 10000;
    }
    return TreeDataObjectStructure;
}());
exports.TreeDataObjectStructure = TreeDataObjectStructure;
