/**
 * Created by dattaram on 7/3/18.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { CanvasWidgetClass } from '../../canvas-models/canvas.widget.class';

@Component({
  selector: '[column]',
  template: ``
})
export class CanvasDataGridColumnComponent extends CanvasWidgetClass
  implements OnInit, OnDestroy {
  name = 'datagridcolumn';
  constructor() {
    super();
    this.properties = new DatagridColumnProperties();
  }

  ngOnInit() {
    this.componentId =
      +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
  }
  ngOnDestroy() {}
}

export class DatagridColumnProperties {
  isComponentValid: boolean;
  text: string;
  dataindex: string;
  datatype: string;
  hidden: boolean;
  width: any;

  constructor() {
    this.isComponentValid = true;
    this.text = 'Name';
    this.hidden = false;
    this.datatype = 'string';
    this.dataindex = '';
    this.width = 10;
  }
}
