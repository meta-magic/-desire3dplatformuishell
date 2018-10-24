/**
 * Created by pratik on 5/3/18.
 */
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Local, Remote } from '../canvas-models/datasource.model';
import { RestCallService } from '../canvas-service/restcall.service';
import { prefixUrl } from '../canvas-models/canvas.constant';
import { SharedDataService } from '../canvas-service/shared-data.service';

@Component({
  selector: 'data-source',
  template: `    
    <amexio-card [header]="true"
                 [footer]="false"
                 [footer-align]="'right'"
                 [body-height]="85">
      <amexio-header>
        <i (click)="backToCanvas()" style="cursor: pointer" class="fa fa-chevron-left" aria-hidden="true"></i>&nbsp;&nbsp;Component Datasource
      </amexio-header>
      <amexio-body>
        
        <amexio-tab-view [closable]="false" [action]="true">

          <amexio-tab-action>
            <ng-container *ngIf="change">
              <amexio-radio-group
                name="service"
                [field-label]="''"
                horizontal="true"
                [display-field]="'serviceName'"
                [value-field]="'servicetype'"
                (onSelection)="setSelectedServiceLocalData($event)"
                [default-value]="componentInstance.dataSource.servicetype"
                [data]="serviceLocalRadioGroupData">
              </amexio-radio-group>
            </ng-container>
          </amexio-tab-action>
          <amexio-tab title="Data Store" [active]="dataSourceTab">

            <amexio-card [header]="false"
                         [footer]="true"
                         [footer-align]="'right'" [body-height]="60">
              <amexio-body>
                <ng-container *ngIf="componentInstance.dataSource.servicetype != 2">
                  <amexio-row>
                    <amexio-column size="6">
                      <amexio-new-dropdown [(ngModel)]="componentInstance.dataSource.metadata.serviceId"
                                       [place-holder]="'Choose'"
                                       name="componentInstance.dataSource.metadata.serviceId"
                                       [data-reader]="'response'"
                                       [field-label]="'Service'"
                                       [display-field]="'name'"
                                       [value-field]="'id'"
                                       [data]="serviceLocalData"
                                       (onSingleSelect)="selectService($event)">
                      </amexio-new-dropdown>
                    </amexio-column>

                    <amexio-column size="6">
                      <amexio-new-dropdown [(ngModel)]="componentInstance.dataSource.metadata.operationId"
                                       [place-holder]="'Choose Operation'"
                                       [data-reader]="'response'"
                                       [field-label]="'Operation'"
                                       [display-field]="'operationName'"
                                       [value-field]="'operationId'"
                                       [data]="operationLocalData"
                                       (onSingleSelect)="selectOperation($event)">
                      </amexio-new-dropdown>
                    </amexio-column>

                  </amexio-row>

                  <amexio-row>
                    <amexio-column [size]="6">
                      <ng-container *ngIf="componentInstance.dataSource.remote != null">
                        <amexio-text-input [field-label]="'Service Url'"
                                           [place-holder]="'service url'"
                                           [enable-popover]="false"
                                           [icon-feedback]="true"
                                           [allow-blank]="false"
                                           [disabled]="false"
                                           name="componentInstance.dataSource.remote.httpUrl"
                                           [(ngModel)]="componentInstance.dataSource.remote.httpUrl">
                        </amexio-text-input>
                      </ng-container>

                    </amexio-column>
                    <!--  <amexio-column [size]="6">
                        <amexio-text-input [field-label]="'Data Reader'" name="componentInstance.dataSource.dataReader"
                                           [enable-popover]="false"
                                           [icon-feedback]="true"
                                           [allow-blank]="false"
                                           [place-holder]="'placeholder'"
                                           [disabled]="false"
                                           [(ngModel)]="componentInstance.dataSource.dataReader">
                        </amexio-text-input>
                      </amexio-column>-->
                  </amexio-row>

                  <br>
                </ng-container>
                <ng-container *ngIf="componentInstance.dataSource.servicetype == '2'">
                  <amexio-row>
                    <!-- // localData-->
                    <amexio-column [size]="'7'">
                      <canvas-tree-data-table [data]="localTreeData" [height]="270">
                        <canvas-tree-column [data-index]="'key'"
                                            [data-type]="'string'" [hidden]="false"
                                            [text]="'Key'" [width]="50">
                          <ng-template #amexioBodyTmpl let-column let-row="row" let-index="index">
                            <ng-container *ngIf="row?.readOnly;else key_else">
                              {{row.key}}
                            </ng-container>
                            <ng-template #key_else>
                              <input type="text" [ngModel]="row.key" (ngModelChange)="keyOnChange($event,row)"/>
                            </ng-template>
                          </ng-template>
                        </canvas-tree-column>
                        <canvas-tree-column [data-index]="'value'"
                                            [data-type]="'string'" [hidden]="false"
                                            [text]="'Value'" [width]="30">
                          <ng-template #amexioBodyTmpl let-column let-row="row">
                            <ng-container *ngIf="row.type == 'key';else value_else">
                              <input type="text" [ngModel]="row.value" (ngModelChange)="valueOnChange($event,row)"/>
                            </ng-container>
                            <ng-template #value_else>
                              {{row.value}}
                            </ng-template>
                          </ng-template>
                        </canvas-tree-column>
                        <canvas-tree-column
                          [data-type]="'string'"
                          [text]="'Action'" [width]="20">
                          <ng-template #amexioHeaderTmpl let-column="column" let-index="index">
                            {{column.text}} &nbsp;
                            <amexio-image [icon-class]="'fa fa-code'" style="padding-left: 2px;"
                                          [tooltip]="'Object'" (onClick)="addParentObject('object')">
                            </amexio-image>
                            <amexio-image [icon-class]="'fa fa-table'" style="padding-left: 2px;"
                                          [tooltip]="'Array'" (onClick)="addParentArray('array')">
                            </amexio-image>
                          </ng-template>


                          <ng-template #amexioBodyTmpl let-column let-row="row" let-index="index">
                            <ng-container *ngIf="row.type != 'key' && showRepeatIconInverse(row)">
                              <amexio-image [icon-class]="'fa fa-code'"
                                            [tooltip]="'Object'" (onClick)="addDataObject('object',row, index)">
                              </amexio-image>

                              <amexio-image [icon-class]="'fa fa-table'"
                                            [tooltip]="'Array'" (onClick)="addDataObject('array',row, index)">
                              </amexio-image>
                            </ng-container>
                            <ng-container *ngIf="showKeyIcon(row)">
                              <amexio-image [icon-class]="'fa fa-columns'"
                                            [tooltip]="'Key'" (onClick)="addDataObject('key',row, index)">
                              </amexio-image>
                            </ng-container>

                            <ng-container *ngIf="showRepeatIcon(row)">
                              <amexio-image [icon-class]="'fa fa-repeat'"
                                            [tooltip]="'repeat'" (onClick)="repeatObject('key',row, index)">
                              </amexio-image>
                            </ng-container>


                            <amexio-image [icon-class]="'fa fa-trash'"
                                          [tooltip]="'Key'" (onClick)="onRemove(row)">
                            </amexio-image>
                          </ng-template>
                        </canvas-tree-column>
                      </canvas-tree-data-table>
                    </amexio-column>
                    <amexio-column [size]="'5'">
                      <amexio-card [header]="true"
                                   [footer]="false"
                                   [show]="true"
                                   [body-height]="38">
                        <amexio-header>
                          Output Data
                        </amexio-header>
                        <amexio-body>
                          <amexio-row>
                            <div *ngFor="let data of parentJsonStructure">
                              <pre><code></code>{{data | json}}</pre>
                            </div>
                          </amexio-row>
                        </amexio-body>
                      </amexio-card>
                    </amexio-column>

                  </amexio-row>
                </ng-container>
              </amexio-body>
              <amexio-action>
                <amexio-button [label]="'Next'" [icon]="'fa fa-angle-right'" (onClick)="onNextClick()"
                               [type]="'theme-color'">
                </amexio-button>
              </amexio-action>
            </amexio-card>

          </amexio-tab>

          <amexio-tab title="Data Mapping" [active]="dataMappingTab" [disabled]="dataMapperDisabled">


            <amexio-card [header]="false"
                         [footer]="true"
                         [footer-align]="'right'" [body-height]="52">
              <amexio-body>
                <response-mapper [component]="componentInstance" [treeLocalData]="treeLocalData"></response-mapper>
              </amexio-body>
              <amexio-action>
                <amexio-button [label]="'Save'" [icon]="'fa fa-floppy-o'"
                               [type]="'theme-color'" (onClick)="onSaveClick()">
                </amexio-button>
              </amexio-action>
            </amexio-card>
          </amexio-tab>

        </amexio-tab-view>


      </amexio-body>
    </amexio-card>
    <amexio-dialogue [show-dialogue]="conformWindow"
                     [title]="'Confirm'"
                     [message]="'Are you sure you want to Erase Data.?'"
                     [message-type]="'confirm'"
                     [type]="'confirm'"
                     [closable]="false"
                     [primary-action-label]="'ok'"
                     [secondary-action-label]="'cancel'"
                     (actionStatus)="clearDataStatusEvent($event)">
    </amexio-dialogue>

    <amexio-dialogue [show-dialogue]="confirmWindowClose"
                     [title]="'Confirm Action'"
                     [message]="'Continue with empty Datasource'"
                     [message-type]="'confirm'"
                     [type]="'confirm'"
                     [primary-action-label]="'ok'"
                     [secondary-action-label]="'cancel'"
                     (actionStatus)="confirmWindowCloseEvent($event)">
    </amexio-dialogue>


    <amexio-notification [data]="notificationData"
                         [vertical-position]="'top'"
                         [horizontal-position]="'right'"
                         [auto-dismiss-msg]="true"
                         [auto-dismiss-msg-interval]="4000">
    </amexio-notification>

  `
})
export class DataSourceComponent implements OnInit {
  @Input() showDatasource: boolean;

  @Input() componentInstance: any;

  serviceLocalRadioGroupData: any;

  operationLocalData: any;

  serviceLocalData: any;

  dataAccordion = false;

  conformWindow: boolean;

  selectedRadioData: any;

  clearDataStatus: boolean;

  testData: any;

  localTreeData: any[] = [];

  notificationData: any[] = [];

  visualJSONTemplate: any;

  treeLocalData: any;

  change: boolean = true;

  confirmWindowClose: boolean;
  parentJsonStructure: any[] = [];

  /*save and next button property*/

  dataMapperDisabled: boolean;
  dataSourceTab: boolean;
  dataMappingTab: boolean;

  constructor(
    public _restCallService: RestCallService,
    public cdf: ChangeDetectorRef,
    private _sharedDataService: SharedDataService
  ) {
    this.dataSourceTab = true;
    this.dataMappingTab = false;
    this.dataMapperDisabled = true;
    this.conformWindow = false;
    this.serviceLocalRadioGroupData = [
      {
        serviceName: 'Remote Call',
        servicetype: '1'
      },
      {
        serviceName: 'Local Data',
        servicetype: '2'
      }
    ];
  }

  ngOnInit() {
    this.componentInstance.dataSource.metadata.bcId = this._sharedDataService.uiDetails.boundedcontextId;
    this.componentInstance.dataSource.metadata.domainId = this._sharedDataService.uiDetails.domainId;
    this.selectDomain();
    this.setEditModeData();
  }

  backToCanvas() {
    this.componentInstance._eventHndl.showDataSource = false;
    this.componentInstance._eventHndl.showCanvas = true;
    this.componentInstance._eventHndl.showRelationship = false;
  }

  setEditModeData() {
    if (
      this.componentInstance.dataSource.local != null &&
      this.componentInstance.dataSource.local.hasOwnProperty('data') &&
      this.componentInstance.dataSource.local.data != null
    ) {
      this.parentJsonStructure.push(
        JSON.parse(this.componentInstance.dataSource.local.data)
      );
      this.treeLocalData = this.parseObject(this.parentJsonStructure[0]);
      if (this.componentInstance.dataSource.localTreeData) {
        this.componentInstance.dataSource.localTreeData.expanded = false;
        this.localTreeData = [this.componentInstance.dataSource.localTreeData];
        this.dataMapperDisabled = false;
      }
    } else {
      this.localTreeData = [];
      this.treeLocalData = this.componentInstance.dataSource.localTreeData;
      if (this.componentInstance.dataSource.metadata.serviceId) {
        const seriveData = {
          id: this.componentInstance.dataSource.metadata.serviceId
        };
        this.selectService(seriveData);
      }
    }
  }

  onClose() {
    this.componentInstance.dataSource.local.data = null;
    this.componentInstance.dataSource.localTreeData = null;
    this.componentInstance.dataSource.remote = null;
    this.componentInstance.dataSource.metadata.bcId = '';
    this.componentInstance.dataSource.metadata.domainId = '';
    this.componentInstance.dataSource.metadata.serviceId = '';
    this.componentInstance.dataSource.metadata.operationId = '';
    this.componentInstance.dataSource.metadata.methodType = '';
    this.componentInstance.dataSource.dataReader = '';
    if (this.componentInstance.dataSource.hasOwnProperty('displayField')) {
      this.componentInstance.dataSource.displayField = '';
    }
    if (this.componentInstance.dataSource.hasOwnProperty('valueField')) {
      this.componentInstance.dataSource.valueField = '';
    }
  }
  confirmWindowCloseEvent(status: any) {
    if (status == 'ok') {
      this.confirmWindowClose = false;
      this.showDatasource = false;
    } else {
      this.confirmWindowClose = false;
    }
  }

  selectDomain() {
    let response: any;
    const requestJson = {
      bContextId: this.componentInstance.dataSource.metadata.bcId,
      domainId: this.componentInstance.dataSource.metadata.domainId
    };
    this._restCallService
      .postRestCall(
        prefixUrl + '/api/dna/servicedefinition/findByBContextAndDomain',
        requestJson
      )
      .subscribe(
        res => {
          response = res;
        },
        err => {},
        () => {
          if (response) {
            this.serviceLocalData = response;
          }
        }
      );
  }

  selectService(service: any) {
    let response: any;
    const requestJson = {
      id: service.id
    };
    this._restCallService
      .postRestCall(
        prefixUrl + '/api/dna/servicedefinition/getOperationsByServiceId',
        requestJson
      )
      .subscribe(
        res => {
          response = res;
        },
        err => {},
        () => {
          if (response) {
            this.operationLocalData = response;
          }
        }
      );
  }

  selectOperation(operation: any) {
    if (this.componentInstance.dataSource.remote != null) {
      this.componentInstance.dataSource.remote.httpMethod =
        operation.methodTypeId;
      this.componentInstance.dataSource.remote.httpUrl = operation.httpUrl;
    }
    this.componentInstance.dataSource.metadata.methodType =
      operation.methodTypeId;
    if (operation.outputParam.outputParamTypeId == 1) {
      let response: any;
      const requestJson = {
        id: operation.operationId,
        serviceId: this.componentInstance.dataSource.metadata.serviceId
      };
      this._restCallService
        .postRestCall(
          prefixUrl + '/api/dna/servicedefinition/findByOperationId',
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
              this.treeLocalData = response.response.outputs;
            }
          }
        );
    }
  }

  setSelectedServiceLocalData(selectedData: any) {
    this.selectedRadioData = selectedData;
    this.componentInstance.dataSource.servicetype = this.selectedRadioData.servicetype;
    this.conformWindow = true;
  }

  closeDialogueBox() {
    this.cdf.detectChanges();
    if (this.selectedRadioData.servicetype == '2') {
      this.componentInstance.dataSource.servicetype = '1';
    } else if (this.selectedRadioData.servicetype == '1') {
      this.componentInstance.dataSource.servicetype = '2';
    }
    this.clearDataStatus = false;
    this.conformWindow = false;
  }

  clearDataStatusEvent(statusData: any) {
    if (statusData == 'ok') {
      this.clearDataStatus = true;
      this.conformWindow = false;
      this.changeServiceType(this.selectedRadioData);
      this.cdf.detectChanges();
      this.dataMapperDisabled = true;
      this.componentInstance.dataSource.servicetype = this.selectedRadioData.servicetype;
    } else if (statusData == 'cancel') {
      this.closeDialogueBox();
    }
    this.clearDataStatus = false;
    this.conformWindow = false;
  }

  changeServiceType(selectedData: any) {
    if (this.clearDataStatus) {
      if (selectedData.servicetype == '2') {
        this.localTreeData.length = 0;
        this.parentJsonStructure = [];
        this.componentInstance.dataSource.localDataName =
          'localData' + Math.floor(Math.random() * 90000) + 10000;
        this.componentInstance.dataSource.servicetype =
          selectedData.servicetype;
        this.resetSetRemoteCallData();
      } else {
        this.componentInstance.dataSource.servicetype =
          selectedData.servicetype;
        this.componentInstance.dataSource.localDataName = null;
        this.componentInstance.dataSource.local = null;
        this.resetSetRemoteCallData();
        this.componentInstance.dataSource.remote = new Remote();
      }
    }
  }

  resetSetRemoteCallData() {
    this.componentInstance.dataSource.remote = null;
    this.componentInstance.dataSource.dataReader = '';

    this.componentInstance.dataSource.hasOwnProperty('displayField')
      ? (this.componentInstance.dataSource.displayField = '')
      : null;
    this.componentInstance.dataSource.hasOwnProperty('valueField')
      ? (this.componentInstance.dataSource.valueField = '')
      : null;

    this.treeLocalData = [];
    this.componentInstance.dataSource.metadata.recordData = [];
  }

  /*LocalData*/

  showKeyIcon(row: any) {
    if (row.type == 'array' || row.type == 'key') {
      return false;
    } else {
      return true;
    }
  }

  showRepeatIcon(row: any) {
    if (
      row.type == 'array' &&
      row.hasOwnProperty('children') &&
      row.children.length >= 1
    ) {
      return true;
    } else return false;
  }
  showRepeatIconInverse(row: any) {
    if (
      row.type == 'array' &&
      row.hasOwnProperty('children') &&
      row.children.length >= 1
    ) {
      return false;
    } else return true;
  }

  addParentObject(key: any) {
    const treeDataObjectStructure: any = this.createObjectStructure(key);
    treeDataObjectStructure.key = '{}';
    treeDataObjectStructure.readOnly = true;
    this.localTreeData[0] = treeDataObjectStructure;
    this.createJsonData();
  }

  addParentArray(key: string) {
    const treeDataObjectStructure: any = this.createObjectStructure(key);
    treeDataObjectStructure.key = '[]';
    treeDataObjectStructure.readOnly = true;
    this.localTreeData[0] = treeDataObjectStructure;
    this.createJsonData();
  }

  repeatObject(type: any, rowData: any, index: any) {
    let cloneData: any;
    cloneData = JSON.parse(JSON.stringify(rowData.children[0]));
    rowData.children.push(
      this.createCloneData(cloneData, rowData.children.length)
    );
    this.toogle(rowData, index);
    this.createJsonData();
  }

  addDataObject(type: any, rowData: any, index: any) {
    const treeDataObjectStructure: any = this.createObjectStructure(type);
    if (rowData.hasOwnProperty('children')) {
      if (rowData.type == 'array' && type == 'object') {
        treeDataObjectStructure.key = '[' + rowData.children.length + ']';
        treeDataObjectStructure['readOnly'] = true;
      } else if (rowData.type == 'array' && type == 'array') {
        treeDataObjectStructure.key = '[]';
        treeDataObjectStructure['readOnly'] = true;
        rowData.children.push(treeDataObjectStructure);
      } else {
        rowData.children.push(treeDataObjectStructure);
      }
    } else {
      rowData['children'] = [];
      if (rowData.type == 'array' && type == 'object') {
        treeDataObjectStructure.key = '[' + rowData.children.length + ']';
        treeDataObjectStructure['readOnly'] = true;
      } else if (rowData.type == 'array' && type == 'array') {
        treeDataObjectStructure.key = '[]';
        treeDataObjectStructure['readOnly'] = true;
      }
      rowData.children.push(treeDataObjectStructure);
    }
    this.toogle(rowData, index);
    this.createJsonData();
  }

  createCloneData(cloneData: any, index: any): any {
    let test: any[] = [];
    const treeDataObjectStructure: any = this.createObjectStructure(
      cloneData.type
    );
    if (cloneData.type == 'object') {
      treeDataObjectStructure.key = '[' + index + ']';
    } else {
      treeDataObjectStructure.key = '[]';
    }
    treeDataObjectStructure.readOnly = true;
    if (cloneData.hasOwnProperty('children')) {
      treeDataObjectStructure['children'] = [];
      this.childSearch(cloneData, treeDataObjectStructure);
    }
    test.push(treeDataObjectStructure);
    return test[0];
  }

  childSearch(child: any, parentRef: any) {
    child.children.forEach((opt: any) => {
      const treeDataObjectStructure: any = this.createObjectStructure(opt.type);
      treeDataObjectStructure.key = opt.key;
      if (opt.hasOwnProperty('children')) {
        treeDataObjectStructure['children'] = [];
        this.childSearch(opt, treeDataObjectStructure);
      }
      parentRef.children.push(treeDataObjectStructure);
    });
  }

  keyOnChange(event: any, data: any) {
    data.key = event;
    this.createJsonData();
  }
  valueOnChange(event: any, data: any) {
    data.value = event;
    this.createJsonData();
  }
  createJsonData() {
    this.buildingJson(this.localTreeData[0]);
  }

  buildingJson(treeData: any) {
    this.parentJsonStructure = [];
    let structure: any;
    if (treeData.type == 'object') {
      structure = {};
      if (treeData.hasOwnProperty('children')) {
        this.buildingObjectJson(treeData, structure);
      }
    } else {
      structure = [];
      if (treeData.hasOwnProperty('children')) {
        this.buildingArrayJson(treeData, structure);
      }
    }
    this.parentJsonStructure.push(structure);
    this.treeLocalData = this.parseObject(this.parentJsonStructure[0]);
  }

  createObjectStructure(type: any): any {
    if (type == 'object') {
      const treeDataObjectStructure: any = new TreeDataObjectStructure();
      treeDataObjectStructure.type = 'object';
      treeDataObjectStructure.key =
        'object_' + Math.floor(Math.random() * 90000) + 1;
      treeDataObjectStructure.value = '{}';
      treeDataObjectStructure['readOnly'] = false;
      return treeDataObjectStructure;
    } else if (type == 'array') {
      const treeDataObjectStructure: any = new TreeDataObjectStructure();
      treeDataObjectStructure.type = 'array';
      treeDataObjectStructure.key =
        'array_' + Math.floor(Math.random() * 90000) + 1;
      treeDataObjectStructure.value = '[]';
      treeDataObjectStructure['readOnly'] = false;
      return treeDataObjectStructure;
    } else {
      const treeDataObjectStructure: any = new TreeDataObjectStructure();
      treeDataObjectStructure.type = 'key';
      treeDataObjectStructure.key =
        'key_' + Math.floor(Math.random() * 90000) + 1;
      treeDataObjectStructure.value = 'key';
      treeDataObjectStructure['readOnly'] = false;
      return treeDataObjectStructure;
    }
  }

  buildingObjectJson(data: any, parentRef: any) {
    data.children.forEach((option: any, index: any) => {
      if (option.type == 'object') {
        parentRef[option.key] = {};
        if (option.hasOwnProperty('children')) {
          this.buildingObjectJson(option, parentRef[option.key]);
        }
      } else if (option.type == 'array') {
        parentRef[option.key] = [];
        if (option.hasOwnProperty('children')) {
          this.buildingArrayJson(option, parentRef[option.key]);
        }
      } else {
        parentRef[option.key] = option.value;
      }
    });
  }

  buildingArrayJson(data: any, parentRef: any) {
    data.children.forEach((option: any, index: any) => {
      if (option.type == 'array') {
        let localArray: any;
        localArray = [];
        parentRef.push(localArray);
        if (option.hasOwnProperty('children')) {
          /* need to change parameter*/
          this.buildingArrayJson(option, parentRef[index]);
        }
      } else if (option.type == 'object') {
        let localArray: any;
        localArray = {};
        parentRef.push(localArray);
        if (option.hasOwnProperty('children')) {
          /* need to change parameter*/
          this.buildingObjectJson(option, parentRef[index]);
        }
      }
    });
  }

  /* remove object*/
  onRemove(row: any) {
    if (this.localTreeData == row) {
      this.localTreeData = [];
    } else {
      if (row.hasOwnProperty('children')) {
        this.removeRows(row);
        this.searchInChild(this.localTreeData, row);
      } else {
        this.searchInChild(this.localTreeData, row);
      }
    }
    this.cdf.detectChanges();
    this.createJsonData();
  }

  searchInChild(rowData: any, searchObject: any) {
    rowData.forEach((opt: any, index: any) => {
      if (opt.id == searchObject.id) {
        rowData.splice(index, 1);
      } else if (opt.hasOwnProperty('children')) {
        this.searchInChild(opt.children, searchObject);
      }
    });
  }

  toogle(row: any, index: number) {
    row.expanded = true;
    if (row.expanded) {
      this.addRows(row, index);
    }
  }

  addRows(row: any, index: number) {
    this.removeRows(row);
    if (row.hasOwnProperty('children')) {
      for (let i = 0; i < row.children.length; i++) {
        const node = row.children[i];
        if (!row.level) {
          row.level = 1;
        }
        if (node.children) {
          node.expanded = false;
        }
        node.level = row.level + 1;
        this.localTreeData.splice(index + (i + 1), 0, node);
      }
    }
  }

  removeRows(node: any) {
    for (let i = 0; i < node.children.length; i++) {
      for (let j = 0; j < this.localTreeData.length; j++) {
        if (this.localTreeData[j] === node.children[i]) {
          if (node.children[i].children) {
            this.removeRows(node.children[i]);
          }
          this.localTreeData.splice(
            this.localTreeData.indexOf(node.children[i]),
            1
          );
        }
      }
    }
  }

  //TO PARSE THE DATA TO TREE DATA
  parseObject(jsondata: any) {
    let tmpjson: any = JSON.parse(JSON.stringify(jsondata));
    let ary: any = [];
    this.getTreeJSON(tmpjson, ary);
    return ary;
  }

  //GET THE TREE DATA
  getTreeJSON(json: any, tmp: any[]): any {
    if (json) {
      if (json.length > 1) {
        for (var j in json[0]) {
          let child: any = {};
          child['text'] = j;
          tmp.push(child);
        }
      } else {
        for (var j in json) {
          let sub_key: any = j;
          let sub_val: any = json[j];
          let child: any = {};
          child['text'] = sub_key;
          if (sub_val instanceof Array) {
            child['children'] = [];
            let innerjson = this.getTreeJSON(sub_val[0], child['children']);
            if (innerjson) child['children'].push(innerjson);
          } else if (sub_val instanceof Object) {
            child['children'] = [];
            let innerjson = this.getTreeJSON(sub_val, child['children']);
            if (innerjson) child['children'].push(innerjson);
          }
          tmp.push(child);
        }
      }
    }
  }

  /*save data*/

  onSaveClick() {
    if (this.componentInstance.dataSource.servicetype == '2') {
      this.componentInstance.dataSource.remote = null;
      this.componentInstance.dataSource.local = new Local();
      this.componentInstance.dataSource.local.data = JSON.stringify(
        this.parentJsonStructure[0]
      );
      this.componentInstance.dataSource.localDataName =
        this.componentInstance.name + 'Data';
      this.componentInstance.dataSource.localTreeData = this.localTreeData[0];
    } else {
      this.componentInstance.dataSource.localTreeData = this.treeLocalData;
    }
    this.showDatasource = false;

    this.backToCanvas();
  }

  checkValidation() {
    if (
      this.componentInstance.dataSource.metadata.bcId != '' &&
      this.componentInstance.dataSource.metadata.domainId != '' &&
      this.componentInstance.dataSource.metadata.servicetype != '' &&
      this.componentInstance.dataSource.metadata.operationId != ''
    ) {
      return true;
    } else return false;
  }

  onNextClick() {
    if (this.componentInstance.dataSource.servicetype == '1') {
      if (this.checkValidation()) {
        this.dataMapperDisabled = false;
        this.dataSourceTab = false;
        this.dataMappingTab = true;
      } else {
        this.dataMapperDisabled = true;
        this.notificationData.push('please fill all data');
      }
    } else if (this.localTreeData.length >= 1) {
      this.dataMapperDisabled = false;
      this.dataSourceTab = false;
      this.dataMappingTab = true;
    } else {
      this.dataMapperDisabled = true;
      this.notificationData.push('please add local data');
    }
  }
}

export class TreeDataObjectStructure {
  key: any;
  type: string;
  value: any;
  expanded: boolean;
  id: any;

  constructor() {
    this.key = 'Object';
    this.type = 'Object';
    this.value = '{}';
    this.expanded = true;
    this.id = Math.floor(Math.random() * 90000) + 10000;
  }
}
