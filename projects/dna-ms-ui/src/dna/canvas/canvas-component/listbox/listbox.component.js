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
var core_1 = require("@angular/core");
var canvas_widget_class_1 = require("../../canvas-models/canvas.widget.class");
var forms_properties_1 = require("../../canvas-models/forms.properties");
var datasource_model_1 = require("../../canvas-models/datasource.model");
var event_basemodel_1 = require("../../event-relationship/models/event.basemodel");
var CanvasListboxComponent = (function (_super) {
    __extends(CanvasListboxComponent, _super);
    function CanvasListboxComponent(_eventHndl, _componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this._eventHndl = _eventHndl;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this.type = 'default';
        _this.mouseLocation = { left: 0, top: 0 };
        _this.componentBehaviour.hasModelBinding = false;
        _this.componentBehaviour.hasRelationship = true;
        _this.componentBehaviour.isBindingComponent = true;
        _this.componentBehaviour.hasDataSource = true;
        _this.properties = new ListboxProperties();
        _this.dataSource = new ListBoxDatasource();
        _this.eventRelationship = new event_basemodel_1.EventRelationBaseModel();
        _this.localData = _this.localData = {
            data: [
                {
                    name: 'Item 1'
                },
                {
                    name: 'Item 2'
                },
                {
                    name: 'Item 3'
                },
                {
                    name: 'Item 4'
                },
                {
                    name: 'Item 5'
                }
            ]
        };
        return _this;
    }
    CanvasListboxComponent.prototype.ngOnInit = function () {
        this.componentId =
            +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
    };
    CanvasListboxComponent.prototype.onMouseOver = function (event) {
        event.stopPropagation();
        this.isOver = true;
    };
    CanvasListboxComponent.prototype.onMouseLeave = function (event) {
        event.stopPropagation();
        this.isOver = false;
    };
    CanvasListboxComponent.prototype.onWindowClick = function () {
        this.showContextMenu = false;
    };
    CanvasListboxComponent.prototype.getContextMenuStyle = function () {
        return {
            position: 'fixed',
            display: this.showContextMenu ? 'block' : 'none',
            left: this.mouseLocation.left + 'px',
            top: this.mouseLocation.top + 'px',
            'box-shadow': '1px 1px 2px #000000',
            width: '15%'
        };
    };
    CanvasListboxComponent.prototype.loadContextMenu = function (event) {
        this.mouseLocation.left = event.clientX;
        this.mouseLocation.top = event.clientY;
        this.showContextMenu = true;
        event.preventDefault();
        event.stopPropagation();
        this._eventHndl.deleteComponentRef = this.componentId;
    };
    CanvasListboxComponent.prototype.onDeleteClick = function () {
        this.showContextMenu = false;
        this._eventHndl.componentIdToDel = this.componentId;
        this._eventHndl.deleteComponent();
        this._eventHndl.addEditorNewState();
    };
    CanvasListboxComponent.prototype.setSelfActive = function (event) {
        event.stopPropagation();
        this._eventHndl.deleteComponentRef = null;
        this._eventHndl.deleteComponentRef = this.componentId;
        this._eventHndl.setAllComponentsInactive(this.componentId);
        this._eventHndl.loadComponentProperties(this.name);
    };
    CanvasListboxComponent.prototype.componentElementDraggedOver = function (event) {
        event.preventDefault();
    };
    return CanvasListboxComponent;
}(canvas_widget_class_1.CanvasWidgetClass));
__decorate([
    core_1.HostListener('document:click')
], CanvasListboxComponent.prototype, "onWindowClick");
CanvasListboxComponent = __decorate([
    core_1.Component({
        selector: 'listbox',
        template: "\n    <div  (click)=\"setSelfActive($event)\" [attr.id]=\"componentId\"\n          (mouseover)=\"onMouseOver($event)\" (mouseleave)=\"onMouseLeave($event)\"\n          draggable=\"true\" [ngClass]=\"{'componentStyle':isOver,'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}\"\n          (dragstart)=\"_eventHndl.componentElementRelocateDragBegin($event,this)\"\n          (contextmenu)=\"loadContextMenu($event)\"\n          (dragover)=\"componentElementDraggedOver($event)\" #listbox>\n\n          <amexio-listbox\n                [header]=\"properties.header\"\n                [data]=\"localData\"\n                [search-placeholder]=\"properties.searchPlaceholder\"\n                [data-reader]=\"'data'\"\n                [display-field]=\"'name'\"\n                [filter]=\"properties.filter\"\n                [height]=\"properties.height\"\n                [enable-checkbox]=\"properties.enableCheckbox\"\n                >\n          </amexio-listbox>\n    </div>\n    <span  *ngIf=\"showContextMenu\" (click)=\"onDeleteClick()\" class=\"dropdown\"\n      [ngStyle]=\"{left: this.mouseLocation.left + 'px',top: this.mouseLocation.top + 'px',position:'fixed','box-shadow': '1px 1px 2px #000000',width: '15%'}\">\n          <ul class=\"dropdown-list\">\n            <li class=\"list-items\">\n              <span ><i class=\"fa fa-trash\" style=\"padding-right: 5px;\"></i> <b>Delete</b> </span>\n            </li>\n          </ul>\n        </span>\n  "
    })
], CanvasListboxComponent);
exports.CanvasListboxComponent = CanvasListboxComponent;
var ListboxProperties = (function () {
    function ListboxProperties() {
        this.model = new forms_properties_1.ModelClass();
        this.isComponentValid = false;
        this.name = '';
        this.height = 250;
        this.enableCheckbox = false;
        this.filter = false;
        this.header = 'Contacts';
        this.searchPlaceholder = 'Search contact';
    }
    return ListboxProperties;
}());
exports.ListboxProperties = ListboxProperties;
var ListBoxDatasource = (function (_super) {
    __extends(ListBoxDatasource, _super);
    function ListBoxDatasource() {
        var _this = _super.call(this) || this;
        _this.metadata = new datasource_model_1.Metadata();
        _this.dataReader = '';
        _this.servicetype = '1';
        _this.displayField = '';
        _this.localDataName = null;
        _this.remote.httpUrl = '';
        _this.remote.httpMethod = 1;
        _this.dataReader = '';
        return _this;
    }
    return ListBoxDatasource;
}(datasource_model_1.DatasourceModel));
exports.ListBoxDatasource = ListBoxDatasource;
