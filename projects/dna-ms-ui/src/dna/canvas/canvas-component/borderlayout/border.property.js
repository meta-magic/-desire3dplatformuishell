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
var BorderPropertyComponent = (function () {
    function BorderPropertyComponent() {
    }
    BorderPropertyComponent.prototype.ngOnInit = function () { };
    BorderPropertyComponent.prototype.onNorthChange = function (flag) {
        var _this = this;
        if (!flag) {
            this.componentInstance.northInstance.instance.children.forEach(function (child) {
                if (child.instance.hasOwnProperty('children') &&
                    child.instance.children.length > 0) {
                    _this.deleteInstances(child.instance.children);
                }
            });
            this.componentInstance.children[0].instance.children.length = 0;
        }
    };
    BorderPropertyComponent.prototype.onEastChange = function (flag) {
        var _this = this;
        if (!flag) {
            this.componentInstance.eastInstance.instance.children.forEach(function (child) {
                if (child.instance.hasOwnProperty('children') &&
                    child.instance.children.length > 0) {
                    _this.deleteInstances(child.instance.children);
                }
            });
            this.componentInstance.children[1].instance.children.length = 0;
        }
    };
    BorderPropertyComponent.prototype.onCenterChange = function (flag) {
        var _this = this;
        if (!flag) {
            this.componentInstance.centerInstance.instance.children.forEach(function (child) {
                if (child.instance.hasOwnProperty('children') &&
                    child.instance.children.length > 0) {
                    _this.deleteInstances(child.instance.children);
                }
            });
            this.componentInstance.children[2].instance.children.length = 0;
        }
    };
    BorderPropertyComponent.prototype.onWestChange = function (flag) {
        var _this = this;
        if (!flag) {
            this.componentInstance.westInstance.instance.children.forEach(function (child) {
                if (child.instance.hasOwnProperty('children') &&
                    child.instance.children.length > 0) {
                    _this.deleteInstances(child.instance.children);
                }
            });
            this.componentInstance.children[3].instance.children.length = 0;
        }
    };
    BorderPropertyComponent.prototype.onSouthChange = function (flag) {
        var _this = this;
        if (!flag) {
            this.componentInstance.southInstance.instance.children.forEach(function (child) {
                if (child.instance.hasOwnProperty('children') &&
                    child.instance.children.length > 0) {
                    _this.deleteInstances(child.instance.children);
                }
            });
            this.componentInstance.children[4].instance.children.length = 0;
        }
    };
    BorderPropertyComponent.prototype.deleteInstances = function (child) {
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
    return BorderPropertyComponent;
}());
BorderPropertyComponent = __decorate([
    core_1.Component({
        selector: 'border-property',
        template: "\n    <ng-container *ngIf=\"componentInstance\">\n      <amexio-checkbox  [field-label]=\"'North'\"\n                        [(ngModel)]=\"componentInstance?.properties.north\" (ngModelChange)=\"onNorthChange($event)\">\n      </amexio-checkbox>\n      <amexio-checkbox  [field-label]=\"'East'\"\n                        [(ngModel)]=\"componentInstance?.properties.east\" (ngModelChange)=\"onEastChange($event)\">\n      </amexio-checkbox>\n      <amexio-checkbox  [field-label]=\"'Center'\"\n                        [(ngModel)]=\"componentInstance?.properties.center\" (ngModelChange)=\"onCenterChange($event)\">\n      </amexio-checkbox>\n      <amexio-checkbox  [field-label]=\"'West'\"\n                        [(ngModel)]=\"componentInstance?.properties.west\" (ngModelChange)=\"onWestChange($event)\">\n      </amexio-checkbox>\n      <amexio-checkbox  [field-label]=\"'South'\"\n                        [(ngModel)]=\"componentInstance.properties.south\" (ngModelChange)=\"onSouthChange($event)\">\n      </amexio-checkbox>\n    </ng-container>\n    \n  "
    })
], BorderPropertyComponent);
exports.BorderPropertyComponent = BorderPropertyComponent;
