/**
 * Created by dattaram on 3/7/18.
 */
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
var NotificationBlockBehaviour = (function () {
    function NotificationBlockBehaviour(_eventRelationshipService, _sharedDataService) {
        this._eventRelationshipService = _eventRelationshipService;
        this._sharedDataService = _sharedDataService;
        this.showNotificationModelWindow = false;
        this.body = [];
        this.config = {};
        this.whenStatement = '';
        this.metadata = new NotificationModelMetaData();
    }
    NotificationBlockBehaviour.prototype.ngOnInit = function () {
        this.createWhenString();
        this.id = +Math.floor(Math.random() * 90000) + 10000 + '_';
    };
    NotificationBlockBehaviour.prototype.removeServiceBlock = function () {
        this._eventRelationshipService.removeLogicBlock(this.id);
    };
    NotificationBlockBehaviour.prototype.createWhenString = function () {
        if (this.config.componentName == 'rootpane') {
            this.whenStatement =
                'When : ' +
                    this._sharedDataService.uiDetails.name +
                    ' ' +
                    this.config.eventName +
                    ' event';
        }
        else {
            this.whenStatement =
                'Given : ' +
                    this.config.componentLabel +
                    ' ' +
                    this.config.componentName +
                    ' ' +
                    this.config.eventName +
                    ' event';
        }
    };
    return NotificationBlockBehaviour;
}());
NotificationBlockBehaviour = __decorate([
    core_1.Component({
        selector: 'notification',
        template: "\n\n    <table style=\"color: #000000; \">\n      <ng-container *ngIf=\"config.onRoot; else onChild\">\n        <tr>\n          <td colspan=\"2\">\n            <amexio-label>\n              {{whenStatement}}\n            </amexio-label>\n          </td>\n        </tr>\n        <tr>\n          <td colspan=\"1\" style=\"vertical-align:top;\">\n            <amexio-label>Then &nbsp;&nbsp;</amexio-label>\n\n          </td>\n          <td width=\"100%\" class=\"curly-braces\">\n            <div class=\"curly-braces-contains\">\n              <amexio-label>Notify &nbsp;:</amexio-label>\n              <amexio-label (onClick)=\"this.showNotificationModelWindow = true\" [enable-click]=\"true\" *ngIf=\"metadata.defination.length > 0\" size=\"small-bold\" font-color=\"red\">\n                update /\n              </amexio-label>\n              <amexio-label  *ngIf=\"metadata.defination.length == 0\" (onClick)=\"showNotificationModelWindow = true\" [enable-click]=\"true\"\n                             size=\"small-bold\" font-color=\"red\">add /</amexio-label>\n              <amexio-label (onClick)=\"removeServiceBlock()\" [enable-click]=\"true\"  size=\"small-bold\" font-color=\"red\">\n                remove\n              </amexio-label>\n            </div>\n          </td>\n        </tr>\n      </ng-container>\n      <ng-template #onChild>\n        <div class=\"without-curly-braces\">\n          <amexio-label>Notify &nbsp;:</amexio-label>\n          <amexio-label (onClick)=\"this.showNotificationModelWindow = true\" [enable-click]=\"true\" *ngIf=\"metadata.defination.length > 0\" size=\"small-bold\" font-color=\"red\">\n            update /\n          </amexio-label>\n          <amexio-label  *ngIf=\"metadata.defination.length == 0\" (onClick)=\"showNotificationModelWindow = true\" [enable-click]=\"true\"\n                         size=\"small-bold\" font-color=\"red\">add /</amexio-label>\n          <amexio-label (onClick)=\"removeServiceBlock()\" [enable-click]=\"true\"  size=\"small-bold\" font-color=\"red\">remove</amexio-label>\n        </div>\n      </ng-template>\n\n    </table>\n    <ng-container *ngIf=\"showNotificationModelWindow\">\n      <notification-model [(show)]=\"showNotificationModelWindow\" [notificationMetadata]=\"metadata\"></notification-model>\n    </ng-container>\n\n  ",
        styles: [
            ".curly-braces {\n      border-left: 2px dashed;\n      border-right: 2px dashed;\n      border-color: #000000;\n      border-radius: 15px;\n    }\n      .curly-braces-contains {\n        min-height:50px;\n        width: 95%; \n        padding: 10px;\n      }\n      .without-curly-braces {\n        width: 95%;\n        padding: 10px;\n      }\n    "
        ]
    })
], NotificationBlockBehaviour);
exports.NotificationBlockBehaviour = NotificationBlockBehaviour;
var NotificationModelMetaData = (function (_super) {
    __extends(NotificationModelMetaData, _super);
    function NotificationModelMetaData() {
        var _this = _super.call(this) || this;
        _this.type = 'notify';
        return _this;
    }
    return NotificationModelMetaData;
}(event_basemodel_1.EventNode));
exports.NotificationModelMetaData = NotificationModelMetaData;
