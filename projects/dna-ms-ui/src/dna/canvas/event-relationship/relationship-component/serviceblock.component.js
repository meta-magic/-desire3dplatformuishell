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
var retionship_map_1 = require("../../canvas-component-map/retionship.map");
var event_basemodel_1 = require("../models/event.basemodel");
var ServiceBlockBehaviour = (function () {
    function ServiceBlockBehaviour(_componentFactoryResolver, _eventRelationshipService) {
        this._componentFactoryResolver = _componentFactoryResolver;
        this._eventRelationshipService = _eventRelationshipService;
        this.showServiceBindingWindow = false;
        this.body = [];
        this.config = {};
        this.title = 'Service ';
        this.metadata = new ServiceMetaData();
    }
    ServiceBlockBehaviour.prototype.ngOnInit = function () {
        this.id = +Math.floor(Math.random() * 90000) + 10000 + '_service';
        if (this.metadata.metadata.hasOwnProperty('servicedefination')) {
            this.title =
                this.metadata.metadata.servicedefination.serviceName +
                    ' ' +
                    this.metadata.metadata.servicedefination.operationName;
        }
    };
    ServiceBlockBehaviour.prototype.onDragOver = function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    ServiceBlockBehaviour.prototype.onDrop = function (event) {
        if (this._eventRelationshipService.eventLogicBlockDragKey == 'EVR') {
            event.preventDefault();
            event.stopPropagation();
            var componentInstance = void 0;
            componentInstance = this.createComponentInstance(JSON.parse(event.dataTransfer.getData('dragdata')).key);
            componentInstance.instance.metadata.parentRef = this.metadata.parentRef;
            componentInstance.instance.config = this.config;
            componentInstance.instance.config.onRoot = false;
            this.body.push(componentInstance);
            this._eventRelationshipService.eventLogicBlockDragKey = '';
        }
    };
    ServiceBlockBehaviour.prototype.createComponentInstance = function (key) {
        var componentFactory = this._componentFactoryResolver.resolveComponentFactory(retionship_map_1.RelationshipBlockMap.Block_MAP[key]);
        var componentInstance = this.target.createComponent(componentFactory);
        return componentInstance;
    };
    ServiceBlockBehaviour.prototype.removeServiceBlock = function () {
        this._eventRelationshipService.removeLogicBlock(this.id);
    };
    ServiceBlockBehaviour.prototype.getOnClick = function (event) {
        this.title = event.serviceData;
    };
    return ServiceBlockBehaviour;
}());
__decorate([
    core_1.ViewChild('target', { read: core_1.ViewContainerRef })
], ServiceBlockBehaviour.prototype, "target");
ServiceBlockBehaviour = __decorate([
    core_1.Component({
        selector: 'service-defination-behaviour',
        template: "      \n      <table style=\"color: #000000; \" (drop)=\"onDrop($event)\" (dragover)=\"onDragOver($event)\">\n        <tr>\n          <td colspan=\"2\">\n            <amexio-label>\n              When: {{title}} Is Called\n            </amexio-label>\n            <amexio-label (onClick)=\"this.showServiceBindingWindow = true\" [enable-click]=\"true\" *ngIf=\"metadata.defination.length > 0\" size=\"small-bold\" font-color=\"red\">\n              update /\n            </amexio-label>\n            <amexio-label (onClick)=\"showServiceBindingWindow = true\" [enable-click]=\"true\" *ngIf=\"metadata.defination.length == 0\" size=\"small-bold\" font-color=\"red\">\n              add /\n            </amexio-label>\n            <amexio-label (onClick)=\"removeServiceBlock()\" [enable-click]=\"true\"  size=\"small-bold\" font-color=\"red\">\n              remove\n            </amexio-label>\n           \n          </td>\n        </tr>\n        <tr>\n          <td colspan=\"1\" style=\"vertical-align:top;\">\n            <amexio-label>Then</amexio-label>\n          </td>\n          <td width=\"100%\" class=\"curly-braces\">\n            <div class=\"curly-braces-contains\">\n              <ng-template #target></ng-template>\n            </div>\n          </td>\n        </tr>\n      </table>\n      <ng-container *ngIf=\"showServiceBindingWindow\">\n        <service-binding-component-behaviour (onClick)=\"getOnClick($event)\" [(show)]=\"showServiceBindingWindow\" [serviceMetadata]=\"metadata\"></service-binding-component-behaviour>\n      </ng-container>\n    \n    ",
        styles: [
            ".curly-braces {\n      border-left: 2px dashed;\n      border-right: 2px dashed;\n      border-color: #000000;\n      border-radius: 15px;\n    }\n    .curly-braces-contains {\n      min-height:50px;\n      width: 95%;\n      padding: 10px;\n    }\n    "
        ]
    })
], ServiceBlockBehaviour);
exports.ServiceBlockBehaviour = ServiceBlockBehaviour;
var ServiceMetaData = (function (_super) {
    __extends(ServiceMetaData, _super);
    function ServiceMetaData() {
        var _this = _super.call(this) || this;
        _this.type = 'service';
        return _this;
    }
    return ServiceMetaData;
}(event_basemodel_1.EventNode));
exports.ServiceMetaData = ServiceMetaData;
