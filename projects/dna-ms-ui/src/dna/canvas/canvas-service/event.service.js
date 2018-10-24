"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
/**
 * Created by dattaram on 14/2/18.
 */
var core_1 = require("@angular/core");
var canvas_component_1 = require("../canvas.component");
var dradrop_validation_map_1 = require("../canvas-component-map/dradrop-validation-map");
var event_list_1 = require("../data-files/event-list");
var behaviour_map_1 = require("../canvas-component-map/behaviour.map");
var properties_map_1 = require("../canvas-component-map/properties.map");
var EventHandlerService = (function () {
    function EventHandlerService(_editorState, _componentFactoryResolver, _notificationService, _sharedDataService) {
        this._editorState = _editorState;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._notificationService = _notificationService;
        this._sharedDataService = _sharedDataService;
        this.draggedObject = null;
        this.invalidComponents = [];
        this.showRelationship = false;
        this.isModelBinded = true;
        this.showCanvas = true;
        this.viewRefs = [];
        this.isValidUI = true;
        this.notificationData = [];
    }
    EventHandlerService.prototype.getViewComponentsRef = function () {
        return this.viewRefs;
    };
    EventHandlerService.prototype.componentElementDragBeginRoot = function (event) {
        if (!event.data.hasOwnProperty('children')) {
            this.draggedObject = event.data;
            this.componentClassKeyDragged = this.draggedObject.key;
        }
    };
    EventHandlerService.prototype.setAllComponentsInactive = function (elementId) {
        var _this = this;
        if (elementId != null || elementId != '') {
            this.appComponentInstance.children.forEach(function (comp) {
                comp.instance.showContextMenu = false;
                if (elementId == comp.instance.componentId) {
                    comp.instance.isActive = true;
                    _this.currentWidgetRef = comp.instance;
                }
                else {
                    comp.instance.isActive = false;
                }
                if (comp.instance.hasOwnProperty('children')) {
                    _this.setAllInactive(comp.instance.children, elementId);
                }
            });
        }
    };
    EventHandlerService.prototype.setAllInactive = function (child, elementId) {
        var _this = this;
        child.forEach(function (childComp) {
            childComp.instance.showContextMenu = false;
            if (elementId == childComp.instance.componentId) {
                _this.currentWidgetRef = childComp.instance;
                childComp.instance.isActive = true;
            }
            else {
                childComp.instance.isActive = false;
            }
            if (childComp.instance.hasOwnProperty('children')) {
                _this.setAllInactive(childComp.instance.children, elementId);
            }
        });
    };
    EventHandlerService.prototype.addEditorNewState = function () {
        var _this = this;
        var currentState = [];
        this.viewRefs.forEach(function (widget) {
            var widRefObj = new canvas_component_1.SaveJSON();
            widRefObj.name = widget.instance.name;
            widRefObj.id = widget.instance.componentId;
            widRefObj.properties = widget.instance.properties;
            widRefObj.dataSource = widget.instance.dataSource;
            widRefObj.eventRelationship = widget.instance.eventRelationship;
            if (widget.instance.hasOwnProperty('children') &&
                widget.instance.children.length > 0) {
                _this.createSaveJSON(widget.instance, widRefObj);
            }
            currentState.push(widRefObj);
        });
        this._editorState.onAddNewState(currentState);
    };
    EventHandlerService.prototype.createSaveJSON = function (widRef, parentRef) {
        var _this = this;
        widRef.children.forEach(function (child) {
            var childWidRef = new canvas_component_1.SaveJSON();
            childWidRef.name = child.instance.name;
            childWidRef.id = child.instance.componentId;
            childWidRef.properties = child.instance.properties;
            childWidRef.dataSource = child.instance.dataSource;
            if (child.instance.hasOwnProperty('children')) {
                _this.createSaveJSON(child.instance, childWidRef);
            }
            parentRef.child.push(childWidRef);
        });
    };
    EventHandlerService.prototype.componentElementRelocateDragBegin = function (event, ref) {
        event.stopPropagation();
        this.componentIdToDel = ref.componentId;
        if (ref.name != null) {
            this.componentClassKeyDragged = ref.name;
            this.eventType = 'R';
            this.findComponentRef(this.viewRefs);
        }
        else {
            console.warn('No key found on Drag begin Object');
        }
    };
    EventHandlerService.prototype.findComponentRef = function (viewRefs) {
        var _this = this;
        viewRefs.forEach(function (ref, index) {
            var widViewRef = ref;
            var widInstance = widViewRef.instance;
            if (_this.componentIdToDel == widInstance.componentId) {
                _this.componentViewRefToDel = widViewRef;
            }
            // To be called when dropped
            if (widInstance.hasOwnProperty('children') &&
                widInstance.children.length > 0) {
                _this.findComponentRef(widInstance.children);
            }
        });
    };
    EventHandlerService.prototype.deleteComponent = function () {
        if (this.deleteComponentRef != null) {
            this.deleteFromViewRef(this.deleteComponentRef);
        }
        else {
            alert('Please select component for delete operation');
        }
    };
    EventHandlerService.prototype.deleteFromViewRef = function (elementId) {
        var _this = this;
        this.viewRefs.forEach(function (comp, index) {
            if (-1 == elementId.search('_rootpane') &&
                elementId == comp.instance.componentId) {
                comp.destroy();
                _this.viewRefs.splice(index, 1);
                return;
            }
            else {
                if (comp.instance.hasOwnProperty('children') &&
                    comp.instance.children.length > 0) {
                    _this.findInSubViewRef(comp.instance, elementId);
                }
            }
        });
    };
    EventHandlerService.prototype.findInSubViewRef = function (childViewRef, elementId) {
        var _this = this;
        childViewRef.children.forEach(function (subViewRef, index) {
            if (-1 == elementId.search('_rootpane') &&
                elementId == subViewRef.instance.componentId) {
                subViewRef.destroy();
                childViewRef.children.splice(index, 1);
                return;
            }
            else {
                if (subViewRef.instance.hasOwnProperty('children') &&
                    subViewRef.instance.children.length > 0) {
                    _this.findInSubViewRef(subViewRef.instance, elementId);
                }
            }
        });
    };
    EventHandlerService.prototype.removeRelocateComponent = function (componentId) {
        this.deleteFromViewRef(componentId);
    };
    //* Call when name property changes of each component
    EventHandlerService.prototype.componentValidation = function (componentInstance) {
        if (componentInstance.properties.name.split(' ').length == 1 &&
            componentInstance.properties.name != '' &&
            this.checkDuplicateName(componentInstance)) {
            componentInstance.properties.isComponentValid = true;
        }
        else {
            componentInstance.properties.isComponentValid = false;
        }
    };
    EventHandlerService.prototype.checkDuplicateName = function (componentInstance) {
        var _this = this;
        this.isUnique = true;
        var name = componentInstance.properties.name;
        var compId = componentInstance.componentId;
        this.appComponentInstance.children.forEach(function (comp) {
            if (compId != comp.instance.componentId &&
                name == comp.instance.properties.name) {
                _this.isUnique = false;
                return;
            }
            if (comp.instance.hasOwnProperty('children')) {
                _this.checkAllCompNames(comp.instance.children, name, compId);
            }
        });
        if (!this.isUnique)
            this.notificationData.push('Duplicate Name Found');
        return this.isUnique;
    };
    EventHandlerService.prototype.checkAllCompNames = function (child, name, id) {
        var _this = this;
        child.forEach(function (childComp) {
            if (id != childComp.instance.componentId &&
                name == childComp.instance.properties.name) {
                _this.isUnique = false;
                return;
            }
            if (childComp.instance.hasOwnProperty('children')) {
                _this.checkAllCompNames(childComp.instance.children, name, id);
            }
        });
    };
    EventHandlerService.prototype.findListOfComponent = function () {
        var childComponentList = [];
        this.findListOfComponentInChild(this.viewRefs, childComponentList);
        return childComponentList;
    };
    EventHandlerService.prototype.findListOfComponentInChild = function (viewRefs, childComponentList) {
        var _this = this;
        viewRefs.forEach(function (comp) {
            if (comp.instance.isComponent) {
                var childWidRef = new canvas_component_1.SaveJSON();
                childWidRef.name = comp.instance.name;
                childWidRef.id = comp.instance.componentId;
                childWidRef.isComponent = comp.instance.isComponent;
                childWidRef.componentBehaviour = comp.instance.componentBehaviour;
                childWidRef.properties = comp.instance.properties;
                childWidRef.dataSource = comp.instance.dataSource;
                childComponentList.push(childWidRef);
            }
            if (comp.instance.hasOwnProperty('children') &&
                comp.instance.children.length > 0) {
                _this.findListOfComponentInChild(comp.instance.children, childComponentList);
            }
        });
    };
    EventHandlerService.prototype.createDatasourceInstance = function (componentInstance) {
        this.componentInstance = null;
        this.componentInstance = componentInstance;
        this.showDataSource = true;
        this.showCanvas = false;
        this.showRelationship = false;
    };
    EventHandlerService.prototype.showEventretionshipUI = function (componentInstance, eventObject) {
        this.showRelationship = false;
        this.componentInstance = null;
        this.selectedEventData = null;
        this.componentInstance = componentInstance;
        this.selectedEventData = eventObject;
        this.showRelationship = true;
        this.showCanvas = false;
        this.showDataSource = false;
    };
    /*call before relationship UI render*/
    EventHandlerService.prototype.checkIsUIValid = function () {
        var inValidComStatus = [];
        this.findListOfComponent().forEach(function (com) {
            if (!com.properties.isComponentValid) {
                inValidComStatus.push(com.properties.isComponentValid);
            }
        });
        if (inValidComStatus.length > 0) {
            this._notificationService.setDialogueData(true, 'Please validate all component.', 'Error');
            return false;
        }
        else
            return true;
    };
    EventHandlerService.prototype.findEventListByName = function (componentName) {
        var returnData = null;
        event_list_1.allComponentEvent.forEach(function (com) {
            if (com.name == componentName) {
                returnData = com.eventList;
            }
        });
        return returnData;
    };
    /* CREATE PROPERTY AND BEHAVIOUR COMPONENT INSTANCE*/
    EventHandlerService.prototype.loadComponentProperties = function (key) {
        this.propertyViewRef.clear();
        this.behaviourViewRef.clear();
        this.accordianRef[0].accordionCollections.forEach(function (opt, index) {
            if (key == 'rootpane') {
                if (index == 1) {
                    opt.active = true;
                }
                else {
                    opt.active = false;
                }
            }
            else {
                if (index == 0) {
                    opt.active = true;
                }
                else {
                    opt.active = false;
                }
            }
        });
        if (behaviour_map_1.BehaviourMap.BEHAVIOUR_MAP[key]) {
            var behaviourInstance = this.createComponentInsatnce(this.behaviourViewRef, behaviour_map_1.BehaviourMap.BEHAVIOUR_MAP[key]);
            behaviourInstance.instance.componentInstance = this.currentWidgetRef;
            behaviourInstance.changeDetectorRef.detectChanges();
        }
        if (properties_map_1.PropertyMap.PROPERTY_MAP[key]) {
            var propertyInstance = this.createComponentInsatnce(this.propertyViewRef, properties_map_1.PropertyMap.PROPERTY_MAP[key]);
            propertyInstance.instance.componentInstance = this.currentWidgetRef;
            propertyInstance.changeDetectorRef.detectChanges();
        }
    };
    EventHandlerService.prototype.createComponentInsatnce = function (target, key) {
        var factory = this._componentFactoryResolver.resolveComponentFactory(key);
        var instance = target.createComponent(factory);
        return instance;
    };
    /*CREATE UI SAVE JSON*/
    EventHandlerService.prototype.createValidSaveJSON = function (widRef, parentRef) {
        var _this = this;
        if (widRef.hasOwnProperty('children')) {
            widRef.children.forEach(function (child) {
                if (child.instance.hasOwnProperty('children')) {
                    var childWidRef = new canvas_component_1.SaveJSON();
                    childWidRef.name = child.instance.name;
                    // childWidRef.componentBehaviour = child.instance.componentBehaviour;
                    childWidRef.id = child.instance.componentId;
                    childWidRef.properties = child.instance.properties;
                    if (dradrop_validation_map_1.ValidationMap.Icon_Class_Change[child.instance.name]) {
                        delete childWidRef.properties['icon'];
                    }
                    childWidRef.dataSource = child.instance.dataSource;
                    childWidRef.eventRelationship = child.instance.eventRelationship;
                    parentRef.child.push(childWidRef);
                    _this.createValidSaveJSON(child.instance, childWidRef);
                }
                else {
                    var childWidRef = new canvas_component_1.SaveJSON();
                    childWidRef.name = child.instance.name;
                    // childWidRef.componentBehaviour = child.instance.componentBehaviour;
                    childWidRef.id = child.instance.componentId;
                    childWidRef.properties = child.instance.properties;
                    childWidRef.dataSource = child.instance.dataSource;
                    childWidRef.eventRelationship = child.instance.eventRelationship;
                    parentRef.child.push(childWidRef);
                }
            });
        }
    };
    /*VALIDATE UI JSON*/
    EventHandlerService.prototype.checkUIComponentValidation = function (viewRef) {
        var _this = this;
        viewRef.forEach(function (widgetRef) {
            if (widgetRef.instance.properties.isComponentValid) {
                if (widgetRef.instance.componentBehaviour.hasModelBinding) {
                    if (widgetRef.instance.properties.model &&
                        widgetRef.instance.properties.model.modelName == '') {
                        _this.isModelBinded = false;
                    }
                }
                if (widgetRef.instance.hasOwnProperty('children')) {
                    _this.isValidUI = _this.checkUIComponentValidation(widgetRef.instance.children);
                }
            }
            else {
                _this.invalidComponents.push(widgetRef.instance);
                _this.isValidUI = false;
            }
        });
        return this.isValidUI;
    };
    /*AFTER CREATING MODEL FROM UI REFLECT MODEL INFORMATION IN RESPECTIVE COMPONENT*/
    /* reflectModelChangeInComponent(viewRef: any, response: any) {
      this.setModelName(viewRef, response);
    }
  
    setModelName(viewRef: any, response: any) {
      viewRef.forEach((widgetRef: any) => {
        response.objectFields.forEach((model: any) => {
          if (widgetRef.instance.componentBehaviour.hasModelBinding && widgetRef.instance.properties.model.modelName == '' ) {
            widgetRef.instance.properties.model.modelName = response.name;
            widgetRef.instance.properties.model.modelFieldKey = model.name;
            console.log('model', widgetRef.instance.properties.model);
          }
        });
        if (
          widgetRef.instance.hasOwnProperty('children') &&
          widgetRef.instance.children.length > 0
        ) {
          this.setModelName(widgetRef.instance.children, response);
        }
      });
    }*/
    EventHandlerService.prototype.reflectModelChangeInComponent = function (viewRef) {
        var _this = this;
        viewRef.forEach(function (widgetRef) {
            _this.modelbindedDataRef.modelFields.forEach(function (model) {
                if (widgetRef.instance.properties.name === model.name) {
                    widgetRef.instance.properties.model.modelName = _this.modelbindedDataRef.modelName;
                    widgetRef.instance.properties.model.modelFieldKey = model.name;
                }
            });
            if (widgetRef.instance.hasOwnProperty('children') &&
                widgetRef.instance.children.length > 0) {
                _this.reflectModelChangeInComponent(widgetRef.instance.children);
            }
        });
    };
    return EventHandlerService;
}());
EventHandlerService = __decorate([
    core_1.Injectable()
], EventHandlerService);
exports.EventHandlerService = EventHandlerService;
