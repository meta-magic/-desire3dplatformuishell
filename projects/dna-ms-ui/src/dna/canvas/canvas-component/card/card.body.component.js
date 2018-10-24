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
var CanvasCardBodyComponent = (function (_super) {
    __extends(CanvasCardBodyComponent, _super);
    function CanvasCardBodyComponent(_eventHndl, _dragDropEventService, _componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this._eventHndl = _eventHndl;
        _this._dragDropEventService = _dragDropEventService;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this.name = 'cardbody';
        _this.isComponent = false;
        _this.properties = new CardBodyProperties();
        return _this;
    }
    CanvasCardBodyComponent.prototype.onMouseOver = function (event) {
        event.stopPropagation();
        this.dragOverStyle = 'componentStyle';
    };
    CanvasCardBodyComponent.prototype.onMouseLeave = function (event) {
        event.stopPropagation();
        this.dragOverStyle = '';
    };
    CanvasCardBodyComponent.prototype.ngOnInit = function () {
        this.componentId =
            +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
    };
    CanvasCardBodyComponent.prototype.componentDragExit = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.dragOverStyle = '';
    };
    CanvasCardBodyComponent.prototype.componentElementDraggedOver = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.dragOverStyle = 'drag-over-style';
    };
    CanvasCardBodyComponent.prototype.componentElementDropped = function (event) {
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
    CanvasCardBodyComponent.prototype.setSelfActive = function (event) {
        if (event != null) {
            this._eventHndl.deleteComponentRef = null;
            this._eventHndl.deleteComponentRef = this.componentId;
            this._eventHndl.setAllComponentsInactive(this.componentId);
        }
    };
    CanvasCardBodyComponent.prototype.ngOnDestroy = function () {
        this.removeDuplicateOnRelocate(this._eventHndl.viewRefs);
        this.removeFromParent(this.parentComponentRef);
    };
    CanvasCardBodyComponent.prototype.removeDuplicateOnRelocate = function (components) {
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
    CanvasCardBodyComponent.prototype.removeFromParent = function (parentComponentRef) {
        var _this = this;
        if (parentComponentRef != null) {
            parentComponentRef.children.forEach(function (del, index) {
                if (del.instance.componentId === _this.componentId) {
                    parentComponentRef.children.splice(index, 1);
                }
            });
        }
    };
    return CanvasCardBodyComponent;
}(canvas_widget_class_1.CanvasWidgetClass));
__decorate([
    core_1.ViewChild('cardbodytarget', { read: core_1.ViewContainerRef })
], CanvasCardBodyComponent.prototype, "target");
CanvasCardBodyComponent = __decorate([
    core_1.Component({
        selector: 'canvas-card-body',
        template: "\n  <div class=\"rowstyle {{dragOverStyle}} \"\n        (click)=\"setSelfActive($event)\"\n       (mouseover)=\"onMouseOver($event)\" (mouseleave)=\"onMouseLeave($event)\"\n        (dragover)=\"componentElementDraggedOver($event)\"\n        (dragleave)=\"componentDragExit($event)\"\n        (dragend)=\"componentDragExit($event)\"\n        (drop)=\"componentElementDropped($event)\">\n    <div class=\"dropable-area\"  (dragenter)=\"componentDragExit($event)\" (mouseout)=\"onMouseLeave($event)\">\n        <ng-template #cardbodytarget></ng-template>\n    </div>\n\n  </div>\n  "
    })
], CanvasCardBodyComponent);
exports.CanvasCardBodyComponent = CanvasCardBodyComponent;
var CardBodyProperties = (function () {
    function CardBodyProperties() {
        this.isComponentValid = true;
    }
    return CardBodyProperties;
}());
exports.CardBodyProperties = CardBodyProperties;
