"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
/**
 * Created by dattaram on 23/2/18.
 */
var core_1 = require("@angular/core");
var RatingPropertyComponent = (function () {
    function RatingPropertyComponent() {
        this.titleData = [];
        this.showTitleWindow = false;
    }
    RatingPropertyComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.componentInstance.properties.titles.length > 0) {
            this.componentInstance.properties.titles.forEach(function (opt) {
                var obj;
                obj = {};
                obj['text'] = opt;
                _this.titleData.push(obj);
            });
        }
        else {
            this.createTitleData();
        }
    };
    RatingPropertyComponent.prototype.propertyValidation = function () {
        this.componentInstance._eventHndl.componentValidation(this.componentInstance);
    };
    RatingPropertyComponent.prototype.onMaxChange = function () {
        this.createTitleData();
    };
    RatingPropertyComponent.prototype.createTitleData = function () {
        this.titleData = [];
        for (var i = 1; i <= this.componentInstance.properties.max; i++) {
            var obj = void 0;
            obj = {};
            obj['text'] = 'title' + i;
            this.titleData.push(obj);
        }
    };
    RatingPropertyComponent.prototype.onTitleSave = function () {
        var _this = this;
        this.componentInstance.properties.titles = [];
        this.titleData.forEach(function (opt) {
            _this.componentInstance.properties.titles.push(opt.text);
        });
        this.showTitleWindow = !this.showTitleWindow;
    };
    return RatingPropertyComponent;
}());
RatingPropertyComponent = __decorate([
    core_1.Component({
        selector: 'rating-property',
        template: "    \n    <ng-container *ngIf=\"componentInstance\">\n      <amexio-text-input field-label=\"Name\" [(ngModel)]=\"componentInstance.properties.name\"\n                         name=\"componentInstance.properties.name\"\n                         place-holder=\"name\"\n                         icon-feedback=\"true\"\n                         (onBlur)=\"propertyValidation()\">\n      </amexio-text-input>\n      <amexio-text-input field-label=\"Field Label\" [(ngModel)]=\"componentInstance.properties.fieldLabel\"\n                         name=\"componentInstance.properties.fieldLabel\"\n                         place-holder=\"label\"\n                         icon-feedback=\"false\" [allow-blank]=\"true\">\n      </amexio-text-input>\n      <amexio-text-input field-label=\"Full Icon\" [(ngModel)]=\"componentInstance.properties.fullIcon\"\n                         name=\"componentInstance.properties.fullIcon\"\n                         place-holder=\"full icon\"\n                         icon-feedback=\"false\" [allow-blank]=\"true\">\n      </amexio-text-input>\n      <amexio-text-input field-label=\"Empty Icon\" [(ngModel)]=\"componentInstance.properties.emptyIcon\"\n                         name=\"componentInstance.properties.emptyIcon\"\n                         place-holder=\"empty icon\"\n                         icon-feedback=\"false\" [allow-blank]=\"true\">\n      </amexio-text-input>\n      <amexio-number-input [field-label]=\"'Max Rating'\" name =\"componentInstance.properties.max\"\n                           place-holder=\"max rating\" (change)=\"onMaxChange()\"\n                           [allow-blank]=\"true\" [(ngModel)]=\"componentInstance.properties.max\">\n      </amexio-number-input>\n      <amexio-checkbox  [field-label]=\"'Disabled'\"\n                        [(ngModel)]=\"componentInstance.properties.disabled\">\n      </amexio-checkbox>\n      <amexio-checkbox  [field-label]=\"'Readonly'\"\n                        [(ngModel)]=\"componentInstance.properties.readonly\">\n      </amexio-checkbox>\n      <amexio-checkbox  [field-label]=\"'Required'\"\n                        [(ngModel)]=\"componentInstance.properties.required\">\n      </amexio-checkbox>\n\n      <amexio-button [block]=\"true\" label=\"Add Titles\" size=\"medium\" [type]=\"'theme-color'\" (onClick)=\"showTitleWindow = !showTitleWindow\"></amexio-button>\n\n    </ng-container>\n\n    \n    <ng-container *ngIf=\"showTitleWindow\">\n      <amexio-window [show-window]=\"showTitleWindow\"\n                     type=\"window\" [closable]=\"true\" [footer]=\"true\">\n        <amexio-header>\n          Add Titles\n        </amexio-header>\n        <amexio-body>\n          <amexio-row>\n            <amexio-column [size]=\"6\"  *ngFor=\"let data of titleData\">\n              <amexio-text-input     [(ngModel)]=\"data.text\"\n                                     [place-holder]=\"'title'\"\n                                     [icon-feedback]=\"false\"\n                                     [allow-blank]=\"true\">\n              </amexio-text-input>\n            </amexio-column>\n          </amexio-row>\n        </amexio-body>\n        <amexio-action>\n          <amexio-button [label]=\"'Cancel'\" [type]=\"'theme-color'\" (onClick)=\"showTitleWindow = !showTitleWindow\"></amexio-button>\n          <amexio-button [label]=\"'Save'\" [type]=\"'theme-color'\" (onClick)=\"onTitleSave();\"></amexio-button>\n        </amexio-action>\n      </amexio-window>\n\n    </ng-container>\n    \n    \n  "
    })
], RatingPropertyComponent);
exports.RatingPropertyComponent = RatingPropertyComponent;
