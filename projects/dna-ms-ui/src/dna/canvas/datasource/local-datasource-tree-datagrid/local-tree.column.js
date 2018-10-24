"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var CanvasTreeColumnComponent = (function () {
    function CanvasTreeColumnComponent() {
        this.editable = false;
        this.hidden = false;
    }
    return CanvasTreeColumnComponent;
}());
__decorate([
    core_1.Input()
], CanvasTreeColumnComponent.prototype, "text");
__decorate([
    core_1.Input('data-index')
], CanvasTreeColumnComponent.prototype, "dataindex");
__decorate([
    core_1.Input()
], CanvasTreeColumnComponent.prototype, "editable");
__decorate([
    core_1.Input()
], CanvasTreeColumnComponent.prototype, "hidden");
__decorate([
    core_1.Input('data-type')
], CanvasTreeColumnComponent.prototype, "datatype");
__decorate([
    core_1.Input('summary-type')
], CanvasTreeColumnComponent.prototype, "summarytype");
__decorate([
    core_1.Input('summary-caption')
], CanvasTreeColumnComponent.prototype, "summarycaption");
__decorate([
    core_1.Input()
], CanvasTreeColumnComponent.prototype, "width");
__decorate([
    core_1.ContentChild('amexioHeaderTmpl')
], CanvasTreeColumnComponent.prototype, "headerTemplate");
__decorate([
    core_1.ContentChild('amexioBodyTmpl')
], CanvasTreeColumnComponent.prototype, "bodyTemplate");
CanvasTreeColumnComponent = __decorate([
    core_1.Component({
        selector: 'canvas-tree-column',
        template: ""
    })
], CanvasTreeColumnComponent);
exports.CanvasTreeColumnComponent = CanvasTreeColumnComponent;
