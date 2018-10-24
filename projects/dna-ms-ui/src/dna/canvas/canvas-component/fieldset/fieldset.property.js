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
var FieldSetPropertyComponent = (function () {
    function FieldSetPropertyComponent() {
    }
    FieldSetPropertyComponent.prototype.ngOnInit = function () { };
    return FieldSetPropertyComponent;
}());
FieldSetPropertyComponent = __decorate([
    core_1.Component({
        selector: 'fieldset-property',
        template: "    \n    <ng-container *ngIf=\"componentInstance\">\n      <amexio-text-input field-label=\"Title\" [(ngModel)]=\"componentInstance.properties.title\"\n                         name=\"componentInstance.properties.title\"\n                         place-holder=\"enter title\"\n                         icon-feedback=\"false\" [allow-blank]=\"true\">\n      </amexio-text-input>\n      <br>\n      <amexio-checkbox [field-label]=\"'Enable Collapsible'\"\n                       [(ngModel)]=\"componentInstance.properties.collapsible\">\n      </amexio-checkbox>\n    </ng-container>\n    \n  "
    })
], FieldSetPropertyComponent);
exports.FieldSetPropertyComponent = FieldSetPropertyComponent;
