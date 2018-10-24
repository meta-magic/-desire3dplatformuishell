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
 * Created by dattaram on 1/3/18.
 */
var core_1 = require("@angular/core");
var canvas_widget_class_1 = require("../../canvas-models/canvas.widget.class");
var CanvasFormActionComponent = (function (_super) {
    __extends(CanvasFormActionComponent, _super);
    function CanvasFormActionComponent(_eventHndl, _dragDropEventService, _componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this._eventHndl = _eventHndl;
        _this._dragDropEventService = _dragDropEventService;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this.name = 'formaction';
        _this.properties = new FormActionProperties();
        return _this;
    }
    CanvasFormActionComponent.prototype.componentDragExit = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.dragOverStyle = '';
    };
    CanvasFormActionComponent.prototype.onMouseOver = function (event) {
        event.stopPropagation();
        this.dragOverStyle = 'componentStyle';
    };
    CanvasFormActionComponent.prototype.onMouseLeave = function (event) {
        event.stopPropagation();
        this.dragOverStyle = '';
    };
    CanvasFormActionComponent.prototype.ngOnInit = function () {
        this.componentId =
            +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
    };
    CanvasFormActionComponent.prototype.componentElementDraggedOver = function (event) {
        this.dragOverStyle = 'drag-over-style';
        event.preventDefault();
        event.stopPropagation();
    };
    CanvasFormActionComponent.prototype.componentElementDropped = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.dragOverStyle = '';
        this._dragDropEventService.componentElementDrop(this);
    };
    CanvasFormActionComponent.prototype.createComponentConfig = function () {
        if (this._eventHndl.eventType !== 'R') {
            this._eventHndl.componentClassKeyDragged = null;
            this._eventHndl.componentClassKeyDragged = 'button';
            this._dragDropEventService.componentElementDrop(this);
        }
    };
    CanvasFormActionComponent.prototype.onMouseEnter = function (event) {
        event.stopPropagation();
        this.dragOverStyle = '';
    };
    CanvasFormActionComponent.prototype.onMouseOut = function (event) {
        event.stopPropagation();
        this.dragOverStyle = '';
    };
    CanvasFormActionComponent.prototype.componentDragEnter = function (event) {
        event.stopPropagation();
        this.dragOverStyle = '';
    };
    CanvasFormActionComponent.prototype.setSelfActive = function (event) {
        if (event != null) {
        }
    };
    CanvasFormActionComponent.prototype.ngOnDestroy = function () {
        this.removeDuplicateOnRelocate(this._eventHndl.viewRefs);
        this.removeFromParent(this.parentComponentRef);
    };
    CanvasFormActionComponent.prototype.removeDuplicateOnRelocate = function (components) {
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
    CanvasFormActionComponent.prototype.removeFromParent = function (parentComponentRef) {
        var _this = this;
        if (parentComponentRef != null) {
            parentComponentRef.children.forEach(function (del, index) {
                if (del.instance.componentId === _this.componentId) {
                    parentComponentRef.children.splice(index, 1);
                }
            });
        }
    };
    return CanvasFormActionComponent;
}(canvas_widget_class_1.CanvasWidgetClass));
__decorate([
    core_1.ViewChild('formactiontarget', { read: core_1.ViewContainerRef })
], CanvasFormActionComponent.prototype, "target");
CanvasFormActionComponent = __decorate([
    core_1.Component({
        selector: 'canvas-form-action',
        template: "\n    <div  class=\"card-action {{dragOverStyle}}\"\n         (click)=\"setSelfActive($event)\"\n         (mouseover)=\"onMouseOver($event)\" (mouseleave)=\"onMouseLeave($event)\"\n         (dragover)=\"componentElementDraggedOver($event)\"\n         (dragleave)=\"componentDragExit($event)\"\n         (dragend)=\"componentDragExit($event)\"\n         (drop)=\"componentElementDropped($event)\">\n      <div (dragenter)=\"componentDragExit($event)\" (mouseout)=\"onMouseOut($event)\">\n        <div class=\"footer-style\">\n          <ng-template #formactiontarget> </ng-template>\n        </div>\n\n      </div>\n    </div>\n  ",
        styles: [
            "\n      .card-action {\n        min-height: 40px;\n        justify-content: flex-end;\n      }\n      .card-action:hover{\n        border: 1px dotted #dddddd;\n      }\n      .footer-style{\n        min-height: 40px!important;\n        display: flex!important;\n        justify-content: flex-end!important;\n      }\n    "
        ]
    })
], CanvasFormActionComponent);
exports.CanvasFormActionComponent = CanvasFormActionComponent;
var FormActionProperties = (function () {
    function FormActionProperties() {
        this.isComponentValid = true;
    }
    return FormActionProperties;
}());
exports.FormActionProperties = FormActionProperties;
