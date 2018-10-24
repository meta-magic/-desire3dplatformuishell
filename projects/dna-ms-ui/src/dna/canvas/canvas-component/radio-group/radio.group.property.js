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
var RadioGroupPropertyComponent = (function () {
    function RadioGroupPropertyComponent() {
    }
    RadioGroupPropertyComponent.prototype.ngOnInit = function () { };
    RadioGroupPropertyComponent.prototype.propertyValidation = function () {
        this.componentInstance._eventHndl.componentValidation(this.componentInstance);
    };
    return RadioGroupPropertyComponent;
}());
RadioGroupPropertyComponent = __decorate([
    core_1.Component({
        selector: 'radio-group-property',
        template: "\n              <ng-container *ngIf=\"componentInstance\">\n              <amexio-text-input field-label=\"Name\" [(ngModel)]=\"componentInstance.properties.name\"\n                                name=\"componentInstance.properties.name\"\n                                place-holder=\"enter name\"\n                                icon-feedback=\"true\"\n                                (onBlur)=\"propertyValidation()\">\n              </amexio-text-input>\n              <amexio-text-input field-label=\"Field Label\" [(ngModel)]=\"componentInstance.properties.fieldLabel\"\n                                name=\"componentInstance.properties.fieldLabel\"\n                                place-holder=\"enter name\"\n                                icon-feedback=\"false\" [allow-blank]=\"true\">\n              </amexio-text-input>\n\n              <amexio-text-input field-label=\"Group Name\" [(ngModel)]=\"componentInstance.properties.groupName\"\n                                name=\"componentInstance.properties.groupName\"\n                                place-holder=\"group name\"\n                                icon-feedback=\"false\" [allow-blank]=\"true\">\n              </amexio-text-input>\n\n              <amexio-checkbox [field-label]=\"'Horizontal'\"\n                              [(ngModel)]=\"componentInstance.properties.horizontal\">\n              </amexio-checkbox>\n\n\n              <amexio-checkbox [field-label]=\"'Disabled'\"\n                              [(ngModel)]=\"componentInstance.properties.disabled\">\n              </amexio-checkbox>\n\n                <amexio-text-input field-label=\"Display Field\" [(ngModel)]=\"componentInstance.properties.displayField\"\n                                   name=\"componentInstance.properties.displayField\"\n                                   place-holder=\"display field\"\n                                   icon-feedback=\"true\" [allow-blank]=\"true\">\n                </amexio-text-input>\n                <amexio-text-input field-label=\"Value  Field\" [(ngModel)]=\"componentInstance.properties.valueField\"\n                                   name=\"componentInstance.properties.valueField\"\n                                   place-holder=\"value field\"\n                                   icon-feedback=\"false\" [allow-blank]=\"true\">\n                </amexio-text-input>\n              </ng-container>\n "
    })
], RadioGroupPropertyComponent);
exports.RadioGroupPropertyComponent = RadioGroupPropertyComponent;
