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
var ProgressBarPropertyComponent = (function () {
    function ProgressBarPropertyComponent() {
        this.typeData = [];
        this.typeData = [
            {
                type: 'Success',
                value: 'success'
            },
            {
                type: 'Danger',
                value: 'danger'
            },
            {
                type: 'Warning',
                value: 'warning'
            }
        ];
    }
    ProgressBarPropertyComponent.prototype.ngOnInit = function () { };
    ProgressBarPropertyComponent.prototype.propertyValidation = function () {
        this.componentInstance._eventHndl.componentValidation(this.componentInstance);
    };
    return ProgressBarPropertyComponent;
}());
ProgressBarPropertyComponent = __decorate([
    core_1.Component({
        selector: 'progress-property',
        template: "    \n    <ng-container *ngIf=\"componentInstance\">\n      <amexio-text-input field-label=\"Name\" [(ngModel)]=\"componentInstance.properties.name\"\n                         name=\"componentInstance.properties.name\"\n                         place-holder=\"enter name\"\n                         icon-feedback=\"true\"\n                         (onBlur)=\"propertyValidation()\">\n      </amexio-text-input>\n\n      <amexio-text-input field-label=\"Lable\" [(ngModel)]=\"componentInstance.properties.label\"\n                         name=\"componentInstance.properties.label\"\n                         place-holder=\"enter label\">\n      </amexio-text-input>\n\n      <amexio-number-input [field-label]=\"'Height'\" name =\"componentInstance.properties.height\"\n                           [allow-blank]=\"true\" [(ngModel)]=\"componentInstance.properties.height\">\n      </amexio-number-input>\n\n      <amexio-number-input [field-label]=\"'Current Value'\" name =\"componentInstance.properties.currentValue\"\n                           [allow-blank]=\"true\" [(ngModel)]=\"componentInstance.properties.currentValue\">\n      </amexio-number-input>\n\n      <amexio-dropdown [(ngModel)]=\"componentInstance.properties.type\"\n                       [place-holder]=\"'choose type'\"\n                       [field-label]=\"'Progress Type'\"\n                       [data]=\"typeData\"\n                       [display-field]=\"'type'\"\n                       [value-field]=\"'value'\">\n      </amexio-dropdown>\n\n\n      <amexio-checkbox  [field-label]=\"'Show'\"\n                        [(ngModel)]=\"componentInstance.properties.show\">\n      </amexio-checkbox>\n      <amexio-checkbox  [field-label]=\"'Stripped'\"\n                        [(ngModel)]=\"componentInstance.properties.stripped\">\n      </amexio-checkbox>\n      <amexio-checkbox  [field-label]=\"'Infinite'\"\n                        [(ngModel)]=\"componentInstance.properties.infinite\">\n      </amexio-checkbox>\n    </ng-container>\n       \n\n     <!-- <amexio-tab [icon]=\"componentInstance._eventHndl._sharedDataService.behaviourIcon\">\n        <ng-container *ngIf=\"componentInstance\">\n          <show-event-list [componentInstance]=\"componentInstance\"></show-event-list>\n        </ng-container>\n      </amexio-tab>-->\n   \n  "
    })
], ProgressBarPropertyComponent);
exports.ProgressBarPropertyComponent = ProgressBarPropertyComponent;
