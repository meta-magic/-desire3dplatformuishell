import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { PropertyMap } from '../../canvas-component-map/properties.map';
import { CanvasWidgetClass } from '../../canvas-models/canvas.widget.class';
import { DragDropEventService } from '../../canvas-service/dragdrop.event.service';
import { EventHandlerService } from '../../canvas-service/event.service';

@Component({
  selector: 'accordion-tab',
  template: `
    <div class="{{componentOverStyle}}" (mouseover)="onMouseOver($event)" (mouseleave)="onMouseLeave($event)" (click)="setSelfActive($event)"
         (dragover)="componentElementDraggedOver($event)"
         (dragend)="componentDragEnter($event)"
         (contextmenu)="loadContextMenu($event)"
         (drop)="componentElementDropped($event)">
    <button (click)="emitEvent()"
            class="{{isTransparent ? 'accordion-transparent' : 'accordion'}} {{active ? 'active-accordion' : ''}} {{disabled ? 'accordion-disable' : ''}}" >
      <div style="float: left;" *ngIf="leftIcon">
        <i class="fa {{leftIcon}}"></i>
      </div>
      {{properties.header}}
      <div style="float: right">
        <i *ngIf="!angleIcon" class="fa" [ngClass]="{'fa-plus' : !active,'fa-minus' : active}" aria-hidden="true"></i>
        <i *ngIf="angleIcon" class="fa" [ngClass]="{'fa-angle-down' : !active,'fa-angle-up' : active}" aria-hidden="true"></i>
      </div>
    </button>
    <div [ngStyle]="{'display' : active ? 'block' : 'none'}" (mouseenter)="onMouseEnter($event)" (dragenter)="componentDragEnter($event)" (mouseout)="onMouseOut($event)" style="min-width: 200px;"  class="panel">
      <ng-template #tabpill></ng-template>
    </div>
    </div>

  `
})
export class AccordionTabComponent extends CanvasWidgetClass {
  @Input() header: any;

  @Input() active: boolean;

  @Output() emittedEvent = new EventEmitter();

  @Input('left-icon') leftIcon: string;

  @Input('angle-icon') angleIcon: boolean;

  @Input('disabled') disabled: boolean;

  isTransparent: boolean;

  name: string = 'accordiontab';

  componentOverStyle: any;

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
    // this.tabId = Math.floor(Math.random() * 90000) + 10000;
    this.properties = new AccordionTabProperties();
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
    if (this._eventHndl.componentClassKeyDragged == 'row') {
      this._dragDropEventService.rowDropComponentRef = null;
      this._dragDropEventService.rowDropComponentRef = this;
      this._dragDropEventService.rowAddDialogue = true;
    } else {
      this._dragDropEventService.componentElementDrop(this);
    }
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

  emitEvent() {
    if (!this.disabled) {
      this.active = !this.active;
      this.emittedEvent.emit(this);
    }
  }
}

export class AccordionTabProperties {
  isComponentValid: boolean;
  name: string;
  header: string;
  disabled: boolean;
  active: boolean;
  angleIcon: boolean;
  constructor() {
    this.isComponentValid = true;
    this.name = '';
    this.header = 'Accordion Tab';
  }
}
