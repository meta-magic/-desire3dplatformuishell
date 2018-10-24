import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoaderService, NotificationService } from 'platform-commons';
import { BoundedContextDefinitionService } from './bounded.context.definition.service';
@Component({
  selector: 'bounded-context',
  template: `
  <amexio-row>
  <amexio-column [size]=2>
  </amexio-column>
   <div class="loadingnav" *ngIf="loaderService.isLoading"></div>
  <amexio-column [size] =8>
   <amexio-form [form-name]="'validateForm'" [header]="true" 
   [show-error]="true" [footer-align]="'right'">
   <amexio-form-header>
      Bounded Context
  </amexio-form-header>
   <amexio-form-body>
    <amexio-row>
     
     <amexio-column [size] = 12 >
      <amexio-text-input
      field-label="Bounded Context Name"
      name="boundedContextModel.name"
      place-holder="Enter Bounded Context Name"
      icon-feedback="true"
      [allow-blank]="false"
      [enable-popover]="true"
      [error-msg] ="' Please Enter Bounded Context Name'"
      [(ngModel)]="boundedContextModel.name">
      </amexio-text-input>

     <amexio-textarea-input
      field-label="Description"
      name="boundedContextModel.description"
      [place-holder]="'Enter Description'"
      icon-feedback="true"
      [allow-blank]="true"
      [(ngModel)]="boundedContextModel.description"
       [rows]="'2'" [columns]="'2'">
     </amexio-textarea-input>
     </amexio-column>

    </amexio-row>
  </amexio-form-body>
  <amexio-form-action>
   
   <amexio-button
   [label]="'Cancel'"
   [icon]="'fa fa-close'"
   [type]="'secondary'"
   [size]="'default'"
   [tooltip]="'Cancel'" 
   (onClick)="reset()">
   </amexio-button>
   <amexio-button
   [label]="'Save'"
   [icon]="'fa fa-save'"
   [form-bind]="'validateForm'"
   [type]="'primary'"
   [size]="'default'"
   [tooltip]="'Save'" 
   [loading]="asyncFlag"
   (onClick)="saveBoundedContext()">
   </amexio-button>
   </amexio-form-action>
    </amexio-form>
<dna-notification></dna-notification>

</amexio-column>
</amexio-row>
<amexio-dialogue [show-dialogue]="isValidateForm" [message-type]="'error'" [closable]="true" [title]="'Error'" [type]="'alert'" [custom]="true" (close)="isValidateForm = !isValidateForm">
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
`
})
export class BoundedContextComponent implements OnInit {
  msgData: any[] = [];
  validationMsgArray: any = [];
  isValidateForm: boolean = false;
  asyncFlag: boolean;
  boundedContextModel: BoundedContextModel;

  constructor(
    public loaderService: LoaderService,
    private http: HttpClient,
    public _notificationService: NotificationService,
    private bs: BoundedContextDefinitionService
  ) {
    this.boundedContextModel = new BoundedContextModel();
  }

  ngOnInit() {}

  // SAVE BUTTON CLICK
  // saveClick() {
  //   this.validateFormFields();
  //   if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
  //     this.isValidateForm = true;
  //   } else {
  //     this.isValidateForm = false;
  //     this.saveBoundedContext();
  //   }
  // }

  // To Close Window
  okErrorBtnClick() {
    this.isValidateForm = false;
  }

  createErrorData() {
    let errorData: any[] = [];
    let errorObj: any = {};
    errorObj['data'] = [];
    errorObj.data = this.validationMsgArray;
    errorData.push(errorObj);
    this._notificationService.showerrorData('Error Message', errorData);
  }

  //Save bounded context and update list of bounded context
  saveBoundedContext() {
    let response: any;
    let bCDetails: any;
    this.asyncFlag = true;
    this.msgData = [];
    this.validationMsgArray = [];
    this.loaderService.showLoader();
    const requestJson = this.boundedContextModel;
    this.http.post('/api/dna/bcontext/save ', requestJson).subscribe(
      res => {
        response = res;
      },
      err => {
        this.validationMsgArray.push('Unable to connect to the server');
        // this.isValidateForm = true;
        this.createErrorData();
        this.loaderService.hideLoader();
      },
      () => {
        if (response.success) {
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
          this.msgData.push(response.successMessage);
          this._notificationService.showSuccessData(this.msgData);
          this.reset();
          this.asyncFlag = false;
          this.loaderService.hideLoader();
        }
        if (response.errorMessage) {
          this.validationMsgArray.push(response.errorMessage);
          // this.isValidateForm = true;
          this.createErrorData();
          this.asyncFlag = false;
          this.loaderService.hideLoader();
        }
      }
    );
  }

  //To Reset Data
  reset() {
    this.boundedContextModel = new BoundedContextModel();
  }

  //Validate Form Fields
  //   validateFormFields() {
  //     let isValid: boolean = false;
  //     this.validationMsgArray = [];
  //     if (this.boundedContextModel.name == '') {
  //       this.validationMsgArray.push('Invalid (Blank) Bounded Context Name.');
  //     }
  //   }
}

export class BoundedContextModel {
  name: string;
  description: string;
  constructor() {
    this.name = '';
    this.description = '';
  }
}

