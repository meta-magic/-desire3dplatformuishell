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
var CanvasTextInputComponent = (function (_super) {
    __extends(CanvasTextInputComponent, _super);
    function CanvasTextInputComponent(_eventHndl, _componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this._eventHndl = _eventHndl;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this.mouseLocation = { left: 0, top: 0 };
        _this.componentBehaviour.hasModelBinding = true;
        _this.componentBehaviour.hasRelationship = true;
        _this.componentBehaviour.isBindingComponent = true;
        _this.properties = new TextInputProperty();
        _this.eventRelationship = new event_basemodel_1.EventRelationBaseModel();
        return _this;
    }
    CanvasTextInputComponent.prototype.ngOnInit = function () {
        this.componentId =
            +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
    };
    CanvasTextInputComponent.prototype.onWindowClick = function () {
        this.showContextMenu = false;
    };
    CanvasTextInputComponent.prototype.getContextMenuStyle = function () {
        return {
            position: 'fixed',
            display: this.showContextMenu ? 'block' : 'none',
            left: this.mouseLocation.left + 'px',
            top: this.mouseLocation.top + 'px',
            'box-shadow': '1px 1px 2px #000000',
            width: '15%'
        };
    };
    CanvasTextInputComponent.prototype.loadContextMenu = function (event) {
        this.mouseLocation.left = event.clientX;
        this.mouseLocation.top = event.clientY;
        this.showContextMenu = true;
        event.preventDefault();
        event.stopPropagation();
        this._eventHndl.deleteComponentRef = this.componentId;
    };
    CanvasTextInputComponent.prototype.onDeleteClick = function () {
        this.showContextMenu = false;
        this._eventHndl.componentIdToDel = this.componentId;
        this._eventHndl.deleteComponent();
        this._eventHndl.addEditorNewState();
    };
    CanvasTextInputComponent.prototype.setSelfActive = function (event) {
        event.stopPropagation();
        this._eventHndl.deleteComponentRef = null;
        this._eventHndl.deleteComponentRef = this.componentId;
        this._eventHndl.setAllComponentsInactive(this.componentId);
        this._eventHndl.loadComponentProperties(this.name);
    };
    CanvasTextInputComponent.prototype.onMouseOver = function (event) {
        event.stopPropagation();
        this.isOver = true;
    };
    CanvasTextInputComponent.prototype.onMouseLeave = function (event) {
        event.stopPropagation();
        this.isOver = false;
    };
    CanvasTextInputComponent.prototype.componentElementDraggedOver = function (event) {
        event.preventDefault();
    };
    return CanvasTextInputComponent;
}(canvas_widget_class_1.CanvasWidgetClass));
__decorate([
    core_1.HostListener('document:click')
], CanvasTextInputComponent.prototype, "onWindowClick");
CanvasTextInputComponent = __decorate([
    core_1.Component({
        selector: 'canvas-text-input',
        template: "\n    <div (click)=\"setSelfActive($event)\" [attr.id]=\"componentId\" \n         (mouseover)=\"onMouseOver($event)\" (mouseleave)=\"onMouseLeave($event)\"\n         draggable=\"true\" [ngClass]=\"{'componentStyle':isOver,'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}\"\n          (dragstart)=\"_eventHndl.componentElementRelocateDragBegin($event,this)\"\n    (dragover)=\"componentElementDraggedOver($event)\"\n          (contextmenu)=\"loadContextMenu($event)\">\n      <div>\n      <amexio-text-input [field-label]=\"properties.fieldLabel\"\n                         name=\"name\"\n                         [has-label]=\"properties.hasLabel\"\n                         [place-holder]=\"properties.placeholder\"\n                         [icon-feedback]=\"properties.iconFeedBack\">\n      </amexio-text-input>\n      </div>\n    </div>\n\n    <span  *ngIf=\"showContextMenu\" (click)=\"onDeleteClick()\" class=\"dropdown\"\n    [ngStyle]=\"{left: this.mouseLocation.left + 'px',top: this.mouseLocation.top + 'px',position:'fixed','box-shadow': '1px 1px 2px #000000',width: '15%'}\">\n        <ul class=\"dropdown-list\">\n          <li class=\"list-items\">\n            <span ><i class=\"fa fa-trash\" style=\"padding-right: 5px;\"></i> <b>Delete</b> </span>\n          </li>\n        </ul>\n      </span>\n  "
    })
], CanvasTextInputComponent);
exports.CanvasTextInputComponent = CanvasTextInputComponent;
var TextInputProperty = (function () {
    function TextInputProperty() {
        /*temporary use*/
        this.model = new forms_properties_1.ModelClass();
        this.name = '';
        this.isComponentValid = false;
        this.fieldLabel = 'text input';
        this.placeholder = '';
        this.disabled = false;
        this.errorMsg = '';
        this.hasLabel = true;
        this.maxLength = 20;
        this.minLength = 0;
        this.maxErrorMsg = '';
        this.minErrorMsg = '';
        this.allowBlank = true;
        this.iconFeedBack = false;
        this.enablePopOver = false;
        this.fontSize = 10;
        this.fontStyle = '';
        this.fieldIcon = '';
        this.popoverPlacement = '';
        this.pattern = '';
        this.fontFamily = '';
    }
    return TextInputProperty;
}());
exports.TextInputProperty = TextInputProperty;
