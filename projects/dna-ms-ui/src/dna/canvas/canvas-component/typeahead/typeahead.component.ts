/**
 * Created by dattaram on 23/2/18.
 */
import {
  Component,
  ComponentFactoryResolver,
  HostListener,
  OnInit
} from '@angular/core';
import {
  FormsInterface,
  ModelClass
} from '../../canvas-models/forms.properties';
import { CanvasWidgetClass } from '../../canvas-models/canvas.widget.class';
import { EventHandlerService } from '../../canvas-service/event.service';
import { DatasourceModel } from '../../canvas-models/datasource.model';
import { EventRelationBaseModel } from '../../event-relationship/models/event.basemodel';

@Component({
  selector: 'canvas-typeahead',
  template: `
    <div (click)="setSelfActive($event)" [attr.id]="componentId"
         (mouseover)="onMouseOver($event)" (mouseleave)="onMouseLeave($event)"
         draggable="true" [ngClass]="{'componentStyle':isOver,'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}"
          (dragstart)="_eventHndl.componentElementRelocateDragBegin($event,this)"
          (contextmenu)="loadContextMenu($event)"
          (dragover)="componentElementDraggedOver($event)" #typeahead>
      <!--<amexio-typeahead [place-holder]="'Choose'"
                        [field-label]="properties.fieldLabel">
      </amexio-typeahead>-->

      <amexio-typeahead [data-reader]="'data'" [key]="'dummyText'" [display-field]="'dummyValue'" [place-holder]="properties.placeholder"
                        [http-url]="'https://api.myjson.com/bins/1g8jj3'" [http-method]="'get'" [field-label]="properties.fieldLabel">
      </amexio-typeahead>
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
export class CanvasTypeAheadComponent extends CanvasWidgetClass
  implements OnInit {
  dataSource: TypeAheadDatasource;
  eventRelationship: EventRelationBaseModel;
  type: string = 'default';
  showContextMenu: boolean;
  mouseLocation: { left: number; top: number } = { left: 0, top: 0 };
  constructor(
    public _eventHndl: EventHandlerService,
    public _componentFactoryResolver: ComponentFactoryResolver
  ) {
    super();
    this.componentBehaviour.hasModelBinding = true;
    this.componentBehaviour.hasRelationship = true;
    this.componentBehaviour.isBindingComponent = true;
    this.componentBehaviour.hasDataSource = true;
    this.dataSource = new TypeAheadDatasource();
    this.properties = new TypeAheadProperties();
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

export class TypeAheadProperties implements FormsInterface {
  fieldLabel: string;
  isComponentValid: boolean;
  name: string;
  placeholder: any;
  triggerChar: any;
  displayField: string;
  valueField: string;

  model: any;
  constructor() {
    /*temporary use*/
    this.model = new ModelClass();
    this.fieldLabel = 'Type Ahead';
    this.isComponentValid = false;
    this.name = '';
    this.placeholder = '';
    this.triggerChar = 1;
    this.valueField = '';
    this.displayField = '';
  }
}

export class TypeAheadDatasource extends DatasourceModel {
  dataReader: string;
  key: string;
  metadata: any;
  servicetype: any;
  localDataName: any;
  displayField: string;
  valueField: string;
  constructor() {
    super();
    this.metadata = new Metadata();
    this.servicetype = '1';
    this.localDataName = null;
    this.remote.httpMethod = 1;
    this.remote.httpUrl = '';
    this.dataReader = '';
    this.key = this.displayField;
    this.valueField = '';
  }
}

export class Metadata {
  bcId: string;
  domainId: string;
  serviceId: string;
  operationId: string;
  methodType: string;
  recordData: any[];

  constructor() {
    this.bcId = '';
    this.domainId = '';
    this.serviceId = '';
    this.operationId = '';
    this.methodType = '';
    this.recordData = [];
  }
}
