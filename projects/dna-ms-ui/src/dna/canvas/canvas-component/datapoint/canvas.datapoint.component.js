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
var CanvasDataPointComponent = (function (_super) {
    __extends(CanvasDataPointComponent, _super);
    function CanvasDataPointComponent(_eventHndl, _componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this._eventHndl = _eventHndl;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this.mouseLocation = { left: 0, top: 0 };
        _this.properties = new DataPointLayout();
        return _this;
    }
    CanvasDataPointComponent.prototype.ngOnInit = function () {
        this.componentId =
            +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
    };
    CanvasDataPointComponent.prototype.onWindowClick = function () {
        this.showContextMenu = false;
    };
    CanvasDataPointComponent.prototype.getContextMenuStyle = function () {
        return {
            position: 'fixed',
            display: this.showContextMenu ? 'block' : 'none',
            left: this.mouseLocation.left + 'px',
            top: this.mouseLocation.top + 'px',
            'box-shadow': '1px 1px 2px #000000',
            width: '15%'
        };
    };
    CanvasDataPointComponent.prototype.loadContextMenu = function (event) {
        this.mouseLocation.left = event.clientX;
        this.mouseLocation.top = event.clientY;
        this.showContextMenu = true;
        event.preventDefault();
        event.stopPropagation();
        this._eventHndl.deleteComponentRef = this.componentId;
    };
    CanvasDataPointComponent.prototype.onDeleteClick = function () {
        this.showContextMenu = false;
        this._eventHndl.componentIdToDel = this.componentId;
        this._eventHndl.deleteComponent();
        this._eventHndl.addEditorNewState();
    };
    CanvasDataPointComponent.prototype.onMouseOver = function (event) {
        event.stopPropagation();
        this.isOver = true;
    };
    CanvasDataPointComponent.prototype.onMouseLeave = function (event) {
        event.stopPropagation();
        this.isOver = false;
    };
    CanvasDataPointComponent.prototype.setSelfActive = function (event) {
        event.stopPropagation();
        this._eventHndl.deleteComponentRef = null;
        this._eventHndl.deleteComponentRef = this.componentId;
        this._eventHndl.setAllComponentsInactive(this.componentId);
        this._eventHndl.loadComponentProperties(this.name);
    };
    CanvasDataPointComponent.prototype.componentElementDraggedOver = function (event) {
        event.preventDefault();
    };
    CanvasDataPointComponent.prototype.createConfig = function () {
        var dataWest = this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP['dataWest']);
        var borderWestComponentInstance = this.datawest.createComponent(dataWest);
        this.westInstance = borderWestComponentInstance;
        var dataCenter = this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP['dataCenter']);
        var borderCenterComponentInstance = this.datacenter.createComponent(dataCenter);
        this.centerInstance = borderCenterComponentInstance;
        var dataSouth = this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP['dataSouth']);
        var borderSouthComponentInstance = this.datasouth.createComponent(dataSouth);
        this.southInstance = borderSouthComponentInstance;
        var dataEast = this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP['dataEast']);
        var dataEastComponentInstance = this.dataeast.createComponent(dataEast);
        this.eastInstance = dataEastComponentInstance;
        var dataNorth = this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP['dataNorth']);
        var dataNorthComponentInstance = this.datanorth.createComponent(dataNorth);
        this.northInstance = dataNorthComponentInstance;
        this.children.push(dataNorthComponentInstance, dataEastComponentInstance, borderCenterComponentInstance, borderWestComponentInstance, borderSouthComponentInstance);
    };
    CanvasDataPointComponent.prototype.ngOnDestroy = function () {
        this.removeDuplicateOnRelocate(this._eventHndl.viewRefs);
        this.removeFromParent(this.parentComponentRef);
    };
    CanvasDataPointComponent.prototype.removeDuplicateOnRelocate = function (components) {
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
    CanvasDataPointComponent.prototype.removeFromParent = function (parentComponentRef) {
        var _this = this;
        if (parentComponentRef != null) {
            parentComponentRef.children.forEach(function (del, index) {
                if (del.instance.componentId === _this.componentId) {
                    parentComponentRef.children.splice(index, 1);
                }
            });
        }
    };
    return CanvasDataPointComponent;
}(canvas_widget_class_1.CanvasWidgetClass));
__decorate([
    core_1.ViewChild('datawest', { read: core_1.ViewContainerRef })
], CanvasDataPointComponent.prototype, "datawest");
__decorate([
    core_1.ViewChild('datacenter', { read: core_1.ViewContainerRef })
], CanvasDataPointComponent.prototype, "datacenter");
__decorate([
    core_1.ViewChild('datasouth', { read: core_1.ViewContainerRef })
], CanvasDataPointComponent.prototype, "datasouth");
__decorate([
    core_1.ViewChild('datanorth', { read: core_1.ViewContainerRef })
], CanvasDataPointComponent.prototype, "datanorth");
__decorate([
    core_1.ViewChild('dataeast', { read: core_1.ViewContainerRef })
], CanvasDataPointComponent.prototype, "dataeast");
__decorate([
    core_1.HostListener('document:click')
], CanvasDataPointComponent.prototype, "onWindowClick");
CanvasDataPointComponent = __decorate([
    core_1.Component({
        selector: 'canvas-data-point',
        template: "\n    <div (click)=\"setSelfActive($event)\" [attr.id]=\"componentId\"\n          (mouseover)=\"onMouseOver($event)\" (mouseleave)=\"onMouseLeave($event)\"\n          draggable=\"true\" [ngClass]=\"{'componentStyle':isOver,'componentSelectStyle':isActive}\"\n          (dragstart)=\"_eventHndl.componentElementRelocateDragBegin($event,this)\"\n         (contextmenu)=\"loadContextMenu($event)\"\n          (dragover)=\"componentElementDraggedOver($event)\" #card>\n\n      <amexio-datapoints [north]=\"properties.north\" [west]=\"properties.west\" [center]=\"properties.center\" [east]=\"properties.east\" [south]=\"properties.south\">\n        <amexio-north>\n          <ng-template #datanorth></ng-template>\n        </amexio-north>\n        <amexio-west>\n          <ng-template #datawest></ng-template>\n        </amexio-west>\n        <amexio-center>\n         <ng-template #datacenter></ng-template>\n        </amexio-center>\n        <amexio-east>\n          <ng-template #dataeast></ng-template>\n        </amexio-east>\n        <amexio-south>\n         <ng-template #datasouth></ng-template>\n        </amexio-south>\n      </amexio-datapoints>\n\n    </div>\n    <span  *ngIf=\"showContextMenu\" (click)=\"onDeleteClick()\" class=\"dropdown\"\n    [ngStyle]=\"{left: this.mouseLocation.left + 'px',top: this.mouseLocation.top + 'px',position:'fixed','box-shadow': '1px 1px 2px #000000',width: '15%'}\">\n        <ul class=\"dropdown-list\">\n          <li class=\"list-items\">\n            <span ><i class=\"fa fa-trash\" style=\"padding-right: 5px;\"></i> <b>Delete</b> </span>\n          </li>\n        </ul>\n      </span>\n  "
    })
], CanvasDataPointComponent);
exports.CanvasDataPointComponent = CanvasDataPointComponent;
var DataPointLayout = (function () {
    function DataPointLayout() {
        /*temporary use*/
        this.isComponentValid = true;
        this.name = 'datapoint_' + Math.floor(Math.random() * 90000) + 10000;
        this.north = true;
        this.east = true;
        this.center = true;
        this.west = true;
        this.south = true;
        this.backgroundColor = '';
        this.fontColor = '';
    }
    return DataPointLayout;
}());
exports.DataPointLayout = DataPointLayout;
