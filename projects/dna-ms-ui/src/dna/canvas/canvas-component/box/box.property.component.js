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
var BoxPropertyComponent = (function () {
    function BoxPropertyComponent() {
        this.borderListData = [
            {
                type: 'All',
                value: 'all'
            },
            {
                type: 'Top',
                value: 'top'
            },
            {
                type: 'Bottom',
                value: 'bottom'
            },
            {
                type: 'Left',
                value: 'left'
            },
            {
                type: 'Right',
                value: 'right'
            },
            {
                type: 'Top-Bottom',
                value: 'top-bottom'
            },
            {
                type: 'Left-Right',
                value: 'left-right'
            }
        ];
    }
    BoxPropertyComponent.prototype.propertyValidation = function () {
        this.componentInstance._eventHndl.componentValidation(this.componentInstance);
    };
    BoxPropertyComponent.prototype.ngOnInit = function () { };
    //ON CHECK CLICK
    BoxPropertyComponent.prototype.onCheckClick = function (data) {
        if (data) {
            this.enableBorderField = true;
            this.componentInstance.properties.border = 'left';
        }
        else {
            this.enableBorderField = false;
            this.componentInstance.properties.border = '';
        }
    };
    return BoxPropertyComponent;
}());
BoxPropertyComponent = __decorate([
    core_1.Component({
        selector: 'box-property',
        template: "\n    <ng-container *ngIf=\"componentInstance\">\n                    <amexio-checkbox  [field-label]=\"'Enbale Border'\"\n                    (onSelection)=\"onCheckClick($event)\">\n                    </amexio-checkbox>\n                    <ng-container *ngIf=\"enableBorderField\">\n                    <amexio-dropdown [(ngModel)]=\"componentInstance.properties.border\"\n                    [place-holder]=\"'Border'\"\n                    [field-label]=\"'Border'\"\n                    [data]=\"borderListData\"\n                    [display-field]=\"'type'\"\n                    [value-field]=\"'value'\">\n                    </amexio-dropdown>\n                    </ng-container>\n                    \n                    <amexio-text-input field-label=\"Border Color\" [(ngModel)]=\"componentInstance.properties.borderColor\"\n                                       name=\"componentInstance.properties.borderColor\"\n                                       place-holder=\"Border Color\"\n                                       icon-feedback=\"false\" [allow-blank]=\"true\">\n                    </amexio-text-input>\n                    <amexio-text-input field-label=\"Background Color\" [(ngModel)]=\"componentInstance.properties.backgroundColor\"\n                                       name=\"componentInstance.properties.backgroundColor\"\n                                       place-holder=\"Background Color\"\n                                       icon-feedback=\"false\" [allow-blank]=\"true\">\n                    </amexio-text-input>\n                    <amexio-text-input field-label=\"Box Height\" [(ngModel)]=\"componentInstance.properties.boxHeight\"\n                                       name=\"componentInstance.properties.boxHeight\"\n                                       place-holder=\"Box Height\"\n                                       icon-feedback=\"false\" [allow-blank]=\"true\">\n                    </amexio-text-input>\n                    <amexio-text-input field-label=\"Box Width\" [(ngModel)]=\"componentInstance.properties.boxWidth\"\n                                       name=\"componentInstance.properties.boxWidth\"\n                                       place-holder=\"Box Width\"\n                                       icon-feedback=\"false\" [allow-blank]=\"true\">\n                    </amexio-text-input>\n                    <amexio-checkbox    [field-label]=\"'Padding'\"\n                    [(ngModel)]=\"componentInstance.properties.padding\">\n                    </amexio-checkbox>\n                    </ng-container>\n  "
    })
], BoxPropertyComponent);
exports.BoxPropertyComponent = BoxPropertyComponent;
