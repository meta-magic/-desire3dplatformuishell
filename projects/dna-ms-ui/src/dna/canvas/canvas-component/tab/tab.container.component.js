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
var CanvasTabContainerComponent = (function (_super) {
    __extends(CanvasTabContainerComponent, _super);
    function CanvasTabContainerComponent(_dragDropEventService, _componentFactoryResolver, _eventHndl) {
        var _this = _super.call(this) || this;
        _this._dragDropEventService = _dragDropEventService;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this._eventHndl = _eventHndl;
        _this.tabpillCollection = [];
        _this.mouseLocation = { left: 0, top: 0 };
        _this.componentBehaviour.hasRelationship = true;
        _this.properties = new SimpleTabProperties();
        return _this;
    }
    CanvasTabContainerComponent.prototype.ngOnInit = function () {
        this.componentId =
            +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
    };
    CanvasTabContainerComponent.prototype.onWindowClick = function () {
        this.showContextMenu = false;
    };
    CanvasTabContainerComponent.prototype.ngOnDestroy = function () { };
    CanvasTabContainerComponent.prototype.createComponentConfig = function () {
        if (this._eventHndl.eventType !== 'R') {
            this._eventHndl.componentClassKeyDragged = null;
            this._eventHndl.componentClassKeyDragged = 'tabpill';
            this._dragDropEventService.componentElementDrop(this);
        }
        this.createLocalData();
        this._eventHndl.deleteComponentRef = null;
        this._eventHndl.deleteComponentRef = this.componentId;
        this._eventHndl.setAllComponentsInactive(this.componentId);
        this._eventHndl.loadComponentProperties(this.name);
    };
    CanvasTabContainerComponent.prototype.createLocalData = function () {
        var _this = this;
        this.tabpillCollection = [];
        this.children.forEach(function (child, index) {
            child.instance.title = child.instance.properties.title;
            child.instance.iconClass = child.instance.properties.iconClass;
            child.instance.parentComponentRef = _this;
            child.instance.active = false;
            if (_this.children.length == index + 1) {
                child.instance.active = true;
            }
            child.changeDetectorRef.detectChanges();
            _this.tabpillCollection.push(child.instance);
        });
    };
    CanvasTabContainerComponent.prototype.componentElementDraggedOver = function (event) {
        this.componentOverStyle = 'overEffect';
        event.preventDefault();
        event.stopPropagation();
    };
    CanvasTabContainerComponent.prototype.componentElementDropped = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this._dragDropEventService.componentElementDrop(this);
    };
    CanvasTabContainerComponent.prototype.onMouseEnter = function (event) {
        event.stopPropagation();
        this.componentOverStyle = '';
    };
    CanvasTabContainerComponent.prototype.onMouseOut = function (event) {
        event.stopPropagation();
        this.componentOverStyle = '';
    };
    CanvasTabContainerComponent.prototype.componentDragEnter = function (event) {
        event.stopPropagation();
        this.componentOverStyle = '';
    };
    CanvasTabContainerComponent.prototype.loadContextMenu = function (event) {
        this.mouseLocation.left = event.clientX;
        this.mouseLocation.top = event.clientY;
        this.showContextMenu = true;
        event.preventDefault();
        event.stopPropagation();
    };
    CanvasTabContainerComponent.prototype.getContextMenuStyle = function () {
        return {
            position: 'fixed',
            display: this.showContextMenu ? 'block' : 'none',
            left: this.mouseLocation.left + 'px',
            top: this.mouseLocation.top + 'px',
            'box-shadow': '1px 1px 2px #000000',
            width: '15%'
        };
    };
    CanvasTabContainerComponent.prototype.setSelfActive = function (event) {
        if (event != null) {
            event.stopPropagation();
            this.componentOverStyle = 'overEffect';
            this.showContextMenu = false;
            this._eventHndl.deleteComponentRef = null;
            this._eventHndl.deleteComponentRef = this.componentId;
            this._eventHndl.setAllComponentsInactive(this.componentId);
            this._eventHndl.loadComponentProperties(this.name);
        }
    };
    CanvasTabContainerComponent.prototype.onDeleteClick = function () {
        this.showContextMenu = false;
        this._eventHndl.componentIdToDel = this.componentId;
        this._eventHndl.deleteComponent();
        this._eventHndl.addEditorNewState();
    };
    return CanvasTabContainerComponent;
}(canvas_widget_class_1.CanvasWidgetClass));
__decorate([
    core_1.ViewChild('tabpill', { read: core_1.ViewContainerRef })
], CanvasTabContainerComponent.prototype, "target");
__decorate([
    core_1.HostListener('document:click')
], CanvasTabContainerComponent.prototype, "onWindowClick");
CanvasTabContainerComponent = __decorate([
    core_1.Component({
        selector: 'tab-container',
        template: "    \n    <div class=\"componentStyle\" class=\"rowstyle {{componentOverStyle}} \"\n         (click)=\"setSelfActive($event)\"\n         draggable=\"true\" [ngClass]=\"{'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}\"\n         (dragstart)=\"_eventHndl.componentElementRelocateDragBegin($event,this)\"\n         (dragover)=\"componentElementDraggedOver($event)\"\n         (dragend)=\"componentDragEnter($event)\"\n         (contextmenu)=\"loadContextMenu($event)\"\n         (drop)=\"componentElementDropped($event)\">\n\n      <div (mouseenter)=\"onMouseEnter($event)\" (dragenter)=\"componentDragEnter($event)\" (mouseout)=\"onMouseOut($event)\">\n        <tab-view  [closable]=\"properties.closable\" [tabPills]=\"tabpillCollection\">\n          <ng-template #tabpill></ng-template>\n        </tab-view>\n      </div>\n\n      <span  *ngIf=\"showContextMenu\" (click)=\"onDeleteClick()\" class=\"dropdown\"\n      [ngStyle]=\"{left: this.mouseLocation.left + 'px',top: this.mouseLocation.top + 'px',position:'fixed','box-shadow': '1px 1px 2px #000000',width: '15%'}\">\n          <ul class=\"dropdown-list\">\n            <li class=\"list-items\">\n              <span ><i class=\"fa fa-trash\" style=\"padding-right: 5px;\"></i> <b>Delete</b> </span>\n            </li>\n          </ul>\n        </span>\n\n    </div>\n  "
    })
], CanvasTabContainerComponent);
exports.CanvasTabContainerComponent = CanvasTabContainerComponent;
var SimpleTabProperties = (function () {
    function SimpleTabProperties() {
        this.isComponentValid = true;
        this.name = 'tab_' + Math.floor(Math.random() * 90000) + 10000;
        this.closable = false;
    }
    return SimpleTabProperties;
}());
exports.SimpleTabProperties = SimpleTabProperties;
