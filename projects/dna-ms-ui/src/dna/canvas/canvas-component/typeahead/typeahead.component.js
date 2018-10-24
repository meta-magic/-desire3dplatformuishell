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
 * Created by dattaram on 23/2/18.
 */
var core_1 = require("@angular/core");
var forms_properties_1 = require("../../canvas-models/forms.properties");
var canvas_widget_class_1 = require("../../canvas-models/canvas.widget.class");
var datasource_model_1 = require("../../canvas-models/datasource.model");
var event_basemodel_1 = require("../../event-relationship/models/event.basemodel");
var CanvasTypeAheadComponent = (function (_super) {
    __extends(CanvasTypeAheadComponent, _super);
    function CanvasTypeAheadComponent(_eventHndl, _componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this._eventHndl = _eventHndl;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this.type = 'default';
        _this.mouseLocation = { left: 0, top: 0 };
        _this.componentBehaviour.hasModelBinding = true;
        _this.componentBehaviour.hasRelationship = true;
        _this.componentBehaviour.isBindingComponent = true;
        _this.componentBehaviour.hasDataSource = true;
        _this.dataSource = new TypeAheadDatasource();
        _this.properties = new TypeAheadProperties();
        _this.eventRelationship = new event_basemodel_1.EventRelationBaseModel();
        return _this;
    }
    CanvasTypeAheadComponent.prototype.ngOnInit = function () {
        this.componentId =
            +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
    };
    CanvasTypeAheadComponent.prototype.onMouseOver = function (event) {
        event.stopPropagation();
        this.isOver = true;
    };
    CanvasTypeAheadComponent.prototype.onMouseLeave = function (event) {
        event.stopPropagation();
        this.isOver = false;
    };
    CanvasTypeAheadComponent.prototype.onHover = function () {
        this.showContextMenu = false;
    };
    CanvasTypeAheadComponent.prototype.getContextMenuStyle = function () {
        return {
            position: 'fixed',
            display: this.showContextMenu ? 'block' : 'none',
            left: this.mouseLocation.left + 'px',
            top: this.mouseLocation.top + 'px',
            'box-shadow': '1px 1px 2px #000000',
            width: '15%'
        };
    };
    CanvasTypeAheadComponent.prototype.loadContextMenu = function (event) {
        this.mouseLocation.left = event.clientX;
        this.mouseLocation.top = event.clientY;
        this.showContextMenu = true;
        event.preventDefault();
        event.stopPropagation();
        this._eventHndl.deleteComponentRef = this.componentId;
    };
    CanvasTypeAheadComponent.prototype.onDeleteClick = function () {
        this.showContextMenu = false;
        this._eventHndl.componentIdToDel = this.componentId;
        this._eventHndl.deleteComponent();
        this._eventHndl.addEditorNewState();
    };
    CanvasTypeAheadComponent.prototype.setSelfActive = function (event) {
        event.stopPropagation();
        this._eventHndl.deleteComponentRef = null;
        this._eventHndl.deleteComponentRef = this.componentId;
        this._eventHndl.setAllComponentsInactive(this.componentId);
        this._eventHndl.loadComponentProperties(this.name);
    };
    CanvasTypeAheadComponent.prototype.componentElementDraggedOver = function (event) {
        event.preventDefault();
    };
    return CanvasTypeAheadComponent;
}(canvas_widget_class_1.CanvasWidgetClass));
__decorate([
    core_1.HostListener('document:click')
], CanvasTypeAheadComponent.prototype, "onHover");
CanvasTypeAheadComponent = __decorate([
    core_1.Component({
        selector: 'canvas-typeahead',
        template: "\n    <div (click)=\"setSelfActive($event)\" [attr.id]=\"componentId\"\n         (mouseover)=\"onMouseOver($event)\" (mouseleave)=\"onMouseLeave($event)\"\n         draggable=\"true\" [ngClass]=\"{'componentStyle':isOver,'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}\"\n          (dragstart)=\"_eventHndl.componentElementRelocateDragBegin($event,this)\"\n          (contextmenu)=\"loadContextMenu($event)\"\n          (dragover)=\"componentElementDraggedOver($event)\" #typeahead>\n      <!--<amexio-typeahead [place-holder]=\"'Choose'\"\n                        [field-label]=\"properties.fieldLabel\">\n      </amexio-typeahead>-->\n\n      <amexio-typeahead [data-reader]=\"'data'\" [key]=\"'dummyText'\" [display-field]=\"'dummyValue'\" [place-holder]=\"properties.placeholder\"\n                        [http-url]=\"'https://api.myjson.com/bins/1g8jj3'\" [http-method]=\"'get'\" [field-label]=\"properties.fieldLabel\">\n      </amexio-typeahead>\n    </div>\n    <span  *ngIf=\"showContextMenu\" (click)=\"onDeleteClick()\" class=\"dropdown\"\n    [ngStyle]=\"{left: this.mouseLocation.left + 'px',top: this.mouseLocation.top + 'px',position:'fixed','box-shadow': '1px 1px 2px #000000',width: '15%'}\">\n        <ul class=\"dropdown-list\">\n          <li class=\"list-items\">\n            <span ><i class=\"fa fa-trash\" style=\"padding-right: 5px;\"></i> <b>Delete</b> </span>\n          </li>\n        </ul>\n      </span>\n  "
    })
], CanvasTypeAheadComponent);
exports.CanvasTypeAheadComponent = CanvasTypeAheadComponent;
var TypeAheadProperties = (function () {
    function TypeAheadProperties() {
        /*temporary use*/
        this.model = new forms_properties_1.ModelClass();
        this.fieldLabel = 'Type Ahead';
        this.isComponentValid = false;
        this.name = '';
        this.placeholder = '';
        this.triggerChar = 1;
        this.valueField = '';
        this.displayField = '';
    }
    return TypeAheadProperties;
}());
exports.TypeAheadProperties = TypeAheadProperties;
var TypeAheadDatasource = (function (_super) {
    __extends(TypeAheadDatasource, _super);
    function TypeAheadDatasource() {
        var _this = _super.call(this) || this;
        _this.metadata = new Metadata();
        _this.servicetype = '1';
        _this.localDataName = null;
        _this.remote.httpMethod = 1;
        _this.remote.httpUrl = '';
        _this.dataReader = '';
        _this.key = _this.displayField;
        _this.valueField = '';
        return _this;
    }
    return TypeAheadDatasource;
}(datasource_model_1.DatasourceModel));
exports.TypeAheadDatasource = TypeAheadDatasource;
var Metadata = (function () {
    function Metadata() {
        this.bcId = '';
        this.domainId = '';
        this.serviceId = '';
        this.operationId = '';
        this.methodType = '';
        this.recordData = [];
    }
    return Metadata;
}());
exports.Metadata = Metadata;
