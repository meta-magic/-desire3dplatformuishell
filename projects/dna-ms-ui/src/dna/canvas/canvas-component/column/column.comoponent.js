"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var canvas_widget_class_1 = require("../../canvas-models/canvas.widget.class");
var CanvasColumnComponent = (function (_super) {
    __extends(CanvasColumnComponent, _super);
    function CanvasColumnComponent(_dragDropEventService, _componentFactoryResolver, _eventHndl) {
        var _this = _super.call(this) || this;
        _this._dragDropEventService = _dragDropEventService;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this._eventHndl = _eventHndl;
        _this.mouseLocation = { left: 0, top: 0 };
        _this.parentComponentRef = {};
        _this.arrowClass = 'arrow-hide';
        _this.availableMax = 0; // should be same as properties.columnlg
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
        _this.leftNavigation = '';
        _this.rightNavigation = '';
        _this.isComponent = false;
        _this.properties = new ColumnProperties();
        _this.colSize = 'flex-col flex-col-' + _this.properties.columnlg;
        return _this;
    }
    CanvasColumnComponent.prototype.onWindowClick = function () {
        this.showContextMenu = false;
    };
    CanvasColumnComponent.prototype.componentInitailized = function () {
        this.setColSize();
        this.adjustColumnSize();
    };
    CanvasColumnComponent.prototype.adjustColumnSize = function () {
        this.leftClass();
        this.rightClass();
    };
    CanvasColumnComponent.prototype.setColSize = function () {
        this.colSize = 'flex-col flex-col-' + this.properties.columnlg;
    };
    CanvasColumnComponent.prototype.adjustColumn = function (adjust) {
        if (adjust == 1) {
            if (this.leftEnabled) {
                this.onReduceColumnSize();
            }
            else if (this.rightEnabled) {
                this.onIncreaseColumnSize();
            }
        }
        else if (adjust == 2) {
            if (this.leftEnabled) {
                this.onIncreaseColumnSize();
            }
            else if (this.rightEnabled) {
                this.onReduceColumnSize();
            }
        }
    };
    CanvasColumnComponent.prototype.ngOnInit = function () {
        this.componentId =
            +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
    };
    CanvasColumnComponent.prototype.ngAfterViewInit = function () {
        this.leftClass();
    };
    CanvasColumnComponent.prototype.ngOnDestroy = function () { };
    CanvasColumnComponent.prototype.componentElementDraggedOver = function (event) {
        this.componentOverStyle = 'overEffect';
        event.preventDefault();
        event.stopPropagation();
    };
    CanvasColumnComponent.prototype.setSelfActive = function (event) {
        if (event != null) {
            this.componentOverStyle = 'overEffect';
            event.stopPropagation();
            this._eventHndl.deleteComponentRef = null;
            this._eventHndl.deleteComponentRef = this.componentId;
            this._eventHndl.setAllComponentsInactive(this.componentId);
            this._eventHndl.loadComponentProperties(this.name);
        }
    };
    CanvasColumnComponent.prototype.componentElementDropped = function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (this._eventHndl.componentClassKeyDragged == 'row') {
            this._dragDropEventService.rowDropComponentRef = null;
            this._dragDropEventService.rowDropComponentRef = this;
            this._dragDropEventService.rowAddDialogue = true;
        }
        else if (this._eventHndl.componentClassKeyDragged == 'column') {
            this._dragDropEventService.notificationData.push('Column Within column not allowed');
        }
        else {
            this._dragDropEventService.componentElementDrop(this);
        }
        this.leftClass();
    };
    CanvasColumnComponent.prototype.onMouseOver = function (event) {
        event.stopPropagation();
        this.componentOverStyle = 'overEffect';
        this.isOver = true;
    };
    CanvasColumnComponent.prototype.onMouseLeave = function (event) {
        event.stopPropagation();
        this.isOver = true;
        this.componentOverStyle = '';
    };
    CanvasColumnComponent.prototype.onMouseEnter = function (event) {
        event.stopPropagation();
        this.componentOverStyle = '';
    };
    CanvasColumnComponent.prototype.onMouseOut = function (event) {
        event.stopPropagation();
        this.componentOverStyle = '';
    };
    CanvasColumnComponent.prototype.componentDragEnter = function (event) {
        event.stopPropagation();
        this.componentOverStyle = '';
    };
    CanvasColumnComponent.prototype.loadContextMenu = function (event) {
        this.mouseLocation.left = event.clientX;
        this.mouseLocation.top = event.clientY;
        this.showContextMenu = true;
        event.preventDefault();
        event.stopPropagation();
    };
    CanvasColumnComponent.prototype.getContextMenuStyle = function () {
        return {
            position: 'fixed',
            display: this.showContextMenu ? 'block' : 'none',
            left: this.mouseLocation.left + 'px',
            top: this.mouseLocation.top + 'px',
            'box-shadow': '1px 1px 2px #000000',
            width: '15%'
        };
    };
    CanvasColumnComponent.prototype.onLeftDrag = function (event) {
        if (this.startY == null)
            this.startY = event.clientX;
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
    };
    CanvasColumnComponent.prototype.onRightDrag = function (event) {
        if (this.startX == null)
            this.startX = event.clientX;
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
    };
    CanvasColumnComponent.prototype.leftClass = function () {
        var _this = this;
        this.leftNavigation = '';
        this.leftEnabled = false;
        var rowOccupiedSpace = 0;
        if (this.parentComponentRef != null &&
            this.parentComponentRef.hasOwnProperty('children')) {
            var length_1 = this.parentComponentRef.children.length;
            this.parentComponentRef.children.forEach(function (childColumn, index) {
                if (_this.componentId == childColumn.instance.componentId &&
                    index > 0) {
                    _this.leftNavigation = 'fa fa-angle-left';
                    _this.leftEnabled = true;
                }
                rowOccupiedSpace += parseInt(childColumn.instance.properties.columnlg);
            });
        }
        this.availableMax = 12 - rowOccupiedSpace;
    };
    CanvasColumnComponent.prototype.rightClass = function () {
        var _this = this;
        this.rightNavigation = '';
        if (this.parentComponentRef != null &&
            this.parentComponentRef.hasOwnProperty('children')) {
            var length_2 = this.parentComponentRef.children.length;
            this.parentComponentRef.children.forEach(function (childColumn, index) {
                if (_this.componentId == childColumn.instance.componentId &&
                    index + 1 != length_2) {
                    _this.rightNavigation = 'fa fa-angle-right';
                    _this.rightEnabled = true;
                }
                else if (length_2 == 1 &&
                    _this.componentId == childColumn.instance.componentId) {
                    _this.rightNavigation = 'fa fa-angle-right';
                    _this.rightEnabled = true;
                }
            });
        }
    };
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
    CanvasColumnComponent.prototype.onReduceColumnSize = function () {
        // this.properties.columnlg >= 1 ? this.properties.columnlg-- : this.properties.columnlg;
        var rowAvailSpace = 0;
        var rowOccupiedSpace = 0;
        var matchedIndex = 0;
        var compId = this.componentId;
        var previousColumn;
        this.parentComponentRef.children.forEach(function (child, index) {
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
        }
        else {
            if (previousColumn.instance.children.length == 0) {
                previousColumn.destroy(); //destroy it
                this.parentComponentRef.children.splice(matchedIndex - 1, 1);
                this._dragDropEventService.notificationData.push('Deleted previous empty column');
                this.properties.columnlg++;
            }
            else {
                this._dragDropEventService.notificationData.push('No space in row');
            }
        }
        //if no space left remove the previous tupple
        this.setColSize();
    };
    CanvasColumnComponent.prototype.onIncreaseColumnSize = function () {
        //check available space in row
        var rowAvailSpace = 0;
        var rowOccupiedSpace = 0;
        var matchedIndex = 0;
        var compId = this.componentId;
        this.parentComponentRef.children.forEach(function (child, index) {
            if (child.hasOwnProperty('instance')) {
                rowOccupiedSpace += parseInt(child.instance.properties.columnlg);
                compId == child.instance.componentId ? (matchedIndex = index) : 0;
            }
        });
        rowAvailSpace = 12 - rowOccupiedSpace;
        if (rowAvailSpace > 0) {
            //when space is available add it
            this.properties.columnlg++;
        }
        else {
            var nextColumn = this.parentComponentRef.children[matchedIndex + 1];
            //regardless empty or not ? decrease the next tuple size till 1 & increase till then
            if (nextColumn && nextColumn.hasOwnProperty('instance')) {
                if (nextColumn.instance.properties.columnlg > 1) {
                    //decrease nextColumn -- Increase current
                    nextColumn.instance.properties.columnlg--;
                    nextColumn.instance.setColSize();
                    this.properties.columnlg++;
                }
                else {
                    //if the column is empty delete and increase
                    if (nextColumn.instance.children.length == 0) {
                        //delete the instance
                        nextColumn.destroy(); //destroy it
                        this.parentComponentRef.children.splice(matchedIndex + 1, 1);
                        this._dragDropEventService.notificationData.push('Deleted next empty column');
                        this.properties.columnlg++;
                    }
                    else {
                        this._dragDropEventService.notificationData.push('No space in row');
                    }
                }
            }
        }
        rowOccupiedSpace = 0;
        this.parentComponentRef.children.forEach(function (child, index) {
            rowOccupiedSpace += parseInt(child.instance.properties.columnlg);
        });
        this.availableMax = 12 - rowOccupiedSpace;
        //check the updated remaining space
        this.setColSize();
    };
    CanvasColumnComponent.prototype.increaseColumn = function (value) {
        if (value <= 12) {
            this.properties.columnlg = value;
            this.componentInitailized();
        }
    };
    CanvasColumnComponent.prototype.descreaseColumn = function (value) {
        if (value <= 12) {
            this.properties.columnlg = value;
            this.componentInitailized();
        }
    };
    CanvasColumnComponent.prototype.onDeleteClick = function () {
        this.showContextMenu = false;
        this._eventHndl.componentIdToDel = this.componentId;
        this._eventHndl.deleteComponent();
        this._eventHndl.addEditorNewState();
    };
    return CanvasColumnComponent;
}(canvas_widget_class_1.CanvasWidgetClass));
__decorate([
    core_1.ViewChild('columntarget', { read: core_1.ViewContainerRef })
], CanvasColumnComponent.prototype, "target");
__decorate([
    core_1.HostListener('document:click')
], CanvasColumnComponent.prototype, "onWindowClick");
CanvasColumnComponent = __decorate([
    core_1.Component({
        selector: 'canvas-column',
        template: "\n    <div class=\"colstyle\" (click)=\"setSelfActive($event)\"\n         (mouseover)=\"onMouseOver($event)\" (mouseleave)=\"onMouseLeave($event)\"\n         draggable=\"true\" [ngClass]=\"{'componentStyle':isOver,'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}\"\n         (dragstart)=\"_eventHndl.componentElementRelocateDragBegin($event,this)\"\n         (dragover)=\"componentElementDraggedOver($event)\"\n         (drop)=\"componentElementDropped($event)\"\n         (contextmenu)=\"loadContextMenu($event)\">\n      <i [ngClass]=\"leftNavigation \" class=\"col-expand\" style=\"cursor: pointer;padding-right: 97%\"  (click)=\"onReduceColumnSize()\"></i>\n\n      <div (mouseenter)=\"onMouseEnter($event)\" (dragenter)=\"componentDragEnter($event)\" (mouseout)=\"onMouseOut($event)\">\n        <ng-template #columntarget></ng-template>\n      </div>\n\n      <i class=\"col-expand\"  [ngClass]=\"rightNavigation\" style=\"cursor: pointer;padding-left: 97%\" (click)=\"onIncreaseColumnSize()\"></i>\n\n    </div>\n\n\n   <span  *ngIf=\"showContextMenu\" (click)=\"onDeleteClick()\" class=\"dropdown\"\n    [ngStyle]=\"{left: this.mouseLocation.left + 'px',top: this.mouseLocation.top + 'px',position:'fixed','box-shadow': '1px 1px 2px #000000',width: '15%'}\">\n        <ul class=\"dropdown-list\">\n          <li class=\"list-items\">\n            <span ><i class=\"fa fa-trash\" style=\"padding-right: 5px;\"></i> <b>Delete</b> </span>\n          </li>\n        </ul>\n      </span>\n  ",
        host: {
            '[class]': 'colSize'
        }
    })
], CanvasColumnComponent);
exports.CanvasColumnComponent = CanvasColumnComponent;
var ColumnProperties = (function () {
    function ColumnProperties() {
        this.isComponentValid = true;
        this.columnlg = '1';
    }
    return ColumnProperties;
}());
exports.ColumnProperties = ColumnProperties;
