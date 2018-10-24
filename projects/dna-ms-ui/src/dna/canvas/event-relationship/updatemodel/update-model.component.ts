/**
 * Created by dattaram on 27/6/18.
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventHandlerService } from '../../canvas-service/event.service';
import { SharedDataService } from '../../canvas-service/shared-data.service';
import { RelationshipBlockMap } from '../../canvas-component-map/retionship.map';

@Component({
  selector: 'update-model-behaviour',
  template: `
    <amexio-window [show]="show" (showChange)="closeWindow()" [footer]="true" [vertical-position]="'center'" [horizontal-position]="'right'"
                   [body-height]="75"  type="window" [closable]="true">
      <amexio-header>
        Update UI Model Definition
      </amexio-header>
      <amexio-body>
        <amexio-row>
          <amexio-column [size] =4>
            <amexio-card [header]="false"
                         [footer]="false"
                         body-height="55">
              <amexio-body>
                <amexio-tree-data-table  [data-reader]="" [data]="serviceModelData">
                  <amexio-data-table-column [data-index]="'fieldLabel'"
                                            [data-type]="'string'" [hidden]="false"
                                            [text]="'Remote Model Fields'">
                    <ng-template #amexioBodyTmpl let-row="row">
                      <div draggable="true" (dragstart)="dragStart($event,row,'remote')">{{row.fieldLabel}}</div>
                    </ng-template>
                  </amexio-data-table-column>
                </amexio-tree-data-table>
              </amexio-body>
            </amexio-card>
          </amexio-column>
          <amexio-column [size] =8>
                <amexio-accordion [expand-all]="true">
                  <amexio-card [header]="false"
                               [footer]="false"
                               body-height="55">
                    <amexio-body>
                      <ng-container *ngFor="let model of modelDataStructure">
                              <amexio-accordion-tab [header]="model.modelName" active="true">
                                  <amexio-tree-data-table [data-reader]="" [data]="model.data">
                                      <amexio-data-table-column [data-index]="'fieldLabel'"
                                                                [data-type]="'string'" [hidden]="false"
                                                                [text]="'Field Name'">
                                          <ng-template #amexioBodyTmpl let-row="row">
                                              <ng-container *ngIf="(row.modelName === 'Unmapped Model')">
                                                  <div draggable="true" (dragstart)="dragStart($event,row,'local')">{{row.fieldLabel}}</div>
                                              </ng-container>
                                              <ng-container *ngIf="(row.modelName != 'Unmapped Model')">
                                                  <div draggable="true" (dragstart)="dragStart($event,row,'local')">{{row.fieldLabel}}({{row.modelFieldKey}})</div>
                                              </ng-container>
                                          </ng-template>
                                      </amexio-data-table-column>
                                      <amexio-data-table-column [data-index]="'values'"
                                                                [data-type]="'string'" [hidden]="false"
                                                                [text]="'Mapping Field'">
                                          <ng-template #amexioBodyTmpl let-row="row">
                                              <div #ref style="min-height:40px;border: 2px dashed lightgrey; width: 100%;" (dragover)="dragOver($event,ref)" (dragleave)="onDragLeave(ref)" (drop)="drop($event,row,ref)">
                                                  <ul>
                                                      <ng-container *ngIf="row.values.length > 0">
                                                          <ng-container *ngFor="let obj of row.values" >
                                                              <ng-container *ngIf="obj.type != 'operator'">
                                                                  <li>{{obj.fieldLabel}}</li>
                                                              </ng-container>
                                                          </ng-container>
                                                      </ng-container>
                                                  </ul>
                                              </div>
                                          </ng-template>
                                      </amexio-data-table-column>
                                  </amexio-tree-data-table>
                              </amexio-accordion-tab>
                      </ng-container>
                    </amexio-body>
                  </amexio-card>
                 
                </amexio-accordion>
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
          [tooltip]="'Save'" (onClick)="onSave()">
        </amexio-button>
      </amexio-action>
    </amexio-window>

  `
})
export class UpdateModelComponent implements OnInit {
  @Input() show: boolean;
  @Input() updateModelMetadata: any;
  @Output() showChange: EventEmitter<any> = new EventEmitter();
  modelDefinationData: any[] = [];
  serviceModelData: any[] = [];
  modelDataStructure: any[] = [];

  unMappedModelObject: ShowModelViewStructure;
  mappedComponentArray: any[] = [];

  constructor(
    public _eventHndl: EventHandlerService,
    public _sharedDataService: SharedDataService
  ) {
    this.unMappedModelObject = new ShowModelViewStructure('Unmapped Model');
  }

  ngOnInit() {
    this.modelDataStructure = [];
    if (this.updateModelMetadata.defination.length > 0) {
      this.modelDefinationData = this.updateModelMetadata.defination;
      if (
        this.updateModelMetadata.metadata.hasOwnProperty(
          'updateModelDefinition'
        )
      ) {
        this.modelDataStructure = this.updateModelMetadata.metadata.updateModelDefinition;
      } else {
        let cloneData = this.updateModelMetadata.metadata;
        this.updateModelMetadata.metadata = {};
        this.updateModelMetadata.metadata['updateModelDefinition'] = cloneData;
        this.modelDataStructure = this.updateModelMetadata.metadata.updateModelDefinition;
      }
    } else {
      this.getComponentList();
    }

    if (this.updateModelMetadata.parentRef.hasOwnProperty('responseModel')) {
      this.serviceModelData = [];
      this.serviceModelData = this.updateModelMetadata.parentRef.responseModel;
    }
  }

  /* GET COMPONENT LIST*/

  getComponentList() {
    this.createViewDatastructure(this._eventHndl.findListOfComponent());
  }

  /* CREATE VIEW DATASTRUCTURE */

  createViewDatastructure(componentData: any) {
    if (componentData) {
      componentData.forEach((com: any) => {
        if (com.componentBehaviour.isBindingComponent) {
          if (com.componentBehaviour.hasModelBinding) {
              this.createMappedComponentList(com);
          } else if (com.componentBehaviour.isBindingComponent && !com.componentBehaviour.hasModelBinding) {
              this.createUnMappedComponentList(com);
          }
        }
      });
      this.modelDataStructure = this.mappedComponentArray;
      if (this.unMappedModelObject.data.length > 0) {
        this.modelDataStructure.push(this.unMappedModelObject);
      }
    }
  }

  /*CREATE UNMAPPED COMPONENT LIST*/

  createUnMappedComponentList(comRef: any) {
    let object = new DataModelStructure();
    object.fieldName = comRef.properties.name;
    object.key = comRef.properties.name;
    if (!comRef.properties.fieldLabel || comRef.properties.fieldLabel == '') {
      object.fieldLabel = comRef.properties.name;
    } else {
      object.fieldLabel = comRef.properties.fieldLabel;
    }
    object.modelName = 'Unmapped Model';
    object.values = [];
    this.unMappedModelObject.data.push(object);
    this.unMappedModelObject.isEmpty = false;
  }

  /* CREATE MAPPED COMPONENT LIST */

  createMappedComponentList(comRef: any) {
    if (this.mappedComponentArray.length > 0) {
      this.mappedComponentArray.forEach((modelObj: any) => {
        if (comRef.properties.model.modelName == modelObj.modelName) {
          let object = this.createObject(comRef);
          modelObj.data.push(object);
        } else {
          this.createNewMappedModelObject(comRef);
        }
      });
    } else {
      this.createNewMappedModelObject(comRef);
    }
  }

  createNewMappedModelObject(comRef: any) {
    let modelObject = new ShowModelViewStructure(
      comRef.properties.model.modelName
    );
    let object = this.createObject(comRef);
    modelObject.data.push(object);
    modelObject.isEmpty = false;
    this.mappedComponentArray.push(modelObject);
  }

  /* CREATE DataModelStructure OBJECT */

  createObject(com: any): any {
    let object = new DataModelStructure();
    object.fieldName = com.properties.name;
    object.key = com.properties.name;
    object.fieldLabel = com.properties.fieldLabel;
    object.modelFieldKey = com.properties.model.modelFieldKey;
    object.modelName = com.properties.model.modelName;
    object.values = [];
    return object;
  }

  /* DRAG BINDING ATTRIBUTE */

  dragStart(event: any, row: any, type: any) {
    event.dataTransfer.setData('dragData', JSON.stringify(row));
    event.dataTransfer.setData('type', type);
  }

  /* ON DRAG OVER CHANGE STYLE OF DROP AREA */

  dragOver(event: any, ref: any) {
    ref.style.border = '2px dashed green';
    event.stopPropagation();
    event.preventDefault();
  }

  /* ON DRAG LEAVE CHANGE STYLE OF DROP AREA */

  onDragLeave(ref: any) {
    ref.style.border = '2px dashed lightgrey';
  }

  /* DROP BINDING ATTRIBUTE*/

  drop(event: any, row: any, ref: any) {
    const dragObject = JSON.parse(event.dataTransfer.getData('dragData'));
    let object: any = {};
    object['key'] = dragObject.fieldName;
    object['fieldName'] = dragObject.fieldName;
    object['fieldLabel'] = dragObject.fieldLabel;
    object['type'] = event.dataTransfer.getData('type');

    if (dragObject.hasOwnProperty('collection')) {
      if (row.hasOwnProperty('collection')) {
        row.collection = dragObject.collection;
      } else row.collection = dragObject.collection;
      object.collection = dragObject.collection;
    } else object['collection'] = false;

    if (dragObject.hasOwnProperty('fieldType')) {
      object['fieldType'] = dragObject.fieldType;
    } else object['fieldType'] = null;
    if (dragObject.hasOwnProperty('inputParamTypeId')) {
      object['inputParamTypeId'] = dragObject.inputParamTypeId;
    } else object['inputParamTypeId'] = null;
    if (row.values.length >= 1) {
      let operatorObject: any = {};
      operatorObject['key'] = '+';
      operatorObject['type'] = 'operator';
      row.values.push(operatorObject, object);
    } else row.values.push(object);
    ref.style.border = '2px dashed lightgrey';
  }

  /* CLOSE UPDATE MODEL WINDOW*/

  closeWindow() {
    this.show = false;
    this.showChange.emit(this.show);
  }

  /* SAVE UPDATE MODEL DEFINITION */

  onSave() {
    this.modelDefinationData = [];
    this.modelDataStructure.forEach((opt: any) => {
      opt.data.forEach((dataOpt: any) => {
        this.modelDefinationData.push(dataOpt);
      });
    });
    this.updateModelMetadata.defination = this.modelDefinationData;
    if (
      this.updateModelMetadata.metadata.hasOwnProperty('updateModelDefinition')
    ) {
      this.updateModelMetadata.metadata.updateModelDefinition = this.modelDataStructure;
    } else {
      this.updateModelMetadata.metadata[
        'updateModelDefinition'
      ] = this.modelDataStructure;
    }

    this.closeWindow();
  }
}

export class DataModelStructure {
  fieldName: string;
  key: string;
  fieldLabel: string;
  modelFieldKey: string;
  modelName: string;
  values: any[];
  constructor() {
    this.fieldLabel = '';
    this.fieldName = '';
    this.modelName = '';
    this.modelFieldKey = '';
    this.key = '';
    this.values = [];
  }
}

export class ShowModelViewStructure {
  modelName: string;
  isEmpty: boolean;
  data: any[];

  constructor(modelName: any) {
    this.modelName = modelName;
    this.isEmpty = true;
    this.data = [];
  }
}
