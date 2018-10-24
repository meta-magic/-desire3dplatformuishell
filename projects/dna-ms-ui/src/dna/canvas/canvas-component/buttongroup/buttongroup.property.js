/**
 * Created by dattaram on 28/2/18.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var ButtonGroupPropertyComponent = (function () {
    function ButtonGroupPropertyComponent() {
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
    ButtonGroupPropertyComponent.prototype.ngOnInit = function () { };
    ButtonGroupPropertyComponent.prototype.propertyValidation = function () {
        if (this.componentInstance.properties.name.split(' ').length == 1 &&
            this.componentInstance.properties.name != '') {
            if (this.checkButtonChildButtonValidation()) {
                this.componentInstance.properties.isComponentValid = true;
            }
        }
        else {
            this.componentInstance.properties.isComponentValid = false;
        }
    };
    ButtonGroupPropertyComponent.prototype.addButton = function () {
        this.componentInstance.createComponentConfig();
        this.checkButtonChildButtonValidation();
    };
    ButtonGroupPropertyComponent.prototype.remove = function () {
        if (this.componentInstance.children.length > 1) {
            this.componentInstance.children.pop();
            this.componentInstance.createLocalData();
        }
    };
    ButtonGroupPropertyComponent.prototype.removeButton = function () {
        var _this = this;
        this.componentInstance.children.forEach(function (item, index) {
            if (item.instance.properties === _this.componentInstance.buttonPropertyObject) {
                _this.componentInstance.children.splice(index, 1);
            }
        });
        this.componentInstance.createLocalData();
    };
    ButtonGroupPropertyComponent.prototype.checkButtonChildButtonValidation = function () {
        var status = true;
        this.componentInstance.children.forEach(function (item) {
            if (item.instance.properties.name.split(' ').length == 1 &&
                item.instance.properties.name !== '') {
                item.instance.properties.isComponentValid = true;
            }
            else {
                status = false;
                item.instance.properties.isComponentValid = false;
            }
        });
        if (status) {
            this.componentInstance.properties.isComponentValid = true;
        }
        else {
            this.componentInstance.properties.isComponentValid = false;
        }
        return status;
    };
    ButtonGroupPropertyComponent.prototype.onIconOpenWindow = function () {
        this.iconWindow = !this.iconWindow;
    };
    ButtonGroupPropertyComponent.prototype.getSelectedIcon = function (icon) {
        this.componentInstance.buttonPropertyObject.icon = icon;
        this.componentInstance.buttonPropertyObject.iconClass = icon;
        this.onIconOpenWindow();
    };
    return ButtonGroupPropertyComponent;
}());
ButtonGroupPropertyComponent = __decorate([
    core_1.Component({
        selector: 'button-group-property',
        template: "\n            <ng-container *ngIf=\"componentInstance && !componentInstance.showButtonProperties\">\n              <amexio-text-input field-label=\"Name\" [(ngModel)]=\"componentInstance.properties.name\"\n                                 name=\"componentInstance.properties.name\"\n                                 place-holder=\"enter Name\"\n                                 icon-feedback=\"true\" (onBlur)=\"propertyValidation()\">\n              </amexio-text-input>\n              <amexio-dropdown [(ngModel)]=\"componentInstance.properties.size\"\n                               [place-holder]=\"'Size'\"\n                               [field-label]=\"'Button Size'\"\n                               [data]=\"sizeData\"\n                               [display-field]=\"'type'\"\n                               [value-field]=\"'value'\">\n              </amexio-dropdown>\n              <br>\n              <amexio-button [label]=\"'Add'\"\n                             [type]=\"'primary'\"  [size]=\"'small'\" (onClick)=\"addButton()\">\n              </amexio-button>\n              <amexio-button [label]=\"'Remove'\"\n                             [type]=\"'primary'\"  [size]=\"'small'\" (onClick)=\"remove()\">\n              </amexio-button>\n            </ng-container>\n            <ng-container *ngIf=\"componentInstance.showButtonProperties\">\n              <amexio-text-input field-label=\"Name\" [(ngModel)]=\"componentInstance.buttonPropertyObject.name\"\n                                 (onBlur)=\"propertyValidation()\"\n                                 name=\"componentInstance.buttonPropertyObject.name\"\n                                 place-holder=\"enter name\">\n              </amexio-text-input>\n              <amexio-text-input field-label=\"Label\" [(ngModel)]=\"componentInstance.buttonPropertyObject.label\"\n                                 name=\"componentInstance.buttonPropertyObject.label\"\n                                 place-holder=\"enter label\">\n              </amexio-text-input>\n              <amexio-text-input field-label=\"Tooltip\" [(ngModel)]=\"componentInstance.buttonPropertyObject.tooltip\"\n                                 name=\"componentInstance.properties.tooltip\"\n                                 place-holder=\"enter tooltip\">\n              </amexio-text-input>\n              <amexio-dropdown [(ngModel)]=\"componentInstance.buttonPropertyObject.type\"\n                               [place-holder]=\"'Choose Type'\"\n                               [field-label]=\"'Button Type'\"\n                               [data]=\"typeData\"\n                               [display-field]=\"'type'\"\n                               [value-field]=\"'value'\">\n              </amexio-dropdown>\n              <amexio-checkbox [field-label]=\"'Disabled'\"\n                               [(ngModel)]=\"componentInstance.buttonPropertyObject.disabled\">\n              </amexio-checkbox>\n              <amexio-button [block]=\"true\" label=\"Attach Icon\" size=\"medium\" type=\"theme-color\" (onClick)=\"onIconOpenWindow()\"></amexio-button>\n              <br>\n              <amexio-button [label]=\"'Remove'\"\n                             [type]=\"'theme-color'\"  [size]=\"'medium'\" (onClick)=\"removeButton()\">\n              </amexio-button>\n            </ng-container>\n    \n    <ng-container *ngIf=\"iconWindow\">\n      <canvas-icon-search [componentInstance]=\"componentInstance\" [selectedIcon]=\"componentInstance.buttonPropertyObject.icon\" [iconWindow]=\"iconWindow\"  (getSelectedIcon)=\"getSelectedIcon($event)\"></canvas-icon-search>\n    </ng-container>\n  "
    })
], ButtonGroupPropertyComponent);
exports.ButtonGroupPropertyComponent = ButtonGroupPropertyComponent;
