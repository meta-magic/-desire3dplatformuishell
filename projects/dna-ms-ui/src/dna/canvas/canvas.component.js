"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var component_map_1 = require("./canvas-component-map/component.map");
var dradrop_validation_map_1 = require("./canvas-component-map/dradrop-validation-map");
var behaviour_map_1 = require("./canvas-component-map/behaviour.map");
var retionship_map_1 = require("./canvas-component-map/retionship.map");
var forms_properties_1 = require("./canvas-models/forms.properties");
var model_mapping_component_1 = require("./canvas-sub-UI/model-mapping/model.mapping.component");
var CanvasComponent = (function () {
    function CanvasComponent(_restCallService, _eventHndl, _componentFactoryResolver, _editorState, _dragDropEventService, msgService, loaderService, cdf, _notificationService, _sharedDataService, ls) {
        this._restCallService = _restCallService;
        this._eventHndl = _eventHndl;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._editorState = _editorState;
        this._dragDropEventService = _dragDropEventService;
        this.msgService = msgService;
        this.loaderService = loaderService;
        this.cdf = cdf;
        this._notificationService = _notificationService;
        this._sharedDataService = _sharedDataService;
        this.ls = ls;
        this.canvasWindowSize = 'Fullscreen';
        this.showCreateUI = false;
        this.showOpenUI = false;
        this.bodyHeight = 85;
        this.propertyAccordianHeight = 66.5;
        this.showCreateModel = false;
        this.migrationStatusDialogue = false;
        this.disabledMapButton = true;
        this._eventHndl.showDataSource = false;
        this._eventHndl.showRelationship = false;
        this._eventHndl.showCanvas = true;
        this.toggleCanvasUI = true;
        this.saveComplete = false;
        this.children = [];
        this._eventHndl.appComponentInstance = this;
        this._eventHndl.viewRefs = this.children;
        this.canvasUI = new CanvasUI();
        this.isCanvasDisabled = true;
        /* let pp = {
          desire3dversionid: 2,
          projectMigrated: true
        };
         localStorage.setItem('platformInfo', JSON.stringify(pp));*/
    }
    CanvasComponent.prototype.getValidMenu = function (node) {
        if (!node.hasOwnProperty('children') && !node.disabled) {
            return true;
        }
        else {
            return false;
        }
    };
    CanvasComponent.prototype.ngOnInit = function () { };
    CanvasComponent.prototype.ngAfterViewInit = function () {
        this._eventHndl.propertyViewRef = this.propertyTarget;
        this._eventHndl.behaviourViewRef = this.behaviourTarget;
        this._eventHndl.modelViewref = this.modelTarget;
        this._eventHndl.accordianRef = this.accordian.toArray();
    };
    CanvasComponent.prototype.onDelete = function () {
        this._eventHndl.deleteComponent();
        this._eventHndl.addEditorNewState();
    };
    CanvasComponent.prototype.openUIWindow = function () {
        if (this.checkMigrationStatus()) {
            this.showOpenUI = true;
        }
        else {
            this.migrationStatusDialogue = true;
        }
        /* LOCAL CHECK */
        //this.localOpenUiTestFunction();
    };
    CanvasComponent.prototype.createUIWindow = function () {
        if (this.checkMigrationStatus()) {
            this.showCreateUI = true;
        }
        else {
            this.migrationStatusDialogue = true;
        }
    };
    CanvasComponent.prototype.checkMigrationStatus = function () {
        if (this.ls.get('platformInfo').projectMigrated) {
            return true;
        }
        else {
            return false;
        }
    };
    // Load Default Component In Open/Undo/Redo Case
    CanvasComponent.prototype.loadDefaultComponent = function () {
        this._eventHndl.propertyViewRef.clear();
        this._eventHndl.behaviourViewRef.clear();
        var behaviourFactory = this._componentFactoryResolver.resolveComponentFactory(behaviour_map_1.BehaviourMap.BEHAVIOUR_MAP['rootpane']);
        var behaviourInstance = this._eventHndl.behaviourViewRef.createComponent(behaviourFactory);
        behaviourInstance.instance.componentInstance = this._eventHndl.currentWidgetRef;
        behaviourInstance.changeDetectorRef.detectChanges();
        this._eventHndl.setAllComponentsInactive(this._eventHndl.currentWidgetRef.componentId);
    };
    CanvasComponent.prototype.repaintWidgetsInOpen = function (targetComponentRef, widget) {
        var _this = this;
        widget.child.forEach(function (compo) {
            var componentData;
            var componentInstance;
            var cInstance;
            var componentFactory;
            if (widget.name === 'card') {
                componentData = _this.createCardChildComponent(compo, targetComponentRef);
                cInstance = componentData.cInstance;
                componentInstance = componentData.componentInstance;
            }
            else if (widget.name === 'border') {
                componentData = _this.createBorderChildComponents(compo, targetComponentRef);
                cInstance = componentData.cInstance;
                componentInstance = componentData.componentInstance;
            }
            else if (widget.name === 'datapoint') {
                componentData = _this.createDataPointChildComponents(compo, targetComponentRef);
                cInstance = componentData.cInstance;
                componentInstance = componentData.componentInstance;
            }
            else {
                cInstance = targetComponentRef.instance;
                componentFactory = _this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP[compo.name]);
                componentInstance = cInstance.target.createComponent(componentFactory);
            }
            componentInstance.instance.name = compo.name;
            /*    if (!compo.hasOwnProperty('componentBehaviour')) {
              let returnObj = this.setComponentBehaviourObject(compo);
              if (returnObj != null) {
                componentInstance.instance.componentBehaviour = returnObj;
              }
            } else {
              componentInstance.instance.componentBehaviour =
                compo.componentBehaviour;
            }
      */
            /* Edit mode code */
            if (componentInstance.instance.hasOwnProperty('editMode')) {
                componentInstance.instance.editMode = true;
            }
            if (componentInstance.instance.hasOwnProperty('parentComponentRef')) {
                componentInstance.instance.parentComponentRef = cInstance;
            }
            /* End edit mode code */
            componentInstance.instance.properties = compo.properties;
            if (dradrop_validation_map_1.ValidationMap.Icon_Class_Change[compo.name]) {
                componentInstance.instance.properties['icon'] =
                    componentInstance.instance.properties.iconClass;
            }
            if (compo.hasOwnProperty('dataSource')) {
                componentInstance.instance.dataSource = compo.dataSource;
            }
            if (compo.hasOwnProperty('eventRelationship')) {
                componentInstance.instance.eventRelationship = compo.eventRelationship;
            }
            componentInstance.instance.parentComponentRef =
                targetComponentRef.instance;
            if (!componentInstance.instance.properties.hasOwnProperty('model') &&
                componentInstance.instance.isComponent) {
                if (!retionship_map_1.RelationshipBlockMap.Component_Restrict[componentInstance.instance.name]) {
                    componentInstance.instance.properties['model'] = new forms_properties_1.ModelClass();
                }
            }
            componentInstance.changeDetectorRef.detectChanges();
            if (compo.child && compo.child.length > 0) {
                _this.repaintWidgetsInOpen(componentInstance, compo);
                if (compo && compo.name == 'row') {
                    componentInstance.instance.componentInitailized();
                }
            }
            cInstance.children.push(componentInstance);
            /* code for spl component open */
            if (component_map_1.WidgetMap.SPL_COMPONENTS[cInstance.name]) {
                cInstance.createLocalData();
            }
            /* End of code for spl component relocation */
        });
    };
    CanvasComponent.prototype.onSave = function () {
        this._eventHndl.invalidComponents = [];
        this._eventHndl.isValidUI = true;
        this._eventHndl.isModelBinded = true;
        this.saveJSON = [];
        // this.saveCallExecution();
        if (this._eventHndl.checkUIComponentValidation(this.children)) {
            if (this._eventHndl.isModelBinded) {
                this.saveCallExecution();
            }
            else {
                this.showCreateModel = true;
            }
        }
        else {
            //display invalid component to ui on window
            this.createNotificationData();
            this.cdf.detectChanges();
        }
    };
    CanvasComponent.prototype.createModel = function (modelObject) {
        /*  let response = { response: modelObject };
        this.createModelSuccess(response);*/
        var _this = this;
        this.loaderService.showLoader();
        var response;
        this._restCallService
            .postRestCall('/api/dna/objects/createModelByUiDesign', modelObject)
            .subscribe(function (res) {
            response = res;
        }, function (err) {
            console.log(err);
        }, function () {
            if (response.success) {
                _this.createModelSuccess(response);
            }
            else {
                _this.createModelFails(response);
            }
        });
    };
    CanvasComponent.prototype.createModelSuccess = function (response) {
        this.createModelTreeStructure(response.response);
        this._eventHndl.isModelBinded = true;
        this._eventHndl.reflectModelChangeInComponent(this.children);
        this.canvasUI.metadata.modelInfo.models.push(response.response);
        this.modelComponent.updateModelList(response.response);
        this._notificationService.setNotificationData(true, [response.successMessage], 'green');
        this.showCreateModel = false;
        this.loaderService.hideLoader();
    };
    CanvasComponent.prototype.createModelTreeStructure = function (modelObject) {
        modelObject['text'] = modelObject.name;
        modelObject['children'] = [];
        modelObject.objectFields.forEach(function (obj) {
            obj['text'] = obj.name;
            modelObject.children.push(obj);
        });
        delete modelObject['objectFields'];
    };
    CanvasComponent.prototype.createModelFails = function (response) {
        this.loaderService.hideLoader();
        this._eventHndl.isModelBinded = false;
        this._notificationService.setNotificationData(true, [response.errorMessage], 'red');
        this.showCreateModel = true;
    };
    /* SAVE SERVICE CALL*/
    CanvasComponent.prototype.saveCallExecution = function () {
        var _this = this;
        this.saveComplete = true;
        var data;
        this.children.forEach(function (widget) {
            var widRefObj = new SaveJSON();
            widRefObj.name = widget.instance.name;
            widRefObj.id = widget.instance.componentId;
            widRefObj.properties = widget.instance.properties;
            widRefObj.dataSource = widget.instance.dataSource;
            // widRefObj.componentBehaviour = widget.instance.componentBehaviour;
            widRefObj.eventRelationship = widget.instance.eventRelationship;
            _this._eventHndl.createValidSaveJSON(widget.instance, widRefObj);
            _this.saveJSON.push(widRefObj);
        });
        this.canvasUI.metadata.child = [];
        this.canvasUI.metadata.child = this.saveJSON;
        var requestJson = JSON.stringify(this.canvasUI);
        localStorage.setItem('data', requestJson);
        this.loaderService.showLoader();
        this._restCallService
            .postRestCall('/api/dna/design/save', requestJson)
            .subscribe(function (res) {
            data = res;
        }, function (err) {
            _this.saveComplete = false;
            _this.loaderService.hideLoader();
        }, function () {
            if (data.success &&
                data.hasOwnProperty('successMessage') &&
                data.successMessage != null) {
                _this.loaderService.hideLoader();
                _this.uiCreateDEvent({ ui_created: true });
                if (data.response.hasOwnProperty('id')) {
                    if (data.response.id != null && data.response.id != '') {
                        _this.canvasUI.id = data.response.id;
                    }
                }
                _this._notificationService.setNotificationData(true, [data.successMessage], 'green');
                _this.resetCanvas();
                _this.isCanvasDisabled = false;
                _this.reloadFromJSON(data.response);
            }
            else {
                //error code handling using dialog
                //check error code array ? display in dial : errorMessage as popup
                _this.loaderService.hideLoader();
            }
            _this.saveComplete = false;
        });
    };
    CanvasComponent.prototype.migrateProject = function (event) {
        if (event === 'ok') {
            var response_1;
            this.migrationStatusDialogue = false;
            this._restCallService
                .getRestCall('/api/project/migration/project')
                .subscribe(function (res) {
                response_1 = res;
            }, function (err) {
                console.log('error occur');
            }, function () { });
            this.msgService.sendMessage({
                path: 'home/codepipeline/task-ui',
                title: 'Task Details'
            });
            this.setLocalStorageData(true);
        }
        else
            this.migrationStatusDialogue = false;
    };
    CanvasComponent.prototype.setLocalStorageData = function (status) {
        this.ls.remove('platformInfo');
        var platformInfo = {
            desire3dversionid: this.ls.get('platformInfo').desire3dversionid,
            projectMigrated: status
        };
        this.ls.set('platformInfo', platformInfo);
    };
    // Create Notification Service data.
    CanvasComponent.prototype.createNotificationData = function () {
        var notificationData = [];
        var nObject = {};
        nObject['data'] = [];
        this._eventHndl.invalidComponents.forEach(function (com) {
            var comObject = {};
            comObject['text'] = com.name;
            nObject.data.push(comObject);
        });
        notificationData.push(nObject);
        this._notificationService.setCustomNotificationData(true, 'Name required. List of Invalid Component', notificationData);
    };
    //UI CREATED EVENT ADDED
    CanvasComponent.prototype.uiCreateDEvent = function (string) {
        window.postMessage(string, window.location.origin);
    };
    CanvasComponent.prototype.addInnerChild = function (wid, treeObj) {
        var _this = this;
        wid.children.forEach(function (innerChild) {
            if (innerChild.instance.hasOwnProperty('children')) {
                var innTrObj = {
                    text: innerChild.instance.componentId,
                    children: []
                };
                _this.addInnerChild(innerChild.instance, innTrObj);
                treeObj.children.push(innTrObj);
            }
            else {
                treeObj.children.push({
                    text: innerChild.instance.componentId
                });
            }
        });
    };
    /* RESET CANVAS DATA*/
    CanvasComponent.prototype.resetCanvas = function () {
        this._eventHndl.viewRefs = [];
        this._eventHndl.invalidComponents.length = 0;
        this._eventHndl.isValidUI = true;
        this._eventHndl.isModelBinded = true;
        this.target.clear();
        this.propertyTarget.clear();
        this.behaviourTarget.clear();
        this.children = [];
        this.saveJSON = [];
        this._eventHndl.viewRefs = this.children;
        this._editorState.resetState();
        this.canvasUI = new CanvasUI();
        this.isCanvasDisabled = true;
        this.showModelBindingUI = false;
        this.disabledMapButton = true;
    };
    /* UNDO UI*/
    CanvasComponent.prototype.onUndo = function () {
        var _this = this;
        if (this._editorState.onUndoState()) {
            this.target.clear();
            this.propertyTarget.clear();
            this.behaviourTarget.clear();
            this.children = [];
            this._eventHndl.viewRefs = [];
            var saveData = this._editorState.present;
            saveData.forEach(function (widget) {
                var componentFactory = _this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP[widget.name]);
                var componentInstance = _this.target.createComponent(componentFactory);
                componentInstance.instance.name = widget.name;
                if (componentInstance.instance.hasOwnProperty('editMode')) {
                    componentInstance.instance.editMode = true;
                }
                componentInstance.instance.properties = widget.properties;
                componentInstance.instance.dataSource = widget.dataSource;
                componentInstance.changeDetectorRef.detectChanges();
                _this.children.push(componentInstance);
                /* code for spl component open */
                if (component_map_1.WidgetMap.SPL_COMPONENTS[componentInstance.instance.name]) {
                    componentInstance.instance.createLocalData();
                }
                /* End of code for spl component relocation */
                _this.repaintWidgets(componentInstance, widget);
            });
        }
        else {
            this._editorState.present = null;
        }
        this._eventHndl.viewRefs = this.children;
    };
    /* REDO UI*/
    CanvasComponent.prototype.onRedo = function () {
        var _this = this;
        if (this._editorState.onRedoState()) {
            this.target.clear();
            this.propertyTarget.clear();
            this.behaviourTarget.clear();
            this.modelTarget.clear();
            this.children = [];
            var saveData = this._editorState.present;
            saveData.forEach(function (widget) {
                var componentFactory = _this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP[widget.name]);
                var componentInstance = _this.target.createComponent(componentFactory);
                if (componentInstance.instance.hasOwnProperty('editMode')) {
                    componentInstance.instance.editMode = true;
                }
                componentInstance.instance.name = widget.name;
                componentInstance.instance.properties = widget.properties;
                componentInstance.instance.dataSource = widget.dataSource;
                componentInstance.instance.parentComponentRef = _this;
                componentInstance.changeDetectorRef.detectChanges();
                _this.children.push(componentInstance);
                /* code for spl component open */
                if (component_map_1.WidgetMap.SPL_COMPONENTS[componentInstance.instance.name]) {
                    componentInstance.instance.createLocalData();
                }
                /* End of code for spl component relocation */
                _this.repaintWidgets(componentInstance, widget);
            });
        }
        this._eventHndl.viewRefs = this.children;
    };
    CanvasComponent.prototype.repaintWidgets = function (targetComponentRef, widget) {
        var _this = this;
        widget.child.forEach(function (compo) {
            var componentData;
            var componentInstance;
            var cInstance;
            var componentFactory;
            if (widget.name === 'card') {
                componentData = _this.createCardChildComponent(compo, targetComponentRef);
                cInstance = componentData.cInstance;
                componentInstance = componentData.componentInstance;
            }
            else if (widget.name === 'border') {
                componentData = _this.createBorderChildComponents(compo, targetComponentRef);
                cInstance = componentData.cInstance;
                componentInstance = componentData.componentInstance;
            }
            else if (widget.name == 'datapoint') {
                componentData = _this.createDataPointChildComponents(compo, targetComponentRef);
                cInstance = componentData.cInstance;
                componentInstance = componentData.componentInstance;
            }
            else {
                cInstance = targetComponentRef.instance;
                componentFactory = _this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP[compo.name]);
                componentInstance = cInstance.target.createComponent(componentFactory);
            }
            if (componentInstance.instance.hasOwnProperty('editMode')) {
                componentInstance.instance.editMode = true;
            }
            componentInstance.instance.name = compo.name;
            if (componentInstance.instance.hasOwnProperty('parentComponentRef')) {
                componentInstance.instance.parentComponentRef = cInstance;
            }
            componentInstance.instance.properties = compo.properties;
            componentInstance.instance.dataSource = compo.dataSource;
            componentInstance.instance.parentComponentRef =
                targetComponentRef.instance;
            componentInstance.changeDetectorRef.detectChanges();
            if (compo.child && compo.child.length > 0) {
                _this.repaintWidgets(componentInstance, compo);
                if (compo && compo.name && compo.name == 'row') {
                    componentInstance.instance.componentInitailized();
                }
            }
            cInstance.children.push(componentInstance);
            /* code for spl component open */
            if (component_map_1.WidgetMap.SPL_COMPONENTS[cInstance.name]) {
                cInstance.createLocalData();
            }
            /* End of code for spl component relocation */
        });
    };
    CanvasComponent.prototype.createCardChildComponent = function (compo, targetComponentRef) {
        var componentData;
        var componentInstance;
        var cInstance;
        var componentFactory;
        if (compo.name === 'cardbody' || compo.name === 'formbody') {
            cInstance = targetComponentRef.instance;
            componentFactory = this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP[compo.name]);
            componentInstance = cInstance.target.createComponent(componentFactory);
            return (componentData = {
                cInstance: cInstance,
                componentInstance: componentInstance
            });
        }
        if (compo.name === 'cardheader' || compo.name === 'formheader') {
            cInstance = targetComponentRef.instance;
            componentFactory = this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP[compo.name]);
            componentInstance = cInstance.headerTarget.createComponent(componentFactory);
            return (componentData = {
                cInstance: cInstance,
                componentInstance: componentInstance
            });
        }
        if (compo.name === 'cardaction' || compo.name === 'formaction') {
            cInstance = targetComponentRef.instance;
            componentFactory = this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP[compo.name]);
            componentInstance = cInstance.actionTarget.createComponent(componentFactory);
            return (componentData = {
                cInstance: cInstance,
                componentInstance: componentInstance
            });
        }
    };
    CanvasComponent.prototype.createBorderChildComponents = function (compo, targetComponentRef) {
        var componentData;
        var componentInstance;
        var cInstance;
        var componentFactory;
        if (compo.name === 'borderNorth') {
            cInstance = targetComponentRef.instance;
            componentFactory = this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP[compo.name]);
            componentInstance = cInstance.borderNorth.createComponent(componentFactory);
            return (componentData = {
                cInstance: cInstance,
                componentInstance: componentInstance
            });
        }
        if (compo.name === 'borderEast') {
            cInstance = targetComponentRef.instance;
            componentFactory = this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP[compo.name]);
            componentInstance = cInstance.borderEast.createComponent(componentFactory);
            return (componentData = {
                cInstance: cInstance,
                componentInstance: componentInstance
            });
        }
        if (compo.name === 'borderCenter') {
            cInstance = targetComponentRef.instance;
            componentFactory = this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP[compo.name]);
            componentInstance = cInstance.borderCenter.createComponent(componentFactory);
            return (componentData = {
                cInstance: cInstance,
                componentInstance: componentInstance
            });
        }
        if (compo.name === 'borderWest') {
            cInstance = targetComponentRef.instance;
            componentFactory = this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP[compo.name]);
            componentInstance = cInstance.borderWest.createComponent(componentFactory);
            return (componentData = {
                cInstance: cInstance,
                componentInstance: componentInstance
            });
        }
        if (compo.name === 'borderSouth') {
            cInstance = targetComponentRef.instance;
            componentFactory = this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP[compo.name]);
            componentInstance = cInstance.borderSouth.createComponent(componentFactory);
            return (componentData = {
                cInstance: cInstance,
                componentInstance: componentInstance
            });
        }
    };
    CanvasComponent.prototype.createDataPointChildComponents = function (compo, targetComponentRef) {
        var componentData;
        var componentInstance;
        var cInstance;
        var componentFactory;
        if (compo.name === 'dataWest') {
            cInstance = targetComponentRef.instance;
            componentFactory = this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP[compo.name]);
            componentInstance = cInstance.datawest.createComponent(componentFactory);
            return (componentData = {
                cInstance: cInstance,
                componentInstance: componentInstance
            });
        }
        if (compo.name === 'dataCenter') {
            cInstance = targetComponentRef.instance;
            componentFactory = this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP[compo.name]);
            componentInstance = cInstance.datacenter.createComponent(componentFactory);
            return (componentData = {
                cInstance: cInstance,
                componentInstance: componentInstance
            });
        }
        if (compo.name === 'dataSouth') {
            cInstance = targetComponentRef.instance;
            componentFactory = this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP[compo.name]);
            componentInstance = cInstance.datasouth.createComponent(componentFactory);
            return (componentData = {
                cInstance: cInstance,
                componentInstance: componentInstance
            });
        }
        if (compo.name === 'dataNorth') {
            cInstance = targetComponentRef.instance;
            componentFactory = this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP[compo.name]);
            componentInstance = cInstance.datanorth.createComponent(componentFactory);
            return (componentData = {
                cInstance: cInstance,
                componentInstance: componentInstance
            });
        }
        if (compo.name === 'dataEast') {
            cInstance = targetComponentRef.instance;
            componentFactory = this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP[compo.name]);
            componentInstance = cInstance.dataeast.createComponent(componentFactory);
            return (componentData = {
                cInstance: cInstance,
                componentInstance: componentInstance
            });
        }
    };
    CanvasComponent.prototype.toggleScreenSize = function () {
        this.toggleCanvasUI = false;
        this.canvasWindowSize == 'Fullscreen'
            ? (this.canvasWindowSize = 'Normal view')
            : (this.canvasWindowSize = 'Fullscreen');
        //  this.cdf.detectChanges();
        this.toggleCanvasUI = true;
        this.isFullscreen = !this.isFullscreen;
        this.isFullscreen ? (this.bodyHeight = 100) : (this.bodyHeight = 84);
        this.msgService.sendMessage({ fullscreen: this.isFullscreen });
    };
    // Create New UI
    CanvasComponent.prototype.createUI = function (createUIData) {
        this.showCreateUI = false;
        this.resetCanvas();
        this.isCanvasDisabled = false;
        this.canvasUI.name = createUIData.createModel.name;
        this.canvasUI.boundedcontextId = createUIData.createModel.boundedcontextId;
        this.canvasUI.boundedcontext = createUIData.createModel.boundedcontext;
        this.canvasUI.domain = createUIData.createModel.domain;
        this.canvasUI.domainId = createUIData.createModel.domainId;
        this.canvasUI.metadata.modelInfo.models.length = 0;
        this.canvasUI.metadata = createUIData.template;
        this.getModelData();
        this.reloadFromJSON(this.canvasUI);
    };
    /*'/api/dna/objects/findByBoundedContextId/' +
     this._sharedDataService.uiDetails.boundedcontextId*/
    /*'assets/dna/data/test.json'*/
    CanvasComponent.prototype.getModelData = function () {
        var _this = this;
        var response;
        this._restCallService
            .getRestCall('/api/dna/objects/findByBoundedContextId/' +
            this._sharedDataService.uiDetails.boundedcontextId)
            .subscribe(function (res) {
            response = res;
        }, function (err) { }, function () {
            if (response.success) {
                _this.getModelDataSuccess(response);
            }
        });
    };
    CanvasComponent.prototype.getModelDataSuccess = function (data) {
        var _this = this;
        console.log(JSON.stringify(data));
        console.log(JSON.stringify(this.canvasUI.metadata));
        data.response.forEach(function (opt) {
            if (_this.canvasUI.metadata.modelInfo.models &&
                _this.canvasUI.metadata.modelInfo.models.length > 0) {
                _this.canvasUI.metadata.modelInfo.models.forEach(function (childOpt) {
                    if (childOpt.hasOwnProperty('name') && opt.hasOwnProperty('name')) {
                        if (childOpt.name === opt.name) {
                            opt['checked'] = true;
                            _this.disabledMapButton = false;
                        }
                    }
                    else {
                        console.log('name field not found');
                    }
                });
            }
        });
        this.modelsData = data.response;
        console.log('modelData---->', JSON.stringify(this.modelsData));
        this.showModelBindingUI = true;
    };
    // Open Exiting UI
    CanvasComponent.prototype.openUI = function (openUIData) {
        this.showOpenUI = false;
        this.resetCanvas();
        this.isCanvasDisabled = false;
        this._sharedDataService.uiDetails = {};
        this._sharedDataService.uiDetails['boundedcontext'] =
            openUIData.boundedcontext;
        this._sharedDataService.uiDetails['domain'] = openUIData.domain;
        this._sharedDataService.uiDetails['boundedcontextId'] =
            openUIData.boundedcontextId;
        this._sharedDataService.uiDetails['domainId'] = openUIData.domainId;
        this._sharedDataService.uiDetails['name'] = openUIData.name;
        this.getModelData();
        this.reloadFromJSON(openUIData);
    };
    // Reload UI using Json
    CanvasComponent.prototype.reloadFromJSON = function (jsonData) {
        var _this = this;
        this.showModelBindingUI = true;
        this._eventHndl.viewRefs = [];
        this.children = [];
        this.canvasUI = jsonData;
        if (!this.canvasUI.metadata.hasOwnProperty('modelInfo')) {
            this.canvasUI.metadata['modelInfo'] = {};
            this.canvasUI.metadata.modelInfo['models'] = [];
        }
        // ONLY USE FOR OLD UI
        if (this.canvasUI.metadata.child[0].name != 'rootpane') {
            var createObj = {
                name: 'rootpane',
                id: '93291_rootpane',
                child: [],
                properties: {
                    isComponentValid: true
                },
                eventRelationship: {
                    eventDefination: []
                }
            };
            createObj.child.push(this.canvasUI.metadata.child[0]);
            this.canvasUI.metadata.child[0] = createObj;
        }
        this.canvasUI.metadata.child.forEach(function (widget) {
            var componentFactory = _this._componentFactoryResolver.resolveComponentFactory(component_map_1.WidgetMap.COMPONENT_CLASS_MAP[widget.name]);
            var componentInstance = _this.target.createComponent(componentFactory);
            componentInstance.instance.name = widget.name;
            /* CODE FOR OLD UI JSON*/
            /*  if (!widget.hasOwnProperty('componentBehaviour')) {
              let returnObj = this.setComponentBehaviourObject(widget);
              if (returnObj != null) {
                componentInstance.instance.componentBehaviour = returnObj;
              }
            } else {
              componentInstance.instance.componentBehaviour =
                widget.componentBehaviour;
            }*/
            if (componentInstance.instance.hasOwnProperty('editMode')) {
                componentInstance.instance.editMode = true;
            }
            if (componentInstance.instance.hasOwnProperty('parentComponentRef')) {
                componentInstance.instance.parentComponentRef = _this.target.instance;
            }
            componentInstance.instance.properties = widget.properties;
            if (!componentInstance.instance.properties.hasOwnProperty('model') &&
                componentInstance.instance.isComponent) {
                if (!retionship_map_1.RelationshipBlockMap.Component_Restrict[componentInstance.instance.name]) {
                    componentInstance.instance.properties['model'] = new forms_properties_1.ModelClass();
                }
            }
            if (widget.hasOwnProperty('dataSource')) {
                componentInstance.instance.dataSource = widget.dataSource;
            }
            if (widget.hasOwnProperty('eventRelationship')) {
                componentInstance.instance.eventRelationship = widget.eventRelationship;
            }
            componentInstance.changeDetectorRef.detectChanges();
            componentInstance.instance.parentComponentRef = _this;
            _this.children.push(componentInstance);
            _this._eventHndl.currentWidgetRef = componentInstance.instance;
            /* code for spl component open */
            /* End of code for spl component relocation */
            if (widget.child.length > 0) {
                _this.repaintWidgetsInOpen(componentInstance, widget);
            }
            if (component_map_1.WidgetMap.SPL_COMPONENTS[componentInstance.instance.name]) {
                componentInstance.instance.createLocalData();
            }
        });
        this._eventHndl.viewRefs = this.children;
        this._eventHndl.addEditorNewState();
        this.loadDefaultComponent();
    };
    /* APP PREVIEW */
    CanvasComponent.prototype.onAppPreviewClick = function () {
        this.msgService.sendMessage({
            path: 'home/designPipeline/preview',
            title: 'App Preview'
        });
    };
    /* FOR LOCAL TESTING ONLY*/
    CanvasComponent.prototype.localOpenUiTestFunction = function () {
        var lsData = localStorage.getItem('data');
        if (lsData != null && lsData != '') {
            var saveData = JSON.parse(lsData);
            if (saveData != null) {
                this.canvasUI.name = saveData.name;
                this.resetCanvas();
                this.isCanvasDisabled = false;
                this._sharedDataService.uiDetails = {};
                this._sharedDataService.uiDetails['boundedcontext'] =
                    saveData.boundedcontext;
                this._sharedDataService.uiDetails['domain'] = saveData.domain;
                this._sharedDataService.uiDetails['boundedcontextId'] =
                    saveData.boundedcontextId;
                this._sharedDataService.uiDetails['domainId'] = saveData.domainId;
                this._sharedDataService.uiDetails['name'] = saveData.name;
                this.getModelData();
                this.showModelBindingUI = true;
                this.reloadFromJSON(saveData);
            }
        }
    };
    return CanvasComponent;
}());
__decorate([
    core_1.ViewChild('property', { read: core_1.ViewContainerRef })
], CanvasComponent.prototype, "propertyTarget");
__decorate([
    core_1.ViewChild('behaviour', { read: core_1.ViewContainerRef })
], CanvasComponent.prototype, "behaviourTarget");
__decorate([
    core_1.ViewChild('models', { read: core_1.ViewContainerRef })
], CanvasComponent.prototype, "modelTarget");
__decorate([
    core_1.ViewChild('target', { read: core_1.ViewContainerRef })
], CanvasComponent.prototype, "target");
__decorate([
    core_1.ViewChild(model_mapping_component_1.ModelMapComponent)
], CanvasComponent.prototype, "modelComponent");
__decorate([
    core_1.ViewChildren('accordian')
], CanvasComponent.prototype, "accordian");
CanvasComponent = __decorate([
    core_1.Component({
        selector: 'canvas-ui',
        template: "\n      <div class=\"canvas\"  [ngStyle]=\"{'display':_eventHndl.showCanvas ? 'block':'none'}\" [ngClass]=\"{'fullscreen' : isFullscreen}\" >\n      <div class=\"loadingnav\" *ngIf=\"loaderService.isLoading\"></div>\n       <div *ngIf=\"toggleCanvasUI\">\n          <amexio-row>\n            <amexio-column [size]=\"'2'\" id=\"canvasLeftSideColumn\">\n              <div class=\"canvas-component-pane\">\n                <amexio-card [header]=\"true\" [body-height]=\"bodyHeight\" [footer]=\"true\"\n                             [footer-align]=\"'right'\">\n                  <amexio-header>\n                    Ui Components\n                  </amexio-header>\n                  <amexio-body>\n                    <div [ngClass]=\"{'disabled-area':isCanvasDisabled}\">\n                      <amexio-side-nav\n                        [http-url]=\"'assets/dna/data/components.json'\"\n                        [http-method]=\"'get'\"\n                        [data-reader]=\"'children'\"\n                        [width]=\"'100%'\"\n                        [position]=\"'relative'\"\n                        [enable-drag]=\"true\"\n                        (onDrag)=\"_eventHndl.componentElementDragBeginRoot($event)\">\n                      </amexio-side-nav>\n                    </div>\n                  </amexio-body>\n                  <amexio-action>\n                    <amexio-button\n                      [type]=\"'secondary'\"\n                      [tooltip]=\"'Open'\"\n                      [size]=\"'default'\"\n                      (onClick)=\"openUIWindow()\"\n                      [icon]=\"'fa fa-folder-open'\"\n                    >\n                    </amexio-button>\n                    <amexio-button\n                      [type]=\"'primary'\"\n                      [tooltip]=\"'New'\"\n                      [size]=\"'default'\"\n                      (onClick)=\"createUIWindow()\"\n                      [icon]=\"'fa fa-plus-square'\">\n                    </amexio-button>\n                  </amexio-action>\n                </amexio-card>\n              </div>\n            </amexio-column>\n            <amexio-column [size]=\"'8'\">\n              <div class=\"canvas-draw-pane\">\n                <amexio-card [header]=\"false\" [body-height]=\"bodyHeight\" [footer-align]=\"'right'\" [footer]=\"true\">\n                  <amexio-body>\n                    <div class=\"uicanvas-drawingpanel\">\n                      <div  style=\"min-height: 82vh;background-color: white\">\n                        <ng-template #target></ng-template>\n                      </div>\n                    </div>\n\n                  </amexio-body>\n                  <amexio-action >\n                      <div style=\"display: flex;justify-content:flex-end\">\n                          <amexio-label style=\"padding-right:10px;\" size=\"small\" font-color=\"#FF5733\">{{canvasUI.name}}</amexio-label>\n\n                          <div [ngClass]=\"{'disabled-area':isCanvasDisabled}\">\n\n                          <amexio-button\n                            [type]=\"'secondary'\"\n                            [tooltip]=\"'Delete'\"\n                            [size]=\"'default'\"\n                            (onClick)=\"onDelete()\"\n                            [icon]=\"'fa fa-eraser'\">\n                          </amexio-button>\n\n                          <amexio-button\n                            [type]=\"'secondary'\"\n                            [tooltip]=\"'undo'\"\n                            [size]=\"'default'\"\n                            (onClick)=\"onUndo()\"\n                            [icon]=\"'fa fa-undo'\"\n                          >\n                          </amexio-button>\n                          <amexio-button\n                            [type]=\"'secondary'\"\n                            [tooltip]=\"'Redo'\"\n                            [size]=\"'default'\"\n                            (onClick)=\"onRedo()\"\n                            [icon]=\"'fa fa-repeat'\">\n                          </amexio-button>\n\n                         <!-- <amexio-button\n                            [type]=\"'secondary'\"\n                            [tooltip]=\"'Preview'\"\n                            [icon]=\"'fa fa-expand'\"\n                            [size]=\"'default'\" (onClick)=\"onPreview()\">\n                          </amexio-button>-->\n                         <!-- <amexio-button [label]=\"canvasWindowSize\"\n                                         [type]=\"'secondary'\"\n                                         [tooltip]=\"'Fullscreen'\"\n                                         [size]=\"'default'\"\n                                         (onClick)=\"toggleScreenSize()\"\n                                         [icon]=\"isFullscreen ? 'fa fa-compress' :'fa fa-arrows-alt'\"\n                          >\n                          </amexio-button>-->\n                          <amexio-button  [label]=\"'Save'\"\n                                         [type]=\"'theme-color'\"\n                                         [tooltip]=\"'Save'\"\n                                         [size]=\"'default'\"\n                                         (onClick)=\"onSave()\"\n                                         [disabled]=\"saveComplete\"\n                                         [icon]=\"'fa fa-floppy-o'\"\n                          >\n                          </amexio-button>\n\n                        </div>\n\n                        <amexio-button style=\"padding-left:5px\" [label]=\"'Preview'\"\n                        [type]=\"'theme-color'\"\n                        [tooltip]=\"'Preview'\"\n                        [size]=\"'default'\"\n                        (onClick)=\"onAppPreviewClick()\"\n                        [icon]=\"'fa fa-eye'\">\n                      </amexio-button>\n                      </div>\n                  </amexio-action>\n                </amexio-card>\n              </div>\n            </amexio-column>\n            <amexio-column [size]=\"'2'\">\n              <div class=\"canvas-property-pane\">\n                <amexio-card [header]=\"false\"\n                             [body-height]=\"bodyHeight\" [footer]=\"false\">\n                  <amexio-body>\n                        <amexio-accordion #accordian>\n                          <amexio-accordion-tab header=\"Properties\" active=\"true\" >\n                            <div class=\"property-card-style\">\n                              <amexio-card [header]=\"false\"\n                                           [body-height]=\"propertyAccordianHeight\" [footer]=\"false\">\n                                <amexio-body>\n                                  <div style=\"padding: 5px\">\n                                    <ng-template #property></ng-template>\n                                  </div>\n                                </amexio-body>\n                              </amexio-card>\n                            </div>\n\n                          </amexio-accordion-tab>\n                          <amexio-accordion-tab header=\"Behaviour\" [disabled]=\"false\">\n                                <div class=\"property-card-style\">\n                                  <amexio-card [header]=\"false\"\n                                               [footer]=\"false\">\n                                    <amexio-body>\n                                      <div style=\"padding: 5px\">\n                                        <ng-template #behaviour></ng-template>\n                                      </div>\n                                    </amexio-body>\n                                  </amexio-card>\n                                </div>\n\n                          </amexio-accordion-tab>\n                          <amexio-accordion-tab header=\"Models\" [disabled]=\"false\">\n                            <div class=\"property-card-style\">\n                              <amexio-card [header]=\"false\"\n                                           [footer]=\"false\">\n                                <amexio-body>\n                                  <ng-container *ngIf=\"showModelBindingUI\">\n                                    <div style=\"padding: 5px\">\n                                      <model-mapping-UI [disabledMapButton]=\"disabledMapButton\"  [modelsData]=\"modelsData\" (listOfModels)=\"canvasUI.metadata.modelInfo.models = $event\"></model-mapping-UI>\n                                    </div>\n                                  </ng-container>\n                                </amexio-body>\n                              </amexio-card>\n                            </div>\n\n                          </amexio-accordion-tab>\n                        </amexio-accordion>\n                  </amexio-body>\n                </amexio-card>\n              </div>\n            </amexio-column>\n          </amexio-row>\n        </div>\n\n        <ng-container *ngIf=\"showCreateUI\">\n          <create-ui [(show)]=\"showCreateUI\" (onCreateClick)=\"createUI($event)\"></create-ui>\n        </ng-container>\n        <ng-container *ngIf=\"showOpenUI\">\n          <open-ui [(show)]=\"showOpenUI\" (onOpenClick)=\"openUI($event)\"></open-ui>\n        </ng-container>\n      </div>\n\n      <div *ngIf=\"_eventHndl.showDataSource\">\n        <data-source [componentInstance]=\"_eventHndl.componentInstance\"></data-source>\n      </div>\n      <ng-container *ngIf=\"_eventHndl.showRelationship\">\n        <event-relationship [componentInstance]=\"_eventHndl.componentInstance\" [selectedEventData]=\"_eventHndl.selectedEventData\"></event-relationship>\n      </ng-container>\n\n      <!-- Row Drop Dialogue-->\n      <div class=\"row-config\">\n        <amexio-dialogue [show-dialogue]=\"_dragDropEventService.rowAddDialogue\"\n                         [custom]=\"true\" [closable]=\"false\"\n                         [title]=\"'Row Configuration'\"\n                         [type]=\"'confirm'\">\n          <amexio-body>\n            <amexio-row>\n              <amexio-column [size]=\"'6'\" style=\"height: 250px\">\n                <amexio-number-input  [enable-popover]=\"false\"\n                                      [(ngModel)]=\"_dragDropEventService.rowCount\"\n                                      [field-label]=\"'No.of Rows'\"\n                                      [place-holder]=\"'Enter row'\"\n                                      [min-value]=\"1\"\n                                      [max-value]=\"100\"\n                                      [allow-blank]=\"false\"\n                                      [icon-feedback]=\"true\">\n                </amexio-number-input>\n              </amexio-column>\n              <amexio-column [size]=\"'6'\">\n                <amexio-dropdown [(ngModel)]=\"_dragDropEventService.columnCount\"\n                                 [place-holder]=\"'Choose'\" \n                                 [http-url]=\"'assets/dna/data/columndropdown.json'\"\n                                 [http-method]=\"'get'\"\n                                 [field-label]=\"'Column'\"\n                                 [display-field]=\"'text'\"\n                                 [value-field]=\"'value'\"\n                                 [readonly]=\"true\">\n                </amexio-dropdown>\n              </amexio-column>\n            </amexio-row>\n          </amexio-body>\n          <amexio-action>\n            <amexio-button type=\"secondary\"\n                           [icon]=\"'fa fa-times'\"\n                           (onClick)=\"_dragDropEventService.rowDropCancel()\"\n                           [label]=\"'Cancel'\">\n            </amexio-button>\n            <amexio-button type=\"primary\"\n                           [icon]=\"'fa fa-pencil-square'\"\n                           (onClick)=\"_dragDropEventService.rowDrop()\"\n                           [label]=\"'Draw'\">\n            </amexio-button>\n\n          </amexio-action>\n        </amexio-dialogue>\n      </div>\n\n\n    \n      <ng-container *ngIf=\"showCreateModel\">\n        <create-model [(showModel)]=\"showCreateModel\" (createModelEvent)=\"createModel($event)\"></create-model>\n      </ng-container>\n\n      <amexio-dialogue  [(show)]=\"migrationStatusDialogue\"\n                        [button-size]=\"'medium'\"\n                        [title]=\"'Confirm'\"\n                        [message]=\"'Please migrate project ?'\"\n                        [message-type]=\"'confirm'\"\n                        (actionStatus)=\"migrateProject($event)\">\n      </amexio-dialogue>\n\n      <amexio-notification [data]=\"_eventHndl.notificationData\"\n                           [vertical-position]=\"'top'\"\n                           [horizontal-position]=\"'right'\"\n                           [auto-dismiss-msg]=\"true\"\n                           [auto-dismiss-msg-interval]=\"4000\">\n      </amexio-notification>\n    <canvas-notification></canvas-notification>\n\n\n\n  ",
        styles: [
            "\n      .fullscreen {\n        width: 100%;\n        height: 100%;\n      }\n      .menuDisabled {\n        text-decoration: line-through red;\n      }\n\n      .disabled-area {\n        pointer-events: none;\n        opacity: 0.4;\n        cursor: not-allowed;\n        padding-right: 5px;\n      }\n    "
        ]
    })
], CanvasComponent);
exports.CanvasComponent = CanvasComponent;
var SaveJSON = (function () {
    function SaveJSON() {
        this.name = '';
        this.id = '';
        this.child = [];
    }
    return SaveJSON;
}());
exports.SaveJSON = SaveJSON;
var CanvasPage = (function () {
    function CanvasPage() {
        this.child = [];
        this.properties = {};
        this.dataSource = {};
        this.eventRelationship = {};
        this.modelInfo = {};
        this.name = 'canvaspage';
        this.modelInfo['models'] = [];
    }
    return CanvasPage;
}());
exports.CanvasPage = CanvasPage;
var CanvasUI = (function () {
    function CanvasUI() {
        this.id = null;
        this.name = '';
        this.boundedcontext = '';
        this.domain = '';
        this.designComplete = true;
        this.metadata = new CanvasPage();
    }
    return CanvasUI;
}());
exports.CanvasUI = CanvasUI;
