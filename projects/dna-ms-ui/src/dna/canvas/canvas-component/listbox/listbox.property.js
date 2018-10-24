"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var ListboxPropertyComponent = (function () {
    function ListboxPropertyComponent() {
    }
    ListboxPropertyComponent.prototype.propertyValidation = function () {
        this.componentInstance._eventHndl.componentValidation(this.componentInstance);
    };
    ListboxPropertyComponent.prototype.ngOnInit = function () { };
    return ListboxPropertyComponent;
}());
ListboxPropertyComponent = __decorate([
    core_1.Component({
        selector: 'listbox-property',
        template: "    \n  <ng-container *ngIf=\"componentInstance\">\n\n                  <amexio-text-input field-label=\"Name\" [(ngModel)]=\"componentInstance.properties.name\"\n                                    name=\"componentInstance.properties.name\"\n                                    place-holder=\"enter name\"\n                                    icon-feedback=\"true\"\n                                    (onBlur)=\"propertyValidation()\">\n                  </amexio-text-input>\n                  <amexio-text-input field-label=\"Title\" [(ngModel)]=\"componentInstance.properties.header\"\n                  name=\"componentInstance.properties.header\"\n                  place-holder=\"enter title\"\n                  icon-feedback=\"true\"\n                  (onBlur)=\"propertyValidation()\">\n                  </amexio-text-input>\n    <amexio-number-input [enable-popover]=\"false\" [(ngModel)]=\"componentInstance.properties.height\"\n                         [field-label]=\"'Height'\"\n                         [place-holder]=\"'height'\"\n                         [allow-blank]=\"true\"\n                         [min-value]=\"1\"\n                         [max-value]=\"1000\">\n    </amexio-number-input>\n                  <amexio-checkbox [field-label]=\"'Enable Filter'\"\n                  [(ngModel)]=\"componentInstance.properties.filter\">\n                  </amexio-checkbox>\n                  <ng-container *ngIf=\"componentInstance.properties.filter\">\n                  <amexio-text-input field-label=\"Search Placeholder\" [(ngModel)]=\"componentInstance.properties.searchPlaceholder\"\n                  name=\"componentInstance.properties.searchPlaceholder\"\n                  place-holder=\"enter search placeholder\"\n                  icon-feedback=\"true\"\n                  (onBlur)=\"propertyValidation()\">\n                  </amexio-text-input>\n                  </ng-container>\n\n\n                  <amexio-checkbox [field-label]=\"'Enable Checkbox'\"\n                  [(ngModel)]=\"componentInstance.properties.enableCheckbox\" >\n                  </amexio-checkbox>\n                  </ng-container>\n     <!-- <amexio-tab [icon]=\"componentInstance._eventHndl._sharedDataService.behaviourIcon\">\n        <ng-container *ngIf=\"componentInstance\">\n          <br><amexio-button [block]=\"true\" label=\"Datasource\" size=\"medium\" type=\"primary\" (onClick)=\"componentInstance._eventHndl.createDatasourceInstance(componentInstance)\"></amexio-button>\n\n          <show-event-list [componentInstance]=\"componentInstance\"></show-event-list>\n        </ng-container>\n      </amexio-tab>-->\n\n\n  "
    })
], ListboxPropertyComponent);
exports.ListboxPropertyComponent = ListboxPropertyComponent;
