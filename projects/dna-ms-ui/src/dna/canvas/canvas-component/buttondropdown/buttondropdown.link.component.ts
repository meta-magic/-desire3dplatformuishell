/**
 * Created by dattaram on 15/3/18.
 */

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
  selector: '[link]',
  template: ``
})
export class CanvasButtonLinkComponent extends CanvasWidgetClass
  implements OnInit, OnDestroy {
  name = 'buttonlink';
  constructor(
    public eventHndl: EventHandlerService,
    public _componentFactoryResolver: ComponentFactoryResolver,
    public viewContainerRef: ViewContainerRef
  ) {
    super();
    this.componentBehaviour.hasRelationship = true;
    this.properties = new ButtonLinkProperties();
  }

  ngOnInit() {
    this.componentId =
      +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
  }
  ngOnDestroy() {}
}

export class ButtonLinkProperties {
  isComponentValid: boolean;
  name: string;
  label: string;
  disabled: boolean;
  icon: string;
  iconClass: string;

  constructor() {
    this.isComponentValid = false;
    this.name = '';
    this.label = 'Item ';
    this.disabled = false;
    this.icon = '';
    this.iconClass = '';
  }
}
