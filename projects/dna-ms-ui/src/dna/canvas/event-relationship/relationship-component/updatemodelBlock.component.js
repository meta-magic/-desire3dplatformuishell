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
var event_basemodel_1 = require("../models/event.basemodel");
var UpdateModelBlockBehaviour = (function () {
    function UpdateModelBlockBehaviour(_eventRelationshipService, _sharedDataService) {
        this._eventRelationshipService = _eventRelationshipService;
        this._sharedDataService = _sharedDataService;
        this.showUpdateModelWindow = false;
        this.body = [];
        this.config = {};
        this.title = 'Condition is';
        this.metadata = new UpdateModelMetaData();
    }
    UpdateModelBlockBehaviour.prototype.ngOnInit = function () {
        this.id = +Math.floor(Math.random() * 90000) + 10000 + '_updatemodel';
    };
    UpdateModelBlockBehaviour.prototype.removeServiceBlock = function () {
        this._eventRelationshipService.removeLogicBlock(this.id);
    };
    return UpdateModelBlockBehaviour;
}());
UpdateModelBlockBehaviour = __decorate([
    core_1.Component({
        selector: 'update-model',
        template: "\n      <amexio-label font-color=\"#436EC1\" >Update {{_sharedDataService.uiDetails.name}} Model</amexio-label>\n      <amexio-label (onClick)=\"showUpdateModelWindow = true\" [enable-click]=\"true\" *ngIf=\"metadata.defination.length > 0\"  size=\"small-bold\" font-color=\"red\">\n        update /\n      </amexio-label>\n      <amexio-label (onClick)=\"showUpdateModelWindow = true\" [enable-click]=\"true\" *ngIf=\"metadata.defination.length == 0\" size=\"small-bold\" font-color=\"red\">\n        add /\n      </amexio-label>\n      <amexio-label (onClick)=\"removeServiceBlock()\" [enable-click]=\"true\"  size=\"small-bold\" font-color=\"red\">\n        remove\n      </amexio-label>\n      <br>\n     \n      <ng-container *ngIf=\"showUpdateModelWindow\">\n        <update-model-behaviour [(show)]=\"showUpdateModelWindow\" [updateModelMetadata]=\"metadata\"></update-model-behaviour>\n      </ng-container>\n      \n    "
    })
], UpdateModelBlockBehaviour);
exports.UpdateModelBlockBehaviour = UpdateModelBlockBehaviour;
var UpdateModelMetaData = (function (_super) {
    __extends(UpdateModelMetaData, _super);
    function UpdateModelMetaData() {
        var _this = _super.call(this) || this;
        _this.type = 'updatemodel';
        return _this;
    }
    return UpdateModelMetaData;
}(event_basemodel_1.EventNode));
exports.UpdateModelMetaData = UpdateModelMetaData;
