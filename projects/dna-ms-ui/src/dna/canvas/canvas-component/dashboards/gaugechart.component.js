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
var chartbasic_1 = require("./../charts/chartproperties/chartbasic");
var datasource_model_1 = require("../../canvas-models/datasource.model");
/**
 * Created by sagar on 12/3/18.OnChanges
 */
var core_1 = require("@angular/core");
var canvas_widget_class_1 = require("../../canvas-models/canvas.widget.class");
var CanvasGaugechartComponent = (function (_super) {
    __extends(CanvasGaugechartComponent, _super);
    function CanvasGaugechartComponent(_eventHndl, _componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this._eventHndl = _eventHndl;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this.mouseLocation = { left: 0, top: 0 };
        _this.componentBehaviour.isBindingComponent = true;
        _this.gaugeChartData = [['Label', 'Value'], ['Memory', 80]];
        _this.properties = new GaugechartProperty();
        _this.dataSource = new GaugechartDatasource();
        return _this;
    }
    CanvasGaugechartComponent.prototype.onWindowClick = function () {
        this.showContextMenu = false;
    };
    CanvasGaugechartComponent.prototype.getContextMenuStyle = function () {
        return {
            position: 'fixed',
            display: this.showContextMenu ? 'block' : 'none',
            left: this.mouseLocation.left + 'px',
            top: this.mouseLocation.top + 'px',
            'box-shadow': '1px 1px 2px #000000',
            width: '15%'
        };
    };
    CanvasGaugechartComponent.prototype.loadContextMenu = function (event) {
        this.mouseLocation.left = event.clientX;
        this.mouseLocation.top = event.clientY;
        this.showContextMenu = true;
        event.preventDefault();
        event.stopPropagation();
        this._eventHndl.deleteComponentRef = this.componentId;
    };
    CanvasGaugechartComponent.prototype.onDeleteClick = function () {
        this.showContextMenu = false;
        this._eventHndl.componentIdToDel = this.componentId;
        this._eventHndl.deleteComponent();
        this._eventHndl.addEditorNewState();
    };
    CanvasGaugechartComponent.prototype.ngOnInit = function () {
        this.componentId =
            +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
    };
    CanvasGaugechartComponent.prototype.onMouseOver = function (event) {
        event.stopPropagation();
        this.isOver = true;
    };
    CanvasGaugechartComponent.prototype.onMouseLeave = function (event) {
        event.stopPropagation();
        this.isOver = false;
    };
    CanvasGaugechartComponent.prototype.setSelfActive = function (event) {
        event.stopPropagation();
        this._eventHndl.deleteComponentRef = null;
        this._eventHndl.deleteComponentRef = this.componentId;
        this._eventHndl.setAllComponentsInactive(this.componentId);
        this._eventHndl.loadComponentProperties(this.name);
    };
    CanvasGaugechartComponent.prototype.componentElementDraggedOver = function (event) {
        event.preventDefault();
    };
    return CanvasGaugechartComponent;
}(canvas_widget_class_1.CanvasWidgetClass));
__decorate([
    core_1.HostListener('document:click')
], CanvasGaugechartComponent.prototype, "onWindowClick");
CanvasGaugechartComponent = __decorate([
    core_1.Component({
        selector: 'gauge-chart-input',
        template: "\n    <div (click)=\"setSelfActive($event)\" [attr.id]=\"componentId\"\n         (mouseover)=\"onMouseOver($event)\" (mouseleave)=\"onMouseLeave($event)\"\n         (contextmenu)=\"loadContextMenu($event)\"\n         draggable=\"true\" [ngClass]=\"{'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}\"\n          (dragstart)=\"_eventHndl.componentElementRelocateDragBegin($event,this)\"\n    (dragover)=\"componentElementDraggedOver($event)\" #guagechart>\n      <div>\n\n <amexio-dashboard-gauge  [data]=\"gaugeChartData\"\n [height]=\"properties.chartBasic.height\"\n [width]=\"properties.chartBasic.width\" >\n  </amexio-dashboard-gauge >\n      </div>\n    </div>\n\n    <span  *ngIf=\"showContextMenu\" (click)=\"onDeleteClick()\" class=\"dropdown\"\n    [ngStyle]=\"{left: this.mouseLocation.left + 'px',top: this.mouseLocation.top + 'px',position:'fixed','box-shadow': '1px 1px 2px #000000',width: '15%'}\">\n        <ul class=\"dropdown-list\">\n          <li class=\"list-items\">\n            <span ><i class=\"fa fa-trash\" style=\"padding-right: 5px;\"></i> <b>Delete</b> </span>\n          </li>\n        </ul>\n      </span>\n\n  "
    })
], CanvasGaugechartComponent);
exports.CanvasGaugechartComponent = CanvasGaugechartComponent;
var GaugechartProperty = (function (_super) {
    __extends(GaugechartProperty, _super);
    function GaugechartProperty() {
        var _this = _super.call(this) || this;
        _this.chartBasic = new chartbasic_1.ChartBasic();
        _this.isComponentValid = false;
        return _this;
    }
    return GaugechartProperty;
}(canvas_widget_class_1.CanvasWidgetClass));
exports.GaugechartProperty = GaugechartProperty;
var GaugechartDatasource = (function (_super) {
    __extends(GaugechartDatasource, _super);
    function GaugechartDatasource() {
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
    return GaugechartDatasource;
}(datasource_model_1.DatasourceModel));
exports.GaugechartDatasource = GaugechartDatasource;
