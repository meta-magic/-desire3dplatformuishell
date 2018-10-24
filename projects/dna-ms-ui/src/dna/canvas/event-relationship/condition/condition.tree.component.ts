/**
 * Created by dattaram on 27/9/18.
 */
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConditionTreeModel} from '../../canvas-models/eventRelationship.model';

@Component({
  selector: 'condition-tree',
  template: `
      <ng-container *ngFor="let node of data">
          <table style="color: #000000; ">
              <tr *ngIf="node.operator != null">
                  <td>
                      <select  [(ngModel)]='node.operator.key'>
                          <option *ngFor="let op of conditionList" [value]="op.value">{{op.key}}</option>
                      </select>
                  </td>
              </tr>
              <tr>
                  <td  width="80%" class="curly-braces">
                      <div class="curly-braces-contains">
                          <div style="display: inline-block">
                              <input #ref class="input-border" type="text" [value]="createString(node.lhs)" (input)="getUserInput({event:$event,nodeData:node,type:'lhs'})"  (dragleave)="onDragLeave(ref)"  (dragover)="onDragOver($event,ref)" (drop)="onDrop({event:$event,data:node,type:'lhs',ref: ref})"/>

                              <select [(ngModel)]='node.condition.key'>
                                  <option *ngFor="let op of operatorList" [value]="op.value">{{op.key}}</option>
                              </select>
                              <input #refrhs class="input-border" type="text" [value]="createString(node.rhs)" (input)="getUserInput({event:$event,nodeData:node,type:'rhs'})" (dragleave)="onDragLeave(refrhs)"  (dragover)="onDragOver($event,refrhs)" (drop)="onDrop({event:$event,data:node,type:'rhs',ref: refrhs})"/>
                              <i class="fa fa-plus" style="padding-left: 20px;cursor: pointer" (click)="addChildCondition(node)"></i>
                              <i class="fa fa-trash" style="cursor: pointer" (click)="removeCondition(node)"></i>
                          </div>
                          <div style="padding-left: 5px">
                              <condition-tree [data]="node.children" (onRemoveClick)="removeCondition($event)"></condition-tree>
                          </div>

                      </div>
                  </td>
              </tr>

          </table>
      </ng-container>

  `,
  styles: [
      `.curly-braces {
          border-left: 2px dashed;
          border-right: 2px dashed;
          border-color: #000000;
          border-radius: 15px;
      }
      .curly-braces-contains {
          min-height:25px;
          width: 98%;
          padding: 5px;
      }
      .input-border {
          border: 1px dashed lightgrey;
      }
    `
  ]
})

export class ConditionTreeComponent implements OnInit {
  @Input() data: any;
  operatorList: any[] = [];
  conditionList: any[] = [];
  @Output() onRemoveClick: EventEmitter<any> = new EventEmitter<any>();
  constructor() {
    this.operatorList = [
      {
        'key': '!=',
        'value': '!='
      },
      {
        'key': '<',
        'value': '<'
      },
      {
        'key': '>',
        'value': '>'
      },
      {
        'key': '<=',
        'value': '<='
      },
      {
        'key': '>=',
        'value': '>='
      },
      {
        'key': '==',
        'value': '=='
      },
    ];
    this.conditionList = [
      {
        'key': '||',
        'value': '||'
      },
      {
        'key': '&&',
        'value': '&&'
      }
    ];

  }
  ngOnInit() {
  }
  addChildCondition(node: any) {
    let cObject: any = new ConditionTreeModel();
    node.children.push(cObject);
  }
  removeCondition(node: any) {
    this.onRemoveClick.emit(node);
  }
  onDragOver(event: any, ref: any) {
    ref.style.border = '2px dashed green';
    event.preventDefault();
    event.stopPropagation();
  }
  onDragLeave(ref: any) {
    ref.style.border = '1px dashed lightgrey';
  }
  onDrop(eventData: any) {
    let dragData = JSON.parse(eventData.event.dataTransfer.getData('conditionNode'));
    eventData.event.preventDefault();
    eventData.event.stopPropagation();
    eventData.event.stopImmediatePropagation();
    eventData.data[eventData.type] = [];
    eventData.data[eventData.type].push(dragData);
    eventData.ref.style.border = '1px dashed lightgrey';
  }

  createString(lhsData: any): string {
    let lhs: string = '';
    lhsData.forEach((opt: any) => {
      lhs = opt.key;
    });
    return lhs;
  }

  getUserInput(ev: any) {
    let hardcodeObject: any = {
      type: 'hardcode',
      key: ev.event.target.value
    };
    ev.nodeData[ev.type].length = 0;
    ev.nodeData[ev.type].push(hardcodeObject);

  }
}
