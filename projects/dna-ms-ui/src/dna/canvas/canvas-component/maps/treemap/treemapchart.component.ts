import { ChartBasic } from './../../charts/chartproperties/chartbasic';
import { DatasourceModel, Metadata } from '../../../canvas-models/datasource.model';

/**
 * Created by sagar on 12/3/18.OnChanges
 */
import {
  Component,
  ComponentFactoryResolver,
  HostListener,
  OnInit
} from '@angular/core';
import { EventHandlerService } from '../../../canvas-service/event.service';
import { CanvasWidgetClass } from '../../../canvas-models/canvas.widget.class';
import { FormsInterface } from '../../../canvas-models/forms.properties';

@Component({
  selector: 'treemap-chart-input',
  template: `
    <div class="componentStyle"  (click)="setSelfActive($event)" [attr.id]="componentId"
          draggable="true" [ngClass]="{'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}"
          (dragstart)="_eventHndl.componentElementRelocateDragBegin($event,this)"
          (contextmenu)="loadContextMenu($event)"
    (dragover)="componentElementDraggedOver($event)" #treechart>
      <div>

 <amexio-map-treemap
 [data]="treemapChartData"
 [height]="properties.chartBasic.height"
 [width]="properties.chartBasic.width"
 [max-color]="properties.chartBasic.maxColor"
 [mid-color]="properties.chartBasic.midColor"
 [min-color]="properties.chartBasic.minColor"
 [max-post-depth]="properties.chartBasic.maxPostDepth"
 [show-scale]="properties.chartBasic.showScale"
 >

</amexio-map-treemap>
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
export class CanvasTreemapchartComponent extends CanvasWidgetClass
  implements OnInit {
  overStyle: any;
  treemapChartData: any;
  showContextMenu: boolean;
  mouseLocation: { left: number; top: number } = { left: 0, top: 0 };
  constructor(
    public _eventHndl: EventHandlerService,
    public _componentFactoryResolver: ComponentFactoryResolver
  ) {
    super();
    this.componentBehaviour.isBindingComponent = true;
    this.componentBehaviour.hasDataSource = true;
    this.treemapChartData = [
      [
        'Location',
        'Parent',
        'Market trade volume (size)',
        'Market increase/decrease (color)'
      ],
      ['Global', null, 0, 0],
      ['America', 'Global', 0, 0],
      ['Europe', 'Global', 0, 0],
      ['Asia', 'Global', 0, 0],
      ['Australia', 'Global', 0, 0],
      ['Africa', 'Global', 0, 0],
      ['Brazil', 'America', 11, 10],
      ['USA', 'America', 52, 31],
      ['Mexico', 'America', 24, 12],
      ['Canada', 'America', 16, -23],
      ['France', 'Europe', 42, -11],
      ['Germany', 'Europe', 31, -2],
      ['Sweden', 'Europe', 22, -13],
      ['Italy', 'Europe', 17, 4],
      ['UK', 'Europe', 21, -5],
      ['China', 'Asia', 36, 4],
      ['Japan', 'Asia', 20, -12],
      ['India', 'Asia', 40, 63],
      ['Laos', 'Asia', 4, 34],
      ['Mongolia', 'Asia', 1, -5],
      ['Israel', 'Asia', 12, 24],
      ['Iran', 'Asia', 18, 13],
      ['Pakistan', 'Asia', 11, -52],
      ['Egypt', 'Africa', 21, 0],
      ['S. Africa', 'Africa', 30, 43],
      ['Sudan', 'Africa', 12, 2],
      ['Congo', 'Africa', 10, 12],
      ['Zaire', 'Africa', 8, 10]
    ];
    this.properties = new TreemapchartProperty();
    this.dataSource = new TreemapchartDatasource();
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
    this.showContextMenu = false;
    this._eventHndl.deleteComponentRef = null;
    this._eventHndl.deleteComponentRef = this.componentId;
    this._eventHndl.setAllComponentsInactive(this.componentId);
    this._eventHndl.loadComponentProperties(this.name);
  }

  componentElementDraggedOver(event: any) {
    event.preventDefault();
  }
}

export class TreemapchartProperty extends CanvasWidgetClass
  implements FormsInterface {
  chartBasic: ChartBasic;
  isComponentValid: boolean;
  constructor() {
    super();
    this.chartBasic = new ChartBasic();
    this.isComponentValid = false;
  }
}

export class TreemapchartDatasource extends DatasourceModel {
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
