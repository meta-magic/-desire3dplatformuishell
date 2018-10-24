/**
 * Created by dattaram on 8/1/18.
 */
"use strict";
exports.__esModule = true;
var EventRelationBaseModel = (function () {
    function EventRelationBaseModel() {
        this.eventDefination = [];
    }
    return EventRelationBaseModel;
}());
exports.EventRelationBaseModel = EventRelationBaseModel;
var EventModel = (function () {
    function EventModel() {
        this.type = '';
        this.eventName = '';
        this.body = [];
    }
    return EventModel;
}());
exports.EventModel = EventModel;
var EventLhsRhsModel = (function () {
    function EventLhsRhsModel() {
        this.type = '';
        this.key = '';
    }
    return EventLhsRhsModel;
}());
exports.EventLhsRhsModel = EventLhsRhsModel;
var EventNode = (function () {
    function EventNode() {
        this.body = [];
        this.body = [];
        this.defination = [];
        this.id = '';
        this.text = '';
        this.leaf = true;
        this.action = '';
        this.metadata = {};
        this.parentRef = {};
        this.notifyMsgType = 'success';
    }
    return EventNode;
}());
exports.EventNode = EventNode;
