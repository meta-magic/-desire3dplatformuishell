"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
/**
 * Created by dattaram on 20/6/18.
 */
var core_1 = require("@angular/core");
var canvas_widget_class_1 = require("../../canvas-models/canvas.widget.class");
var event_basemodel_1 = require("../../event-relationship/models/event.basemodel");
var dradrop_validation_map_1 = require("../../canvas-component-map/dradrop-validation-map");
var RootPaneComponent = (function (_super) {
    __extends(RootPaneComponent, _super);
    function RootPaneComponent(_dragDropEventService, _componentFactoryResolver, _eventHndl) {
        var _this = _super.call(this) || this;
        _this._dragDropEventService = _dragDropEventService;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this._eventHndl = _eventHndl;
        _this.name = 'rootpane';
        _this.componentBehaviour.hasRelationship = true;
        _this.isComponent = false;
        _this.properties = new RootPaneProperties();
        _this.eventRelationship = new event_basemodel_1.EventRelationBaseModel();
        return _this;
    }
    RootPaneComponent.prototype.ngOnInit = function () {
        this.componentId =
            +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
    };
    RootPaneComponent.prototype.ngOnDestroy = function () { };
    RootPaneComponent.prototype.componentElementDraggedOver = function (event) {
        this.componentOverStyle = 'overEffect';
        event.preventDefault();
        event.stopPropagation();
    };
    RootPaneComponent.prototype.componentElementDropped = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this._eventHndl.isValidUI = true;
        if (this._eventHndl.componentClassKeyDragged == 'row') {
            this._dragDropEventService.rowDropComponentRef = null;
            this._dragDropEventService.rowDropComponentRef = this;
            this._dragDropEventService.rowAddDialogue = true;
        }
        else if (dradrop_validation_map_1.ValidationMap.ROOT_DROP[this._eventHndl.componentClassKeyDragged]) {
            this._dragDropEventService.componentElementDrop(this);
        }
        else {
            this._dragDropEventService.notificationData.push('Please drag row');
        }
        this.componentOverStyle = '';
    };
    RootPaneComponent.prototype.componentDragEnter = function (event) {
        event.stopPropagation();
        this.componentOverStyle = '';
    };
    RootPaneComponent.prototype.setSelfActive = function (event) {
        if (event != null) {
            event.stopPropagation();
            this.componentOverStyle = 'overEffect';
            this.showContextMenu = false;
            this._eventHndl.deleteComponentRef = null;
            this._eventHndl.deleteComponentRef = this.componentId;
            this._eventHndl.setAllComponentsInactive(this.componentId);
            this._eventHndl.loadComponentProperties(this.name);
        }
    };
    return RootPaneComponent;
}(canvas_widget_class_1.CanvasWidgetClass));
__decorate([
    core_1.ViewChild('roottarget', { read: core_1.ViewContainerRef })
], RootPaneComponent.prototype, "target");
RootPaneComponent = __decorate([
    core_1.Component({
        selector: 'root-pane-component',
        template: "\n    <div  style=\"min-height: 82vh\" [ngClass]=\"{'active-component' : isActive}\" class=\"{{componentOverStyle}} \"\n         (click)=\"setSelfActive($event)\"\n         (dragover)=\"componentElementDraggedOver($event)\"\n         (dragend)=\"componentDragEnter($event)\"\n         (drop)=\"componentElementDropped($event)\">\n      <div style=\"padding-bottom: 20px\">\n        <ng-template #roottarget></ng-template>\n      </div>\n         \n    </div>\n  ",
        styles: [
            ".active-component{\n        border: 2px dotted blue !important;\n      }\n    "
        ]
    })
], RootPaneComponent);
exports.RootPaneComponent = RootPaneComponent;
var RootPaneProperties = (function () {
    function RootPaneProperties() {
        this.name = '';
        this.isComponentValid = true;
    }
    return RootPaneProperties;
}());
exports.RootPaneProperties = RootPaneProperties;
