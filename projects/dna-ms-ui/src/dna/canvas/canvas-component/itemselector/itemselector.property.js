"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
/**
 * Created by dattaram on 6/3/18.
 */
var core_1 = require("@angular/core");
var ItemSelectorPropertyComponent = (function () {
    function ItemSelectorPropertyComponent() {
    }
    ItemSelectorPropertyComponent.prototype.ngOnInit = function () { };
    ItemSelectorPropertyComponent.prototype.propertyValidation = function () {
        this.componentInstance._eventHndl.componentValidation(this.componentInstance);
    };
    return ItemSelectorPropertyComponent;
}());
ItemSelectorPropertyComponent = __decorate([
    core_1.Component({
        selector: 'item-selector-property',
        template: "\n    <ng-container *ngIf=\"componentInstance\">\n      <amexio-text-input field-label=\"Name\" [(ngModel)]=\"componentInstance.properties.name\"\n                         name=\"componentInstance.properties.name\"\n                         place-holder=\"enter name\"\n                         icon-feedback=\"true\"\n                         (onBlur)=\"propertyValidation()\">\n      </amexio-text-input>\n      <amexio-number-input [field-label]=\"'Height'\" name =\"componentInstance.properties.height\"\n                           [allow-blank]=\"true\" [(ngModel)]=\"componentInstance.properties.height\">\n      </amexio-number-input>\n      <amexio-text-input field-label=\"Display Field\" [(ngModel)]=\"componentInstance.properties.displayField\"\n                         name=\"componentInstance.properties.displayField\"\n                         place-holder=\"display field\"\n                         icon-feedback=\"true\" [allow-blank]=\"true\">\n      </amexio-text-input>\n      <amexio-text-input field-label=\"Value  Field\" [(ngModel)]=\"componentInstance.properties.valueField\"\n                         name=\"componentInstance.properties.valueField\"\n                         place-holder=\"value field\"\n                         icon-feedback=\"false\" [allow-blank]=\"true\">\n      </amexio-text-input>\n\n    </ng-container>\n   \n  "
    })
], ItemSelectorPropertyComponent);
exports.ItemSelectorPropertyComponent = ItemSelectorPropertyComponent;
