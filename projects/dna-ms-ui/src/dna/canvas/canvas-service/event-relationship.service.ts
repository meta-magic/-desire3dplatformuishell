/**
 * Created by dattaram on 30/5/18.
 */
import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { EventHandlerService } from './event.service';
import { RelationshipBlockMap } from '../canvas-component-map/retionship.map';
import { EventNode } from '../event-relationship/models/event.basemodel';

@Injectable()
export class EventRelationshipService {
  tagInputLocalData: any[] = [];
  relationshipRef: any;
  eventLogicBlockDragKey: string;
  constructor(
    public _eventHndl: EventHandlerService,
    private _componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.tagInputLocalData.push(new ObjectStructure('local'));
    this.tagInputLocalData.push(new ObjectStructure('remote'));
  }

  getOperatorData(): any {
    let object = new ObjectStructure('Operator');
    object.children = [
      {
        leaf: true,
        text: '+',
        type: 'operator'
      }
    ];
    return object;
  }

  getLocalData(): any {
    let compData = this._eventHndl.findListOfComponent();
    let localObject = new ObjectStructure('Local');
    compData.forEach((opt: any) => {
      let object: any = {};
      object['text'] = opt.properties.name;
      object['leaf'] = true;
      object['type'] = 'local';
      localObject.children.push(object);
    });
    return localObject;
  }

  getRemoteData(remoteData: any): any {
    let remoteObject = new ObjectStructure('Remote');
    remoteData.forEach((remote: any) => {
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
      } else if (!remote.collection) {
        this.createRemoteStructure(remote.children);
      }
    });
    remoteObject.children = remoteData;
    return remoteObject;
  }

  createRemoteStructure(remoteData: any) {
    remoteData.forEach((remote: any) => {
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
      } else if (!remote.collection) {
        this.createRemoteStructure(remote.children);
      } else {
        remote.children = null;
      }
    });
  }

  createComponentInstance(key: string, comRef: any): any {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(
      RelationshipBlockMap.Block_MAP[key]
    );
    const componentInstance = comRef.target.createComponent(componentFactory);
    return componentInstance;
  }

  createObject(type: string): any {
    const nodeObject = new EventNode();
    nodeObject.id = Math.floor(Math.random() * 90000) + 10000 + type;
    nodeObject.type = type;
    return nodeObject;
  }

  removeLogicBlock(id: any) {
    this.relationshipRef.body.forEach((comRef: any, index: any) => {
      if (comRef.instance.id == id) {
        comRef.destroy();
        this.relationshipRef.body.splice(index, 1);
      } else if (comRef.instance.body.length > 0) {
        this.removeLoginBlockFromChild(comRef.instance, id);
      }
    });
  }

  removeLoginBlockFromChild(comData: any, id: any) {
    comData.body.forEach((comChildref: any, index: any) => {
      if (comChildref.instance.id == id) {
        comChildref.destroy();
        comData.body.splice(index, 1);
      } else if (comChildref.instance.body.length > 0) {
        this.removeLoginBlockFromChild(comChildref.instance, id);
      }
    });
  }
}

export class ObjectStructure {
  text: string;
  expand: boolean;
  children: any[];

  constructor(text: any) {
    this.text = text;
    this.expand = true;
    this.children = [];
  }
}
