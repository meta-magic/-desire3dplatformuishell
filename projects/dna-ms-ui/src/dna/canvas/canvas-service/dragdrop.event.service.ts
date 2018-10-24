/**
 * Created by dattaram on 20/2/18.
 */
import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { EventHandlerService } from './event.service';
import { WidgetMap } from '../canvas-component-map/component.map';
import { PropertyMap } from '../canvas-component-map/properties.map';
import PROPERTY_MAP = PropertyMap.PROPERTY_MAP;
import { CanvasPage, SaveJSON } from '../canvas.component';
import { BehaviourMap } from '../canvas-component-map/behaviour.map';
import { ModelClass } from '../canvas-models/forms.properties';

@Injectable()
export class DragDropEventService {
  property: any;
  forms: any[];
  keys: any[];
  notificationData: any[];

  /*row drop attribute*/

  rowAddDialogue: boolean;
  rowCount: number;
  columnCount: number;
  rowDropComponentRef: any;

  constructor(
    public _eventHndl: EventHandlerService,
    private _componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.rowCount = 1;
    this.columnCount = 1;
    this.rowAddDialogue = false;
    this.notificationData = [];
  }

  componentElementDrop(componentRef: any) {
    if (this._eventHndl.componentClassKeyDragged != null) {
      if (this._eventHndl.eventType !== 'R') {
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(
          WidgetMap.COMPONENT_CLASS_MAP[
            this._eventHndl.componentClassKeyDragged
          ]
        );
        const componentInstance = componentRef.target.createComponent(
          componentFactory
        );
        componentInstance.instance.name = this._eventHndl.componentClassKeyDragged;
        // componentInstance.instance.componentBehaviour = this._eventHndl.draggedObject.componentBehaviour;
        if (componentInstance.instance.componentBehaviour.hasModelBinding) {
          componentInstance.instance.properties['model'] = new ModelClass();
        }
        if (componentInstance.instance.hasOwnProperty('parentComponentRef'))
          componentInstance.instance.parentComponentRef = componentRef;
        componentInstance.changeDetectorRef.detectChanges();
        if (
          this._eventHndl.componentClassKeyDragged == 'card' ||
          this._eventHndl.componentClassKeyDragged == 'form'
        ) {
          componentInstance.instance.createCardConfig();
        } else if (this._eventHndl.componentClassKeyDragged == 'border') {
          componentInstance.instance.createConfig();
        } else if (this._eventHndl.componentClassKeyDragged == 'datapoint') {
          componentInstance.instance.createConfig();
        }
        this._eventHndl.deleteComponentRef =
          componentInstance.instance.componentId;
        componentRef.children.push(componentInstance);
        this._eventHndl.setAllComponentsInactive(
          componentInstance.instance.componentId
        );
        this._eventHndl.addEditorNewState();
        this._eventHndl.loadComponentProperties(
          this._eventHndl.componentClassKeyDragged
        );
        componentInstance.instance.parentRef = componentRef;
        this._eventHndl.componentClassKeyDragged = null;
        if (WidgetMap.SPL_COMPONENTS[componentInstance.instance.name]) {
          componentInstance.instance.createComponentConfig();
        }
      } else {
        this.relocateDrop(componentRef);
      }
    }
  }

  relocateDrop(componentRef: any) {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(
      WidgetMap.COMPONENT_CLASS_MAP[this._eventHndl.componentClassKeyDragged]
    );
    const componentInstance = componentRef.target.createComponent(
      componentFactory
    );
    componentInstance.instance.name = this._eventHndl.componentClassKeyDragged;
    if (
      this._eventHndl.componentViewRefToDel.instance.hasOwnProperty(
        'children'
      ) &&
      this._eventHndl.componentViewRefToDel.instance.children.length > 0
    ) {
      this.relocateInnerElements(
        this._eventHndl.componentViewRefToDel.instance,
        componentInstance
      );
    }

    componentInstance.instance.properties = this._eventHndl.componentViewRefToDel.instance.properties;
    componentInstance.instance.dataSource = this._eventHndl.componentViewRefToDel.instance.dataSource;
    componentInstance.instance.eventRelationship = this._eventHndl.componentViewRefToDel.instance.eventRelationship;
    componentInstance.changeDetectorRef.detectChanges();
    componentRef.children.push(componentInstance);
    this._eventHndl.setAllComponentsInactive(
      componentInstance.instance.componentId
    );
    componentInstance.instance.parentComponentRef = componentRef;
    this._eventHndl.componentViewRefToDel.destroy();
    this._eventHndl.removeRelocateComponent(
      this._eventHndl.componentViewRefToDel.instance.componentId
    );
    this._eventHndl.addEditorNewState();
    this._eventHndl.componentClassKeyDragged = null;
    if (WidgetMap.SPL_COMPONENTS[componentInstance.instance.name]) {
      componentInstance.instance.createLocalData();
    }
    this._eventHndl.eventType = null;
  }

  relocateInnerElements(parentRef: any, createdParentRef: any) {
    parentRef.children.forEach((innerChild: any) => {
      let innerComponentInstance: any;
      if (parentRef.name == 'card' || parentRef.name == 'form') {
        innerComponentInstance = this.createCardChildComponent(
          innerChild.instance,
          createdParentRef
        );
      } else if (parentRef.name == 'border') {
        innerComponentInstance = this.createBorderChildComponents(
          innerChild.instance,
          createdParentRef
        );
      } else if (parentRef.name == 'datapoint') {
        innerComponentInstance = this.createDataPointChildComponents(
          innerChild.instance,
          createdParentRef
        );
      } else {
        const innerComponentFactory = createdParentRef.instance._componentFactoryResolver.resolveComponentFactory(
          WidgetMap.COMPONENT_CLASS_MAP[innerChild.instance.name]
        );
        innerComponentInstance = createdParentRef.instance.target.createComponent(
          innerComponentFactory
        );
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
      if (
        innerChild.instance.hasOwnProperty('children') &&
        innerChild.instance.children.length > 0
      ) {
        this.relocateInnerElements(innerChild.instance, innerComponentInstance);
      }
      if (WidgetMap.SPL_COMPONENTS[innerComponentInstance.instance.name]) {
        innerComponentInstance.instance.createLocalData();
      }
    });
  }

  createDataPointChildComponents(compo: any, targetComponentRef: any): any {
    let componentInstance: any;
    let componentFactory: any;
    if (compo.name === 'dataWest') {
      componentFactory = this._componentFactoryResolver.resolveComponentFactory(
        WidgetMap.COMPONENT_CLASS_MAP[compo.name]
      );
      return (componentInstance = targetComponentRef.instance.datawest.createComponent(
        componentFactory
      ));
    }
    if (compo.name === 'dataCenter') {
      componentFactory = this._componentFactoryResolver.resolveComponentFactory(
        WidgetMap.COMPONENT_CLASS_MAP[compo.name]
      );
      return (componentInstance = targetComponentRef.instance.datacenter.createComponent(
        componentFactory
      ));
    }
    if (compo.name === 'dataSouth') {
      componentFactory = this._componentFactoryResolver.resolveComponentFactory(
        WidgetMap.COMPONENT_CLASS_MAP[compo.name]
      );
      return (componentInstance = targetComponentRef.instance.datasouth.createComponent(
        componentFactory
      ));
    }
    if (compo.name === 'dataNorth') {
      componentFactory = this._componentFactoryResolver.resolveComponentFactory(
        WidgetMap.COMPONENT_CLASS_MAP[compo.name]
      );
      return (componentInstance = targetComponentRef.instance.datanorth.createComponent(
        componentFactory
      ));
    }
    if (compo.name === 'dataEast') {
      componentFactory = this._componentFactoryResolver.resolveComponentFactory(
        WidgetMap.COMPONENT_CLASS_MAP[compo.name]
      );
      return (componentInstance = targetComponentRef.instance.dataeast.createComponent(
        componentFactory
      ));
    }
  }
  createCardChildComponent(compo: any, targetComponentRef: any): any {
    let componentInstance: any;
    let componentFactory: any;
    if (compo.name === 'cardbody' || compo.name === 'formbody') {
      componentFactory = this._componentFactoryResolver.resolveComponentFactory(
        WidgetMap.COMPONENT_CLASS_MAP[compo.name]
      );
      return (componentInstance = targetComponentRef.instance.target.createComponent(
        componentFactory
      ));
    }
    if (compo.name === 'cardheader' || compo.name === 'formheader') {
      componentFactory = this._componentFactoryResolver.resolveComponentFactory(
        WidgetMap.COMPONENT_CLASS_MAP[compo.name]
      );
      return (componentInstance = targetComponentRef.instance.headerTarget.createComponent(
        componentFactory
      ));
    }
    if (compo.name === 'cardaction' || compo.name === 'formaction') {
      componentFactory = this._componentFactoryResolver.resolveComponentFactory(
        WidgetMap.COMPONENT_CLASS_MAP[compo.name]
      );
      return (componentInstance = targetComponentRef.instance.actionTarget.createComponent(
        componentFactory
      ));
    }
  }

  createBorderChildComponents(compo: any, targetComponentRef: any): any {
    let componentInstance: any;
    let componentFactory: any;
    if (compo.name === 'borderNorth') {
      componentFactory = this._componentFactoryResolver.resolveComponentFactory(
        WidgetMap.COMPONENT_CLASS_MAP[compo.name]
      );
      return (componentInstance = targetComponentRef.instance.borderNorth.createComponent(
        componentFactory
      ));
    }
    if (compo.name === 'borderEast') {
      componentFactory = this._componentFactoryResolver.resolveComponentFactory(
        WidgetMap.COMPONENT_CLASS_MAP[compo.name]
      );
      return (componentInstance = targetComponentRef.instance.borderEast.createComponent(
        componentFactory
      ));
    }
    if (compo.name === 'borderCenter') {
      componentFactory = this._componentFactoryResolver.resolveComponentFactory(
        WidgetMap.COMPONENT_CLASS_MAP[compo.name]
      );
      return (componentInstance = targetComponentRef.instance.borderCenter.createComponent(
        componentFactory
      ));
    }
    if (compo.name === 'borderWest') {
      componentFactory = this._componentFactoryResolver.resolveComponentFactory(
        WidgetMap.COMPONENT_CLASS_MAP[compo.name]
      );
      return (componentInstance = targetComponentRef.instance.borderWest.createComponent(
        componentFactory
      ));
    }
    if (compo.name === 'borderSouth') {
      componentFactory = this._componentFactoryResolver.resolveComponentFactory(
        WidgetMap.COMPONENT_CLASS_MAP[compo.name]
      );
      return (componentInstance = targetComponentRef.instance.borderSouth.createComponent(
        componentFactory
      ));
    }
  }

  /*Row Drop Function*/

  rowDropCancel() {
    this.rowCount = 1;
    this.columnCount = 1;
    this.rowAddDialogue = false;
  }

  rowDrop() {
    if (
      this.rowCount >= 1 &&
      (this.columnCount >= 1 && this.columnCount <= 12)
    ) {
      this.createRowJson(this.rowDropComponentRef);

      this.rowDropCancel();
    } else {
      this.notificationData.push('Please validate component');
    }
  }

  createRowJson(parentRef: any): any {
    let rowJsonObject: any;
    rowJsonObject = new CanvasPage();
    for (let i = 0; i < this.rowCount; i++) {
      const rowObject = new SaveJSON();
      rowObject.name = 'row';
      rowObject.id =
        +Math.floor(Math.random() * 90000) + 10000 + '_' + rowObject.name;
      rowObject.properties = {};
      rowObject.properties['isComponentValid'] = true;
      for (let j = 0; j < this.columnCount; j++) {
        const columnObject = new SaveJSON();
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
  }

  dropRowOnRoot(rowData: any, parentRef: any) {
    rowData.child.forEach((widget: any) => {
      const componentFactory = this._componentFactoryResolver.resolveComponentFactory(
        WidgetMap.COMPONENT_CLASS_MAP[widget.name]
      );
      const componentInstance = parentRef.target.createComponent(
        componentFactory
      );
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
        this.dropRowOnRoot(widget, componentInstance.instance);
      }
    });
    if (parentRef && parentRef.name && parentRef.name === 'row') {
      parentRef.componentInitailized();
    }
    this._eventHndl.addEditorNewState();
  }
}
