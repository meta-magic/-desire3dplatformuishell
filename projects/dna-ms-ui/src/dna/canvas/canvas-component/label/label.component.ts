/**
 * Created by pratik on 23/2/18.
 */
import {
  Component,
  ComponentFactoryResolver,
  HostListener,
  OnInit
} from '@angular/core';
import { CanvasWidgetClass } from '../../canvas-models/canvas.widget.class';
import { EventHandlerService } from '../../canvas-service/event.service';
import { PropertyMap } from '../../canvas-component-map/properties.map';
import { FormsInterface } from '../../canvas-models/forms.properties';

@Component({
  selector: 'label-component',
  template: `
   <div (click)="setSelfActive($event)" [attr.id]="componentId"
        (mouseover)="onMouseOver($event)" (mouseleave)="onMouseLeave($event)"
        draggable="true" [ngClass]="{'componentStyle':isOver,'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}"
         style="display: inline-block;"
         draggable="true"
         (dragstart)="_eventHndl.componentElementRelocateDragBegin($event,this)"
         (contextmenu)="loadContextMenu($event)"
         (dragover)="componentElementDraggedOver($event)" #txtField>
     <amexio-label [size]="properties.size" [font-color]="properties.color">{{properties.fieldLabel}}</amexio-label>
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
export class LabelComponent extends CanvasWidgetClass implements OnInit {
  overStyle: any;
  showContextMenu: boolean;
  mouseLocation: { left: number; top: number } = { left: 0, top: 0 };
  constructor(
    public _eventHndl: EventHandlerService,
    public _componentFactoryResolver: ComponentFactoryResolver
  ) {
    super();
    this.componentBehaviour.hasRelationship = true;
    this.properties = new LabelComponentProperty();
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
  setSelfActive(event: any) {
    event.stopPropagation();
    this._eventHndl.deleteComponentRef = null;
    this._eventHndl.deleteComponentRef = this.componentId;
    this._eventHndl.setAllComponentsInactive(this.componentId);
    this._eventHndl.loadComponentProperties(this.name);
  }

  onMouseOver(event: any) {
    event.stopPropagation();
    this.isOver = true;
  }
  onMouseLeave(event: any) {
    event.stopPropagation();
    this.isOver = false;
  }
  componentElementDraggedOver(event: any) {
    event.preventDefault();
  }
}

export class LabelComponentProperty implements FormsInterface {
  disabled: boolean;
  droppable: boolean;
  name: string;

  /*validation related attribute*/

  fieldLabel: string;
  allowBlank: boolean;

  /*style related attribute*/
  isComponentValid: boolean;

  size: string;
  color: string;

  constructor() {
    /*temporary use*/
    this.name = 'label_' + Math.floor(Math.random() * 90000) + 10000;
    this.isComponentValid = true;
    this.fieldLabel = 'Label';
    this.disabled = false;
    this.allowBlank = true;

    this.size = 'small';
    this.color = 'black';
  }
}
