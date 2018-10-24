"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
/**
 * Created by dattaram on 3/7/18.
 */
var core_1 = require("@angular/core");
var BehaviourComponent = (function () {
    function BehaviourComponent() {
    }
    BehaviourComponent.prototype.enableDatasource = function () {
        if (this.componentInstance) {
            return this.componentInstance.componentBehaviour.hasDataSource;
        }
        else {
            return false;
        }
    };
    BehaviourComponent.prototype.enableRelationship = function () {
        if (this.componentInstance) {
            return this.componentInstance.componentBehaviour.hasRelationship;
        }
        else {
            return false;
        }
    };
    return BehaviourComponent;
}());
BehaviourComponent = __decorate([
    core_1.Component({
        selector: 'behaviour',
        template: "    \n      <ng-container *ngIf=\"enableDatasource()\">\n        <amexio-button [block]=\"true\" label=\"Datasource\" size=\"medium\"   [type]=\"'green'\"  (onClick)=\"componentInstance._eventHndl.createDatasourceInstance(componentInstance)\"></amexio-button>\n      </ng-container>\n      <ng-container *ngIf=\"enableRelationship()\">\n        <show-event-list [componentInstance]=\"componentInstance\" ></show-event-list>\n      </ng-container>\n  "
    })
], BehaviourComponent);
exports.BehaviourComponent = BehaviourComponent;
