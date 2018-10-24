"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
/**
 * Created by dattaram on 20/2/18.
 */
var core_1 = require("@angular/core");
var component_map_1 = require("../canvas-component-map/component.map");
var canvas_component_1 = require("../canvas.component");
var forms_properties_1 = require("../canvas-models/forms.properties");
var DragDropEventService = (function () {
    function DragDropEventService(_eventHndl, _componentFactoryResolver) {
        this._eventHndl = _eventHndl;
        this._componentFactoryResolver = _componentFactoryResolver;
        this.rowCount = 1;
        this.columnCount = 1;
        this.rowAddDialogue = false;
        this.notificationData = [];
    }
    DragDropEventService.prototype.componentElementDrop = function (componentRef) {
        if (this._eventHndl.componentClassKeyDragged != null) {
            if (this._eventHndl.eventType !== 'R') {
                var componentFactory = this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP[this._eventHndl.componentClassKeyDragged]);
                var componentInstance = componentRef.target.createComponent(componentFactory);
                componentInstance.instance.name = this._eventHndl.componentClassKeyDragged;
                // componentInstance.instance.componentBehaviour = this._eventHndl.draggedObject.componentBehaviour;
                if (componentInstance.instance.componentBehaviour.hasModelBinding) {
                    componentInstance.instance.properties['model'] = new forms_properties_1.ModelClass();
                }
                if (componentInstance.instance.hasOwnProperty('parentComponentRef'))
                    componentInstance.instance.parentComponentRef = componentRef;
                componentInstance.changeDetectorRef.detectChanges();
                if (this._eventHndl.componentClassKeyDragged == 'card' ||
                    this._eventHndl.componentClassKeyDragged == 'form') {
                    componentInstance.instance.createCardConfig();
                }
                else if (this._eventHndl.componentClassKeyDragged == 'border') {
                    componentInstance.instance.createConfig();
                }
                else if (this._eventHndl.componentClassKeyDragged == 'datapoint') {
                    componentInstance.instance.createConfig();
                }
                this._eventHndl.deleteComponentRef =
                    componentInstance.instance.componentId;
                componentRef.children.push(componentInstance);
                this._eventHndl.setAllComponentsInactive(componentInstance.instance.componentId);
                this._eventHndl.addEditorNewState();
                this._eventHndl.loadComponentProperties(this._eventHndl.componentClassKeyDragged);
                componentInstance.instance.parentRef = componentRef;
                this._eventHndl.componentClassKeyDragged = null;
                if (component_map_1.WidgetMap.SPL_COMPONENTS[componentInstance.instance.name]) {
                    componentInstance.instance.createComponentConfig();
                }
            }
            else {
                this.relocateDrop(componentRef);
            }
        }
    };
    DragDropEventService.prototype.relocateDrop = function (componentRef) {
        var componentFactory = this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP[this._eventHndl.componentClassKeyDragged]);
        var componentInstance = componentRef.target.createComponent(componentFactory);
        componentInstance.instance.name = this._eventHndl.componentClassKeyDragged;
        if (this._eventHndl.componentViewRefToDel.instance.hasOwnProperty('children') &&
            this._eventHndl.componentViewRefToDel.instance.children.length > 0) {
            this.relocateInnerElements(this._eventHndl.componentViewRefToDel.instance, componentInstance);
        }
        componentInstance.instance.properties = this._eventHndl.componentViewRefToDel.instance.properties;
        componentInstance.instance.dataSource = this._eventHndl.componentViewRefToDel.instance.dataSource;
        componentInstance.instance.eventRelationship = this._eventHndl.componentViewRefToDel.instance.eventRelationship;
        componentInstance.changeDetectorRef.detectChanges();
        componentRef.children.push(componentInstance);
        this._eventHndl.setAllComponentsInactive(componentInstance.instance.componentId);
        componentInstance.instance.parentComponentRef = componentRef;
        this._eventHndl.componentViewRefToDel.destroy();
        this._eventHndl.removeRelocateComponent(this._eventHndl.componentViewRefToDel.instance.componentId);
        this._eventHndl.addEditorNewState();
        this._eventHndl.componentClassKeyDragged = null;
        if (component_map_1.WidgetMap.SPL_COMPONENTS[componentInstance.instance.name]) {
            componentInstance.instance.createLocalData();
        }
        this._eventHndl.eventType = null;
    };
    DragDropEventService.prototype.relocateInnerElements = function (parentRef, createdParentRef) {
        var _this = this;
        parentRef.children.forEach(function (innerChild) {
            var innerComponentInstance;
            if (parentRef.name == 'card' || parentRef.name == 'form') {
                innerComponentInstance = _this.createCardChildComponent(innerChild.instance, createdParentRef);
            }
            else if (parentRef.name == 'border') {
                innerComponentInstance = _this.createBorderChildComponents(innerChild.instance, createdParentRef);
            }
            else if (parentRef.name == 'datapoint') {
                innerComponentInstance = _this.createDataPointChildComponents(innerChild.instance, createdParentRef);
            }
            else {
                var innerComponentFactory = createdParentRef.instance._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP[innerChild.instance.name]);
                innerComponentInstance = createdParentRef.instance.target.createComponent(innerComponentFactory);
            }
            innerComponentInstance.instance.name = innerChild.instance.name;
            innerComponentInstance.instance.properties =
                innerChild.instance.properties;
            innerComponentInstance.instance.dataSource =
                innerChild.instance.dataSource;
            innerComponentInstance.instance.eventRelationship =
                innerChild.instance.eventRelationship;
            innerComponentInstance.instance.parentComponentRef =
                createdParentRef.instance;
            innerComponentInstance.changeDetectorRef.detectChanges();
            createdParentRef.instance.children.push(innerComponentInstance);
            if (innerChild.instance.hasOwnProperty('children') &&
                innerChild.instance.children.length > 0) {
                _this.relocateInnerElements(innerChild.instance, innerComponentInstance);
            }
            if (component_map_1.WidgetMap.SPL_COMPONENTS[innerComponentInstance.instance.name]) {
                innerComponentInstance.instance.createLocalData();
            }
        });
    };
    DragDropEventService.prototype.createDataPointChildComponents = function (compo, targetComponentRef) {
        var componentInstance;
        var componentFactory;
        if (compo.name === 'dataWest') {
            componentFactory = this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP[compo.name]);
            return (componentInstance = targetComponentRef.instance.datawest.createComponent(componentFactory));
        }
        if (compo.name === 'dataCenter') {
            componentFactory = this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP[compo.name]);
            return (componentInstance = targetComponentRef.instance.datacenter.createComponent(componentFactory));
        }
        if (compo.name === 'dataSouth') {
            componentFactory = this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP[compo.name]);
            return (componentInstance = targetComponentRef.instance.datasouth.createComponent(componentFactory));
        }
        if (compo.name === 'dataNorth') {
            componentFactory = this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP[compo.name]);
            return (componentInstance = targetComponentRef.instance.datanorth.createComponent(componentFactory));
        }
        if (compo.name === 'dataEast') {
            componentFactory = this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP[compo.name]);
            return (componentInstance = targetComponentRef.instance.dataeast.createComponent(componentFactory));
        }
    };
    DragDropEventService.prototype.createCardChildComponent = function (compo, targetComponentRef) {
        var componentInstance;
        var componentFactory;
        if (compo.name === 'cardbody' || compo.name === 'formbody') {
            componentFactory = this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP[compo.name]);
            return (componentInstance = targetComponentRef.instance.target.createComponent(componentFactory));
        }
        if (compo.name === 'cardheader' || compo.name === 'formheader') {
            componentFactory = this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP[compo.name]);
            return (componentInstance = targetComponentRef.instance.headerTarget.createComponent(componentFactory));
        }
        if (compo.name === 'cardaction' || compo.name === 'formaction') {
            componentFactory = this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP[compo.name]);
            return (componentInstance = targetComponentRef.instance.actionTarget.createComponent(componentFactory));
        }
    };
    DragDropEventService.prototype.createBorderChildComponents = function (compo, targetComponentRef) {
        var componentInstance;
        var componentFactory;
        if (compo.name === 'borderNorth') {
            componentFactory = this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP[compo.name]);
            return (componentInstance = targetComponentRef.instance.borderNorth.createComponent(componentFactory));
        }
        if (compo.name === 'borderEast') {
            componentFactory = this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP[compo.name]);
            return (componentInstance = targetComponentRef.instance.borderEast.createComponent(componentFactory));
        }
        if (compo.name === 'borderCenter') {
            componentFactory = this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP[compo.name]);
            return (componentInstance = targetComponentRef.instance.borderCenter.createComponent(componentFactory));
        }
        if (compo.name === 'borderWest') {
            componentFactory = this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP[compo.name]);
            return (componentInstance = targetComponentRef.instance.borderWest.createComponent(componentFactory));
        }
        if (compo.name === 'borderSouth') {
            componentFactory = this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP[compo.name]);
            return (componentInstance = targetComponentRef.instance.borderSouth.createComponent(componentFactory));
        }
    };
    /*Row Drop Function*/
    DragDropEventService.prototype.rowDropCancel = function () {
        this.rowCount = 1;
        this.columnCount = 1;
        this.rowAddDialogue = false;
    };
    DragDropEventService.prototype.rowDrop = function () {
        if (this.rowCount >= 1 &&
            (this.columnCount >= 1 && this.columnCount <= 12)) {
            this.createRowJson(this.rowDropComponentRef);
            this.rowDropCancel();
        }
        else {
            this.notificationData.push('Please validate component');
        }
    };
    DragDropEventService.prototype.createRowJson = function (parentRef) {
        var rowJsonObject;
        rowJsonObject = new canvas_component_1.CanvasPage();
        for (var i = 0; i < this.rowCount; i++) {
            var rowObject = new canvas_component_1.SaveJSON();
            rowObject.name = 'row';
            rowObject.id =
                +Math.floor(Math.random() * 90000) + 10000 + '_' + rowObject.name;
            rowObject.properties = {};
            rowObject.properties['isComponentValid'] = true;
            for (var j = 0; j < this.columnCount; j++) {
                var columnObject = new canvas_component_1.SaveJSON();
                columnObject.name = 'column';
                columnObject.id =
                    +Math.floor(Math.random() * 90000) + 10000 + '_' + columnObject.name;
                columnObject.properties = {};
                columnObject.properties['isComponentValid'] = true;
                columnObject.properties['columnlg'] = 12 / this.columnCount;
                rowObject.child.push(columnObject);
            }
            rowJsonObject.child.push(rowObject);
        }
        this.dropRowOnRoot(rowJsonObject, parentRef);
    };
    DragDropEventService.prototype.dropRowOnRoot = function (rowData, parentRef) {
        var _this = this;
        rowData.child.forEach(function (widget) {
            var componentFactory = _this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP[widget.name]);
            var componentInstance = parentRef.target.createComponent(componentFactory);
            componentInstance.instance.name = widget.name;
            if (componentInstance.instance.hasOwnProperty('parentComponentRef')) {
                componentInstance.instance.parentComponentRef = parentRef;
            }
            componentInstance.instance.properties = widget.properties;
            componentInstance.instance.dataSource = widget.dataSource;
            componentInstance.instance.eventRelationship = widget.eventRelationship;
            // if(widget.name==='column')
            //   componentInstance.instance.componentInitailized();
            componentInstance.changeDetectorRef.detectChanges();
            parentRef.children.push(componentInstance);
            if (widget.child.length > 0) {
                _this.dropRowOnRoot(widget, componentInstance.instance);
            }
        });
        if (parentRef && parentRef.name && parentRef.name === 'row') {
            parentRef.componentInitailized();
        }
        this._eventHndl.addEditorNewState();
    };
    return DragDropEventService;
}());
DragDropEventService = __decorate([
    core_1.Injectable()
], DragDropEventService);
exports.DragDropEventService = DragDropEventService;
