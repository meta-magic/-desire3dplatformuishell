/**
 * Created by dattaram on 6/3/18.
 */
import {
  Component,
  ComponentFactoryResolver,
  HostBinding,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { DragDropEventService } from '../../../canvas-service/dragdrop.event.service';
import { EventHandlerService } from '../../../canvas-service/event.service';
import { CanvasWidgetClass } from '../../../canvas-models/canvas.widget.class';
import { PropertyMap } from '../../../canvas-component-map/properties.map';
import { TabPill } from '../../../local-components/tab/basic/tab.pill.component';

@Component({
  selector: 'canvas-vertical-tab',
  template: `
    <div class="rowstyle {{componentOverStyle}} "
         (click)="setSelfActive($event)"
         draggable="true" [ngClass]="{'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}"
         (dragstart)="_eventHndl.componentElementRelocateDragBegin($event,this)"
         (dragover)="componentElementDraggedOver($event)"
         (dragend)="componentDragEnter($event)"
         (contextmenu)="loadContextMenu($event)"
         (drop)="componentElementDropped($event)">
      <div (mouseenter)="onMouseEnter($event)" (dragenter)="componentDragEnter($event)" (mouseout)="onMouseOut($event)">
        <vertical-tab-view  [closable]="properties.closable" [tabPills]="tabpillCollection">
          <ng-template #tabpill></ng-template>
        </vertical-tab-view>
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
export class CanvasVerticalTabComponent extends CanvasWidgetClass
  implements OnInit, OnDestroy {
  componentOverStyle: any;
  showContextMenu: boolean;
  tabpillCollection: TabPill[] = [];
  mouseLocation: { left: number; top: number } = { left: 0, top: 0 };
  @ViewChild('tabpill', { read: ViewContainerRef })
  target: any;
  constructor(
    public _dragDropEventService: DragDropEventService,
    public _componentFactoryResolver: ComponentFactoryResolver,
    public _eventHndl: EventHandlerService
  ) {
    super();
    this.properties = new VerticalTabProperties();
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

  ngOnDestroy(): void {}
  componentElementDraggedOver(event: any) {
    this.componentOverStyle = 'overEffect';
    event.preventDefault();
    event.stopPropagation();
  }

  setSelfActive(event: any) {
    if (event != null) {
      this.componentOverStyle = 'overEffect';
      event.stopPropagation();
      this._eventHndl.deleteComponentRef = null;
      this._eventHndl.deleteComponentRef = this.componentId;
      this._eventHndl.setAllComponentsInactive(this.componentId);
      this._eventHndl.loadComponentProperties(this.name);
    }
  }

  createComponentConfig() {
    if (this._eventHndl.eventType !== 'R') {
      this._eventHndl.componentClassKeyDragged = null;
      this._eventHndl.componentClassKeyDragged = 'tabpill';
      this._dragDropEventService.componentElementDrop(this);
    }
    this._eventHndl.loadComponentProperties(this.name);
    this.createLocalData();
  }

  createLocalData() {
    this.tabpillCollection = [];
    this.children.forEach((child: any, index: any) => {
      child.instance.title = child.instance.properties.title;
      child.instance.iconClass = child.instance.properties.iconClass;
      child.instance.parentComponentRef = this;
      if (index == 0) {
        child.instance.active = true;
      } else {
        child.instance.active = false;
      }
      child.changeDetectorRef.detectChanges();
      this.tabpillCollection.push(child.instance);
    });
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
}

export class VerticalTabProperties {
  isComponentValid: boolean;
  name: string;
  constructor() {
    this.isComponentValid = true;
    this.name = '';
  }
}
