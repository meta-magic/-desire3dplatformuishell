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
var TogglePropertyComponent = (function () {
    function TogglePropertyComponent() {
        this.shapeData = {
            data: [
                {
                    shape: 'Round',
                    value: 'round'
                },
                {
                    shape: 'Square',
                    value: 'square'
                }
            ]
        };
    }
    TogglePropertyComponent.prototype.ngOnInit = function () { };
    TogglePropertyComponent.prototype.getShapeData = function (data) {
        this.componentInstance.properties.shape = data.value;
    };
    TogglePropertyComponent.prototype.propertyValidation = function () {
        this.componentInstance._eventHndl.componentValidation(this.componentInstance);
    };
    return TogglePropertyComponent;
}());
TogglePropertyComponent = __decorate([
    core_1.Component({
        selector: 'toggle-property',
        template: "    \n          <amexio-text-input field-label=\"Name\" [(ngModel)]=\"componentInstance.properties.name\"\n          name=\"componentInstance.properties.name\"\n          place-holder=\"Enter name\"\n          icon-feedback=\"true\"\n          (onBlur)=\"propertyValidation()\">\n          </amexio-text-input>\n          <amexio-text-input field-label=\"Field Label\" [(ngModel)]=\"componentInstance.properties.fieldLabel\"\n          name=\"componentInstance.properties.fieldLabel\"\n          place-holder=\"Enter Label\"\n          icon-feedback=\"false\" [allow-blank]=\"true\">\n          </amexio-text-input>\n          <amexio-radio-group [field-label]=\"'Toggle Shape'\"\n          name =\"shape\"\n          [data-reader]=\"'data'\"\n          [display-field]=\"'shape'\"\n          [value-field]=\"'value'\"\n          [default-value]=\"componentInstance.properties.shape\"\n          [data]=\"shapeData\"\n          (onSelection)=\"getShapeData($event)\">\n          </amexio-radio-group>\n       \n     <!-- <amexio-tab [icon]=\"componentInstance._eventHndl._sharedDataService.behaviourIcon\">\n        <ng-container *ngIf=\"componentInstance\">\n          <show-event-list [componentInstance]=\"componentInstance\"></show-event-list>\n        </ng-container>\n      </amexio-tab>-->\n\n  "
    })
], TogglePropertyComponent);
exports.TogglePropertyComponent = TogglePropertyComponent;
