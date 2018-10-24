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
 * Created by dattaram on 20/2/18.
 */
var core_1 = require("@angular/core");
var canvas_widget_class_1 = require("../../canvas-models/canvas.widget.class");
var dradrop_validation_map_1 = require("../../canvas-component-map/dradrop-validation-map");
var CanvasRowComponent = (function (_super) {
    __extends(CanvasRowComponent, _super);
    function CanvasRowComponent(_dragDropEventService, _componentFactoryResolver, _eventHndl) {
        var _this = _super.call(this) || this;
        _this._dragDropEventService = _dragDropEventService;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this._eventHndl = _eventHndl;
        _this.mouseLocation = { left: 0, top: 0 };
        _this.isComponent = false;
        _this.properties = new RowProperties();
        return _this;
    }
    CanvasRowComponent.prototype.onWindowClick = function () {
        this.showContextMenu = false;
    };
    CanvasRowComponent.prototype.ngOnInit = function () {
        this.componentId =
            +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
    };
    CanvasRowComponent.prototype.ngOnDestroy = function () { };
    CanvasRowComponent.prototype.componentElementDraggedOver = function (event) {
        this.componentOverStyle = 'overEffect';
        event.preventDefault();
        event.stopPropagation();
    };
    CanvasRowComponent.prototype.componentElementDropped = function (event) {
        event.preventDefault();
        event.stopPropagation();
        var errorMessage = '';
        if (dradrop_validation_map_1.ValidationMap.ROW_DROP[this._eventHndl.componentClassKeyDragged] &&
            this.columnCheck(errorMessage)) {
            this._dragDropEventService.componentElementDrop(this);
        }
        else {
            this._dragDropEventService.notificationData.push('Please drag Column');
        }
    };
    CanvasRowComponent.prototype.columnCheck = function (msg) {
        var totalColumSpaceOccupied = 0;
        this.children.forEach(function (child) {
            totalColumSpaceOccupied += parseInt(child.instance.properties.columnlg);
        });
        if (totalColumSpaceOccupied + 1 < 13)
            return true;
        else {
            msg = 'Row Stack is full';
            this._dragDropEventService.notificationData.push(msg);
            return false;
        }
    };
    CanvasRowComponent.prototype.onMouseEnter = function (event) {
        event.stopPropagation();
        this.componentOverStyle = '';
    };
    CanvasRowComponent.prototype.onMouseOut = function (event) {
        event.stopPropagation();
        this.componentOverStyle = '';
    };
    CanvasRowComponent.prototype.componentDragEnter = function (event) {
        event.stopPropagation();
        this.componentOverStyle = '';
    };
    CanvasRowComponent.prototype.loadContextMenu = function (event) {
        this.mouseLocation.left = event.clientX;
        this.mouseLocation.top = event.clientY;
        this.showContextMenu = true;
        event.preventDefault();
        event.stopPropagation();
    };
    CanvasRowComponent.prototype.getContextMenuStyle = function () {
        return {
            position: 'fixed',
            display: this.showContextMenu ? 'block' : 'none',
            left: this.mouseLocation.left + 'px',
            top: this.mouseLocation.top + 'px',
            'box-shadow': '1px 1px 2px #000000',
            width: '15%'
        };
    };
    CanvasRowComponent.prototype.setSelfActive = function (event) {
        if (event != null) {
            event.stopPropagation();
            this.componentOverStyle = 'overEffect';
            this.showContextMenu = false;
            this._eventHndl.deleteComponentRef = null;
            this._eventHndl.deleteComponentRef = this.componentId;
            this._eventHndl.setAllComponentsInactive(this.componentId);
            this._eventHndl.loadComponentProperties(this.name);
        }
    };
    CanvasRowComponent.prototype.onDeleteClick = function () {
        this.showContextMenu = false;
        this._eventHndl.componentIdToDel = this.componentId;
        this._eventHndl.deleteComponent();
        this._eventHndl.addEditorNewState();
    };
    CanvasRowComponent.prototype.componentInitailized = function () {
        if (this.children && this.children.length > 0) {
            this.children.forEach(function (child) {
                child.instance.componentInitailized();
            });
        }
    };
    return CanvasRowComponent;
}(canvas_widget_class_1.CanvasWidgetClass));
__decorate([
    core_1.ViewChild('rowtarget', { read: core_1.ViewContainerRef })
], CanvasRowComponent.prototype, "target");
__decorate([
    core_1.HostListener('document:click')
], CanvasRowComponent.prototype, "onWindowClick");
CanvasRowComponent = __decorate([
    core_1.Component({
        selector: 'row',
        template: "\n    <div class=\"componentStyle\" class=\"rowstyle {{componentOverStyle}} \"\n         (click)=\"setSelfActive($event)\"\n         (dragover)=\"componentElementDraggedOver($event)\"\n         (dragend)=\"componentDragEnter($event)\"\n         (contextmenu)=\"loadContextMenu($event)\"\n         (drop)=\"componentElementDropped($event)\">\n      <div (mouseenter)=\"onMouseEnter($event)\" [ngClass]=\"{'active-component' : isActive}\" (dragenter)=\"componentDragEnter($event)\" (mouseout)=\"onMouseOut($event)\">\n        <amexio-row>\n          <ng-template #rowtarget></ng-template>\n        </amexio-row>\n      </div>\n\n      <span  *ngIf=\"showContextMenu\" (click)=\"onDeleteClick()\" class=\"dropdown\"\n      [ngStyle]=\"{left: this.mouseLocation.left + 'px',top: this.mouseLocation.top + 'px',position:'fixed','box-shadow': '1px 1px 2px #000000',width: '15%'}\">\n          <ul class=\"dropdown-list\">\n            <li class=\"list-items\">\n              <span ><i class=\"fa fa-trash\" style=\"padding-right: 5px;\"></i> <b>Delete</b> </span>\n            </li>\n          </ul>\n        </span>\n\n    </div>\n  ",
        styles: [
            "\n      .active-component{\n        border: 1px dotted blue !important;\n      }\n    "
        ]
    })
], CanvasRowComponent);
exports.CanvasRowComponent = CanvasRowComponent;
var RowProperties = (function () {
    function RowProperties() {
        this.isComponentValid = true;
    }
    return RowProperties;
}());
exports.RowProperties = RowProperties;
