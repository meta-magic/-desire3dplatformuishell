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
import { AccordionTabComponent } from '../../local-components/accordion/accordion.pane';

@Component({
  selector: 'accordion-container',
  template: `
    <div (mouseover)="onMouseOver($event)" (mouseleave)="onMouseLeave($event)"
         draggable="true" [ngClass]="{'componentStyle':isOver,'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}"
         (click)="setSelfActive($event)"
         (dragover)="componentElementDraggedOver($event)"
         (dragend)="componentDragEnter($event)"
         (contextmenu)="loadContextMenu($event)"
         (drop)="componentElementDropped($event)">

      <div class="dropable-area" (mouseenter)="onMouseEnter($event)" (dragenter)="componentDragEnter($event)" (mouseout)="onMouseOut($event)">
        <accordion [tabs]="tabpillCollection">
          <ng-template #tabpill></ng-template>
        </accordion>
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
export class CanvasAccordionContainerComponent extends CanvasWidgetClass
  implements OnInit, OnDestroy {
  localData: any;
  tabpillCollection: AccordionTabComponent[] = [];
  showContextMenu: boolean;
  mouseLocation: { left: number; top: number } = { left: 0, top: 0 };
  @ViewChild('tabpill', { read: ViewContainerRef })
  target: any;
  constructor(
    public _dragDropEventService: DragDropEventService,
    public _componentFactoryResolver: ComponentFactoryResolver,
    public _eventHndl: EventHandlerService
  ) {
    super();
    this.properties = new AccordionProperties();
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
    console.log('accordian');
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

  createComponentConfig() {
    //create a single tab default
    this.tabpillCollection.forEach((pill: any) => {
      pill.active = false;
    });
    let tabPillFactory = this._componentFactoryResolver.resolveComponentFactory(
      AccordionTabComponent
    );
    let pillInstance = this.target.createComponent(tabPillFactory);
    pillInstance.instance.header = pillInstance.instance.properties.header;
    pillInstance.instance.active = true;
    pillInstance.changeDetectorRef.detectChanges();
    this.tabpillCollection.push(pillInstance.instance);
    this.children.push(pillInstance);
  }

  componentElementDraggedOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  componentElementDropped(event: any) {
    event.preventDefault();
    event.stopPropagation();
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
  }

  onMouseOut(event: any) {
    event.stopPropagation();
  }

  componentDragEnter(event: any) {
    event.stopPropagation();
  }

  setSelfActive(event: any) {
    if (event != null) {
      event.stopPropagation();
      this.showContextMenu = false;
      this._eventHndl.deleteComponentRef = null;
      this._eventHndl.deleteComponentRef = this.componentId;
      this._eventHndl.setAllComponentsInactive(this.componentId);
      this._eventHndl.loadComponentProperties(this.name);
    }
  }

  /* DONT REMOVE createLocalData FUNTION IT WILL BREAK GRID OPEN CASE */

  createLocalData() {
    /*   this.localData.length = 0;
    this.children.forEach(child => {
      this.localData.push(child.instance.properties);
    });*/
  }
}

export class AccordionProperties {
  isComponentValid: boolean;
  name: string;
  transparent: boolean;
  angleIcon: boolean;
  expandAll: boolean;
  constructor() {
    this.isComponentValid = true;
    this.name = '';
    this.transparent = false;
    this.angleIcon = false;
    this.expandAll = false;
  }
}
