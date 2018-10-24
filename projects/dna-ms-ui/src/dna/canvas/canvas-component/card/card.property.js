"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
/**
 * Created by dattaram on 1/3/18.
 */
var core_1 = require("@angular/core");
var CardPropertyComponent = (function () {
    function CardPropertyComponent() {
        this.alignData = [
            {
                type: 'Right',
                value: 'right'
            },
            {
                type: 'Center',
                value: 'center'
            },
            {
                type: 'Left',
                value: 'left'
            }
        ];
        this.labelSizeLocalData = {
            data: [
                {
                    text: 'Large',
                    value: 'large'
                },
                {
                    text: 'Medium',
                    value: 'medium'
                },
                {
                    text: 'Small',
                    value: 'small'
                },
                {
                    text: 'Bold',
                    value: 'bold'
                },
                {
                    text: 'Large Bold',
                    value: 'large-bold'
                },
                {
                    text: 'Medium Bold',
                    value: 'medium-bold'
                },
                {
                    text: 'Small Bold',
                    value: 'small-bold'
                }
            ]
        };
    }
    CardPropertyComponent.prototype.ngOnInit = function () { };
    return CardPropertyComponent;
}());
CardPropertyComponent = __decorate([
    core_1.Component({
        selector: 'card-property',
        template: "\n    <ng-container *ngIf=\"componentInstance\">\n        <ng-container *ngIf=\"!componentInstance.properties.customHeader\">\n          <amexio-text-input [enable-popover]=\"false\" [(ngModel)]=\"componentInstance.properties.header\"\n                             [field-label]=\"'Header'\"\n                             [place-holder]=\"'header'\"\n                             [allow-blank]=\"true\">\n          </amexio-text-input>\n          <amexio-dropdown [(ngModel)]=\"componentInstance.properties.size\"\n                           [place-holder]=\"'choose'\"\n                           name=\"componentInstance.properties.size\"\n                           [data-reader]=\"'data'\"\n                           [field-label]=\"'Choose Size'\"\n                           [data]=\"labelSizeLocalData\"\n                           [display-field]=\"'text'\"\n                           [value-field]=\"'value'\">\n          </amexio-dropdown><br>\n          <div>\n            <label>Font Color :</label>&nbsp;<input\n            type=\"color\" name=\"favcolor\"\n            [(ngModel)]=\"componentInstance.properties.color\"\n            name=\"componentInstance.properties.color\">\n          </div>\n          <br>\n        </ng-container>\n        <amexio-number-input [enable-popover]=\"false\" [(ngModel)]=\"componentInstance.properties.height\"\n                             [field-label]=\"'Height'\"\n                             [place-holder]=\"'height'\"\n                             [allow-blank]=\"true\"\n                             [min-value]=\"1\"\n                             [max-value]=\"100\">\n        </amexio-number-input>\n        <amexio-dropdown [(ngModel)]=\"componentInstance.properties.headerAlign\"\n                         [place-holder]=\"'select'\"\n                         [field-label]=\"'Header Alignment'\"\n                         [data]=\"alignData\"\n                         [display-field]=\"'type'\"\n                         [value-field]=\"'value'\">\n        </amexio-dropdown>\n        <amexio-dropdown [(ngModel)]=\"componentInstance.properties.footerAlign\"\n                         [place-holder]=\"'select'\"\n                         [field-label]=\"'Footer Alignment'\"\n                         [data]=\"alignData\"\n                         [display-field]=\"'type'\"\n                         [value-field]=\"'value'\">\n        </amexio-dropdown>\n        <amexio-checkbox [field-label]=\"'Custom Header'\"\n                          [(ngModel)]=\"componentInstance.properties.customHeader\">\n        </amexio-checkbox>\n        \n        <amexio-checkbox [field-label]=\"'Show'\"\n                          [(ngModel)]=\"componentInstance.properties.show\">\n        </amexio-checkbox>\n      <amexio-checkbox  [field-label]=\"'Enable Header'\"\n      [(ngModel)]=\"componentInstance.properties.enableHeader\">\n      </amexio-checkbox>\n      <amexio-checkbox  [field-label]=\"'Enable Footer'\"\n      [(ngModel)]=\"componentInstance.properties.enableFooter\">\n      </amexio-checkbox>\n    </ng-container>\n  "
    })
], CardPropertyComponent);
exports.CardPropertyComponent = CardPropertyComponent;
