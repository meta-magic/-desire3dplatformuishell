/**
 * Created by dattaram on 5/3/18.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CanvasWidgetClass } from '../../canvas-models/canvas.widget.class';

@Component({
  selector: '[stepboxblock]',
  template: ``
})
export class CanvasStepBoxBlockComponent extends CanvasWidgetClass
  implements OnInit, OnDestroy {
  name = 'stepboxblock';
  constructor() {
    super();
    this.properties = new StepBoxBlockProperties();
  }

  ngOnInit() {
    this.componentId =
      +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
  }
  ngOnDestroy() {}
}

export class StepBoxBlockProperties {
  isComponentValid: boolean;
  name: string;
  label: string;
  active: boolean;
  iconClass: string;

  constructor() {
    this.isComponentValid = false;
    this.name = '';
    this.label = 'Step Block';
    this.iconClass = 'fa fa-user';
    this.active = true;
  }
}
