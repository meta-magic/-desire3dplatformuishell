/**
 * Created by dattaram on 25/9/18.
 */

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SharedDataService} from '../../canvas-service/shared-data.service';
import {EventHandlerService} from '../../canvas-service/event.service';
import {ConditionTreeModel} from '../../canvas-models/eventRelationship.model';
import {ComponentDataTypeMap} from "../../canvas-component-map/datatype.map";

@Component({
  selector: 'condition-binding-component-behaviour',
  template: `
      <amexio-window [show]="show" (showChange)="closeWindow()" [footer]="true" [vertical-position]="'center'" [horizontal-position]="'right'"
                     [body-height]="75"  type="window" [closable]="true">
          <amexio-header>
              Condition Binding
          </amexio-header>
          <amexio-body>
              <amexio-row>
                  <amexio-column size="4">
                      <div class="condition-accordian-style">
                          <amexio-card [header]="false"
                                       [footer]="false"
                                       body-height="57">
                              <amexio-body>
                                  <amexio-accordion [expand-all]="true">
                                      <amexio-accordion-tab header="UI Component" active="true" class="canvas-condition-pane">
                                          <amexio-side-nav
                                                  [data]="uiComponentList"
                                                  [width]="'100%'"
                                                  [position]="'relative'"
                                                  [enable-drag]="true"
                                                  [display-key]="'fieldLabel'"
                                                  (onDrag)="dragStart($event,{type:'local'})">
                                          </amexio-side-nav>
                                      </amexio-accordion-tab>
                                      <amexio-accordion-tab header="Service Response" active="false" class="canvas-condition-pane">
                                          <amexio-side-nav
                                                  [data]="serviceResponseData"
                                                  [width]="'100%'"
                                                  [position]="'relative'"
                                                  [enable-drag]="true"
                                                  [display-key]="'fieldLabel'"
                                                  (onDrag)="dragStart($event,{type:'remote'})">
                                          </amexio-side-nav>
                                      </amexio-accordion-tab>
                                  </amexio-accordion>
                              </amexio-body>
                          </amexio-card>
                      </div>
                  </amexio-column>
                  <amexio-column size="8">
                      <div class="condition-tree-style">
                          <amexio-card [header]="true"
                                       [footer]="false"
                                       body-height="55">
                              <amexio-header>
                                  <div style=" display: flex; justify-content: space-between;">
                                      <div>Condition</div>
                                      <div>  <i style="cursor: pointer" class="fa fa-plus" (click)="addCondition()"></i>
                                      </div>
                                  </div>
                              </amexio-header>
                              <amexio-body>
                                  <condition-tree [data]="conditionList" (onRemoveClick)="getRemoveEvent($event)"></condition-tree>
                              </amexio-body>
                          </amexio-card>
                      </div>
                    

                  </amexio-column>
              </amexio-row>
          </amexio-body>
          <amexio-action>
              <amexio-button
                      [label]="'Cancel'"
                      [type]="'default'"
                      [tooltip]="'Cancel'" (onClick)="closeWindow()">
              </amexio-button>
              <amexio-button
                      [label]="'Save'"
                      [type]="'theme-color'"
                      [tooltip]="'Save'"  (onClick)="onSave()">
              </amexio-button>
          </amexio-action>
      </amexio-window>
  `
})

export class ConditionBindingComponent implements OnInit {
  @Input() show: boolean;
  @Input() conditionMetadata: any;
  @Output() showChange: EventEmitter<any> = new EventEmitter();
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  uiComponentList: any[] = [];
  conditionList: any[] = [];
  serviceResponseData: any[] = [];
  constructor(
      public _sharedDataService: SharedDataService,
      public _eventHndl: EventHandlerService
  ) {}


  ngOnInit() {
    if (this.conditionMetadata.defination.length > 0) {
      if (this.conditionMetadata.metadata.hasOwnProperty('defination')) {
        this.conditionList = this.conditionMetadata.metadata.defination;
      }
    }
    this.getComponentList();
    if (this.conditionMetadata.parentRef.hasOwnProperty('responseModel')) {
      this.serviceResponseData = [];
      this.serviceResponseData = this.conditionMetadata.parentRef.responseModel;
    }
  }

  getComponentList() {
    this._eventHndl.findListOfComponent().forEach((com: any) => {
      if (com.componentBehaviour.isBindingComponent) {
        if (com.componentBehaviour.hasModelBinding) {
          let object: any = {};
          object['fieldName'] = com.properties.name;
          object['fieldLabel'] = com.properties.fieldLabel;
          object['modelName'] = com.properties.model.modelName;
          object['modelFieldKey'] = com.properties.model.modelFieldKey;
          object['key'] = com.properties.model.modelFieldKey;
          object['fieldType'] =
              ComponentDataTypeMap.COMPONENT_DATATYPE[com.name];
          object['collection'] = false;
          this.uiComponentList.push(object);
        }
      }
    });
  }

  closeWindow() {
    this.show = false;
    this.showChange.emit(this.show);
  }

  addCondition() {
    let cObject: any = new ConditionTreeModel();
    if (this.conditionList.length > 0) {
      this.conditionList.push(cObject);
    } else {
      cObject.operator = null;
      this.conditionList.push(cObject);
    }
  }

  dragStart(event: any, dragData: any) {
    if (dragData.type == 'remote') {
      let object: any = {};
      object['key'] = event.data.fieldName;
      object['fieldName'] = event.data.fieldName;
      object['fieldLabel'] = event.data.fieldLabel;
      if (event.data.fieldType) {
        object['fieldType'] = event.data.fieldType;
      }
      object['type'] = dragData.type;
      event.event.dataTransfer.setData('conditionNode', JSON.stringify(object));
    } else {
      event.data['type'] = dragData.type;
      event.event.dataTransfer.setData('conditionNode', JSON.stringify(event.data));
    }

  }

  /* REMOVE CONDITION*/

  getRemoveEvent(node: any) {
    this.conditionList.forEach((can: any, index: number) => {
      if (can.id == node.id) {
        this.conditionList.splice(index, 1);
        return;
      }
      if (can.children.length > 0) {
        this.findNodeInChild(can.children, node);
      }
    });
  }

  findNodeInChild(child, node){
    child.forEach((can: any, index: number) => {
      if (can.id == node.id) {
        child.splice(index, 1);
        return;
      }
      if (can.children.length > 0) {
        this.findNodeInChild(can.children, node);
      }
    });
  }


  /* SAVE CONDITION */

  onSave() {
    if (this.conditionMetadata.metadata.hasOwnProperty('defination')) {
      this.conditionMetadata.metadata.defination = this.conditionList;
    } else {
      this.conditionMetadata.metadata['defination'] = this.conditionList;
    }
    let dummyData = JSON.parse(JSON.stringify(this.conditionList));
    this.parseJson(dummyData);
    this.conditionMetadata.defination = dummyData;
      let conditionString: string = '' ;
      conditionString = '(' + this.createConditionStatement(this.conditionMetadata.defination, conditionString) + ')';
      this.conditionMetadata.metadata['conditionStatement'] = conditionString;
      this.onClick.emit(conditionString);
     this.closeWindow() ;
  }


  /* PARSE JSON IN SAVE FORMAT */

  parseJson(dataSource: any) {
    dataSource.forEach((opt: any) => {
      if (opt.children.length > 0) {
        let obj = {
          lhs: opt.lhs,
          rhs: opt.rhs,
          children: [],
          condition: opt.condition,
          operator: opt.operator
        };
        delete opt.lhs;
        delete opt.rhs;
        delete opt.condition;
        delete opt.operator;
        delete opt.id;
        opt.children.unshift(obj);
        this.parseJson(opt.children);
      } else {
        delete opt.id;
      }
    });
  }


  /* CREATE CONDITION STATEMENT */
    createConditionStatement(conditionData: any, conString: string): string {
        conditionData.forEach((cOpt: any) => {
            if(cOpt.hasOwnProperty('children') && cOpt.children.length == 0) {
                conString = conString + this.createOperator(cOpt.operator) + this.createLhs(cOpt.lhs) +this.createCondition(cOpt.condition) + this.createRhs(cOpt.rhs);
            } else {
                conString ='('+ this.createConditionStatement(cOpt.children,conString)+' )';
            }

        });
        return conString;

    }
    createLhs(lhsData: any): string {
        let lhsString:string = '';
        lhsData.forEach((lhsOpt: any)=>{
            lhsString = lhsString + ' '+ lhsOpt.key;
        });
        return lhsString;
    }
    createRhs(rhsData: any): string {
        let rhsString:string = '';
        rhsData.forEach((rhsOpt: any)=>{
            rhsString = rhsString +''+rhsOpt.key;
        });
        return rhsString;
    }
    createOperator(operator): string {
        let operatorString:string ='';
        if(operator != null) {
            operatorString = ' ' + operator.key;
        }
        return operatorString;
    }
    createCondition(con: any) {
        return con.key;
    }
}



