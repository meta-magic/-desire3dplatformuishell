import {EventRelationshipService} from "../canvas-service/event-relationship.service";
/**
 * Created by dattaram on 27/9/18.
 */

export class ConditionTreeModel {
  id: any;
  lhs: any[];
  condition:any;
  rhs: any[];
  children:any[];
  operator: any;

  constructor() {
    this.id = +Math.floor(Math.random() * 90000) + 10000 + '_con' ;
    this.lhs = [];
    this.condition = {
      type: "condition",
      key: "=="
    };
    this.rhs = [];
    this.children = [];
    this.operator = {
      type: "operator",
      key: "&&"
    };
  }
}
