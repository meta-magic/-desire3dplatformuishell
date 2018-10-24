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
import { CanvasWidgetClass } from '../../canvas-models/canvas.widget.class';
import { DragDropEventService } from '../../canvas-service/dragdrop.event.service';
import { EventHandlerService } from '../../canvas-service/event.service';
import { PropertyMap } from '../../canvas-component-map/properties.map';

@Component({
  selector: 'canvas-column',
  template: `
    <div class="colstyle" (click)="setSelfActive($event)"
         (mouseover)="onMouseOver($event)" (mouseleave)="onMouseLeave($event)"
         draggable="true" [ngClass]="{'componentStyle':isOver,'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}"
         (dragstart)="_eventHndl.componentElementRelocateDragBegin($event,this)"
         (dragover)="componentElementDraggedOver($event)"
         (drop)="componentElementDropped($event)"
         (contextmenu)="loadContextMenu($event)">
      <i [ngClass]="leftNavigation " class="col-expand" style="cursor: pointer;padding-right: 97%"  (click)="onReduceColumnSize()"></i>

      <div (mouseenter)="onMouseEnter($event)" (dragenter)="componentDragEnter($event)" (mouseout)="onMouseOut($event)">
        <ng-template #columntarget></ng-template>
      </div>

      <i class="col-expand"  [ngClass]="rightNavigation" style="cursor: pointer;padding-left: 97%" (click)="onIncreaseColumnSize()"></i>

    </div>


   <span  *ngIf="showContextMenu" (click)="onDeleteClick()" class="dropdown"
    [ngStyle]="{left: this.mouseLocation.left + 'px',top: this.mouseLocation.top + 'px',position:'fixed','box-shadow': '1px 1px 2px #000000',width: '15%'}">
        <ul class="dropdown-list">
          <li class="list-items">
            <span ><i class="fa fa-trash" style="padding-right: 5px;"></i> <b>Delete</b> </span>
          </li>
        </ul>
      </span>
  `,
  host: {
    '[class]': 'colSize'
  }
})
export class CanvasColumnComponent extends CanvasWidgetClass
  implements OnInit, OnDestroy {
  componentOverStyle: any;
  showContextMenu: boolean;
  mouseLocation: { left: number; top: number } = { left: 0, top: 0 };
  colSize: any;
  @ViewChild('columntarget', { read: ViewContainerRef })
  target: any;
  startX: number;
  currentX: number;
  startY: number;
  currentY: number;
  leftButton: boolean;
  parentComponentRef: any = {};
  arrowClass: string = 'arrow-hide';
  availableMax: number = 0; // should be same as properties.columnlg
  constructor(
    public _dragDropEventService: DragDropEventService,
    public _componentFactoryResolver: ComponentFactoryResolver,
    public _eventHndl: EventHandlerService
  ) {
    super();
    this.isComponent = false;
    this.properties = new ColumnProperties();
    this.colSize = 'flex-col flex-col-' + this.properties.columnlg;
  }

  @HostListener('document:click')
  onWindowClick() {
    this.showContextMenu = false;
  }

  componentInitailized() {
    this.setColSize();
    this.adjustColumnSize();
  }
  adjustColumnSize() {
    this.leftClass();
    this.rightClass();
  }
  setColSize() {
    this.colSize = 'flex-col flex-col-' + this.properties.columnlg;
  }

  adjustColumn(adjust: number) {
    if (adjust == 1) {
      if (this.leftEnabled) {
        this.onReduceColumnSize();
      } else if (this.rightEnabled) {
        this.onIncreaseColumnSize();
      }
    } else if (adjust == 2) {
      if (this.leftEnabled) {
        this.onIncreaseColumnSize();
      } else if (this.rightEnabled) {
        this.onReduceColumnSize();
      }
    }
  }
  ngOnInit() {
    this.componentId =
      +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
  }
  ngAfterViewInit() {
    this.leftClass();
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

  componentElementDropped(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (this._eventHndl.componentClassKeyDragged == 'row') {
      this._dragDropEventService.rowDropComponentRef = null;
      this._dragDropEventService.rowDropComponentRef = this;
      this._dragDropEventService.rowAddDialogue = true;
    } else if (this._eventHndl.componentClassKeyDragged == 'column') {
      this._dragDropEventService.notificationData.push(
        'Column Within column not allowed'
      );
    } else {
      this._dragDropEventService.componentElementDrop(this);
    }
    this.leftClass();
  }

  onMouseOver(event: any) {
    event.stopPropagation();
    this.componentOverStyle = 'overEffect';
    this.isOver = true;
  }
  onMouseLeave(event: any) {
    event.stopPropagation();
    this.isOver = true;
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

  onLeftDrag(event: any) {
    if (this.startY == null) this.startY = event.clientX;
    else if (this.startY < event.clientX) {
      this.currentY = event.clientX;
      if (this.startY - 10 < event.clientX) {
        this.properties.columnlg >= 1
          ? this.properties.columnlg--
          : this.properties.columnlg;
        this.startY = event.clientX;
        this.adjustColumnSize();
      }
    }
  }
  onRightDrag(event: any) {
    if (this.startX == null) this.startX = event.clientX;
    else if (this.startX < event.clientX) {
      this.currentX = event.clientX;
      if (this.startX + 10 < event.clientX) {
        this.properties.columnlg <= 12
          ? this.properties.columnlg++
          : this.properties.columnlg;
        this.startX = event.clientX;
        this.adjustColumnSize();
      }
    }
  }

  // getLeftButtonClass(): string {
  //   let leftClass: string = '';
  //   let rowOccupiedSpace: number = 0;
  //   if (
  //     this.parentComponentRef != null &&
  //     this.parentComponentRef.hasOwnProperty('children')
  //   ) {
  //     let length: number = this.parentComponentRef.children.length;
  //     this.parentComponentRef.children.forEach(
  //       (childColumn: any, index: number) => {
  //         if (this.componentId == childColumn.instance.componentId && index > 0)
  //           leftClass = 'fa fa-angle-left';

  //         rowOccupiedSpace += parseInt(
  //           childColumn.instance.properties.columnlg
  //         );
  //       }
  //     );
  //   }
  //   this.availableMax = 12 - rowOccupiedSpace;
  //   return leftClass;
  // }

  leftNavigation: string = '';
  leftEnabled: boolean;

  leftClass() {
    this.leftNavigation = '';
    this.leftEnabled = false;
    let rowOccupiedSpace: number = 0;
    if (
      this.parentComponentRef != null &&
      this.parentComponentRef.hasOwnProperty('children')
    ) {
      let length: number = this.parentComponentRef.children.length;
      this.parentComponentRef.children.forEach(
        (childColumn: any, index: number) => {
          if (
            this.componentId == childColumn.instance.componentId &&
            index > 0
          ) {
            this.leftNavigation = 'fa fa-angle-left';
            this.leftEnabled = true;
          }

          rowOccupiedSpace += parseInt(
            childColumn.instance.properties.columnlg
          );
        }
      );
    }
    this.availableMax = 12 - rowOccupiedSpace;
  }
  rightNavigation: string = '';
  rightEnabled: boolean;
  rightClass() {
    this.rightNavigation = '';
    if (
      this.parentComponentRef != null &&
      this.parentComponentRef.hasOwnProperty('children')
    ) {
      let length: number = this.parentComponentRef.children.length;
      this.parentComponentRef.children.forEach(
        (childColumn: any, index: number) => {
          if (
            this.componentId == childColumn.instance.componentId &&
            index + 1 != length
          ) {
            this.rightNavigation = 'fa fa-angle-right';
            this.rightEnabled = true;
          } else if (
            length == 1 &&
            this.componentId == childColumn.instance.componentId
          ) {
            this.rightNavigation = 'fa fa-angle-right';
            this.rightEnabled = true;
          }
        }
      );
    }
  }

  // getRightButtonClass(): string {
  //   let rightClass: string = '';
  //   if (
  //     this.parentComponentRef != null &&
  //     this.parentComponentRef.hasOwnProperty('children')
  //   ) {
  //     let length: number = this.parentComponentRef.children.length;
  //     this.parentComponentRef.children.forEach(
  //       (childColumn: any, index: number) => {
  //         if (
  //           this.componentId == childColumn.instance.componentId &&
  //           index + 1 != length
  //         )
  //           rightClass = 'fa fa-angle-right';
  //         else if (
  //           length == 1 &&
  //           this.componentId == childColumn.instance.componentId
  //         )
  //           rightClass = 'fa fa-angle-right';
  //       }
  //     );
  //   }
  //   return rightClass;
  // }

  onReduceColumnSize() {
    // this.properties.columnlg >= 1 ? this.properties.columnlg-- : this.properties.columnlg;

    let rowAvailSpace: number = 0;
    let rowOccupiedSpace: number = 0;
    let matchedIndex: number = 0;
    let compId = this.componentId;
    let previousColumn: any;

    this.parentComponentRef.children.forEach((child: any, index: number) => {
      rowOccupiedSpace += parseInt(child.instance.properties.columnlg);
      compId == child.instance.componentId ? (matchedIndex = index) : 0;
    });

    rowAvailSpace = 12 - rowOccupiedSpace;
    previousColumn = this.parentComponentRef.children[matchedIndex - 1];

    //check previous tupple size is > 0
    if (previousColumn.instance.properties.columnlg > 1) {
      previousColumn.instance.properties.columnlg--;
      previousColumn.instance.setColSize();
      this.properties.columnlg++;
    } else {
      if (previousColumn.instance.children.length == 0) {
        previousColumn.destroy(); //destroy it
        this.parentComponentRef.children.splice(matchedIndex - 1, 1);
        this._dragDropEventService.notificationData.push(
          'Deleted previous empty column'
        );
        this.properties.columnlg++;
      } else {
        this._dragDropEventService.notificationData.push('No space in row');
      }
    }

    //if no space left remove the previous tupple

    this.setColSize();
  }

  onIncreaseColumnSize() {
    //check available space in row
    let rowAvailSpace: number = 0;
    let rowOccupiedSpace: number = 0;
    let matchedIndex: number = 0;
    let compId = this.componentId;

    this.parentComponentRef.children.forEach((child: any, index: number) => {
      if (child.hasOwnProperty('instance')) {
        rowOccupiedSpace += parseInt(child.instance.properties.columnlg);
        compId == child.instance.componentId ? (matchedIndex = index) : 0;
      }
    });

    rowAvailSpace = 12 - rowOccupiedSpace;
    if (rowAvailSpace > 0) {
      //when space is available add it
      this.properties.columnlg++;
    } else {
      let nextColumn = this.parentComponentRef.children[matchedIndex + 1];
      //regardless empty or not ? decrease the next tuple size till 1 & increase till then
      if (nextColumn && nextColumn.hasOwnProperty('instance')) {
        if (nextColumn.instance.properties.columnlg > 1) {
          //decrease nextColumn -- Increase current
          nextColumn.instance.properties.columnlg--;
          nextColumn.instance.setColSize();

          this.properties.columnlg++;
        } else {
          //if the column is empty delete and increase
          if (nextColumn.instance.children.length == 0) {
            //delete the instance
            nextColumn.destroy(); //destroy it
            this.parentComponentRef.children.splice(matchedIndex + 1, 1);
            this._dragDropEventService.notificationData.push(
              'Deleted next empty column'
            );
            this.properties.columnlg++;
          } else {
            this._dragDropEventService.notificationData.push('No space in row');
          }
        }
      }
    }

    rowOccupiedSpace = 0;
    this.parentComponentRef.children.forEach((child: any, index: number) => {
      rowOccupiedSpace += parseInt(child.instance.properties.columnlg);
    });

    this.availableMax = 12 - rowOccupiedSpace;
    //check the updated remaining space

    this.setColSize();
  }

  increaseColumn(value: number) {
    if (value <= 12) {
      this.properties.columnlg = value;
      this.componentInitailized();
    }
  }

  descreaseColumn(value: number) {
    if (value <= 12) {
      this.properties.columnlg = value;
      this.componentInitailized();
    }
  }

  onDeleteClick() {
    this.showContextMenu = false;
    this._eventHndl.componentIdToDel = this.componentId;
    this._eventHndl.deleteComponent();
    this._eventHndl.addEditorNewState();
  }
}

export class ColumnProperties {
  isComponentValid: boolean;
  columnlg: string;
  constructor() {
    this.isComponentValid = true;
    this.columnlg = '1';
  }
}
