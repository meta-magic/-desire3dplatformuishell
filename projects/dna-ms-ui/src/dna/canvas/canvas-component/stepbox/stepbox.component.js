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
 * Created by dattaram on 5/3/18.
 */
var core_1 = require("@angular/core");
var canvas_widget_class_1 = require("../../canvas-models/canvas.widget.class");
var CanvasStepBoxComponent = (function (_super) {
    __extends(CanvasStepBoxComponent, _super);
    function CanvasStepBoxComponent(_dragDropEventService, _eventHndl, _componentFactoryResolver, viewContainerRef) {
        var _this = _super.call(this) || this;
        _this._dragDropEventService = _dragDropEventService;
        _this._eventHndl = _eventHndl;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this.viewContainerRef = viewContainerRef;
        _this.mouseLocation = { left: 0, top: 0 };
        _this.properties = new StepBoxProperties();
        _this.target = _this.viewContainerRef;
        _this.showBlockProperties = false;
        return _this;
    }
    CanvasStepBoxComponent.prototype.ngOnInit = function () {
        this.componentId =
            +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
    };
    CanvasStepBoxComponent.prototype.onMouseOver = function (event) {
        event.stopPropagation();
        this.isOver = true;
    };
    CanvasStepBoxComponent.prototype.onMouseLeave = function (event) {
        event.stopPropagation();
        this.isOver = false;
    };
    CanvasStepBoxComponent.prototype.onHover = function () {
        this.showContextMenu = false;
    };
    CanvasStepBoxComponent.prototype.getContextMenuStyle = function () {
        return {
            position: 'fixed',
            display: this.showContextMenu ? 'block' : 'none',
            left: this.mouseLocation.left + 'px',
            top: this.mouseLocation.top + 'px',
            'box-shadow': '1px 1px 2px #000000',
            width: '15%'
        };
    };
    CanvasStepBoxComponent.prototype.loadContextMenu = function (event) {
        this.mouseLocation.left = event.clientX;
        this.mouseLocation.top = event.clientY;
        this.showContextMenu = true;
        event.preventDefault();
        event.stopPropagation();
        this._eventHndl.deleteComponentRef = this.componentId;
    };
    CanvasStepBoxComponent.prototype.onDeleteClick = function () {
        this.showContextMenu = false;
        this._eventHndl.componentIdToDel = this.componentId;
        this._eventHndl.deleteComponent();
        this._eventHndl.addEditorNewState();
    };
    CanvasStepBoxComponent.prototype.setSelfActive = function (event) {
        event.stopPropagation();
        this.showBlockProperties = false;
        this._eventHndl.deleteComponentRef = null;
        this._eventHndl.deleteComponentRef = this.componentId;
        this._eventHndl.setAllComponentsInactive(this.componentId);
        this._eventHndl.loadComponentProperties(this.name);
    };
    CanvasStepBoxComponent.prototype.componentElementDraggedOver = function (event) {
        event.preventDefault();
    };
    CanvasStepBoxComponent.prototype.createComponentConfig = function () {
        if (this._eventHndl.eventType !== 'R') {
            this._eventHndl.componentClassKeyDragged = null;
            this._eventHndl.componentClassKeyDragged = 'stepboxblock';
            this._dragDropEventService.componentElementDrop(this);
        }
        this.createLocalData();
        this._eventHndl.deleteComponentRef = null;
        this._eventHndl.deleteComponentRef = this.componentId;
        this._eventHndl.setAllComponentsInactive(this.componentId);
        this._eventHndl.loadComponentProperties(this.name);
    };
    CanvasStepBoxComponent.prototype.getBlockData = function (data) {
        data.event.stopPropagation();
        this._eventHndl.loadComponentProperties(this.name);
        this.showBlockProperties = true;
        this.blockPropertyObject = data.data;
    };
    /* DONT REMOVE createLocalData FUNTION IT WILL BREAK STEPBOX OPEN CASE */
    CanvasStepBoxComponent.prototype.createLocalData = function () {
        var _this = this;
        this.localData = [];
        this.children.forEach(function (child) {
            _this.localData.push(child.instance.properties);
        });
    };
    return CanvasStepBoxComponent;
}(canvas_widget_class_1.CanvasWidgetClass));
__decorate([
    core_1.HostListener('document:click')
], CanvasStepBoxComponent.prototype, "onHover");
CanvasStepBoxComponent = __decorate([
    core_1.Component({
        selector: 'canvas-step-box',
        template: "\n    <div (click)=\"setSelfActive($event)\" [attr.id]=\"componentId\"\n          (mouseover)=\"onMouseOver($event)\" (mouseleave)=\"onMouseLeave($event)\"\n          draggable=\"true\" [ngClass]=\"{'componentStyle':isOver,'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}\"\n          (dragstart)=\"_eventHndl.componentElementRelocateDragBegin($event,this)\"\n          (contextmenu)=\"loadContextMenu($event)\"\n          (dragover)=\"componentElementDraggedOver($event)\" #stepbox>\n      <div class=\"dropable-area\">\n\n        <amexio-steps [data]=\"localData\" [block]=\"properties.block\" [index]=\"properties.index\" [icon]=\"properties.icon\" (getStepBlockData)=\"getBlockData($event)\">\n        </amexio-steps>\n      </div>\n     <!-- <amexio-steps [icon]=\"true\" [block]=\"true\">\n        <amexio-step-block [label]=\"'User'\"\n                           [active]=\"true\"\n                           [icon]=\"'fa fa-user'\" >\n        </amexio-step-block>\n        <amexio-step-block [label]=\"'Address'\"\n                           [active]=\"false\"\n                           [icon]=\"'fa fa-address-card'\">\n        </amexio-step-block>\n        <amexio-step-block [label]=\"'Shop'\"\n                           [active]=\"false\"\n                           [icon]=\"'fa fa-shopping-cart'\">\n        </amexio-step-block>\n        <amexio-step-block [label]=\"'Payment'\"\n                           [active]=\"false\"\n                           [icon]=\"'fa fa-cc-visa'\">\n        </amexio-step-block>\n      </amexio-steps>-->\n\n\n    </div>\n    <span  *ngIf=\"showContextMenu\" (click)=\"onDeleteClick()\" class=\"dropdown\"\n      [ngStyle]=\"{left: this.mouseLocation.left + 'px',top: this.mouseLocation.top + 'px',position:'fixed','box-shadow': '1px 1px 2px #000000',width: '15%'}\">\n          <ul class=\"dropdown-list\">\n            <li class=\"list-items\">\n              <span ><i class=\"fa fa-trash\" style=\"padding-right: 5px;\"></i> <b>Delete</b> </span>\n            </li>\n          </ul>\n        </span>\n  "
    })
], CanvasStepBoxComponent);
exports.CanvasStepBoxComponent = CanvasStepBoxComponent;
var StepBoxProperties = (function () {
    function StepBoxProperties() {
        this.name = '';
        this.isComponentValid = false;
        this.block = true;
        this.index = false;
        this.icon = false;
    }
    return StepBoxProperties;
}());
exports.StepBoxProperties = StepBoxProperties;
