/**
 * Created by dattaram on 20/6/18.
 */
import {
  Component,
  ComponentFactoryResolver,
  HostListener,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { FormsInterface } from '../../canvas-models/forms.properties';
import { CanvasWidgetClass } from '../../canvas-models/canvas.widget.class';
import { PropertyMap } from '../../canvas-component-map/properties.map';
import { EventHandlerService } from '../../canvas-service/event.service';
import { DatasourceModel } from '../../canvas-models/datasource.model';
import { EventRelationBaseModel } from '../../event-relationship/models/event.basemodel';
import { ValidationMap } from '../../canvas-component-map/dradrop-validation-map';
import { DragDropEventService } from '../../canvas-service/dragdrop.event.service';

@Component({
  selector: 'root-pane-component',
  template: `
    <div  style="min-height: 82vh" [ngClass]="{'active-component' : isActive}" class="{{componentOverStyle}} "
         (click)="setSelfActive($event)"
         (dragover)="componentElementDraggedOver($event)"
         (dragend)="componentDragEnter($event)"
         (drop)="componentElementDropped($event)">
      <div style="padding-bottom: 20px">
        <ng-template #roottarget></ng-template>
      </div>
         
    </div>
  `,
  styles: [
    `.active-component{
        border: 2px dotted blue !important;
      }
    `
  ]
})
export class RootPaneComponent extends CanvasWidgetClass implements OnInit {
  eventRelationship: EventRelationBaseModel;
  componentOverStyle: any;
  showContextMenu: boolean;
  name = 'rootpane';
  @ViewChild('roottarget', { read: ViewContainerRef })
  target: any;
  constructor(
    public _dragDropEventService: DragDropEventService,
    public _componentFactoryResolver: ComponentFactoryResolver,
    public _eventHndl: EventHandlerService
  ) {
    super();
    this.componentBehaviour.hasRelationship = true;
    this.isComponent = false;
    this.properties = new RootPaneProperties();
    this.eventRelationship = new EventRelationBaseModel();
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
    this._eventHndl.isValidUI = true;
    if (this._eventHndl.componentClassKeyDragged == 'row') {
      this._dragDropEventService.rowDropComponentRef = null;
      this._dragDropEventService.rowDropComponentRef = this;
      this._dragDropEventService.rowAddDialogue = true;
    } else if (
      ValidationMap.ROOT_DROP[this._eventHndl.componentClassKeyDragged]
    ) {
      this._dragDropEventService.componentElementDrop(this);
    } else {
      this._dragDropEventService.notificationData.push('Please drag row');
    }
    this.componentOverStyle = '';
  }

  componentDragEnter(event: any) {
    event.stopPropagation();
    this.componentOverStyle = '';
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
}

export class RootPaneProperties implements FormsInterface {
  isComponentValid: boolean;
  name: string;
  constructor() {
    this.name = '';
    this.isComponentValid = true;
  }
}
