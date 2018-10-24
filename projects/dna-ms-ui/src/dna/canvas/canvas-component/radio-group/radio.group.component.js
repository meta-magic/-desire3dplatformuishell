"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
/**
 * Created by pratik on 23/2/18.
 */
var core_1 = require("@angular/core");
var canvas_widget_class_1 = require("../../canvas-models/canvas.widget.class");
var forms_properties_1 = require("../../canvas-models/forms.properties");
var datasource_model_1 = require("../../canvas-models/datasource.model");
var event_basemodel_1 = require("../../event-relationship/models/event.basemodel");
var RadioGroupcanvasComponent = (function (_super) {
    __extends(RadioGroupcanvasComponent, _super);
    function RadioGroupcanvasComponent(_eventHndl, _componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this._eventHndl = _eventHndl;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this.type = 'default';
        _this.mouseLocation = { left: 0, top: 0 };
        _this.componentBehaviour.hasModelBinding = true;
        _this.componentBehaviour.hasRelationship = true;
        _this.componentBehaviour.isBindingComponent = true;
        _this.componentBehaviour.hasDataSource = true;
        _this.properties = new RadioGroupProperties();
        _this.dataSource = new RadioGroupDatasource();
        _this.eventRelationship = new event_basemodel_1.EventRelationBaseModel();
        _this.radioGroupData = {
            response: {
                data: [
                    {
                        gender: 'Radio 1',
                        genderId: '1'
                    },
                    {
                        gender: 'Radio 2',
                        genderId: '2'
                    }
                ]
            }
        };
        return _this;
    }
    RadioGroupcanvasComponent.prototype.ngOnInit = function () {
        this.componentId =
            +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
    };
    RadioGroupcanvasComponent.prototype.onMouseOver = function (event) {
        event.stopPropagation();
        this.isOver = true;
    };
    RadioGroupcanvasComponent.prototype.onMouseLeave = function (event) {
        event.stopPropagation();
        this.isOver = false;
    };
    RadioGroupcanvasComponent.prototype.onHover = function () {
        this.showContextMenu = false;
    };
    RadioGroupcanvasComponent.prototype.getContextMenuStyle = function () {
        return {
            position: 'fixed',
            display: this.showContextMenu ? 'block' : 'none',
            left: this.mouseLocation.left + 'px',
            top: this.mouseLocation.top + 'px',
            'box-shadow': '1px 1px 2px #000000',
            width: '15%'
        };
    };
    RadioGroupcanvasComponent.prototype.loadContextMenu = function (event) {
        this.mouseLocation.left = event.clientX;
        this.mouseLocation.top = event.clientY;
        this.showContextMenu = true;
        event.preventDefault();
        event.stopPropagation();
        this._eventHndl.deleteComponentRef = this.componentId;
    };
    RadioGroupcanvasComponent.prototype.onDeleteClick = function () {
        this.showContextMenu = false;
        this._eventHndl.componentIdToDel = this.componentId;
        this._eventHndl.deleteComponent();
        this._eventHndl.addEditorNewState();
    };
    RadioGroupcanvasComponent.prototype.setSelfActive = function (event) {
        event.stopPropagation();
        this._eventHndl.deleteComponentRef = null;
        this._eventHndl.deleteComponentRef = this.componentId;
        this._eventHndl.setAllComponentsInactive(this.componentId);
        this._eventHndl.loadComponentProperties(this.name);
    };
    RadioGroupcanvasComponent.prototype.componentElementDraggedOver = function (event) {
        event.preventDefault();
    };
    return RadioGroupcanvasComponent;
}(canvas_widget_class_1.CanvasWidgetClass));
__decorate([
    core_1.HostListener('document:click')
], RadioGroupcanvasComponent.prototype, "onHover");
RadioGroupcanvasComponent = __decorate([
    core_1.Component({
        selector: 'radio-group-component',
        template: "\n    <div  (click)=\"setSelfActive($event)\" [attr.id]=\"componentId\"\n          (mouseover)=\"onMouseOver($event)\" (mouseleave)=\"onMouseLeave($event)\"\n          draggable=\"true\" [ngClass]=\"{'componentStyle':isOver,'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}\"\n          (dragstart)=\"_eventHndl.componentElementRelocateDragBegin($event,this)\"\n          (contextmenu)=\"loadContextMenu($event)\"\n          (dragover)=\"componentElementDraggedOver($event)\" #txtField>\n\n      <amexio-radio-group [field-label]=\"properties.fieldLabel\"\n                          [name] =\"componentId\"\n                          [data-reader]=\"'response.data'\"\n                          [display-field]=\"'gender'\"\n                          [value-field]=\"'genderId'\"\n                          [horizontal]=\"properties.horizontal\"\n                          [data]=\"radioGroupData\"\n                          [default-value]=\"'1'\"\n                          [disabled]=\"properties.disabled\">\n      </amexio-radio-group>\n\n    </div>\n\n    <span  *ngIf=\"showContextMenu\" (click)=\"onDeleteClick()\" class=\"dropdown\"\n      [ngStyle]=\"{left: this.mouseLocation.left + 'px',top: this.mouseLocation.top + 'px',position:'fixed','box-shadow': '1px 1px 2px #000000',width: '15%'}\">\n          <ul class=\"dropdown-list\">\n            <li class=\"list-items\">\n              <span ><i class=\"fa fa-trash\" style=\"padding-right: 5px;\"></i> <b>Delete</b> </span>\n            </li>\n          </ul>\n        </span>\n  "
    })
], RadioGroupcanvasComponent);
exports.RadioGroupcanvasComponent = RadioGroupcanvasComponent;
var RadioGroupProperties = (function () {
    function RadioGroupProperties() {
        this.model = new forms_properties_1.ModelClass();
        this.name = '';
        this.isComponentValid = false;
        this.fieldLabel = 'Radio';
        this.disabled = false;
        this.errorMsg = '';
        this.allowBlank = true;
        this.horizontal = true;
        this.groupName = 'group Name';
        this.displayField = '';
        this.valueField = '';
    }
    return RadioGroupProperties;
}());
exports.RadioGroupProperties = RadioGroupProperties;
var RadioGroupDatasource = (function (_super) {
    __extends(RadioGroupDatasource, _super);
    function RadioGroupDatasource() {
        var _this = _super.call(this) || this;
        _this.metadata = new datasource_model_1.Metadata();
        _this.dataReader = '';
        _this.servicetype = '1';
        _this.displayField = '';
        _this.valueField = '';
        _this.localDataName = null;
        _this.remote.httpMethod = 1;
        _this.remote.httpUrl = '';
        _this.dataReader = '';
        return _this;
    }
    return RadioGroupDatasource;
}(datasource_model_1.DatasourceModel));
exports.RadioGroupDatasource = RadioGroupDatasource;
