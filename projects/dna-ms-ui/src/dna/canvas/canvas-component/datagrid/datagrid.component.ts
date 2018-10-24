/**
 * Created by dattaram on 7/3/18.
 */

import {
  Component,
  ComponentFactoryResolver,
  HostListener,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import { CanvasWidgetClass } from '../../canvas-models/canvas.widget.class';
import { DragDropEventService } from '../../canvas-service/dragdrop.event.service';
import { EventHandlerService } from '../../canvas-service/event.service';
import {
  FormsInterface,
  ModelClass
} from '../../canvas-models/forms.properties';
import { PropertyMap } from '../../canvas-component-map/properties.map';
import { WidgetMap } from '../../canvas-component-map/component.map';
import { DatasourceModel, Metadata } from '../../canvas-models/datasource.model';
import { EventRelationBaseModel } from '../../event-relationship/models/event.basemodel';

@Component({
  selector: 'canvas-data-grid',
  template: `
    <div (click)="setSelfActive($event)" [attr.id]="componentId"
         (mouseover)="onMouseOver($event)" (mouseleave)="onMouseLeave($event)"
         draggable="true" [ngClass]="{'componentStyle':isOver,'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}"
         (dragstart)="_eventHndl.componentElementRelocateDragBegin($event,this)"
         (contextmenu)="loadContextMenu($event)"
         (dragover)="componentElementDraggedOver($event)">
      <amexio-datagrid
        [enable-column-fiter]="properties.enableColumnToggle"
        [enable-data-filter]="properties.enableFiltering"
        [title]="properties.title"
        [data-reader]="'data'"
        [page-size]="properties.pageSize"
        [enable-checkbox]="properties.enableCheckbox"
        [height]="200"
        [column-defintion]="localData" (onHeaderClick)="getColumnData($event)"
      >
      </amexio-datagrid>
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
export class CanvasDataGridComponent extends CanvasWidgetClass
  implements OnInit {
  overStyle: any;
  dataSource: DataGridDatasource;
  eventRelationship: EventRelationBaseModel;
  type: any = 'datagrid';
  localData: any[] = [];
  showBlockProperties: boolean;
  blockPropertyObject: any;
  target: any;
  columnProperty: any;
  columnUpdateMode: boolean;
  showContextMenu: boolean;
  mouseLocation: { left: number; top: number } = { left: 0, top: 0 };
  constructor(
    public _dragDropEventService: DragDropEventService,
    public _eventHndl: EventHandlerService,
    public _componentFactoryResolver: ComponentFactoryResolver,
    public viewContainerRef: ViewContainerRef
  ) {
    super();
    this.componentBehaviour.hasRelationship = true;
    this.componentBehaviour.isBindingComponent = true;
    this.componentBehaviour.hasDataSource = true;
    this.properties = new DataGridProperties();
    this.dataSource = new DataGridDatasource();
    this.columnProperty = new ColumnProperty();
    this.target = this.viewContainerRef;
    this.showBlockProperties = false;
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
    this.showBlockProperties = false;
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
    propertyInstance.instance.componentInstance = this;
    propertyInstance.changeDetectorRef.detectChanges();
  }

  componentElementDraggedOver(event: any) {
    event.preventDefault();
  }

  getColumnData(colData: any) {
    colData.event.stopPropagation();
    this.columnUpdateMode = true;
    this.columnProperty = colData.data;
  }

  addColumn() {
    if (this.columnProperty.text != null || this.columnProperty.text != '') {
      if (!this.columnUpdateMode) {
        this.componentId =
          +Math.floor(Math.random() * 90000) + 10000 + '_' + 'datagridcolumn';
        this._eventHndl.componentClassKeyDragged = 'datagridcolumn';
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(
          WidgetMap.COMPONENT_CLASS_MAP[
            this._eventHndl.componentClassKeyDragged
          ]
        );
        const componentInstance = this.target.createComponent(componentFactory);
        componentInstance.instance.properties.text = this.columnProperty.text;
        componentInstance.instance.properties.dataindex = this.columnProperty.dataindex;
        componentInstance.instance.properties.datatype = this.columnProperty.datatype;
        componentInstance.instance.properties.hidden = this.columnProperty.hidden;
        this.children.push(componentInstance);
        this._eventHndl.addEditorNewState();
        this._eventHndl.componentClassKeyDragged = null;
        this.createLocalData();
        this.resetColumnProperties();
      } else {
        this.columnUpdateMode = false;
        const columnProperty = new ColumnProperty();
        this.columnProperty = columnProperty;
        this.resetColumnProperties();
      }
    }
  }

  removeColumn() {
    this.children.forEach((item: any, index: any) => {
      if (item.instance.properties == this.columnProperty) {
        this.children.splice(index, 1);
      }
    });
    this.createLocalData();
    this.resetColumnProperties();
  }

  createComponentConfig() {
    this.localData.length = 0;
    this.children.forEach(child => {
      this.localData.push(child.instance.properties);
    });
  }

  /* DONT REMOVE createLocalData FUNTION IT WILL BREAK GRID OPEN CASE */

  createLocalData() {
    this.localData.length = 0;
    this.children.forEach(child => {
      this.localData.push(child.instance.properties);
    });
  }

  getBlockData(data: any) {
    data.event.stopPropagation();
    this.loadComponentProperties();
    this.showBlockProperties = true;
    this.blockPropertyObject = data.data;
  }

  resetColumnProperties() {
    this.columnProperty.text = '';
    this.columnProperty.datatype = 'string';
    this.columnProperty.dataindex = '';
    this.columnProperty.hidden = false;
  }
}

export class DataGridProperties implements FormsInterface {
  isComponentValid: boolean;
  title: string;
  fieldLabel: string;
  name: string;
  enableCheckbox: boolean;
  pageSize: number;
  height: any;
  enableFiltering: boolean;
  groupBy: boolean;
  groupByColumnIndex: string;
  enableColumnToggle: boolean;
  model: any;
  constructor() {
    this.model = new ModelClass();
    this.isComponentValid = false;
    this.title = 'Data Grid';
    this.fieldLabel = 'Data Grid';
    this.height = null;
    this.pageSize = 10;
    this.enableFiltering = false;
    this.groupBy = false;
    this.groupByColumnIndex = '';
    this.enableCheckbox = false;
    this.name = '';
    this.enableColumnToggle = true;
  }
}

export class DataGridDatasource extends DatasourceModel {
  dataReader: string;
  httpUrl: string;
  httpMethod: any;
  metadata: any;
  servicetype: any;

  constructor() {
    super();
    this.metadata = new Metadata();
    this.dataReader = '';
    this.httpMethod = 1;
    this.httpUrl = '';
    this.remote.httpUrl = this.httpUrl;
    this.remote.httpMethod = 1;
    this.servicetype = 1;
  }
}


export class ColumnProperty {
  isComponentValid: boolean;
  text: string;
  dataindex: string;
  datatype: string;
  hidden: boolean;
  isColumnSort: boolean;

  constructor() {
    this.isComponentValid = true;
    this.text = '';
    this.hidden = false;
    this.datatype = 'string';
    this.dataindex = '';
    this.isColumnSort = true;
  }
}
