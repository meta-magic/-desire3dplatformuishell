"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
/**
 * Created by dattaram on 21/2/18.
 */
var core_1 = require("@angular/core");
var ColumnPropertyComponent = (function () {
    function ColumnPropertyComponent() {
        this.maxValue = 1;
    }
    ColumnPropertyComponent.prototype.ngOnInit = function () {
        this.value = this.componentInstance.properties.columnlg;
    };
    ColumnPropertyComponent.prototype.onModelChange = function (event) {
        if (event && event) {
            debugger;
            var currentVal = parseInt(event);
            if (currentVal > this.value) {
                this.componentInstance.increaseColumn(currentVal);
            }
            else {
                this.componentInstance.descreaseColumn(currentVal);
            }
            //this.value = currentVal;
        }
    };
    ColumnPropertyComponent.prototype.getMaxValue = function (param, from) {
        if (param == null) {
            var rowOccupiedSpace_1 = 0;
            // On every render -> Calculate the surronding space left -> maxValue
            if (this.componentInstance != null) {
                if (this.componentInstance.hasOwnProperty('parentComponentRef')) {
                    this.componentInstance.parentComponentRef.children.forEach(function (child, index) {
                        rowOccupiedSpace_1 += parseInt(child.instance.properties.columnlg);
                    });
                }
            }
            var val = 12 - rowOccupiedSpace_1;
            //Assuming that the default init is correct TODO ?
            if (val > this.componentInstance.properties.columnlg) {
                this.maxValue = val;
                this.componentInstance.adjustColumnSize();
                return val;
            }
            else {
                this.componentInstance.adjustColumnSize();
                return this.componentInstance.properties.columnlg;
            }
        }
        else {
            if (this.componentInstance.availableMax == 0) {
                var currentVal = parseInt(param);
                this.previousValue = currentVal;
                if (currentVal > this.previousValue)
                    this.componentInstance.properties.columnlg = currentVal - 1;
                else
                    this.componentInstance.properties.columnlg = currentVal; //on decrease
                this.maxValue = currentVal - 1;
            }
            else {
                this.componentInstance.properties.columnlg = param;
                this.maxValue = this.componentInstance.availableMax - parseInt(param);
                this.componentInstance.availableMax = this.maxValue;
            }
            this.componentInstance.adjustColumnSize();
            return 1;
        }
    };
    return ColumnPropertyComponent;
}());
ColumnPropertyComponent = __decorate([
    core_1.Component({
        selector: 'column-property',
        template: "\n        <ng-container *ngIf=\"componentInstance\">\n          <amexio-number-input [enable-popover]=\"false\" [ngModel]=\"componentInstance.properties.columnlg\"\n                               (ngModelChange)=\"onModelChange($event)\"\n                               name=\"componentInstance.properties.columnlg\"\n                               [field-label]=\"'Column'\"\n                               [place-holder]=\"'column'\"\n                               [allow-blank]=\"true\"\n                               [min-value]=\"1\"\n                               [max-value]=\"12\">\n          </amexio-number-input>\n        </ng-container>\n\n  "
    })
], ColumnPropertyComponent);
exports.ColumnPropertyComponent = ColumnPropertyComponent;
