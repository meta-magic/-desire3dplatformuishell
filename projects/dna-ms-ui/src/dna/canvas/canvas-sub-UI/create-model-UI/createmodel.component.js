"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
/**
 * Created by dattaram on 21/8/18.
 */
var core_1 = require("@angular/core");
var datatype_map_1 = require("../../canvas-component-map/datatype.map");
var CreateModelComponent = (function () {
    function CreateModelComponent(_eventHndl, _sharedDataService, _notificationService) {
        this._eventHndl = _eventHndl;
        this._sharedDataService = _sharedDataService;
        this._notificationService = _notificationService;
        this.showModelChange = new core_1.EventEmitter();
        this.createModelEvent = new core_1.EventEmitter();
        this.modelDataStructure = [];
        this.isModelValid = true;
        this.hasModelNameValid = true;
        this.modelObject = new ModelStructure();
    }
    CreateModelComponent.prototype.ngOnInit = function () {
        this.modelObject.bondedContextId = this._sharedDataService.uiDetails.boundedcontextId;
        this.modelObject.domainId = this._sharedDataService.uiDetails.domainId;
        this.getComponentList();
    };
    /*GET UI COMPONENT LIST*/
    CreateModelComponent.prototype.getComponentList = function () {
        var _this = this;
        this.modelDataStructure = [];
        this._eventHndl.findListOfComponent().forEach(function (com) {
            if (com.componentBehaviour.hasModelBinding) {
                if (com.properties.model && com.properties.model.modelName == '') {
                    var object = {};
                    object['name'] = com.properties.name;
                    object['displayName'] = com.properties.name;
                    object['fieldLabel'] = com.properties.fieldLabel;
                    object['datatype'] =
                        datatype_map_1.ComponentDataTypeMap.COMPONENT_DATATYPE[com.name];
                    object['objectTypeId'] =
                        datatype_map_1.ComponentDataTypeMap.DATATYPE_ID[datatype_map_1.ComponentDataTypeMap.COMPONENT_DATATYPE[com.name]];
                    _this.modelDataStructure.push(object);
                }
            }
        });
    };
    /*CREATE MODEL STRUCTURE DATA AND EMIT EVENT*/
    CreateModelComponent.prototype.createModel = function () {
        this.isModelValid = true;
        this.checkFormValidation();
        this.modelObject.text = this.modelObject.name;
        this.modelObject.path =
            this._sharedDataService.uiDetails.boundedcontext +
                '/' +
                this._sharedDataService.uiDetails.domain +
                '/' +
                this.modelObject.name;
        if (this.isModelValid) {
            this._eventHndl.modelbindedDataRef = {
                modelName: this.modelObject.name,
                modelFields: this.modelDataStructure
            };
            this.showModel = false;
            this.createModelEvent.emit(this.modelObject);
            this.showModelChange.emit(this.showModel);
        }
    };
    /*CLOSE MODEL*/
    CreateModelComponent.prototype.onClose = function (event) {
        this.showModel = false;
        this.showModelChange.emit(this.showModel);
    };
    /*VALIDATE MODEL*/
    CreateModelComponent.prototype.checkFormValidation = function () {
        if (this.modelObject.name != '' && !this.hasModelNameValid) {
            if (this.modelObject.description == '') {
                this.modelObject.description = this.modelObject.name;
            }
            this.checkFormFieldValidation();
        }
        else {
            this.isModelValid = false;
            this._notificationService.setNotificationData(true, ['Model name is required '], 'red');
        }
    };
    /*VALIDATE MODEL FIELDS*/
    CreateModelComponent.prototype.checkFormFieldValidation = function () {
        var _this = this;
        this.modelObject.objectFields = [];
        this.modelDataStructure.forEach(function (opt) {
            if (opt.displayName && opt.displayName != '') {
                var object = new ModelFieldStructure();
                object.name = opt.displayName;
                object.text = opt.displayName;
                object.displayName = opt.displayName;
                object.objectName = opt.datatype;
                object.objectTypeId = opt.objectTypeId;
                object.description = object.displayName;
                _this.modelObject.objectFields.push(object);
            }
            else {
                _this.isModelValid = false;
                _this._notificationService.setNotificationData(true, ['Display name required for each field '], 'red');
            }
        });
    };
    CreateModelComponent.prototype.nameValidation = function () {
        if (this.modelObject.name.split(' ').length == 1 &&
            this.modelObject.name != '') {
            this.hasModelNameValid = false;
            var i = 0;
            var character = '';
            while (i < this.modelObject.name.length) {
                character = this.modelObject.name.charAt(i);
                if (character == character.toUpperCase()) {
                    this.hasModelNameValid = true;
                }
                i++;
            }
        }
        else {
            this.hasModelNameValid = true;
        }
    };
    return CreateModelComponent;
}());
__decorate([
    core_1.Input()
], CreateModelComponent.prototype, "showModel");
__decorate([
    core_1.Output()
], CreateModelComponent.prototype, "showModelChange");
__decorate([
    core_1.Output()
], CreateModelComponent.prototype, "createModelEvent");
CreateModelComponent = __decorate([
    core_1.Component({
        selector: 'create-model',
        template: "\n    <amexio-window\n      [body-height]=\"60\"\n      [(show)]=\"showModel\"\n      [closable]=\"true\"\n      [footer]=\"true\"\n      [vertical-position]=\"'top'\"\n      [horizontal-position]=\"'center'\"\n      (close)=\"onClose($event)\">\n      <amexio-header>\n        Create Model\n      </amexio-header>\n      <amexio-body>\n        <amexio-row>\n          <amexio-column size=\"6\">\n            <amexio-text-input field-label=\"Model Name\"\n                               [(ngModel)]=\"modelObject.name\"\n                               place-holder=\"Enter model name\"\n                               (onBlur)=\"nameValidation()\"\n                               icon-feedback=\"false\">\n            </amexio-text-input>\n            <label *ngIf=\"hasModelNameValid\" style=\"color: red\">Model name should be in lowercase and single word.</label>\n          </amexio-column>\n          <amexio-column size=\"6\">\n            <amexio-text-input field-label=\"Description\"\n                               [(ngModel)]=\"modelObject.description\"\n                               place-holder=\"Enter description\">\n            </amexio-text-input>\n          </amexio-column>\n        </amexio-row>\n        <amexio-datagrid [data]=\"modelDataStructure\"\n                         [page-size]=\"10\" >\n          <amexio-data-table-column [sort]=\"false\"  [data-index]=\"'fieldLabel'\" [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'Field Label'\">\n          </amexio-data-table-column>\n          <amexio-data-table-column [sort]=\"false\"  [data-index]=\"'displayName'\" [data-type]=\"'string'\" [hidden]=\"false\" [text]=\"'Display Name'\">\n            <ng-template #amexioBodyTmpl let-row=\"row\">\n              <input type=\"text\" [attr.value]=\"row.displayName\" name=\"row.displayName\" [(ngModel)]=\"row.displayName\"/>\n            </ng-template>\n          </amexio-data-table-column>\n        </amexio-datagrid>\n      </amexio-body>\n      <amexio-action>\n        <amexio-button [type]= \"'theme-color'\" label=\"Create\" (onClick)=\"createModel()\"></amexio-button>\n      </amexio-action>\n    </amexio-window>\n  "
    })
], CreateModelComponent);
exports.CreateModelComponent = CreateModelComponent;
/*MODEL FIELD STRUCTURE*/
var ModelFieldStructure = (function () {
    function ModelFieldStructure() {
        this.collection = false;
        this.objectType = 2;
        this.name = '';
        this.collectionId = null;
        this.description = '';
        this.displayName = '';
        this.objectName = '';
        this.objectTypeLabel = 'Primitive Type';
        this.update = false;
        this.objectTypeId = '';
        this.text = '';
    }
    return ModelFieldStructure;
}());
exports.ModelFieldStructure = ModelFieldStructure;
/* MODEL STRUCTURE*/
var ModelStructure = (function () {
    function ModelStructure() {
        this.bondedContextId = '';
        this.domainId = '';
        this.name = '';
        this.description = '';
        this.objectFields = [];
        this.text = '';
        this.path = '';
    }
    return ModelStructure;
}());
exports.ModelStructure = ModelStructure;
