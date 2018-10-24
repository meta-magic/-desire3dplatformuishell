"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var CheckBoxGroupPropertyComponent = (function () {
    function CheckBoxGroupPropertyComponent() {
    }
    CheckBoxGroupPropertyComponent.prototype.ngOnInit = function () { };
    CheckBoxGroupPropertyComponent.prototype.propertyValidation = function () {
        this.componentInstance._eventHndl.componentValidation(this.componentInstance);
    };
    return CheckBoxGroupPropertyComponent;
}());
CheckBoxGroupPropertyComponent = __decorate([
    core_1.Component({
        selector: 'checkbox-group-property',
        template: "    \n      <ng-container *ngIf=\"componentInstance\">\n      \n      <amexio-text-input field-label=\"Name\" [(ngModel)]=\"componentInstance.properties.name\"\n                         name=\"componentInstance.properties.name\"\n                         place-holder=\"enter name\"\n                         icon-feedback=\"true\"\n                         (onBlur)=\"propertyValidation()\"\n                         [allow-blank]=\"false\">\n      </amexio-text-input>\n      \n      <amexio-text-input field-label=\"Label\" [(ngModel)]=\"componentInstance.properties.fieldLabel\"\n                         name=\"componentInstance.properties.fieldLabel\"\n                         place-holder=\"enter label\">\n      </amexio-text-input>\n      \n      <amexio-checkbox [field-label]=\"'Horizontal'\"\n                       [(ngModel)]=\"componentInstance.properties.horizontal\">\n      </amexio-checkbox>\n\n        <amexio-text-input field-label=\"Display Field\" [(ngModel)]=\"componentInstance.properties.displayField\"\n                           name=\"componentInstance.properties.displayField\"\n                           place-holder=\"display field\"\n                           icon-feedback=\"true\" [allow-blank]=\"true\">\n        </amexio-text-input>\n        <amexio-text-input field-label=\"Value  Field\" [(ngModel)]=\"componentInstance.properties.valueField\"\n                           name=\"componentInstance.properties.valueField\"\n                           place-holder=\"value field\"\n                           icon-feedback=\"false\" [allow-blank]=\"true\">\n        </amexio-text-input>\n      \n      </ng-container>\n   \n   \n "
    })
], CheckBoxGroupPropertyComponent);
exports.CheckBoxGroupPropertyComponent = CheckBoxGroupPropertyComponent;
