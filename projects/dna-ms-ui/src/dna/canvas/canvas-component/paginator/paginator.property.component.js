"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
/**
 * Created by pratik on 28/2/18.
 */
/**
 * Created by pratik on 23/2/18.
 */
var core_1 = require("@angular/core");
var PaginatorPropertyComponent = (function () {
    function PaginatorPropertyComponent() {
    }
    PaginatorPropertyComponent.prototype.ngOnInit = function () { };
    PaginatorPropertyComponent.prototype.propertyValidation = function () {
        this.componentInstance._eventHndl.componentValidation(this.componentInstance);
    };
    return PaginatorPropertyComponent;
}());
PaginatorPropertyComponent = __decorate([
    core_1.Component({
        selector: 'password-field-property',
        template: "\n    \n   <ng-container *ngIf=\"componentInstance\">\n<amexio-text-input field-label=\"Name\" [(ngModel)]=\"componentInstance.properties.name\"\n                   name=\"componentInstance.properties.name\"\n                   place-holder=\"enter name\"\n                   icon-feedback=\"true\" (onBlur)=\"propertyValidation()\">\n</amexio-text-input>\n\n<amexio-number-input [enable-popover]=\"false\" [(ngModel)]=\"componentInstance.properties.pages\"\n                     name=\"componentInstance.properties.pages\"\n                     [field-label]=\"'Pages'\"\n                     [place-holder]=\"'Pages'\"\n                     [allow-blank]=\"false\"\n                     [min-value]=\"1\">\n</amexio-number-input>\n\n<amexio-number-input [enable-popover]=\"false\" [(ngModel)]=\"componentInstance.properties.rows\"\n                     name=\"componentInstance.properties.rows\"\n                     [field-label]=\"'Rows'\"\n                     [place-holder]=\"'rows'\"\n                     [allow-blank]=\"false\"\n                     [min-value]=\"1\">\n</amexio-number-input>\n\n\n</ng-container>\n\n  "
    })
], PaginatorPropertyComponent);
exports.PaginatorPropertyComponent = PaginatorPropertyComponent;
