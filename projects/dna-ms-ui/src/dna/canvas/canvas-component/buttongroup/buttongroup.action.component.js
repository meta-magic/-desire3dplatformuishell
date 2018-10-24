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
 * Created by dattaram on 27/10/17.
 */
var core_1 = require("@angular/core");
var canvas_widget_class_1 = require("../../canvas-models/canvas.widget.class");
var CanvasButtonGroupActionComponent = (function (_super) {
    __extends(CanvasButtonGroupActionComponent, _super);
    function CanvasButtonGroupActionComponent(eventHndl, _componentFactoryResolver, viewContainerRef) {
        var _this = _super.call(this) || this;
        _this.eventHndl = eventHndl;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this.viewContainerRef = viewContainerRef;
        _this.name = 'buttongroupaction';
        _this.componentBehaviour.hasRelationship = true;
        _this.properties = new ButtonGroupActionProperties();
        return _this;
    }
    CanvasButtonGroupActionComponent.prototype.ngOnInit = function () {
        this.componentId =
            +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
    };
    CanvasButtonGroupActionComponent.prototype.ngOnDestroy = function () { };
    return CanvasButtonGroupActionComponent;
}(canvas_widget_class_1.CanvasWidgetClass));
CanvasButtonGroupActionComponent = __decorate([
    core_1.Component({
        selector: '[action1]',
        template: ""
    })
], CanvasButtonGroupActionComponent);
exports.CanvasButtonGroupActionComponent = CanvasButtonGroupActionComponent;
var ButtonGroupActionProperties = (function () {
    function ButtonGroupActionProperties() {
        this.isComponentValid = false;
        this.name = '';
        this.label = 'Item ';
        this.disabled = false;
        this.icon = '';
        this.type = 'primary';
        this.tooltip = 'button';
        this.iconClass = '';
    }
    return ButtonGroupActionProperties;
}());
exports.ButtonGroupActionProperties = ButtonGroupActionProperties;
