"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
/**
 * Created by pratik on 12/3/18.
 */
var core_1 = require("@angular/core");
var AccordionTabPropertyComponent = (function () {
    function AccordionTabPropertyComponent() {
    }
    AccordionTabPropertyComponent.prototype.ngOnInit = function () { };
    AccordionTabPropertyComponent.prototype.updateTitle = function () {
        this.componentInstance.title = this.componentInstance.properties.title;
    };
    AccordionTabPropertyComponent.prototype.setDisabled = function () {
        this.componentInstance.disabled = this.componentInstance.properties.disabled;
    };
    AccordionTabPropertyComponent.prototype.setActive = function () {
        this.componentInstance.active = this.componentInstance.properties.active;
    };
    return AccordionTabPropertyComponent;
}());
AccordionTabPropertyComponent = __decorate([
    core_1.Component({
        selector: 'accordion-pill-property',
        template: "    \n        \n    <ng-container *ngIf=\"componentInstance\">\n      <amexio-text-input field-label=\"name\" [(ngModel)]=\"componentInstance.properties.name\"\n                         place-holder=\"name\"\n                         icon-feedback=\"true\">\n      </amexio-text-input>\n\n      <amexio-text-input field-label=\"Header\" [(ngModel)]=\"componentInstance.properties.header\"\n                         name=\"componentInstance.properties.header\"\n                         place-holder=\"name\"\n                         icon-feedback=\"true\">\n      </amexio-text-input>\n\n      <amexio-checkbox [field-label]=\"'Active'\"\n                       [(ngModel)]=\"componentInstance.properties.active\"\n                       (onSelection)=\"setActive()\">\n      </amexio-checkbox>\n\n      <amexio-checkbox [field-label]=\"'Disabled'\"\n                       [(ngModel)]=\"componentInstance.properties.disabled\"\n                       (onSelection)=\"setDisabled()\">\n      </amexio-checkbox>\n    </ng-container>\n        \n        \n\n      <!--  <amexio-button [label]=\"'Add Tab'\"\n                       [type]=\"'primary'\"\n                       (onClick)=\"onAddTab()\"\n                       [tooltip]=\"'add'\">\n        </amexio-button>\n      \n        <amexio-button [label]=\"'Remove Tab'\"\n                       [type]=\"'primary'\"\n                       [tooltip]=\"'remove'\">\n        </amexio-button>-->\n  "
    })
], AccordionTabPropertyComponent);
exports.AccordionTabPropertyComponent = AccordionTabPropertyComponent;
