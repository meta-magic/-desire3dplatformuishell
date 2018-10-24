import {
  Component,
  ComponentFactoryResolver,
  HostListener,
  OnInit
} from '@angular/core';
import { EventHandlerService } from '../../canvas-service/event.service';
import { CanvasWidgetClass } from '../../canvas-models/canvas.widget.class';
import {
  FormsInterface,
  ModelClass
} from '../../canvas-models/forms.properties';
import { DatasourceModel, Metadata } from '../../canvas-models/datasource.model';
import { EventRelationBaseModel } from '../../event-relationship/models/event.basemodel';

@Component({
  selector: 'tree',
  template: `
    <div (click)="setSelfActive($event)" [attr.id]="componentId"
          (mouseover)="onMouseOver($event)" (mouseleave)="onMouseLeave($event)"
          draggable="true" [ngClass]="{'componentStyle':isOver,'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}"
          (dragstart)="_eventHndl.componentElementRelocateDragBegin($event,this)"
          (contextmenu)="loadContextMenu($event)"
          (dragover)="componentElementDraggedOver($event)" #tree>

          <ng-container *ngIf="!properties.filter">
          <amexio-treeview [data-reader]="'data'"
          [enable-checkbox]="properties.enableCheckbox"
          [data]="treeLocalData">
          </amexio-treeview>
          </ng-container>
          <ng-container *ngIf="properties.filter">
          <amexio-tree-filter-view [data]="treeLocalData"  [enable-checkbox]="properties.enableCheckbox" [data-reader]="'data'">
          </amexio-tree-filter-view>
          </ng-container>

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
export class CanvasTreeComponent extends CanvasWidgetClass implements OnInit {
  treeLocalData: any;
  type: any = 'tree';
  showContextMenu: boolean;
  eventRelationship: EventRelationBaseModel;
  mouseLocation: { left: number; top: number } = { left: 0, top: 0 };
  constructor(
    public _eventHndl: EventHandlerService,
    public _componentFactoryResolver: ComponentFactoryResolver
  ) {
    super();
    this.componentBehaviour.hasRelationship = true;
    this.componentBehaviour.isBindingComponent = true;
    this.componentBehaviour.hasDataSource = true;
    this.properties = new TreeProperties();
    this.dataSource = new TreeDatasource();
    this.eventRelationship = new EventRelationBaseModel();
    this.treeLocalData = {
      data: [
        {
          text: 'Tree',
          expanded: true,
          children: [
            {
              text: 'Parent 1',
              expanded: true,
              children: [
                {
                  leaf: true,
                  text: 'Child 1'
                }
              ]
            },
            {
              text: 'Parent 2',
              expanded: true,
              children: [
                {
                  leaf: true,
                  text: 'Child 1'
                },
                {
                  leaf: true,
                  text: 'Child 2'
                }
              ]
            }
          ]
        }
      ]
    };
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

export class TreeProperties implements FormsInterface {
  isComponentValid: boolean;
  name: string;
  enableCheckbox: boolean;
  filter: boolean;
  model: any;
  constructor() {
    /*temporary use*/
    this.model = new ModelClass();
    this.isComponentValid = false;
    this.name = '';
    this.enableCheckbox = false;
    this.filter = false;
  }
}

export class TreeDatasource extends DatasourceModel {
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
