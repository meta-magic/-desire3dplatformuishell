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
  selector: 'canvas-form-header',
  template: `
    <div class="cardHeader {{dragOverStyle}} "
         (click)="setSelfActive($event)"
         (mouseover)="onMouseOver($event)" (mouseleave)="onMouseLeave($event)"
         (dragover)="componentElementDraggedOver($event)"
         (dragleave)="componentDragExit($event)"
         (dragend)="componentDragExit($event)"
         (drop)="componentElementDropped($event)">
      <div (dragenter)="componentDragExit($event)" (mouseenter)="onMouseEnter($event)" (mouseout)="onMouseOut($event)">
      <ng-template #formheadertarget></ng-template>
      </div>
    </div>
  `,
  styles: [
    `
      .cardHeader {
        min-height: 40px;
      }
      .card-header:hover{
        border: 1px dotted #dddddd;
      }
    `
  ]
})
export class CanvasFormHeaderComponent extends CanvasWidgetClass
  implements OnInit, OnDestroy {
  dragOverStyle: any;
  name = 'formheader';
  @ViewChild('formheadertarget', { read: ViewContainerRef })
  target: any;
  constructor(
    public _eventHndl: EventHandlerService,
    public _dragDropEventService: DragDropEventService,
    public _componentFactoryResolver: ComponentFactoryResolver
  ) {
    super();
    this.properties = new FormHeaderProperties();
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
  componentElementDraggedOver(event: any) {
    this.dragOverStyle = 'drag-over-style';
    event.preventDefault();
    event.stopPropagation();
  }

  componentDragExit(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.dragOverStyle = '';
  }

  componentElementDropped(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this._dragDropEventService.componentElementDrop(this);
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

  setSelfActive(event: any) {
    if (event != null) {
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

export class FormHeaderProperties {
  isComponentValid: boolean;
  constructor() {
    this.isComponentValid = true;
  }
}
