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
var VerticalTabPropertyComponent = (function () {
    function VerticalTabPropertyComponent() {
    }
    VerticalTabPropertyComponent.prototype.ngOnInit = function () { };
    VerticalTabPropertyComponent.prototype.propertyValidation = function () { };
    VerticalTabPropertyComponent.prototype.onTabAdd = function () {
        this.componentInstance.createComponentConfig();
    };
    VerticalTabPropertyComponent.prototype.onTabRemove = function () {
        this.componentInstance.children.pop();
        this.componentInstance.createLocalData();
    };
    return VerticalTabPropertyComponent;
}());
VerticalTabPropertyComponent = __decorate([
    core_1.Component({
        selector: 'vertical-right-prop',
        template: "    \n            <ng-container *ngIf=\"componentInstance\">\n              <amexio-text-input field-label=\"name\" [(ngModel)]=\"componentInstance.properties.name\"\n                                 name=\"componentInstance.properties.name\"\n                                 place-holder=\"name\"\n                                 icon-feedback=\"true\"\n                                 (onBlur)=\"propertyValidation()\">\n              </amexio-text-input><br>\n              <amexio-button size=\"small\" [label]=\"'Add Tab'\"\n                             [type]=\"'theme-color'\"\n                             (onClick)=\"onTabAdd()\"\n                             [tooltip]=\"'primary'\">\n              </amexio-button>\n              <amexio-button  size=\"small\" [label]=\"'Remove Tab'\"\n                              [type]=\"'theme-color'\"\n                              (onClick)=\"onTabRemove()\"\n                              [tooltip]=\"'remove'\">\n              </amexio-button>\n            </ng-container>\n  "
    })
], VerticalTabPropertyComponent);
exports.VerticalTabPropertyComponent = VerticalTabPropertyComponent;
