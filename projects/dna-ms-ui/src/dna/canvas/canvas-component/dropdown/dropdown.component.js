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
 * Created by pratik on 23/2/18.
 */
var core_1 = require("@angular/core");
var forms_properties_1 = require("../../canvas-models/forms.properties");
var canvas_widget_class_1 = require("../../canvas-models/canvas.widget.class");
var datasource_model_1 = require("../../canvas-models/datasource.model");
var event_basemodel_1 = require("../../event-relationship/models/event.basemodel");
var DropDownCanvasComponent = (function (_super) {
    __extends(DropDownCanvasComponent, _super);
    function DropDownCanvasComponent(_eventHndl, _componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this._eventHndl = _eventHndl;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this.type = 'default';
        _this.mouseLocation = { left: 0, top: 0 };
        _this.componentBehaviour.hasModelBinding = true;
        _this.componentBehaviour.hasRelationship = true;
        _this.componentBehaviour.isBindingComponent = true;
        _this.componentBehaviour.hasDataSource = true;
        _this.properties = new DropDownProperties();
        _this.dataSource = new DropdownDatasource();
        _this.eventRelationship = new event_basemodel_1.EventRelationBaseModel();
        return _this;
    }
    DropDownCanvasComponent.prototype.ngOnInit = function () {
        this.componentId =
            +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
    };
    DropDownCanvasComponent.prototype.onMouseOver = function (event) {
        event.stopPropagation();
        this.isOver = true;
    };
    DropDownCanvasComponent.prototype.onMouseLeave = function (event) {
        event.stopPropagation();
        this.isOver = false;
    };
    DropDownCanvasComponent.prototype.onWindowClick = function () {
        this.showContextMenu = false;
    };
    DropDownCanvasComponent.prototype.getContextMenuStyle = function () {
        return {
            position: 'fixed',
            display: this.showContextMenu ? 'block' : 'none',
            left: this.mouseLocation.left + 'px',
            top: this.mouseLocation.top + 'px',
            'box-shadow': '1px 1px 2px #000000',
            width: '15%'
        };
    };
    DropDownCanvasComponent.prototype.loadContextMenu = function (event) {
        this.mouseLocation.left = event.clientX;
        this.mouseLocation.top = event.clientY;
        this.showContextMenu = true;
        event.preventDefault();
        event.stopPropagation();
        this._eventHndl.deleteComponentRef = this.componentId;
    };
    DropDownCanvasComponent.prototype.onDeleteClick = function () {
        this.showContextMenu = false;
        this._eventHndl.componentIdToDel = this.componentId;
        this._eventHndl.deleteComponent();
        this._eventHndl.addEditorNewState();
    };
    DropDownCanvasComponent.prototype.setSelfActive = function (event) {
        event.stopPropagation();
        this._eventHndl.deleteComponentRef = null;
        this._eventHndl.deleteComponentRef = this.componentId;
        this._eventHndl.setAllComponentsInactive(this.componentId);
        this._eventHndl.loadComponentProperties(this.name);
    };
    /*loadComponentProperties() {
      this._eventHndl.propertyViewRef.clear();
      this._eventHndl.behaviourViewRef.clear();
      const propertyFactory = this._componentFactoryResolver.resolveComponentFactory(
        PropertyMap.PROPERTY_MAP[this.name]
      );
      const behaviourFactory = this._componentFactoryResolver.resolveComponentFactory(
        BehaviourMap.BEHAVIOUR_MAP[this.name]
      );
  
      const propertyInstance = this._eventHndl.propertyViewRef.createComponent(
        propertyFactory
      );
      const behaviourInstance = this._eventHndl.behaviourViewRef.createComponent(
        behaviourFactory
      );
      propertyInstance.instance.componentInstance = this._eventHndl.currentWidgetRef;
      behaviourInstance.instance.componentInstance = this._eventHndl.currentWidgetRef;
      propertyInstance.changeDetectorRef.detectChanges();
      behaviourInstance.changeDetectorRef.detectChanges();
  
    }*/
    DropDownCanvasComponent.prototype.componentElementDraggedOver = function (event) {
        event.preventDefault();
    };
    return DropDownCanvasComponent;
}(canvas_widget_class_1.CanvasWidgetClass));
__decorate([
    core_1.HostListener('document:click')
], DropDownCanvasComponent.prototype, "onWindowClick");
DropDownCanvasComponent = __decorate([
    core_1.Component({
        selector: 'dropdown-component',
        template: "\n\n   <div (click)=\"setSelfActive($event)\" [attr.id]=\"componentId\"\n        draggable=\"true\" [ngClass]=\"{'componentStyle':isOver,'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}\"\n         (dragstart)=\"_eventHndl.componentElementRelocateDragBegin($event,this)\"\n        (contextmenu)=\"loadContextMenu($event)\"\n         (dragover)=\"componentElementDraggedOver($event)\" #dropdown>\n     <amexio-dropdown [place-holder]=\"properties.placeholder\"\n                      [field-label]=\"properties.fieldLabel\">\n     </amexio-dropdown>\n\n   </div>\n   <span  *ngIf=\"showContextMenu\" (click)=\"onDeleteClick()\" class=\"dropdown\"\n      [ngStyle]=\"{left: this.mouseLocation.left + 'px',top: this.mouseLocation.top + 'px',position:'fixed','box-shadow': '1px 1px 2px #000000',width: '15%'}\">\n          <ul class=\"dropdown-list\">\n            <li class=\"list-items\">\n              <span ><i class=\"fa fa-trash\" style=\"padding-right: 5px;\"></i> <b>Delete</b> </span>\n            </li>\n          </ul>\n        </span>\n "
    })
], DropDownCanvasComponent);
exports.DropDownCanvasComponent = DropDownCanvasComponent;
var DropDownProperties = (function () {
    function DropDownProperties() {
        this.model = new forms_properties_1.ModelClass();
        this.name = '';
        this.isComponentValid = false;
        this.fieldLabel = 'Dropdown';
        this.disabled = false;
        this.errorMsg = '';
        this.search = false;
        this.multiselect = false;
        this.allowBlank = true;
        this.displayField = '';
        this.valueField = '';
    }
    return DropDownProperties;
}());
exports.DropDownProperties = DropDownProperties;
var DropdownDatasource = (function (_super) {
    __extends(DropdownDatasource, _super);
    function DropdownDatasource() {
        var _this = _super.call(this) || this;
        _this.metadata = new datasource_model_1.Metadata();
        _this.dataReader = '';
        _this.servicetype = '1';
        _this.displayField = '';
        _this.valueField = '';
        _this.localDataName = null;
        _this.remote.httpMethod = 1;
        _this.remote.httpUrl = '';
        return _this;
    }
    return DropdownDatasource;
}(datasource_model_1.DatasourceModel));
exports.DropdownDatasource = DropdownDatasource;
