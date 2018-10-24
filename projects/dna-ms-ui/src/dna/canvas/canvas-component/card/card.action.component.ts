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
import { EventHandlerService } from '../../canvas-service/event.service';
import { DragDropEventService } from '../../canvas-service/dragdrop.event.service';
import { CanvasWidgetClass } from '../../canvas-models/canvas.widget.class';
import { PropertyMap } from '../../canvas-component-map/properties.map';

@Component({
  selector: 'canvas-card-action',
  template: `
    <div class="card-action {{dragOverStyle}}"
         (click)="setSelfActive($event)"
         (mouseover)="onMouseOver($event)" (mouseleave)="onMouseLeave($event)"
         (dragover)="componentElementDraggedOver($event)"
         (dragleave)="componentDragExit($event)"
         (dragend)="componentDragExit($event)"
         (drop)="componentElementDropped($event)">
      <div (dragenter)="componentDragExit($event)" (mouseout)="onMouseOut($event)">
        <div class="footer-style">
          <ng-template #cardactiontarget></ng-template>
        </div>

      </div>
    </div>
  `,
  styles: [
    `
      .card-action {
        min-height: 40px;
        justify-content: flex-end
      }
      .card-action:hover{
        border: 1px dotted #dddddd;
      }
      .footer-style{
        min-height: 40px!important;display: flex!important;justify-content: flex-end!important;
      }
    `
  ]
})
export class CanvasCardActionComponent extends CanvasWidgetClass
  implements OnInit, OnDestroy {
  dragOverStyle: any;
  name = 'cardaction';
  @ViewChild('cardactiontarget', { read: ViewContainerRef })
  target: any;
  constructor(
    public _eventHndl: EventHandlerService,
    public _dragDropEventService: DragDropEventService,
    public _componentFactoryResolver: ComponentFactoryResolver
  ) {
    super();
    this.isComponent = false;
    this.properties = new CardActionProperties();
  }

  componentDragExit(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.dragOverStyle = '';
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

  componentElementDropped(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.dragOverStyle = '';
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

export class CardActionProperties {
  isComponentValid: boolean;
  constructor() {
    this.isComponentValid = true;
  }
}
