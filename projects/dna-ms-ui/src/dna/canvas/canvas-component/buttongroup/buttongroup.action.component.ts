/**
 * Created by dattaram on 27/10/17.
 */
import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { EventHandlerService } from '../../canvas-service/event.service';
import { CanvasWidgetClass } from '../../canvas-models/canvas.widget.class';

@Component({
  selector: '[action1]',
  template: ``
})
export class CanvasButtonGroupActionComponent extends CanvasWidgetClass
  implements OnInit, OnDestroy {
  name = 'buttongroupaction';
  constructor(
    public eventHndl: EventHandlerService,
    public _componentFactoryResolver: ComponentFactoryResolver,
    public viewContainerRef: ViewContainerRef
  ) {
    super();
    this.componentBehaviour.hasRelationship = true;
    this.properties = new ButtonGroupActionProperties();
  }

  ngOnInit() {
    this.componentId =
      +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
  }
  ngOnDestroy() {}
}

export class ButtonGroupActionProperties {
  isComponentValid: boolean;
  name: string;
  label: string;
  disabled: boolean;
  icon: string;
  iconClass: string;
  type: string;
  tooltip: string;

  constructor() {
    this.isComponentValid = false;
    this.name = '';
    this.label = 'Item ';
    this.disabled = false;
    this.icon = '';
    this.type = 'primary';
    this.tooltip = 'button';
    this.iconClass = '';
  }
}
