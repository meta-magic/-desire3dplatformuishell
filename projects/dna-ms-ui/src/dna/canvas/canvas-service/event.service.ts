/**
 * Created by dattaram on 14/2/18.
 */
import {
  ComponentFactoryResolver,
  ComponentRef,
  Injectable
} from '@angular/core';
import { SaveJSON } from '../canvas.component';
import { EditorStateService } from './editor.state';
import { ValidationMap } from '../canvas-component-map/dradrop-validation-map';
import { allComponentEvent } from '../data-files/event-list';
import { NotificationService } from './notification.service';
import { SharedDataService } from './shared-data.service';
import { BehaviourMap } from '../canvas-component-map/behaviour.map';
import { PropertyMap } from '../canvas-component-map/properties.map';
import { any } from 'codelyzer/util/function';

@Injectable()
export class EventHandlerService {
  draggedObject: any = null;
  componentClassKeyDragged: any;
  propertyViewRef: any;
  behaviourViewRef: any;
  modelViewref: any;
  appComponentInstance: any;
  currentWidgetRef: any;
  deleteComponentRef: any;
  viewRefs: any;
  isValidUI: boolean;
  invalidComponents: any[] = [];
  componentIdToDel: any;
  eventType: any;
  componentViewRefToDel: any;
  isUnique: boolean;
  notificationData: any[];

  /*canvas hide and show*/
  showCanvas: boolean;
  showDataSource: boolean;
  showRelationship: boolean = false;
  componentInstance: any;

  dataSourceTemplateRef: any;

  /*event relationship attribute*/
  selectedEventData: any;
  accordianRef: any;
  selectedModelsData: any;

  isModelBinded = true;
  modelbindedDataRef: any;

  showCreateModel: boolean = false;

  constructor(
    public _editorState: EditorStateService,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _notificationService: NotificationService,
    public _sharedDataService: SharedDataService
  ) {
    this.showCanvas = true;
    this.viewRefs = [];
    this.isValidUI = true;
    this.notificationData = [];
  }

  getViewComponentsRef(): any {
    return this.viewRefs;
  }
  componentElementDragBeginRoot(event: any) {
    if (!event.data.hasOwnProperty('children')) {
      this.draggedObject = event.data;
      this.componentClassKeyDragged = this.draggedObject.key;
    }
  }

  setAllComponentsInactive(elementId: string) {
    if (elementId != null || elementId != '') {
      this.appComponentInstance.children.forEach((comp: any) => {
        comp.instance.showContextMenu = false;
        if (elementId == comp.instance.componentId) {
          comp.instance.isActive = true;
          this.currentWidgetRef = comp.instance;
        } else {
          comp.instance.isActive = false;
        }
        if (comp.instance.hasOwnProperty('children')) {
          this.setAllInactive(comp.instance.children, elementId);
        }
      });
    }
  }
  setAllInactive(child: any[], elementId: any) {
    child.forEach((childComp: any) => {
      childComp.instance.showContextMenu = false;
      if (elementId == childComp.instance.componentId) {
        this.currentWidgetRef = childComp.instance;
        childComp.instance.isActive = true;
      } else {
        childComp.instance.isActive = false;
      }

      if (childComp.instance.hasOwnProperty('children')) {
        this.setAllInactive(childComp.instance.children, elementId);
      }
    });
  }
  addEditorNewState() {
    const currentState: any[] = [];
    this.viewRefs.forEach((widget: any) => {
      const widRefObj = new SaveJSON();
      widRefObj.name = widget.instance.name;
      widRefObj.id = widget.instance.componentId;
      widRefObj.properties = widget.instance.properties;
      widRefObj.dataSource = widget.instance.dataSource;
      widRefObj.eventRelationship = widget.instance.eventRelationship;
      if (
        widget.instance.hasOwnProperty('children') &&
        widget.instance.children.length > 0
      ) {
        this.createSaveJSON(widget.instance, widRefObj);
      }
      currentState.push(widRefObj);
    });
    this._editorState.onAddNewState(currentState);
  }

  createSaveJSON(widRef: any, parentRef: SaveJSON) {
    widRef.children.forEach((child: any) => {
      const childWidRef = new SaveJSON();
      childWidRef.name = child.instance.name;
      childWidRef.id = child.instance.componentId;
      childWidRef.properties = child.instance.properties;
      childWidRef.dataSource = child.instance.dataSource;
      if (child.instance.hasOwnProperty('children')) {
        this.createSaveJSON(child.instance, childWidRef);
      }
      parentRef.child.push(childWidRef);
    });
  }

  componentElementRelocateDragBegin(event: any, ref: any) {
    event.stopPropagation();
    this.componentIdToDel = ref.componentId;
    if (ref.name != null) {
      this.componentClassKeyDragged = ref.name;
      this.eventType = 'R';
      this.findComponentRef(this.viewRefs);
    } else {
      console.warn('No key found on Drag begin Object');
    }
  }

  findComponentRef(viewRefs: ComponentRef<any>[]) {
    viewRefs.forEach((ref: ComponentRef<any>, index: any) => {
      const widViewRef: ComponentRef<any> = ref;
      const widInstance = widViewRef.instance;

      if (this.componentIdToDel == widInstance.componentId) {
        this.componentViewRefToDel = widViewRef;
      }
      // To be called when dropped

      if (
        widInstance.hasOwnProperty('children') &&
        widInstance.children.length > 0
      ) {
        this.findComponentRef(widInstance.children);
      }
    });
  }

  deleteComponent() {
    if (this.deleteComponentRef != null) {
      this.deleteFromViewRef(this.deleteComponentRef);
    } else {
      alert('Please select component for delete operation');
    }
  }

  deleteFromViewRef(elementId: any) {
    this.viewRefs.forEach((comp: any, index: any) => {
      if (
        -1 == elementId.search('_rootpane') &&
        elementId == comp.instance.componentId
      ) {
        comp.destroy();
        this.viewRefs.splice(index, 1);
        return;
      } else {
        if (
          comp.instance.hasOwnProperty('children') &&
          comp.instance.children.length > 0
        ) {
          this.findInSubViewRef(comp.instance, elementId);
        }
      }
    });
  }

  findInSubViewRef(childViewRef: any, elementId: string) {
    childViewRef.children.forEach((subViewRef: any, index: any) => {
      if (
        -1 == elementId.search('_rootpane') &&
        elementId == subViewRef.instance.componentId
      ) {
        subViewRef.destroy();
        childViewRef.children.splice(index, 1);
        return;
      } else {
        if (
          subViewRef.instance.hasOwnProperty('children') &&
          subViewRef.instance.children.length > 0
        ) {
          this.findInSubViewRef(subViewRef.instance, elementId);
        }
      }
    });
  }

  removeRelocateComponent(componentId: any) {
    this.deleteFromViewRef(componentId);
  }

  //* Call when name property changes of each component

  componentValidation(componentInstance: any) {
    if (
      componentInstance.properties.name.split(' ').length == 1 &&
      componentInstance.properties.name != '' &&
      this.checkDuplicateName(componentInstance)
    ) {
      componentInstance.properties.isComponentValid = true;
    } else {
      componentInstance.properties.isComponentValid = false;
    }
  }
  checkDuplicateName(componentInstance: any) {
    this.isUnique = true;
    let name = componentInstance.properties.name;
    let compId = componentInstance.componentId;
    this.appComponentInstance.children.forEach((comp: any) => {
      if (
        compId != comp.instance.componentId &&
        name == comp.instance.properties.name
      ) {
        this.isUnique = false;
        return;
      }
      if (comp.instance.hasOwnProperty('children')) {
        this.checkAllCompNames(comp.instance.children, name, compId);
      }
    });

    if (!this.isUnique) this.notificationData.push('Duplicate Name Found');

    return this.isUnique;
  }

  checkAllCompNames(child: any, name: string, id: string) {
    child.forEach((childComp: any) => {
      if (
        id != childComp.instance.componentId &&
        name == childComp.instance.properties.name
      ) {
        this.isUnique = false;
        return;
      }
      if (childComp.instance.hasOwnProperty('children')) {
        this.checkAllCompNames(childComp.instance.children, name, id);
      }
    });
  }

  findListOfComponent(): any[] {
    const childComponentList: any[] = [];
    this.findListOfComponentInChild(this.viewRefs, childComponentList);
    return childComponentList;
  }

  findListOfComponentInChild(viewRefs: any, childComponentList: any[]) {
    viewRefs.forEach((comp: any) => {
      if (comp.instance.isComponent) {
        const childWidRef = new SaveJSON();
        childWidRef.name = comp.instance.name;
        childWidRef.id = comp.instance.componentId;
        childWidRef.isComponent = comp.instance.isComponent;
        childWidRef.componentBehaviour = comp.instance.componentBehaviour;
        childWidRef.properties = comp.instance.properties;
        childWidRef.dataSource = comp.instance.dataSource;
        childComponentList.push(childWidRef);
      }
      if (
        comp.instance.hasOwnProperty('children') &&
        comp.instance.children.length > 0
      ) {
        this.findListOfComponentInChild(
          comp.instance.children,
          childComponentList
        );
      }
    });
  }

  createDatasourceInstance(componentInstance: any) {
    this.componentInstance = null;
    this.componentInstance = componentInstance;
    this.showDataSource = true;
    this.showCanvas = false;
    this.showRelationship = false;
  }

  showEventretionshipUI(componentInstance: any, eventObject: any) {
    this.showRelationship = false;
    this.componentInstance = null;
    this.selectedEventData = null;
    this.componentInstance = componentInstance;
    this.selectedEventData = eventObject;
    this.showRelationship = true;
    this.showCanvas = false;
    this.showDataSource = false;
  }

  /*call before relationship UI render*/

  checkIsUIValid(): boolean {
    let inValidComStatus: any = [];
    this.findListOfComponent().forEach((com: any) => {
      if (!com.properties.isComponentValid) {
        inValidComStatus.push(com.properties.isComponentValid);
      }
    });
    if (inValidComStatus.length > 0) {
      this._notificationService.setDialogueData(
        true,
        'Please validate all component.',
        'Error'
      );
      return false;
    } else return true;
  }

  findEventListByName(componentName: any): any {
    let returnData: any = null;
    allComponentEvent.forEach((com: any) => {
      if (com.name == componentName) {
        returnData = com.eventList;
      }
    });
    return returnData;
  }

  /* CREATE PROPERTY AND BEHAVIOUR COMPONENT INSTANCE*/

  loadComponentProperties(key: any) {
    this.propertyViewRef.clear();
    this.behaviourViewRef.clear();
    this.accordianRef[0].accordionCollections.forEach(
      (opt: any, index: any) => {
        if (key == 'rootpane') {
          if (index == 1) {
            opt.active = true;
          } else {
            opt.active = false;
          }
        } else {
          if (index == 0) {
            opt.active = true;
          } else {
            opt.active = false;
          }
        }
      }
    );
    if (BehaviourMap.BEHAVIOUR_MAP[key]) {
      const behaviourInstance = this.createComponentInsatnce(
        this.behaviourViewRef,
        BehaviourMap.BEHAVIOUR_MAP[key]
      );
      behaviourInstance.instance.componentInstance = this.currentWidgetRef;
      behaviourInstance.changeDetectorRef.detectChanges();
    }

    if (PropertyMap.PROPERTY_MAP[key]) {
      const propertyInstance = this.createComponentInsatnce(
        this.propertyViewRef,
        PropertyMap.PROPERTY_MAP[key]
      );
      propertyInstance.instance.componentInstance = this.currentWidgetRef;
      propertyInstance.changeDetectorRef.detectChanges();
    }
  }

  createComponentInsatnce(target: any, key: any): any {
    const factory = this._componentFactoryResolver.resolveComponentFactory(key);
    const instance = target.createComponent(factory);
    return instance;
  }

  /*CREATE UI SAVE JSON*/

  createValidSaveJSON(widRef: any, parentRef: SaveJSON) {
    if (widRef.hasOwnProperty('children')) {
      widRef.children.forEach((child: any) => {
        if (child.instance.hasOwnProperty('children')) {
          const childWidRef = new SaveJSON();
          childWidRef.name = child.instance.name;
          // childWidRef.componentBehaviour = child.instance.componentBehaviour;
          childWidRef.id = child.instance.componentId;
          childWidRef.properties = child.instance.properties;
          if (ValidationMap.Icon_Class_Change[child.instance.name]) {
            delete childWidRef.properties['icon'];
          }
          childWidRef.dataSource = child.instance.dataSource;
          childWidRef.eventRelationship = child.instance.eventRelationship;
          parentRef.child.push(childWidRef);
          this.createValidSaveJSON(child.instance, childWidRef);
        } else {
          const childWidRef = new SaveJSON();
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
  }

  /*VALIDATE UI JSON*/

  checkUIComponentValidation(viewRef: any) {
    viewRef.forEach((widgetRef: any) => {
      if (widgetRef.instance.properties.isComponentValid) {
        if (widgetRef.instance.componentBehaviour.hasModelBinding) {
          if (
            widgetRef.instance.properties.model &&
            widgetRef.instance.properties.model.modelName == ''
          ) {
            this.isModelBinded = false;
          }
        }
        if (widgetRef.instance.hasOwnProperty('children')) {
          this.isValidUI = this.checkUIComponentValidation(
            widgetRef.instance.children
          );
        }
      } else {
        this.invalidComponents.push(widgetRef.instance);
        this.isValidUI = false;
      }
    });
    return this.isValidUI;
  }

  reflectModelChangeInComponent(viewRef: any) {
    viewRef.forEach((widgetRef: any) => {
      this.modelbindedDataRef.modelFields.forEach((model: any) => {
        if (widgetRef.instance.properties.name === model.name) {
          widgetRef.instance.properties.model.modelName = this.modelbindedDataRef.modelName;
          widgetRef.instance.properties.model.modelFieldKey = model.name;
        }
      });
      if (
        widgetRef.instance.hasOwnProperty('children') &&
        widgetRef.instance.children.length > 0
      ) {
        this.reflectModelChangeInComponent(widgetRef.instance.children);
      }
    });
  }

  // Create Notification Service data.

  createNotificationData() {
    let notificationData: any[] = [];
    let nObject: any = {};
    nObject['data'] = [];
    this.invalidComponents.forEach((com: any) => {
      let comObject: any = {};
      comObject['text'] = com.name;
      nObject.data.push(comObject);
    });
    notificationData.push(nObject);
    this._notificationService.setCustomNotificationData(
        true,
        'Name required. List of Invalid Component',
        notificationData
    );
  }

  resetValidationData() {
    this.invalidComponents = [];
    this.isValidUI = true;
    this.isModelBinded = true;
  }
}
