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
var canvas_widget_class_1 = require("../../canvas-models/canvas.widget.class");
var accordion_pane_1 = require("../../local-components/accordion/accordion.pane");
var CanvasAccordionContainerComponent = (function (_super) {
    __extends(CanvasAccordionContainerComponent, _super);
    function CanvasAccordionContainerComponent(_dragDropEventService, _componentFactoryResolver, _eventHndl) {
        var _this = _super.call(this) || this;
        _this._dragDropEventService = _dragDropEventService;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this._eventHndl = _eventHndl;
        _this.tabpillCollection = [];
        _this.mouseLocation = { left: 0, top: 0 };
        _this.properties = new AccordionProperties();
        return _this;
    }
    CanvasAccordionContainerComponent.prototype.ngOnInit = function () {
        this.componentId =
            +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
    };
    CanvasAccordionContainerComponent.prototype.onMouseOver = function (event) {
        event.stopPropagation();
        this.isOver = true;
    };
    CanvasAccordionContainerComponent.prototype.onMouseLeave = function (event) {
        event.stopPropagation();
        this.isOver = false;
    };
    CanvasAccordionContainerComponent.prototype.onWindowClick = function () {
        this.showContextMenu = false;
    };
    CanvasAccordionContainerComponent.prototype.getContextMenuStyle = function () {
        return {
            position: 'fixed',
            display: this.showContextMenu ? 'block' : 'none',
            left: this.mouseLocation.left + 'px',
            top: this.mouseLocation.top + 'px',
            'box-shadow': '1px 1px 2px #000000',
            width: '15%'
        };
    };
    CanvasAccordionContainerComponent.prototype.loadContextMenu = function (event) {
        this.mouseLocation.left = event.clientX;
        this.mouseLocation.top = event.clientY;
        this.showContextMenu = true;
        event.preventDefault();
        event.stopPropagation();
        this._eventHndl.deleteComponentRef = this.componentId;
    };
    CanvasAccordionContainerComponent.prototype.onDeleteClick = function () {
        this.showContextMenu = false;
        this._eventHndl.componentIdToDel = this.componentId;
        this._eventHndl.deleteComponent();
        this._eventHndl.addEditorNewState();
    };
    CanvasAccordionContainerComponent.prototype.ngOnDestroy = function () { };
    CanvasAccordionContainerComponent.prototype.createComponentConfig = function () {
        //create a single tab default
        this.tabpillCollection.forEach(function (pill) {
            pill.active = false;
        });
        var tabPillFactory = this._componentFactoryResolver.resolveComponentFactory(accordion_pane_1.AccordionTabComponent);
        var pillInstance = this.target.createComponent(tabPillFactory);
        pillInstance.instance.header = pillInstance.instance.properties.header;
        pillInstance.instance.active = true;
        pillInstance.changeDetectorRef.detectChanges();
        this.tabpillCollection.push(pillInstance.instance);
        this.children.push(pillInstance);
    };
    CanvasAccordionContainerComponent.prototype.componentElementDraggedOver = function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    CanvasAccordionContainerComponent.prototype.componentElementDropped = function (event) {
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
    CanvasAccordionContainerComponent.prototype.onMouseEnter = function (event) {
        event.stopPropagation();
    };
    CanvasAccordionContainerComponent.prototype.onMouseOut = function (event) {
        event.stopPropagation();
    };
    CanvasAccordionContainerComponent.prototype.componentDragEnter = function (event) {
        event.stopPropagation();
    };
    CanvasAccordionContainerComponent.prototype.setSelfActive = function (event) {
        if (event != null) {
            event.stopPropagation();
            this.showContextMenu = false;
            this._eventHndl.deleteComponentRef = null;
            this._eventHndl.deleteComponentRef = this.componentId;
            this._eventHndl.setAllComponentsInactive(this.componentId);
            this._eventHndl.loadComponentProperties(this.name);
        }
    };
    /* DONT REMOVE createLocalData FUNTION IT WILL BREAK GRID OPEN CASE */
    CanvasAccordionContainerComponent.prototype.createLocalData = function () {
        /*   this.localData.length = 0;
        this.children.forEach(child => {
          this.localData.push(child.instance.properties);
        });*/
    };
    return CanvasAccordionContainerComponent;
}(canvas_widget_class_1.CanvasWidgetClass));
__decorate([
    core_1.ViewChild('tabpill', { read: core_1.ViewContainerRef })
], CanvasAccordionContainerComponent.prototype, "target");
__decorate([
    core_1.HostListener('document:click')
], CanvasAccordionContainerComponent.prototype, "onWindowClick");
CanvasAccordionContainerComponent = __decorate([
    core_1.Component({
        selector: 'accordion-container',
        template: "\n    <div (mouseover)=\"onMouseOver($event)\" (mouseleave)=\"onMouseLeave($event)\"\n         draggable=\"true\" [ngClass]=\"{'componentStyle':isOver,'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}\"\n         (click)=\"setSelfActive($event)\"\n         (dragover)=\"componentElementDraggedOver($event)\"\n         (dragend)=\"componentDragEnter($event)\"\n         (contextmenu)=\"loadContextMenu($event)\"\n         (drop)=\"componentElementDropped($event)\">\n\n      <div class=\"dropable-area\" (mouseenter)=\"onMouseEnter($event)\" (dragenter)=\"componentDragEnter($event)\" (mouseout)=\"onMouseOut($event)\">\n        <accordion [tabs]=\"tabpillCollection\">\n          <ng-template #tabpill></ng-template>\n        </accordion>\n      </div>\n\n    </div>\n    <span  *ngIf=\"showContextMenu\" (click)=\"onDeleteClick()\" class=\"dropdown\"\n    [ngStyle]=\"{left: this.mouseLocation.left + 'px',top: this.mouseLocation.top + 'px',position:'fixed','box-shadow': '1px 1px 2px #000000',width: '15%'}\">\n        <ul class=\"dropdown-list\">\n          <li class=\"list-items\">\n            <span ><i class=\"fa fa-trash\" style=\"padding-right: 5px;\"></i> <b>Delete</b> </span>\n          </li>\n        </ul>\n      </span>\n  "
    })
], CanvasAccordionContainerComponent);
exports.CanvasAccordionContainerComponent = CanvasAccordionContainerComponent;
var AccordionProperties = (function () {
    function AccordionProperties() {
        this.isComponentValid = true;
        this.name = '';
        this.transparent = false;
        this.angleIcon = false;
        this.expandAll = false;
    }
    return AccordionProperties;
}());
exports.AccordionProperties = AccordionProperties;
