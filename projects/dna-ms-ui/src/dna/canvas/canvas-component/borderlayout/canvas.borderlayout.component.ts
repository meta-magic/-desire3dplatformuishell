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
import { FormsInterface } from '../../canvas-models/forms.properties';
import { WidgetMap } from '../../canvas-component-map/component.map';

@Component({
  selector: 'canvas-border-layout',
  template: `
    <div (click)="setSelfActive($event)" [attr.id]="componentId"
          (mouseover)="onMouseOver($event)" (mouseleave)="onMouseLeave($event)"
         (contextmenu)="loadContextMenu($event)"
          draggable="true" [ngClass]="{'componentStyle':isOver,'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}"
          (dragstart)="_eventHndl.componentElementRelocateDragBegin($event,this)"
          (dragover)="componentElementDraggedOver($event)" #card>

      <amexio-borderlayout>

        <amexio-borderlayout-item position="north" [ngStyle]="{'display' : properties.north ? 'block' : 'none'}">
          <ng-template #borderNorth></ng-template>
          N
        </amexio-borderlayout-item>
        <amexio-borderlayout-item position="east" [ngStyle]="{'display' : properties.east ? 'block' : 'none'}">
          <ng-template #borderEast></ng-template>
          E
        </amexio-borderlayout-item>
        <amexio-borderlayout-item position="center" [ngStyle]="{'display' : properties.center ? 'block' : 'none'}">
          <ng-template #borderCenter></ng-template>
          C
        </amexio-borderlayout-item>
        <amexio-borderlayout-item position="west" [ngStyle]="{'display' : properties.west ? 'block' : 'none'}">
          <ng-template #borderWest></ng-template>
          W
        </amexio-borderlayout-item>
        <amexio-borderlayout-item position="south" [ngStyle]="{'display' : properties.south ? 'block' : 'none'}">
          <ng-template #borderSouth></ng-template>
          S
        </amexio-borderlayout-item>
      </amexio-borderlayout>
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
export class CanvasBorderLayoutComponent extends CanvasWidgetClass
  implements OnInit, OnDestroy {
  @ViewChild('borderNorth', { read: ViewContainerRef })
  borderNorth: any;
  @ViewChild('borderEast', { read: ViewContainerRef })
  borderEast: any;
  @ViewChild('borderCenter', { read: ViewContainerRef })
  borderCenter: any;
  @ViewChild('borderWest', { read: ViewContainerRef })
  borderWest: any;
  @ViewChild('borderSouth', { read: ViewContainerRef })
  borderSouth: any;

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
    this.properties = new BorderLayout();
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
    const borderNorth = this._componentFactoryResolver.resolveComponentFactory(
      WidgetMap.COMPONENT_CLASS_MAP['borderNorth']
    );
    const borderNorthComponentInstance = this.borderNorth.createComponent(
      borderNorth
    );
    this.northInstance = borderNorthComponentInstance;

    const borderEast = this._componentFactoryResolver.resolveComponentFactory(
      WidgetMap.COMPONENT_CLASS_MAP['borderEast']
    );
    const borderEastComponentInstance = this.borderEast.createComponent(
      borderEast
    );
    this.eastInstance = borderEastComponentInstance;

    const borderCenter = this._componentFactoryResolver.resolveComponentFactory(
      WidgetMap.COMPONENT_CLASS_MAP['borderCenter']
    );

    const borderCenterComponentInstance = this.borderCenter.createComponent(
      borderCenter
    );
    this.centerInstance = borderCenterComponentInstance;

    const borderWest = this._componentFactoryResolver.resolveComponentFactory(
      WidgetMap.COMPONENT_CLASS_MAP['borderWest']
    );

    const borderWestComponentInstance = this.borderWest.createComponent(
      borderWest
    );
    this.westInstance = borderWestComponentInstance;

    const borderSouth = this._componentFactoryResolver.resolveComponentFactory(
      WidgetMap.COMPONENT_CLASS_MAP['borderSouth']
    );

    const borderSouthComponentInstance = this.borderSouth.createComponent(
      borderSouth
    );

    this.southInstance = borderSouthComponentInstance;

    this.children.push(
      borderNorthComponentInstance,
      borderEastComponentInstance,
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

export class BorderLayout implements FormsInterface {
  name: string;
  north: boolean;
  east: boolean;
  center: boolean;
  west: boolean;
  south: boolean;
  isComponentValid: boolean;
  constructor() {
    this.isComponentValid = true;
    this.name = 'border_' + Math.floor(Math.random() * 90000) + 10000;
    this.north = true;
    this.east = true;
    this.center = true;
    this.west = true;
    this.south = true;
  }
}
