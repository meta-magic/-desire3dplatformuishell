/**
 * Created by pratik on 22/3/18.
 */
import { ViewChild } from '@angular/core';

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
  selector: 'button-float-group-canvas',
  template: `
    <div (click)="setSelfActive($event)" [attr.id]="componentId"
          (mouseover)="onMouseOver($event)" (mouseleave)="onMouseLeave($event)"
          draggable="true" [ngClass]="{'componentStyle':isOver,'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}"
          (dragstart)="_eventHndl.componentElementRelocateDragBegin($event,this)"
          (dragover)="componentElementDraggedOver($event)" #btnfloat>

      <amexio-floating-group-button [relative]="properties.relative" [disabled]="properties.disabled"
                                    [vertical-position]="properties.verticalposition" [position-top]="properties.positionTop"
                                    [data]="floatingbuttongroup" [floating-group-position]="properties.floatingGroupPosition" [position-bottom]="properties.positionBottom" [position-right]="properties.positionRight" [position-left]="properties.positionLeft"
                                    [icon]="properties.iconClass" [type]="properties.type">
      </amexio-floating-group-button>
    </div>
  `
})
export class ButtonFloatGroupCanvasComponent extends CanvasWidgetClass
  implements OnInit {
  floatingBtn: any;
  floatingbuttongroup: any[];
  eventRelationship: EventRelationBaseModel;

  constructor(
    public _eventHndl: EventHandlerService,
    public _componentFactoryResolver: ComponentFactoryResolver
  ) {
    super();
    this.componentBehaviour.hasRelationship = true;
    this.properties = new ButtonFloatGroupProperties();
    this.eventRelationship = new EventRelationBaseModel();
    this.floatingbuttongroup = [
      { label: 'Facebook', icon: 'fa fa-facebook', type: 'warning' }
    ];
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

  add() {
    this.floatingbuttongroup.push({
      label: 'Google',
      icon: 'fa fa-google-plus',
      type: 'primary'
    });
  }
}

export class ButtonFloatGroupProperties implements FormsInterface {
  label: string;
  type: string;
  relative: boolean;
  iconClass: string;
  // blockName: string;
  disabled: boolean;
  verticalPosition: string;
  horizontalPosition: string;
  positionTop: string;
  positionBottom: string;
  positionRight: string;
  positionLeft: string;
  name: string;
  isComponentValid: boolean;
  floatingGroupPosition: string;

  constructor() {
    this.label = 'Button';
    this.type = 'theme-color';
    this.iconClass = 'fa fa-ellipsis-v';
    this.relative = true;
    // this.blockName = 'circle';
    this.disabled = false;
    this.iconClass = '';
    this.verticalPosition = 'top';
    this.horizontalPosition = 'left';
    this.positionTop = '';
    this.positionBottom = '';
    this.positionRight = '';
    this.positionLeft = '';
    this.name = '';
    this.isComponentValid = false;
    this.floatingGroupPosition = 'top';
  }
}
