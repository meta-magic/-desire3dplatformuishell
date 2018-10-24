/**
 * Created by dattaram on 2/3/18.
 */
import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { EventHandlerService } from '../../canvas-service/event.service';
import { DragDropEventService } from '../../canvas-service/dragdrop.event.service';
import { CanvasWidgetClass } from '../../canvas-models/canvas.widget.class';
import { PropertyMap } from '../../canvas-component-map/properties.map';

@Component({
  selector: 'canvas-datapoint-east',
  template: `
    <div class="rowstyle"
         (mouseover)="onMouseOver($event)" (mouseleave)="onMouseLeave($event)"
         [ngClass]="{'componentStyle':isOver,'componentSelectStyle':isActive}"
         (click)="setSelfActive($event)"
         (dragover)="componentElementDraggedOver($event)"
         (dragend)="componentDragEnter($event)"
         (contextmenu)="loadContextMenu($event)"
         (drop)="componentElementDropped($event)">
      <div (mouseenter)="onMouseEnter($event)" (dragenter)="componentDragEnter($event)" (mouseout)="onMouseOut($event)">
        East
          <ng-template #eastdata></ng-template>
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
  `
})
export class CanvasDataPointEastComponentComponent extends CanvasWidgetClass
  implements OnInit, OnDestroy {
  componentOverStyle: any;
  showContextMenu: boolean;
  name = 'dataEast';
  mouseLocation: { left: number; top: number } = { left: 0, top: 0 };
  @ViewChild('eastdata', { read: ViewContainerRef })
  target: any;
  constructor(
    public _eventHndl: EventHandlerService,
    public _dragDropEventService: DragDropEventService,
    public _componentFactoryResolver: ComponentFactoryResolver
  ) {
    super();
    this.properties = new DataEastProperties();
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

  componentElementDraggedOver(event: any) {
    this.componentOverStyle = 'overEffect';
    event.preventDefault();
    event.stopPropagation();
  }

  componentElementDropped(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this._dragDropEventService.componentElementDrop(this);
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
      this._eventHndl.deleteComponentRef = null;
      this._eventHndl.deleteComponentRef = this.componentId;
      this._eventHndl.setAllComponentsInactive(this.componentId);
      this.showContextMenu = false;
      this._eventHndl.loadComponentProperties(this.name);
    }
  }

  onDeleteClick() {
    this.showContextMenu = false;
  }

  ngOnDestroy() {
    this.removeDuplicateOnRelocate(this._eventHndl.viewRefs);
    this.removeFromParent(this.parentComponentRef);
  }

  removeDuplicateOnRelocate(components: any[]) {
    components.forEach((compRef, index) => {
      if (compRef.componentId === this.componentId) {
        components.splice(index, 1);
        return;
      } else {
        if (compRef.hasOwnProperty('children') && compRef.children.length > 0) {
          this.removeDuplicateOnRelocate(compRef.children);
        }
      }
    });
  }

  removeFromParent(parentComponentRef: any) {
    if (parentComponentRef != null) {
      parentComponentRef.children.forEach((del: any, index: any) => {
        if (del.instance.componentId === this.componentId) {
          parentComponentRef.children.splice(index, 1);
        }
      });
    }
  }
}

export class DataEastProperties {
  isComponentValid: boolean;
  backgroundColor: string;
  fontColor: string;
  contentAlign: string;
  width: string;
  height: string;
  name: string;
  constructor() {
    this.name = 'east_' + Math.floor(Math.random() * 90000) + 10000;
    this.isComponentValid = true;
    this.backgroundColor = '';
    this.fontColor = '';
    this.contentAlign = 'center';
    this.width = '';
    this.height = '';
  }
}
