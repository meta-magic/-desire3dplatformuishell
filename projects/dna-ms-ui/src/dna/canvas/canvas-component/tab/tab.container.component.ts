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
import { TabPill } from '../../local-components/tab/basic/tab.pill.component';

@Component({
  selector: 'tab-container',
  template: `    
    <div class="componentStyle" class="rowstyle {{componentOverStyle}} "
         (click)="setSelfActive($event)"
         draggable="true" [ngClass]="{'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}"
         (dragstart)="_eventHndl.componentElementRelocateDragBegin($event,this)"
         (dragover)="componentElementDraggedOver($event)"
         (dragend)="componentDragEnter($event)"
         (contextmenu)="loadContextMenu($event)"
         (drop)="componentElementDropped($event)">

      <div (mouseenter)="onMouseEnter($event)" (dragenter)="componentDragEnter($event)" (mouseout)="onMouseOut($event)">
        <tab-view  [closable]="properties.closable" [tabPills]="tabpillCollection">
          <ng-template #tabpill></ng-template>
        </tab-view>
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
export class CanvasTabContainerComponent extends CanvasWidgetClass
  implements OnInit, OnDestroy {
  componentOverStyle: any;
  showContextMenu: boolean;
  localData: any;
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
    this.componentBehaviour.hasRelationship = true;
    this.properties = new SimpleTabProperties();
  }

  ngOnInit() {
    this.componentId =
      +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
  }
  @HostListener('document:click')
  onWindowClick() {
    this.showContextMenu = false;
  }
  ngOnDestroy(): void {}

  createComponentConfig() {
    if (this._eventHndl.eventType !== 'R') {
      this._eventHndl.componentClassKeyDragged = null;
      this._eventHndl.componentClassKeyDragged = 'tabpill';
      this._dragDropEventService.componentElementDrop(this);
    }
    this.createLocalData();
    this._eventHndl.deleteComponentRef = null;
    this._eventHndl.deleteComponentRef = this.componentId;
    this._eventHndl.setAllComponentsInactive(this.componentId);
    this._eventHndl.loadComponentProperties(this.name);
  }

  createLocalData() {
    this.tabpillCollection = [];
    this.children.forEach((child: any, index: any) => {
      child.instance.title = child.instance.properties.title;
      child.instance.iconClass = child.instance.properties.iconClass;
      child.instance.parentComponentRef = this;
      child.instance.active = false;
      if (this.children.length == index + 1) {
        child.instance.active = true;
      }
      child.changeDetectorRef.detectChanges();
      this.tabpillCollection.push(child.instance);
    });
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
}

export class SimpleTabProperties {
  isComponentValid: boolean;
  name: string;
  closable: boolean;
  constructor() {
    this.isComponentValid = true;
    this.name = 'tab_' + Math.floor(Math.random() * 90000) + 10000;
    this.closable = false;
  }
}
