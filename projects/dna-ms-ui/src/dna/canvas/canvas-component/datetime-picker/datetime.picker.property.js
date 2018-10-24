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
var DateTimePickerPropertyComponent = (function () {
    function DateTimePickerPropertyComponent() {
    }
    DateTimePickerPropertyComponent.prototype.ngOnInit = function () { };
    DateTimePickerPropertyComponent.prototype.onChange = function (event) {
        this.componentInstance.properties.datepicker = event;
        if (!event && !this.componentInstance.properties.timepicker)
            this.componentInstance.properties.timepicker = true;
        if (event && this.componentInstance.properties.timepicker)
            this.componentInstance.properties.timepicker = false;
    };
    DateTimePickerPropertyComponent.prototype.propertyValidation = function () {
        this.componentInstance._eventHndl.componentValidation(this.componentInstance);
    };
    return DateTimePickerPropertyComponent;
}());
DateTimePickerPropertyComponent = __decorate([
    core_1.Component({
        selector: 'datetime-picker-property',
        template: "\n    <ng-container *ngIf=\"componentInstance\">\n\n<amexio-text-input field-label=\"Name\" [(ngModel)]=\"componentInstance.properties.name\"\n                   name=\"componentInstance.properties.name\"\n                   place-holder=\"enter name\"\n                   icon-feedback=\"true\"\n                   (onBlur)=\"propertyValidation()\">\n</amexio-text-input>\n\n<amexio-text-input field-label=\"Label\" [(ngModel)]=\"componentInstance.properties.fieldLabel\"\n                   name=\"componentInstance.properties.fieldLabel\"\n                   place-holder=\"enter label\">\n</amexio-text-input>\n\n<amexio-checkbox [field-label]=\"'Time Picker'\"\n                 [(ngModel)]=\"componentInstance.properties.timepicker\">\n</amexio-checkbox>\n\n<amexio-checkbox [field-label]=\"'Read Only'\"\n                 [(ngModel)]=\"componentInstance.properties.readonly\">\n</amexio-checkbox>\n\n\n</ng-container>\n    \n     <!-- <amexio-tab [icon]=\"componentInstance._eventHndl._sharedDataService.behaviourIcon\">\n        <ng-container *ngIf=\"componentInstance\">\n          <show-event-list [componentInstance]=\"componentInstance\"></show-event-list>\n        </ng-container>\n      </amexio-tab>-->\n  "
    })
], DateTimePickerPropertyComponent);
exports.DateTimePickerPropertyComponent = DateTimePickerPropertyComponent;
