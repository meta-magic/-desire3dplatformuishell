/**
 * Created by dattaram on 7/3/18.
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
var properties_map_1 = require("../../canvas-component-map/properties.map");
var component_map_1 = require("../../canvas-component-map/component.map");
var datasource_model_1 = require("../../canvas-models/datasource.model");
var event_basemodel_1 = require("../../event-relationship/models/event.basemodel");
var CanvasDataGridComponent = (function (_super) {
    __extends(CanvasDataGridComponent, _super);
    function CanvasDataGridComponent(_dragDropEventService, _eventHndl, _componentFactoryResolver, viewContainerRef) {
        var _this = _super.call(this) || this;
        _this._dragDropEventService = _dragDropEventService;
        _this._eventHndl = _eventHndl;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this.viewContainerRef = viewContainerRef;
        _this.type = 'datagrid';
        _this.localData = [];
        _this.mouseLocation = { left: 0, top: 0 };
        _this.componentBehaviour.hasRelationship = true;
        _this.componentBehaviour.isBindingComponent = true;
        _this.componentBehaviour.hasDataSource = true;
        _this.properties = new DataGridProperties();
        _this.dataSource = new DataGridDatasource();
        _this.columnProperty = new ColumnProperty();
        _this.target = _this.viewContainerRef;
        _this.showBlockProperties = false;
        _this.eventRelationship = new event_basemodel_1.EventRelationBaseModel();
        return _this;
    }
    CanvasDataGridComponent.prototype.ngOnInit = function () {
        this.componentId =
            +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
    };
    CanvasDataGridComponent.prototype.onMouseOver = function (event) {
        event.stopPropagation();
        this.isOver = true;
    };
    CanvasDataGridComponent.prototype.onMouseLeave = function (event) {
        event.stopPropagation();
        this.isOver = false;
    };
    CanvasDataGridComponent.prototype.onWindowClick = function () {
        this.showContextMenu = false;
    };
    CanvasDataGridComponent.prototype.getContextMenuStyle = function () {
        return {
            position: 'fixed',
            display: this.showContextMenu ? 'block' : 'none',
            left: this.mouseLocation.left + 'px',
            top: this.mouseLocation.top + 'px',
            'box-shadow': '1px 1px 2px #000000',
            width: '15%'
        };
    };
    CanvasDataGridComponent.prototype.loadContextMenu = function (event) {
        this.mouseLocation.left = event.clientX;
        this.mouseLocation.top = event.clientY;
        this.showContextMenu = true;
        event.preventDefault();
        event.stopPropagation();
        this._eventHndl.deleteComponentRef = this.componentId;
    };
    CanvasDataGridComponent.prototype.onDeleteClick = function () {
        this.showContextMenu = false;
        this._eventHndl.componentIdToDel = this.componentId;
        this._eventHndl.deleteComponent();
        this._eventHndl.addEditorNewState();
    };
    CanvasDataGridComponent.prototype.setSelfActive = function (event) {
        event.stopPropagation();
        this.showContextMenu = false;
        this.showBlockProperties = false;
        this._eventHndl.deleteComponentRef = null;
        this._eventHndl.deleteComponentRef = this.componentId;
        this._eventHndl.setAllComponentsInactive(this.componentId);
        this._eventHndl.loadComponentProperties(this.name);
    };
    CanvasDataGridComponent.prototype.loadComponentProperties = function () {
        this._eventHndl.propertyViewRef.clear();
        var propertyFactory = this._componentFactoryResolver.resolveComponentFactory(properties_map_1.PropertyMap.PROPERTY_MAP[this.name]);
        var propertyInstance = this._eventHndl.propertyViewRef.createComponent(propertyFactory);
        propertyInstance.instance.componentInstance = this;
        propertyInstance.changeDetectorRef.detectChanges();
    };
    CanvasDataGridComponent.prototype.componentElementDraggedOver = function (event) {
        event.preventDefault();
    };
    CanvasDataGridComponent.prototype.getColumnData = function (colData) {
        colData.event.stopPropagation();
        this.columnUpdateMode = true;
        this.columnProperty = colData.data;
    };
    CanvasDataGridComponent.prototype.addColumn = function () {
        if (this.columnProperty.text != null || this.columnProperty.text != '') {
            if (!this.columnUpdateMode) {
                this.componentId =
                    +Math.floor(Math.random() * 90000) + 10000 + '_' + 'datagridcolumn';
                this._eventHndl.componentClassKeyDragged = 'datagridcolumn';
                var componentFactory = this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP[this._eventHndl.componentClassKeyDragged]);
                var componentInstance = this.target.createComponent(componentFactory);
                componentInstance.instance.properties.text = this.columnProperty.text;
                componentInstance.instance.properties.dataindex = this.columnProperty.dataindex;
                componentInstance.instance.properties.datatype = this.columnProperty.datatype;
                componentInstance.instance.properties.hidden = this.columnProperty.hidden;
                this.children.push(componentInstance);
                this._eventHndl.addEditorNewState();
                this._eventHndl.componentClassKeyDragged = null;
                this.createLocalData();
                this.resetColumnProperties();
            }
            else {
                this.columnUpdateMode = false;
                var columnProperty = new ColumnProperty();
                this.columnProperty = columnProperty;
                this.resetColumnProperties();
            }
        }
    };
    CanvasDataGridComponent.prototype.removeColumn = function () {
        var _this = this;
        this.children.forEach(function (item, index) {
            if (item.instance.properties == _this.columnProperty) {
                _this.children.splice(index, 1);
            }
        });
        this.createLocalData();
        this.resetColumnProperties();
    };
    CanvasDataGridComponent.prototype.createComponentConfig = function () {
        var _this = this;
        this.localData.length = 0;
        this.children.forEach(function (child) {
            _this.localData.push(child.instance.properties);
        });
    };
    /* DONT REMOVE createLocalData FUNTION IT WILL BREAK GRID OPEN CASE */
    CanvasDataGridComponent.prototype.createLocalData = function () {
        var _this = this;
        this.localData.length = 0;
        this.children.forEach(function (child) {
            _this.localData.push(child.instance.properties);
        });
    };
    CanvasDataGridComponent.prototype.getBlockData = function (data) {
        data.event.stopPropagation();
        this.loadComponentProperties();
        this.showBlockProperties = true;
        this.blockPropertyObject = data.data;
    };
    CanvasDataGridComponent.prototype.resetColumnProperties = function () {
        this.columnProperty.text = '';
        this.columnProperty.datatype = 'string';
        this.columnProperty.dataindex = '';
        this.columnProperty.hidden = false;
    };
    return CanvasDataGridComponent;
}(canvas_widget_class_1.CanvasWidgetClass));
__decorate([
    core_1.HostListener('document:click')
], CanvasDataGridComponent.prototype, "onWindowClick");
CanvasDataGridComponent = __decorate([
    core_1.Component({
        selector: 'canvas-data-grid',
        template: "\n    <div (click)=\"setSelfActive($event)\" [attr.id]=\"componentId\"\n         (mouseover)=\"onMouseOver($event)\" (mouseleave)=\"onMouseLeave($event)\"\n         draggable=\"true\" [ngClass]=\"{'componentStyle':isOver,'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}\"\n         (dragstart)=\"_eventHndl.componentElementRelocateDragBegin($event,this)\"\n         (contextmenu)=\"loadContextMenu($event)\"\n         (dragover)=\"componentElementDraggedOver($event)\">\n      <amexio-datagrid\n        [enable-column-fiter]=\"properties.enableColumnToggle\"\n        [enable-data-filter]=\"properties.enableFiltering\"\n        [title]=\"properties.title\"\n        [data-reader]=\"'data'\"\n        [page-size]=\"properties.pageSize\"\n        [enable-checkbox]=\"properties.enableCheckbox\"\n        [height]=\"200\"\n        [column-defintion]=\"localData\" (onHeaderClick)=\"getColumnData($event)\"\n      >\n      </amexio-datagrid>\n    </div>\n\n    <span  *ngIf=\"showContextMenu\" (click)=\"onDeleteClick()\" class=\"dropdown\"\n    [ngStyle]=\"{left: this.mouseLocation.left + 'px',top: this.mouseLocation.top + 'px',position:'fixed','box-shadow': '1px 1px 2px #000000',width: '15%'}\">\n        <ul class=\"dropdown-list\">\n          <li class=\"list-items\">\n            <span ><i class=\"fa fa-trash\" style=\"padding-right: 5px;\"></i> <b>Delete</b> </span>\n          </li>\n        </ul>\n      </span>\n  "
    })
], CanvasDataGridComponent);
exports.CanvasDataGridComponent = CanvasDataGridComponent;
var DataGridProperties = (function () {
    function DataGridProperties() {
        this.model = new forms_properties_1.ModelClass();
        this.isComponentValid = false;
        this.title = 'Data Grid';
        this.fieldLabel = 'Data Grid';
        this.height = null;
        this.pageSize = 10;
        this.enableFiltering = false;
        this.groupBy = false;
        this.groupByColumnIndex = '';
        this.enableCheckbox = false;
        this.name = '';
        this.enableColumnToggle = true;
    }
    return DataGridProperties;
}());
exports.DataGridProperties = DataGridProperties;
var DataGridDatasource = (function (_super) {
    __extends(DataGridDatasource, _super);
    function DataGridDatasource() {
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
    return DataGridDatasource;
}(datasource_model_1.DatasourceModel));
exports.DataGridDatasource = DataGridDatasource;
var ColumnProperty = (function () {
    function ColumnProperty() {
        this.isComponentValid = true;
        this.text = '';
        this.hidden = false;
        this.datatype = 'string';
        this.dataindex = '';
        this.isColumnSort = true;
    }
    return ColumnProperty;
}());
exports.ColumnProperty = ColumnProperty;
