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
  selector: 'canvas-text-input',
  template: `
    <div (click)="setSelfActive($event)" [attr.id]="componentId" 
         (mouseover)="onMouseOver($event)" (mouseleave)="onMouseLeave($event)"
         draggable="true" [ngClass]="{'componentStyle':isOver,'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}"
          (dragstart)="_eventHndl.componentElementRelocateDragBegin($event,this)"
    (dragover)="componentElementDraggedOver($event)"
          (contextmenu)="loadContextMenu($event)">
      <div>
      <amexio-text-input [field-label]="properties.fieldLabel"
                         name="name"
                         [has-label]="properties.hasLabel"
                         [place-holder]="properties.placeholder"
                         [icon-feedback]="properties.iconFeedBack">
      </amexio-text-input>
      </div>
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
export class CanvasTextInputComponent extends CanvasWidgetClass
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
    this.properties = new TextInputProperty();
    this.eventRelationship = new EventRelationBaseModel();
  }

  ngOnInit() {
    console.log('canvas ngOnInit');

    this.componentId =
      +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
  }
  @HostListener('document:click')
  onWindowClick() {
    console.log('canvas textinput');
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

export class TextInputProperty implements FormsInterface {
  placeholder: string;
  disabled: boolean;
  errorMsg: string;
  hasLabel: boolean;
  name: string;

  /*validation related attribute*/

  fieldLabel: string;
  fieldIcon: string;
  maxLength: number;
  minLength: number;
  maxErrorMsg: string;
  minErrorMsg: string;
  allowBlank: boolean;
  iconFeedBack: boolean;
  pattern: string;

  /*style related attribute*/

  fontStyle: string;
  fontSize: number;
  fontFamily: string;
  enablePopOver: boolean;
  popoverPlacement: string;
  isComponentValid: boolean;

  model: any;
  constructor() {
    /*temporary use*/
    this.model = new ModelClass();
    this.name = '';
    this.isComponentValid = false;
    this.fieldLabel = 'text input';
    this.placeholder = '';
    this.disabled = false;
    this.errorMsg = '';
    this.hasLabel = true;
    this.maxLength = 20;
    this.minLength = 0;
    this.maxErrorMsg = '';
    this.minErrorMsg = '';
    this.allowBlank = true;
    this.iconFeedBack = false;
    this.enablePopOver = false;
    this.fontSize = 10;
    this.fontStyle = '';
    this.fieldIcon = '';
    this.popoverPlacement = '';
    this.pattern = '';
    this.fontFamily = '';
  }
}
