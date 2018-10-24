/**
 * Created by dattaram on 6/3/18.
 */

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
  selector: 'canvas-item-selector',
  template: `
    <div (click)="setSelfActive($event)" [attr.id]="componentId"
         (mouseover)="onMouseOver($event)" (mouseleave)="onMouseLeave($event)"
         draggable="true" [ngClass]="{'componentStyle':isOver,'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}"
          (dragstart)="_eventHndl.componentElementRelocateDragBegin($event,this)"
          (contextmenu)="loadContextMenu($event)"
          (dragover)="componentElementDraggedOver($event)" #txtField>
      <div class="disabled-area">
        <amexio-item-selector [height]="properties.height"
                              [display-field]="'ItemName'"
                              [value-field]="'itemId'"
                              [data-reader]="'response.data'" 
                              [data]="itemSelectorData">
        </amexio-item-selector>
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

  `,
  styles: [
    `
      .disabled-area {
        pointer-events: none;
        opacity: 0.4;
        cursor: not-allowed;
      }
    `
  ]
})
export class CanvasItemSelectorComponent extends CanvasWidgetClass
  implements OnInit {
  type: string = 'default';
  itemSelectorData: any;
  dataSource: any;
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
    this.properties = new ItemSelectorProperty();
    this.dataSource = new ItemSelectorDatasource();
    this.eventRelationship = new EventRelationBaseModel();
    this.itemSelectorData = {
      response: {
        data: [
          {
            ItemName: 'Item 1',
            ItemId: 'item1'
          },
          {
            ItemName: 'Item 2',
            ItemId: 'item2'
          },
          {
            ItemName: 'Item 3',
            ItemId: 'item3'
          },
          {
            ItemName: 'Item 4',
            ItemId: 'item4'
          }
        ]
      }
    };
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
    this._eventHndl.deleteComponentRef = null;
    this._eventHndl.deleteComponentRef = this.componentId;
    this._eventHndl.setAllComponentsInactive(this.componentId);
    this._eventHndl.loadComponentProperties(this.name);
  }

  onMouseOver(event: any) {
    event.stopPropagation();
    this.isOver = true;
  }
  onMouseLeave(event: any) {
    event.stopPropagation();
    this.isOver = false;
  }

  componentElementDraggedOver(event: any) {
    event.preventDefault();
  }
}

export class ItemSelectorProperty implements FormsInterface {
  isComponentValid: boolean;
  height: number;
  name: string;
  displayField: string;
  valueField: string;

  model: any;
  constructor() {
    this.model = new ModelClass();
    this.isComponentValid = false;
    this.height = 200;
    this.name = '';
    this.displayField = '';
    this.valueField = '';
  }
}
export class ItemSelectorDatasource extends DatasourceModel {
  dataReader: string;
  httpUrl: string;
  httpMethod: string;
  displayField: string;
  valueField: string;
  metadata: any;
  servicetype: any;
  constructor() {
    super();
    this.remote.httpUrl = '';
    this.remote.httpMethod = 1;
    this.metadata = new Metadata();
    this.dataReader = '';
    this.displayField = '';
    this.valueField = '';
    this.servicetype = 1;
  }
}

