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
var AccordionContainerPropertyComponent = (function () {
    function AccordionContainerPropertyComponent() {
    }
    AccordionContainerPropertyComponent.prototype.ngOnInit = function () { };
    AccordionContainerPropertyComponent.prototype.onTabAdd = function () {
        this.componentInstance.createComponentConfig();
    };
    AccordionContainerPropertyComponent.prototype.onTabRemove = function () {
        var pillToDelete = this.componentInstance.tabpillCollection.pop();
        this.componentInstance._eventHndl.deleteComponentRef =
            pillToDelete.componentId;
        this.componentInstance._eventHndl.deleteComponent();
    };
    return AccordionContainerPropertyComponent;
}());
AccordionContainerPropertyComponent = __decorate([
    core_1.Component({
        selector: 'accordion-container-property',
        template: "\n\n    <ng-container *ngIf=\"componentInstance\">\n      <amexio-text-input field-label=\"Name\" [(ngModel)]=\"componentInstance.properties.name\"\n                         name=\"componentInstance.properties.name\"\n                         place-holder=\"enter name\"\n                         icon-feedback=\"true\">\n      </amexio-text-input>\n\n      <amexio-checkbox [field-label]=\"'Expand All'\"\n                       [(ngModel)]=\"componentInstance.properties.expandAll\">\n      </amexio-checkbox>\n\n      <amexio-checkbox [field-label]=\"'Transparent'\"\n                       [(ngModel)]=\"componentInstance.properties.transparent\">\n      </amexio-checkbox>\n\n      <amexio-checkbox [field-label]=\"'Angle Icon'\"\n                       [(ngModel)]=\"componentInstance.properties.angleIcon\">\n      </amexio-checkbox>\n\n\n      <amexio-button size=\"small\" [label]=\"'Add'\"\n                     [type]=\"'primary'\"\n                     (onClick)=\"onTabAdd()\"\n                     [tooltip]=\"'primary'\">\n      </amexio-button>\n      <amexio-button  size=\"small\" [label]=\"'Remove'\"\n                      [type]=\"'warning'\"\n                      (onClick)=\"onTabRemove()\"\n                      [tooltip]=\"'remove'\">\n      </amexio-button>\n    </ng-container>\n\n  "
    })
], AccordionContainerPropertyComponent);
exports.AccordionContainerPropertyComponent = AccordionContainerPropertyComponent;
