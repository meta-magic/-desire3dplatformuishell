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
var event_basemodel_1 = require("../../event-relationship/models/event.basemodel");
var ButtonFloatGroupCanvasComponent = (function (_super) {
    __extends(ButtonFloatGroupCanvasComponent, _super);
    function ButtonFloatGroupCanvasComponent(_eventHndl, _componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this._eventHndl = _eventHndl;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this.componentBehaviour.hasRelationship = true;
        _this.properties = new ButtonFloatGroupProperties();
        _this.eventRelationship = new event_basemodel_1.EventRelationBaseModel();
        _this.floatingbuttongroup = [
            { label: 'Facebook', icon: 'fa fa-facebook', type: 'warning' }
        ];
        return _this;
    }
    ButtonFloatGroupCanvasComponent.prototype.ngOnInit = function () {
        this.componentId =
            +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
    };
    ButtonFloatGroupCanvasComponent.prototype.onMouseOver = function (event) {
        event.stopPropagation();
        this.isOver = true;
    };
    ButtonFloatGroupCanvasComponent.prototype.onMouseLeave = function (event) {
        event.stopPropagation();
        this.isOver = false;
    };
    ButtonFloatGroupCanvasComponent.prototype.setSelfActive = function (event) {
        event.stopPropagation();
        this._eventHndl.deleteComponentRef = null;
        this._eventHndl.deleteComponentRef = this.componentId;
        this._eventHndl.setAllComponentsInactive(this.componentId);
        this._eventHndl.loadComponentProperties(this.name);
    };
    ButtonFloatGroupCanvasComponent.prototype.componentElementDraggedOver = function (event) {
        event.preventDefault();
    };
    ButtonFloatGroupCanvasComponent.prototype.add = function () {
        this.floatingbuttongroup.push({
            label: 'Google',
            icon: 'fa fa-google-plus',
            type: 'primary'
        });
    };
    return ButtonFloatGroupCanvasComponent;
}(canvas_widget_class_1.CanvasWidgetClass));
ButtonFloatGroupCanvasComponent = __decorate([
    core_1.Component({
        selector: 'button-float-group-canvas',
        template: "\n    <div (click)=\"setSelfActive($event)\" [attr.id]=\"componentId\"\n          (mouseover)=\"onMouseOver($event)\" (mouseleave)=\"onMouseLeave($event)\"\n          draggable=\"true\" [ngClass]=\"{'componentStyle':isOver,'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}\"\n          (dragstart)=\"_eventHndl.componentElementRelocateDragBegin($event,this)\"\n          (dragover)=\"componentElementDraggedOver($event)\" #btnfloat>\n\n      <amexio-floating-group-button [relative]=\"properties.relative\" [disabled]=\"properties.disabled\"\n                                    [vertical-position]=\"properties.verticalposition\" [position-top]=\"properties.positionTop\"\n                                    [data]=\"floatingbuttongroup\" [floating-group-position]=\"properties.floatingGroupPosition\" [position-bottom]=\"properties.positionBottom\" [position-right]=\"properties.positionRight\" [position-left]=\"properties.positionLeft\"\n                                    [icon]=\"properties.iconClass\" [type]=\"properties.type\">\n      </amexio-floating-group-button>\n    </div>\n  "
    })
], ButtonFloatGroupCanvasComponent);
exports.ButtonFloatGroupCanvasComponent = ButtonFloatGroupCanvasComponent;
var ButtonFloatGroupProperties = (function () {
    function ButtonFloatGroupProperties() {
        this.label = 'Button';
        this.type = 'theme-color';
        this.iconClass = 'fa fa-ellipsis-v';
        this.relative = true;
        // this.blockName = 'circle';
        this.disabled = false;
        this.iconClass = '';
        this.verticalPosition = 'top';
        this.horizontalPosition = 'left';
        this.positionTop = '';
        this.positionBottom = '';
        this.positionRight = '';
        this.positionLeft = '';
        this.name = '';
        this.isComponentValid = false;
        this.floatingGroupPosition = 'top';
    }
    return ButtonFloatGroupProperties;
}());
exports.ButtonFloatGroupProperties = ButtonFloatGroupProperties;
