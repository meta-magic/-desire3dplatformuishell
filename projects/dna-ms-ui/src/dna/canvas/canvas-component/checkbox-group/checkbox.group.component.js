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
var datasource_model_1 = require("../../canvas-models/datasource.model");
var event_basemodel_1 = require("../../event-relationship/models/event.basemodel");
var CheckBoxGroupCanvasComponent = (function (_super) {
    __extends(CheckBoxGroupCanvasComponent, _super);
    function CheckBoxGroupCanvasComponent(_eventHndl, _componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this._eventHndl = _eventHndl;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this.type = 'default';
        _this.mouseLocation = { left: 0, top: 0 };
        _this.componentBehaviour.hasRelationship = true;
        _this.componentBehaviour.isBindingComponent = true;
        _this.properties = new CheckBoxGroupInputProperties();
        _this.checkboxGroupdata = {
            response: {
                data: [
                    {
                        language: 'One',
                        checked: false
                    },
                    {
                        language: 'Two',
                        checked: false
                    },
                    {
                        language: 'Three',
                        checked: false
                    }
                ]
            }
        };
        _this.dataSource = new CheckBoxDatasource();
        _this.eventRelationship = new event_basemodel_1.EventRelationBaseModel();
        return _this;
    }
    CheckBoxGroupCanvasComponent.prototype.ngOnInit = function () {
        this.componentId =
            +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
    };
    CheckBoxGroupCanvasComponent.prototype.onMouseOver = function (event) {
        event.stopPropagation();
        this.isOver = true;
    };
    CheckBoxGroupCanvasComponent.prototype.onMouseLeave = function (event) {
        event.stopPropagation();
        this.isOver = false;
    };
    CheckBoxGroupCanvasComponent.prototype.onHover = function () {
        this.showContextMenu = false;
    };
    CheckBoxGroupCanvasComponent.prototype.getContextMenuStyle = function () {
        return {
            position: 'fixed',
            display: this.showContextMenu ? 'block' : 'none',
            left: this.mouseLocation.left + 'px',
            top: this.mouseLocation.top + 'px',
            'box-shadow': '1px 1px 2px #000000',
            width: '15%'
        };
    };
    CheckBoxGroupCanvasComponent.prototype.loadContextMenu = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.mouseLocation.left = event.clientX;
        this.mouseLocation.top = event.clientY;
        this.showContextMenu = true;
        this._eventHndl.deleteComponentRef = this.componentId;
    };
    CheckBoxGroupCanvasComponent.prototype.onDeleteClick = function () {
        this.showContextMenu = false;
        this._eventHndl.componentIdToDel = this.componentId;
        this._eventHndl.deleteComponent();
        this._eventHndl.addEditorNewState();
    };
    CheckBoxGroupCanvasComponent.prototype.setSelfActive = function (event) {
        event.stopPropagation();
        this._eventHndl.deleteComponentRef = null;
        this._eventHndl.deleteComponentRef = this.componentId;
        this._eventHndl.setAllComponentsInactive(this.componentId);
        this._eventHndl.loadComponentProperties(this.name);
    };
    CheckBoxGroupCanvasComponent.prototype.componentElementDraggedOver = function (event) {
        event.preventDefault();
    };
    return CheckBoxGroupCanvasComponent;
}(canvas_widget_class_1.CanvasWidgetClass));
__decorate([
    core_1.HostListener('document:click')
], CheckBoxGroupCanvasComponent.prototype, "onHover");
CheckBoxGroupCanvasComponent = __decorate([
    core_1.Component({
        selector: 'checkbox-group-canvas',
        template: "\n    <div (click)=\"setSelfActive($event)\" [attr.id]=\"componentId\"\n          (mouseover)=\"onMouseOver($event)\" (mouseleave)=\"onMouseLeave($event)\"\n          draggable=\"true\" [ngClass]=\"{'componentStyle':isOver,'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}\"\n          (dragstart)=\"_eventHndl.componentElementRelocateDragBegin($event,this)\"\n          (contextmenu)=\"loadContextMenu($event)\"\n          (dragover)=\"componentElementDraggedOver($event)\" #txtField>\n      <amexio-checkbox-group [field-label]=\"properties.fieldLabel\"\n                             name=\"language\"\n                             [data-reader]=\"'response.data'\"\n                             [display-field]=\"'language'\"\n                             [horizontal]=\"properties.horizontal\"\n                             [value-field]=\"'checked'\"\n                             [data]=\"checkboxGroupdata\">\n      </amexio-checkbox-group>\n    </div>\n\n\n    <span  *ngIf=\"showContextMenu\" (click)=\"onDeleteClick()\" class=\"dropdown\"\n      [ngStyle]=\"{left: this.mouseLocation.left + 'px',top: this.mouseLocation.top + 'px',position:'fixed','box-shadow': '1px 1px 2px #000000',width: '15%'}\">\n          <ul class=\"dropdown-list\">\n            <li class=\"list-items\">\n              <span ><i class=\"fa fa-trash\" style=\"padding-right: 5px;\"></i> <b>Delete</b> </span>\n            </li>\n          </ul>\n        </span>\n  "
    })
], CheckBoxGroupCanvasComponent);
exports.CheckBoxGroupCanvasComponent = CheckBoxGroupCanvasComponent;
var CheckBoxGroupInputProperties = (function () {
    function CheckBoxGroupInputProperties() {
        /*temporary use*/
        this.name = '';
        this.isComponentValid = false;
        this.fieldLabel = 'Checkbox Group';
        this.horizontal = true;
        this.valueField = '';
        this.displayField = '';
    }
    return CheckBoxGroupInputProperties;
}());
exports.CheckBoxGroupInputProperties = CheckBoxGroupInputProperties;
var CheckBoxDatasource = (function (_super) {
    __extends(CheckBoxDatasource, _super);
    function CheckBoxDatasource() {
        var _this = _super.call(this) || this;
        _this.metadata = new datasource_model_1.Metadata();
        _this.dataReader = '';
        _this.servicetype = '1';
        _this.displayField = '';
        _this.valueField = '';
        _this.localDataName = null;
        _this.remote.httpMethod = 1;
        _this.remote.httpUrl = '';
        return _this;
    }
    return CheckBoxDatasource;
}(datasource_model_1.DatasourceModel));
exports.CheckBoxDatasource = CheckBoxDatasource;
