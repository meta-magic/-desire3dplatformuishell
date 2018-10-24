"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var VideoPropertyComponent = (function () {
    function VideoPropertyComponent() {
    }
    VideoPropertyComponent.prototype.ngOnInit = function () { };
    return VideoPropertyComponent;
}());
VideoPropertyComponent = __decorate([
    core_1.Component({
        selector: 'video-property',
        template: "    \n            <ng-container *ngIf=\"componentInstance\">\n              <amexio-text-input field-label=\"Path\" [(ngModel)]=\"componentInstance.properties.path\"\n                                 name=\"componentInstance.properties.path\"\n                                 place-holder=\"enter file path\"\n                                 icon-feedback=\"false\" [allow-blank]=\"true\">\n              </amexio-text-input>\n              <amexio-text-input field-label=\"Extension\" [(ngModel)]=\"componentInstance.properties.extension\"\n                                 name=\"componentInstance.properties.extension\"\n                                 place-holder=\"enter extension of video\"\n                                 icon-feedback=\"false\" [allow-blank]=\"true\">\n              </amexio-text-input>\n            </ng-container>\n  "
    })
], VideoPropertyComponent);
exports.VideoPropertyComponent = VideoPropertyComponent;
