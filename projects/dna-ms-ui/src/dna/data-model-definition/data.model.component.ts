import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  LoaderService,
  LocalStorageService,
  MessagingService
} from 'platform-commons';
import { NotificationService } from 'platform-commons';
@Component({
  selector: 'dna-data-model',
  template: `
  <amexio-row>
  <amexio-column [size]=3>
      <amexio-card [header]="true" [footer]="true" [show]="true" [body-height]="80" [footer-align]="'right'">
          <amexio-header>
               Models
          </amexio-header>
          <amexio-body>
              <amexio-tree-filter-view [data-reader]="'response'" [data]="objectTreeData" (nodeClick)="onObjectTreeClick($event)">
              </amexio-tree-filter-view>
          </amexio-body>
          <amexio-action>
           <amexio-button
                [label]="'New'"
                [type]="'secondary'"
                [size]="'default'"
                [icon]="'fa fa-plus fa-lg'"
                [tooltip]="'New'"
             (onClick)="openNewUi()">
          </amexio-button>
          </amexio-action>
      </amexio-card>
  </amexio-column>
  <amexio-column [size]=9>
       <ng-container *ngIf="!showCard">
       <amexio-card [header]="true"
                [footer]="false"
                [show]="true"
                [footer-align]="'right'"
                [body-height]="80">
                    <amexio-header>
                   Help Document
                    </amexio-header>
                    <amexio-body>
                    </amexio-body>
                </amexio-card>
      </ng-container>
     <ng-container *ngIf="showCard">
           <div class="loadingnav" *ngIf="loaderService.isLoading"></div>
 <amexio-form #modelform [form-name]="'validateForm'" [header]="true" [show-error]="false" [footer-align]="'right'" [body-height]="80">
          <amexio-form-header>
              Model Builder
          </amexio-form-header>
          <amexio-form-body>

              <amexio-tab-view  [closable]="false" (onClick)="onTabClick($event)">
     <amexio-tab title="Model"
     [active]="modelActiveTab">

                  <amexio-row>
                      <amexio-column [size]=6>
                          <amexio-dropdown [(ngModel)]="modelDefinition.bondedContextId" [place-holder]="'Select Bounded Context'" name="modelDefinition.bondedContextId"
                              [disabled]="disabledflag" [allow-blank]="false" [error-msg]="'Select Bounded Context'" [field-label]="'Bounded Context'"
                              [data]="boundedContextData" [display-field]="'name'" (onSingleSelect)="selectBoundedContext($event)"
                              [value-field]="'id'">
                          </amexio-dropdown>
                      </amexio-column>
                      <amexio-column [size]=6>
                          <amexio-dropdown [(ngModel)]="modelDefinition.domainId" [place-holder]="'Select Module'" name="modelDefinition.domainId"
                             [allow-blank]="false" [error-msg]="'Select Module'" [disabled]="disabledflag" [data]="domainData" [field-label]="'Module'" [display-field]="'name'"
                              (onSingleSelect)="onDomainSelect($event)" [value-field]="'id'">
                          </amexio-dropdown>
                      </amexio-column>
                      <amexio-column [size]=6>
                          <amexio-text-input field-label="Model Name" [pattern]="'^[a-zA-Z][a-zA-Z0-9]*$'" name="modelDefinition.name" place-holder="Enter Model Name" [(ngModel)]="modelDefinition.name"
                            (onBlur)="nameValidation()"  enable-popover="true" [disabled]="disabledflag" [allow-blank]="false" error-msg="Please enter Model name,it must be alphabetic only" icon-feedback="true">
                          </amexio-text-input>
                    <label *ngIf="hasModelNameValid" style="color: red">Model name should be in lowercase and single word.</label>
                      </amexio-column>
                      <amexio-column [size]=6>
                      <amexio-textarea-input [enable-popover]="true" [disabled]="disabledflag" [field-label]="'Description'" name="modelDefinition.description"
                      [(ngModel)]="modelDefinition.description" [place-holder]="'Enter Model Description'"
                      [allow-blank]="true" [error-msg]="'Enter Model Description'" [icon-feedback]="true"
                      [rows]="'2'" [columns]="'2'">
                  </amexio-textarea-input>
                      </amexio-column>
                  </amexio-row>

     </amexio-tab>
      <amexio-tab title="Fields" [active]="fieldActiveTab" [disabled] = "tabdisabledFlag">
                              <amexio-row>
                                  <amexio-column [size]=6>
                                      <amexio-radio-group name="objectTypeModel.objectType" [data-reader]="'response.data'" [display-field]="'objectTypeName'"
                                          [value-field]="'objectType'" [horizontal]="true" [data]="objectTypeData" [default-value]="objectTypeModel.objectType"
                                         [allow-blank]="false" (onSelection)="selectObjectType($event)">
                                      </amexio-radio-group>
                                  </amexio-column>
                                  <amexio-column [size]=6>
                                      <amexio-checkbox [field-label]="'Collection'" [(ngModel)]="objectTypeModel.collection">
                                      </amexio-checkbox>
                                  </amexio-column>
                                  <amexio-column [size]=6>
                                      <amexio-dropdown [(ngModel)]="objectTypeModel.objectTypeId" [place-holder]="'Select Type'" name="objectTypeModel.objectTypeId"
                                         [allow-blank]="false" [error-msg]="'Enter Object Type'" [data]="typeDataArray" [field-label]="'Type'"
                                          [display-field]="'typeName'" [value-field]="'id'">
                                      </amexio-dropdown>
                                  </amexio-column>
                                  <amexio-column [size]=6>
                                      <amexio-text-input field-label="Name" name="objectTypeModel.name" place-holder="Enter Name" error-msg="Please Enter Name"
                                       [allow-blank]="false"   enable-popover="true" [(ngModel)]="objectTypeModel.name" icon-feedback="true">
                                      </amexio-text-input>
                                  </amexio-column>
                                  <amexio-column [size]=6>
                                      <amexio-text-input field-label="Display Name" name="objectTypeModel.displayName" place-holder="Enter Display Name" error-msg="Please Enter Display Name"
                                      [allow-blank]="false"    enable-popover="true" [(ngModel)]="objectTypeModel.displayName" icon-feedback="true">
                                      </amexio-text-input>
                                  </amexio-column>
                                  <amexio-column [size]=6>
                                      <amexio-textarea-input [enable-popover]="true" [(ngModel)]="objectTypeModel.description" [field-label]="'Description'" name="objectTypeModel.description"
                                          [place-holder]="'Enter Description'" [allow-blank]="true" [error-msg]="'Enter Description'"
                                          [icon-feedback]="true" [rows]="'1'" [columns]="'2'">
                                      </amexio-textarea-input>
                                  </amexio-column>
                                  <amexio-column [size] = 12 >
                                  <ng-container *ngIf="hideIdFlag">
                                  <amexio-text-input
                                  field-label="fieldId"
                                  name="objectTypeModel.fieldId"
                                  place-holder=""
                                  icon-feedback="true"
                                  [(ngModel)]="objectTypeModel.fieldId">
                                  </amexio-text-input>
                                  </ng-container>
                                  </amexio-column>

                              </amexio-row>
                                <amexio-row>
                                 <amexio-column [size]="12">
<ng-container *ngIf="showgrid && structureData">
   <amexio-datagrid
    [page-size] ="10"
    [data]="structureData"
    (rowSelect)="onRowSelect($event)">
    <amexio-data-table-column [data-index]="'objectType'"
    [data-type]="'string'"
    [hidden]="true"
    [text]="'Object Type'">
</amexio-data-table-column>
<amexio-data-table-column [data-index]="'objectTypeLabel'"
    [data-type]="'string'"
    [hidden]="false"
    [text]="'Object Type'">
</amexio-data-table-column>
<amexio-data-table-column [data-index]="'objectTypeId'"
    [data-type]="'string'"
    [hidden]="true"
    [text]="'Type'">
</amexio-data-table-column>
<amexio-data-table-column [data-index]="'objectName'"
    [data-type]="'string'"
    [hidden]="false"
    [text]="'Type'">
</amexio-data-table-column>
<amexio-data-table-column [data-index]="'name'"
    [data-type]="'string'"
    [hidden]="false"
    [text]="'Name'">
</amexio-data-table-column>
<amexio-data-table-column [data-index]="'displayName'"
    [data-type]="'string'"
    [hidden]="false"
    [text]="'Display Name'">
</amexio-data-table-column>
<amexio-data-table-column [data-index]="'description'"
    [data-type]="'string'"
    [hidden]="false"
    [text]="'Description'">
</amexio-data-table-column>
<amexio-data-table-column [data-index]="'collection'"
[data-type]="'boolean'"
[hidden]="false"
[text]="'Collection'">
</amexio-data-table-column>
<amexio-data-table-column [data-index]="'fieldId'"
[data-type]="'string'"
[hidden]="true"
[text]="'fieldId'">
</amexio-data-table-column>
<amexio-data-table-column [width]="15" [data-index]="''" [data-type]="'string'" [hidden]="false" [text]="'Action'">
                                        <ng-template #amexioBodyTmpl let-column let-row="row">
                                            <span>
                                                <amexio-image style="color:red;" [icon-class]="'fa fa-minus-circle fa-2x'" [tooltip]="'Remove'" (onClick)="deleteObject(row)">
                                                </amexio-image>
                                            </span>
                                        </ng-template>
                                    </amexio-data-table-column>
</amexio-datagrid>
  </ng-container>
 </amexio-column>
                                </amexio-row>
                        </amexio-tab>
                   </amexio-tab-view>
          </amexio-form-body>
         <amexio-form-action>

              <amexio-button [label]="'Cancel'"     [icon]="'fa fa-close'" [type]="'secondary'" [size]="'default'" [tooltip]="'Cancel'" (onClick)="onCancelClick()">
              </amexio-button>

               <amexio-button [label]="saveLabel" [icon]="saveIcon"   [loading]="saveFlag" [type]="'primary'" [size]="'default'" [tooltip]="'Cancel'" (onClick)="onSaveButtonClick(modelform)">
              </amexio-button>
          </amexio-form-action>
      </amexio-form>
      </ng-container>
  </amexio-column>
<amexio-dialogue [show-dialogue]="isValidateForm" [message-type]="'error'" [closable]="true" [title]="'Error'" [type]="'alert'"
[custom]="true" (close)="isValidateForm = !isValidateForm">
<amexio-body>
  <ol>
      <li *ngFor="let msgObj of validationMsgArray let index=index">{{msgObj}}</li>
  </ol>
</amexio-body>
<amexio-action>
  <amexio-button type="primary" (onClick)="okErrorBtnClick()" [label]="'Ok'">
  </amexio-button>
</amexio-action>
</amexio-dialogue>
<dna-notification></dna-notification>

</amexio-row>

  <amexio-dialogue  [(show)]="migrationStatusDialogue"
                    [button-size]="'medium'"
                    [title]="'Confirm'"
                    [message]="'Please migrate project ?'"
                    [message-type]="'confirm'"
                    (actionStatus)="migrateProject($event)">
  </amexio-dialogue>
`
})
export class DataModelComponent implements OnInit {
  modelDefinition: ModelDefinition;
  objectTypeData: any;
  isValidateForm: boolean = false;
  domainData: any[] = [];
  boundedContextData: any[] = [];
  savedModel: any;
  msgData: any[];
  disabledflag: boolean;
  typeDataArray: any[] = [];
  objectFieldsArray: ObjectTypeModel[];
  objectTypeModel: ObjectTypeModel;
  objectTreeData: any[];
  validationMsgArray: any = [];
  objectStructureTreeData: any[] = [];
  saveFlag: boolean;
  structureData: any[] = [];
  showgrid: boolean = false;
  showCard: boolean;
  fieldActiveTab: boolean;
  domainId: String;
  fieldata: boolean = false;
  modelActiveTab: boolean;
  tabdisabledFlag: boolean;
  hideIdFlag: boolean;
  saveIcon: string = 'fa fa-save';
  saveLabel: string = 'Save';
  migrationStatusDialogue = false;
  hasModelNameValid: boolean = true;


  constructor(
    private http: HttpClient,
    public _notificationService: NotificationService,
    public loaderService: LoaderService,
    private msgService: MessagingService,
    private ls: LocalStorageService
  ) {
    this.showCard = false;
    this.modelDefinition = new ModelDefinition();
    this.objectTypeModel = new ObjectTypeModel();
    this.domainData = [];
    this.msgData = [];
    this.hideIdFlag = false;
    this.disabledflag = false;
    this.objectStructureTreeData = [];
    this.objectTreeData = [];

    this.loadObjectTreeData();
    this.objectFieldsArray = [];
    this.objectTypeData = {
      response: {
        data: [
          {
            objectTypeName: 'Object',
            objectType: '1'
          },
          {
            objectTypeName: 'Primitive Type',
            objectType: '2'
          }
        ]
      }
    };
  }

  onTabClick(event: any) {
    if (event.title == 'Model') {
      this.modelActiveTab = true;
      this.fieldActiveTab = false;
    } else {
      this.modelActiveTab = false;
      this.fieldActiveTab = true;
    }
  }
  //OPEN NEW MODEL DEFINITION UI
  openNewUi() {
    if (!this.ls.get('platformInfo').projectMigrated) {
      this.migrationStatusDialogue = true;
    } else {
      this.showCard = true;
      this.disabledflag = false;
      this.modelDefinition = new ModelDefinition();
      this.getBoundedContext();
      // this.objectTypeModel = new ObjectTypeModel();
      this.structureData = [];
      this.objectFieldsArray = [];
      this.objectStructureTreeData = [];
      this.modelActiveTab = true;
      this.fieldActiveTab = false;
      this.tabdisabledFlag = true;
      this.saveIcon = 'fa fa-save';
      this.saveLabel = 'Save';
    }
  }

  migrateProject(event: any) {
    if (event === 'ok') {
      let response: any;
      this.migrationStatusDialogue = false;
      this.http.get('/api/project/migration/project').subscribe((res: any) => {
        response = res;
      });
      this.msgService.sendMessage({
        path: 'home/codepipeline/task-ui',
        title: 'Task Details'
      });
    } else this.migrationStatusDialogue = false;
  }

  //LOAD DEFAULT DATA
  // loadDefaultData(id: any) {
  //   if (this.objectTypeModel.objectType == '1') {
  //     let objectData: any;
  //     this.http.get('/api/dna/objects/findByDomainId'+id).subscribe(
  //       response => {
  //         objectData = response;
  //       },
  //       err => {
  //       },
  //       () => {
  //         if (objectData.response) {
  //           this.typeDataArray = objectData.response;
  //         }
  //       }
  //     );
  //   }
  // }

  ngOnInit() {
    this.getBoundedContext();
  }

  createErrorData() {
    let errorData: any[] = [];
    let errorObj: any = {};
    errorObj['data'] = [];
    errorObj.data = this.validationMsgArray;
    errorData.push(errorObj);
    this._notificationService.showerrorData('Error Message', errorData);
  }

  createInvalidCompErrorData() {
    let errorData: any[] = [];
    let errorObj: any = {};
    errorObj['data'] = [];
    errorObj.data = this.validationMsgArray;
    errorData.push(errorObj);
    this._notificationService.showerrorData('Invalid Component', errorData);
  }

  //LOAD OBJECT LIST FROM DB
  loadObjectTreeData() {
    let objectListData: any;
    this.http.get('/api/dna/objects/findAll').subscribe(
      response => {
        objectListData = response;
      },
      err => {
        this.validationMsgArray.push('Unable to connect to server');
        // this.isValidateForm = true;
        this.createErrorData();
      },
      () => {
        this.objectTreeData = objectListData;
      }
    );
  }

  getBoundedContext() {
    let bcData: any;

    this.http.get('/api/dna/bcontext/findAll').subscribe(
      response => {
        bcData = response;
      },
      err => {
        this.validationMsgArray.push('Unable to connect to server');
        // this.isValidateForm = true;
        this.createErrorData();
      },
      () => {
        this.boundedContextData = bcData.response;
        this.modelDefinition.bondedContextId = this.boundedContextData[0].id;
        this.selectBoundedContext(this.boundedContextData[0]);
      }
    );
  }

  //SELECT BOUNDED CONTEXT AND LOAD RELATED DOMAIN
  selectBoundedContext(boundedContentObj: any) {
    let domainListData: any;
    let requestJson = {
      id: boundedContentObj.id
    };

    this.http.post('/api/dna/domain/findByBContextId', requestJson).subscribe(
      response => {
        domainListData = response;
      },
      err => {
        this.validationMsgArray.push('Unable to connect to server');
        // this.isValidateForm = true;
        this.createErrorData();
      },
      () => {
        this.domainData = domainListData.response;
        this.modelDefinition.domainId = this.domainData[0].id;
        this.domainId = this.modelDefinition.domainId;
      }
    );
  }

  //This METHOD IS USED FOR OBJECT TYPE SELECTION ON RADIO CHANGE
  selectObjectType(objectType: any) {
    if (!this.objectTypeModel) {
      this.objectTypeModel = new ObjectTypeModel();
    }
    this.objectTypeModel.objectType = objectType.objectType;
    this.loadObjectTypeDropDown();
  }

  //TO ADD FIELD IN TREE.IF OBJECT THEN RETRIVE FROM DB AND ADD TO TREE
  onFieldSave(modelDefinition: ModelDefinition) {
    let modelObject: any;
    this.saveFlag = true;
    this.loaderService.showLoader();
    let flag: boolean = false;
    let localObjectFieldsArray: ObjectTypeModel[];
    localObjectFieldsArray = [];
    // if (this.objectFieldsArray && this.objectFieldsArray.length >= 1) {
    //   this.objectFieldsArray.forEach(objectField => {
    //     if (objectField.name === this.objectTypeModel.name) {
    //       this.validationMsgArray.push(
    //         'Duplicate field name ' +
    //           '' +
    //           this.objectTypeModel.name +
    //           '' +
    //           ' found'
    //       );
    //       this.isValidateForm = true;
    //       this.saveFlag = false;

    //       flag = true;
    //     }
    //   });
    // }
    let localStructureData: any[] = [];
    localStructureData = Object.assign([], this.structureData);
    localStructureData.push(this.objectTypeModel);

    localStructureData.forEach(fieldObject => {
      if (fieldObject.fieldId === this.objectTypeModel.fieldId) {
        localObjectFieldsArray.push(this.objectTypeModel);
      } else {
        localObjectFieldsArray.push(fieldObject);
      }
    });

    // if (!flag) {
    // this.objectFieldsArray.push(this.objectTypeModel);
    // this.modelDefinition.objectFields = this.objectFieldsArray;
    // if (localObjectFieldsArray && localObjectFieldsArray.length == 0) {
    //   this.modelDefinition.objectFields = this.objectFieldsArray;
    // } else {
    //   this.modelDefinition.objectFields = localObjectFieldsArray;
    // }

    this.modelDefinition.objectFields = localObjectFieldsArray;
    this.msgData = [];
    const requestJson = this.modelDefinition;

    this.http.post('/api/dna/objects/save', requestJson).subscribe(
      response => {
        modelObject = response;
      },
      err => {
        this.validationMsgArray.push('Unable to connect to server');
        // this.isValidateForm = true;
        this.createErrorData();
        this.loaderService.hideLoader();
      },
      () => {
        if (!modelObject.success) {
          this.validationMsgArray.push(modelObject.errorMessage);
          // this.isValidateForm = true;
          this.createErrorData();
          this.saveFlag = false;
          this.loaderService.hideLoader();
        }
        if (!modelObject.success && modelObject.errors) {
          modelObject.errors.forEach((error: any, index: any) => {
            this.validationMsgArray.push(error);
            // this.isValidateForm = true;
          });
          this.createErrorData();
          this.saveFlag = false;
          this.loaderService.hideLoader();
        }
        if (modelObject.success) {
          let modelObjectRes = modelObject.response;
          if (modelObjectRes && modelObjectRes.id) {
            this.modelDefinition.id = modelObjectRes.id;
          }
          if (modelObjectRes && modelObjectRes.treeDTOs) {
            this.objectStructureTreeData = modelObjectRes.treeDTOs;
          }
          this.showgrid = true;
          this.objectTypeModel = new ObjectTypeModel();
          this.typeDataArray = [];
          this.getModelStructureData(modelObjectRes.id);
          this.msgData.push('Model Field Saved Successfully');
          this._notificationService.showSuccessData(this.msgData);
          this.saveFlag = false;
          this.loaderService.hideLoader();
          this.disabledflag = true;
          this.saveIcon = 'fa fa-save';
          this.saveLabel = 'Save';
          this.objectTypeModel.objectType = '2';
          this.loadObjectTypeDropDown();
          // this.objectTreeData.response = modelObject.response.projectTreedtos;
          // this.modelDefinition.objectFields = [];
        }
      }
    );
    // }
  }

  //TO ADD FIELD IN TREE.IF OBJECT THEN RETRIVE FROM DB AND ADD TO TREE
  onSave(modelform: any) {
    let modelObject: any;
    this.saveFlag = true;
    this.msgData = [];
    this.loaderService.showLoader();
    let flag: boolean = false;
    // this.objectFieldsArray.push(this.objectTypeModel);
    // this.modelDefinition.objectFields = this.objectFieldsArray;
    const requestJson = this.modelDefinition;

    this.http.post('/api/dna/objects/save', requestJson).subscribe(
      response => {
        modelObject = response;
      },
      err => {
        this.validationMsgArray.push('Unable to connect to server');
        // this.isValidateForm = true;
        this.createErrorData();
        this.loaderService.hideLoader();
      },
      () => {
        if (!modelObject.success) {
          this.validationMsgArray.push(modelObject.errorMessage);
          // this.isValidateForm = true;
          this.createErrorData();
          this.saveFlag = false;
          this.loaderService.hideLoader();
        }
        if (!modelObject.success && modelObject.errors) {
          modelObject.errors.forEach((error: any, index: any) => {
            this.validationMsgArray.push(error);
            // this.isValidateForm = true;
          });
          this.createErrorData();
          this.saveFlag = false;
          this.loaderService.hideLoader();
        }
        if (modelObject.success) {
          let modelObjectRes = modelObject.response;
          if (modelObjectRes && modelObjectRes.id) {
            this.modelDefinition.id = modelObjectRes.id;
          }
          if (modelObjectRes && modelObjectRes.treeDTOs) {
            this.objectStructureTreeData = modelObjectRes.treeDTOs;
          }
          // this.showgrid = true;
          // this.objectTypeModel = new ObjectTypeModel();
          this.getModelStructureData(modelObjectRes.id);
          // this.objectTypeModel.objectType = '';
          // this.typeDataArray = [];
          this.msgData.push('Model Saved Successfully');
          this._notificationService.showSuccessData(this.msgData);
          this.saveFlag = false;
          this.loaderService.hideLoader();
          this.disabledflag = true;
          this.tabdisabledFlag = false;
          this.fieldActiveTab = true;
          this.modelActiveTab = false;
          // this.objectTreeData.response = modelObject.response.projectTreedtos;
          // this.modelDefinition.objectFields = [];
          this.loadObjectTreeData();
        }
      }
    );
  }
  // onSaveModel(modelform:any) {

  // }

  // onSaveFields() {

  // }

  //On Save Button Click
  onSaveButtonClick(modelform: any) {
    if (this.tabdisabledFlag == true) {
      // this.onSaveModel(modelform);
      let isValid: boolean = false;
      this.validationMsgArray = [];
      let invalidModelFields: any;
      invalidModelFields = modelform.getErrorMsgData();
      // this.validateFormFields();
      invalidModelFields.forEach((obj: any) => {
        if (obj.label == 'Bounded Context') {
          this.validationMsgArray.push('Please Select Bounded Context');
        }
        if (obj.label == 'Domain') {
          this.validationMsgArray.push('Please Select Domain');
        }
        if (obj.label == 'Model Name' ) {
          this.validationMsgArray.push(
            'Please enter Model name,it must be alphabetic only'
          );
        }
      });
      if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
        this.createInvalidCompErrorData();
      } else {
        this.onSave(this.modelDefinition);
      }
    } else {

      let isValid: boolean = false;
      this.validationMsgArray = [];
      let invalidFields: any;
      invalidFields = modelform.getErrorMsgData();
      // this.validateFormFields();
      invalidFields.forEach((obj: any) => {
        if (obj.label == 'Type') {
          this.validationMsgArray.push('Please Select Type');
        }
        if (obj.label == 'Name') {
          this.validationMsgArray.push('Please Enter Name');
        }
        if (obj.label == 'Display Name') {
          this.validationMsgArray.push('Please Enter Display Name');
        }
      });
      if(this.objectTypeModel.objectType==''){
        this.validationMsgArray.push('Please Select Object Type');
      };
      if(this.objectTypeModel.objectTypeId==''){
        this.validationMsgArray.push('Please Select Type');
      }
      if (this.objectTypeModel.name) {
        let trimmedName = this.objectTypeModel.name.replace(/\s/g, '');
        if (this.objectTypeModel.name != trimmedName) {
          this.validationMsgArray.push(
            'Invalid Field Name, white spaces are not allowed!'
          );
        }
      }
      if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
        // this.isValidateForm = true;
        // return;
        this.createInvalidCompErrorData();
      } else {
        // this.isValidateForm = false;
        this.onFieldSave(this.modelDefinition);
      }
    }
  }
    nameValidation() {
    if (
     this.modelDefinition.name.split(' ').length == 1 &&
      this.modelDefinition.name != ''
    ) {
      this.hasModelNameValid = false;
      let i: number = 0;
      let character: string = '';
      while (i < this.modelDefinition.name.length) {
        character = this.modelDefinition.name.charAt(i);
               
        if (character == character.toUpperCase()) {
          this.hasModelNameValid = true;
        }
        i++;
      }
    } else {
      this.hasModelNameValid = true;
    }
  }


  //ON CANCEL BUTTON CLICK
  onCancelClick() {
    this.modelDefinition = new ModelDefinition();
    this.objectTypeModel = new ObjectTypeModel();
    this.objectFieldsArray = [];
    this.objectTypeModel.objectType = '';
    this.objectStructureTreeData = [];
    this.structureData = [];
    this.disabledflag = false;
    this.showgrid = false;
    this.modelActiveTab = true;
    this.fieldActiveTab = false;
    this.tabdisabledFlag = true;
    this.saveIcon = 'fa fa-save';
    this.saveLabel = 'Save';
  }

  getModelStructureData(id: any) {
    let gridData: any;
    this.http.get('/api/dna/objects/findById/' + id).subscribe(
      response => {
        gridData = response;
      },
      err => {
        this.validationMsgArray.push('Unable to connect to server');
        this.isValidateForm = true;
      },
      () => {
        if (gridData.success && gridData.response) {
          this.structureData = gridData.response.objectFields;
          this.savedModel = gridData.response;
        } else {
          this.validationMsgArray.push(gridData.errorMessage);
          // this.isValidateForm = true;
          this.createErrorData();
        }
      }
    );
  }

  //THIS CODE IS USED FOR OBJECT TREE CLICK RETRIVE DATA FROM DB
  onObjectTreeClick(nodeModelData: any) {
    if (nodeModelData.id) {
      let objectsData: any;
      this.http.get('/api/dna/objects/findById/' + nodeModelData.id).subscribe(
        response => {
          objectsData = response;
        },
        err => {
          this.validationMsgArray.push('Unable to connect to server');
          // this.isValidateForm = true;
          this.createErrorData();
        },
        () => {
          if (objectsData.success && objectsData.response) {
            let objectDataResp = objectsData.response;
            this.modelDefinition.bondedContextId =
              objectDataResp.bondedContextId;
            let bcjson = {
              id: objectDataResp.bondedContextId
            };
            this.selectBoundedContext(bcjson);
            this.showCard = true;
            this.modelDefinition.domainId = objectDataResp.domainId;
            this.modelDefinition.name = objectDataResp.name;
            this.modelDefinition.id = objectDataResp.id;
            this.modelDefinition.description = objectDataResp.description;
            this.objectFieldsArray = objectDataResp.objectFields;
            this.disabledflag = true;
            this.modelActiveTab = true;
            this.fieldActiveTab = false;
            this.tabdisabledFlag = false;
            this.showgrid = true;
            this.getModelStructureData(nodeModelData.id); //Temp
            this.objectTypeModel = new ObjectTypeModel();
          }
        }
      );
    }
  }
  onDomainSelect(data: any) {
    this.domainId = data.id;
  }

  //On Grid Row Select
  onRowSelect(data: any) {
    this.saveIcon = 'fa fa-pencil';
    this.saveLabel = 'Update';
    this.objectTypeModel.objectType = data.objectType;
    this.objectTypeModel.fieldId = data.fieldId;
    this.loadObjectTypeDropDown();
    this.objectTypeModel.objectTypeId = data.objectTypeId;
    this.objectTypeModel.name = data.name;
    this.objectTypeModel.displayName = data.displayName;
    this.objectTypeModel.description = data.description;
    this.objectTypeModel.collection = data.collection;
    this.objectTypeModel.update = true;
  }

  // To Close Window
  okErrorBtnClick() {
    this.isValidateForm = false;
    this.validationMsgArray = [];
  }

  //THIS METHOD USED FOR LOAD THE OBJECT TYPE DROPDOWN
  loadObjectTypeDropDown() {
    this.typeDataArray = [];
    if (this.objectTypeModel.objectType == '2') {
      let objectData: any;
      this.http.get('/api/dna/primitive/findAll').subscribe(
        response => {
          objectData = response;
        },
        err => {
          this.validationMsgArray.push('Unable to connect to server');
          // this.isValidateForm = true;
          this.createErrorData();
        },
        () => {
          if (objectData.response) {
            this.typeDataArray = objectData.response;
          }
        }
      );
    } else if (this.objectTypeModel.objectType == '1') {
      let objectData: any;
      this.http
        .get('/api/dna/objects/findByDomainId/' + this.domainId)
        .subscribe(
          response => {
            objectData = response;
          },
          err => {
            this.validationMsgArray.push('Unable to connect to server');
            // this.isValidateForm = true;
            this.createErrorData();
          },
          () => {
            if (objectData.response) {
              //  this.typeDataArray = objectData.response;
              const objArray = objectData.response;
              objArray.forEach((obj: any, index: number) => {
                if (obj.id === this.savedModel.id) {
                  objArray.splice(index, 1);
                }
              });
              this.typeDataArray = objArray;
            }
          }
        );
    }
  }

  //Validate Form Fields
  validateFormFields() {
    let isValid: boolean = false;
    this.validationMsgArray = [];
    if (this.modelDefinition.bondedContextId == '') {
      this.validationMsgArray.push('Invalid (Blank) Bounded Context.');
    }
    if (this.modelDefinition.description == '') {
      this.validationMsgArray.push('Invalid (Blank) Description.');
    }
    if (this.modelDefinition.name == '') {
      this.validationMsgArray.push('Invalid (Blank) Model Name.');
    }
    if (this.modelDefinition.domainId == '') {
      this.validationMsgArray.push('Invalid (Blank) Domain Name.');
    }
    if (this.modelDefinition.name) {
      let trimmedName = this.modelDefinition.name.replace(/\s/g, '');
      if (this.modelDefinition.name != trimmedName) {
        this.validationMsgArray.push(
          'Invalid Model Name, white spaces are not allowed!'
        );
      }
    }
  }

  validateObjectFields() {
    let isValid: boolean = false;
    this.validationMsgArray = [];
    if (this.objectTypeModel.name == '') {
      this.validationMsgArray.push('Invalid (Blank) Object Name.');
    }
    if (this.objectTypeModel.objectTypeId == '') {
      this.validationMsgArray.push('Invalid (Blank) Object Type.');
    }
    if (this.objectTypeModel.displayName == '') {
      this.validationMsgArray.push('Invalid (Blank) Display Name.');
    }
    if (this.objectTypeModel.description == '') {
      this.validationMsgArray.push('Invalid (Blank) Description.');
    }
    if (this.objectTypeModel.name) {
      let trimmedName = this.objectTypeModel.name.replace(/\s/g, '');
      if (this.objectTypeModel.name != trimmedName) {
        this.validationMsgArray.push(
          'Invalid Field Name, white spaces are not allowed!'
        );
      }
    }
  }

  //To Remove Object
  deleteObject(row: any) {
    let response: any;
    let requestJson = {
      fieldId: row.fieldId,
      modelId: this.modelDefinition.id
    };
    this.http.post('/api/dna/objects/delete', requestJson).subscribe(
      res => {
        response = res;
      },
      err => {
        this.validationMsgArray.push('Unable to connect to server');
        // this.isValidateForm = true;
        this.createErrorData();
      },
      () => {
        if (response.success) {
          this.msgData.push(response.successMessage);
          this.showgrid = true;
          this.saveIcon = 'fa fa-save';
          this.saveLabel = 'Save';
          this.objectTypeModel = new ObjectTypeModel();
          this.getModelStructureData(this.modelDefinition.id); //Temp
        }
      }
    );
  }
}
//Model Definition Object Save In DB
export class ModelDefinition {
  id: string;
  bondedContextId: string;
  domainId: string;
  name: string;
  description: string;
  designComplete: boolean;
  objectFields: ObjectTypeModel[];

  constructor() {
    this.bondedContextId = '';
    this.domainId = '';
    this.name = '';
    this.description = '';
    this.designComplete = false;
    this.objectFields = [];
    this.id = '';
  }
}

//This Model for Field Creation in Model
export class ObjectTypeModel {
  fieldId: string;
  objectType: string;
  objectTypeId: string;
  name: string;
  objectName: string;
  displayName: string;
  collection: boolean;
  collectionId: string;
  description: string;
  update: boolean;

  constructor() {
    this.fieldId = '';
    this.objectType = '';
    this.objectTypeId = '';
    this.name = '';
    this.objectName = '';
    this.displayName = '';
    this.collection = false;
    this.collectionId = 'collectionId';
    this.description = '';
    this.update = false;
  }
}
