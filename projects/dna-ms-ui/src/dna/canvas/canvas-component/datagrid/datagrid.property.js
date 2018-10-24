/**
 * Created by dattaram on 7/3/18.
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
var DatagridPropertyComponent = (function () {
    function DatagridPropertyComponent() {
    }
    DatagridPropertyComponent.prototype.ngOnInit = function () { };
    DatagridPropertyComponent.prototype.propertyValidation = function () {
        this.componentInstance._eventHndl.componentValidation(this.componentInstance);
    };
    DatagridPropertyComponent.prototype.addColumn = function () {
        this.componentInstance.addColumn();
    };
    DatagridPropertyComponent.prototype.removeColumn = function () {
        this.componentInstance.removeColumn();
    };
    return DatagridPropertyComponent;
}());
DatagridPropertyComponent = __decorate([
    core_1.Component({
        selector: 'datagrid-property',
        template: "    \n            <ng-container *ngIf=\"componentInstance\">\n              <amexio-text-input field-label=\"Name\" [(ngModel)]=\"componentInstance.properties.name\"\n                                 name=\"componentInstance.properties.name\"\n                                 place-holder=\"enter name\"\n                                 icon-feedback=\"true\"\n                                 (onBlur)=\"propertyValidation()\">\n              </amexio-text-input>\n              <amexio-text-input field-label=\"Title\" [(ngModel)]=\"componentInstance.properties.title\"\n                                 name=\"componentInstance.properties.title\"\n                                 place-holder=\"title\" (onBlur)=\"componentInstance.properties.fieldLabel = componentInstance.properties.title\"\n                                 icon-feedback=\"false\" [allow-blank]=\"true\">\n              </amexio-text-input>\n              <amexio-number-input [field-label]=\"'Page Size'\" name=\"componentInstance.properties.pageSize\"\n                                   [allow-blank]=\"true\" [(ngModel)]=\"componentInstance.properties.pageSize\">\n              </amexio-number-input>\n              <amexio-number-input [field-label]=\"'Height'\" name=\"componentInstance.properties.height\"\n                                   [allow-blank]=\"true\" [(ngModel)]=\"componentInstance.properties.height\">\n              </amexio-number-input>\n\n\n              <amexio-fieldset [collapsible]=\"false\" title=\"Column\">\n                <amexio-text-input [field-label]=\"'Column Label'\" name=\"componentInstance.columnProperty.text\"\n                                   [place-holder]=\"'label'\"\n                                   [enable-popover]=\"false\"\n                                   [icon-feedback]=\"true\"\n                                   [allow-blank]=\"false\"\n                                   [(ngModel)]=\"componentInstance.columnProperty.text\">\n                </amexio-text-input>\n                <amexio-checkbox [field-label]=\"'Hidden'\"\n                                 [(ngModel)]=\"componentInstance.columnProperty.hidden\">\n                </amexio-checkbox>\n                <amexio-button\n                  [type]=\"'theme-color'\" [size]=\"'small'\"\n                  [tooltip]=\"'Save'\"\n                  [icon]=\"'fa fa-save'\" (onClick)=\"addColumn()\">\n                </amexio-button>\n                <amexio-button\n                  [type]=\"'default'\" [size]=\"'small'\"\n                  [tooltip]=\"'Save'\"\n                  [icon]=\"'fa fa-trash-o'\" (onClick)=\"removeColumn()\">\n                </amexio-button>\n              </amexio-fieldset>\n\n              <amexio-checkbox [field-label]=\"'Column Toggle'\"\n                               [(ngModel)]=\"componentInstance.properties.enableColumnToggle\">\n              </amexio-checkbox>\n              <amexio-checkbox [field-label]=\"'Enable Checkbox'\"\n                               [(ngModel)]=\"componentInstance.properties.enableCheckbox\">\n              </amexio-checkbox>\n              <amexio-checkbox [field-label]=\"'Group By'\"\n                               [(ngModel)]=\"componentInstance.properties.groupBy\">\n              </amexio-checkbox>\n              <amexio-checkbox [field-label]=\"'Enable Filtering'\"\n                               [(ngModel)]=\"componentInstance.properties.enableFiltering\">\n              </amexio-checkbox>\n            </ng-container>\n     <!-- <amexio-tab [icon]=\"componentInstance._eventHndl._sharedDataService.behaviourIcon\">\n        <ng-container *ngIf=\"componentInstance\">\n          <br><amexio-button [block]=\"true\" label=\"Datasource\" size=\"medium\" type=\"primary\" (onClick)=\"componentInstance._eventHndl.createDatasourceInstance(componentInstance)\"></amexio-button>\n          <show-event-list [componentInstance]=\"componentInstance\"></show-event-list>\n        </ng-container>\n      </amexio-tab>-->\n   \n  "
    })
], DatagridPropertyComponent);
exports.DatagridPropertyComponent = DatagridPropertyComponent;
