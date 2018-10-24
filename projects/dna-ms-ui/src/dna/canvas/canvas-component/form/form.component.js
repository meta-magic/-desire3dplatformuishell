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
 * Created by dattaram on 1/3/18.
 */
var core_1 = require("@angular/core");
var canvas_widget_class_1 = require("../../canvas-models/canvas.widget.class");
var component_map_1 = require("../../canvas-component-map/component.map");
var CanvasFormComponent = (function (_super) {
    __extends(CanvasFormComponent, _super);
    function CanvasFormComponent(_eventHndl, _componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this._eventHndl = _eventHndl;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this.mouseLocation = { left: 0, top: 0 };
        _this.properties = new FormProperties();
        return _this;
    }
    CanvasFormComponent.prototype.ngOnInit = function () {
        this.componentId =
            +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
    };
    CanvasFormComponent.prototype.onMouseOver = function (event) {
        event.stopPropagation();
        this.isOver = true;
    };
    CanvasFormComponent.prototype.onMouseLeave = function (event) {
        event.stopPropagation();
        this.isOver = false;
    };
    CanvasFormComponent.prototype.onWindowClick = function () {
        this.showContextMenu = false;
    };
    CanvasFormComponent.prototype.getContextMenuStyle = function () {
        return {
            position: 'fixed',
            display: this.showContextMenu ? 'block' : 'none',
            left: this.mouseLocation.left + 'px',
            top: this.mouseLocation.top + 'px',
            'box-shadow': '1px 1px 2px #000000',
            width: '15%'
        };
    };
    CanvasFormComponent.prototype.loadContextMenu = function (event) {
        this.mouseLocation.left = event.clientX;
        this.mouseLocation.top = event.clientY;
        this.showContextMenu = true;
        event.preventDefault();
        event.stopPropagation();
        this._eventHndl.deleteComponentRef = this.componentId;
    };
    CanvasFormComponent.prototype.onDeleteClick = function () {
        this.showContextMenu = false;
        this._eventHndl.componentIdToDel = this.componentId;
        this._eventHndl.deleteComponent();
        this._eventHndl.addEditorNewState();
    };
    CanvasFormComponent.prototype.setSelfActive = function (event) {
        event.stopPropagation();
        this._eventHndl.deleteComponentRef = null;
        this._eventHndl.deleteComponentRef = this.componentId;
        this._eventHndl.setAllComponentsInactive(this.componentId);
        this._eventHndl.loadComponentProperties(this.name);
    };
    CanvasFormComponent.prototype.componentElementDraggedOver = function (event) {
        event.preventDefault();
    };
    CanvasFormComponent.prototype.createCardConfig = function () {
        var formHeaderComponentFactory = this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP['formheader']);
        var formHeaderComponentInstance = this.headerTarget.createComponent(formHeaderComponentFactory);
        var formBodyComponentFactory = this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP['formbody']);
        var formBodayComponentInstance = this.target.createComponent(formBodyComponentFactory);
        var formActionComponentFactory = this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP['formaction']);
        var formActionComponentInstance = this.actionTarget.createComponent(formActionComponentFactory);
        formActionComponentInstance.instance.createComponentConfig();
        formActionComponentInstance.instance.createComponentConfig();
        this.addButtonProperties(formActionComponentInstance);
        this.children.push(formHeaderComponentInstance, formBodayComponentInstance, formActionComponentInstance);
    };
    // THIS METHOD IS USED FOR TO ADD BUTTON IN ACTION
    CanvasFormComponent.prototype.addButtonProperties = function (formActionComponentInstance) {
        if (formActionComponentInstance.instance.children[0]) {
            formActionComponentInstance.instance.children[0].instance.properties.label =
                'Cancel';
            formActionComponentInstance.instance.children[0].instance.properties.type =
                'theme-backgroundcolor';
        }
        if (formActionComponentInstance.instance.children[1]) {
            formActionComponentInstance.instance.children[1].instance.properties.label =
                'Save';
            formActionComponentInstance.instance.children[1].instance.properties.type =
                'success';
            formActionComponentInstance.instance.children[1].instance.properties.formBind = this.properties.name;
        }
        return formActionComponentInstance;
    };
    CanvasFormComponent.prototype.ngOnDestroy = function () {
        this.removeDuplicateOnRelocate(this._eventHndl.viewRefs);
        this.removeFromParent(this.parentComponentRef);
    };
    CanvasFormComponent.prototype.removeDuplicateOnRelocate = function (components) {
        var _this = this;
        components.forEach(function (compRef, index) {
            if (compRef.componentId === _this.componentId) {
                components.splice(index, 1);
                return;
            }
            else {
                if (compRef.hasOwnProperty('children') && compRef.children.length > 0) {
                    _this.removeDuplicateOnRelocate(compRef.children);
                }
            }
        });
    };
    CanvasFormComponent.prototype.removeFromParent = function (parentComponentRef) {
        var _this = this;
        if (parentComponentRef != null) {
            parentComponentRef.children.forEach(function (del, index) {
                if (del.instance.componentId === _this.componentId) {
                    parentComponentRef.children.splice(index, 1);
                }
            });
        }
    };
    CanvasFormComponent.prototype.componentDragExit = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.isActive = false;
    };
    return CanvasFormComponent;
}(canvas_widget_class_1.CanvasWidgetClass));
__decorate([
    core_1.ViewChild('formbodytarget', { read: core_1.ViewContainerRef })
], CanvasFormComponent.prototype, "target");
__decorate([
    core_1.ViewChild('formactiontarget', { read: core_1.ViewContainerRef })
], CanvasFormComponent.prototype, "actionTarget");
__decorate([
    core_1.ViewChild('formheadertarget', { read: core_1.ViewContainerRef })
], CanvasFormComponent.prototype, "headerTarget");
__decorate([
    core_1.HostListener('document:click')
], CanvasFormComponent.prototype, "onWindowClick");
CanvasFormComponent = __decorate([
    core_1.Component({
        selector: 'canvas-form',
        template: "\n    <div class=\"canvas-card\" (click)=\"setSelfActive($event)\" [attr.id]=\"componentId\"\n         (mouseover)=\"onMouseOver($event)\" (mouseleave)=\"onMouseLeave($event)\"\n         draggable=\"true\" [ngClass]=\"{'componentStyle':isOver,'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}\"\n          (dragstart)=\"_eventHndl.componentElementRelocateDragBegin($event,this)\"\n          (contextmenu)=\"loadContextMenu($event)\"\n         (dragenter)=\"componentDragExit($event)\"\n          (dragover)=\"componentElementDraggedOver($event)\" #form>\n    <amexio-form [header]=\"properties.enableHeader\"\n                 [footer-align]=\"properties.footerAlign\"\n                 [header-align]=\"properties.headerAlign\">\n      <amexio-form-header>\n          <div [ngStyle]=\"{'display' : properties.customHeader ? 'block' : 'none'}\">\n            <div #formheadertarget></div>\n          </div>\n        <div [ngStyle]=\"{'display' : !properties.customHeader ? 'block' : 'none'}\">\n          <amexio-label [size]=\"properties.size\" [font-color]=\"properties.color\">{{properties.header}}</amexio-label>\n        </div>\n      </amexio-form-header>\n      <amexio-form-body>\n          <div #formbodytarget></div>\n      </amexio-form-body>\n      <amexio-form-action>\n        <div #formactiontarget></div>\n      </amexio-form-action>\n    </amexio-form>\n    </div>\n\n    <span  *ngIf=\"showContextMenu\" (click)=\"onDeleteClick()\" class=\"dropdown\"\n    [ngStyle]=\"{left: this.mouseLocation.left + 'px',top: this.mouseLocation.top + 'px',position:'fixed','box-shadow': '1px 1px 2px #000000',width: '15%'}\">\n        <ul class=\"dropdown-list\">\n          <li class=\"list-items\">\n            <span ><i class=\"fa fa-trash\" style=\"padding-right: 5px;\"></i> <b>Delete</b> </span>\n          </li>\n        </ul>\n      </span>\n  "
    })
], CanvasFormComponent);
exports.CanvasFormComponent = CanvasFormComponent;
var FormProperties = (function () {
    function FormProperties() {
        /*temporary use*/
        this.name = 'form_' + Math.floor(Math.random() * 90000) + 10000;
        this.isComponentValid = true;
        this.enableHeader = true;
        this.enableFooter = true;
        this.height = 50;
        this.showError = true;
        this.headerAlign = 'right';
        this.footerAlign = 'right';
        this.customHeader = false;
        this.color = '';
        this.size = '';
    }
    return FormProperties;
}());
exports.FormProperties = FormProperties;
