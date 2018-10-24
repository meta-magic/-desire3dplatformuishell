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
 * Created by dattaram on 28/2/18.
 */
var core_1 = require("@angular/core");
var canvas_widget_class_1 = require("../../canvas-models/canvas.widget.class");
var properties_map_1 = require("../../canvas-component-map/properties.map");
var event_basemodel_1 = require("../../event-relationship/models/event.basemodel");
var ButtonGroupComponent = (function (_super) {
    __extends(ButtonGroupComponent, _super);
    function ButtonGroupComponent(_dragDropEventService, _eventHndl, _componentFactoryResolver, viewContainerRef) {
        var _this = _super.call(this) || this;
        _this._dragDropEventService = _dragDropEventService;
        _this._eventHndl = _eventHndl;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this.viewContainerRef = viewContainerRef;
        _this.mouseLocation = { left: 0, top: 0 };
        _this.properties = new ButtonGroupProperties();
        _this.eventRelationship = new event_basemodel_1.EventRelationBaseModel();
        _this.target = _this.viewContainerRef;
        _this.showButtonProperties = false;
        return _this;
    }
    ButtonGroupComponent.prototype.ngOnInit = function () {
        this.componentId =
            +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
    };
    ButtonGroupComponent.prototype.onMouseOver = function (event) {
        event.stopPropagation();
        this.isOver = true;
    };
    ButtonGroupComponent.prototype.onMouseLeave = function (event) {
        event.stopPropagation();
        this.isOver = false;
    };
    ButtonGroupComponent.prototype.onWindowClick = function () {
        this.showContextMenu = false;
    };
    ButtonGroupComponent.prototype.getContextMenuStyle = function () {
        return {
            position: 'fixed',
            display: this.showContextMenu ? 'block' : 'none',
            left: this.mouseLocation.left + 'px',
            top: this.mouseLocation.top + 'px',
            'box-shadow': '1px 1px 2px #000000',
            width: '15%'
        };
    };
    ButtonGroupComponent.prototype.loadContextMenu = function (event) {
        this.mouseLocation.left = event.clientX;
        this.mouseLocation.top = event.clientY;
        this.showContextMenu = true;
        event.preventDefault();
        event.stopPropagation();
        this._eventHndl.deleteComponentRef = this.componentId;
    };
    ButtonGroupComponent.prototype.onDeleteClick = function () {
        this.showContextMenu = false;
        this._eventHndl.componentIdToDel = this.componentId;
        this._eventHndl.deleteComponent();
        this._eventHndl.addEditorNewState();
    };
    ButtonGroupComponent.prototype.setSelfActive = function (event) {
        event.stopPropagation();
        this.showButtonProperties = false;
        this._eventHndl.deleteComponentRef = null;
        this._eventHndl.deleteComponentRef = this.componentId;
        this._eventHndl.setAllComponentsInactive(this.componentId);
        this._eventHndl.loadComponentProperties(this.name);
    };
    ButtonGroupComponent.prototype.componentElementDraggedOver = function (event) {
        event.preventDefault();
    };
    ButtonGroupComponent.prototype.createComponentConfig = function () {
        if (this._eventHndl.eventType !== 'R') {
            this.showButtonProperties = false;
            this._eventHndl.componentClassKeyDragged = null;
            this._eventHndl.componentClassKeyDragged = 'buttongroupaction';
            this._dragDropEventService.componentElementDrop(this);
        }
        this.createLocalData();
        this.showButtonProperties = false;
        this._eventHndl.deleteComponentRef = null;
        this._eventHndl.deleteComponentRef = this.componentId;
        this._eventHndl.setAllComponentsInactive(this.componentId);
        this._eventHndl.loadComponentProperties(this.name);
    };
    ButtonGroupComponent.prototype.loadComponentProperties = function () {
        this._eventHndl.propertyViewRef.clear();
        var propertyFactory = this._componentFactoryResolver.resolveComponentFactory(properties_map_1.PropertyMap.PROPERTY_MAP[this.name]);
        var propertyInstance = this._eventHndl.propertyViewRef.createComponent(propertyFactory);
        propertyInstance.instance.componentInstance = this;
        propertyInstance.changeDetectorRef.detectChanges();
    };
    ButtonGroupComponent.prototype.getButtonData = function (data) {
        data.event.stopPropagation();
        this._eventHndl.loadComponentProperties(this.name);
        this.showButtonProperties = true;
        this.buttonPropertyObject = data.buttonObject;
    };
    /* DONT REMOVE createLocalData FUNTION IT WILL BREAK BUTTONGROUP OPEN CASE */
    ButtonGroupComponent.prototype.createLocalData = function () {
        var _this = this;
        this.localData = [];
        this.children.forEach(function (child) {
            _this.localData.push(child.instance.properties);
        });
    };
    return ButtonGroupComponent;
}(canvas_widget_class_1.CanvasWidgetClass));
__decorate([
    core_1.HostListener('document:click')
], ButtonGroupComponent.prototype, "onWindowClick");
ButtonGroupComponent = __decorate([
    core_1.Component({
        selector: 'canvas-button-group',
        template: "\n    <div  style=\"padding: 5px\" (click)=\"setSelfActive($event)\" [attr.id]=\"componentId\"\n          (mouseover)=\"onMouseOver($event)\" (mouseleave)=\"onMouseLeave($event)\"\n          draggable=\"true\" [ngClass]=\"{'componentStyle':isOver,'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}\"\n          (dragstart)=\"_eventHndl.componentElementRelocateDragBegin($event,this)\"\n          (contextmenu)=\"loadContextMenu($event)\"\n          (dragover)=\"componentElementDraggedOver($event)\" #butongroup>\n      <amexio-btn-group [buttonGroupLocalData]=\"localData\" [size]=\"properties.size\" (getButton)=\"getButtonData($event)\">\n      </amexio-btn-group>\n    </div>\n    <span  *ngIf=\"showContextMenu\" (click)=\"onDeleteClick()\" class=\"dropdown\"\n    [ngStyle]=\"{left: this.mouseLocation.left + 'px',top: this.mouseLocation.top + 'px',position:'fixed','box-shadow': '1px 1px 2px #000000',width: '15%'}\">\n        <ul class=\"dropdown-list\">\n          <li class=\"list-items\">\n            <span ><i class=\"fa fa-trash\" style=\"padding-right: 5px;\"></i> <b>Delete</b> </span>\n          </li>\n        </ul>\n      </span>\n  "
    })
], ButtonGroupComponent);
exports.ButtonGroupComponent = ButtonGroupComponent;
var ButtonGroupProperties = (function () {
    function ButtonGroupProperties() {
        this.name = '';
        this.isComponentValid = false;
        this.size = 'default';
    }
    return ButtonGroupProperties;
}());
exports.ButtonGroupProperties = ButtonGroupProperties;
