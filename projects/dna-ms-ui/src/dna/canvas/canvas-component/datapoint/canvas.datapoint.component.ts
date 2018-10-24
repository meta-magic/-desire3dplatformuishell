import {
  Component,
  ComponentFactoryResolver,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { CanvasWidgetClass } from '../../canvas-models/canvas.widget.class';
import { EventHandlerService } from '../../canvas-service/event.service';
import { PropertyMap } from '../../canvas-component-map/properties.map';
import { WidgetMap } from '../../canvas-component-map/component.map';

@Component({
  selector: 'canvas-data-point',
  template: `
    <div (click)="setSelfActive($event)" [attr.id]="componentId"
          (mouseover)="onMouseOver($event)" (mouseleave)="onMouseLeave($event)"
          draggable="true" [ngClass]="{'componentStyle':isOver,'componentSelectStyle':isActive}"
          (dragstart)="_eventHndl.componentElementRelocateDragBegin($event,this)"
         (contextmenu)="loadContextMenu($event)"
          (dragover)="componentElementDraggedOver($event)" #card>

      <amexio-datapoints [north]="properties.north" [west]="properties.west" [center]="properties.center" [east]="properties.east" [south]="properties.south">
        <amexio-north>
          <ng-template #datanorth></ng-template>
        </amexio-north>
        <amexio-west>
          <ng-template #datawest></ng-template>
        </amexio-west>
        <amexio-center>
         <ng-template #datacenter></ng-template>
        </amexio-center>
        <amexio-east>
          <ng-template #dataeast></ng-template>
        </amexio-east>
        <amexio-south>
         <ng-template #datasouth></ng-template>
        </amexio-south>
      </amexio-datapoints>

    </div>
    <span  *ngIf="showContextMenu" (click)="onDeleteClick()" class="dropdown"
    [ngStyle]="{left: this.mouseLocation.left + 'px',top: this.mouseLocation.top + 'px',position:'fixed','box-shadow': '1px 1px 2px #000000',width: '15%'}">
        <ul class="dropdown-list">
          <li class="list-items">
            <span ><i class="fa fa-trash" style="padding-right: 5px;"></i> <b>Delete</b> </span>
          </li>
        </ul>
      </span>
  `
})
export class CanvasDataPointComponent extends CanvasWidgetClass
  implements OnInit, OnDestroy {
  @ViewChild('datawest', { read: ViewContainerRef })
  datawest: any;
  @ViewChild('datacenter', { read: ViewContainerRef })
  datacenter: any;
  @ViewChild('datasouth', { read: ViewContainerRef })
  datasouth: any;
  @ViewChild('datanorth', { read: ViewContainerRef })
  datanorth: any;
  @ViewChild('dataeast', { read: ViewContainerRef })
  dataeast: any;

  northInstance: any;
  eastInstance: any;
  centerInstance: any;
  westInstance: any;
  southInstance: any;

  showContextMenu: boolean;
  mouseLocation: { left: number; top: number } = { left: 0, top: 0 };

  constructor(
    public _eventHndl: EventHandlerService,
    public _componentFactoryResolver: ComponentFactoryResolver
  ) {
    super();
    this.properties = new DataPointLayout();
  }

  ngOnInit() {
    this.componentId =
      +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
  }

  @HostListener('document:click')
  onWindowClick() {
    this.showContextMenu = false;
  }
  getContextMenuStyle() {
    return {
      position: 'fixed',
      display: this.showContextMenu ? 'block' : 'none',
      left: this.mouseLocation.left + 'px',
      top: this.mouseLocation.top + 'px',
      'box-shadow': '1px 1px 2px #000000',
      width: '15%'
    };
  }
  loadContextMenu(event: any) {
    this.mouseLocation.left = event.clientX;
    this.mouseLocation.top = event.clientY;
    this.showContextMenu = true;
    event.preventDefault();
    event.stopPropagation();
    this._eventHndl.deleteComponentRef = this.componentId;
  }
  onDeleteClick() {
    this.showContextMenu = false;
    this._eventHndl.componentIdToDel = this.componentId;
    this._eventHndl.deleteComponent();
    this._eventHndl.addEditorNewState();
  }

  onMouseOver(event: any) {
    event.stopPropagation();
    this.isOver = true;
  }
  onMouseLeave(event: any) {
    event.stopPropagation();
    this.isOver = false;
  }
  setSelfActive(event: any) {
    event.stopPropagation();
    this._eventHndl.deleteComponentRef = null;
    this._eventHndl.deleteComponentRef = this.componentId;
    this._eventHndl.setAllComponentsInactive(this.componentId);
    this._eventHndl.loadComponentProperties(this.name);
  }

  componentElementDraggedOver(event: any) {
    event.preventDefault();
  }

  createConfig() {
    const dataWest = this._componentFactoryResolver.resolveComponentFactory(
      WidgetMap.COMPONENT_CLASS_MAP['dataWest']
    );
    const borderWestComponentInstance = this.datawest.createComponent(dataWest);

    this.westInstance = borderWestComponentInstance;

    const dataCenter = this._componentFactoryResolver.resolveComponentFactory(
      WidgetMap.COMPONENT_CLASS_MAP['dataCenter']
    );
    const borderCenterComponentInstance = this.datacenter.createComponent(
      dataCenter
    );

    this.centerInstance = borderCenterComponentInstance;

    const dataSouth = this._componentFactoryResolver.resolveComponentFactory(
      WidgetMap.COMPONENT_CLASS_MAP['dataSouth']
    );
    const borderSouthComponentInstance = this.datasouth.createComponent(
      dataSouth
    );

    this.southInstance = borderSouthComponentInstance;

    const dataEast = this._componentFactoryResolver.resolveComponentFactory(
      WidgetMap.COMPONENT_CLASS_MAP['dataEast']
    );

    const dataEastComponentInstance = this.dataeast.createComponent(dataEast);

    this.eastInstance = dataEastComponentInstance;

    const dataNorth = this._componentFactoryResolver.resolveComponentFactory(
      WidgetMap.COMPONENT_CLASS_MAP['dataNorth']
    );

    const dataNorthComponentInstance = this.datanorth.createComponent(
      dataNorth
    );

    this.northInstance = dataNorthComponentInstance;

    this.children.push(
      dataNorthComponentInstance,
      dataEastComponentInstance,
      borderCenterComponentInstance,
      borderWestComponentInstance,
      borderSouthComponentInstance
    );
  }

  ngOnDestroy() {
    this.removeDuplicateOnRelocate(this._eventHndl.viewRefs);
    this.removeFromParent(this.parentComponentRef);
  }

  removeDuplicateOnRelocate(components: any[]) {
    components.forEach((compRef, index) => {
      if (compRef.componentId === this.componentId) {
        components.splice(index, 1);
        return;
      } else {
        if (compRef.hasOwnProperty('children') && compRef.children.length > 0) {
          this.removeDuplicateOnRelocate(compRef.children);
        }
      }
    });
  }

  removeFromParent(parentComponentRef: any) {
    if (parentComponentRef != null) {
      parentComponentRef.children.forEach((del: any, index: any) => {
        if (del.instance.componentId === this.componentId) {
          parentComponentRef.children.splice(index, 1);
        }
      });
    }
  }
}

export class DataPointLayout {
  name: string;
  north: boolean;
  east: boolean;
  center: boolean;
  west: boolean;
  south: boolean;
  backgroundColor: string;
  fontColor: string;
  isComponentValid: boolean;
  constructor() {
    /*temporary use*/
    this.isComponentValid = true;
    this.name = 'datapoint_' + Math.floor(Math.random() * 90000) + 10000;
    this.north = true;
    this.east = true;
    this.center = true;
    this.west = true;
    this.south = true;
    this.backgroundColor = '';
    this.fontColor = '';
  }
}
