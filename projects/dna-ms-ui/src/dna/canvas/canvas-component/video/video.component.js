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
var CanvasVideoComponent = (function (_super) {
    __extends(CanvasVideoComponent, _super);
    function CanvasVideoComponent(_eventHndl, _componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this._eventHndl = _eventHndl;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this.mouseLocation = { left: 0, top: 0 };
        _this.properties = new VideoProperties();
        return _this;
    }
    CanvasVideoComponent.prototype.ngOnInit = function () {
        this.componentId =
            +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
    };
    CanvasVideoComponent.prototype.onMouseOver = function (event) {
        event.stopPropagation();
        this.isOver = true;
    };
    CanvasVideoComponent.prototype.onMouseLeave = function (event) {
        event.stopPropagation();
        this.isOver = false;
    };
    CanvasVideoComponent.prototype.onHover = function () {
        this.showContextMenu = false;
    };
    CanvasVideoComponent.prototype.getContextMenuStyle = function () {
        return {
            position: 'fixed',
            display: this.showContextMenu ? 'block' : 'none',
            left: this.mouseLocation.left + 'px',
            top: this.mouseLocation.top + 'px',
            'box-shadow': '1px 1px 2px #000000',
            width: '15%'
        };
    };
    CanvasVideoComponent.prototype.loadContextMenu = function (event) {
        this.mouseLocation.left = event.clientX;
        this.mouseLocation.top = event.clientY;
        this.showContextMenu = true;
        event.preventDefault();
        event.stopPropagation();
        this._eventHndl.deleteComponentRef = this.componentId;
    };
    CanvasVideoComponent.prototype.onDeleteClick = function () {
        this.showContextMenu = false;
        this._eventHndl.componentIdToDel = this.componentId;
        this._eventHndl.deleteComponent();
        this._eventHndl.addEditorNewState();
    };
    CanvasVideoComponent.prototype.setSelfActive = function (event) {
        event.stopPropagation();
        this._eventHndl.deleteComponentRef = null;
        this._eventHndl.deleteComponentRef = this.componentId;
        this._eventHndl.setAllComponentsInactive(this.componentId);
        this._eventHndl.loadComponentProperties(this.name);
    };
    CanvasVideoComponent.prototype.componentElementDraggedOver = function (event) {
        event.preventDefault();
    };
    return CanvasVideoComponent;
}(canvas_widget_class_1.CanvasWidgetClass));
__decorate([
    core_1.HostListener('document:click')
], CanvasVideoComponent.prototype, "onHover");
CanvasVideoComponent = __decorate([
    core_1.Component({
        selector: 'video-player',
        template: "\n  <div (click)=\"setSelfActive($event)\" [attr.id]=\"componentId\"\n       (mouseover)=\"onMouseOver($event)\" (mouseleave)=\"onMouseLeave($event)\"\n       draggable=\"true\" [ngClass]=\"{'componentStyle':isOver,'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}\"\n  (dragstart)=\"_eventHndl.componentElementRelocateDragBegin($event,this)\"\n  (contextmenu)=\"loadContextMenu($event)\"\n  (dragover)=\"componentElementDraggedOver($event)\" #video>\n  <amexio-video-player   [path]=\"properties.path\" [extension]=\"properties.extension\">\n</amexio-video-player>\n</div>\n<span  *ngIf=\"showContextMenu\" (click)=\"onDeleteClick()\" class=\"dropdown\"\n[ngStyle]=\"{left: this.mouseLocation.left + 'px',top: this.mouseLocation.top + 'px',position:'fixed','box-shadow': '1px 1px 2px #000000',width: '15%'}\">\n    <ul class=\"dropdown-list\">\n      <li class=\"list-items\">\n        <span ><i class=\"fa fa-trash\" style=\"padding-right: 5px;\"></i> <b>Delete</b> </span>\n      </li>\n    </ul>\n  </span>\n  "
    })
], CanvasVideoComponent);
exports.CanvasVideoComponent = CanvasVideoComponent;
var VideoProperties = (function () {
    function VideoProperties() {
        this.isComponentValid = true;
        this.name = 'video_' + Math.floor(Math.random() * 90000) + 10000;
        this.path =
            'http://www.amexio.org/showcaseapp/v3/assets/videos/sample_bunny.mp4';
        this.extension = '';
    }
    return VideoProperties;
}());
exports.VideoProperties = VideoProperties;
