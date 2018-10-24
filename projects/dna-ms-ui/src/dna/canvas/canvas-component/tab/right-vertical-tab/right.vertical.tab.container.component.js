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
 * Created by dattaram on 6/3/18.
 */
var core_1 = require("@angular/core");
var canvas_widget_class_1 = require("../../../canvas-models/canvas.widget.class");
var CanvasVerticalRightTabComponent = (function (_super) {
    __extends(CanvasVerticalRightTabComponent, _super);
    function CanvasVerticalRightTabComponent(_dragDropEventService, _componentFactoryResolver, _eventHndl) {
        var _this = _super.call(this) || this;
        _this._dragDropEventService = _dragDropEventService;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this._eventHndl = _eventHndl;
        _this.tabpillCollection = [];
        _this.mouseLocation = { left: 0, top: 0 };
        _this.properties = new VerticalRightTabProperties();
        return _this;
    }
    CanvasVerticalRightTabComponent.prototype.ngOnInit = function () {
        this.componentId =
            +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
    };
    CanvasVerticalRightTabComponent.prototype.onHover = function () {
        this.showContextMenu = false;
    };
    CanvasVerticalRightTabComponent.prototype.getContextMenuStyle = function () {
        return {
            position: 'fixed',
            display: this.showContextMenu ? 'block' : 'none',
            left: this.mouseLocation.left + 'px',
            top: this.mouseLocation.top + 'px',
            'box-shadow': '1px 1px 2px #000000',
            width: '15%'
        };
    };
    CanvasVerticalRightTabComponent.prototype.loadContextMenu = function (event) {
        this.mouseLocation.left = event.clientX;
        this.mouseLocation.top = event.clientY;
        this.showContextMenu = true;
        event.preventDefault();
        event.stopPropagation();
        this._eventHndl.deleteComponentRef = this.componentId;
    };
    CanvasVerticalRightTabComponent.prototype.onDeleteClick = function () {
        this.showContextMenu = false;
        this._eventHndl.componentIdToDel = this.componentId;
        this._eventHndl.deleteComponent();
        this._eventHndl.addEditorNewState();
    };
    CanvasVerticalRightTabComponent.prototype.ngOnDestroy = function () { };
    CanvasVerticalRightTabComponent.prototype.componentElementDraggedOver = function (event) {
        this.componentOverStyle = 'overEffect';
        event.preventDefault();
        event.stopPropagation();
    };
    CanvasVerticalRightTabComponent.prototype.setSelfActive = function (event) {
        if (event != null) {
            this.componentOverStyle = 'overEffect';
            event.stopPropagation();
            this._eventHndl.deleteComponentRef = null;
            this._eventHndl.deleteComponentRef = this.componentId;
            this._eventHndl.setAllComponentsInactive(this.componentId);
            this._eventHndl.loadComponentProperties(this.name);
        }
    };
    CanvasVerticalRightTabComponent.prototype.createComponentConfig = function () {
        if (this._eventHndl.eventType !== 'R') {
            this._eventHndl.componentClassKeyDragged = null;
            this._eventHndl.componentClassKeyDragged = 'tabpill';
            this._dragDropEventService.componentElementDrop(this);
        }
        this._eventHndl.loadComponentProperties(this.name);
        this.createLocalData();
    };
    CanvasVerticalRightTabComponent.prototype.createLocalData = function () {
        var _this = this;
        this.tabpillCollection = [];
        this.children.forEach(function (child, index) {
            child.instance.title = child.instance.properties.title;
            child.instance.iconClass = child.instance.properties.iconClass;
            child.instance.parentComponentRef = _this;
            if (index == 0) {
                child.instance.active = true;
            }
            else {
                child.instance.active = false;
            }
            child.changeDetectorRef.detectChanges();
            _this.tabpillCollection.push(child.instance);
        });
    };
    CanvasVerticalRightTabComponent.prototype.componentElementDropped = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this._dragDropEventService.componentElementDrop(this);
    };
    CanvasVerticalRightTabComponent.prototype.onMouseEnter = function (event) {
        event.stopPropagation();
        this.componentOverStyle = '';
    };
    CanvasVerticalRightTabComponent.prototype.onMouseOut = function (event) {
        event.stopPropagation();
        this.componentOverStyle = '';
    };
    CanvasVerticalRightTabComponent.prototype.componentDragEnter = function (event) {
        event.stopPropagation();
        this.componentOverStyle = '';
    };
    return CanvasVerticalRightTabComponent;
}(canvas_widget_class_1.CanvasWidgetClass));
__decorate([
    core_1.ViewChild('tabpill', { read: core_1.ViewContainerRef })
], CanvasVerticalRightTabComponent.prototype, "target");
__decorate([
    core_1.HostListener('document:click')
], CanvasVerticalRightTabComponent.prototype, "onHover");
CanvasVerticalRightTabComponent = __decorate([
    core_1.Component({
        selector: 'right-canvas-vertical-tab',
        template: "\n    <div class=\"rowstyle {{componentOverStyle}} \"\n       (click)=\"setSelfActive($event)\"\n         draggable=\"true\" [ngClass]=\"{'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}\"\n         (dragstart)=\"_eventHndl.componentElementRelocateDragBegin($event,this)\"\n         (dragover)=\"componentElementDraggedOver($event)\"\n         (dragend)=\"componentDragEnter($event)\"\n         (contextmenu)=\"loadContextMenu($event)\"\n         (drop)=\"componentElementDropped($event)\">\n\n      <div (mouseenter)=\"onMouseEnter($event)\" (dragenter)=\"componentDragEnter($event)\" (mouseout)=\"onMouseOut($event)\">\n        <vertical-right-tab-view  [closable]=\"properties.closable\" [tabPills]=\"tabpillCollection\">\n          <ng-template #tabpill></ng-template>\n        </vertical-right-tab-view>\n      </div>\n\n      <span  *ngIf=\"showContextMenu\" (click)=\"onDeleteClick()\" class=\"dropdown\"\n      [ngStyle]=\"{left: this.mouseLocation.left + 'px',top: this.mouseLocation.top + 'px',position:'fixed','box-shadow': '1px 1px 2px #000000',width: '15%'}\">\n          <ul class=\"dropdown-list\">\n            <li class=\"list-items\">\n              <span ><i class=\"fa fa-trash\" style=\"padding-right: 5px;\"></i> <b>Delete</b> </span>\n            </li>\n          </ul>\n        </span>\n\n    </div>\n  "
    })
], CanvasVerticalRightTabComponent);
exports.CanvasVerticalRightTabComponent = CanvasVerticalRightTabComponent;
var VerticalRightTabProperties = (function () {
    function VerticalRightTabProperties() {
        this.isComponentValid = true;
        this.name = '';
    }
    return VerticalRightTabProperties;
}());
exports.VerticalRightTabProperties = VerticalRightTabProperties;
