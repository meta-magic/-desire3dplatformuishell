import { VerticalAxis } from './../chartproperties/verticalaxis';
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
import { HorizontaAxis } from '../chartproperties/horizontalaxis';

@Component({
  selector: 'bubble-chart-input',
  template: `
    <div  (click)="setSelfActive($event)" [attr.id]="componentId"
          draggable="true" [ngClass]="{'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}"
          (dragstart)="_eventHndl.componentElementRelocateDragBegin($event,this)"
          (contextmenu)="loadContextMenu($event)"
    (dragover)="componentElementDraggedOver($event)" #bubblechart>
      <div>

 <amexio-chart-bubble [data]="bubbleChartData"
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

<amexio-chart-horizontal-axis
[title]="properties.horizontaAxis.title"
[title-color]="properties.horizontaAxis.titleColor"
>
</amexio-chart-horizontal-axis>
<amexio-chart-vertical-axis
[title]="properties.verticalAxis.title"
[title-color]="properties.verticalAxis.titleColor"
>
</amexio-chart-vertical-axis>

</amexio-chart-bubble>
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
export class CanvasBubblechartComponent extends CanvasWidgetClass
  implements OnInit {
  overStyle: any;
  bubbleChartData: any;
  showContextMenu: boolean;
  mouseLocation: { left: number; top: number } = { left: 0, top: 0 };
  constructor(
    public _eventHndl: EventHandlerService,
    public _componentFactoryResolver: ComponentFactoryResolver
  ) {
    super();
    this.componentBehaviour.isBindingComponent = true;
    this.bubbleChartData = [
      ['ID', 'Life Expectancy', 'Fertility Rate', 'Region', 'Population'],
      ['CAN', 80.66, 1.67, 'North America', 33739900],
      ['DEU', 79.84, 1.36, 'Europe', 81902307],
      ['DNK', 78.6, 1.84, 'Europe', 5523095],
      ['EGY', 72.73, 2.78, 'Middle East', 79716203],
      ['GBR', 80.05, 2, 'Europe', 61801570],
      ['IRN', 72.49, 1.7, 'Middle East', 73137148],
      ['IRQ', 68.09, 4.77, 'Middle East', 31090763],
      ['ISR', 81.55, 2.96, 'Middle East', 7485600],
      ['RUS', 68.6, 1.54, 'Europe', 141850000],
      ['USA', 78.09, 2.05, 'North America', 307007000]
    ];
    this.properties = new BubblechartProperty();
    this.dataSource = new BubblechartDatasource();
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

  loadComponentProperties() {
    this._eventHndl.propertyViewRef.clear();
    const propertyFactory = this._componentFactoryResolver.resolveComponentFactory(
      PropertyMap.PROPERTY_MAP[this.name]
    );
    const propertyInstance = this._eventHndl.propertyViewRef.createComponent(
      propertyFactory
    );
    propertyInstance.instance.componentInstance = this._eventHndl.currentWidgetRef;
    propertyInstance.changeDetectorRef.detectChanges();
  }

  componentElementDraggedOver(event: any) {
    event.preventDefault();
  }
}

export class BubblechartProperty extends CanvasWidgetClass
  implements FormsInterface {
  chartBasic: ChartBasic;
  chartTitle: ChartTitle;
  chartLegend: ChartLegend;
  horizontaAxis: HorizontaAxis;
  verticalAxis: VerticalAxis;
  isComponentValid: boolean;
  constructor() {
    super();
    this.chartBasic = new ChartBasic();
    this.chartTitle = new ChartTitle();
    this.chartLegend = new ChartLegend();
    this.horizontaAxis = new HorizontaAxis();
    this.verticalAxis = new VerticalAxis();
    this.isComponentValid = false;
  }
}

export class BubblechartDatasource extends DatasourceModel {
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

