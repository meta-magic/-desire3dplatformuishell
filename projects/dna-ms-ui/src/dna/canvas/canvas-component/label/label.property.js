"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
/**
 * Created by pratik on 23/2/18.
 */
var core_1 = require("@angular/core");
var LabelPropertyComponent = (function () {
    function LabelPropertyComponent() {
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
    LabelPropertyComponent.prototype.ngOnInit = function () { };
    return LabelPropertyComponent;
}());
LabelPropertyComponent = __decorate([
    core_1.Component({
        selector: 'label-property-component',
        template: "\n\n    <ng-container *ngIf=\"componentInstance\">\n    <amexio-text-input field-label=\"Field Label\" [(ngModel)]=\"componentInstance.properties.fieldLabel\"\n                       name=\"componentInstance.properties.fieldLabel\"\n                       place-holder=\"enter label\"\n                       icon-feedback=\"false\" [allow-blank]=\"true\">\n    </amexio-text-input>\n    <amexio-dropdown [(ngModel)]=\"componentInstance.properties.size\"\n                     [place-holder]=\"'choose'\"\n                     name=\"componentInstance.properties.size\"\n                     [data-reader]=\"'data'\"\n                     [field-label]=\"'Choose Size'\"\n                     [data]=\"labelSizeLocalData\"\n                     [display-field]=\"'text'\"\n                     [value-field]=\"'value'\">\n    </amexio-dropdown><br>\n    \n      <label>Font Color :</label>&nbsp;<input type=\"color\" name=\"favcolor\" [(ngModel)]=\"componentInstance.properties.color\"\n                                         name=\"componentInstance.properties.color\">\n    </ng-container>\n "
    })
], LabelPropertyComponent);
exports.LabelPropertyComponent = LabelPropertyComponent;
