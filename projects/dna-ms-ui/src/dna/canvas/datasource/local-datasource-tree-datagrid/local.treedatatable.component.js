/*
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Author - Ketan Gote, Pratik Kelwalkar, Dattaram Gawas
 *
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var local_tree_column_1 = require("./local-tree.column");
var CanvasTreeDataTableComponent = (function () {
    function CanvasTreeDataTableComponent() {
        this.selectedRecord = new core_1.EventEmitter();
        this.columns = [];
        this.mask = true;
    }
    CanvasTreeDataTableComponent.prototype.ngOnInit = function () {
        if (this.data) {
            this.previousValue = JSON.parse(JSON.stringify(this.data));
            this.setData(this.data);
        }
    };
    CanvasTreeDataTableComponent.prototype.ngDoCheck = function () {
        if (this.previousData != null &&
            JSON.stringify(this.previousData) != JSON.stringify(this.data)) {
            this.previousData = JSON.parse(JSON.stringify(this.data));
            this.setData(this.data);
        }
        if (JSON.stringify(this.columnPreviewData) !=
            JSON.stringify(this.columndefintion)) {
            this.columnPreviewData = JSON.parse(JSON.stringify(this.columndefintion));
            this.columns = this.columndefintion;
        }
    };
    CanvasTreeDataTableComponent.prototype.ngAfterContentInit = function () {
        if (this.columndefintion) {
            this.columns = this.columndefintion;
            this.columnPreviewData = JSON.parse(JSON.stringify(this.columndefintion));
        }
        else {
            this.createConfig();
        }
    };
    CanvasTreeDataTableComponent.prototype.createConfig = function () {
        var columnRefArray = [];
        columnRefArray = this.columnRef.toArray();
        for (var cr = 0; cr < columnRefArray.length; cr++) {
            var columnConfig = columnRefArray[cr];
            var columnData = void 0;
            if (columnConfig.headerTemplate != null &&
                columnConfig.bodyTemplate != null) {
                columnData = {
                    text: columnConfig.text,
                    dataindex: columnConfig.dataindex,
                    hidden: columnConfig.hidden,
                    datatype: columnConfig.datatype,
                    headerTemplate: columnConfig.headerTemplate,
                    width: columnConfig.width,
                    bodyTemplate: columnConfig.bodyTemplate,
                    editable: columnConfig.editable
                };
            }
            else if (columnConfig.headerTemplate != null &&
                columnConfig.bodyTemplate == null) {
                columnData = {
                    text: columnConfig.text,
                    dataindex: columnConfig.dataindex,
                    hidden: columnConfig.hidden,
                    datatype: columnConfig.datatype,
                    width: columnConfig.width,
                    headerTemplate: columnConfig.headerTemplate,
                    editable: columnConfig.editable
                };
            }
            else if (columnConfig.bodyTemplate != null &&
                columnConfig.headerTemplate == null) {
                columnData = {
                    text: columnConfig.text,
                    dataindex: columnConfig.dataindex,
                    hidden: columnConfig.hidden,
                    datatype: columnConfig.datatype,
                    width: columnConfig.width,
                    bodyTemplate: columnConfig.bodyTemplate,
                    editable: columnConfig.editable
                };
            }
            else if (columnConfig.bodyTemplate == null &&
                columnConfig.headerTemplate == null) {
                columnData = {
                    text: columnConfig.text,
                    dataindex: columnConfig.dataindex,
                    hidden: columnConfig.hidden,
                    width: columnConfig.width,
                    datatype: columnConfig.datatype,
                    editable: columnConfig.editable
                };
            }
            if (columnConfig.summarytype) {
                columnData['summarytype'] = columnConfig.summarytype;
            }
            if (columnConfig.summarycaption) {
                columnData['summarycaption'] = columnConfig.summarycaption;
            }
            this.columns.push(columnData);
        }
    };
    CanvasTreeDataTableComponent.prototype.setData = function (httpResponse) {
        var _this = this;
        var treedata = this.getResponseData(httpResponse);
        this.viewRows = treedata;
        this.viewRows.forEach(function (row, index) {
            _this.viewRows[index].level = 1;
            _this.viewRows[index].expand = false;
        });
        this.mask = false;
    };
    CanvasTreeDataTableComponent.prototype.getResponseData = function (httpResponse) {
        var responsedata = httpResponse;
        if (this.datareader != null) {
            var dr = this.datareader.split('.');
            for (var ir = 0; ir < dr.length; ir++) {
                responsedata = responsedata[dr[ir]];
            }
        }
        else {
            responsedata = httpResponse;
        }
        return responsedata;
    };
    CanvasTreeDataTableComponent.prototype.toogle = function (row, index) {
        row.expanded = !row.expanded;
        if (row.expanded) {
            this.addRows(row, index);
        }
        else {
            this.removeRows(row);
        }
    };
    CanvasTreeDataTableComponent.prototype.addRows = function (row, index) {
        for (var i = 0; i < row.children.length; i++) {
            var node = row.children[i];
            if (!row.level) {
                row.level = 1;
            }
            if (node.children) {
                node.expanded = false;
            }
            node.level = row.level + 1;
            this.viewRows.splice(index + (i + 1), 0, node);
        }
    };
    CanvasTreeDataTableComponent.prototype.removeRows = function (node) {
        for (var i = 0; i < node.children.length; i++) {
            for (var j = 0; j < this.viewRows.length; j++) {
                if (this.viewRows[j] === node.children[i]) {
                    if (node.children[i].children)
                        this.removeRows(node.children[i]);
                    this.viewRows.splice(this.viewRows.indexOf(node.children[i]), 1);
                }
            }
        }
    };
    CanvasTreeDataTableComponent.prototype.setSelectedRow = function (rowData, event) {
        this.selectedRecord.emit(rowData);
    };
    return CanvasTreeDataTableComponent;
}());
__decorate([
    core_1.Input()
], CanvasTreeDataTableComponent.prototype, "data");
__decorate([
    core_1.Input('data-reader')
], CanvasTreeDataTableComponent.prototype, "datareader");
__decorate([
    core_1.Input('http-method')
], CanvasTreeDataTableComponent.prototype, "httpmethod");
__decorate([
    core_1.Input('http-url')
], CanvasTreeDataTableComponent.prototype, "httpurl");
__decorate([
    core_1.Input('column-defintion')
], CanvasTreeDataTableComponent.prototype, "columndefintion");
__decorate([
    core_1.Input()
], CanvasTreeDataTableComponent.prototype, "height");
__decorate([
    core_1.Output()
], CanvasTreeDataTableComponent.prototype, "selectedRecord");
__decorate([
    core_1.ContentChildren(local_tree_column_1.CanvasTreeColumnComponent)
], CanvasTreeDataTableComponent.prototype, "columnRef");
CanvasTreeDataTableComponent = __decorate([
    core_1.Component({
        selector: 'canvas-tree-data-table',
        template: "\n    <div class=\"datatable\">\n      <div class=\"datatable-header\">\n        <ng-container *ngFor=\"let cols of columns;let i = index\">\n          <ng-container *ngIf=\"cols.datatype=='string'\">\n            <div class=\"datatable-col\" [style.width.%]=\"cols.width\" [ngClass]=\"{'header' : i == 0}\">\n              <ng-container *ngIf=\"cols.headerTemplate\">\n                <ng-template  [ngTemplateOutlet]=\"cols.headerTemplate\"\n                              [ngTemplateOutletContext]=\"{column:cols ,index: i}\"></ng-template>\n              </ng-container>\n              <ng-container *ngIf=\"!cols.headerTemplate\">\n                {{cols.text}}\n              </ng-container>\n\n            </div>\n          </ng-container>\n        </ng-container>\n      </div>\n    </div>\n    <div class=\"datatable-height\" [style.height.px]=\"height\">\n    <div class=\"datatable\">\n      <ng-container *ngFor=\"let row of viewRows;let i=index\">\n       <div class=\"datatable-row\"   (click)=\"setSelectedRow(row, $event)\">\n          <ng-container *ngFor=\"let cols of columns;let colIndex = index\">\n            <ng-container *ngIf=\"cols.datatype=='string'\">\n              <div class=\"datatable-col\" [style.width.%]=\"cols.width\" [attr.data-label]=\"cols.text\">\n                <ng-container *ngIf=\"colIndex == 0\">\n              <span [ngStyle]=\"{'padding-left':(20*row.level)+'px'}\">\n                <ng-container *ngIf=\"!row.expanded && row.children\">\n                  <amexio-data-icon key=\"tree_collapse\" (click)=\"toogle(row,i)\"></amexio-data-icon>\n                </ng-container>\n                <ng-container *ngIf=\"row.expanded && row.children\">\n                  <amexio-data-icon key=\"tree_expand\" (click)=\"toogle(row,i)\"></amexio-data-icon>\n                </ng-container>\n                  <ng-container *ngIf=\"cols.bodyTemplate\">\n                <ng-template  [ngTemplateOutlet]=\"cols.bodyTemplate\"\n                              [ngTemplateOutletContext]=\"{ $implicit: { text : row[cols.dataindex] }, row: row , index: i}\"></ng-template>\n                </ng-container>\n                 <ng-container *ngIf=\"row[cols.dataindex]!= null && row[cols.dataindex]!= '' && !cols.bodyTemplate ;else elseBlock\">\n                   <ng-container *ngIf=\"row[cols.editable]\">\n                     <input type=\"text\" [attr.value]=\"row[cols.dataindex]\"/>\n                   </ng-container>\n                   <ng-container *ngIf=\"!row[cols.editable]\">\n                                           <!--<input type=\"text\" [attr.value]=\"row[cols.dataindex]\"/>-->{{row[cols.dataindex]}}\n                   </ng-container>\n                    </ng-container>\n                    <ng-template #elseBlock>\n                      &nbsp;\n                    </ng-template>\n               </span>\n                </ng-container>\n\n                <ng-container *ngIf=\"colIndex > 0\">\n                  <ng-container *ngIf=\"cols.bodyTemplate\">\n                    <ng-template  [ngTemplateOutlet]=\"cols.bodyTemplate\"\n                                  [ngTemplateOutletContext]=\"{ $implicit: { text : row[cols.dataindex] }, row: row, index: i }\"></ng-template>\n                  </ng-container>\n                  <ng-container *ngIf=\"row[cols.dataindex]!= null && row[cols.dataindex]!= '' && !cols.bodyTemplate ;else elseBlock\">\n                   {{row[cols.dataindex]}}\n                  </ng-container>\n                </ng-container>\n              </div>\n            </ng-container>\n          </ng-container>\n\n\n        </div>\n      </ng-container>\n\n\n    </div>\n    </div>\n\n\n  "
    })
], CanvasTreeDataTableComponent);
exports.CanvasTreeDataTableComponent = CanvasTreeDataTableComponent;
