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
 * Created by pratik on 27/2/18.
 */
var core_1 = require("@angular/core");
var canvas_widget_class_1 = require("../../canvas-models/canvas.widget.class");
var properties_map_1 = require("../../canvas-component-map/properties.map");
var event_basemodel_1 = require("../../event-relationship/models/event.basemodel");
var ButtonDropDownCanvasComponent = (function (_super) {
    __extends(ButtonDropDownCanvasComponent, _super);
    function ButtonDropDownCanvasComponent(_dragDropEventService, _eventHndl, _componentFactoryResolver, viewContainerRef) {
        var _this = _super.call(this) || this;
        _this._dragDropEventService = _dragDropEventService;
        _this._eventHndl = _eventHndl;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this.viewContainerRef = viewContainerRef;
        _this.mouseLocation = { left: 0, top: 0 };
        _this.properties = new ButtonDropDownProperties();
        _this.eventRelationship = new event_basemodel_1.EventRelationBaseModel();
        _this.target = _this.viewContainerRef;
        _this.showButtonProperties = false;
        return _this;
    }
    ButtonDropDownCanvasComponent.prototype.ngOnInit = function () {
        this.componentId =
            +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
    };
    ButtonDropDownCanvasComponent.prototype.onMouseOver = function (event) {
        event.stopPropagation();
        this.isOver = true;
    };
    ButtonDropDownCanvasComponent.prototype.onMouseLeave = function (event) {
        event.stopPropagation();
        this.isOver = false;
    };
    ButtonDropDownCanvasComponent.prototype.onWindowClick = function () {
        this.showContextMenu = false;
    };
    ButtonDropDownCanvasComponent.prototype.getContextMenuStyle = function () {
        return {
            position: 'fixed',
            display: this.showContextMenu ? 'block' : 'none',
            left: this.mouseLocation.left + 'px',
            top: this.mouseLocation.top + 'px',
            'box-shadow': '1px 1px 2px #000000',
            width: '15%'
        };
    };
    ButtonDropDownCanvasComponent.prototype.loadContextMenu = function (event) {
        this.mouseLocation.left = event.clientX;
        this.mouseLocation.top = event.clientY;
        this.showContextMenu = true;
        event.preventDefault();
        event.stopPropagation();
        this._eventHndl.deleteComponentRef = this.componentId;
    };
    ButtonDropDownCanvasComponent.prototype.onDeleteClick = function () {
        this.showContextMenu = false;
        this._eventHndl.componentIdToDel = this.componentId;
        this._eventHndl.deleteComponent();
        this._eventHndl.addEditorNewState();
    };
    ButtonDropDownCanvasComponent.prototype.setSelfActive = function (event) {
        event.stopPropagation();
        this.showButtonProperties = false;
        this._eventHndl.deleteComponentRef = null;
        this._eventHndl.deleteComponentRef = this.componentId;
        this._eventHndl.setAllComponentsInactive(this.componentId);
        this._eventHndl.loadComponentProperties(this.name);
    };
    ButtonDropDownCanvasComponent.prototype.loadComponentProperties = function () {
        this._eventHndl.propertyViewRef.clear();
        var propertyFactory = this._componentFactoryResolver.resolveComponentFactory(properties_map_1.PropertyMap.PROPERTY_MAP[this.name]);
        var propertyInstance = this._eventHndl.propertyViewRef.createComponent(propertyFactory);
        propertyInstance.instance.componentInstance = this;
        propertyInstance.changeDetectorRef.detectChanges();
    };
    ButtonDropDownCanvasComponent.prototype.componentElementDraggedOver = function (event) {
        event.preventDefault();
    };
    ButtonDropDownCanvasComponent.prototype.createComponentConfig = function () {
        if (this._eventHndl.eventType !== 'R') {
            this._eventHndl.componentClassKeyDragged = null;
            this._eventHndl.componentClassKeyDragged = 'buttonlink';
            this._dragDropEventService.componentElementDrop(this);
        }
        this.createLocalData();
        this._eventHndl.deleteComponentRef = null;
        this._eventHndl.deleteComponentRef = this.componentId;
        this._eventHndl.setAllComponentsInactive(this.componentId);
        this._eventHndl.loadComponentProperties(this.name);
    };
    ButtonDropDownCanvasComponent.prototype.getLinkData = function (data) {
        data.event.stopPropagation();
        this.showButtonProperties = true;
        this.buttonPropertyObject = data.data;
    };
    /* DONT REMOVE createLocalData FUNTION IT WILL BREAK BUTTONDROPDOWN OPEN CASE */
    ButtonDropDownCanvasComponent.prototype.createLocalData = function () {
        var _this = this;
        this.localData = [];
        this.children.forEach(function (child) {
            _this.localData.push(child.instance.properties);
        });
    };
    return ButtonDropDownCanvasComponent;
}(canvas_widget_class_1.CanvasWidgetClass));
__decorate([
    core_1.HostListener('document:click')
], ButtonDropDownCanvasComponent.prototype, "onWindowClick");
ButtonDropDownCanvasComponent = __decorate([
    core_1.Component({
        selector: 'button-dropdown-canvas',
        template: "\n    <div (click)=\"setSelfActive($event)\" [attr.id]=\"componentId\"\n         (mouseover)=\"onMouseOver($event)\" (mouseleave)=\"onMouseLeave($event)\"\n         draggable=\"true\" [ngClass]=\"{'componentStyle':isOver,'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}\"\n          (dragstart)=\"_eventHndl.componentElementRelocateDragBegin($event,this)\"\n          (contextmenu)=\"loadContextMenu($event)\"\n          (dragover)=\"componentElementDraggedOver($event)\" #txtField>\n\n      <amexio-btn-dropdown [label]=\"properties.label\"\n                           [type]=\"properties.type\"\n                           [buttonGroupLocalData]=\"localData\"\n                           [size]=\"properties.size\"\n                           (getLinkData)=\"getLinkData($event)\">\n      </amexio-btn-dropdown>\n\n\n    </div>\n\n    <span  *ngIf=\"showContextMenu\" (click)=\"onDeleteClick()\" class=\"dropdown\"\n      [ngStyle]=\"{left: this.mouseLocation.left + 'px',top: this.mouseLocation.top + 'px',position:'fixed','box-shadow': '1px 1px 2px #000000',width: '15%'}\">\n          <ul class=\"dropdown-list\">\n            <li class=\"list-items\">\n              <span ><i class=\"fa fa-trash\" style=\"padding-right: 5px;\"></i> <b>Delete</b> </span>\n            </li>\n          </ul>\n        </span>\n\n\n  "
    })
], ButtonDropDownCanvasComponent);
exports.ButtonDropDownCanvasComponent = ButtonDropDownCanvasComponent;
var ButtonDropDownProperties = (function () {
    function ButtonDropDownProperties() {
        /*temporary use*/
        this.name = '';
        this.isComponentValid = false;
        this.label = 'Button';
        this.disabled = false;
        this.type = 'default';
        this.size = 'default';
        this.tooltip = 'button';
    }
    return ButtonDropDownProperties;
}());
exports.ButtonDropDownProperties = ButtonDropDownProperties;
