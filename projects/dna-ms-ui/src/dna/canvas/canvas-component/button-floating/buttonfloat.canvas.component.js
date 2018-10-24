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
/**
 * Created by sagar on 20/3/18.
 */
var core_2 = require("@angular/core");
var canvas_widget_class_1 = require("../../canvas-models/canvas.widget.class");
var event_basemodel_1 = require("../../event-relationship/models/event.basemodel");
var ButtonFloatCanvasComponent = (function (_super) {
    __extends(ButtonFloatCanvasComponent, _super);
    function ButtonFloatCanvasComponent(_eventHndl, _componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this._eventHndl = _eventHndl;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this.mouseLocation = { left: 0, top: 0 };
        _this.componentBehaviour.hasRelationship = true;
        _this.properties = new ButtonFloatProperties();
        _this.hiddenProperties = new HiddenProperties();
        _this.eventRelationship = new event_basemodel_1.EventRelationBaseModel();
        return _this;
    }
    ButtonFloatCanvasComponent.prototype.ngOnInit = function () {
        this.componentId =
            +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
    };
    ButtonFloatCanvasComponent.prototype.onMouseOver = function (event) {
        event.stopPropagation();
        this.isOver = true;
    };
    ButtonFloatCanvasComponent.prototype.onMouseLeave = function (event) {
        event.stopPropagation();
        this.isOver = false;
    };
    ButtonFloatCanvasComponent.prototype.onWindowClick = function () {
        this.showContextMenu = false;
    };
    ButtonFloatCanvasComponent.prototype.getContextMenuStyle = function () {
        return {
            position: 'fixed',
            display: this.showContextMenu ? 'block' : 'none',
            left: this.mouseLocation.left + 'px',
            top: this.mouseLocation.top + 'px',
            'box-shadow': '1px 1px 2px #000000',
            width: '15%'
        };
    };
    ButtonFloatCanvasComponent.prototype.loadContextMenu = function (event) {
        this.mouseLocation.left = event.clientX;
        this.mouseLocation.top = event.clientY;
        this.showContextMenu = true;
        event.preventDefault();
        event.stopPropagation();
        this._eventHndl.deleteComponentRef = this.componentId;
    };
    ButtonFloatCanvasComponent.prototype.onDeleteClick = function () {
        this.showContextMenu = false;
        this._eventHndl.componentIdToDel = this.componentId;
        this._eventHndl.deleteComponent();
        this._eventHndl.addEditorNewState();
    };
    ButtonFloatCanvasComponent.prototype.setSelfActive = function (event) {
        event.stopPropagation();
        this._eventHndl.deleteComponentRef = null;
        this._eventHndl.deleteComponentRef = this.componentId;
        this._eventHndl.setAllComponentsInactive(this.componentId);
        this._eventHndl.loadComponentProperties(this.name);
    };
    ButtonFloatCanvasComponent.prototype.componentElementDraggedOver = function (event) {
        event.preventDefault();
    };
    return ButtonFloatCanvasComponent;
}(canvas_widget_class_1.CanvasWidgetClass));
__decorate([
    core_1.HostListener('document:click')
], ButtonFloatCanvasComponent.prototype, "onWindowClick");
ButtonFloatCanvasComponent = __decorate([
    core_2.Component({
        selector: 'button-float-canvas',
        template: "\n    <div (click)=\"setSelfActive($event)\" [attr.id]=\"componentId\"\n          (mouseover)=\"onMouseOver($event)\" (mouseleave)=\"onMouseLeave($event)\"\n          draggable=\"true\" [ngClass]=\"{'componentStyle':isOver,'invalidStyleClass': !properties.isComponentValid}\"\n          (dragstart)=\"_eventHndl.componentElementRelocateDragBegin($event,this)\"\n          (contextmenu)=\"loadContextMenu($event)\"\n          (dragover)=\"componentElementDraggedOver($event)\" #btnfloat>\n\n          <amexio-floating-button\n          [type]=\"properties.type\"\n           [relative]=\"properties.relative\"\n           [icon]=\"properties.iconClass\"\n           [label]=\"properties.label\"\n           [block]=\"properties.blockName\"\n           [disabled]=\"properties.disabled\"\n\n           [horizontal-position]=\"properties.horizontalPosition\"\n           [vertical-position]=\"properties.verticalPosition\"\n\n           [position-bottom]=\"properties.positionBottom\"\n           [position-right]=\"properties.positionRight\"\n           [position-top]=\"hiddenProperties.positionTop\"\n           [position-left]=\"hiddenProperties.positionLeft\">\n           </amexio-floating-button>\n    </div>\n\n    <span  *ngIf=\"showContextMenu\" (click)=\"onDeleteClick()\" class=\"dropdown\"\n      [ngStyle]=\"{left: this.mouseLocation.left + 'px',top: this.mouseLocation.top + 'px',position:'fixed','box-shadow': '1px 1px 2px #000000',width: '15%'}\">\n          <ul class=\"dropdown-list\">\n            <li class=\"list-items\">\n              <span ><i class=\"fa fa-trash\" style=\"padding-right: 5px;\"></i> <b>Delete</b> </span>\n            </li>\n          </ul>\n        </span>\n\n  "
    })
], ButtonFloatCanvasComponent);
exports.ButtonFloatCanvasComponent = ButtonFloatCanvasComponent;
var ButtonFloatProperties = (function () {
    function ButtonFloatProperties() {
        this.label = 'Button';
        this.type = 'theme-color';
        this.relative = true;
        this.blockName = 'circle';
        this.disabled = false;
        this.iconClass = '';
        this.verticalPosition = 'top';
        this.horizontalPosition = 'left';
        this.positionTop = 0;
        this.positionBottom = '';
        this.positionRight = '';
        this.positionLeft = 0;
        this.name = '';
        this.isComponentValid = false;
    }
    return ButtonFloatProperties;
}());
exports.ButtonFloatProperties = ButtonFloatProperties;
var HiddenProperties = (function () {
    function HiddenProperties() {
        this.positionLeft = '0%';
        this.positionTop = '0%';
    }
    return HiddenProperties;
}());
exports.HiddenProperties = HiddenProperties;
