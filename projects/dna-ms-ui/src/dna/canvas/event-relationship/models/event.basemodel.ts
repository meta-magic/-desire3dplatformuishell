/**
 * Created by dattaram on 8/1/18.
 */

export class EventRelationBaseModel {
  eventDefination: any[];
  constructor() {
    this.eventDefination = [];
  }
}

export class EventModel {
  type: string;
  eventName: string;
  body: any[];
  constructor() {
    this.type = '';
    this.eventName = '';
    this.body = [];
  }
}

export class EventLhsRhsModel {
  type: string;
  key: string;
  defination: any;

  constructor() {
    this.type = '';
    this.key = '';
  }
}

export class EventNode {
  id: string;
  text: string;
  defination?: any[];
  body: any[] = [];
  leaf: boolean;
  metadata?: any;
  action: any;
  parentRef: any;
  type: string;
  notifyMsgType: string;
  constructor() {
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
}
