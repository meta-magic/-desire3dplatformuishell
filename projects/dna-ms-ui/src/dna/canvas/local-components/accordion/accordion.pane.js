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
var core_1 = require("@angular/core");
var properties_map_1 = require("../../canvas-component-map/properties.map");
var canvas_widget_class_1 = require("../../canvas-models/canvas.widget.class");
var AccordionTabComponent = (function (_super) {
    __extends(AccordionTabComponent, _super);
    function AccordionTabComponent(_dragDropEventService, _componentFactoryResolver, _eventHndl) {
        var _this = _super.call(this) || this;
        _this._dragDropEventService = _dragDropEventService;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this._eventHndl = _eventHndl;
        _this.emittedEvent = new core_1.EventEmitter();
        _this.name = 'accordiontab';
        _this.mouseLocation = { left: 0, top: 0 };
        // this.tabId = Math.floor(Math.random() * 90000) + 10000;
        _this.properties = new AccordionTabProperties();
        return _this;
    }
    AccordionTabComponent.prototype.ngOnInit = function () {
        this.componentId =
            +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
    };
    AccordionTabComponent.prototype.componentElementDraggedOver = function (event) {
        this.componentOverStyle = 'overEffect';
        event.preventDefault();
        event.stopPropagation();
    };
    AccordionTabComponent.prototype.componentElementDropped = function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (this._eventHndl.componentClassKeyDragged == 'row') {
            this._dragDropEventService.rowDropComponentRef = null;
            this._dragDropEventService.rowDropComponentRef = this;
            this._dragDropEventService.rowAddDialogue = true;
        }
        else {
            this._dragDropEventService.componentElementDrop(this);
        }
    };
    AccordionTabComponent.prototype.onMouseOver = function (event) {
        event.stopPropagation();
        this.componentOverStyle = 'overEffect';
    };
    AccordionTabComponent.prototype.onMouseLeave = function (event) {
        event.stopPropagation();
        this.componentOverStyle = '';
    };
    AccordionTabComponent.prototype.onMouseEnter = function (event) {
        event.stopPropagation();
        this.componentOverStyle = '';
    };
    AccordionTabComponent.prototype.onMouseOut = function (event) {
        event.stopPropagation();
        this.componentOverStyle = '';
    };
    AccordionTabComponent.prototype.componentDragEnter = function (event) {
        event.stopPropagation();
        this.componentOverStyle = '';
    };
    AccordionTabComponent.prototype.loadContextMenu = function (event) {
        this.mouseLocation.left = event.clientX;
        this.mouseLocation.top = event.clientY;
        this.showContextMenu = true;
        event.preventDefault();
        event.stopPropagation();
    };
    AccordionTabComponent.prototype.getContextMenuStyle = function () {
        return {
            position: 'fixed',
            display: this.showContextMenu ? 'block' : 'none',
            left: this.mouseLocation.left + 'px',
            top: this.mouseLocation.top + 'px',
            'box-shadow': '1px 1px 2px #000000',
            width: '15%'
        };
    };
    AccordionTabComponent.prototype.setSelfActive = function (event) {
        if (event != null) {
            event.stopPropagation();
            this.componentOverStyle = 'overEffect';
            this.showContextMenu = false;
            this._eventHndl.deleteComponentRef = null;
            this._eventHndl.deleteComponentRef = this.componentId;
            this._eventHndl.setAllComponentsInactive(this.componentId);
            this.loadComponentProperties();
        }
    };
    AccordionTabComponent.prototype.loadComponentProperties = function () {
        this._eventHndl.propertyViewRef.clear();
        var propertyFactory = this._componentFactoryResolver.resolveComponentFactory(properties_map_1.PropertyMap.PROPERTY_MAP[this.name]);
        var propertyInstance = this._eventHndl.propertyViewRef.createComponent(propertyFactory);
        propertyInstance.instance.componentInstance = this._eventHndl.currentWidgetRef;
        propertyInstance.changeDetectorRef.detectChanges();
    };
    AccordionTabComponent.prototype.onDeleteClick = function () {
        this.showContextMenu = false;
        this._eventHndl.componentIdToDel = this.componentId;
        this._eventHndl.deleteComponent();
        this._eventHndl.addEditorNewState();
    };
    AccordionTabComponent.prototype.emitEvent = function () {
        if (!this.disabled) {
            this.active = !this.active;
            this.emittedEvent.emit(this);
        }
    };
    return AccordionTabComponent;
}(canvas_widget_class_1.CanvasWidgetClass));
__decorate([
    core_1.Input()
], AccordionTabComponent.prototype, "header");
__decorate([
    core_1.Input()
], AccordionTabComponent.prototype, "active");
__decorate([
    core_1.Output()
], AccordionTabComponent.prototype, "emittedEvent");
__decorate([
    core_1.Input('left-icon')
], AccordionTabComponent.prototype, "leftIcon");
__decorate([
    core_1.Input('angle-icon')
], AccordionTabComponent.prototype, "angleIcon");
__decorate([
    core_1.Input('disabled')
], AccordionTabComponent.prototype, "disabled");
__decorate([
    core_1.ViewChild('tabpill', { read: core_1.ViewContainerRef })
], AccordionTabComponent.prototype, "target");
AccordionTabComponent = __decorate([
    core_1.Component({
        selector: 'accordion-tab',
        template: "\n    <div class=\"{{componentOverStyle}}\" (mouseover)=\"onMouseOver($event)\" (mouseleave)=\"onMouseLeave($event)\" (click)=\"setSelfActive($event)\"\n         (dragover)=\"componentElementDraggedOver($event)\"\n         (dragend)=\"componentDragEnter($event)\"\n         (contextmenu)=\"loadContextMenu($event)\"\n         (drop)=\"componentElementDropped($event)\">\n    <button (click)=\"emitEvent()\"\n            class=\"{{isTransparent ? 'accordion-transparent' : 'accordion'}} {{active ? 'active-accordion' : ''}} {{disabled ? 'accordion-disable' : ''}}\" >\n      <div style=\"float: left;\" *ngIf=\"leftIcon\">\n        <i class=\"fa {{leftIcon}}\"></i>\n      </div>\n      {{properties.header}}\n      <div style=\"float: right\">\n        <i *ngIf=\"!angleIcon\" class=\"fa\" [ngClass]=\"{'fa-plus' : !active,'fa-minus' : active}\" aria-hidden=\"true\"></i>\n        <i *ngIf=\"angleIcon\" class=\"fa\" [ngClass]=\"{'fa-angle-down' : !active,'fa-angle-up' : active}\" aria-hidden=\"true\"></i>\n      </div>\n    </button>\n    <div [ngStyle]=\"{'display' : active ? 'block' : 'none'}\" (mouseenter)=\"onMouseEnter($event)\" (dragenter)=\"componentDragEnter($event)\" (mouseout)=\"onMouseOut($event)\" style=\"min-width: 200px;\"  class=\"panel\">\n      <ng-template #tabpill></ng-template>\n    </div>\n    </div>\n\n  "
    })
], AccordionTabComponent);
exports.AccordionTabComponent = AccordionTabComponent;
var AccordionTabProperties = (function () {
    function AccordionTabProperties() {
        this.isComponentValid = true;
        this.name = '';
        this.header = 'Accordion Tab';
    }
    return AccordionTabProperties;
}());
exports.AccordionTabProperties = AccordionTabProperties;
