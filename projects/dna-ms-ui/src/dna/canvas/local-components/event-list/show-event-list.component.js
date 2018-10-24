"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
/**
 * Created by dattaram on 15/6/18.
 */
var core_1 = require("@angular/core");
var event_basemodel_1 = require("../../event-relationship/models/event.basemodel");
var ShowEventListComponent = (function () {
    function ShowEventListComponent(_eventHndl) {
        this._eventHndl = _eventHndl;
        this.eventList = [];
    }
    ShowEventListComponent.prototype.ngOnInit = function () {
        var eventData;
        if (this.componentInstance) {
            eventData = this._eventHndl.findEventListByName(this.componentInstance.name);
            if (eventData != null) {
                this.eventList = eventData;
            }
            else {
                this.eventList = [];
            }
        }
    };
    ShowEventListComponent.prototype.openEventRelationship = function (selectedEvent) {
        var _this = this;
        if (this._eventHndl.checkIsUIValid()) {
            var objStatus = void 0;
            if (this.componentInstance.eventRelationship.eventDefination &&
                this.componentInstance.eventRelationship.eventDefination.length > 0) {
                objStatus = this.objectSearching(this.componentInstance.eventRelationship.eventDefination, selectedEvent);
                if (objStatus.flag) {
                    this._eventHndl.showEventretionshipUI(this.componentInstance, objStatus.data);
                }
            }
            else {
                var eventRelation = new event_basemodel_1.EventModel();
                eventRelation.type = selectedEvent.type;
                eventRelation.eventName = selectedEvent.eventName;
                this.componentInstance.eventRelationship.eventDefination = [];
                this.componentInstance.eventRelationship.eventDefination.push(eventRelation);
                this.componentInstance.eventRelationship.eventDefination.forEach(function (opt, index) {
                    if (opt.type == selectedEvent.type) {
                        _this._eventHndl.showEventretionshipUI(_this.componentInstance, _this.componentInstance.eventRelationship.eventDefination[index]);
                    }
                });
            }
        }
    };
    ShowEventListComponent.prototype.objectSearching = function (searchData, selectedObj) {
        var object = {};
        object['flag'] = false;
        object['data'] = {};
        searchData.forEach(function (seObj) {
            if (seObj.type == selectedObj.type) {
                object.flag = true;
                object.data = seObj;
            }
        });
        return object;
    };
    return ShowEventListComponent;
}());
__decorate([
    core_1.Input()
], ShowEventListComponent.prototype, "componentInstance");
ShowEventListComponent = __decorate([
    core_1.Component({
        selector: 'show-event-list',
        template: "\n    <ng-container *ngIf=\"eventList.length > 0\">\n      <amexio-label size=\"medium-bold\">Events</amexio-label><hr/>\n      <ng-container *ngFor=\"let event of eventList\">\n        <amexio-button [block]=\"true\" [label]=\"event.eventName\" size=\"medium\" [type]=\"'yellow'\" (onClick)=\"openEventRelationship(event)\"></amexio-button>\n      </ng-container>\n    </ng-container>\n  \n  "
    })
], ShowEventListComponent);
exports.ShowEventListComponent = ShowEventListComponent;
