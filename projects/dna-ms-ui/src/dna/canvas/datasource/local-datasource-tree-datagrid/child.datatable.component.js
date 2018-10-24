"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
/**
 * Created by dattaram on 12/3/18.
 */
var core_1 = require("@angular/core");
var CanvasChildtreeDataTableComponent = (function () {
    function CanvasChildtreeDataTableComponent() {
    }
    CanvasChildtreeDataTableComponent.prototype.ngOnInit = function () { };
    return CanvasChildtreeDataTableComponent;
}());
__decorate([
    core_1.Input()
], CanvasChildtreeDataTableComponent.prototype, "data");
CanvasChildtreeDataTableComponent = __decorate([
    core_1.Component({
        selector: 'canvas-childtree-data-table',
        template: "\n    <ng-container *ngFor=\"let row of data;let i=index\">\n      <div class=\"datatable-row\"   (click)=\"setSelectedRow(row, $event)\">\n        <ng-container *ngFor=\"let cols of columns;let colIndex = index\">\n          <ng-container *ngIf=\"cols.datatype=='string'\">\n            <div class=\"datatable-col\" [attr.data-label]=\"cols.text\">\n              <ng-container *ngIf=\"colIndex == 0\">\n              <span [ngStyle]=\"{'padding-left':(20*row.level)+'px'}\">\n                <ng-container *ngIf=\"!row.expanded && row.children\">\n                  <amexio-data-icon key=\"tree_collapse\" (click)=\"toogle(row,i)\"></amexio-data-icon>\n                </ng-container>\n                <ng-container *ngIf=\"row.expanded && row.children\">\n                  <amexio-data-icon key=\"tree_expand\" (click)=\"toogle(row,i)\"></amexio-data-icon>\n                </ng-container>\n                  <ng-container *ngIf=\"cols.bodyTemplate\">\n                <ng-template  [ngTemplateOutlet]=\"cols.bodyTemplate\"\n                              [ngTemplateOutletContext]=\"{ $implicit: { text : row[cols.dataindex] }, row: row }\"></ng-template>\n                </ng-container>\n                 <ng-container *ngIf=\"row[cols.dataindex]!= null && row[cols.dataindex]!= '' && !cols.bodyTemplate ;else elseBlock\">\n                   <ng-container *ngIf=\"row[cols.editable]\">\n                     <input type=\"text\" [attr.value]=\"row[cols.dataindex]\"/>\n                   </ng-container>\n                   <ng-container *ngIf=\"!row[cols.editable]\">\n                                           <!--<input type=\"text\" [attr.value]=\"row[cols.dataindex]\"/>-->{{row[cols.dataindex]}}\n                   </ng-container>\n                    </ng-container>\n                    <ng-template #elseBlock>\n                      &nbsp;\n                    </ng-template>\n               </span>\n              </ng-container>\n\n              <ng-container *ngIf=\"colIndex > 0\">\n                <ng-container *ngIf=\"cols.bodyTemplate\">\n                  <ng-template  [ngTemplateOutlet]=\"cols.bodyTemplate\"\n                                [ngTemplateOutletContext]=\"{ $implicit: { text : row[cols.dataindex] }, row: row }\"></ng-template>\n                </ng-container>\n                <ng-container *ngIf=\"row[cols.dataindex]!= null && row[cols.dataindex]!= '' && !cols.bodyTemplate ;else elseBlock\">\n                  {{row[cols.dataindex]}}\n                </ng-container>\n              </ng-container>\n            </div>\n          </ng-container>\n        </ng-container>\n\n\n      </div>\n\n      <ng-container *ngIf=\"row.children && row.children.length > 1\">\n        <canvas-childtree-data-table [data]=\"row.children\"></canvas-childtree-data-table>\n      </ng-container>\n    </ng-container>\n   \n  "
    })
], CanvasChildtreeDataTableComponent);
exports.CanvasChildtreeDataTableComponent = CanvasChildtreeDataTableComponent;
