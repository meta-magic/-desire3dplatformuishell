import {
  Component,
  ComponentFactoryResolver,
  HostListener,
  OnInit
} from '@angular/core';
import { EventHandlerService } from '../../canvas-service/event.service';
import { CanvasWidgetClass } from '../../canvas-models/canvas.widget.class';
import { FormsInterface } from '../../canvas-models/forms.properties';

@Component({
  selector: 'video-player',
  template: `
  <div (click)="setSelfActive($event)" [attr.id]="componentId"
       (mouseover)="onMouseOver($event)" (mouseleave)="onMouseLeave($event)"
       draggable="true" [ngClass]="{'componentStyle':isOver,'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}"
  (dragstart)="_eventHndl.componentElementRelocateDragBegin($event,this)"
  (contextmenu)="loadContextMenu($event)"
  (dragover)="componentElementDraggedOver($event)" #video>
  <amexio-video-player   [path]="properties.path" [extension]="properties.extension">
</amexio-video-player>
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
export class CanvasVideoComponent extends CanvasWidgetClass implements OnInit {
  overStyle: any;
  showContextMenu: boolean;
  mouseLocation: { left: number; top: number } = { left: 0, top: 0 };
  constructor(
    public _eventHndl: EventHandlerService,
    public _componentFactoryResolver: ComponentFactoryResolver
  ) {
    super();
    this.properties = new VideoProperties();
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

export class VideoProperties implements FormsInterface {
  isComponentValid: boolean;
  name: string;
  path: string;
  extension: string;
  constructor() {
    this.isComponentValid = true;
    this.name = 'video_' + Math.floor(Math.random() * 90000) + 10000;
    this.path =
      'http://www.amexio.org/showcaseapp/v3/assets/videos/sample_bunny.mp4';
    this.extension = '';
  }
}
