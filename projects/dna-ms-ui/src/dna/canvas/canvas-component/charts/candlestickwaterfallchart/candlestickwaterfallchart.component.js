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
var verticalaxis_1 = require("./../chartproperties/verticalaxis");
var datasource_model_1 = require("../../../canvas-models/datasource.model");
var chartlegend_1 = require("./../chartproperties/chartlegend");
var charttitle_1 = require("./../chartproperties/charttitle");
var chartbasic_1 = require("./../chartproperties/chartbasic");
/**
 * Created by sagar on 12/3/18.OnChanges
 */
var core_1 = require("@angular/core");
var canvas_widget_class_1 = require("../../../canvas-models/canvas.widget.class");
var horizontalaxis_1 = require("../chartproperties/horizontalaxis");
var CanvasCandlestickwaterfallchartComponent = (function (_super) {
    __extends(CanvasCandlestickwaterfallchartComponent, _super);
    function CanvasCandlestickwaterfallchartComponent(_eventHndl, _componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this._eventHndl = _eventHndl;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this.mouseLocation = { left: 0, top: 0 };
        _this.componentBehaviour.isBindingComponent = true;
        _this.candlestickwaterfallChartData = [
            ['Mon', 28, 28, 38, 38],
            ['Tue', 38, 38, 55, 55],
            ['Wed', 55, 55, 77, 77],
            ['Thu', 77, 77, 66, 66],
            ['Fri', 66, 66, 22, 22]
        ];
        _this.properties = new CandlestickwaterfallchartProperty();
        _this.dataSource = new CandlestickwaterfallchartDatasource();
        return _this;
    }
    CanvasCandlestickwaterfallchartComponent.prototype.ngOnInit = function () {
        this.componentId =
            +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
    };
    CanvasCandlestickwaterfallchartComponent.prototype.onHover = function () {
        this.showContextMenu = false;
    };
    CanvasCandlestickwaterfallchartComponent.prototype.getContextMenuStyle = function () {
        return {
            position: 'fixed',
            display: this.showContextMenu ? 'block' : 'none',
            left: this.mouseLocation.left + 'px',
            top: this.mouseLocation.top + 'px',
            'box-shadow': '1px 1px 2px #000000',
            width: '15%'
        };
    };
    CanvasCandlestickwaterfallchartComponent.prototype.loadContextMenu = function (event) {
        this.mouseLocation.left = event.clientX;
        this.mouseLocation.top = event.clientY;
        this.showContextMenu = true;
        event.preventDefault();
        event.stopPropagation();
        this._eventHndl.deleteComponentRef = this.componentId;
    };
    CanvasCandlestickwaterfallchartComponent.prototype.onDeleteClick = function () {
        this.showContextMenu = false;
        this._eventHndl.componentIdToDel = this.componentId;
        this._eventHndl.deleteComponent();
        this._eventHndl.addEditorNewState();
    };
    CanvasCandlestickwaterfallchartComponent.prototype.setSelfActive = function (event) {
        event.stopPropagation();
        this._eventHndl.deleteComponentRef = null;
        this._eventHndl.deleteComponentRef = this.componentId;
        this._eventHndl.setAllComponentsInactive(this.componentId);
        this._eventHndl.loadComponentProperties(this.name);
    };
    CanvasCandlestickwaterfallchartComponent.prototype.componentElementDraggedOver = function (event) {
        event.preventDefault();
    };
    return CanvasCandlestickwaterfallchartComponent;
}(canvas_widget_class_1.CanvasWidgetClass));
__decorate([
    core_1.HostListener('document:click')
], CanvasCandlestickwaterfallchartComponent.prototype, "onHover");
CanvasCandlestickwaterfallchartComponent = __decorate([
    core_1.Component({
        selector: 'candlestickwaterfall-chart-input',
        template: "\n    <div  (click)=\"setSelfActive($event)\" [attr.id]=\"componentId\"\n          draggable=\"true\" [ngClass]=\"{'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}\"\n          (dragstart)=\"_eventHndl.componentElementRelocateDragBegin($event,this)\"\n          (contextmenu)=\"loadContextMenu($event)\"\n    (dragover)=\"componentElementDraggedOver($event)\" #candlestickwaterfallchart>\n      <div>\n\n <amexio-chart-candlestick-waterfall [data]=\"candlestickwaterfallChartData\"\n [height]=\"properties.chartBasic.height\"\n [width]=\"properties.chartBasic.width\"\n [bar-width]=\"properties.chartBasic.barWidth\"\n[falling-color]=\"properties.chartBasic.fallingColor\"\n[rising-color]=\"properties.chartBasic.risingColor\"\n >\n<amexio-chart-title [title]=\"properties.chartTitle.title\"\n  [color]=\"properties.chartTitle.color\"\n  [font-name]=\"properties.chartTitle.fontName\"\n  [font-size]=\"properties.chartTitle.fontSize\"\n  [bold]=\"properties.chartTitle.bold\"\n  [italic]=\"properties.chartTitle.italic\"\n>\n</amexio-chart-title>\n\n<amexio-chart-legend [position]=\"properties.chartLegend.position\"\n  [max-lines]=\"properties.chartLegend.maxLines\"\n  [font-name]=\"properties.chartLegend.fontName\"\n  [font-size]=\"properties.chartLegend.fontSize\"\n  [color]=\"properties.chartLegend.color\"\n  [alignment]=\"properties.chartLegend.alignment\">\n</amexio-chart-legend>\n\n<amexio-chart-horizontal-axis\n[title]=\"properties.horizontaAxis.title\"\n[title-color]=\"properties.horizontaAxis.titleColor\"\n>\n</amexio-chart-horizontal-axis>\n<amexio-chart-vertical-axis\n[title]=\"properties.verticalAxis.title\"\n[title-color]=\"properties.verticalAxis.titleColor\"\n>\n</amexio-chart-vertical-axis>\n\n</amexio-chart-candlestick-waterfall>\n      </div>\n    </div>\n    <span  *ngIf=\"showContextMenu\" (click)=\"onDeleteClick()\" class=\"dropdown\"\n    [ngStyle]=\"{left: this.mouseLocation.left + 'px',top: this.mouseLocation.top + 'px',position:'fixed','box-shadow': '1px 1px 2px #000000',width: '15%'}\">\n        <ul class=\"dropdown-list\">\n          <li class=\"list-items\">\n            <span ><i class=\"fa fa-trash\" style=\"padding-right: 5px;\"></i> <b>Delete</b> </span>\n          </li>\n        </ul>\n      </span>\n  "
    })
], CanvasCandlestickwaterfallchartComponent);
exports.CanvasCandlestickwaterfallchartComponent = CanvasCandlestickwaterfallchartComponent;
var CandlestickwaterfallchartProperty = (function (_super) {
    __extends(CandlestickwaterfallchartProperty, _super);
    function CandlestickwaterfallchartProperty() {
        var _this = _super.call(this) || this;
        _this.chartBasic = new chartbasic_1.ChartBasic();
        _this.chartTitle = new charttitle_1.ChartTitle();
        _this.chartLegend = new chartlegend_1.ChartLegend();
        _this.horizontaAxis = new horizontalaxis_1.HorizontaAxis();
        _this.verticalAxis = new verticalaxis_1.VerticalAxis();
        return _this;
    }
    return CandlestickwaterfallchartProperty;
}(canvas_widget_class_1.CanvasWidgetClass));
exports.CandlestickwaterfallchartProperty = CandlestickwaterfallchartProperty;
var CandlestickwaterfallchartDatasource = (function (_super) {
    __extends(CandlestickwaterfallchartDatasource, _super);
    function CandlestickwaterfallchartDatasource() {
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
    return CandlestickwaterfallchartDatasource;
}(datasource_model_1.DatasourceModel));
exports.CandlestickwaterfallchartDatasource = CandlestickwaterfallchartDatasource;
