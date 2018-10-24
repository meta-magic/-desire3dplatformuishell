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
var CanvasTreeComponent = (function (_super) {
    __extends(CanvasTreeComponent, _super);
    function CanvasTreeComponent(_eventHndl, _componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this._eventHndl = _eventHndl;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this.type = 'tree';
        _this.mouseLocation = { left: 0, top: 0 };
        _this.componentBehaviour.hasRelationship = true;
        _this.componentBehaviour.isBindingComponent = true;
        _this.componentBehaviour.hasDataSource = true;
        _this.properties = new TreeProperties();
        _this.dataSource = new TreeDatasource();
        _this.eventRelationship = new event_basemodel_1.EventRelationBaseModel();
        _this.treeLocalData = {
            data: [
                {
                    text: 'Tree',
                    expanded: true,
                    children: [
                        {
                            text: 'Parent 1',
                            expanded: true,
                            children: [
                                {
                                    leaf: true,
                                    text: 'Child 1'
                                }
                            ]
                        },
                        {
                            text: 'Parent 2',
                            expanded: true,
                            children: [
                                {
                                    leaf: true,
                                    text: 'Child 1'
                                },
                                {
                                    leaf: true,
                                    text: 'Child 2'
                                }
                            ]
                        }
                    ]
                }
            ]
        };
        return _this;
    }
    CanvasTreeComponent.prototype.ngOnInit = function () {
        this.componentId =
            +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
    };
    CanvasTreeComponent.prototype.onMouseOver = function (event) {
        event.stopPropagation();
        this.isOver = true;
    };
    CanvasTreeComponent.prototype.onMouseLeave = function (event) {
        event.stopPropagation();
        this.isOver = false;
    };
    CanvasTreeComponent.prototype.onHover = function () {
        this.showContextMenu = false;
    };
    CanvasTreeComponent.prototype.getContextMenuStyle = function () {
        return {
            position: 'fixed',
            display: this.showContextMenu ? 'block' : 'none',
            left: this.mouseLocation.left + 'px',
            top: this.mouseLocation.top + 'px',
            'box-shadow': '1px 1px 2px #000000',
            width: '15%'
        };
    };
    CanvasTreeComponent.prototype.loadContextMenu = function (event) {
        this.mouseLocation.left = event.clientX;
        this.mouseLocation.top = event.clientY;
        this.showContextMenu = true;
        event.preventDefault();
        event.stopPropagation();
        this._eventHndl.deleteComponentRef = this.componentId;
    };
    CanvasTreeComponent.prototype.onDeleteClick = function () {
        this.showContextMenu = false;
        this._eventHndl.componentIdToDel = this.componentId;
        this._eventHndl.deleteComponent();
        this._eventHndl.addEditorNewState();
    };
    CanvasTreeComponent.prototype.setSelfActive = function (event) {
        event.stopPropagation();
        this._eventHndl.deleteComponentRef = null;
        this._eventHndl.deleteComponentRef = this.componentId;
        this._eventHndl.setAllComponentsInactive(this.componentId);
        this._eventHndl.loadComponentProperties(this.name);
    };
    CanvasTreeComponent.prototype.componentElementDraggedOver = function (event) {
        event.preventDefault();
    };
    return CanvasTreeComponent;
}(canvas_widget_class_1.CanvasWidgetClass));
__decorate([
    core_1.HostListener('document:click')
], CanvasTreeComponent.prototype, "onHover");
CanvasTreeComponent = __decorate([
    core_1.Component({
        selector: 'tree',
        template: "\n    <div (click)=\"setSelfActive($event)\" [attr.id]=\"componentId\"\n          (mouseover)=\"onMouseOver($event)\" (mouseleave)=\"onMouseLeave($event)\"\n          draggable=\"true\" [ngClass]=\"{'componentStyle':isOver,'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}\"\n          (dragstart)=\"_eventHndl.componentElementRelocateDragBegin($event,this)\"\n          (contextmenu)=\"loadContextMenu($event)\"\n          (dragover)=\"componentElementDraggedOver($event)\" #tree>\n\n          <ng-container *ngIf=\"!properties.filter\">\n          <amexio-treeview [data-reader]=\"'data'\"\n          [enable-checkbox]=\"properties.enableCheckbox\"\n          [data]=\"treeLocalData\">\n          </amexio-treeview>\n          </ng-container>\n          <ng-container *ngIf=\"properties.filter\">\n          <amexio-tree-filter-view [data]=\"treeLocalData\"  [enable-checkbox]=\"properties.enableCheckbox\" [data-reader]=\"'data'\">\n          </amexio-tree-filter-view>\n          </ng-container>\n\n    </div>\n    <span  *ngIf=\"showContextMenu\" (click)=\"onDeleteClick()\" class=\"dropdown\"\n      [ngStyle]=\"{left: this.mouseLocation.left + 'px',top: this.mouseLocation.top + 'px',position:'fixed','box-shadow': '1px 1px 2px #000000',width: '15%'}\">\n          <ul class=\"dropdown-list\">\n            <li class=\"list-items\">\n              <span ><i class=\"fa fa-trash\" style=\"padding-right: 5px;\"></i> <b>Delete</b> </span>\n            </li>\n          </ul>\n        </span>\n  "
    })
], CanvasTreeComponent);
exports.CanvasTreeComponent = CanvasTreeComponent;
var TreeProperties = (function () {
    function TreeProperties() {
        /*temporary use*/
        this.model = new forms_properties_1.ModelClass();
        this.isComponentValid = false;
        this.name = '';
        this.enableCheckbox = false;
        this.filter = false;
    }
    return TreeProperties;
}());
exports.TreeProperties = TreeProperties;
var TreeDatasource = (function (_super) {
    __extends(TreeDatasource, _super);
    function TreeDatasource() {
        var _this = _super.call(this) || this;
        _this.metadata = new datasource_model_1.Metadata();
        _this.dataReader = '';
        _this.httpMethod = 1;
        _this.httpUrl = '';
        _this.remote.httpUrl = _this.httpUrl;
        _this.remote.httpMethod = 1;
        _this.servicetype = 1;
        return _this;
    }
    return TreeDatasource;
}(datasource_model_1.DatasourceModel));
exports.TreeDatasource = TreeDatasource;
