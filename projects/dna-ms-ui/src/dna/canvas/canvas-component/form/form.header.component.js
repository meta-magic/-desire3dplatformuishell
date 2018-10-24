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
 * Created by dattaram on 2/3/18.
 */
var core_1 = require("@angular/core");
var canvas_widget_class_1 = require("../../canvas-models/canvas.widget.class");
var CanvasFormHeaderComponent = (function (_super) {
    __extends(CanvasFormHeaderComponent, _super);
    function CanvasFormHeaderComponent(_eventHndl, _dragDropEventService, _componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this._eventHndl = _eventHndl;
        _this._dragDropEventService = _dragDropEventService;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this.name = 'formheader';
        _this.properties = new FormHeaderProperties();
        return _this;
    }
    CanvasFormHeaderComponent.prototype.onMouseOver = function (event) {
        event.stopPropagation();
        this.dragOverStyle = 'componentStyle';
    };
    CanvasFormHeaderComponent.prototype.onMouseLeave = function (event) {
        event.stopPropagation();
        this.dragOverStyle = '';
    };
    CanvasFormHeaderComponent.prototype.ngOnInit = function () {
        this.componentId =
            +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
    };
    CanvasFormHeaderComponent.prototype.componentElementDraggedOver = function (event) {
        this.dragOverStyle = 'drag-over-style';
        event.preventDefault();
        event.stopPropagation();
    };
    CanvasFormHeaderComponent.prototype.componentDragExit = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.dragOverStyle = '';
    };
    CanvasFormHeaderComponent.prototype.componentElementDropped = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this._dragDropEventService.componentElementDrop(this);
    };
    CanvasFormHeaderComponent.prototype.onMouseEnter = function (event) {
        event.stopPropagation();
        this.dragOverStyle = '';
    };
    CanvasFormHeaderComponent.prototype.onMouseOut = function (event) {
        event.stopPropagation();
        this.dragOverStyle = '';
    };
    CanvasFormHeaderComponent.prototype.componentDragEnter = function (event) {
        event.stopPropagation();
        this.dragOverStyle = '';
    };
    CanvasFormHeaderComponent.prototype.setSelfActive = function (event) {
        if (event != null) {
        }
    };
    CanvasFormHeaderComponent.prototype.ngOnDestroy = function () {
        this.removeDuplicateOnRelocate(this._eventHndl.viewRefs);
        this.removeFromParent(this.parentComponentRef);
    };
    CanvasFormHeaderComponent.prototype.removeDuplicateOnRelocate = function (components) {
        var _this = this;
        components.forEach(function (compRef, index) {
            if (compRef.componentId === _this.componentId) {
                components.splice(index, 1);
                return;
            }
            else {
                if (compRef.hasOwnProperty('children') && compRef.children.length > 0) {
                    _this.removeDuplicateOnRelocate(compRef.children);
                }
            }
        });
    };
    CanvasFormHeaderComponent.prototype.removeFromParent = function (parentComponentRef) {
        var _this = this;
        if (parentComponentRef != null) {
            parentComponentRef.children.forEach(function (del, index) {
                if (del.instance.componentId === _this.componentId) {
                    parentComponentRef.children.splice(index, 1);
                }
            });
        }
    };
    return CanvasFormHeaderComponent;
}(canvas_widget_class_1.CanvasWidgetClass));
__decorate([
    core_1.ViewChild('formheadertarget', { read: core_1.ViewContainerRef })
], CanvasFormHeaderComponent.prototype, "target");
CanvasFormHeaderComponent = __decorate([
    core_1.Component({
        selector: 'canvas-form-header',
        template: "\n    <div class=\"cardHeader {{dragOverStyle}} \"\n         (click)=\"setSelfActive($event)\"\n         (mouseover)=\"onMouseOver($event)\" (mouseleave)=\"onMouseLeave($event)\"\n         (dragover)=\"componentElementDraggedOver($event)\"\n         (dragleave)=\"componentDragExit($event)\"\n         (dragend)=\"componentDragExit($event)\"\n         (drop)=\"componentElementDropped($event)\">\n      <div (dragenter)=\"componentDragExit($event)\" (mouseenter)=\"onMouseEnter($event)\" (mouseout)=\"onMouseOut($event)\">\n      <ng-template #formheadertarget></ng-template>\n      </div>\n    </div>\n  ",
        styles: [
            "\n      .cardHeader {\n        min-height: 40px;\n      }\n      .card-header:hover{\n        border: 1px dotted #dddddd;\n      }\n    "
        ]
    })
], CanvasFormHeaderComponent);
exports.CanvasFormHeaderComponent = CanvasFormHeaderComponent;
var FormHeaderProperties = (function () {
    function FormHeaderProperties() {
        this.isComponentValid = true;
    }
    return FormHeaderProperties;
}());
exports.FormHeaderProperties = FormHeaderProperties;
