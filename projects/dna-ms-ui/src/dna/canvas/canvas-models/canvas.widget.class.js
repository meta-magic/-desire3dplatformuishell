"use strict";
exports.__esModule = true;
var CanvasWidgetClass = (function () {
    function CanvasWidgetClass() {
        this.isComponentValid = true;
        this.children = [];
        this.isComponent = true;
        this.componentBehaviour = new ComponentBehaviour();
    }
    return CanvasWidgetClass;
}());
exports.CanvasWidgetClass = CanvasWidgetClass;
var ComponentBehaviour = (function () {
    function ComponentBehaviour() {
        this.hasModelBinding = false;
        this.hasRelationship = false;
        this.isBindingComponent = false;
        this.hasDataSource = false;
    }
    return ComponentBehaviour;
}());
exports.ComponentBehaviour = ComponentBehaviour;
