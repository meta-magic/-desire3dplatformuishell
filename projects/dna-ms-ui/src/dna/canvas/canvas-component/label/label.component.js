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
 * Created by pratik on 23/2/18.
 */
var core_1 = require("@angular/core");
var canvas_widget_class_1 = require("../../canvas-models/canvas.widget.class");
var LabelComponent = (function (_super) {
    __extends(LabelComponent, _super);
    function LabelComponent(_eventHndl, _componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this._eventHndl = _eventHndl;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this.mouseLocation = { left: 0, top: 0 };
        _this.componentBehaviour.hasRelationship = true;
        _this.properties = new LabelComponentProperty();
        return _this;
    }
    LabelComponent.prototype.ngOnInit = function () {
        this.componentId =
            +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
    };
    LabelComponent.prototype.onWindowClick = function () {
        this.showContextMenu = false;
    };
    LabelComponent.prototype.getContextMenuStyle = function () {
        return {
            position: 'fixed',
            display: this.showContextMenu ? 'block' : 'none',
            left: this.mouseLocation.left + 'px',
            top: this.mouseLocation.top + 'px',
            'box-shadow': '1px 1px 2px #000000',
            width: '15%'
        };
    };
    LabelComponent.prototype.loadContextMenu = function (event) {
        this.mouseLocation.left = event.clientX;
        this.mouseLocation.top = event.clientY;
        this.showContextMenu = true;
        event.preventDefault();
        event.stopPropagation();
        this._eventHndl.deleteComponentRef = this.componentId;
    };
    LabelComponent.prototype.onDeleteClick = function () {
        this.showContextMenu = false;
        this._eventHndl.componentIdToDel = this.componentId;
        this._eventHndl.deleteComponent();
        this._eventHndl.addEditorNewState();
    };
    LabelComponent.prototype.setSelfActive = function (event) {
        event.stopPropagation();
        this._eventHndl.deleteComponentRef = null;
        this._eventHndl.deleteComponentRef = this.componentId;
        this._eventHndl.setAllComponentsInactive(this.componentId);
        this._eventHndl.loadComponentProperties(this.name);
    };
    LabelComponent.prototype.onMouseOver = function (event) {
        event.stopPropagation();
        this.isOver = true;
    };
    LabelComponent.prototype.onMouseLeave = function (event) {
        event.stopPropagation();
        this.isOver = false;
    };
    LabelComponent.prototype.componentElementDraggedOver = function (event) {
        event.preventDefault();
    };
    return LabelComponent;
}(canvas_widget_class_1.CanvasWidgetClass));
__decorate([
    core_1.HostListener('document:click')
], LabelComponent.prototype, "onWindowClick");
LabelComponent = __decorate([
    core_1.Component({
        selector: 'label-component',
        template: "\n   <div (click)=\"setSelfActive($event)\" [attr.id]=\"componentId\"\n        (mouseover)=\"onMouseOver($event)\" (mouseleave)=\"onMouseLeave($event)\"\n        draggable=\"true\" [ngClass]=\"{'componentStyle':isOver,'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}\"\n         style=\"display: inline-block;\"\n         draggable=\"true\"\n         (dragstart)=\"_eventHndl.componentElementRelocateDragBegin($event,this)\"\n         (contextmenu)=\"loadContextMenu($event)\"\n         (dragover)=\"componentElementDraggedOver($event)\" #txtField>\n     <amexio-label [size]=\"properties.size\" [font-color]=\"properties.color\">{{properties.fieldLabel}}</amexio-label>\n   </div>\n   <span  *ngIf=\"showContextMenu\" (click)=\"onDeleteClick()\" class=\"dropdown\"\n      [ngStyle]=\"{left: this.mouseLocation.left + 'px',top: this.mouseLocation.top + 'px',position:'fixed','box-shadow': '1px 1px 2px #000000',width: '15%'}\">\n          <ul class=\"dropdown-list\">\n            <li class=\"list-items\">\n              <span ><i class=\"fa fa-trash\" style=\"padding-right: 5px;\"></i> <b>Delete</b> </span>\n            </li>\n          </ul>\n        </span>\n\n "
    })
], LabelComponent);
exports.LabelComponent = LabelComponent;
var LabelComponentProperty = (function () {
    function LabelComponentProperty() {
        /*temporary use*/
        this.name = 'label_' + Math.floor(Math.random() * 90000) + 10000;
        this.isComponentValid = true;
        this.fieldLabel = 'Label';
        this.disabled = false;
        this.allowBlank = true;
        this.size = 'small';
        this.color = 'black';
    }
    return LabelComponentProperty;
}());
exports.LabelComponentProperty = LabelComponentProperty;
