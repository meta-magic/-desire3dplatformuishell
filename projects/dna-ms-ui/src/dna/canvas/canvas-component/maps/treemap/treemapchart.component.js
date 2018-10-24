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
var chartbasic_1 = require("./../../charts/chartproperties/chartbasic");
var datasource_model_1 = require("../../../canvas-models/datasource.model");
/**
 * Created by sagar on 12/3/18.OnChanges
 */
var core_1 = require("@angular/core");
var canvas_widget_class_1 = require("../../../canvas-models/canvas.widget.class");
var CanvasTreemapchartComponent = (function (_super) {
    __extends(CanvasTreemapchartComponent, _super);
    function CanvasTreemapchartComponent(_eventHndl, _componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this._eventHndl = _eventHndl;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this.mouseLocation = { left: 0, top: 0 };
        _this.componentBehaviour.isBindingComponent = true;
        _this.componentBehaviour.hasDataSource = true;
        _this.treemapChartData = [
            [
                'Location',
                'Parent',
                'Market trade volume (size)',
                'Market increase/decrease (color)'
            ],
            ['Global', null, 0, 0],
            ['America', 'Global', 0, 0],
            ['Europe', 'Global', 0, 0],
            ['Asia', 'Global', 0, 0],
            ['Australia', 'Global', 0, 0],
            ['Africa', 'Global', 0, 0],
            ['Brazil', 'America', 11, 10],
            ['USA', 'America', 52, 31],
            ['Mexico', 'America', 24, 12],
            ['Canada', 'America', 16, -23],
            ['France', 'Europe', 42, -11],
            ['Germany', 'Europe', 31, -2],
            ['Sweden', 'Europe', 22, -13],
            ['Italy', 'Europe', 17, 4],
            ['UK', 'Europe', 21, -5],
            ['China', 'Asia', 36, 4],
            ['Japan', 'Asia', 20, -12],
            ['India', 'Asia', 40, 63],
            ['Laos', 'Asia', 4, 34],
            ['Mongolia', 'Asia', 1, -5],
            ['Israel', 'Asia', 12, 24],
            ['Iran', 'Asia', 18, 13],
            ['Pakistan', 'Asia', 11, -52],
            ['Egypt', 'Africa', 21, 0],
            ['S. Africa', 'Africa', 30, 43],
            ['Sudan', 'Africa', 12, 2],
            ['Congo', 'Africa', 10, 12],
            ['Zaire', 'Africa', 8, 10]
        ];
        _this.properties = new TreemapchartProperty();
        _this.dataSource = new TreemapchartDatasource();
        return _this;
    }
    CanvasTreemapchartComponent.prototype.ngOnInit = function () {
        this.componentId =
            +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
    };
    CanvasTreemapchartComponent.prototype.onWindowClick = function () {
        this.showContextMenu = false;
    };
    CanvasTreemapchartComponent.prototype.getContextMenuStyle = function () {
        return {
            position: 'fixed',
            display: this.showContextMenu ? 'block' : 'none',
            left: this.mouseLocation.left + 'px',
            top: this.mouseLocation.top + 'px',
            'box-shadow': '1px 1px 2px #000000',
            width: '15%'
        };
    };
    CanvasTreemapchartComponent.prototype.loadContextMenu = function (event) {
        this.mouseLocation.left = event.clientX;
        this.mouseLocation.top = event.clientY;
        this.showContextMenu = true;
        event.preventDefault();
        event.stopPropagation();
        this._eventHndl.deleteComponentRef = this.componentId;
    };
    CanvasTreemapchartComponent.prototype.onDeleteClick = function () {
        this.showContextMenu = false;
        this._eventHndl.componentIdToDel = this.componentId;
        this._eventHndl.deleteComponent();
        this._eventHndl.addEditorNewState();
    };
    CanvasTreemapchartComponent.prototype.setSelfActive = function (event) {
        event.stopPropagation();
        this.showContextMenu = false;
        this._eventHndl.deleteComponentRef = null;
        this._eventHndl.deleteComponentRef = this.componentId;
        this._eventHndl.setAllComponentsInactive(this.componentId);
        this._eventHndl.loadComponentProperties(this.name);
    };
    CanvasTreemapchartComponent.prototype.componentElementDraggedOver = function (event) {
        event.preventDefault();
    };
    return CanvasTreemapchartComponent;
}(canvas_widget_class_1.CanvasWidgetClass));
__decorate([
    core_1.HostListener('document:click')
], CanvasTreemapchartComponent.prototype, "onWindowClick");
CanvasTreemapchartComponent = __decorate([
    core_1.Component({
        selector: 'treemap-chart-input',
        template: "\n    <div class=\"componentStyle\"  (click)=\"setSelfActive($event)\" [attr.id]=\"componentId\"\n          draggable=\"true\" [ngClass]=\"{'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}\"\n          (dragstart)=\"_eventHndl.componentElementRelocateDragBegin($event,this)\"\n          (contextmenu)=\"loadContextMenu($event)\"\n    (dragover)=\"componentElementDraggedOver($event)\" #treechart>\n      <div>\n\n <amexio-map-treemap\n [data]=\"treemapChartData\"\n [height]=\"properties.chartBasic.height\"\n [width]=\"properties.chartBasic.width\"\n [max-color]=\"properties.chartBasic.maxColor\"\n [mid-color]=\"properties.chartBasic.midColor\"\n [min-color]=\"properties.chartBasic.minColor\"\n [max-post-depth]=\"properties.chartBasic.maxPostDepth\"\n [show-scale]=\"properties.chartBasic.showScale\"\n >\n\n</amexio-map-treemap>\n      </div>\n    </div>\n\n    <span  *ngIf=\"showContextMenu\" (click)=\"onDeleteClick()\" class=\"dropdown\"\n    [ngStyle]=\"{left: this.mouseLocation.left + 'px',top: this.mouseLocation.top + 'px',position:'fixed','box-shadow': '1px 1px 2px #000000',width: '15%'}\">\n        <ul class=\"dropdown-list\">\n          <li class=\"list-items\">\n            <span ><i class=\"fa fa-trash\" style=\"padding-right: 5px;\"></i> <b>Delete</b> </span>\n          </li>\n        </ul>\n      </span>\n\n  "
    })
], CanvasTreemapchartComponent);
exports.CanvasTreemapchartComponent = CanvasTreemapchartComponent;
var TreemapchartProperty = (function (_super) {
    __extends(TreemapchartProperty, _super);
    function TreemapchartProperty() {
        var _this = _super.call(this) || this;
        _this.chartBasic = new chartbasic_1.ChartBasic();
        _this.isComponentValid = false;
        return _this;
    }
    return TreemapchartProperty;
}(canvas_widget_class_1.CanvasWidgetClass));
exports.TreemapchartProperty = TreemapchartProperty;
var TreemapchartDatasource = (function (_super) {
    __extends(TreemapchartDatasource, _super);
    function TreemapchartDatasource() {
        var _this = _super.call(this) || this;
        _this.metadata = new datasource_model_1.Metadata();
        _this.dataReader = '';
        _this.servicetype = '1';
        _this.displayField = '';
        _this.valueField = '';
        _this.localDataName = null;
        _this.remote.httpMethod = 1;
        _this.remote.httpUrl = '';
        return _this;
    }
    return TreemapchartDatasource;
}(datasource_model_1.DatasourceModel));
exports.TreemapchartDatasource = TreemapchartDatasource;
