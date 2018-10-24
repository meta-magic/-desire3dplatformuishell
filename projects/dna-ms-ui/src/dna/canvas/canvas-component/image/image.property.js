"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var ImagePropertyComponent = (function () {
    function ImagePropertyComponent() {
    }
    ImagePropertyComponent.prototype.propertyValidation = function () {
        this.componentInstance._eventHndl.componentValidation(this.componentInstance);
    };
    ImagePropertyComponent.prototype.ngOnInit = function () { };
    return ImagePropertyComponent;
}());
ImagePropertyComponent = __decorate([
    core_1.Component({
        selector: 'image-property',
        template: "    \n     <ng-container *ngIf=\"componentInstance\">\n<amexio-text-input field-label=\"Name\" [(ngModel)]=\"componentInstance.properties.name\"\nname=\"componentInstance.properties.name\"\nplace-holder=\"enter name\"\nicon-feedback=\"true\"\n(onBlur)=\"propertyValidation()\">\n</amexio-text-input>\n<amexio-text-input field-label=\"Path\" [(ngModel)]=\"componentInstance.properties.path\"\nname=\"componentInstance.properties.path\"\nplace-holder=\"enter file path\"\nicon-feedback=\"false\" [allow-blank]=\"true\">\n</amexio-text-input>\n\n<amexio-text-input field-label=\"Tooltip\" [(ngModel)]=\"componentInstance.properties.tooltip\"\nname=\"componentInstance.properties.tooltip\"\nplace-holder=\"enter tooltip\"\nicon-feedback=\"false\" [allow-blank]=\"true\">\n</amexio-text-input>\n\n<amexio-text-input field-label=\"Title\" [(ngModel)]=\"componentInstance.properties.title\"\nname=\"componentInstance.properties.title\"\nplace-holder=\"enter title\"\nicon-feedback=\"false\" [allow-blank]=\"true\">\n</amexio-text-input>\n\n<amexio-text-input field-label=\"Height\" [(ngModel)]=\"componentInstance.properties.height\"\nname=\"componentInstance.properties.height\"\nplace-holder=\"enter height\"\nicon-feedback=\"false\" [allow-blank]=\"true\">\n</amexio-text-input>\n\n<amexio-text-input field-label=\"Width\" [(ngModel)]=\"componentInstance.properties.width\"\nname=\"componentInstance.properties.width\"\nplace-holder=\"enter width\"\nicon-feedback=\"false\" [allow-blank]=\"true\">\n</amexio-text-input>\n</ng-container>\n\n\n  "
    })
], ImagePropertyComponent);
exports.ImagePropertyComponent = ImagePropertyComponent;
