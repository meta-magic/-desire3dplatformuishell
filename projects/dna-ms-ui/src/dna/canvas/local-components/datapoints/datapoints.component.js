/**
 * Created by pratik on 16/3/18.
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
var CanvasLocalDataPointsComponent = (function () {
    function CanvasLocalDataPointsComponent() {
        this.colspan = 1;
    }
    CanvasLocalDataPointsComponent.prototype.ngOnInit = function () {
        if (this.west)
            this.colspan++;
        if (this.east)
            this.colspan++;
    };
    return CanvasLocalDataPointsComponent;
}());
__decorate([
    core_1.Input()
], CanvasLocalDataPointsComponent.prototype, "north");
__decorate([
    core_1.Input()
], CanvasLocalDataPointsComponent.prototype, "south");
__decorate([
    core_1.Input()
], CanvasLocalDataPointsComponent.prototype, "west");
__decorate([
    core_1.Input()
], CanvasLocalDataPointsComponent.prototype, "center");
__decorate([
    core_1.Input()
], CanvasLocalDataPointsComponent.prototype, "east");
__decorate([
    core_1.Input('background-color')
], CanvasLocalDataPointsComponent.prototype, "backgroundcolor");
__decorate([
    core_1.Input('font-color')
], CanvasLocalDataPointsComponent.prototype, "fontcolor");
CanvasLocalDataPointsComponent = __decorate([
    core_1.Component({
        selector: 'local-canvas-datapoint', template: "\n\n    <div class=\"datapoints\">\n      <table width=\"100%\" [style.background-color]=\"backgroundcolor\" [style.color]=\"fontcolor\">\n        <tr *ngIf=\"north\">\n          <td [attr.colspan]=\"colspan\">\n            <ng-content select=\"amexio-north\"></ng-content>\n          </td>\n        </tr>\n        <tr>\n          <td [ngStyle]=\"{'display' : west ? 'block' : 'none'}\">\n            <ng-content select=\"amexio-west\"></ng-content>\n          </td>\n          <td [ngStyle]=\"{'display' : center ? 'block' : 'none'}\">\n            <ng-content select=\"amexio-center\"></ng-content>\n          </td>\n          <td [ngStyle]=\"{'display' : east ? 'block' : 'none'}\">\n            <ng-content select=\"amexio-east\"></ng-content>\n          </td>\n        </tr>\n        <tr [ngStyle]=\"{'display' : south ? 'block' : 'none'}\">\n          <td [attr.colspan]=\"colspan\">\n            <ng-content select=\"amexio-south\"></ng-content>\n          </td>\n        </tr>\n      </table>\n    </div>\n\n\n  ", styles: ["\n    .datapoints {\n      background: white;\n      color: #1f0000; }\n    .datapoints .datapoints-north {\n      color: #1f0000; }\n    .datapoints .datapoint-south {\n      background-color: #1f0000;\n      color: #ff9e9e; }\n    .datapoints .datapoint-west {\n      padding: 5px; }\n    .datapoints .datapoint-east {\n      padding: 5px; }\n\n    /** Datapoints - Structure CSS **/\n    .datapoints {\n      font-size: 125%;\n      /* Border */\n      border-radius: 0px;\n      border: 1px solid #ced4da;\n      padding: 0px;\n      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1); }\n    .datapoints .datapoints {\n      border: none;\n      box-shadow: none; }\n    .datapoints .datapoint-south {\n      border-radius: 0px;\n      padding: 5px;\n      margin: 1px; }\n    .datapoints .datapoint-west {\n      padding: 5px; }\n    .datapoints .datapoint-east {\n      padding: 5px; }\n  "]
    })
], CanvasLocalDataPointsComponent);
exports.CanvasLocalDataPointsComponent = CanvasLocalDataPointsComponent;
