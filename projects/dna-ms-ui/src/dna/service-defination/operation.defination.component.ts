import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'platform-commons';
import { LoaderService } from 'platform-commons';

@Component({
  selector: 'operation-defination',
  template: `
 <div class="loadingnav" *ngIf="loaderService.isLoading"></div>
<amexio-form [body-height]="80" [header]="true" form-name="operationdefination"  [show-error]="true">
    <amexio-form-header>Operation Definition</amexio-form-header>
    <amexio-form-body>
        <amexio-tab-view  [closable]="false">
            <amexio-tab title="Details" [active]="true">
            <amexio-row>
                <amexio-column [size]=6>
                    <amexio-dropdown [search]="true" [allow-blank]="false" [(ngModel)]="operationModel.boundedContextId"
                                    [place-holder]="'Select Bounded Context'" name="operationModel.boundedContextId"
                                     [error-msg]="'Select Bounded Context'" [field-label]="'Bounded Context'" 
                                     [display-field]="'name'" [data]="operationModel.boundedContextData"
                                    (onSingleSelect) = "onBoundedContextSelect($event)"
                                    [value-field]="'id'">
                    </amexio-dropdown>
                </amexio-column>
                <amexio-column [size]=6>
                    <amexio-dropdown [search]="true" [allow-blank]="false"  [(ngModel)]="operationModel.domainId"
                                    [place-holder]="'Select Module'" name="operationModel.domainId"
                                    [error-msg]="'Select Module'" [data]="operationModel.domainData"
                                    [field-label]="'Module'" [display-field]="'name'" [value-field]="'id'"
                                    (onSingleSelect) = "onDomainSelect($event)">
                    </amexio-dropdown>
                </amexio-column>
            </amexio-row>
            <amexio-row>
                <amexio-column [size]=6>
                    <amexio-dropdown  [search]="true" [allow-blank]="false"  [(ngModel)]="operationModel.serviceId"
                        [place-holder]="'Select Service'" name="operationModel.serviceId"
                        [error-msg]="'Select Service'" [data]="operationModel.serviceData"
                        [field-label]="'Service'" [display-field]="'name'" [value-field]="'id'">
                    </amexio-dropdown>
                </amexio-column>
                <amexio-column [size]=6>
                    <amexio-text-input [allow-blank]="false"  field-label="Operation Name" [pattern]="'^[a-zA-Z][a-zA-Z0-9]*$'" name="operationModel.operationName"
                        place-holder="Enter Operation Name" [(ngModel)]="operationModel.operationName"
                        enable-popover="true" error-msg="Please Enter Operation Name" icon-feedback="true">
                    </amexio-text-input>
                </amexio-column>
            </amexio-row>
            <amexio-row>
                <amexio-column [size]=6>
                    <amexio-text-input [allow-blank]="false"  field-label="URL" name="operationModel.operationUrl"
                        place-holder="Enter Operation URL" [(ngModel)]="operationModel.operationUrl"
                        enable-popover="true" error-msg="Please Enter Operation URL" icon-feedback="true">
                    </amexio-text-input>
                </amexio-column>
                <amexio-column [size]=6>
                    <amexio-dropdown [search]="true" [(ngModel)]="operationModel.methodType" [place-holder]="'Select Method'" name="operationModel.methodType"
                        [error-msg]="'Select Method'"
                        [data]="operationModel.methodTypeData" [field-label]="'Method Type'" [display-field]="'methodType'" [value-field]="'methodTypeId'">
                    </amexio-dropdown>
                </amexio-column>
            </amexio-row>
            <amexio-row>
                <amexio-column [size]=6>
                    <amexio-dropdown [search]="true" [(ngModel)]="operationModel.consumerType" [place-holder]="'Select Consumer Type '" name="operationModel.consumerType"
                        [error-msg]="'Select Consumer Type'"  (onSingleSelect) = "onConsumerSelect($event)"
                        [data]="operationModel.contentTypeData" [field-label]="'Consumer Type'" [display-field]="'contentType'" [value-field]="'contentTypeId'">
                    </amexio-dropdown>
                </amexio-column>
                <amexio-column [size]=6>
                    <amexio-dropdown [search]="true" [(ngModel)]="operationModel.producerType" [place-holder]="'Select Producer Type '" name="operationModel.producerType"
                         [error-msg]="'Select Producer Type'"  (onSingleSelect) = "onProducerSelect($event)"
                        [data]="operationModel.contentTypeData" [field-label]="'Producer Type'" [display-field]="'contentType'" [value-field]="'contentTypeId'">
                    </amexio-dropdown>
                </amexio-column>
            </amexio-row>
            </amexio-tab>
            <amexio-tab title="Input Definition" [disabled]="(operationModel.consumerType == '0')">
            <amexio-row>
                <amexio-column [size]=6>
                    <amexio-dropdown [search]="true" [(ngModel)]="inputDefinationModel.inputType" [place-holder]="'Select Input Type '" name="inputDefinationModel.inputType"
                        [allow-blank]="validateinputdefination" [error-msg]="'Select Input Type'"   (onSingleSelect)="onInputTypeSelect($event)"
                        [data]="inputDefinationModel.inputTypeData" [field-label]="'Input Type'" [display-field]="'inputType'" [value-field]="'inputTypeId'">
                    </amexio-dropdown>
                </amexio-column>
                <amexio-column [size]=6>
                    <amexio-text-input field-label="Input Name" name="inputDefinationModel.inputName"
                        [allow-blank]="validateinputdefination" place-holder="Enter Input name" [(ngModel)]="inputDefinationModel.inputName"
                        enable-popover="true" error-msg="Please Enter Input Name" icon-feedback="true">
                    </amexio-text-input>
                </amexio-column>
            </amexio-row>
            <amexio-row>
                <amexio-column [size]=6>
                    <amexio-dropdown [search]="true" [(ngModel)]="inputDefinationModel.inputDataType" [place-holder]="'Select Input Data Type '" name="inputDefinationModel.inputDataType"
                        [allow-blank]="validateinputdefination" [error-msg]="'Select Input Data Type '"
                        [data]="inputDefinationModel.bindInputDataTypeData" [field-label]="'Input Data Type'" [display-field]="'typeName'" [value-field]="'id'">
                    </amexio-dropdown>
                </amexio-column>
                <amexio-column [size]=6>
                    <amexio-checkbox [disabled]="(inputDefinationModel.inputType !='1' )" [field-label]="'Collection'" [(ngModel)]="inputDefinationModel.collection">
                    </amexio-checkbox>
                </amexio-column>
            </amexio-row>
            <amexio-row>
                <amexio-column [size]=6>
                    <amexio-button [label]="'Add'" [type]="'theme-backgroundcolor'"  (onClick)="inputDefinationModel.addInput()"> </amexio-button>
                </amexio-column>
            </amexio-row>
            <amexio-row>
                <amexio-column [size]=12>
                    <amexio-datagrid title="Input Parameters" [data]="inputDefinationModel.inputDataParam" [page-size] = "10">
                        <amexio-data-table-column [data-index]="'inputParamName'" [data-type]="'string'" [hidden]="false" [text]="'Name'">
                        </amexio-data-table-column>
                        <amexio-data-table-column [data-index]="'collection'" [data-type]="'string'" [hidden]="false" [text]="'Is Collection'">
                        </amexio-data-table-column>
                        <amexio-data-table-column [data-index]="''" [data-type]="'string'" [text]="'Action'">
                            <ng-template #amexioBodyTmpl let-column let-row="row">
                                <amexio-image style="color:red;" [icon-class]="'fa fa-minus-circle fa-2x'" [tooltip]="'Delete'" (onClick)="inputDefinationModel.removeInput(row)">
                                 </amexio-image>
                            </ng-template>
                        </amexio-data-table-column>
                    </amexio-datagrid>
                </amexio-column>
            </amexio-row>
        </amexio-tab>
        <amexio-tab title="Output Definition"  [disabled]="(operationModel.producerType == '0')">
            <amexio-row>
                    <amexio-column [size]=4>
                        <amexio-text-input field-label="Output Name" name="outputDefinationModel.outputName"
                            [allow-blank]="validateoutputdefination" place-holder="Please Enter Output Name" [(ngModel)]="outputDefinationModel.outputName"
                            enable-popover="true" error-msg="Please Enter Output Name" icon-feedback="true">
                        </amexio-text-input>
                    </amexio-column>
                    <amexio-column [size]=4>
                        <amexio-dropdown [search]="true" [(ngModel)]="outputDefinationModel.outputDataType" [place-holder]="'Select Consumer Type '" name="outputDefinationModel.outputDataType"
                            [allow-blank]="validateoutputdefination" [error-msg]="'Select Output Data Type'"
                            [data]="outputDefinationModel.outputDataTypeData" [field-label]="'Output Data Type'" [display-field]="'typeName'" [value-field]="'id'">
                        </amexio-dropdown>
                    </amexio-column>
                    <amexio-column [size]=4>
                        <amexio-checkbox  [field-label]="'Collection'" [(ngModel)]="outputDefinationModel.collection">
                        </amexio-checkbox>
                    </amexio-column>
            </amexio-row>
        </amexio-tab>
        </amexio-tab-view>
    </amexio-form-body>
    <amexio-form-action>
        <amexio-button [label]="'Cancel'" (onClick)="onCancel()"  [icon]="'fa fa-close'" [type]="'secondary'" [size]="'default'" [tooltip]="'Cancel'"></amexio-button>
        <amexio-button [label]="'Save'" [disabled]="saveBtnEnable" [form-bind]="'operationdefination'" (onClick)="onSave()" [icon]="'fa fa-save'" [type]="'primary'" [size]="'default'" [tooltip]="'Save'"></amexio-button>
    </amexio-form-action>
</amexio-form>
<dna-notification></dna-notification>
    `
})
export class OperationDefinationComponent implements OnInit {
  operationModel: OperationDetailsModel;
  inputDefinationModel: InputDefinationModel;
  outputDefinationModel: OutputDefinationMOdel;
  notificationmsg: any[];
  saveBtnEnable: boolean = false;
  validateoutputdefination: boolean = true;
  validateinputdefination: boolean = true;

  @Output() reset: any = new EventEmitter<any>();

  constructor(
    private http: HttpClient,
    public loaderService: LoaderService,
    public _notificationService: NotificationService
  ) {
    this.operationModel = new OperationDetailsModel();
    this.inputDefinationModel = new InputDefinationModel();
    this.outputDefinationModel = new OutputDefinationMOdel();
    this.notificationmsg = [];
  }

  ngOnInit() {
    this.getBoundedContext();
    this.initiateServiceCalls();
  }
  createErrorData() {
    let errorData: any[] = [];
    let errorObj: any = {};
    errorObj['data'] = [];
    errorObj.data = this.notificationmsg;
    errorData.push(errorObj);
    this._notificationService.showerrorData('Error Message', errorData);
  }

  @Input('id')
  set id(id: string) {
    if (id) {
      let op = id.split('###');
      if (op.length === 2) {
        this.fetchOperationDefination(op[0], op[1]);
      }
    }
  }

  initiateServiceCalls() {
    this.fetchPrimitiveData();
  }

  fetchOperationDefination(serviceId: string, operationName: string) {
    this.notificationmsg = [];
    let responsedata: any;
    this.http
      .post('/api/dna/servicedefinition/findByServiceAndOperationName', {
        serviceId: serviceId,
        name: operationName
      })
      .subscribe(
        response => {
          responsedata = response;
        },
        err => {
          this.notificationmsg.push('Unable to connect to server');
          this.createErrorData();
        },
        () => {
          this.setResponseData(responsedata);
        }
      );
  }

  setResponseData(responsedata: any) {
    if (responsedata.success) {
      this.operationModel.setData(responsedata.response);
      this.inputDefinationModel.setData(responsedata.response);
      this.outputDefinationModel.setData(responsedata.response);
      this.onBoundedContextSelect({ id: this.operationModel.boundedContextId });
      this.onDomainSelect({});
    }
  }

  getBoundedContext() {
    let bcData: any;
    this.http.get('/api/dna/bcontext/findAll').subscribe(
      response => {
        bcData = response;
      },
      err => {
        this.notificationmsg.push('Unable to connect to server');
        this.createErrorData();
      },
      () => {
        this.operationModel.boundedContextData = bcData.response;
        this.operationModel.boundedContextId = this.operationModel.boundedContextData[0].id;
        this.onBoundedContextSelect(this.operationModel.boundedContextData[0]);
      }
    );
  }
  onBoundedContextSelect(bcdata: any) {
    this.notificationmsg = [];
    let responedata: any;
    this.http
      .post('/api/dna/domain/findByBContextId', { id: bcdata.id })
      .subscribe(
        response => {
          responedata = response;
        },
        err => {
          this.notificationmsg.push('Unable to connect to server');
          this.createErrorData();
        },
        () => {
          this.operationModel.domainData = responedata.response;
          this.operationModel.domainId = this.operationModel.domainData[0].id;
          this.onDomainSelect({});
        }
      );
  }

  onDomainSelect(ddata: any) {
    this.notificationmsg = [];
    let responedata: any;
    let req = {
      bContextId: this.operationModel.boundedContextId,
      domainId: this.operationModel.domainId
    };

    this.http
      .post('/api/dna/servicedefinition/findByBContextAndDomain', req)
      .subscribe(
        response => {
          responedata = response;
        },
        err => {
          this.notificationmsg.push('Unable to connect to server');
          this.createErrorData();
        },
        () => {
          this.operationModel.serviceData = responedata.response;
          this.fetchObjects();
        }
      );
  }

  fetchObjects() {
    let responsedata: any;

    this.http
      .get('/api/dna/objects/findByDomainId/' + this.operationModel.domainId)
      .subscribe(
        response => {
          responsedata = response;
        },
        err => {
          this.notificationmsg.push('Unable to connect to server');
          this.createErrorData();
        },
        () => {
          if (responsedata.success) {
            this.inputDefinationModel.setInputDataTypeData(responsedata);
            this.outputDefinationModel.setOutPutDataTypeData(responsedata);
          }
        }
      );
  }

  fetchPrimitiveData() {
    let responedata: any;
    this.http.get('/api/dna/primitive/findAll').subscribe(
      response => {
        responedata = response;
      },
      err => {},
      () => {
        if (responedata.response) {
          this.inputDefinationModel.setPrimitiveData(responedata.response);
        }
      }
    );
  }

  onInputTypeSelect(data: any) {
    this.inputDefinationModel.onInputTypeSelect(data);
  }

  onConsumerSelect(data: any) {
    this.validateinputdefination = this.operationModel.consumerType === '0';
  }

  onProducerSelect(data: any) {
    this.validateoutputdefination = this.operationModel.producerType === '0';
  }

  onSave() {
    this.saveOperation();
  }

  saveOperation() {
    this.notificationmsg = [];
    let reqbody = this.saveModel();
    this.loaderService.showLoader();
    let responsedata: any;
    this.http
      .post('/api/dna/servicedefinition/saveoperation', reqbody)
      .subscribe(
        response => {
          responsedata = response;
        },
        err => {
          this.loaderService.hideLoader();
          this.notificationmsg.push('Unable to connect to server');
          this.createErrorData();
          this.saveBtnEnable = true;
        },
        () => {
          this.onSaveOperation(responsedata);
          this.saveBtnEnable = true;
        }
      );
  }

  saveModel() {
    let reqbody: any = this.operationModel.toSaveJSON();

    if (this.operationModel.consumerType == '0') {
      delete reqbody.inputParams;
    } else {
      reqbody.inputParams = this.inputDefinationModel.inputDataParam;
    }

    if (this.operationModel.producerType == '0') {
      delete reqbody.outputParam;
    } else {
      reqbody.outputParam = this.outputDefinationModel.toSaveJson();
    }

    return reqbody;
  }

  onSaveOperation(resp: any) {
    this.notificationmsg = [];
    if (!resp.success && resp.errorMessage) {
      this.loaderService.hideLoader();
      this.notificationmsg.push(resp.errorMessage);
      this.createErrorData();
    } else {
      this.loaderService.hideLoader();
      this.notificationmsg.push('Operation defination saved successfully!');
      this._notificationService.showSuccessData(this.notificationmsg);
      let response = resp.response;
      this.id = response.operationId;
      this.resetData();
    }
  }

  onCancel() {
    this.resetData();
  }

  resetData() {
    this.operationModel.reset();
    this.inputDefinationModel.reset();
    this.inputDefinationModel.inputDataParam = [];
    this.outputDefinationModel.reset();
    this.reset.emit({ reset: true });
  }
}

export class OperationDetailsModel {
  boundedContextId: string;
  domainId: string;
  serviceId: string;
  operationName: string;
  operationUrl: string;
  methodType: string;
  consumerType: string;
  producerType: string;
  operationId: string;

  methodTypeData: any[];
  contentTypeData: any[];
  domainData: any[];
  boundedContextData: any[];
  serviceData: any[];

  constructor() {
    this.methodTypeData = [
      { methodType: 'GET', methodTypeId: '1' },
      { methodType: 'POST', methodTypeId: '2' },
      { methodType: 'PUT', methodTypeId: '3' },
      { methodType: 'DELETE', methodTypeId: '4' }
    ];
    this.contentTypeData = [
      { contentType: 'none', contentTypeId: '0' },
      { contentType: 'application/json', contentTypeId: '1' },
      { contentType: 'application/pdf', contentTypeId: '2' },
      { contentType: 'application/xml', contentTypeId: '3' }
    ];
    this.consumerType = '0';
    this.producerType = '0';
    this.domainData = [];
    this.serviceData = [];
  }

  setData(responsedata: any) {
    let opr = responsedata.operations[0];
    this.boundedContextId = responsedata.boundedContextId;
    this.domainId = responsedata.domainId;
    this.serviceId = responsedata.id;
    this.operationName = opr.operationName;
    this.operationUrl = opr.httpUrl;
    this.consumerType = opr.contentTypeId;
    this.producerType = opr.producerTypeId;
    this.methodType = opr.methodTypeId;
    this.operationId = opr.operationId;
  }

  reset() {
    this.boundedContextId = '';
    this.domainId = '';
    this.serviceId = '';
    this.operationName = '';
    this.operationUrl = '';
    this.consumerType = '0';
    this.producerType = '0';
    this.methodType = '1';
    this.domainData = [];
    this.serviceData = [];
    this.operationId = '';
  }

  toSaveJSON() {
    return {
      serviceId: this.serviceId,
      operationName: this.operationName,
      methodTypeId: this.methodType,
      consumerTypeId: this.consumerType,
      producerTypeId: this.producerType,
      httpUrl: this.operationUrl,
      operationId: this.operationId,
      inputParams: [],
      outputParam: {}
    };
  }
}

export class InputDefinationModel {
  inputType: string;
  inputName: string;
  inputDataType: string;
  collection: boolean;

  inputTypeData: any[];
  bindInputDataTypeData: any[];
  primitiveData: any[];
  inputDataTypeData: any[];

  inputDataParam: any[] = [];

  constructor() {
    this.inputTypeData = [
      { inputType: 'Request Body (JSON)', inputTypeId: '1' },
      { inputType: 'Request Parameters', inputTypeId: '2' },
      { inputType: 'Path Vairables', inputTypeId: '3' }
    ];
    this.inputType = '1';
    this.collection = false;
    this.inputDataParam = [];
    this.primitiveData = [];
    this.inputDataTypeData = [];
    this.bindInputDataTypeData = this.inputDataTypeData;
  }

  setPrimitiveData(data: any) {
    if (data) {
      this.primitiveData = data;
    }
  }

  setData(data: any) {
    let opr = data.operations[0];
    this.inputDataParam = opr.inputParamList;
  }

  setInputDataTypeData(data: any) {
    this.inputDataTypeData = data.response;
    this.updateInputDataTypeData();
  }

  onInputTypeSelect(data: any) {
    if (data.inputTypeId && data.inputTypeId != '1') {
      this.collection = false;
    }
    this.updateInputDataTypeData();
  }

  updateInputDataTypeData() {
    if (this.inputType != '1') {
      this.bindInputDataTypeData = this.primitiveData;
    } else {
      this.bindInputDataTypeData = this.inputDataTypeData;
    }
  }

  toSaveJson() {
    return {
      inputParamTypeId: this.inputType,
      inputParamName: this.inputName,
      inputParamType: this.inputDataType,
      collection: this.collection
    };
  }

  addInput() {
    if (
      this.inputName &&
      this.inputType &&
      this.inputDataType &&
      this.inputName.length > 0 &&
      this.inputType.length > 0 &&
      this.inputDataType.length > 0
    ) {
      this.inputDataParam.push(this.toSaveJson());
    }
  }

  removeInput(row: any) {
    let input = [];
    for (let i = 0; i < this.inputDataParam.length; i++) {
      let node = this.inputDataParam[i];
      if (
        !(
          node.inputParamName == row.inputParamName &&
          node.inputParamType == row.inputParamType
        )
      ) {
        input.push(node);
      }
    }

    this.inputDataParam = input;
  }

  reset() {
    this.inputType = '';
    this.inputName = '';
    this.inputDataType = '';
    this.collection = false;
    this.inputDataParam = [];
  }
}

export class OutputDefinationMOdel {
  outputName: string;
  outputDataType: string;
  collection: boolean;

  outputDataTypeData: any[] = [];

  setOutPutDataTypeData(data: any) {
    this.outputDataTypeData = data.response;
  }

  toSaveJson() {
    return {
      outputParamTypeId: '1',
      outputParamName: this.outputName,
      outputParamType: this.outputDataType,
      collection: this.collection
    };
  }
  setData(data: any) {
    let opr = data.operations[0];
    this.outputName = opr.outputParam.outputParamName;
    this.outputDataType = opr.outputParam.outputParamType;
    this.collection = opr.outputParam.collection;
  }

  reset() {
    this.outputName = '';
    this.outputDataType = '';
    this.collection = false;
  }
}
