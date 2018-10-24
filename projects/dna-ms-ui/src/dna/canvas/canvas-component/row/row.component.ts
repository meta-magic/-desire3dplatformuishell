/**
 * Created by dattaram on 20/2/18.
 */
import {
  Component,
  ComponentFactoryResolver,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { DragDropEventService } from '../../canvas-service/dragdrop.event.service';
import { CanvasWidgetClass } from '../../canvas-models/canvas.widget.class';
import { EventHandlerService } from '../../canvas-service/event.service';
import { PropertyMap } from '../../canvas-component-map/properties.map';
import { ValidationMap } from '../../canvas-component-map/dradrop-validation-map';

@Component({
  selector: 'row',
  template: `
    <div class="componentStyle" class="rowstyle {{componentOverStyle}} "
         (click)="setSelfActive($event)"
         (dragover)="componentElementDraggedOver($event)"
         (dragend)="componentDragEnter($event)"
         (contextmenu)="loadContextMenu($event)"
         (drop)="componentElementDropped($event)">
      <div (mouseenter)="onMouseEnter($event)" [ngClass]="{'active-component' : isActive}" (dragenter)="componentDragEnter($event)" (mouseout)="onMouseOut($event)">
        <amexio-row>
          <ng-template #rowtarget></ng-template>
        </amexio-row>
      </div>

      <span  *ngIf="showContextMenu" (click)="onDeleteClick()" class="dropdown"
      [ngStyle]="{left: this.mouseLocation.left + 'px',top: this.mouseLocation.top + 'px',position:'fixed','box-shadow': '1px 1px 2px #000000',width: '15%'}">
          <ul class="dropdown-list">
            <li class="list-items">
              <span ><i class="fa fa-trash" style="padding-right: 5px;"></i> <b>Delete</b> </span>
            </li>
          </ul>
        </span>

    </div>
  `,
  styles: [
    `
      .active-component{
        border: 1px dotted blue !important;
      }
    `
  ]
})
export class CanvasRowComponent extends CanvasWidgetClass
  implements OnInit, OnDestroy {
  componentOverStyle: any;
  showContextMenu: boolean;
  mouseLocation: { left: number; top: number } = { left: 0, top: 0 };
  @ViewChild('rowtarget', { read: ViewContainerRef })
  target: any;
  constructor(
    public _dragDropEventService: DragDropEventService,
    public _componentFactoryResolver: ComponentFactoryResolver,
    public _eventHndl: EventHandlerService
  ) {
    super();
    this.isComponent = false;
    this.properties = new RowProperties();
  }

  @HostListener('document:click')
  onWindowClick() {
    this.showContextMenu = false;
  }

  ngOnInit() {
    this.componentId =
      +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
  }
  ngOnDestroy(): void {}
  componentElementDraggedOver(event: any) {
    this.componentOverStyle = 'overEffect';
    event.preventDefault();
    event.stopPropagation();
  }

  componentElementDropped(event: any) {
    event.preventDefault();
    event.stopPropagation();
    let errorMessage: string = '';
    if (
      ValidationMap.ROW_DROP[this._eventHndl.componentClassKeyDragged] &&
      this.columnCheck(errorMessage)
    ) {
      this._dragDropEventService.componentElementDrop(this);
    } else {
      this._dragDropEventService.notificationData.push('Please drag Column');
    }
  }

  columnCheck(msg: string): boolean {
    let totalColumSpaceOccupied: number = 0;
    this.children.forEach((child: any) => {
      totalColumSpaceOccupied += parseInt(child.instance.properties.columnlg);
    });
    if (totalColumSpaceOccupied + 1 < 13) return true;
    else {
      msg = 'Row Stack is full';
      this._dragDropEventService.notificationData.push(msg);
      return false;
    }
  }

  onMouseEnter(event: any) {
    event.stopPropagation();
    this.componentOverStyle = '';
  }

  onMouseOut(event: any) {
    event.stopPropagation();
    this.componentOverStyle = '';
  }

  componentDragEnter(event: any) {
    event.stopPropagation();
    this.componentOverStyle = '';
  }

  loadContextMenu(event: any) {
    this.mouseLocation.left = event.clientX;
    this.mouseLocation.top = event.clientY;
    this.showContextMenu = true;
    event.preventDefault();
    event.stopPropagation();
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

  setSelfActive(event: any) {
    if (event != null) {
      event.stopPropagation();
      this.componentOverStyle = 'overEffect';
      this.showContextMenu = false;
      this._eventHndl.deleteComponentRef = null;
      this._eventHndl.deleteComponentRef = this.componentId;
      this._eventHndl.setAllComponentsInactive(this.componentId);
      this._eventHndl.loadComponentProperties(this.name);
    }
  }

  onDeleteClick() {
    this.showContextMenu = false;
    this._eventHndl.componentIdToDel = this.componentId;
    this._eventHndl.deleteComponent();
    this._eventHndl.addEditorNewState();
  }

  componentInitailized() {
    if (this.children && this.children.length > 0) {
      this.children.forEach(child => {
        child.instance.componentInitailized();
      });
    }
  }
}

export class RowProperties {
  isComponentValid: boolean;
  constructor() {
    this.isComponentValid = true;
  }
}
