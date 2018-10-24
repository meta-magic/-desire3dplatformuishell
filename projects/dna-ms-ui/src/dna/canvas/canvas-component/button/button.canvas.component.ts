/**
 * Created by pratik on 27/2/18.
 */
import {
  Component,
  ComponentFactoryResolver,
  HostListener,
  OnInit
} from '@angular/core';
import { CanvasWidgetClass } from '../../canvas-models/canvas.widget.class';
import { EventHandlerService } from '../../canvas-service/event.service';
import { FormsInterface } from '../../canvas-models/forms.properties';
import { PropertyMap } from '../../canvas-component-map/properties.map';
import { EventRelationBaseModel } from '../../event-relationship/models/event.basemodel';

@Component({
  selector: 'button-canvas',
  template: `
    <div (click)="setSelfActive($event)" [attr.id]="componentId"
          (mouseover)="onMouseOver($event)" (mouseleave)="onMouseLeave($event)"
          draggable="true" [ngClass]="{'componentStyle':isOver,'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}"
          (dragstart)="_eventHndl.componentElementRelocateDragBegin($event,this)"
          (contextmenu)="loadContextMenu($event)"
          (dragover)="componentElementDraggedOver($event)" #txtField>
      <amexio-button [label]="properties.label"
                     [size]="properties.size"
                     [type]="properties.type"
                     [icon]="properties.iconClass"
                     [disabled]="properties.disabled"
                     [tooltip]="properties.tooltip" >
      </amexio-button>

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
export class ButtonCanvasComponent extends CanvasWidgetClass implements OnInit {
  showContextMenu: boolean;
  mouseLocation: { left: number; top: number } = { left: 0, top: 0 };
  eventRelationship: EventRelationBaseModel;
  constructor(
    public _eventHndl: EventHandlerService,
    public _componentFactoryResolver: ComponentFactoryResolver
  ) {
    super();
    this.componentBehaviour.hasRelationship = true;
    this.properties = new ButtonProperties();
    this.properties.fieldLabel = this.properties.label;
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

export class ButtonProperties implements FormsInterface {
  disabled: boolean;
  errorMsg: string;
  hasLabel: boolean;
  checked: boolean;
  name: string;
  type: string;
  iconClass: string;
  size: string;
  tooltip: string;
  fieldLabel: string;
  /*validation related attribute*/

  label: string;
  allowBlank: boolean;

  /*style related attribute*/
  isComponentValid: boolean;
  formBind: string;
  constructor() {
    /*temporary use*/
    this.name = '';
    this.isComponentValid = false;
    this.label = 'Button';
    this.disabled = false;
    this.errorMsg = '';
    this.hasLabel = true;
    this.allowBlank = true;
    this.type = 'default';
    this.size = 'default';
    this.iconClass = '';
    this.tooltip = 'button';
    this.formBind = '';
    this.fieldLabel = this.label;
  }
}
