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
 * Created by dattaram on 20/2/18.
 */
var core_1 = require("@angular/core");
var canvas_widget_class_1 = require("../../canvas-models/canvas.widget.class");
var CanvasPanelComponent = (function (_super) {
    __extends(CanvasPanelComponent, _super);
    function CanvasPanelComponent(_dragDropEventService, _componentFactoryResolver, _eventHndl) {
        var _this = _super.call(this) || this;
        _this._dragDropEventService = _dragDropEventService;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this._eventHndl = _eventHndl;
        _this.mouseLocation = { left: 0, top: 0 };
        _this.properties = new PanelProperties();
        return _this;
    }
    CanvasPanelComponent.prototype.ngOnInit = function () {
        this.componentId =
            +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
    };
    CanvasPanelComponent.prototype.onMouseOver = function (event) {
        event.stopPropagation();
        this.isOver = true;
    };
    CanvasPanelComponent.prototype.onMouseLeave = function (event) {
        event.stopPropagation();
        this.isOver = false;
    };
    CanvasPanelComponent.prototype.onWindowClick = function () {
        this.showContextMenu = false;
    };
    CanvasPanelComponent.prototype.ngOnDestroy = function () { };
    CanvasPanelComponent.prototype.componentElementDraggedOver = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.isActive = false;
        this.dragOverStyle = 'drag-over-style';
    };
    CanvasPanelComponent.prototype.componentElementDropped = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.isActive = false;
        if (this._eventHndl.componentClassKeyDragged == 'row') {
            this._dragDropEventService.rowDropComponentRef = null;
            this._dragDropEventService.rowDropComponentRef = this;
            this._dragDropEventService.rowAddDialogue = true;
        }
        else {
            this._dragDropEventService.componentElementDrop(this);
        }
    };
    CanvasPanelComponent.prototype.onMouseEnter = function (event) {
        event.stopPropagation();
        this.dragOverStyle = '';
    };
    CanvasPanelComponent.prototype.onMouseOut = function (event) {
        event.stopPropagation();
        this.dragOverStyle = '';
    };
    CanvasPanelComponent.prototype.componentDragEnter = function (event) {
        event.stopPropagation();
        this.dragOverStyle = '';
    };
    CanvasPanelComponent.prototype.loadContextMenu = function (event) {
        this.mouseLocation.left = event.clientX;
        this.mouseLocation.top = event.clientY;
        this.showContextMenu = true;
        event.preventDefault();
        event.stopPropagation();
    };
    CanvasPanelComponent.prototype.getContextMenuStyle = function () {
        return {
            position: 'fixed',
            display: this.showContextMenu ? 'block' : 'none',
            left: this.mouseLocation.left + 'px',
            top: this.mouseLocation.top + 'px',
            'box-shadow': '1px 1px 2px #000000',
            width: '15%'
        };
    };
    CanvasPanelComponent.prototype.setSelfActive = function (event) {
        if (event != null) {
            event.stopPropagation();
            this.dragOverStyle = 'drag-over-style';
            this.showContextMenu = false;
            this._eventHndl.deleteComponentRef = null;
            this._eventHndl.deleteComponentRef = this.componentId;
            this._eventHndl.setAllComponentsInactive(this.componentId);
            this._eventHndl.loadComponentProperties(this.name);
        }
    };
    CanvasPanelComponent.prototype.onDeleteClick = function () {
        this.showContextMenu = false;
        this._eventHndl.componentIdToDel = this.componentId;
        this._eventHndl.deleteComponent();
        this._eventHndl.addEditorNewState();
    };
    return CanvasPanelComponent;
}(canvas_widget_class_1.CanvasWidgetClass));
__decorate([
    core_1.ViewChild('panel', { read: core_1.ViewContainerRef })
], CanvasPanelComponent.prototype, "target");
__decorate([
    core_1.HostListener('document:click')
], CanvasPanelComponent.prototype, "onWindowClick");
CanvasPanelComponent = __decorate([
    core_1.Component({
        selector: 'panel',
        template: "\n    <div  class=\"rowstyle {{dragOverStyle}}\"\n         (click)=\"setSelfActive($event)\"\n          (mouseover)=\"onMouseOver($event)\" (mouseleave)=\"onMouseLeave($event)\"\n          (dragstart)=\"_eventHndl.componentElementRelocateDragBegin($event,this)\"\n          draggable=\"true\" [ngClass]=\"{'componentStyle':isOver,'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}\"\n         (dragover)=\"componentElementDraggedOver($event)\"\n         (dragend)=\"componentDragEnter($event)\"\n         (contextmenu)=\"loadContextMenu($event)\"\n         (drop)=\"componentElementDropped($event)\">\n      <div (mouseenter)=\"onMouseEnter($event)\" (dragenter)=\"componentDragEnter($event)\" (mouseout)=\"onMouseOut($event)\">\n        <amexio-panel [header]=\"properties.header\" [title]=\"properties.title\"\n        [expanded]=\"true\">\n          <div style=\"min-height: 100px\">\n            <ng-template #panel></ng-template>\n          </div>\n\n        </amexio-panel>\n      </div>\n\n      <span  *ngIf=\"showContextMenu\" (click)=\"onDeleteClick()\" class=\"dropdown\"\n      [ngStyle]=\"{left: this.mouseLocation.left + 'px',top: this.mouseLocation.top + 'px',position:'fixed','box-shadow': '1px 1px 2px #000000',width: '15%'}\">\n          <ul class=\"dropdown-list\">\n            <li class=\"list-items\">\n              <span ><i class=\"fa fa-trash\" style=\"padding-right: 5px;\"></i> <b>Delete</b> </span>\n            </li>\n          </ul>\n        </span>\n\n    </div>\n  "
    })
], CanvasPanelComponent);
exports.CanvasPanelComponent = CanvasPanelComponent;
var PanelProperties = (function () {
    function PanelProperties() {
        this.isComponentValid = true;
        this.title = 'Panel';
        this.header = true;
        this.expanded = true;
    }
    return PanelProperties;
}());
exports.PanelProperties = PanelProperties;
