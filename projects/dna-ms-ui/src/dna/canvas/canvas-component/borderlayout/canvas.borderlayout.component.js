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
var component_map_1 = require("../../canvas-component-map/component.map");
var CanvasBorderLayoutComponent = (function (_super) {
    __extends(CanvasBorderLayoutComponent, _super);
    function CanvasBorderLayoutComponent(_eventHndl, _componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this._eventHndl = _eventHndl;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this.mouseLocation = { left: 0, top: 0 };
        _this.properties = new BorderLayout();
        return _this;
    }
    CanvasBorderLayoutComponent.prototype.ngOnInit = function () {
        this.componentId =
            +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
    };
    CanvasBorderLayoutComponent.prototype.onWindowClick = function () {
        this.showContextMenu = false;
    };
    CanvasBorderLayoutComponent.prototype.getContextMenuStyle = function () {
        return {
            position: 'fixed',
            display: this.showContextMenu ? 'block' : 'none',
            left: this.mouseLocation.left + 'px',
            top: this.mouseLocation.top + 'px',
            'box-shadow': '1px 1px 2px #000000',
            width: '15%'
        };
    };
    CanvasBorderLayoutComponent.prototype.loadContextMenu = function (event) {
        this.mouseLocation.left = event.clientX;
        this.mouseLocation.top = event.clientY;
        this.showContextMenu = true;
        event.preventDefault();
        event.stopPropagation();
        this._eventHndl.deleteComponentRef = this.componentId;
    };
    CanvasBorderLayoutComponent.prototype.onDeleteClick = function () {
        this.showContextMenu = false;
        this._eventHndl.componentIdToDel = this.componentId;
        this._eventHndl.deleteComponent();
        this._eventHndl.addEditorNewState();
    };
    CanvasBorderLayoutComponent.prototype.onMouseOver = function (event) {
        event.stopPropagation();
        this.isOver = true;
    };
    CanvasBorderLayoutComponent.prototype.onMouseLeave = function (event) {
        event.stopPropagation();
        this.isOver = false;
    };
    CanvasBorderLayoutComponent.prototype.setSelfActive = function (event) {
        event.stopPropagation();
        this._eventHndl.deleteComponentRef = null;
        this._eventHndl.deleteComponentRef = this.componentId;
        this._eventHndl.setAllComponentsInactive(this.componentId);
        this._eventHndl.loadComponentProperties(this.name);
    };
    CanvasBorderLayoutComponent.prototype.componentElementDraggedOver = function (event) {
        event.preventDefault();
    };
    CanvasBorderLayoutComponent.prototype.createConfig = function () {
        var borderNorth = this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP['borderNorth']);
        var borderNorthComponentInstance = this.borderNorth.createComponent(borderNorth);
        this.northInstance = borderNorthComponentInstance;
        var borderEast = this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP['borderEast']);
        var borderEastComponentInstance = this.borderEast.createComponent(borderEast);
        this.eastInstance = borderEastComponentInstance;
        var borderCenter = this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP['borderCenter']);
        var borderCenterComponentInstance = this.borderCenter.createComponent(borderCenter);
        this.centerInstance = borderCenterComponentInstance;
        var borderWest = this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP['borderWest']);
        var borderWestComponentInstance = this.borderWest.createComponent(borderWest);
        this.westInstance = borderWestComponentInstance;
        var borderSouth = this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP['borderSouth']);
        var borderSouthComponentInstance = this.borderSouth.createComponent(borderSouth);
        this.southInstance = borderSouthComponentInstance;
        this.children.push(borderNorthComponentInstance, borderEastComponentInstance, borderCenterComponentInstance, borderWestComponentInstance, borderSouthComponentInstance);
    };
    CanvasBorderLayoutComponent.prototype.ngOnDestroy = function () {
        this.removeDuplicateOnRelocate(this._eventHndl.viewRefs);
        this.removeFromParent(this.parentComponentRef);
    };
    CanvasBorderLayoutComponent.prototype.removeDuplicateOnRelocate = function (components) {
        var _this = this;
        components.forEach(function (compRef, index) {
            if (compRef.componentId === _this.componentId) {
                components.splice(index, 1);
                return;
            }
            else {
                if (compRef.hasOwnProperty('children') && compRef.children.length > 0) {
                    _this.removeDuplicateOnRelocate(compRef.children);
                }
            }
        });
    };
    CanvasBorderLayoutComponent.prototype.removeFromParent = function (parentComponentRef) {
        var _this = this;
        if (parentComponentRef != null) {
            parentComponentRef.children.forEach(function (del, index) {
                if (del.instance.componentId === _this.componentId) {
                    parentComponentRef.children.splice(index, 1);
                }
            });
        }
    };
    return CanvasBorderLayoutComponent;
}(canvas_widget_class_1.CanvasWidgetClass));
__decorate([
    core_1.ViewChild('borderNorth', { read: core_1.ViewContainerRef })
], CanvasBorderLayoutComponent.prototype, "borderNorth");
__decorate([
    core_1.ViewChild('borderEast', { read: core_1.ViewContainerRef })
], CanvasBorderLayoutComponent.prototype, "borderEast");
__decorate([
    core_1.ViewChild('borderCenter', { read: core_1.ViewContainerRef })
], CanvasBorderLayoutComponent.prototype, "borderCenter");
__decorate([
    core_1.ViewChild('borderWest', { read: core_1.ViewContainerRef })
], CanvasBorderLayoutComponent.prototype, "borderWest");
__decorate([
    core_1.ViewChild('borderSouth', { read: core_1.ViewContainerRef })
], CanvasBorderLayoutComponent.prototype, "borderSouth");
__decorate([
    core_1.HostListener('document:click')
], CanvasBorderLayoutComponent.prototype, "onWindowClick");
CanvasBorderLayoutComponent = __decorate([
    core_1.Component({
        selector: 'canvas-border-layout',
        template: "\n    <div (click)=\"setSelfActive($event)\" [attr.id]=\"componentId\"\n          (mouseover)=\"onMouseOver($event)\" (mouseleave)=\"onMouseLeave($event)\"\n         (contextmenu)=\"loadContextMenu($event)\"\n          draggable=\"true\" [ngClass]=\"{'componentStyle':isOver,'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}\"\n          (dragstart)=\"_eventHndl.componentElementRelocateDragBegin($event,this)\"\n          (dragover)=\"componentElementDraggedOver($event)\" #card>\n\n      <amexio-borderlayout>\n\n        <amexio-borderlayout-item position=\"north\" [ngStyle]=\"{'display' : properties.north ? 'block' : 'none'}\">\n          <ng-template #borderNorth></ng-template>\n          N\n        </amexio-borderlayout-item>\n        <amexio-borderlayout-item position=\"east\" [ngStyle]=\"{'display' : properties.east ? 'block' : 'none'}\">\n          <ng-template #borderEast></ng-template>\n          E\n        </amexio-borderlayout-item>\n        <amexio-borderlayout-item position=\"center\" [ngStyle]=\"{'display' : properties.center ? 'block' : 'none'}\">\n          <ng-template #borderCenter></ng-template>\n          C\n        </amexio-borderlayout-item>\n        <amexio-borderlayout-item position=\"west\" [ngStyle]=\"{'display' : properties.west ? 'block' : 'none'}\">\n          <ng-template #borderWest></ng-template>\n          W\n        </amexio-borderlayout-item>\n        <amexio-borderlayout-item position=\"south\" [ngStyle]=\"{'display' : properties.south ? 'block' : 'none'}\">\n          <ng-template #borderSouth></ng-template>\n          S\n        </amexio-borderlayout-item>\n      </amexio-borderlayout>\n    </div>\n\n    <span  *ngIf=\"showContextMenu\" (click)=\"onDeleteClick()\" class=\"dropdown\"\n      [ngStyle]=\"{left: this.mouseLocation.left + 'px',top: this.mouseLocation.top + 'px',position:'fixed','box-shadow': '1px 1px 2px #000000',width: '15%'}\">\n          <ul class=\"dropdown-list\">\n            <li class=\"list-items\">\n              <span ><i class=\"fa fa-trash\" style=\"padding-right: 5px;\"></i> <b>Delete</b> </span>\n            </li>\n          </ul>\n        </span>\n  "
    })
], CanvasBorderLayoutComponent);
exports.CanvasBorderLayoutComponent = CanvasBorderLayoutComponent;
var BorderLayout = (function () {
    function BorderLayout() {
        this.isComponentValid = true;
        this.name = 'border_' + Math.floor(Math.random() * 90000) + 10000;
        this.north = true;
        this.east = true;
        this.center = true;
        this.west = true;
        this.south = true;
    }
    return BorderLayout;
}());
exports.BorderLayout = BorderLayout;
