"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
/**
 * Created by pratik on 27/2/18.
 */
var core_1 = require("@angular/core");
var ButtonPropertyComponent = (function () {
    function ButtonPropertyComponent() {
        this.typeData = [
            {
                type: 'Default',
                value: 'default'
            },
            {
                type: 'Theme-Color',
                value: 'theme-color'
            },
            {
                type: 'Theme-Backgroundcolor',
                value: 'theme-backgroundcolor'
            },
            {
                type: 'Green',
                value: 'green'
            },
            {
                type: 'Red',
                value: 'red'
            },
            {
                type: 'Yellow',
                value: 'yellow'
            }
        ];
        this.sizeData = [
            {
                type: 'Default',
                value: 'default'
            },
            {
                type: 'Large',
                value: 'large'
            },
            {
                type: 'Small',
                value: 'small'
            },
            {
                type: 'XSmall',
                value: 'xsmall'
            }
        ];
    }
    ButtonPropertyComponent.prototype.ngOnInit = function () { };
    ButtonPropertyComponent.prototype.propertyValidation = function () {
        this.componentInstance._eventHndl.componentValidation(this.componentInstance);
    };
    ButtonPropertyComponent.prototype.setFieldLabel = function () {
        this.componentInstance.properties.fieldLabel = this.componentInstance.properties.label;
    };
    ButtonPropertyComponent.prototype.onIconOpenWindow = function () {
        this.iconWindow = !this.iconWindow;
    };
    ButtonPropertyComponent.prototype.getSelectedIcon = function (icon) {
        this.componentInstance.properties.iconClass = icon;
        this.onIconOpenWindow();
    };
    return ButtonPropertyComponent;
}());
ButtonPropertyComponent = __decorate([
    core_1.Component({
        selector: 'button-property',
        template: "    \n      <ng-container *ngIf=\"componentInstance\">\n      \n      <amexio-text-input field-label=\"Name\" [(ngModel)]=\"componentInstance.properties.name\"\n                         (onBlur)=\"propertyValidation()\"\n                         name=\"componentInstance.properties.name\"\n                         place-holder=\"enter name\">\n      </amexio-text-input>\n      \n      \n      <amexio-text-input field-label=\"Label\" [(ngModel)]=\"componentInstance.properties.label\"\n                         name=\"componentInstance.properties.label\" (onBlur)=\"setFieldLabel()\"\n                         place-holder=\"enter label\">\n      </amexio-text-input>\n      \n      <amexio-text-input field-label=\"Tooltip\" [(ngModel)]=\"componentInstance.properties.tooltip\"\n      name=\"componentInstance.properties.tooltip\"\n      place-holder=\"tooltip\">\n      </amexio-text-input>\n      \n      <amexio-checkbox [field-label]=\"'Disabled'\"\n                       [(ngModel)]=\"componentInstance.properties.disabled\">\n      </amexio-checkbox>\n      \n      <amexio-dropdown [(ngModel)]=\"componentInstance.properties.type\"\n                       [place-holder]=\"'Type'\"\n                       [field-label]=\"'Button Type'\"\n                       [data]=\"typeData\"\n                       [display-field]=\"'type'\"\n                       [value-field]=\"'value'\">\n      </amexio-dropdown>  \n      \n      <amexio-dropdown [(ngModel)]=\"componentInstance.properties.size\"\n                       [place-holder]=\"'Size'\"\n                       [field-label]=\"'Button Size'\"\n                       [data]=\"sizeData\"\n                       [display-field]=\"'type'\"\n                       [value-field]=\"'value'\">\n      </amexio-dropdown><br>\n      \n        <amexio-button [block]=\"true\" label=\"Attach Icon\" size=\"medium\" type=\"green\" (onClick)=\"onIconOpenWindow()\"></amexio-button>\n      \n      </ng-container>\n      <ng-container *ngIf=\"iconWindow\">\n         <canvas-icon-search [selectedIcon]=\"componentInstance.properties.iconClass\" [componentInstance]=\"componentInstance\" [iconWindow]=\"iconWindow\" (getSelectedIcon)=\"getSelectedIcon($event)\"></canvas-icon-search>\n      </ng-container>\n  "
    })
], ButtonPropertyComponent);
exports.ButtonPropertyComponent = ButtonPropertyComponent;
