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
 * Created by dattaram on 8/5/18.
 */
var core_1 = require("@angular/core");
var canvas_widget_class_1 = require("../../canvas-models/canvas.widget.class");
var BoxComponent = (function (_super) {
    __extends(BoxComponent, _super);
    function BoxComponent(_dragDropEventService, _componentFactoryResolver, _eventHndl) {
        var _this = _super.call(this) || this;
        _this._dragDropEventService = _dragDropEventService;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this._eventHndl = _eventHndl;
        _this.mouseLocation = { left: 0, top: 0 };
        _this.properties = new BoxProperties();
        return _this;
    }
    BoxComponent.prototype.ngOnInit = function () {
        this.componentId =
            +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
    };
    BoxComponent.prototype.onMouseOver = function (event) {
        event.stopPropagation();
        this.isOver = true;
    };
    BoxComponent.prototype.onMouseLeave = function (event) {
        event.stopPropagation();
        this.isOver = false;
    };
    BoxComponent.prototype.onWindowClick = function () {
        this.showContextMenu = false;
    };
    BoxComponent.prototype.ngOnDestroy = function () { };
    BoxComponent.prototype.componentElementDraggedOver = function (event) {
        this.componentOverStyle = 'overEffect';
        event.preventDefault();
        event.stopPropagation();
    };
    BoxComponent.prototype.componentElementDropped = function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (this._eventHndl.componentClassKeyDragged == 'row') {
            this._dragDropEventService.rowDropComponentRef = null;
            this._dragDropEventService.rowDropComponentRef = this;
            this._dragDropEventService.rowAddDialogue = true;
        }
        else {
            this._dragDropEventService.componentElementDrop(this);
        }
    };
    BoxComponent.prototype.onMouseEnter = function (event) {
        event.stopPropagation();
        this.componentOverStyle = '';
    };
    BoxComponent.prototype.onMouseOut = function (event) {
        event.stopPropagation();
        this.componentOverStyle = '';
    };
    BoxComponent.prototype.componentDragEnter = function (event) {
        event.stopPropagation();
        this.componentOverStyle = '';
    };
    BoxComponent.prototype.loadContextMenu = function (event) {
        this.mouseLocation.left = event.clientX;
        this.mouseLocation.top = event.clientY;
        this.showContextMenu = true;
        event.preventDefault();
        event.stopPropagation();
    };
    BoxComponent.prototype.getContextMenuStyle = function () {
        return {
            position: 'fixed',
            display: this.showContextMenu ? 'block' : 'none',
            left: this.mouseLocation.left + 'px',
            top: this.mouseLocation.top + 'px',
            'box-shadow': '1px 1px 2px #000000',
            width: '15%'
        };
    };
    BoxComponent.prototype.setSelfActive = function (event) {
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
    BoxComponent.prototype.onDeleteClick = function () {
        this.showContextMenu = false;
        this._eventHndl.componentIdToDel = this.componentId;
        this._eventHndl.deleteComponent();
        this._eventHndl.addEditorNewState();
    };
    return BoxComponent;
}(canvas_widget_class_1.CanvasWidgetClass));
__decorate([
    core_1.ViewChild('boxEl', { read: core_1.ViewContainerRef })
], BoxComponent.prototype, "target");
__decorate([
    core_1.HostListener('document:click')
], BoxComponent.prototype, "onWindowClick");
BoxComponent = __decorate([
    core_1.Component({
        selector: 'box',
        template: "\n  <div (click)=\"setSelfActive($event)\"\n         (dragover)=\"componentElementDraggedOver($event)\"\n         (mouseover)=\"onMouseOver($event)\" (mouseleave)=\"onMouseLeave($event)\"\n         (dragend)=\"componentDragEnter($event)\"\n         (dragstart)=\"_eventHndl.componentElementRelocateDragBegin($event,this)\"\n         draggable=\"true\" [ngClass]=\"{'componentStyle':isOver,'componentSelectStyle':isActive}\"\n         (contextmenu)=\"loadContextMenu($event)\"\n         (drop)=\"componentElementDropped($event)\">\n      <div (mouseenter)=\"onMouseEnter($event)\" (dragenter)=\"componentDragEnter($event)\" (mouseout)=\"onMouseOut($event)\">\n        <amexio-box [border-color] =\"properties.borderColor\" [border]=\"properties.border\"\n        [padding]=\"properties.padding\" [background-color]=\"properties.backgroundColor\"\n        [box-height]=\"properties.boxHeight\" [box-width]=\"properties.boxWidth\">\n          <ng-template #boxEl></ng-template>\n       </amexio-box>\n      </div>\n\n      <span  *ngIf=\"showContextMenu\" (click)=\"onDeleteClick()\" class=\"dropdown\"\n      [ngStyle]=\"{left: this.mouseLocation.left + 'px',top: this.mouseLocation.top + 'px',position:'fixed','box-shadow': '1px 1px 2px #000000',width: '15%'}\">\n          <ul class=\"dropdown-list\">\n            <li class=\"list-items\">\n              <span ><i class=\"fa fa-trash\" style=\"padding-right: 5px;\"></i> <b>Delete</b> </span>\n            </li>\n          </ul>\n        </span>\n    </div>\n  "
    })
], BoxComponent);
exports.BoxComponent = BoxComponent;
var BoxProperties = (function () {
    function BoxProperties() {
        this.name = 'box_' + Math.floor(Math.random() * 90000) + 10000;
        this.isComponentValid = true;
        this.borderColor = '';
        this.border = '';
        this.backgroundColor = '';
        this.padding = true;
        this.boxHeight = '';
        this.boxWidth = '';
    }
    return BoxProperties;
}());
exports.BoxProperties = BoxProperties;
