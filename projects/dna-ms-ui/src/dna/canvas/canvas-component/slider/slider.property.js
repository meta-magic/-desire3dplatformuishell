"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
/**
 * Created by dattaram on 23/2/18.
 */
var core_1 = require("@angular/core");
var SliderPropertyComponent = (function () {
    function SliderPropertyComponent() {
        this.orientationData = {
            data: [
                {
                    orientation: 'horizontal',
                    value: 'horizontal'
                },
                {
                    orientation: 'Vertical',
                    value: 'vertical'
                }
            ]
        };
    }
    SliderPropertyComponent.prototype.ngOnInit = function () { };
    SliderPropertyComponent.prototype.getOrientaionData = function (data) {
        this.componentInstance.properties.orientation = data.value;
    };
    SliderPropertyComponent.prototype.propertyValidation = function () {
        this.componentInstance._eventHndl.componentValidation(this.componentInstance);
    };
    return SliderPropertyComponent;
}());
SliderPropertyComponent = __decorate([
    core_1.Component({
        selector: 'slider-property',
        template: "\n\n    <ng-container *ngIf=\"componentInstance\">\n      <amexio-text-input field-label=\"Name\" [(ngModel)]=\"componentInstance.properties.name\"\n                         name=\"componentInstance.properties.name\"\n                         place-holder=\"enter name\"\n                         icon-feedback=\"true\"\n                         (onBlur)=\"propertyValidation()\">\n      </amexio-text-input>\n      <amexio-number-input [field-label]=\"'Min Value'\" name =\"componentInstance.properties.minValue\"\n                           [allow-blank]=\"true\" [(ngModel)]=\"componentInstance.properties.minValue\">\n      </amexio-number-input>\n      <amexio-number-input [field-label]=\"'Max Value'\" name =\"componentInstance.properties.maxValue\"\n                           [allow-blank]=\"true\" [(ngModel)]=\"componentInstance.properties.maxValue\">\n      </amexio-number-input>\n\n      <amexio-number-input [field-label]=\"'Step Value'\" name =\"componentInstance.properties.stepValue\"\n                           [allow-blank]=\"true\" [(ngModel)]=\"componentInstance.properties.stepValue\">\n      </amexio-number-input>\n\n      <amexio-radio-group [field-label]=\"'Orientation'\"\n                          name =\"orientation\"\n                          [data-reader]=\"'data'\"\n                          [display-field]=\"'orientation'\"\n                          [value-field]=\"'value'\"\n                          [default-value]=\"componentInstance.properties.orientation\"\n                          [data]=\"orientationData\"\n                          (onSelection)=\"getOrientaionData($event)\">\n      </amexio-radio-group>\n\n\n      <amexio-checkbox [field-label]=\"'Disabled'\"\n                       [(ngModel)]=\"componentInstance.properties.disabled\">\n      </amexio-checkbox>\n    </ng-container>\n              \n  "
    })
], SliderPropertyComponent);
exports.SliderPropertyComponent = SliderPropertyComponent;
