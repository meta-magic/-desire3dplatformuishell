"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var EmailInputPropertyComponent = (function () {
    function EmailInputPropertyComponent() {
    }
    EmailInputPropertyComponent.prototype.ngOnInit = function () { };
    EmailInputPropertyComponent.prototype.propertyValidation = function () {
        this.componentInstance._eventHndl.componentValidation(this.componentInstance);
    };
    return EmailInputPropertyComponent;
}());
EmailInputPropertyComponent = __decorate([
    core_1.Component({
        selector: 'email-input-property',
        template: "\n            <ng-container *ngIf=\"componentInstance\">\n              <amexio-text-input field-label=\"Name\" [(ngModel)]=\"componentInstance.properties.name\"\n                                 name=\"componentInstance.properties.name\"\n                                 place-holder=\"name\"\n                                 icon-feedback=\"true\"\n                                 (onBlur)=\"propertyValidation()\">\n              </amexio-text-input>\n              <amexio-text-input field-label=\"Field Label\" [(ngModel)]=\"componentInstance.properties.fieldLabel\"\n                                 name=\"componentInstance.properties.fieldLabel\"\n                                 place-holder=\"label\"\n                                 icon-feedback=\"false\" [allow-blank]=\"true\">\n              </amexio-text-input>\n              <amexio-text-input field-label=\"Placeholder\" [(ngModel)]=\"componentInstance.properties.placeholder\"\n                                 name=\"componentInstance.properties.fieldLabel\"\n                                 place-holder=\"placeholder\"\n                                 icon-feedback=\"false\" [allow-blank]=\"true\">\n              </amexio-text-input>\n              <amexio-text-input [field-label]=\"'Error Message'\" name =\"componentInstance.properties.errorMsg\"\n                                 [place-holder]=\"'error message'\" [allow-blank]=\"true\" [(ngModel)]=\"componentInstance.properties.errorMsg\">\n              </amexio-text-input>\n              <amexio-text-input [field-label]=\"'Pattern'\" [allow-blank]=\"true\" name =\"componentInstance.properties.pattern\"\n                                 [place-holder]=\"'pattern'\" [(ngModel)]=\"componentInstance.properties.pattern\">\n              </amexio-text-input>\n              <amexio-number-input [field-label]=\"'Font Size'\" [allow-blank]=\"true\"\n                                   place-holder=\"font size\"\n                                   [(ngModel)]=\"componentInstance.properties.fontSize\">\n              </amexio-number-input>\n              <amexio-text-input [field-label]=\"'Font Family'\" [allow-blank]=\"true\" name =\"componentInstance.properties.maxErrorMsg\"\n                                 place-holder=\"font family\"\n                                 [(ngModel)]=\"componentInstance.properties.fontFamily\">\n              </amexio-text-input>\n              <amexio-text-input [field-label]=\"'Font Style'\" [allow-blank]=\"true\" name =\"componentInstance.properties.maxErrorMsg\"\n                                 place-holder=\"font style\"\n                                 [(ngModel)]=\"componentInstance.properties.fontStyle\">\n              </amexio-text-input>\n              <amexio-checkbox    [field-label]=\"'Has Label'\"\n                                  [(ngModel)]=\"componentInstance.properties.hasLabel\">\n              </amexio-checkbox>\n              <amexio-checkbox [field-label]=\"'Allow Blank'\"\n                               [(ngModel)]=\"componentInstance.properties.allowBlank\">\n              </amexio-checkbox>\n              <amexio-checkbox [field-label]=\"'Icon FeedBack'\"\n                               [(ngModel)]=\"componentInstance.properties.iconFeedBack\">\n              </amexio-checkbox>\n              <amexio-checkbox [field-label]=\"'Disabled'\"\n                               [(ngModel)]=\"componentInstance.properties.disabled\">\n              </amexio-checkbox>\n              <amexio-checkbox [field-label]=\"'Enable Popover'\"\n                               [(ngModel)]=\"componentInstance.properties.enablePopOver\">\n              </amexio-checkbox>\n            </ng-container>\n    \n\n  "
    })
], EmailInputPropertyComponent);
exports.EmailInputPropertyComponent = EmailInputPropertyComponent;
