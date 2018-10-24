import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoaderService, LocalStorageService, NotificationService } from 'platform-commons';
import { ActivatedRoute } from '@angular/router';
import { BoundedContextDefinitionService } from '../module/bounded.context.definition.service';
@Component({
  selector: 'dna-domain',
  template: `
  <amexio-row>
  <amexio-column [size] =2>
  </amexio-column>
   <amexio-column [size] =8>
      <div class="loadingnav" *ngIf="loaderService.isLoading"></div>
<amexio-form [form-name]="'validateForm'" [header]="true" 
   [show-error]="true" [footer-align]="'right'">
    <amexio-form-header>
       Module
    </amexio-form-header>
    <amexio-form-body>
     <amexio-row>
     <amexio-column [size] = 12 >
      <ng-container *ngIf="bs.bcTextflag">
      <amexio-text-input
       field-label="Bounded Context Name"
       name="BContextName"
       place-holder=""
       [allow-blank]="true"
       icon-feedback="true"
       [disabled]="true"
       [(ngModel)]="BContextName">
       </amexio-text-input>
       </ng-container>
       </amexio-column>

            <amexio-column [size] = 12>
            <ng-container *ngIf="bs.bcDropdownflag"> 
       <amexio-dropdown 
                  [place-holder]="'Select Bounded Context'"
                  name="domainModel.BcontextId"
                  [data-reader]="'response'"
                  [field-label]="'Bounded Context'"
                  [search]="true"
                  [allow-blank]="false"
                  [error-msg] ="'Please Select Bounded Context'"
                  [http-url]="'/api/dna/bcontext/findAll'"
                  [http-method]="'get'"
                  [display-field]="'name'"
                  [value-field]="'id'"
                  (onSingleSelect)="onBoundedContextSelect($event)"
                  [(ngModel)]="domainModel.BcontextId">
          </amexio-dropdown>
          </ng-container>
       </amexio-column>
       
      <amexio-column [size] = 12>
      <amexio-text-input
       field-label="Module Name"
       name="domainModel.name"
       place-holder="Enter Module Name"
       icon-feedback="true"
       [allow-blank]="false"
       [disabled]="bs.disabledflag"
       [(ngModel)]="domainModel.name">
      </amexio-text-input>
      </amexio-column>

      <amexio-column [size] = 12>
      <amexio-textarea-input
       field-label="Description"
       name="domainModel.description"
       place-holder="Enter Description"
       icon-feedback="true"
       [disabled]="bs.disabledflag"
       [allow-blank]="true"
       [(ngModel)]="domainModel.description"
       [rows]="'2'" [columns]="'2'">
      </amexio-textarea-input>
      </amexio-column>

      <amexio-column [size] = 12 >
      <ng-container *ngIf="hideIdFlag"> 
      <amexio-text-input
      field-label="BCId"
      name="domainModel.BcontextId"
      place-holder=""
      icon-feedback="true"
      [(ngModel)]="domainModel.BcontextId">
      </amexio-text-input>
      </ng-container>
      </amexio-column>

     </amexio-row>
    </amexio-form-body>
     <amexio-form-action>
         <ng-container *ngIf="bs.domainBtnflag">
    <amexio-button
    [label]="'Cancel'"
    [type]="'secondary'"
    [size]="'default'"
    [icon]="'fa fa-close'"
    [tooltip]="'Cancel'" 
    (onClick)="cancelClick()">
    </amexio-button>
    </ng-container>
    <ng-container *ngIf="bs.domainBtnflag">
    <amexio-button
    [label]="'Save'"
    [icon]="'fa fa-save'"
    [loading]="asyncFlag"
    [type]="'primary'"
    [form-bind]="'validateForm'"
    [size]="'default'"
    [tooltip]="'Save'" 
    (onClick)="AddDomainData()">
    </amexio-button>
    </ng-container>
  </amexio-form-action>
    </amexio-form>
<dna-notification></dna-notification>

</amexio-column>
</amexio-row>
<!--<amexio-dialogue [show-dialogue]="isValidateForm" [message-type]="'error'" [closable]="true" [title]="'Error'" [type]="'alert'" [custom]="true" (close)="isValidateForm = !isValidateForm">
<amexio-body>
    <ol>
        <li *ngFor="let msgObj of validationMsgArray let index=index">{{msgObj}}</li>
    </ol>
</amexio-body>
<amexio-action>
    <amexio-button type="primary" (onClick)="okErrorBtnClick()" [label]="'Ok'">
    </amexio-button>
</amexio-action>
</amexio-dialogue>-->
  `
})
export class DomainComponent implements OnInit {
  domainData: any;
  domainModel: DomainModel;
  validationMsgArray: any = [];
  isValidateForm: boolean = false;
  msgData: any[];
  bcContextId: string;
  hideIdFlag: boolean;
  asyncFlag: boolean;
  BContextName: string;
  domainId: String;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private ls: LocalStorageService,
    public loaderService: LoaderService,
    public _notificationService: NotificationService,
    public bs: BoundedContextDefinitionService
  ) {
    this.domainModel = new DomainModel();
    this.hideIdFlag = false;
    this.msgData = [];
    this.domainData = [];
    // this.getLocalStorageData();
  }

  createErrorData() {
    let errorData: any[] = [];
    let errorObj: any = {};
    errorObj['data'] = [];
    errorObj.data = this.validationMsgArray;
    errorData.push(errorObj);
    this._notificationService.showerrorData('Error Message', errorData);
  }

  //To get Local Storage Data(BC)
  getLocalStorageData() {
    this.bcContextId = '';
    this.bcContextId = this.ls.get('BContextId');
    this.domainId = this.ls.get('domainId');
  }

  // Save Button Click
  // saveClick() {
  //   this.validateFormFields();
  //   if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
  //     this.isValidateForm = true;
  //   } else {
  //     this.isValidateForm = false;
  // this.AddDomainData();
  // }
  // }

  //Validate Form Fields
  // validateFormFields() {
  //   let isValid: boolean = false;
  //   this.validationMsgArray = [];
  //   if (this.domainModel.name == '') {
  //     this.validationMsgArray.push('Invalid (Blank) Domain Name.');
  //   }
  // }

  // To Close Window
  // okErrorBtnClick() {
  //   this.isValidateForm = false;
  // }

  //To get Existing BC and Domain
  ngOnInit(): void {
    this.route.params.forEach(p => {
      this.getLocalStorageData();
      if (this.bcContextId == null || this.bcContextId == '') {
        this.domainModel = new DomainModel();
      } else {
        this.getBoundeContextData();
      }

      if (this.domainId == null || this.domainId == '') {
        this.domainModel = new DomainModel();
      } else {
        this.getDomainData();
      }
    });
  }

  //Open domain screen under selected Bounded Context
  setBoundedContextId(domainData: any) {
    this.domainModel.BcontextId = domainData.BcontextId;
  }

  // Save domain data and display it in  datatable
  AddDomainData() {
    let domainResponse: any;
    this.asyncFlag = true;
    this.msgData = [];
    this.validationMsgArray = [];
    this.loaderService.showLoader();
    const requestJson = {
      name: this.domainModel.name,
      description: this.domainModel.description,
      boundedContextId: this.domainModel.BcontextId
    };
    this.http.post('/api/dna/domain/save ', requestJson).subscribe(
      res => {
        domainResponse = res;
      },
      err => {
        this.validationMsgArray.push('Unable to connect to the server');
        // this.isValidateForm = true;
        this.createErrorData();
        this.loaderService.hideLoader();
      },
      () => {
        if (domainResponse.success) {
          let bCDetails: any;
          this.bs.getBContextList().subscribe(
            response => {
              bCDetails = response;
            },
            error => {
              this.validationMsgArray.push('Unable to connect to the server');
              // this.isValidateForm = true;
              this.createErrorData();
            },
            () => {
              this.bs.bContextList = bCDetails;
            }
          );
          this.domainData.push({
            name: domainResponse.response.name,
            description: domainResponse.response.description
          });
          this.msgData.push(domainResponse.successMessage);
          this._notificationService.showSuccessData(this.msgData);
          this.asyncFlag = false;
          this.loaderService.hideLoader();
        }
        if (domainResponse.errorMessage) {
          this.validationMsgArray.push(domainResponse.errorMessage);
          // this.isValidateForm = true;
          this.createErrorData();
          this.asyncFlag = false;
          this.loaderService.hideLoader();
        }
      }
    );
    this.reset();
  }

  cancelClick() {
    this.reset();
  }
  //Reset The Domain Data
  reset() {
    this.domainModel.name = '';
    this.domainModel.description = '';
    this.domainModel.BcontextId = '';
  }

  // Get boundeContext details
  getBoundeContextData() {
    let boundedContextDetails: any;
    let requestJson = {
      id: this.bcContextId
    };
    this.http.post('/api/dna/bcontext/findById', requestJson).subscribe(
      response => {
        boundedContextDetails = response;
      },
      err => {
        this.validationMsgArray.push('Unable to connect to the server');
        // this.isValidateForm = true;
        this.createErrorData();
      },
      () => {
        if (boundedContextDetails.success) {
          this.BContextName = boundedContextDetails.response.name;
          this.domainModel.BcontextId = boundedContextDetails.response.id;
          let domainData: any;
          let requestJson = {
            id: this.domainModel.BcontextId
          };
          this.http
            .post('/api/dna/domain/findByBContextId', requestJson)
            .subscribe(
              response => {
                domainData = response;
              },
              err => {
                this.validationMsgArray.push('Unable to connect to the server');
                // this.isValidateForm = true;
                this.createErrorData();
              },
              () => {
                if (domainData.success) {
                  this.domainData = domainData.response;
                }
                if (domainData.errorMessage) {
                  this.validationMsgArray.push(domainData.errorMessage);
                  // this.isValidateForm = true;
                  this.createErrorData();
                }
              }
            );
        }
        if (boundedContextDetails.errorMessage) {
          this.validationMsgArray.push(boundedContextDetails.errorMessage);
          // this.isValidateForm = true;
          this.createErrorData();
        }
      }
    );
  }

  getDomainData() {
    let domainDetails: any;

    let requestJson = {
      id: this.domainId
    };
    this.http.post('/api/dna/domain/findById', requestJson).subscribe(
      response => {
        domainDetails = response;
      },
      err => {
        this.validationMsgArray.push('Unable to connect to the server');
        // this.isValidateForm = true;
        this.createErrorData();
      },
      () => {
        if (domainDetails.success) {
          this.domainModel.name = domainDetails.response.name;
          this.domainModel.description = domainDetails.response.description;
        }
        if (domainDetails.errorMessage) {
          this.validationMsgArray.push(domainDetails.errorMessage);
          // this.isValidateForm = true;
        }
      }
    );
  }
  onBoundedContextSelect(data: any) {
    let domainData: any;
    let requestJson = {
      id: data.id
    };
    this.http.post('/api/dna/domain/findByBContextId', requestJson).subscribe(
      response => {
        domainData = response;
      },
      err => {
        this.validationMsgArray.push('Unable to connect to the server');
        // this.isValidateForm = true;
        this.createErrorData();
      },
      () => {
        if (domainData.success) {
          this.domainData = domainData.response;
        }
        if (domainData.errorMessage) {
          this.validationMsgArray.push(domainData.errorMessage);
          // this.isValidateForm = true;
          this.createErrorData();
        }
      }
    );
  }
}

export class DomainModel {
  name: string;
  description: string;
  // BContextName: string;
  BcontextId: string;

  constructor() {
    this.name = '';
    this.description = '';
    // this.BContextName = '';
    this.BcontextId = '';
  }
}
