"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
/**
 * Created by dattaram on 1/3/18.
 */
var core_1 = require("@angular/core");
var DatapointWestPropertyComponent = (function () {
    function DatapointWestPropertyComponent() {
        this.alignment = [];
        this.alignment = [
            {
                type: 'center',
                value: 'center'
            },
            {
                type: 'left',
                value: 'left'
            },
            {
                type: 'right',
                value: 'right'
            },
            {
                type: 'justify',
                value: 'justify'
            }
        ];
    }
    DatapointWestPropertyComponent.prototype.ngOnInit = function () { };
    DatapointWestPropertyComponent.prototype.onNorthChange = function (flag) {
        var _this = this;
        if (!flag) {
            this.componentInstance.children.forEach(function (child) {
                if (child.instance.hasOwnProperty('children') &&
                    child.instance.children.length > 0) {
                    _this.deleteInstances(child.instance.children);
                }
            });
            this.componentInstance.children[0].instance.children.length = 0;
        }
    };
    DatapointWestPropertyComponent.prototype.onEastChange = function (flag) {
        var _this = this;
        if (!flag) {
            this.componentInstance.children.forEach(function (child) {
                if (child.instance.hasOwnProperty('children') &&
                    child.instance.children.length > 0) {
                    _this.deleteInstances(child.instance.children);
                }
            });
            this.componentInstance.children[1].instance.children.length = 0;
        }
    };
    DatapointWestPropertyComponent.prototype.onCenterChange = function (flag) {
        var _this = this;
        if (!flag) {
            this.componentInstance.children.forEach(function (child) {
                if (child.instance.hasOwnProperty('children') &&
                    child.instance.children.length > 0) {
                    _this.deleteInstances(child.instance.children);
                }
            });
            this.componentInstance.children[2].instance.children.length = 0;
        }
    };
    DatapointWestPropertyComponent.prototype.onWestChange = function (flag) {
        var _this = this;
        if (!flag) {
            this.componentInstance.children.forEach(function (child) {
                if (child.instance.hasOwnProperty('children') &&
                    child.instance.children.length > 0) {
                    _this.deleteInstances(child.instance.children);
                }
            });
            this.componentInstance.children[3].instance.children.length = 0;
        }
    };
    DatapointWestPropertyComponent.prototype.onSouthChange = function (flag) {
        var _this = this;
        if (!flag) {
            this.componentInstance.children.forEach(function (child) {
                if (child.instance.hasOwnProperty('children') &&
                    child.instance.children.length > 0) {
                    _this.deleteInstances(child.instance.children);
                }
            });
            this.componentInstance.children[4].instance.children.length = 0;
        }
    };
    DatapointWestPropertyComponent.prototype.deleteInstances = function (child) {
        var _this = this;
        child.forEach(function (innerChild) {
            if (innerChild.instance.hasOwnProperty('children') &&
                innerChild.instance.children.length > 0) {
                _this.deleteInstances(innerChild.instance.children);
                innerChild.destroy();
            }
            else {
                innerChild.destroy();
            }
        });
    };
    return DatapointWestPropertyComponent;
}());
DatapointWestPropertyComponent = __decorate([
    core_1.Component({
        selector: 'datapoint-west-property',
        template: "\n    <ng-container *ngIf=\"componentInstance\">\n      <amexio-text-input field-label=\"Background Color\" [(ngModel)]=\"componentInstance.properties.backgroundColor\"\n                         place-holder=\"background color\"\n                         icon-feedback=\"true\">\n      </amexio-text-input>\n      <amexio-text-input field-label=\"Font Color\" [(ngModel)]=\"componentInstance.properties.fontColor\"\n                         place-holder=\"font color\"\n                         icon-feedback=\"true\">\n      </amexio-text-input>\n      <amexio-dropdown [(ngModel)]=\"componentInstance.properties.contentAlign\"\n                       [place-holder]=\"'Align'\"\n                       [field-label]=\"'Alignment'\"\n                       [data]=\"alignment\"\n                       [display-field]=\"'type'\"\n                       [value-field]=\"'value'\">\n      </amexio-dropdown>\n      <amexio-text-input field-label=\"Width\" [(ngModel)]=\"componentInstance.properties.width\"\n                         place-holder=\"width\"\n                         icon-feedback=\"true\">\n      </amexio-text-input>\n      <amexio-text-input field-label=\"Height\" [(ngModel)]=\"componentInstance.properties.height\"\n                         place-holder=\"height\"\n                         icon-feedback=\"true\">\n      </amexio-text-input>\n\n    </ng-container>\n        \n\n  "
    })
], DatapointWestPropertyComponent);
exports.DatapointWestPropertyComponent = DatapointWestPropertyComponent;
