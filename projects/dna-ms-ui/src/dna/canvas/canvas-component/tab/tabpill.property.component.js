"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var TabPillPropertyComponent = (function () {
    function TabPillPropertyComponent() {
    }
    TabPillPropertyComponent.prototype.ngOnInit = function () { };
    TabPillPropertyComponent.prototype.updateTitle = function () {
        this.componentInstance.title = this.componentInstance.properties.title;
    };
    TabPillPropertyComponent.prototype.onTabRemove = function () {
        var _this = this;
        this.componentInstance.parentComponentRef.children.forEach(function (item, index) {
            if (item.instance === _this.componentInstance) {
                _this.componentInstance.parentComponentRef.children.splice(index, 1);
                item.destroy();
                _this.componentInstance.parentComponentRef.createLocalData();
                _this.componentInstance.parentComponentRef.loadComponentProperties();
            }
        });
    };
    TabPillPropertyComponent.prototype.propertyValidation = function () {
        this.componentInstance._eventHndl.componentValidation(this.componentInstance);
    };
    TabPillPropertyComponent.prototype.onIconOpenWindow = function () {
        this.iconWindow = !this.iconWindow;
    };
    TabPillPropertyComponent.prototype.getSelectedIcon = function (icon) {
        this.componentInstance.iconClass = icon;
        this.componentInstance.properties.iconClass = icon;
        this.onIconOpenWindow();
    };
    return TabPillPropertyComponent;
}());
TabPillPropertyComponent = __decorate([
    core_1.Component({
        selector: 'tab-pill-property',
        template: "\n\n    <ng-container *ngIf=\"componentInstance\">\n      <amexio-text-input field-label=\"name\" [(ngModel)]=\"componentInstance.properties.name\"\n                         place-holder=\"name\"\n                         icon-feedback=\"true\" (onBlur)=\"propertyValidation()\">\n      </amexio-text-input>\n\n      <amexio-text-input field-label=\"Title\" [(ngModel)]=\"componentInstance.properties.title\"\n                         place-holder=\"title\"\n                         (input)=\"updateTitle()\"\n                         icon-feedback=\"true\">\n      </amexio-text-input>\n\n\n      <amexio-checkbox [field-label]=\"'Active'\"\n                       [(ngModel)]=\"componentInstance.properties.active\">\n      </amexio-checkbox>\n\n      <amexio-button [block]=\"true\" label=\"Attach Icon\" size=\"medium\" type=\"theme-color\" (onClick)=\"onIconOpenWindow()\"></amexio-button><br>\n      <amexio-button [block]=\"true\" label=\"Remove\" size=\"medium\" type=\"theme-color\" (onClick)=\"onTabRemove()\"></amexio-button>\n\n    </ng-container>\n       \n    <ng-container *ngIf=\"iconWindow\">\n      <canvas-icon-search [selectedIcon]=\"componentInstance.iconClass\" [componentInstance]=\"componentInstance\" [iconWindow]=\"iconWindow\" (getSelectedIcon)=\"getSelectedIcon($event)\"></canvas-icon-search>\n    </ng-container>\n\n  "
    })
], TabPillPropertyComponent);
exports.TabPillPropertyComponent = TabPillPropertyComponent;
