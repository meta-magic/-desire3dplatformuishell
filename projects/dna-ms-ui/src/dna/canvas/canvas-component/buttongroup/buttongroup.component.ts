/**
 * Created by dattaram on 28/2/18.
 */
import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  HostListener,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { CanvasWidgetClass } from '../../canvas-models/canvas.widget.class';
import { EventHandlerService } from '../../canvas-service/event.service';
import { FormsInterface } from '../../canvas-models/forms.properties';
import { PropertyMap } from '../../canvas-component-map/properties.map';
import { DragDropEventService } from '../../canvas-service/dragdrop.event.service';
import { EventRelationBaseModel } from '../../event-relationship/models/event.basemodel';

@Component({
  selector: 'canvas-button-group',
  template: `
    <div  style="padding: 5px" (click)="setSelfActive($event)" [attr.id]="componentId"
          (mouseover)="onMouseOver($event)" (mouseleave)="onMouseLeave($event)"
          draggable="true" [ngClass]="{'componentStyle':isOver,'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}"
          (dragstart)="_eventHndl.componentElementRelocateDragBegin($event,this)"
          (contextmenu)="loadContextMenu($event)"
          (dragover)="componentElementDraggedOver($event)" #butongroup>
      <amexio-btn-group [buttonGroupLocalData]="localData" [size]="properties.size" (getButton)="getButtonData($event)">
      </amexio-btn-group>
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
export class ButtonGroupComponent extends CanvasWidgetClass implements OnInit {
  localData: any[];
  showButtonProperties: boolean;
  buttonPropertyObject: any;
  target: any;
  showContextMenu: boolean;
  eventRelationship: EventRelationBaseModel;
  mouseLocation: { left: number; top: number } = { left: 0, top: 0 };
  constructor(
    public _dragDropEventService: DragDropEventService,
    public _eventHndl: EventHandlerService,
    public _componentFactoryResolver: ComponentFactoryResolver,
    public viewContainerRef: ViewContainerRef
  ) {
    super();
    this.properties = new ButtonGroupProperties();
    this.eventRelationship = new EventRelationBaseModel();
    this.target = this.viewContainerRef;
    this.showButtonProperties = false;
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
    this.showButtonProperties = false;
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
      this.showButtonProperties = false;
      this._eventHndl.componentClassKeyDragged = null;
      this._eventHndl.componentClassKeyDragged = 'buttongroupaction';
      this._dragDropEventService.componentElementDrop(this);
    }
    this.createLocalData();
    this.showButtonProperties = false;
    this._eventHndl.deleteComponentRef = null;
    this._eventHndl.deleteComponentRef = this.componentId;
    this._eventHndl.setAllComponentsInactive(this.componentId);
    this._eventHndl.loadComponentProperties(this.name);
  }

  loadComponentProperties() {
    this._eventHndl.propertyViewRef.clear();
    const propertyFactory = this._componentFactoryResolver.resolveComponentFactory(
      PropertyMap.PROPERTY_MAP[this.name]
    );
    const propertyInstance = this._eventHndl.propertyViewRef.createComponent(
      propertyFactory
    );
    propertyInstance.instance.componentInstance = this;
    propertyInstance.changeDetectorRef.detectChanges();
  }

  getButtonData(data: any) {
    data.event.stopPropagation();
    this._eventHndl.loadComponentProperties(this.name);
    this.showButtonProperties = true;
    this.buttonPropertyObject = data.buttonObject;
  }

  /* DONT REMOVE createLocalData FUNTION IT WILL BREAK BUTTONGROUP OPEN CASE */

  createLocalData() {
    this.localData = [];
    this.children.forEach(child => {
      this.localData.push(child.instance.properties);
    });
  }
}

export class ButtonGroupProperties implements FormsInterface {
  name: string;
  isComponentValid: boolean;
  size: string;
  constructor() {
    this.name = '';
    this.isComponentValid = false;
    this.size = 'default';
  }
}
