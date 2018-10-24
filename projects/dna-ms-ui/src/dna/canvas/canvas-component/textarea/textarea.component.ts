/**
 * Created by dattaram on 14/2/18.
 */
import {
  Component,
  ComponentFactoryResolver,
  HostListener,
  OnInit
} from '@angular/core';
import { EventHandlerService } from '../../canvas-service/event.service';
import { CanvasWidgetClass } from '../../canvas-models/canvas.widget.class';
import { PropertyMap } from '../../canvas-component-map/properties.map';
import {
  FormsInterface,
  ModelClass
} from '../../canvas-models/forms.properties';
import { EventRelationBaseModel } from '../../event-relationship/models/event.basemodel';

@Component({
  selector: 'canvas-text-area',
  template: `
    <div (click)="setSelfActive($event)" [attr.id]="componentId"
          (mouseover)="onMouseOver($event)" (mouseleave)="onMouseLeave($event)"
          draggable="true" [ngClass]="{'componentStyle':isOver,'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}"
    (dragstart)="_eventHndl.componentElementRelocateDragBegin($event,this)"
    (contextmenu)="loadContextMenu($event)"
    (dragover)="componentElementDraggedOver($event)" #txtarea>
      <amexio-textarea-input
                             [field-label]="properties.fieldLabel"
                             name ="Address"
                             [has-label]="properties.hasLabel"
                             [allow-blank]="properties.allowBlank"
                             [disabled]="properties.disabled"
                             [place-holder]="properties.placeholder"
                             [icon-feedback]="properties.iconFeedBack"
                             [rows]="properties.noOfRows"
                             [columns]="properties.noOfCols">
      </amexio-textarea-input>
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
export class CanvasTextAreaInputComponent extends CanvasWidgetClass
  implements OnInit {
  showContextMenu: boolean;
  eventRelationship: EventRelationBaseModel;
  mouseLocation: { left: number; top: number } = { left: 0, top: 0 };
  constructor(
    public _eventHndl: EventHandlerService,
    public _componentFactoryResolver: ComponentFactoryResolver
  ) {
    super();
    this.componentBehaviour.hasModelBinding = true;
    this.componentBehaviour.hasRelationship = true;
    this.componentBehaviour.isBindingComponent = true;
    this.properties = new TextAreaInputProperty();
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
    this._eventHndl.deleteComponentRef = null;
    this._eventHndl.deleteComponentRef = this.componentId;
    this._eventHndl.setAllComponentsInactive(this.componentId);
    this._eventHndl.loadComponentProperties(this.name);
  }

  componentElementDraggedOver(event: any) {
    event.preventDefault();
  }
}

export class TextAreaInputProperty implements FormsInterface {
  isComponentValid: boolean;
  fieldLabel: string;
  name: string;
  placeholder: string;
  disabled: boolean;
  hasLabel: boolean;
  noOfRows: number;
  noOfCols: number;

  errorMsg: string;
  /*validation related attribute*/

  fieldIcon: string;
  allowBlank: boolean;
  iconFeedBack: boolean;

  /*style related attribute*/

  fontStyle: string;
  fontSize: number;
  enablePopOver: boolean;
  model: any;
  constructor() {
    this.model = new ModelClass();
    this.name = '';
    this.noOfRows = 3;
    this.noOfCols = 2;
    this.isComponentValid = false;
    this.fieldLabel = 'Text Area';
    this.placeholder = '';
    this.disabled = false;
    this.errorMsg = '';
    this.hasLabel = true;
    this.allowBlank = true;
    this.iconFeedBack = false;
    this.enablePopOver = false;
    this.fontSize = 10;
    this.fontStyle = '';
    this.fieldIcon = '';
    this.errorMsg = '';
  }
}
