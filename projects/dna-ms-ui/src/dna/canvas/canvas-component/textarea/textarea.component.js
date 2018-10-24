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
 * Created by dattaram on 14/2/18.
 */
var core_1 = require("@angular/core");
var canvas_widget_class_1 = require("../../canvas-models/canvas.widget.class");
var forms_properties_1 = require("../../canvas-models/forms.properties");
var event_basemodel_1 = require("../../event-relationship/models/event.basemodel");
var CanvasTextAreaInputComponent = (function (_super) {
    __extends(CanvasTextAreaInputComponent, _super);
    function CanvasTextAreaInputComponent(_eventHndl, _componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this._eventHndl = _eventHndl;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this.mouseLocation = { left: 0, top: 0 };
        _this.componentBehaviour.hasModelBinding = true;
        _this.componentBehaviour.hasRelationship = true;
        _this.componentBehaviour.isBindingComponent = true;
        _this.properties = new TextAreaInputProperty();
        _this.eventRelationship = new event_basemodel_1.EventRelationBaseModel();
        return _this;
    }
    CanvasTextAreaInputComponent.prototype.ngOnInit = function () {
        this.componentId =
            +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
    };
    CanvasTextAreaInputComponent.prototype.onMouseOver = function (event) {
        event.stopPropagation();
        this.isOver = true;
    };
    CanvasTextAreaInputComponent.prototype.onMouseLeave = function (event) {
        event.stopPropagation();
        this.isOver = false;
    };
    CanvasTextAreaInputComponent.prototype.onHover = function () {
        this.showContextMenu = false;
    };
    CanvasTextAreaInputComponent.prototype.getContextMenuStyle = function () {
        return {
            position: 'fixed',
            display: this.showContextMenu ? 'block' : 'none',
            left: this.mouseLocation.left + 'px',
            top: this.mouseLocation.top + 'px',
            'box-shadow': '1px 1px 2px #000000',
            width: '15%'
        };
    };
    CanvasTextAreaInputComponent.prototype.loadContextMenu = function (event) {
        this.mouseLocation.left = event.clientX;
        this.mouseLocation.top = event.clientY;
        this.showContextMenu = true;
        event.preventDefault();
        event.stopPropagation();
        this._eventHndl.deleteComponentRef = this.componentId;
    };
    CanvasTextAreaInputComponent.prototype.onDeleteClick = function () {
        this.showContextMenu = false;
        this._eventHndl.componentIdToDel = this.componentId;
        this._eventHndl.deleteComponent();
        this._eventHndl.addEditorNewState();
    };
    CanvasTextAreaInputComponent.prototype.setSelfActive = function (event) {
        event.stopPropagation();
        this._eventHndl.deleteComponentRef = null;
        this._eventHndl.deleteComponentRef = this.componentId;
        this._eventHndl.setAllComponentsInactive(this.componentId);
        this._eventHndl.loadComponentProperties(this.name);
    };
    CanvasTextAreaInputComponent.prototype.componentElementDraggedOver = function (event) {
        event.preventDefault();
    };
    return CanvasTextAreaInputComponent;
}(canvas_widget_class_1.CanvasWidgetClass));
__decorate([
    core_1.HostListener('document:click')
], CanvasTextAreaInputComponent.prototype, "onHover");
CanvasTextAreaInputComponent = __decorate([
    core_1.Component({
        selector: 'canvas-text-area',
        template: "\n    <div (click)=\"setSelfActive($event)\" [attr.id]=\"componentId\"\n          (mouseover)=\"onMouseOver($event)\" (mouseleave)=\"onMouseLeave($event)\"\n          draggable=\"true\" [ngClass]=\"{'componentStyle':isOver,'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}\"\n    (dragstart)=\"_eventHndl.componentElementRelocateDragBegin($event,this)\"\n    (contextmenu)=\"loadContextMenu($event)\"\n    (dragover)=\"componentElementDraggedOver($event)\" #txtarea>\n      <amexio-textarea-input\n                             [field-label]=\"properties.fieldLabel\"\n                             name =\"Address\"\n                             [has-label]=\"properties.hasLabel\"\n                             [allow-blank]=\"properties.allowBlank\"\n                             [disabled]=\"properties.disabled\"\n                             [place-holder]=\"properties.placeholder\"\n                             [icon-feedback]=\"properties.iconFeedBack\"\n                             [rows]=\"properties.noOfRows\"\n                             [columns]=\"properties.noOfCols\">\n      </amexio-textarea-input>\n    </div>\n    <span  *ngIf=\"showContextMenu\" (click)=\"onDeleteClick()\" class=\"dropdown\"\n      [ngStyle]=\"{left: this.mouseLocation.left + 'px',top: this.mouseLocation.top + 'px',position:'fixed','box-shadow': '1px 1px 2px #000000',width: '15%'}\">\n          <ul class=\"dropdown-list\">\n            <li class=\"list-items\">\n              <span ><i class=\"fa fa-trash\" style=\"padding-right: 5px;\"></i> <b>Delete</b> </span>\n            </li>\n          </ul>\n        </span>\n  "
    })
], CanvasTextAreaInputComponent);
exports.CanvasTextAreaInputComponent = CanvasTextAreaInputComponent;
var TextAreaInputProperty = (function () {
    function TextAreaInputProperty() {
        this.model = new forms_properties_1.ModelClass();
        this.name = '';
        this.noOfRows = 3;
        this.noOfCols = 2;
        this.isComponentValid = false;
        this.fieldLabel = 'Text Area';
        this.placeholder = '';
        this.disabled = false;
        this.errorMsg = '';
        this.hasLabel = true;
        this.allowBlank = true;
        this.iconFeedBack = false;
        this.enablePopOver = false;
        this.fontSize = 10;
        this.fontStyle = '';
        this.fieldIcon = '';
        this.errorMsg = '';
    }
    return TextAreaInputProperty;
}());
exports.TextAreaInputProperty = TextAreaInputProperty;
