"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
/**
 * Created by dattaram on 5/3/18.
 */
var core_1 = require("@angular/core");
var StepboxPropertyComponent = (function () {
    function StepboxPropertyComponent() {
    }
    StepboxPropertyComponent.prototype.ngOnInit = function () { };
    StepboxPropertyComponent.prototype.propertyValidation = function () {
        if (this.componentInstance.properties.name.split(' ').length == 1 &&
            this.componentInstance.properties.name != '') {
            if (this.checkChildBlockValidation()) {
                this.componentInstance.properties.isComponentValid = true;
            }
        }
        else {
            this.componentInstance.properties.isComponentValid = false;
        }
    };
    StepboxPropertyComponent.prototype.addBlock = function () {
        this.componentInstance.createComponentConfig();
        this.checkChildBlockValidation();
    };
    StepboxPropertyComponent.prototype.removeBlock = function () {
        if (this.componentInstance.children.length > 1) {
            this.componentInstance.children.pop();
            this.componentInstance.createLocalData();
        }
    };
    StepboxPropertyComponent.prototype.checkChildBlockValidation = function () {
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
    StepboxPropertyComponent.prototype.onCheckClick = function (data) {
        // this.changeStepBoxStyle();
    };
    StepboxPropertyComponent.prototype.changeStepBoxStyle = function () {
        if (this.componentInstance.properties.index) {
            this.componentInstance.properties.block = false;
            this.componentInstance.properties.icon = false;
        }
        if (this.componentInstance.properties.icon) {
            this.componentInstance.properties.block = false;
            this.componentInstance.properties.index = false;
        }
        if (!this.componentInstance.properties.block) {
            this.componentInstance.properties.block = true;
            this.componentInstance.properties.index = true;
        }
    };
    StepboxPropertyComponent.prototype.onIconOpenWindow = function () {
        this.iconWindow = !this.iconWindow;
    };
    StepboxPropertyComponent.prototype.getSelectedIcon = function (icon) {
        this.componentInstance.blockPropertyObject.icon = icon;
        this.componentInstance.blockPropertyObject.iconClass = icon;
        this.onIconOpenWindow();
    };
    return StepboxPropertyComponent;
}());
StepboxPropertyComponent = __decorate([
    core_1.Component({
        selector: 'stepbox-property',
        template: "\n              <ng-container *ngIf=\"componentInstance && !componentInstance.showBlockProperties\">\n                <amexio-text-input field-label=\"Name\" [(ngModel)]=\"componentInstance.properties.name\"\n                                   name=\"componentInstance.properties.name\"\n                                   place-holder=\"name\"\n                                   icon-feedback=\"true\" (onBlur)=\"propertyValidation()\">\n                </amexio-text-input>\n                <amexio-checkbox  [field-label]=\"'Show Block'\"\n                                  [(ngModel)]=\"componentInstance.properties.block\"\n                                  (onSelection)=\"onCheckClick($event)\">\n                </amexio-checkbox>\n                <amexio-checkbox  [field-label]=\"'Show Index'\"\n                                  [(ngModel)]=\"componentInstance.properties.index\"\n                                  (onSelection)=\"onCheckClick($event)\">\n                </amexio-checkbox>\n                <amexio-checkbox  [field-label]=\"'Show Icon'\"\n                                  [(ngModel)]=\"componentInstance.properties.icon\"\n                                  (onSelection)=\"onCheckClick($event)\">\n                </amexio-checkbox>\n                <amexio-button [label]=\"'Add Block'\"\n                               [type]=\"'primary'\"  [size]=\"'small'\" (onClick)=\"addBlock()\">\n                </amexio-button>\n                <amexio-button [label]=\"'Remove Block'\"\n                               [type]=\"'primary'\"  [size]=\"'small'\" (onClick)=\"removeBlock()\">\n                </amexio-button>\n              </ng-container>\n\n              <ng-container *ngIf=\"componentInstance && componentInstance.showBlockProperties\">\n\n                <amexio-text-input field-label=\"Name\" [(ngModel)]=\"componentInstance.blockPropertyObject.name\"\n                                   (onBlur)=\"propertyValidation()\"\n                                   name=\"componentInstance.blockPropertyObject.name\"\n                                   place-holder=\"name\">\n                </amexio-text-input>\n                <amexio-text-input field-label=\"Label\" [(ngModel)]=\"componentInstance.blockPropertyObject.label\"\n                                   name=\"componentInstance.blockPropertyObject.label\"\n                                   place-holder=\"label\">\n                </amexio-text-input>\n                <amexio-checkbox  [field-label]=\"'Active'\"\n                                  [(ngModel)]=\"componentInstance.blockPropertyObject.active\">\n                </amexio-checkbox>\n                <ng-container *ngIf=\"componentInstance.properties.icon\">\n                <amexio-button [block]=\"true\" label=\"Search Icon\" size=\"medium\" type=\"theme-color\" (onClick)=\"onIconOpenWindow()\"></amexio-button>\n                </ng-container>\n              </ng-container>\n          \n\n      <ng-container *ngIf=\"iconWindow\">\n        <canvas-icon-search [selectedIcon]=\"componentInstance.blockPropertyObject.icon\" [componentInstance]=\"componentInstance\" [iconWindow]=\"iconWindow\" (getSelectedIcon)=\"getSelectedIcon($event)\"></canvas-icon-search>\n      </ng-container>\n    \n  "
    })
], StepboxPropertyComponent);
exports.StepboxPropertyComponent = StepboxPropertyComponent;
