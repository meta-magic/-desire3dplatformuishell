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

@Component({
  selector: 'panel',
  template: `
    <div  class="rowstyle {{dragOverStyle}}"
         (click)="setSelfActive($event)"
          (mouseover)="onMouseOver($event)" (mouseleave)="onMouseLeave($event)"
          (dragstart)="_eventHndl.componentElementRelocateDragBegin($event,this)"
          draggable="true" [ngClass]="{'componentStyle':isOver,'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}"
         (dragover)="componentElementDraggedOver($event)"
         (dragend)="componentDragEnter($event)"
         (contextmenu)="loadContextMenu($event)"
         (drop)="componentElementDropped($event)">
      <div (mouseenter)="onMouseEnter($event)" (dragenter)="componentDragEnter($event)" (mouseout)="onMouseOut($event)">
        <amexio-panel [header]="properties.header" [title]="properties.title"
        [expanded]="true">
          <div style="min-height: 100px">
            <ng-template #panel></ng-template>
          </div>

        </amexio-panel>
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
export class CanvasPanelComponent extends CanvasWidgetClass
  implements OnInit, OnDestroy {
  dragOverStyle: any;
  showContextMenu: boolean;
  mouseLocation: { left: number; top: number } = { left: 0, top: 0 };
  @ViewChild('panel', { read: ViewContainerRef })
  target: any;
  constructor(
    public _dragDropEventService: DragDropEventService,
    public _componentFactoryResolver: ComponentFactoryResolver,
    public _eventHndl: EventHandlerService
  ) {
    super();
    this.properties = new PanelProperties();
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
  ngOnDestroy(): void {}
  componentElementDraggedOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.isActive = false;
    this.dragOverStyle = 'drag-over-style';
  }

  componentElementDropped(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.isActive = false;
    if (this._eventHndl.componentClassKeyDragged == 'row') {
      this._dragDropEventService.rowDropComponentRef = null;
      this._dragDropEventService.rowDropComponentRef = this;
      this._dragDropEventService.rowAddDialogue = true;
    } else {
      this._dragDropEventService.componentElementDrop(this);
    }
  }

  onMouseEnter(event: any) {
    event.stopPropagation();
    this.dragOverStyle = '';
  }

  onMouseOut(event: any) {
    event.stopPropagation();
    this.dragOverStyle = '';
  }

  componentDragEnter(event: any) {
    event.stopPropagation();
    this.dragOverStyle = '';
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
      this.dragOverStyle = 'drag-over-style';
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
}

export class PanelProperties {
  isComponentValid: boolean;
  title: string;
  header: boolean;
  expanded: boolean;
  height: number;
  constructor() {
    this.isComponentValid = true;
    this.title = 'Panel';
    this.header = true;
    this.expanded = true;
  }
}
