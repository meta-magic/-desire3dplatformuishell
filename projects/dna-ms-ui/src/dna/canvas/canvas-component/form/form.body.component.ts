/**
 * Created by dattaram on 1/3/18.
 */
import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { CanvasWidgetClass } from '../../canvas-models/canvas.widget.class';
import { EventHandlerService } from '../../canvas-service/event.service';
import { DragDropEventService } from '../../canvas-service/dragdrop.event.service';
import { PropertyMap } from '../../canvas-component-map/properties.map';

@Component({
  selector: 'canvas-form-body',
  template: `
  <div class="rowstyle {{dragOverStyle}} "
        (click)="setSelfActive($event)"
       (mouseover)="onMouseOver($event)" (mouseleave)="onMouseLeave($event)"
        (dragover)="componentElementDraggedOver($event)"
        (dragleave)="componentDragExit($event)"
        (dragend)="componentDragExit($event)"
        (drop)="componentElementDropped($event)">
    <div class="dropable-area"  (dragenter)="componentDragExit($event)" (mouseout)="onMouseLeave($event)">
        <ng-template #formbodytarget></ng-template>
    </div>

  </div>
  `
})
export class CanvasFormBodyComponent extends CanvasWidgetClass
  implements OnInit, OnDestroy {
  dragOverStyle: any;
  name = 'formbody';
  @ViewChild('formbodytarget', { read: ViewContainerRef })
  target: any;
  constructor(
    public _eventHndl: EventHandlerService,
    public _dragDropEventService: DragDropEventService,
    public _componentFactoryResolver: ComponentFactoryResolver
  ) {
    super();
    this.properties = new FormBodyProperties();
  }

  onMouseOver(event: any) {
    event.stopPropagation();
    this.dragOverStyle = 'componentStyle';
  }
  onMouseLeave(event: any) {
    event.stopPropagation();
    this.dragOverStyle = '';
  }

  ngOnInit() {
    this.componentId =
      +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
  }

  componentDragExit(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.dragOverStyle = '';
  }

  componentElementDraggedOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.dragOverStyle = 'drag-over-style';
  }

  componentElementDropped(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.dragOverStyle = '';
    if (this._eventHndl.componentClassKeyDragged == 'row') {
      this._dragDropEventService.rowDropComponentRef = null;
      this._dragDropEventService.rowDropComponentRef = this;
      this._dragDropEventService.rowAddDialogue = true;
    } else {
      this._dragDropEventService.componentElementDrop(this);
    }
  }
  setSelfActive(event: any) {
    if (event != null) {
      this._eventHndl.deleteComponentRef = null;
      this._eventHndl.deleteComponentRef = this.componentId;
      this._eventHndl.setAllComponentsInactive(this.componentId);
    }
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

export class FormBodyProperties {
  isComponentValid: boolean;
  constructor() {
    this.isComponentValid = true;
  }
}
