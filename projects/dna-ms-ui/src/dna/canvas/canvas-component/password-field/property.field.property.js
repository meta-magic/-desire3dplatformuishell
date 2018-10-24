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
var PasswordPropertyComponent = (function () {
    function PasswordPropertyComponent() {
    }
    PasswordPropertyComponent.prototype.ngOnInit = function () { };
    PasswordPropertyComponent.prototype.propertyValidation = function () {
        this.componentInstance._eventHndl.componentValidation(this.componentInstance);
    };
    return PasswordPropertyComponent;
}());
PasswordPropertyComponent = __decorate([
    core_1.Component({
        selector: 'password-field-property',
        template: "    \n   <ng-container *ngIf=\"componentInstance\">\n<amexio-text-input field-label=\"Name\" [(ngModel)]=\"componentInstance.properties.name\"\n                   name=\"componentInstance.properties.name\"\n                   place-holder=\"name\"\n                   icon-feedback=\"true\" (onBlur)=\"propertyValidation()\">\n</amexio-text-input>\n<amexio-text-input field-label=\"Label\" [(ngModel)]=\"componentInstance.properties.fieldLabel\"\n                   name=\"componentInstance.properties.fieldLabel\"\n                   place-holder=\"label\">\n</amexio-text-input>\n<amexio-text-input field-label=\"Placeholder\" [(ngModel)]=\"componentInstance.properties.placeholder\"\n                   name=\"componentInstance.properties.fieldLabel\"\n                   place-holder=\"placeholder\" [allow-blank]=\"true\">\n</amexio-text-input>\n\n\n\n\n<amexio-text-input [field-label]=\"'Error Message'\" name =\"componentInstance.properties.errorMsg\"\n                   [place-holder]=\"'error message'\" [allow-blank]=\"true\" [(ngModel)]=\"componentInstance.properties.errorMsg\">\n</amexio-text-input>\n\n<amexio-number-input [field-label]=\"'Min Length'\" name =\"componentInstance.properties.minLength\"\n                     [place-holder]=\"'min length'\"\n                     [allow-blank]=\"true\" [(ngModel)]=\"componentInstance.properties.minLength\">\n</amexio-number-input>\n\n<amexio-text-input [field-label]=\"'Min Error Message'\" [allow-blank]=\"true\" name =\"componentInstance.properties.minErrorMsg\"\n                   [place-holder]=\"'min error message'\" [(ngModel)]=\"componentInstance.properties.minErrorMsg\">\n</amexio-text-input>\n\n<amexio-number-input [field-label]=\"'Max Length'\"\n                     [place-holder]=\"'max length'\" [allow-blank]=\"true\" name =\"componentInstance.properties.maxLength\" \n                     [(ngModel)]=\"componentInstance.properties.maxLength\">\n</amexio-number-input>\n\n<amexio-text-input [field-label]=\"'Max Error Message'\" [allow-blank]=\"true\" name =\"componentInstance.properties.maxErrorMsg\"\n                   [place-holder]=\"'max error message'\" [(ngModel)]=\"componentInstance.properties.maxErrorMsg\">\n</amexio-text-input>\n\n<amexio-number-input [field-label]=\"'Font Size'\"  [place-holder]=\"'font size'\" [allow-blank]=\"true\" name =\"componentInstance.properties.maxErrorMsg\"\n                   [(ngModel)]=\"componentInstance.properties.fontSize\">\n</amexio-number-input>\n\n<amexio-text-input [field-label]=\"'Font Family'\"\n                   [place-holder]=\"'font family'\" [allow-blank]=\"true\" name =\"componentInstance.properties.maxErrorMsg\"\n                   [(ngModel)]=\"componentInstance.properties.fontFamily\">\n</amexio-text-input>\n\n<amexio-text-input [field-label]=\"'Font Style'\"  [place-holder]=\"'font style'\" [allow-blank]=\"true\" name =\"componentInstance.properties.fontStyle\"\n                   [(ngModel)]=\"componentInstance.properties.fontStyle\">\n</amexio-text-input>\n\n\n<amexio-checkbox    [field-label]=\"'Has Label'\"\n                    [(ngModel)]=\"componentInstance.properties.hasLabel\">\n</amexio-checkbox>\n<amexio-checkbox [field-label]=\"'Allow Blank'\"\n                 [(ngModel)]=\"componentInstance.properties.allowBlank\">\n</amexio-checkbox>\n<amexio-checkbox [field-label]=\"'Icon FeedBack'\"\n                 [(ngModel)]=\"componentInstance.properties.iconFeedBack\">\n</amexio-checkbox>\n\n<amexio-checkbox [field-label]=\"'Disabled'\"\n                 [(ngModel)]=\"componentInstance.properties.disabled\">\n</amexio-checkbox>\n\n<amexio-checkbox [field-label]=\"'Enable Popover'\"\n                 [(ngModel)]=\"componentInstance.properties.enablePopOver\">\n</amexio-checkbox>\n\n\n\n</ng-container>\n <!--    <amexio-tab [icon]=\"componentInstance._eventHndl._sharedDataService.behaviourIcon\">\n       <ng-container *ngIf=\"componentInstance\">\n         <show-event-list [componentInstance]=\"componentInstance\"></show-event-list>\n       </ng-container>\n     </amexio-tab>-->\n \n "
    })
], PasswordPropertyComponent);
exports.PasswordPropertyComponent = PasswordPropertyComponent;
