/**
 * Created by dattaram on 1/3/18.
 */
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
  selector: 'canvas-card',
  template: `
    <div class="canvas-card" (click)="setSelfActive($event)" [attr.id]="componentId"
         (mouseover)="onMouseOver($event)" (mouseleave)="onMouseLeave($event)"
         draggable="true" [ngClass]="{'componentStyle':isOver,'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}"
          (dragstart)="_eventHndl.componentElementRelocateDragBegin($event,this)"
          (contextmenu)="loadContextMenu($event)"
         (dragenter)="componentDragExit($event)"
          (dragover)="componentElementDraggedOver($event)" #card>
    <amexio-card [header]="properties.enableHeader"
                 [footer]="properties.enableFooter"
                 [footer-align]="properties.footerAlign"
                 [header-align]="properties.headerAlign">
      <amexio-header>
          <div [ngStyle]="{'display' : properties.customHeader ? 'block' : 'none'}">
            <div #cardheadertarget></div>
          </div>
        <div [ngStyle]="{'display' : !properties.customHeader ? 'block' : 'none'}">
          <amexio-label [size]="properties.size" [font-color]="properties.color">{{properties.header}}</amexio-label>
        </div>
      </amexio-header>
      <amexio-body>
          <div #cardbodytarget></div>
      </amexio-body>
      <amexio-action>
        <div #cardactiontarget></div>
      </amexio-action>
    </amexio-card>
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
export class CanvasCardComponent extends CanvasWidgetClass
  implements OnInit, OnDestroy {
  @ViewChild('cardbodytarget', { read: ViewContainerRef })
  target: any;
  @ViewChild('cardactiontarget', { read: ViewContainerRef })
  actionTarget: any;
  @ViewChild('cardheadertarget', { read: ViewContainerRef })
  headerTarget: any;
  showContextMenu: boolean;
  mouseLocation: { left: number; top: number } = { left: 0, top: 0 };
  constructor(
    public _eventHndl: EventHandlerService,
    public _componentFactoryResolver: ComponentFactoryResolver
  ) {
    super();
    this.isComponent = false;
    this.properties = new CardProperties();
  }

  ngOnInit() {
    this.componentId =
      +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
  }
  onMouseOver(event: any) {
    event.stopPropagation();
    this.isOver = true;
  }
  onMouseLeave(event: any) {
    event.stopPropagation();
    this.isOver = false;
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

  createCardConfig() {
    const cardHeaderComponentFactory = this._componentFactoryResolver.resolveComponentFactory(
      WidgetMap.COMPONENT_CLASS_MAP['cardheader']
    );
    const cardHeaderComponentInstance = this.headerTarget.createComponent(
      cardHeaderComponentFactory
    );

    const cardBodyComponentFactory = this._componentFactoryResolver.resolveComponentFactory(
      WidgetMap.COMPONENT_CLASS_MAP['cardbody']
    );
    const cardBodayComponentInstance = this.target.createComponent(
      cardBodyComponentFactory
    );
    /*--create cardaction instance--*/
    const cardActionComponentFactory = this._componentFactoryResolver.resolveComponentFactory(
      WidgetMap.COMPONENT_CLASS_MAP['cardaction']
    );
    const cardActionComponentInstance = this.actionTarget.createComponent(
      cardActionComponentFactory
    );
    this.children.push(
      cardHeaderComponentInstance,
      cardBodayComponentInstance,
      cardActionComponentInstance
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

  componentDragExit(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.isActive = false;
  }
}

export class CardProperties implements FormsInterface {
  isComponentValid: boolean;
  name: string;
  enableHeader: boolean;
  enableFooter: boolean;
  height: number;
  show: boolean;
  headerAlign: string;
  footerAlign: string;
  header: string;
  customHeader: boolean;
  size: string;
  color: any;
  constructor() {
    /*temporary use*/
    this.name = 'card_' + Math.floor(Math.random() * 90000) + 10000;
    this.isComponentValid = true;
    this.enableHeader = true;
    this.enableFooter = true;
    this.show = true;
    this.headerAlign = 'left';
    this.footerAlign = 'right';
    this.customHeader = false;
    this.color = '';
    this.size = '';
  }
}
