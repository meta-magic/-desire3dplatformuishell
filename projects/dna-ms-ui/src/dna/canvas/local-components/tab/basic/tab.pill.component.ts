/**
 * Created by pratik on 8/12/17.
 */
import {
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { CanvasWidgetClass } from '../../../canvas-models/canvas.widget.class';
import { DragDropEventService } from '../../../canvas-service/dragdrop.event.service';
import { EventHandlerService } from '../../../canvas-service/event.service';
import { PropertyMap } from '../../../canvas-component-map/properties.map';

@Component({
  selector: 'tab-pill',
  template: `
    <div role="tabpanel" [ngStyle]="{'display' : active ? 'block' : 'none'}"
         class="tab-pane active {{componentOverStyle}}" (mouseover)="onMouseOver($event)"
         (mouseleave)="onMouseLeave($event)" (click)="setSelfActive($event)"
         (dragover)="componentElementDraggedOver($event)"
         (dragend)="componentDragEnter($event)"
         (contextmenu)="loadContextMenu($event)"
         (drop)="componentElementDropped($event)" style="min-height: 100px;min-width: 200px;">

      <div (mouseenter)="onMouseEnter($event)" (dragenter)="componentDragEnter($event)" (mouseout)="onMouseOut($event)" style="padding: 10px 10px 10px 10px;">
          <ng-template #tabpill></ng-template>
      </div>
      
    </div>

  `
})
export class TabPill extends CanvasWidgetClass implements OnInit {
  /**
   *  This class acts both as a local component & the canvas Holder class component
   *
   */

  @Input() title: string;

  @Input() active = false;

  @Input() iconClass: string;

  tabId: number;

  name: string = 'tabpill';

  componentOverStyle: any;

  showContextMenu: boolean;

  parentComponentRef: any;

  mouseLocation: { left: number; top: number } = { left: 0, top: 0 };
  @ViewChild('tabpill', { read: ViewContainerRef })
  target: any;
  constructor(
    public _dragDropEventService: DragDropEventService,
    public _componentFactoryResolver: ComponentFactoryResolver,
    public _eventHndl: EventHandlerService
  ) {
    super();
    this.tabId = Math.floor(Math.random() * 90000) + 10000;
    this.properties = new TabPillProperties();
  }

  ngOnInit() {
    this.componentId =
      +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
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

  onMouseOver(event: any) {
    event.stopPropagation();
    this.componentOverStyle = 'overEffect';
  }
  onMouseLeave(event: any) {
    event.stopPropagation();
    this.componentOverStyle = '';
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
      this.loadComponentProperties();
    }
  }

  loadComponentProperties() {
    this._eventHndl.propertyViewRef.clear();
    const propertyFactory = this._componentFactoryResolver.resolveComponentFactory(
      PropertyMap.PROPERTY_MAP[this.name]
    );
    const propertyInstance = this._eventHndl.propertyViewRef.createComponent(
      propertyFactory
    );
    propertyInstance.instance.componentInstance = this._eventHndl.currentWidgetRef;
    propertyInstance.changeDetectorRef.detectChanges();
  }

  onDeleteClick() {
    this.showContextMenu = false;
    this._eventHndl.componentIdToDel = this.componentId;
    this._eventHndl.deleteComponent();
    this._eventHndl.addEditorNewState();
  }
}

export class TabPillProperties {
  isComponentValid: boolean;
  name: string;
  title: string;
  iconClass: string;
  active: boolean;

  constructor() {
    this.isComponentValid = true;
    this.name = '';
    this.title = 'Tab Pill';
    this.iconClass = '';
  }
}
