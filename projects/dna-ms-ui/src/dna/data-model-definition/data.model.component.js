"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var DataModelComponent = (function () {
    function DataModelComponent(http, _notificationService, loaderService, msgService, ls) {
        this.http = http;
        this._notificationService = _notificationService;
        this.loaderService = loaderService;
        this.msgService = msgService;
        this.ls = ls;
        this.isValidateForm = false;
        this.domainData = [];
        this.boundedContextData = [];
        this.typeDataArray = [];
        this.validationMsgArray = [];
        this.objectStructureTreeData = [];
        this.structureData = [];
        this.showgrid = false;
        this.fieldata = false;
        this.saveIcon = 'fa fa-save';
        this.saveLabel = 'Save';
        this.migrationStatusDialogue = false;
        this.showCard = false;
        this.modelDefinition = new ModelDefinition();
        this.objectTypeModel = new ObjectTypeModel();
        this.domainData = [];
        this.msgData = [];
        this.hideIdFlag = false;
        this.disabledflag = false;
        this.objectStructureTreeData = [];
        this.objectTreeData = [];
        this.loadObjectTreeData();
        this.objectFieldsArray = [];
        // this.loadDefaultData();
        this.objectTypeData = {
            response: {
                data: [
                    {
                        objectTypeName: 'Object',
                        objectType: '1'
                    },
                    {
                        objectTypeName: 'Primitive Type',
                        objectType: '2'
                    }
                ]
            }
        };
    }
    DataModelComponent.prototype.onTabClick = function (event) {
        if (event.title == 'Model') {
            this.modelActiveTab = true;
            this.fieldActiveTab = false;
        }
        else {
            this.modelActiveTab = false;
            this.fieldActiveTab = true;
        }
    };
    //OPEN NEW MODEL DEFINITION UI
    DataModelComponent.prototype.openNewUi = function () {
        if (!this.ls.get('platformInfo').projectMigrated) {
            this.migrationStatusDialogue = true;
        }
        else {
            this.showCard = true;
            this.disabledflag = false;
            this.modelDefinition = new ModelDefinition();
            this.getBoundedContext();
            // this.objectTypeModel = new ObjectTypeModel();
            this.structureData = [];
            this.objectFieldsArray = [];
            this.objectStructureTreeData = [];
            this.modelActiveTab = true;
            this.fieldActiveTab = false;
            this.tabdisabledFlag = true;
            this.saveIcon = 'fa fa-save';
            this.saveLabel = 'Save';
        }
    };
    DataModelComponent.prototype.migrateProject = function (event) {
        if (event === 'ok') {
            var response_1;
            this.migrationStatusDialogue = false;
            this.http.get('/api/project/migration/project').subscribe(function (res) {
                response_1 = res;
            });
            this.msgService.sendMessage({
                path: 'home/codepipeline/task-ui',
                title: 'Task Details'
            });
        }
        else
            this.migrationStatusDialogue = false;
    };
    //LOAD DEFAULT DATA
    // loadDefaultData(id: any) {
    //   if (this.objectTypeModel.objectType == '1') {
    //     let objectData: any;
    //     this.http.get('/api/dna/objects/findByDomainId'+id).subscribe(
    //       response => {
    //         objectData = response;
    //       },
    //       err => {
    //       },
    //       () => {
    //         if (objectData.response) {
    //           this.typeDataArray = objectData.response;
    //         }
    //       }
    //     );
    //   }
    // }
    DataModelComponent.prototype.ngOnInit = function () {
        this.getBoundedContext();
    };
    DataModelComponent.prototype.createErrorData = function () {
        var errorData = [];
        var errorObj = {};
        errorObj['data'] = [];
        errorObj.data = this.validationMsgArray;
        errorData.push(errorObj);
        this._notificationService.showerrorData('Error Message', errorData);
    };
    DataModelComponent.prototype.createInvalidCompErrorData = function () {
        var errorData = [];
        var errorObj = {};
        errorObj['data'] = [];
        errorObj.data = this.validationMsgArray;
        errorData.push(errorObj);
        this._notificationService.showerrorData('Invalid Component', errorData);
    };
    //LOAD OBJECT LIST FROM DB
    DataModelComponent.prototype.loadObjectTreeData = function () {
        var _this = this;
        var objectListData;
        this.http.get('/api/dna/objects/findAll').subscribe(function (response) {
            objectListData = response;
        }, function (err) {
            _this.validationMsgArray.push('Unable to connect to server');
            // this.isValidateForm = true;
            _this.createErrorData();
        }, function () {
            _this.objectTreeData = objectListData;
        });
    };
    DataModelComponent.prototype.getBoundedContext = function () {
        var _this = this;
        var bcData;
        this.http.get('/api/dna/bcontext/findAll').subscribe(function (response) {
            bcData = response;
        }, function (err) {
            _this.validationMsgArray.push('Unable to connect to server');
            // this.isValidateForm = true;
            _this.createErrorData();
        }, function () {
            _this.boundedContextData = bcData.response;
            _this.modelDefinition.bondedContextId = _this.boundedContextData[0].id;
            _this.selectBoundedContext(_this.boundedContextData[0]);
        });
    };
    //SELECT BOUNDED CONTEXT AND LOAD RELATED DOMAIN
    DataModelComponent.prototype.selectBoundedContext = function (boundedContentObj) {
        var _this = this;
        var domainListData;
        var requestJson = {
            id: boundedContentObj.id
        };
        this.http.post('/api/dna/domain/findByBContextId', requestJson).subscribe(function (response) {
            domainListData = response;
        }, function (err) {
            _this.validationMsgArray.push('Unable to connect to server');
            // this.isValidateForm = true;
            _this.createErrorData();
        }, function () {
            _this.domainData = domainListData.response;
            _this.modelDefinition.domainId = _this.domainData[0].id;
            _this.domainId = _this.modelDefinition.domainId;
        });
    };
    //This METHOD IS USED FOR OBJECT TYPE SELECTION ON RADIO CHANGE
    DataModelComponent.prototype.selectObjectType = function (objectType) {
        if (!this.objectTypeModel) {
            this.objectTypeModel = new ObjectTypeModel();
        }
        this.objectTypeModel.objectType = objectType.objectType;
        this.loadObjectTypeDropDown();
    };
    //TO ADD FIELD IN TREE.IF OBJECT THEN RETRIVE FROM DB AND ADD TO TREE
    DataModelComponent.prototype.onFieldSave = function (modelDefinition) {
        var _this = this;
        var modelObject;
        this.saveFlag = true;
        this.loaderService.showLoader();
        var flag = false;
        var localObjectFieldsArray;
        localObjectFieldsArray = [];
        // if (this.objectFieldsArray && this.objectFieldsArray.length >= 1) {
        //   this.objectFieldsArray.forEach(objectField => {
        //     if (objectField.name === this.objectTypeModel.name) {
        //       this.validationMsgArray.push(
        //         'Duplicate field name ' +
        //           '' +
        //           this.objectTypeModel.name +
        //           '' +
        //           ' found'
        //       );
        //       this.isValidateForm = true;
        //       this.saveFlag = false;
        //       flag = true;
        //     }
        //   });
        // }
        var localStructureData = [];
        localStructureData = Object.assign([], this.structureData);
        localStructureData.push(this.objectTypeModel);
        localStructureData.forEach(function (fieldObject) {
            if (fieldObject.fieldId === _this.objectTypeModel.fieldId) {
                localObjectFieldsArray.push(_this.objectTypeModel);
            }
            else {
                localObjectFieldsArray.push(fieldObject);
            }
        });
        // if (!flag) {
        // this.objectFieldsArray.push(this.objectTypeModel);
        // this.modelDefinition.objectFields = this.objectFieldsArray;
        // if (localObjectFieldsArray && localObjectFieldsArray.length == 0) {
        //   this.modelDefinition.objectFields = this.objectFieldsArray;
        // } else {
        //   this.modelDefinition.objectFields = localObjectFieldsArray;
        // }
        this.modelDefinition.objectFields = localObjectFieldsArray;
        this.msgData = [];
        var requestJson = this.modelDefinition;
        this.http.post('/api/dna/objects/save', requestJson).subscribe(function (response) {
            modelObject = response;
        }, function (err) {
            _this.validationMsgArray.push('Unable to connect to server');
            // this.isValidateForm = true;
            _this.createErrorData();
            _this.loaderService.hideLoader();
        }, function () {
            if (!modelObject.success) {
                _this.validationMsgArray.push(modelObject.errorMessage);
                // this.isValidateForm = true;
                _this.createErrorData();
                _this.saveFlag = false;
                _this.loaderService.hideLoader();
            }
            if (!modelObject.success && modelObject.errors) {
                modelObject.errors.forEach(function (error, index) {
                    _this.validationMsgArray.push(error);
                    // this.isValidateForm = true;
                });
                _this.createErrorData();
                _this.saveFlag = false;
                _this.loaderService.hideLoader();
            }
            if (modelObject.success) {
                var modelObjectRes = modelObject.response;
                if (modelObjectRes && modelObjectRes.id) {
                    _this.modelDefinition.id = modelObjectRes.id;
                }
                if (modelObjectRes && modelObjectRes.treeDTOs) {
                    _this.objectStructureTreeData = modelObjectRes.treeDTOs;
                }
                _this.showgrid = true;
                _this.objectTypeModel = new ObjectTypeModel();
                _this.typeDataArray = [];
                _this.getModelStructureData(modelObjectRes.id);
                _this.msgData.push('Model Field Saved Successfully');
                _this._notificationService.showSuccessData(_this.msgData);
                _this.saveFlag = false;
                _this.loaderService.hideLoader();
                _this.disabledflag = true;
                _this.saveIcon = 'fa fa-save';
                _this.saveLabel = 'Save';
                _this.objectTypeModel.objectType = '2';
                _this.loadObjectTypeDropDown();
                // this.objectTreeData.response = modelObject.response.projectTreedtos;
                // this.modelDefinition.objectFields = [];
            }
        });
        // }
    };
    //TO ADD FIELD IN TREE.IF OBJECT THEN RETRIVE FROM DB AND ADD TO TREE
    DataModelComponent.prototype.onSave = function (modelform) {
        var _this = this;
        var modelObject;
        this.saveFlag = true;
        this.msgData = [];
        this.loaderService.showLoader();
        var flag = false;
        // this.objectFieldsArray.push(this.objectTypeModel);
        // this.modelDefinition.objectFields = this.objectFieldsArray;
        var requestJson = this.modelDefinition;
        this.http.post('/api/dna/objects/save', requestJson).subscribe(function (response) {
            modelObject = response;
        }, function (err) {
            _this.validationMsgArray.push('Unable to connect to server');
            // this.isValidateForm = true;
            _this.createErrorData();
            _this.loaderService.hideLoader();
        }, function () {
            if (!modelObject.success) {
                _this.validationMsgArray.push(modelObject.errorMessage);
                // this.isValidateForm = true;
                _this.createErrorData();
                _this.saveFlag = false;
                _this.loaderService.hideLoader();
            }
            if (!modelObject.success && modelObject.errors) {
                modelObject.errors.forEach(function (error, index) {
                    _this.validationMsgArray.push(error);
                    // this.isValidateForm = true;
                });
                _this.createErrorData();
                _this.saveFlag = false;
                _this.loaderService.hideLoader();
            }
            if (modelObject.success) {
                var modelObjectRes = modelObject.response;
                if (modelObjectRes && modelObjectRes.id) {
                    _this.modelDefinition.id = modelObjectRes.id;
                }
                if (modelObjectRes && modelObjectRes.treeDTOs) {
                    _this.objectStructureTreeData = modelObjectRes.treeDTOs;
                }
                // this.showgrid = true;
                // this.objectTypeModel = new ObjectTypeModel();
                _this.getModelStructureData(modelObjectRes.id);
                // this.objectTypeModel.objectType = '';
                // this.typeDataArray = [];
                _this.msgData.push('Model Saved Successfully');
                _this._notificationService.showSuccessData(_this.msgData);
                _this.saveFlag = false;
                _this.loaderService.hideLoader();
                _this.disabledflag = true;
                _this.tabdisabledFlag = false;
                _this.fieldActiveTab = true;
                _this.modelActiveTab = false;
                // this.objectTreeData.response = modelObject.response.projectTreedtos;
                // this.modelDefinition.objectFields = [];
                _this.loadObjectTreeData();
            }
        });
    };
    // onSaveModel(modelform:any) {
    // }
    // onSaveFields() {
    // }
    //On Save Button Click
    DataModelComponent.prototype.onSaveButtonClick = function (modelform) {
        var _this = this;
        if (this.tabdisabledFlag == true) {
            // this.onSaveModel(modelform);
            var isValid = false;
            this.validationMsgArray = [];
            var invalidModelFields = void 0;
            invalidModelFields = modelform.getErrorMsgData();
            // this.validateFormFields();
            invalidModelFields.forEach(function (obj) {
                if (obj.label == 'Bounded Context') {
                    _this.validationMsgArray.push('Please Select Bounded Context');
                }
                if (obj.label == 'Domain') {
                    _this.validationMsgArray.push('Please Select Domain');
                }
                if (obj.label == 'Model Name') {
                    _this.validationMsgArray.push('Please enter Model name,it must be alphabetic only');
                }
            });
            if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
                // this.isValidateForm = true;
                this.createInvalidCompErrorData();
                // return;
            }
            else {
                // this.isValidateForm = false;
                this.onSave(this.modelDefinition);
            }
        }
        else {
            // this.onSaveFields();
            // this.validateObjectFields();
            var isValid = false;
            this.validationMsgArray = [];
            var invalidFields = void 0;
            invalidFields = modelform.getErrorMsgData();
            // this.validateFormFields();
            invalidFields.forEach(function (obj) {
                if (obj.label == 'Type') {
                    _this.validationMsgArray.push('Please Select Type');
                }
                if (obj.label == 'Name') {
                    _this.validationMsgArray.push('Please Enter Name');
                }
                if (obj.label == 'Display Name') {
                    _this.validationMsgArray.push('Please Enter Display Name');
                }
            });
            if (this.objectTypeModel.name) {
                var trimmedName = this.objectTypeModel.name.replace(/\s/g, '');
                if (this.objectTypeModel.name != trimmedName) {
                    this.validationMsgArray.push('Invalid Field Name, white spaces are not allowed!');
                }
            }
            if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
                // this.isValidateForm = true;
                // return;
                this.createInvalidCompErrorData();
            }
            else {
                // this.isValidateForm = false;
                this.onFieldSave(this.modelDefinition);
            }
        }
    };
    //ON CANCEL BUTTON CLICK
    DataModelComponent.prototype.onCancelClick = function () {
        this.modelDefinition = new ModelDefinition();
        this.objectTypeModel = new ObjectTypeModel();
        this.objectFieldsArray = [];
        this.objectTypeModel.objectType = '';
        this.objectStructureTreeData = [];
        this.structureData = [];
        this.disabledflag = false;
        this.showgrid = false;
        this.modelActiveTab = true;
        this.fieldActiveTab = false;
        this.tabdisabledFlag = true;
        this.saveIcon = 'fa fa-save';
        this.saveLabel = 'Save';
    };
    DataModelComponent.prototype.getModelStructureData = function (id) {
        var _this = this;
        var gridData;
        this.http.get('/api/dna/objects/findById/' + id).subscribe(function (response) {
            gridData = response;
        }, function (err) {
            _this.validationMsgArray.push('Unable to connect to server');
            _this.isValidateForm = true;
        }, function () {
            if (gridData.success && gridData.response) {
                _this.structureData = gridData.response.objectFields;
                _this.savedModel = gridData.response;
            }
            else {
                _this.validationMsgArray.push(gridData.errorMessage);
                // this.isValidateForm = true;
                _this.createErrorData();
            }
        });
    };
    //THIS CODE IS USED FOR OBJECT TREE CLICK RETRIVE DATA FROM DB
    DataModelComponent.prototype.onObjectTreeClick = function (nodeModelData) {
        var _this = this;
        if (nodeModelData.id) {
            var objectsData_1;
            this.http.get('/api/dna/objects/findById/' + nodeModelData.id).subscribe(function (response) {
                objectsData_1 = response;
            }, function (err) {
                _this.validationMsgArray.push('Unable to connect to server');
                // this.isValidateForm = true;
                _this.createErrorData();
            }, function () {
                if (objectsData_1.success && objectsData_1.response) {
                    var objectDataResp = objectsData_1.response;
                    _this.modelDefinition.bondedContextId =
                        objectDataResp.bondedContextId;
                    var bcjson = {
                        id: objectDataResp.bondedContextId
                    };
                    _this.selectBoundedContext(bcjson);
                    _this.showCard = true;
                    _this.modelDefinition.domainId = objectDataResp.domainId;
                    _this.modelDefinition.name = objectDataResp.name;
                    _this.modelDefinition.id = objectDataResp.id;
                    _this.modelDefinition.description = objectDataResp.description;
                    _this.objectFieldsArray = objectDataResp.objectFields;
                    _this.disabledflag = true;
                    _this.modelActiveTab = true;
                    _this.fieldActiveTab = false;
                    _this.tabdisabledFlag = false;
                    _this.showgrid = true;
                    _this.getModelStructureData(nodeModelData.id); //Temp
                    _this.objectTypeModel = new ObjectTypeModel();
                }
            });
        }
    };
    DataModelComponent.prototype.onDomainSelect = function (data) {
        this.domainId = data.id;
    };
    //On Grid Row Select
    DataModelComponent.prototype.onRowSelect = function (data) {
        this.saveIcon = 'fa fa-pencil';
        this.saveLabel = 'Update';
        this.objectTypeModel.objectType = data.objectType;
        this.objectTypeModel.fieldId = data.fieldId;
        this.loadObjectTypeDropDown();
        this.objectTypeModel.objectTypeId = data.objectTypeId;
        this.objectTypeModel.name = data.name;
        this.objectTypeModel.displayName = data.displayName;
        this.objectTypeModel.description = data.description;
        this.objectTypeModel.collection = data.collection;
        this.objectTypeModel.update = true;
    };
    // To Close Window
    DataModelComponent.prototype.okErrorBtnClick = function () {
        this.isValidateForm = false;
        this.validationMsgArray = [];
    };
    //THIS METHOD USED FOR LOAD THE OBJECT TYPE DROPDOWN
    DataModelComponent.prototype.loadObjectTypeDropDown = function () {
        var _this = this;
        this.typeDataArray = [];
        if (this.objectTypeModel.objectType == '2') {
            var objectData_1;
            this.http.get('/api/dna/primitive/findAll').subscribe(function (response) {
                objectData_1 = response;
            }, function (err) {
                _this.validationMsgArray.push('Unable to connect to server');
                // this.isValidateForm = true;
                _this.createErrorData();
            }, function () {
                if (objectData_1.response) {
                    _this.typeDataArray = objectData_1.response;
                }
            });
        }
        else if (this.objectTypeModel.objectType == '1') {
            var objectData_2;
            this.http
                .get('/api/dna/objects/findByDomainId/' + this.domainId)
                .subscribe(function (response) {
                objectData_2 = response;
            }, function (err) {
                _this.validationMsgArray.push('Unable to connect to server');
                // this.isValidateForm = true;
                _this.createErrorData();
            }, function () {
                if (objectData_2.response) {
                    //  this.typeDataArray = objectData.response;
                    var objArray_1 = objectData_2.response;
                    objArray_1.forEach(function (obj, index) {
                        if (obj.id === _this.savedModel.id) {
                            objArray_1.splice(index, 1);
                        }
                    });
                    _this.typeDataArray = objArray_1;
                }
            });
        }
    };
    //Validate Form Fields
    DataModelComponent.prototype.validateFormFields = function () {
        var isValid = false;
        this.validationMsgArray = [];
        if (this.modelDefinition.bondedContextId == '') {
            this.validationMsgArray.push('Invalid (Blank) Bounded Context.');
        }
        if (this.modelDefinition.description == '') {
            this.validationMsgArray.push('Invalid (Blank) Description.');
        }
        if (this.modelDefinition.name == '') {
            this.validationMsgArray.push('Invalid (Blank) Model Name.');
        }
        if (this.modelDefinition.domainId == '') {
            this.validationMsgArray.push('Invalid (Blank) Domain Name.');
        }
        if (this.modelDefinition.name) {
            var trimmedName = this.modelDefinition.name.replace(/\s/g, '');
            if (this.modelDefinition.name != trimmedName) {
                this.validationMsgArray.push('Invalid Model Name, white spaces are not allowed!');
            }
        }
    };
    DataModelComponent.prototype.validateObjectFields = function () {
        var isValid = false;
        this.validationMsgArray = [];
        if (this.objectTypeModel.name == '') {
            this.validationMsgArray.push('Invalid (Blank) Object Name.');
        }
        if (this.objectTypeModel.objectTypeId == '') {
            this.validationMsgArray.push('Invalid (Blank) Object Type.');
        }
        if (this.objectTypeModel.displayName == '') {
            this.validationMsgArray.push('Invalid (Blank) Display Name.');
        }
        if (this.objectTypeModel.description == '') {
            this.validationMsgArray.push('Invalid (Blank) Description.');
        }
        if (this.objectTypeModel.name) {
            var trimmedName = this.objectTypeModel.name.replace(/\s/g, '');
            if (this.objectTypeModel.name != trimmedName) {
                this.validationMsgArray.push('Invalid Field Name, white spaces are not allowed!');
            }
        }
    };
    //To Remove Object
    DataModelComponent.prototype.deleteObject = function (row) {
        var _this = this;
        var response;
        var requestJson = {
            fieldId: row.fieldId,
            modelId: this.modelDefinition.id
        };
        this.http.post('/api/dna/objects/delete', requestJson).subscribe(function (res) {
            response = res;
        }, function (err) {
            _this.validationMsgArray.push('Unable to connect to server');
            // this.isValidateForm = true;
            _this.createErrorData();
        }, function () {
            if (response.success) {
                _this.msgData.push(response.successMessage);
                _this.showgrid = true;
                _this.saveIcon = 'fa fa-save';
                _this.saveLabel = 'Save';
                _this.objectTypeModel = new ObjectTypeModel();
                _this.getModelStructureData(_this.modelDefinition.id); //Temp
            }
        });
    };
    return DataModelComponent;
}());
DataModelComponent = __decorate([
    core_1.Component({
        selector: 'dna-data-model',
        template: "\n  <amexio-row>\n  <amexio-column [size]=3>\n      <amexio-card [header]=\"true\" [footer]=\"true\" [show]=\"true\" [body-height]=\"80\" [footer-align]=\"'right'\">\n          <amexio-header>\n               Models\n          </amexio-header>\n          <amexio-body>\n              <amexio-tree-filter-view [data-reader]=\"'response'\" [data]=\"objectTreeData\" (nodeClick)=\"onObjectTreeClick($event)\">\n              </amexio-tree-filter-view>\n          </amexio-body>\n          <amexio-action>\n           <amexio-button\n                [label]=\"'New'\"\n                [type]=\"'secondary'\"\n                [size]=\"'default'\"\n                [icon]=\"'fa fa-plus fa-lg'\"\n                [tooltip]=\"'New'\"\n             (onClick)=\"openNewUi()\">\n          </amexio-button>\n          </amexio-action>\n      </amexio-card>\n  </amexio-column>\n  <amexio-column [size]=9>\n       <ng-container *ngIf=\"!showCard\">\n       <amexio-card [header]=\"true\"\n                [footer]=\"false\"\n                [show]=\"true\"\n                [footer-align]=\"'right'\"\n                [body-height]=\"80\">\n                    <amexio-header>\n                   Help Document\n                    </amexio-header>\n                    <amexio-body>\n                    </amexio-body>\n                </amexio-card>\n      </ng-container>\n     <ng-container *ngIf=\"showCard\">\n           <div class=\"loadingnav\" *ngIf=\"loaderService.isLoading\"></div>\n <amexio-form #modelform [form-name]=\"'validateForm'\" [header]=\"true\" [show-error]=\"false\" [footer-align]=\"'right'\" [body-height]=\"80\">\n          <amexio-form-header>\n              Model Builder\n          </amexio-form-header>\n          <amexio-form-body>\n\n              <amexio-tab-view  [closable]=\"false\" (onClick)=\"onTabClick($event)\">\n     <amexio-tab title=\"Model\"\n     [active]=\"modelActiveTab\">\n\n                  <amexio-row>\n                      <amexio-column [size]=6>\n                          <amexio-dropdown [(ngModel)]=\"modelDefinition.bondedContextId\" [place-holder]=\"'Select Bounded Context'\" name=\"modelDefinition.bondedContextId\"\n                              [disabled]=\"disabledflag\" [allow-blank]=\"false\" [error-msg]=\"'Select Bounded Context'\" [field-label]=\"'Bounded Context'\"\n                              [data]=\"boundedContextData\" [display-field]=\"'name'\" (onSingleSelect)=\"selectBoundedContext($event)\"\n                              [value-field]=\"'id'\">\n                          </amexio-dropdown>\n                      </amexio-column>\n                      <amexio-column [size]=6>\n                          <amexio-dropdown [(ngModel)]=\"modelDefinition.domainId\" [place-holder]=\"'Select Module'\" name=\"modelDefinition.domainId\"\n                             [allow-blank]=\"false\" [error-msg]=\"'Select Module'\" [disabled]=\"disabledflag\" [data]=\"domainData\" [field-label]=\"'Module'\" [display-field]=\"'name'\"\n                              (onSingleSelect)=\"onDomainSelect($event)\" [value-field]=\"'id'\">\n                          </amexio-dropdown>\n                      </amexio-column>\n                      <amexio-column [size]=6>\n                          <amexio-text-input field-label=\"Model Name\" [pattern]=\"'^[a-zA-Z][a-zA-Z0-9]*$'\" name=\"modelDefinition.name\" place-holder=\"Enter Model Name\" [(ngModel)]=\"modelDefinition.name\"\n                              enable-popover=\"true\" [disabled]=\"disabledflag\" [allow-blank]=\"false\" error-msg=\"Please enter Model name,it must be alphabetic only\" icon-feedback=\"true\">\n                          </amexio-text-input>\n                      </amexio-column>\n                      <amexio-column [size]=6>\n                      <amexio-textarea-input [enable-popover]=\"true\" [disabled]=\"disabledflag\" [field-label]=\"'Description'\" name=\"modelDefinition.description\"\n                      [(ngModel)]=\"modelDefinition.description\" [place-holder]=\"'Enter Model Description'\"\n                      [allow-blank]=\"true\" [error-msg]=\"'Enter Model Description'\" [icon-feedback]=\"true\"\n                      [rows]=\"'2'\" [columns]=\"'2'\">\n                  </amexio-textarea-input>\n                      </amexio-column>\n                  </amexio-row>\n\n     </amexio-tab>\n      <amexio-tab title=\"Fields\" [active]=\"fieldActiveTab\" [disabled] = \"tabdisabledFlag\">\n                              <amexio-row>\n                                  <amexio-column [size]=6>\n                                      <amexio-radio-group name=\"objectTypeModel.objectType\" [data-reader]=\"'response.data'\" [display-field]=\"'objectTypeName'\"\n                                          [value-field]=\"'objectType'\" [horizontal]=\"true\" [data]=\"objectTypeData\" [default-value]=\"objectTypeModel.objectType\"\n                                         [allow-blank]=\"false\" (onSelection)=\"selectObjectType($event)\">\n                                      </amexio-radio-group>\n                                  </amexio-column>\n                                  <amexio-column [size]=6>\n                                      <amexio-checkbox [field-label]=\"'Collection'\" [(ngModel)]=\"objectTypeModel.collection\">\n                                      </amexio-checkbox>\n                                  </amexio-column>\n                                  <amexio-column [size]=6>\n                                      <amexio-dropdown [(ngModel)]=\"objectTypeModel.objectTypeId\" [place-holder]=\"'Select Type'\" name=\"objectTypeModel.objectTypeId\"\n                                         [allow-blank]=\"false\" [error-msg]=\"'Enter Object Type'\" [data]=\"typeDataArray\" [field-label]=\"'Type'\"\n                                          [display-field]=\"'typeName'\" [value-field]=\"'id'\">\n                                      </amexio-dropdown>\n                                  </amexio-column>\n                                  <amexio-column [size]=6>\n                                      <amexio-text-input field-label=\"Name\" name=\"objectTypeModel.name\" place-holder=\"Enter Name\" error-msg=\"Please Enter Name\"\n                                       [allow-blank]=\"false\"   enable-popover=\"true\" [(ngModel)]=\"objectTypeModel.name\" icon-feedback=\"true\">\n                                      </amexio-text-input>\n                                  </amexio-column>\n                                  <amexio-column [size]=6>\n                                      <amexio-text-input field-label=\"Display Name\" name=\"objectTypeModel.displayName\" place-holder=\"Enter Display Name\" error-msg=\"Please Enter Display Name\"\n                                      [allow-blank]=\"false\"    enable-popover=\"true\" [(ngModel)]=\"objectTypeModel.displayName\" icon-feedback=\"true\">\n                                      </amexio-text-input>\n                                  </amexio-column>\n                                  <amexio-column [size]=6>\n                                      <amexio-textarea-input [enable-popover]=\"true\" [(ngModel)]=\"objectTypeModel.description\" [field-label]=\"'Description'\" name=\"objectTypeModel.description\"\n                                          [place-holder]=\"'Enter Description'\" [allow-blank]=\"true\" [error-msg]=\"'Enter Description'\"\n                                          [icon-feedback]=\"true\" [rows]=\"'1'\" [columns]=\"'2'\">\n                                      </amexio-textarea-input>\n                                  </amexio-column>\n                                  <amexio-column [size] = 12 >\n                                  <ng-container *ngIf=\"hideIdFlag\">\n                                  <amexio-text-input\n                                  field-label=\"fieldId\"\n                                  name=\"objectTypeModel.fieldId\"\n                                  place-holder=\"\"\n                                  icon-feedback=\"true\"\n                                  [(ngModel)]=\"objectTypeModel.fieldId\">\n                                  </amexio-text-input>\n                                  </ng-container>\n                                  </amexio-column>\n\n                              </amexio-row>\n                                <amexio-row>\n                                 <amexio-column [size]=\"12\">\n<ng-container *ngIf=\"showgrid && structureData\">\n   <amexio-datagrid\n    [page-size] =\"10\"\n    [data]=\"structureData\"\n    (rowSelect)=\"onRowSelect($event)\">\n    <amexio-data-table-column [data-index]=\"'objectType'\"\n    [data-type]=\"'string'\"\n    [hidden]=\"true\"\n    [text]=\"'Object Type'\">\n</amexio-data-table-column>\n<amexio-data-table-column [data-index]=\"'objectTypeLabel'\"\n    [data-type]=\"'string'\"\n    [hidden]=\"false\"\n    [text]=\"'Object Type'\">\n</amexio-data-table-column>\n<amexio-data-table-column [data-index]=\"'objectTypeId'\"\n    [data-type]=\"'string'\"\n    [hidden]=\"true\"\n    [text]=\"'Type'\">\n</amexio-data-table-column>\n<amexio-data-table-column [data-index]=\"'objectName'\"\n    [data-type]=\"'string'\"\n    [hidden]=\"false\"\n    [text]=\"'Type'\">\n</amexio-data-table-column>\n<amexio-data-table-column [data-index]=\"'name'\"\n    [data-type]=\"'string'\"\n    [hidden]=\"false\"\n    [text]=\"'Name'\">\n</amexio-data-table-column>\n<amexio-data-table-column [data-index]=\"'displayName'\"\n    [data-type]=\"'string'\"\n    [hidden]=\"false\"\n    [text]=\"'Display Name'\">\n</amexio-data-table-column>\n<amexio-data-table-column [data-index]=\"'description'\"\n    [data-type]=\"'string'\"\n    [hidden]=\"false\"\n    [text]=\"'Description'\">\n</amexio-data-table-column>\n<amexio-data-table-column [data-index]=\"'collection'\"\n[data-type]=\"'boolean'\"\n[hidden]=\"false\"\n[text]=\"'Collection'\">\n</amexio-data-table-column>\n<amexio-data-table-column [data-index]=\"'fieldId'\"\n[data-type]=\"'string'\"\n[hidden]=\"true\"\n[text]=\"'fieldId'\">\n</amexio-data-table-column>\n<amexio-data-table-column [width]=\"15\" [data-index]=\"''\" [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'Action'\">\n                                        <ng-template #amexioBodyTmpl let-column let-row=\"row\">\n                                            <span>\n                                                <amexio-image style=\"color:red;\" [icon-class]=\"'fa fa-minus-circle fa-2x'\" [tooltip]=\"'Remove'\" (onClick)=\"deleteObject(row)\">\n                                                </amexio-image>\n                                            </span>\n                                        </ng-template>\n                                    </amexio-data-table-column>\n</amexio-datagrid>\n  </ng-container>\n </amexio-column>\n                                </amexio-row>\n                        </amexio-tab>\n                   </amexio-tab-view>\n          </amexio-form-body>\n         <amexio-form-action>\n\n              <amexio-button [label]=\"'Cancel'\"     [icon]=\"'fa fa-close'\" [type]=\"'secondary'\" [size]=\"'default'\" [tooltip]=\"'Cancel'\" (onClick)=\"onCancelClick()\">\n              </amexio-button>\n\n               <amexio-button [label]=\"saveLabel\" [icon]=\"saveIcon\"   [loading]=\"saveFlag\" [type]=\"'primary'\" [size]=\"'default'\" [tooltip]=\"'Cancel'\" (onClick)=\"onSaveButtonClick(modelform)\">\n              </amexio-button>\n          </amexio-form-action>\n      </amexio-form>\n      </ng-container>\n  </amexio-column>\n<amexio-dialogue [show-dialogue]=\"isValidateForm\" [message-type]=\"'error'\" [closable]=\"true\" [title]=\"'Error'\" [type]=\"'alert'\"\n[custom]=\"true\" (close)=\"isValidateForm = !isValidateForm\">\n<amexio-body>\n  <ol>\n      <li *ngFor=\"let msgObj of validationMsgArray let index=index\">{{msgObj}}</li>\n  </ol>\n</amexio-body>\n<amexio-action>\n  <amexio-button type=\"primary\" (onClick)=\"okErrorBtnClick()\" [label]=\"'Ok'\">\n  </amexio-button>\n</amexio-action>\n</amexio-dialogue>\n<dna-notification></dna-notification>\n\n</amexio-row>\n\n  <amexio-dialogue  [(show)]=\"migrationStatusDialogue\"\n                    [button-size]=\"'medium'\"\n                    [title]=\"'Confirm'\"\n                    [message]=\"'Please migrate project ?'\"\n                    [message-type]=\"'confirm'\"\n                    (actionStatus)=\"migrateProject($event)\">\n  </amexio-dialogue>\n"
    })
], DataModelComponent);
exports.DataModelComponent = DataModelComponent;
//Model Definition Object Save In DB
var ModelDefinition = (function () {
    function ModelDefinition() {
        this.bondedContextId = '';
        this.domainId = '';
        this.name = '';
        this.description = '';
        this.designComplete = false;
        this.objectFields = [];
        this.id = '';
    }
    return ModelDefinition;
}());
exports.ModelDefinition = ModelDefinition;
//This Model for Field Creation in Model
var ObjectTypeModel = (function () {
    function ObjectTypeModel() {
        this.fieldId = '';
        this.objectType = '';
        this.objectTypeId = '';
        this.name = '';
        this.objectName = '';
        this.displayName = '';
        this.collection = false;
        this.collectionId = 'collectionId';
        this.description = '';
        this.update = false;
    }
    return ObjectTypeModel;
}());
exports.ObjectTypeModel = ObjectTypeModel;
