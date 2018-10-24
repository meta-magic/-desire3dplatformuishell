/**
 * Created by dattaram on 5/3/18.
 */
import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  HostListener,
  ViewContainerRef
} from '@angular/core';
import { CanvasWidgetClass } from '../../canvas-models/canvas.widget.class';
import { DragDropEventService } from '../../canvas-service/dragdrop.event.service';
import { EventHandlerService } from '../../canvas-service/event.service';
import { FormsInterface } from '../../canvas-models/forms.properties';
import { PropertyMap } from '../../canvas-component-map/properties.map';

@Component({
  selector: 'canvas-step-box',
  template: `
    <div (click)="setSelfActive($event)" [attr.id]="componentId"
          (mouseover)="onMouseOver($event)" (mouseleave)="onMouseLeave($event)"
          draggable="true" [ngClass]="{'componentStyle':isOver,'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}"
          (dragstart)="_eventHndl.componentElementRelocateDragBegin($event,this)"
          (contextmenu)="loadContextMenu($event)"
          (dragover)="componentElementDraggedOver($event)" #stepbox>
      <div class="dropable-area">

        <amexio-steps [data]="localData" [block]="properties.block" [index]="properties.index" [icon]="properties.icon" (getStepBlockData)="getBlockData($event)">
        </amexio-steps>
      </div>
     <!-- <amexio-steps [icon]="true" [block]="true">
        <amexio-step-block [label]="'User'"
                           [active]="true"
                           [icon]="'fa fa-user'" >
        </amexio-step-block>
        <amexio-step-block [label]="'Address'"
                           [active]="false"
                           [icon]="'fa fa-address-card'">
        </amexio-step-block>
        <amexio-step-block [label]="'Shop'"
                           [active]="false"
                           [icon]="'fa fa-shopping-cart'">
        </amexio-step-block>
        <amexio-step-block [label]="'Payment'"
                           [active]="false"
                           [icon]="'fa fa-cc-visa'">
        </amexio-step-block>
      </amexio-steps>-->


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
export class CanvasStepBoxComponent extends CanvasWidgetClass
  implements OnInit {
  overStyle: any;
  localData: any[];
  showBlockProperties: boolean;
  blockPropertyObject: any;
  target: any;

  showContextMenu: boolean;
  mouseLocation: { left: number; top: number } = { left: 0, top: 0 };
  constructor(
    public _dragDropEventService: DragDropEventService,
    public _eventHndl: EventHandlerService,
    public _componentFactoryResolver: ComponentFactoryResolver,
    public viewContainerRef: ViewContainerRef
  ) {
    super();
    this.properties = new StepBoxProperties();
    this.target = this.viewContainerRef;
    this.showBlockProperties = false;
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
  onHover() {
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
    this.showBlockProperties = false;
    this._eventHndl.deleteComponentRef = null;
    this._eventHndl.deleteComponentRef = this.componentId;
    this._eventHndl.setAllComponentsInactive(this.componentId);
    this._eventHndl.loadComponentProperties(this.name);
  }

  componentElementDraggedOver(event: any) {
    event.preventDefault();
  }

  createComponentConfig() {
    if (this._eventHndl.eventType !== 'R') {
      this._eventHndl.componentClassKeyDragged = null;
      this._eventHndl.componentClassKeyDragged = 'stepboxblock';
      this._dragDropEventService.componentElementDrop(this);
    }
    this.createLocalData();
    this._eventHndl.deleteComponentRef = null;
    this._eventHndl.deleteComponentRef = this.componentId;
    this._eventHndl.setAllComponentsInactive(this.componentId);
    this._eventHndl.loadComponentProperties(this.name);
  }

  getBlockData(data: any) {
    data.event.stopPropagation();
    this._eventHndl.loadComponentProperties(this.name);
    this.showBlockProperties = true;
    this.blockPropertyObject = data.data;
  }

  /* DONT REMOVE createLocalData FUNTION IT WILL BREAK STEPBOX OPEN CASE */

  createLocalData() {
    this.localData = [];
    this.children.forEach(child => {
      this.localData.push(child.instance.properties);
    });
  }
}

export class StepBoxProperties implements FormsInterface {
  isComponentValid: boolean;
  name: string;
  icon: boolean;
  index: boolean;
  block: boolean;
  constructor() {
    this.name = '';
    this.isComponentValid = false;
    this.block = true;
    this.index = false;
    this.icon = false;
  }
}
