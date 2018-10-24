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
var CanvasDataGridColumnComponent = (function (_super) {
    __extends(CanvasDataGridColumnComponent, _super);
    function CanvasDataGridColumnComponent() {
        var _this = _super.call(this) || this;
        _this.name = 'datagridcolumn';
        _this.properties = new DatagridColumnProperties();
        return _this;
    }
    CanvasDataGridColumnComponent.prototype.ngOnInit = function () {
        this.componentId =
            +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
    };
    CanvasDataGridColumnComponent.prototype.ngOnDestroy = function () { };
    return CanvasDataGridColumnComponent;
}(canvas_widget_class_1.CanvasWidgetClass));
CanvasDataGridColumnComponent = __decorate([
    core_1.Component({
        selector: '[column]',
        template: ""
    })
], CanvasDataGridColumnComponent);
exports.CanvasDataGridColumnComponent = CanvasDataGridColumnComponent;
var DatagridColumnProperties = (function () {
    function DatagridColumnProperties() {
        this.isComponentValid = true;
        this.text = 'Name';
        this.hidden = false;
        this.datatype = 'string';
        this.dataindex = '';
        this.width = 10;
    }
    return DatagridColumnProperties;
}());
exports.DatagridColumnProperties = DatagridColumnProperties;
