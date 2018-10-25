import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { prefixUrl } from '../../canvas-models/canvas.constant';
import { RestCallService } from '../../canvas-service/restcall.service';
import { SharedDataService } from '../../canvas-service/shared-data.service';
import { EventHandlerService } from '../../canvas-service/event.service';
import {
  MethodTypeMap,
  RelationshipBlockMap
} from '../../canvas-component-map/retionship.map';

@Component({
  selector: 'service-binding-component-behaviour',
  template: `
    <amexio-window [show]="show" (showChange)="closeWindow()" [footer]="true" [vertical-position]="'center'" [horizontal-position]="'right'"
                   [body-height]="75"  type="window" [closable]="true">
      <amexio-header>
        Service Definition
      </amexio-header>
      <amexio-body>
        <amexio-row>
          <amexio-column [size] =3 >
            <amexio-new-dropdown
              [readonly]="true"
              [place-holder]="'Select Service'"
              [data-reader]="'response'"
              [field-label]="'Select Service'"
              [display-field]="'name'"
              [value-field]="'id'"
              [(ngModel)]="dataSourceModel.serviceId"
              [data]="serviceLocalData"
              (onSingleSelect)="selectService($event)">
            </amexio-new-dropdown>
          </amexio-column>
          <amexio-column [size] =3 >
            <amexio-new-dropdown
              [readonly]="true"
              [place-holder]="'Select Operation'"
              [data-reader]="'response'"
              [field-label]="'Select Operation'"
              [display-field]="'operationName'"
              [value-field]="'operationId'"
              [(ngModel)]="dataSourceModel.operationId"
              [data]="operationLocalData"
              (onSingleSelect)="selectOperation($event)">
            </amexio-new-dropdown>
          </amexio-column>
          <amexio-column [size] =5 >
            <amexio-text-input
              [field-label]="'URL'" name="serviceURL"  [place-holder]="''" [disabled]="true"
              [(ngModel)]="dataSourceModel.httpUrl" name="serviceUrl">
            </amexio-text-input>
          </amexio-column>
          <amexio-column [size] =1 >
            <amexio-text-input
              [field-label]="'Method'" name="serviceMethod" [place-holder]="''" [disabled]="true"
              [(ngModel)]="methodType" name="serviceMethod">
            </amexio-text-input>
          </amexio-column>
        </amexio-row>
        <amexio-row>
          <amexio-column [size] =7 >
            <amexio-tab-view header="Request Model" [header-align]="'right'">
              <amexio-tab  title="Request Body"  [active]="requestBodyTabActive()"  [amexio-color]="'red'" [disabled]="requestModelData.length == 0">
                <amexio-tree-data-table [height]="height" [data-reader]="" [data]="requestModelData">
                  <amexio-data-table-column [data-index]="'fieldLabel'"
                                            [data-type]="'string'" [hidden]="false"
                                            [text]="'Field Name'">
                  </amexio-data-table-column>
                  <amexio-data-table-column [data-index]="'fieldType'"
                                            [data-type]="'string'" [hidden]="false"
                                            [text]="'Field Type'">
                  </amexio-data-table-column>
                  <amexio-data-table-column [data-index]="'values'"
                                            [data-type]="'string'" [hidden]="false"
                                            [text]="'Value'">
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
              </amexio-tab>
              <amexio-tab title="Path" [active]="pathTabActive()"  [amexio-color]="'blue'" [disabled]="pathModelData.length == 0">
                <amexio-tree-data-table [height]="height"  [data-reader]="" [data]="pathModelData">
                  <amexio-data-table-column [data-index]="'fieldLabel'"
                                            [data-type]="'string'" [hidden]="false"
                                            [text]="'Field Name'">
                  </amexio-data-table-column>
                  <amexio-data-table-column [data-index]="'fieldType'"
                                            [data-type]="'string'" [hidden]="false"
                                            [text]="'Field Type'">
                  </amexio-data-table-column>
                  <amexio-data-table-column [data-index]="'values'"
                                            [data-type]="'string'" [hidden]="false"
                                            [text]="'Value'">
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
              </amexio-tab>
              <amexio-tab title="URL Parameter" [active]="paramTabActive()"  [amexio-color]="'green'" [disabled]="paramModelData.length == 0">
                <amexio-tree-data-table [height]="height" [data-reader]="" [data]="paramModelData">
                  <amexio-data-table-column [data-index]="'fieldLabel'"
                                            [data-type]="'string'" [hidden]="false"
                                            [text]="'Field Name'">
                  </amexio-data-table-column>
                  <amexio-data-table-column [data-index]="'fieldType'"
                                            [data-type]="'string'" [hidden]="false"
                                            [text]="'Field Type'">
                  </amexio-data-table-column>
                  <amexio-data-table-column [data-index]="'values'"
                                            [data-type]="'string'" [hidden]="false"
                                            [text]="'Value'">
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
              </amexio-tab>
            </amexio-tab-view>

          </amexio-column>
          <amexio-column [size] =1 >
          </amexio-column>
          <amexio-column [size] =4>
            <amexio-tree-data-table [height]="44"  [data-reader]="" [data]="modelDefinationData">
              <amexio-data-table-column [data-index]="'fieldLabel'"
                                        [data-type]="'string'" [hidden]="false"
                                        [text]="_sharedDataService.uiDetails.name+ ' Model Fields'">
                <ng-template #amexioBodyTmpl let-row="row">
                  <div draggable="true" (dragstart)="dragStart($event,row,'local')">{{row.fieldLabel}}</div>
                </ng-template>
              </amexio-data-table-column>
            </amexio-tree-data-table>

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
export class ServiceBidingComponent implements OnInit {
  @Input() show: boolean;
  @Input() serviceMetadata: any;
  @Output() showChange: EventEmitter<any> = new EventEmitter();
  @Output() onClick: EventEmitter<any> = new EventEmitter();

  serviceLocalData: any;

  operationLocalData: any;

  dataSourceModel: ServiceRelationshipModel;

  operationResponse: any;

  operationDataResetDialogue: boolean = false;

  requestModelData: any[] = [];

  paramModelData: any[] = [];

  pathModelData: any[] = [];

  modelDefinationData: any[] = [];

  responseModel: any;

  methodType: string;

  dragOverStyle: string;

  height: any = 33;

  constructor(
    private _restCallService: RestCallService,
    public _sharedDataService: SharedDataService,
    public _eventHndl: EventHandlerService
  ) {}

  ngOnInit() {
    // this.serviceMetadata.parentRef['responseModel']= this.requestModelData;
    this.dataSourceModel = new ServiceRelationshipModel();
    this.dataSourceModel.bcId = this._sharedDataService.uiDetails.boundedcontextId;
    this.dataSourceModel.domainId = this._sharedDataService.uiDetails.domainId;
    this.selectDomain();

    if (this.serviceMetadata.defination.length > 0) {
      if (this.serviceMetadata.metadata.hasOwnProperty('servicedefination')) {
        this.dataSourceModel = this.serviceMetadata.metadata.servicedefination;
      }
      const serviceData = {
        id: this.dataSourceModel.serviceId,
        name: this.dataSourceModel.serviceName
      };
      this.selectService(serviceData);

      this.methodType =
        MethodTypeMap.METHOD_TYPE_MAP[this.dataSourceModel.httpMethod];
      this.requestModelData = this.serviceMetadata.defination.filter(
        (obj: any) => obj.inputParamTypeId == 1
      );
      this.paramModelData = this.serviceMetadata.defination.filter(
        (obj: any) => obj.inputParamTypeId == 2
      );
      this.pathModelData = this.serviceMetadata.defination.filter(
        (obj: any) => obj.inputParamTypeId == 3
      );
    }
    this.getComponentList();
  }

  requestBodyTabActive(): boolean {
    if (this.requestModelData.length > 0) return true;
    else return false;
  }
  pathTabActive(): boolean {
    if (
      this.requestModelData.length == 0 &&
      this.paramModelData.length == 0 &&
      this.pathModelData.length > 0
    )
      return true;
    else return false;
  }

  paramTabActive(): boolean {
    if (
      this.requestModelData.length == 0 &&
      this.paramModelData.length > 0 &&
      this.pathModelData.length == 0
    )
      return true;
    else return false;
  }

  getComponentList() {
    this._eventHndl.findListOfComponent().forEach((com: any) => {
      if (com.componentBehaviour.isBindingComponent) {
        if (com.componentBehaviour.hasModelBinding) {
          let object: any = {};
          object['fieldName'] = com.properties.name;
          object['fieldLabel'] = com.properties.fieldLabel;
          this.modelDefinationData.push(object);
        }
      }
    });
  }

  selectDomain() {
    let response: any;
    const requestJson = {
      bContextId: this.dataSourceModel.bcId,
      domainId: this.dataSourceModel.domainId
    };
    this._restCallService
      .postRestCall(
        prefixUrl + '/api/dna/servicedefinition/findByBContextAndDomain ',
        requestJson
      )
      .subscribe(
        res => {
          response = res;
        },
        err => {
          console.log(err);
        },
        () => {
          if (response) {
            this.serviceLocalData = response;
          }
        }
      );
  }

  selectService(service: any) {
    let response: any;
    this.dataSourceModel.serviceName = service.name;
    const requestJson = {
      id: service.id
    };
    this._restCallService
      .postRestCall(
        prefixUrl + '/api/dna/servicedefinition/getOperationsByServiceId ',
        requestJson
      )
      .subscribe(
        res => {
          response = res;
        },
        err => {
          console.log(err);
        },
        () => {
          if (response) {
            this.operationLocalData = response;
          }
        }
      );
  }

  selectOperation(operation: any) {
    this.dataSourceModel.httpMethod = operation.methodTypeId;
    this.dataSourceModel.httpUrl = operation.httpUrl;
    this.dataSourceModel.methodType = operation.methodTypeId;
    this.dataSourceModel.operationName = operation.operationName;
    this.methodType =
      MethodTypeMap.METHOD_TYPE_MAP[this.dataSourceModel.httpMethod];
    const requestJson = {
      id: operation.operationId,
      serviceId: this.dataSourceModel.serviceId
    };
    this._restCallService
      .postRestCall(
        prefixUrl + '/api/dna/servicedefinition/findByOperationId',
        requestJson
      )
      .subscribe(
        res => {
          this.operationResponse = res.response;
        },
        err => {
          console.log(err);
        },
        () => {
          if (this.operationResponse) {
            this.createRequestModelData();
          }
        }
      );
  }
  createRequestModelData() {
    if (
      this.operationResponse.inputs &&
      this.operationResponse.inputs.length > 0
    ) {
      this.requestModelData = [];
      this.operationResponse.inputs.forEach((req: any) => {
        req['values'] = [];
        if (req.hasOwnProperty('children') && req.children != null) {
          this.createRequestModelDataForChild(req);
        }
      });
      this.requestModelData = this.operationResponse.inputs.filter(
        (obj: any) => obj.inputParamTypeId == 1
      );
      this.paramModelData = this.operationResponse.inputs.filter(
        (obj: any) => obj.inputParamTypeId == 2
      );
      this.pathModelData = this.operationResponse.inputs.filter(
        (obj: any) => obj.inputParamTypeId == 3
      );
    }
    /*set OutPut Data*/
    this.setResponseModelData(this.operationResponse.outputs);
  }

  setResponseModelData(outputs: any) {
    if (this.serviceMetadata.parentRef.hasOwnProperty('responseModel')) {
      this.serviceMetadata.parentRef.responseModel = JSON.parse(JSON.stringify(this.serviceMetadata.parentRef.responseModel.concat(
        outputs
      )));
    } else {
      this.serviceMetadata.parentRef['responseModel'] = [];
      this.serviceMetadata.parentRef.responseModel = outputs;
    }

  }
  createRequestModelDataForChild(child: any) {
    child.children.forEach((opt: any) => {
      opt['values'] = [];
      if (opt.hasOwnProperty('children') && opt.children != null) {
        this.createRequestModelDataForChild(opt);
      }
    });
  }
  closeWindow() {
    this.show = false;
    this.showChange.emit(this.show);
  }
  dragStart(event: any, row: any, type: any) {
    event.dataTransfer.setData('dragData', JSON.stringify(row));
    event.dataTransfer.setData('type', type);
  }
  dragOver(event: any, ref: any) {
    ref.style.border = '2px dashed green';
    event.stopPropagation();
    event.preventDefault();
  }

  onDragLeave(ref: any) {
    ref.style.border = '2px dashed lightgrey';
  }

  drop(event: any, row: any, ref: any) {
    const dragObject = JSON.parse(event.dataTransfer.getData('dragData'));
    let object: any = {};
    object['key'] = dragObject.fieldName;
    object['fieldName'] = dragObject.fieldName;
    object['fieldLabel'] = dragObject.fieldLabel;
    object['type'] = event.dataTransfer.getData('type');
    if (dragObject.hasOwnProperty('collection')) {
      object['collection'] = dragObject.collection;
    } else object['collection'] = false;
    if (dragObject.hasOwnProperty('fieldType')) {
      object['fieldType'] = dragObject.fieldType;
    } else object['fieldType'] = null;
    if (dragObject.hasOwnProperty('inputParamTypeId')) {
      object['inputParamTypeId'] = dragObject.inputParamTypeId;
    } else object['inputParamTypeId'] = null;
    /* if (row.values.length >= 1) {
     let operatorObject: any = {};
     operatorObject['key'] = '+';
     operatorObject['type'] = 'operator';
     row.values.push(operatorObject, object);
     } else row.values.push(object);*/
    row.values = [];
    row.values.push(object)
    ref.style.border = '2px dashed lightgrey';
  }

  onSave() {
    this.createDefinationData();
    if (this.serviceMetadata.metadata.hasOwnProperty('servicedefination')) {
      this.serviceMetadata.metadata.servicedefination = this.dataSourceModel;
    } else {
      this.serviceMetadata.metadata['servicedefination'] = this.dataSourceModel;
    }

    this.onClick.emit({
      serviceData:
      this.dataSourceModel.serviceName +
      ' ' +
      this.dataSourceModel.operationName
    });
    this.closeWindow();
  }
  createDefinationData() {
    this.serviceMetadata.defination = this.requestModelData.concat(
      this.pathModelData,
      this.paramModelData
    );
  }
}

export class ServiceRelationshipModel {
  bcId: string;
  domainId: string;
  serviceId: string;
  operationId: string;
  methodType: string;
  dataReader: string;
  servicetype: any;
  httpUrl: any;
  httpMethod: any;
  operationName: string;
  serviceName: string;
  constructor() {
    this.bcId = '';
    this.domainId = '';
    this.serviceId = '';
    this.operationId = '';
    this.methodType = '';
    this.dataReader = '';
    this.servicetype = '1';
    this.httpUrl = '';
    this.httpMethod = 0;
    this.operationName = '';
    this.serviceName = '';
  }
}
