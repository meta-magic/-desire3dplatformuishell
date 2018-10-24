/**
 * Created by dattaram on 6/3/18.
 */
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
var forms_properties_1 = require("../../canvas-models/forms.properties");
var datasource_model_1 = require("../../canvas-models/datasource.model");
var event_basemodel_1 = require("../../event-relationship/models/event.basemodel");
var CanvasItemSelectorComponent = (function (_super) {
    __extends(CanvasItemSelectorComponent, _super);
    function CanvasItemSelectorComponent(_eventHndl, _componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this._eventHndl = _eventHndl;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this.type = 'default';
        _this.mouseLocation = { left: 0, top: 0 };
        _this.componentBehaviour.hasRelationship = true;
        _this.componentBehaviour.isBindingComponent = true;
        _this.componentBehaviour.hasDataSource = true;
        _this.properties = new ItemSelectorProperty();
        _this.dataSource = new ItemSelectorDatasource();
        _this.eventRelationship = new event_basemodel_1.EventRelationBaseModel();
        _this.itemSelectorData = {
            response: {
                data: [
                    {
                        ItemName: 'Item 1',
                        ItemId: 'item1'
                    },
                    {
                        ItemName: 'Item 2',
                        ItemId: 'item2'
                    },
                    {
                        ItemName: 'Item 3',
                        ItemId: 'item3'
                    },
                    {
                        ItemName: 'Item 4',
                        ItemId: 'item4'
                    }
                ]
            }
        };
        return _this;
    }
    CanvasItemSelectorComponent.prototype.ngOnInit = function () {
        this.componentId =
            +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
    };
    CanvasItemSelectorComponent.prototype.onWindowClick = function () {
        this.showContextMenu = false;
    };
    CanvasItemSelectorComponent.prototype.getContextMenuStyle = function () {
        return {
            position: 'fixed',
            display: this.showContextMenu ? 'block' : 'none',
            left: this.mouseLocation.left + 'px',
            top: this.mouseLocation.top + 'px',
            'box-shadow': '1px 1px 2px #000000',
            width: '15%'
        };
    };
    CanvasItemSelectorComponent.prototype.loadContextMenu = function (event) {
        this.mouseLocation.left = event.clientX;
        this.mouseLocation.top = event.clientY;
        this.showContextMenu = true;
        event.preventDefault();
        event.stopPropagation();
        this._eventHndl.deleteComponentRef = this.componentId;
    };
    CanvasItemSelectorComponent.prototype.onDeleteClick = function () {
        this.showContextMenu = false;
        this._eventHndl.componentIdToDel = this.componentId;
        this._eventHndl.deleteComponent();
        this._eventHndl.addEditorNewState();
    };
    CanvasItemSelectorComponent.prototype.setSelfActive = function (event) {
        event.stopPropagation();
        this._eventHndl.deleteComponentRef = null;
        this._eventHndl.deleteComponentRef = this.componentId;
        this._eventHndl.setAllComponentsInactive(this.componentId);
        this._eventHndl.loadComponentProperties(this.name);
    };
    CanvasItemSelectorComponent.prototype.onMouseOver = function (event) {
        event.stopPropagation();
        this.isOver = true;
    };
    CanvasItemSelectorComponent.prototype.onMouseLeave = function (event) {
        event.stopPropagation();
        this.isOver = false;
    };
    CanvasItemSelectorComponent.prototype.componentElementDraggedOver = function (event) {
        event.preventDefault();
    };
    return CanvasItemSelectorComponent;
}(canvas_widget_class_1.CanvasWidgetClass));
__decorate([
    core_1.HostListener('document:click')
], CanvasItemSelectorComponent.prototype, "onWindowClick");
CanvasItemSelectorComponent = __decorate([
    core_1.Component({
        selector: 'canvas-item-selector',
        template: "\n    <div (click)=\"setSelfActive($event)\" [attr.id]=\"componentId\"\n         (mouseover)=\"onMouseOver($event)\" (mouseleave)=\"onMouseLeave($event)\"\n         draggable=\"true\" [ngClass]=\"{'componentStyle':isOver,'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}\"\n          (dragstart)=\"_eventHndl.componentElementRelocateDragBegin($event,this)\"\n          (contextmenu)=\"loadContextMenu($event)\"\n          (dragover)=\"componentElementDraggedOver($event)\" #txtField>\n      <div class=\"disabled-area\">\n        <amexio-item-selector [height]=\"properties.height\"\n                              [display-field]=\"'ItemName'\"\n                              [value-field]=\"'itemId'\"\n                              [data-reader]=\"'response.data'\" \n                              [data]=\"itemSelectorData\">\n        </amexio-item-selector>\n      </div>\n    </div>\n    <span  *ngIf=\"showContextMenu\" (click)=\"onDeleteClick()\" class=\"dropdown\"\n      [ngStyle]=\"{left: this.mouseLocation.left + 'px',top: this.mouseLocation.top + 'px',position:'fixed','box-shadow': '1px 1px 2px #000000',width: '15%'}\">\n          <ul class=\"dropdown-list\">\n            <li class=\"list-items\">\n              <span ><i class=\"fa fa-trash\" style=\"padding-right: 5px;\"></i> <b>Delete</b> </span>\n            </li>\n          </ul>\n        </span>\n\n  ",
        styles: [
            "\n      .disabled-area {\n        pointer-events: none;\n        opacity: 0.4;\n        cursor: not-allowed;\n      }\n    "
        ]
    })
], CanvasItemSelectorComponent);
exports.CanvasItemSelectorComponent = CanvasItemSelectorComponent;
var ItemSelectorProperty = (function () {
    function ItemSelectorProperty() {
        this.model = new forms_properties_1.ModelClass();
        this.isComponentValid = false;
        this.height = 200;
        this.name = '';
        this.displayField = '';
        this.valueField = '';
    }
    return ItemSelectorProperty;
}());
exports.ItemSelectorProperty = ItemSelectorProperty;
var ItemSelectorDatasource = (function (_super) {
    __extends(ItemSelectorDatasource, _super);
    function ItemSelectorDatasource() {
        var _this = _super.call(this) || this;
        _this.remote.httpUrl = '';
        _this.remote.httpMethod = 1;
        _this.metadata = new datasource_model_1.Metadata();
        _this.dataReader = '';
        _this.displayField = '';
        _this.valueField = '';
        _this.servicetype = 1;
        return _this;
    }
    return ItemSelectorDatasource;
}(datasource_model_1.DatasourceModel));
exports.ItemSelectorDatasource = ItemSelectorDatasource;
