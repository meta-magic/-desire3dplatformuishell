"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
/**
 * Created by dattaram on 30/5/18.
 */
var core_1 = require("@angular/core");
var retionship_map_1 = require("../canvas-component-map/retionship.map");
var event_basemodel_1 = require("../event-relationship/models/event.basemodel");
var EventRelationshipService = (function () {
    function EventRelationshipService(_eventHndl, _componentFactoryResolver) {
        this._eventHndl = _eventHndl;
        this._componentFactoryResolver = _componentFactoryResolver;
        this.tagInputLocalData = [];
        this.tagInputLocalData.push(new ObjectStructure('local'));
        this.tagInputLocalData.push(new ObjectStructure('remote'));
    }
    EventRelationshipService.prototype.getOperatorData = function () {
        var object = new ObjectStructure('Operator');
        object.children = [
            {
                leaf: true,
                text: '+',
                type: 'operator'
            }
        ];
        return object;
    };
    EventRelationshipService.prototype.getLocalData = function () {
        var compData = this._eventHndl.findListOfComponent();
        var localObject = new ObjectStructure('Local');
        compData.forEach(function (opt) {
            var object = {};
            object['text'] = opt.properties.name;
            object['leaf'] = true;
            object['type'] = 'local';
            localObject.children.push(object);
        });
        return localObject;
    };
    EventRelationshipService.prototype.getRemoteData = function (remoteData) {
        var _this = this;
        var remoteObject = new ObjectStructure('Remote');
        remoteData.forEach(function (remote) {
            if (remote.collection) {
                remote.text = remote.text + ' [ ]';
                remote['leaf'] = true;
                remote['type'] = 'remote';
                remote['isCollection'] = remote.collection;
            }
            if (remote.children == null) {
                remote['leaf'] = true;
                remote['type'] = 'remote';
                remote['isCollection'] = remote.collection;
            }
            else if (!remote.collection) {
                _this.createRemoteStructure(remote.children);
            }
        });
        remoteObject.children = remoteData;
        return remoteObject;
    };
    EventRelationshipService.prototype.createRemoteStructure = function (remoteData) {
        var _this = this;
        remoteData.forEach(function (remote) {
            if (remote.collection) {
                remote.text = remote.text + ' [ ]';
                remote['leaf'] = true;
                remote['type'] = 'remote';
                remote['isCollection'] = remote.collection;
            }
            if (remote.children == null) {
                remote['leaf'] = true;
                remote['type'] = 'remote';
                remote['isCollection'] = remote.collection;
            }
            else if (!remote.collection) {
                _this.createRemoteStructure(remote.children);
            }
            else {
                remote.children = null;
            }
        });
    };
    EventRelationshipService.prototype.createComponentInstance = function (key, comRef) {
        var componentFactory = this._componentFactoryResolver.resolveComponentFactory(retionship_map_1.RelationshipBlockMap.Block_MAP[key]);
        var componentInstance = comRef.target.createComponent(componentFactory);
        return componentInstance;
    };
    EventRelationshipService.prototype.createObject = function (type) {
        var nodeObject = new event_basemodel_1.EventNode();
        nodeObject.id = Math.floor(Math.random() * 90000) + 10000 + type;
        nodeObject.type = type;
        return nodeObject;
    };
    EventRelationshipService.prototype.removeLogicBlock = function (id) {
        var _this = this;
        this.relationshipRef.body.forEach(function (comRef, index) {
            if (comRef.instance.id == id) {
                comRef.destroy();
                _this.relationshipRef.body.splice(index, 1);
            }
            else if (comRef.instance.body.length > 0) {
                _this.removeLoginBlockFromChild(comRef.instance, id);
            }
        });
    };
    EventRelationshipService.prototype.removeLoginBlockFromChild = function (comData, id) {
        var _this = this;
        comData.body.forEach(function (comChildref, index) {
            if (comChildref.instance.id == id) {
                comChildref.destroy();
                comData.body.splice(index, 1);
            }
            else if (comChildref.instance.body.length > 0) {
                _this.removeLoginBlockFromChild(comChildref.instance, id);
            }
        });
    };
    return EventRelationshipService;
}());
EventRelationshipService = __decorate([
    core_1.Injectable()
], EventRelationshipService);
exports.EventRelationshipService = EventRelationshipService;
var ObjectStructure = (function () {
    function ObjectStructure(text) {
        this.text = text;
        this.expand = true;
        this.children = [];
    }
    return ObjectStructure;
}());
exports.ObjectStructure = ObjectStructure;
