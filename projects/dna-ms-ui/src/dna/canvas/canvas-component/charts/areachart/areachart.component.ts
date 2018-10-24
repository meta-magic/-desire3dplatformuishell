import { DatasourceModel, Metadata } from '../../../canvas-models/datasource.model';
import { ChartLegend } from './../chartproperties/chartlegend';
import { ChartTitle } from './../chartproperties/charttitle';
import { ChartBasic } from './../chartproperties/chartbasic';

/**
 * Created by sagar on 12/3/18.OnChanges
 */
import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  HostListener
} from '@angular/core';
import { EventHandlerService } from '../../../canvas-service/event.service';
import { CanvasWidgetClass } from '../../../canvas-models/canvas.widget.class';
import { PropertyMap } from '../../../canvas-component-map/properties.map';
import { FormsInterface } from '../../../canvas-models/forms.properties';

@Component({
  selector: 'area-chart-input',
  template: `
    <div class="componentStyle"  (click)="setSelfActive($event)" [attr.id]="componentId"
          draggable="true" [ngClass]="{'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}"
          (dragstart)="_eventHndl.componentElementRelocateDragBegin($event,this)"
          (contextmenu)="loadContextMenu($event)"
    (dragover)="componentElementDraggedOver($event)" #areachart>
      <div>

 <amexio-chart-area [data]="areaChartData"
 [height]="properties.chartBasic.height"
 [width]="properties.chartBasic.width" >
<amexio-chart-title [title]="properties.chartTitle.title"
  [color]="properties.chartTitle.color"
  [font-name]="properties.chartTitle.fontName"
  [font-size]="properties.chartTitle.fontSize"
  [bold]="properties.chartTitle.bold"
  [italic]="properties.chartTitle.italic"
>
</amexio-chart-title>

<amexio-chart-legend [position]="properties.chartLegend.position"
  [max-lines]="properties.chartLegend.maxLines"
  [font-name]="properties.chartLegend.fontName"
  [font-size]="properties.chartLegend.fontSize"
  [color]="properties.chartLegend.color"
  [alignment]="properties.chartLegend.alignment">
</amexio-chart-legend>

</amexio-chart-area>
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
export class CanvasAreachartComponent extends CanvasWidgetClass
  implements OnInit {
  overStyle: any;
  areaChartData: any;
  showContextMenu: boolean;
  mouseLocation: { left: number; top: number } = { left: 0, top: 0 };
  constructor(
    public _eventHndl: EventHandlerService,
    public _componentFactoryResolver: ComponentFactoryResolver
  ) {
    super();
    this.componentBehaviour.isBindingComponent = true;
    this.areaChartData = [
      ['Year', 'Sales', 'Expenses'],
      ['2013', 1000, 400],
      ['2014', 1170, 460],
      ['2015', 660, 1120],
      ['2016', 1030, 540]
    ];
    this.properties = new AreachartProperty();
    this.dataSource = new AreachartDatasource();
  }

  ngOnInit() {
    this.componentId =
      +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
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

export class AreachartProperty extends CanvasWidgetClass
  implements FormsInterface {
  chartBasic: ChartBasic;
  chartTitle: ChartTitle;
  chartLegend: ChartLegend;
  isComponentValid: boolean;
  constructor() {
    super();
    this.chartBasic = new ChartBasic();
    this.chartTitle = new ChartTitle();
    this.chartLegend = new ChartLegend();
    this.isComponentValid = false;
  }
}

export class AreachartDatasource extends DatasourceModel {
  dataReader: string;
  metadata: any;
  servicetype: any;
  localDataName: any;
  displayField: string;
  valueField: string;
  constructor() {
    super();
    this.metadata = new Metadata();
    this.dataReader = '';
    this.servicetype = '1';
    this.displayField = '';
    this.valueField = '';
    this.localDataName = null;
    this.remote.httpMethod = 1;
    this.remote.httpUrl = '';
  }
}

