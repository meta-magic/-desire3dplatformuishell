import { HostListener, ViewChild } from '@angular/core';
/**
 * Created by sagar on 20/3/18.
 */
import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import { CanvasWidgetClass } from '../../canvas-models/canvas.widget.class';
import { EventHandlerService } from '../../canvas-service/event.service';
import { FormsInterface } from '../../canvas-models/forms.properties';
import { PropertyMap } from '../../canvas-component-map/properties.map';
import { EventRelationBaseModel } from '../../event-relationship/models/event.basemodel';

@Component({
  selector: 'button-float-canvas',
  template: `
    <div (click)="setSelfActive($event)" [attr.id]="componentId"
          (mouseover)="onMouseOver($event)" (mouseleave)="onMouseLeave($event)"
          draggable="true" [ngClass]="{'componentStyle':isOver,'invalidStyleClass': !properties.isComponentValid}"
          (dragstart)="_eventHndl.componentElementRelocateDragBegin($event,this)"
          (contextmenu)="loadContextMenu($event)"
          (dragover)="componentElementDraggedOver($event)" #btnfloat>

          <amexio-floating-button
          [type]="properties.type"
           [relative]="properties.relative"
           [icon]="properties.iconClass"
           [label]="properties.label"
           [block]="properties.blockName"
           [disabled]="properties.disabled"

           [horizontal-position]="properties.horizontalPosition"
           [vertical-position]="properties.verticalPosition"

           [position-bottom]="properties.positionBottom"
           [position-right]="properties.positionRight"
           [position-top]="hiddenProperties.positionTop"
           [position-left]="hiddenProperties.positionLeft">
           </amexio-floating-button>
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
export class ButtonFloatCanvasComponent extends CanvasWidgetClass
  implements OnInit {
  floatingBtn: any;
  showContextMenu: boolean;
  hiddenProperties: HiddenProperties;
  eventRelationship: EventRelationBaseModel;
  mouseLocation: { left: number; top: number } = { left: 0, top: 0 };
  constructor(
    public _eventHndl: EventHandlerService,
    public _componentFactoryResolver: ComponentFactoryResolver
  ) {
    super();
    this.componentBehaviour.hasRelationship = true;
    this.properties = new ButtonFloatProperties();
    this.hiddenProperties = new HiddenProperties();
    this.eventRelationship = new EventRelationBaseModel();
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
}

export class ButtonFloatProperties implements FormsInterface {
  label: string;
  type: string;
  relative: boolean;
  iconClass: string;
  blockName: string;
  disabled: boolean;
  verticalPosition: string;
  horizontalPosition: string;
  positionTop: number;
  positionBottom: string;
  positionRight: string;
  positionLeft: number;
  name: string;
  isComponentValid: boolean;

  constructor() {
    this.label = 'Button';
    this.type = 'theme-color';
    this.relative = true;
    this.blockName = 'circle';
    this.disabled = false;
    this.iconClass = '';
    this.verticalPosition = 'top';
    this.horizontalPosition = 'left';
    this.positionTop = 0;
    this.positionBottom = '';
    this.positionRight = '';
    this.positionLeft = 0;
    this.name = '';
    this.isComponentValid = false;
  }
}
export class HiddenProperties {
  positionLeft: string;
  positionTop: string;
  constructor() {
    this.positionLeft = '0%';
    this.positionTop = '0%';
  }
}
