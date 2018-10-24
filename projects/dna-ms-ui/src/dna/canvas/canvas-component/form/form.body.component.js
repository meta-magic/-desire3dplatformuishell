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
var CanvasFormBodyComponent = (function (_super) {
    __extends(CanvasFormBodyComponent, _super);
    function CanvasFormBodyComponent(_eventHndl, _dragDropEventService, _componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this._eventHndl = _eventHndl;
        _this._dragDropEventService = _dragDropEventService;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this.name = 'formbody';
        _this.properties = new FormBodyProperties();
        return _this;
    }
    CanvasFormBodyComponent.prototype.onMouseOver = function (event) {
        event.stopPropagation();
        this.dragOverStyle = 'componentStyle';
    };
    CanvasFormBodyComponent.prototype.onMouseLeave = function (event) {
        event.stopPropagation();
        this.dragOverStyle = '';
    };
    CanvasFormBodyComponent.prototype.ngOnInit = function () {
        this.componentId =
            +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
    };
    CanvasFormBodyComponent.prototype.componentDragExit = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.dragOverStyle = '';
    };
    CanvasFormBodyComponent.prototype.componentElementDraggedOver = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.dragOverStyle = 'drag-over-style';
    };
    CanvasFormBodyComponent.prototype.componentElementDropped = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.dragOverStyle = '';
        if (this._eventHndl.componentClassKeyDragged == 'row') {
            this._dragDropEventService.rowDropComponentRef = null;
            this._dragDropEventService.rowDropComponentRef = this;
            this._dragDropEventService.rowAddDialogue = true;
        }
        else {
            this._dragDropEventService.componentElementDrop(this);
        }
    };
    CanvasFormBodyComponent.prototype.setSelfActive = function (event) {
        if (event != null) {
            this._eventHndl.deleteComponentRef = null;
            this._eventHndl.deleteComponentRef = this.componentId;
            this._eventHndl.setAllComponentsInactive(this.componentId);
        }
    };
    CanvasFormBodyComponent.prototype.ngOnDestroy = function () {
        this.removeDuplicateOnRelocate(this._eventHndl.viewRefs);
        this.removeFromParent(this.parentComponentRef);
    };
    CanvasFormBodyComponent.prototype.removeDuplicateOnRelocate = function (components) {
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
    CanvasFormBodyComponent.prototype.removeFromParent = function (parentComponentRef) {
        var _this = this;
        if (parentComponentRef != null) {
            parentComponentRef.children.forEach(function (del, index) {
                if (del.instance.componentId === _this.componentId) {
                    parentComponentRef.children.splice(index, 1);
                }
            });
        }
    };
    return CanvasFormBodyComponent;
}(canvas_widget_class_1.CanvasWidgetClass));
__decorate([
    core_1.ViewChild('formbodytarget', { read: core_1.ViewContainerRef })
], CanvasFormBodyComponent.prototype, "target");
CanvasFormBodyComponent = __decorate([
    core_1.Component({
        selector: 'canvas-form-body',
        template: "\n  <div class=\"rowstyle {{dragOverStyle}} \"\n        (click)=\"setSelfActive($event)\"\n       (mouseover)=\"onMouseOver($event)\" (mouseleave)=\"onMouseLeave($event)\"\n        (dragover)=\"componentElementDraggedOver($event)\"\n        (dragleave)=\"componentDragExit($event)\"\n        (dragend)=\"componentDragExit($event)\"\n        (drop)=\"componentElementDropped($event)\">\n    <div class=\"dropable-area\"  (dragenter)=\"componentDragExit($event)\" (mouseout)=\"onMouseLeave($event)\">\n        <ng-template #formbodytarget></ng-template>\n    </div>\n\n  </div>\n  "
    })
], CanvasFormBodyComponent);
exports.CanvasFormBodyComponent = CanvasFormBodyComponent;
var FormBodyProperties = (function () {
    function FormBodyProperties() {
        this.isComponentValid = true;
    }
    return FormBodyProperties;
}());
exports.FormBodyProperties = FormBodyProperties;
