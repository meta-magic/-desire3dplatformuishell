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
 * Created by pratik on 8/12/17.
 */
var core_1 = require("@angular/core");
var canvas_widget_class_1 = require("../../../canvas-models/canvas.widget.class");
var properties_map_1 = require("../../../canvas-component-map/properties.map");
var TabPill = (function (_super) {
    __extends(TabPill, _super);
    function TabPill(_dragDropEventService, _componentFactoryResolver, _eventHndl) {
        var _this = _super.call(this) || this;
        _this._dragDropEventService = _dragDropEventService;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this._eventHndl = _eventHndl;
        _this.active = false;
        _this.name = 'tabpill';
        _this.mouseLocation = { left: 0, top: 0 };
        _this.tabId = Math.floor(Math.random() * 90000) + 10000;
        _this.properties = new TabPillProperties();
        return _this;
    }
    TabPill.prototype.ngOnInit = function () {
        this.componentId =
            +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
    };
    TabPill.prototype.componentElementDraggedOver = function (event) {
        this.componentOverStyle = 'overEffect';
        event.preventDefault();
        event.stopPropagation();
    };
    TabPill.prototype.componentElementDropped = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this._dragDropEventService.componentElementDrop(this);
    };
    TabPill.prototype.onMouseOver = function (event) {
        event.stopPropagation();
        this.componentOverStyle = 'overEffect';
    };
    TabPill.prototype.onMouseLeave = function (event) {
        event.stopPropagation();
        this.componentOverStyle = '';
    };
    TabPill.prototype.onMouseEnter = function (event) {
        event.stopPropagation();
        this.componentOverStyle = '';
    };
    TabPill.prototype.onMouseOut = function (event) {
        event.stopPropagation();
        this.componentOverStyle = '';
    };
    TabPill.prototype.componentDragEnter = function (event) {
        event.stopPropagation();
        this.componentOverStyle = '';
    };
    TabPill.prototype.loadContextMenu = function (event) {
        this.mouseLocation.left = event.clientX;
        this.mouseLocation.top = event.clientY;
        this.showContextMenu = true;
        event.preventDefault();
        event.stopPropagation();
    };
    TabPill.prototype.getContextMenuStyle = function () {
        return {
            position: 'fixed',
            display: this.showContextMenu ? 'block' : 'none',
            left: this.mouseLocation.left + 'px',
            top: this.mouseLocation.top + 'px',
            'box-shadow': '1px 1px 2px #000000',
            width: '15%'
        };
    };
    TabPill.prototype.setSelfActive = function (event) {
        if (event != null) {
            event.stopPropagation();
            this.componentOverStyle = 'overEffect';
            this.showContextMenu = false;
            this._eventHndl.deleteComponentRef = null;
            this._eventHndl.deleteComponentRef = this.componentId;
            this._eventHndl.setAllComponentsInactive(this.componentId);
            this.loadComponentProperties();
        }
    };
    TabPill.prototype.loadComponentProperties = function () {
        this._eventHndl.propertyViewRef.clear();
        var propertyFactory = this._componentFactoryResolver.resolveComponentFactory(properties_map_1.PropertyMap.PROPERTY_MAP[this.name]);
        var propertyInstance = this._eventHndl.propertyViewRef.createComponent(propertyFactory);
        propertyInstance.instance.componentInstance = this._eventHndl.currentWidgetRef;
        propertyInstance.changeDetectorRef.detectChanges();
    };
    TabPill.prototype.onDeleteClick = function () {
        this.showContextMenu = false;
        this._eventHndl.componentIdToDel = this.componentId;
        this._eventHndl.deleteComponent();
        this._eventHndl.addEditorNewState();
    };
    return TabPill;
}(canvas_widget_class_1.CanvasWidgetClass));
__decorate([
    core_1.Input()
], TabPill.prototype, "title");
__decorate([
    core_1.Input()
], TabPill.prototype, "active");
__decorate([
    core_1.Input()
], TabPill.prototype, "iconClass");
__decorate([
    core_1.ViewChild('tabpill', { read: core_1.ViewContainerRef })
], TabPill.prototype, "target");
TabPill = __decorate([
    core_1.Component({
        selector: 'tab-pill',
        template: "\n    <div role=\"tabpanel\" [ngStyle]=\"{'display' : active ? 'block' : 'none'}\"\n         class=\"tab-pane active {{componentOverStyle}}\" (mouseover)=\"onMouseOver($event)\"\n         (mouseleave)=\"onMouseLeave($event)\" (click)=\"setSelfActive($event)\"\n         (dragover)=\"componentElementDraggedOver($event)\"\n         (dragend)=\"componentDragEnter($event)\"\n         (contextmenu)=\"loadContextMenu($event)\"\n         (drop)=\"componentElementDropped($event)\" style=\"min-height: 100px;min-width: 200px;\">\n\n      <div (mouseenter)=\"onMouseEnter($event)\" (dragenter)=\"componentDragEnter($event)\" (mouseout)=\"onMouseOut($event)\" style=\"padding: 10px 10px 10px 10px;\">\n          <ng-template #tabpill></ng-template>\n      </div>\n      \n    </div>\n\n  "
    })
], TabPill);
exports.TabPill = TabPill;
var TabPillProperties = (function () {
    function TabPillProperties() {
        this.isComponentValid = true;
        this.name = '';
        this.title = 'Tab Pill';
        this.iconClass = '';
    }
    return TabPillProperties;
}());
exports.TabPillProperties = TabPillProperties;
