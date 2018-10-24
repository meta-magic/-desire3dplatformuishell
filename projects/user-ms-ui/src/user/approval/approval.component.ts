/**
 * Created by Ashwini on 20/2/18.
 */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from 'platform-commons';
import { NotificationService } from 'platform-commons';

@Component({
  selector: 'approval-user',
  template: `
    <amexio-row>
    <amexio-column [size]=12>
                   <div class="loadingnav" *ngIf="loaderService.isLoading"></div>

                         <amexio-tab-view [closable]="false"  (onClick)="onTabClick($event)">
<amexio-tab title="Pending Requests" [active]="true">
 <amexio-row>
        <amexio-column [size] =12 >
            <amexio-datagrid  title=""
                [data]="pendingData"
                [page-size] = "10"
                [enable-data-filter]="false">
        <amexio-data-table-column [data-index]="'developerTypeDisplay'"
         [width]="10" [data-type]="'string'" [hidden]="false" [text]="'Developer Type'">
        </amexio-data-table-column>
         <amexio-data-table-column [data-index]="'licenseTypeDisplay'" [width]="15"
         [data-type]="'string'" [hidden]="false" [text]="'License Type'">
        </amexio-data-table-column> 
        <amexio-data-table-column [data-index]="'productDisplay'" [width]="15"
         [data-type]="'string'" [hidden]="false" [text]="'Product'">
        </amexio-data-table-column>
        <amexio-data-table-column [data-index]="'firstName'" [width]="15"
         [data-type]="'string'" [hidden]="false" [text]="'First Name'">
        </amexio-data-table-column>
        <amexio-data-table-column [data-index]="'lastName'" [width]="12"
         [data-type]="'string'" [hidden]="false" [text]="'Last Name'">
        </amexio-data-table-column>
         <amexio-data-table-column [data-index]="'loginId'" [width]="25"
         [data-type]="'string'" [hidden]="false" [text]="'Login Id'">
        </amexio-data-table-column>
        <amexio-data-table-column [data-index]="'emailId'" [width]="25"
         [data-type]="'string'" [hidden]="false" [text]="'Email Id'">
        </amexio-data-table-column>
        <amexio-data-table-column [data-index]="'phoneNumber'" [width]="15"
         [data-type]="'string'" [hidden]="false" [text]="'Phone Number'">
        </amexio-data-table-column>
           <amexio-data-table-column [data-index]="'requestId'" [width]="15"
         [data-type]="'string'" [hidden]="true" [text]="'requestId'">
        </amexio-data-table-column>       
        <amexio-data-table-column [width]="15"
                    [data-index]="'signUpAction'"
                    [data-type]="'string'" [hidden]="false"
                    [text]="'Action'">
                    <ng-template #amexioBodyTmpl let-column let-row="row">
                    <span>
                    <amexio-image style="color:green;" [icon-class]="'fa fa-check fa-2x'"
                    [tooltip]="'Approve'" (onClick)="onApprove(row)">
                   </amexio-image>
                   <amexio-image style="color:red;" [icon-class]="'fa fa-times fa-2x'"
                    [tooltip]="'Reject'" (onClick)="onReject(row)">
                   </amexio-image>
                    </span>
                    </ng-template>
                </amexio-data-table-column>
            </amexio-datagrid>
        </amexio-column>
    </amexio-row>
</amexio-tab>
<amexio-tab title="Approved Requests" [active]="false">
<amexio-row>
        <amexio-column [size] =12 >
            <amexio-datagrid  title=""
                [data]="approvedData"
                [page-size] = "10"
                [enable-data-filter]="false">
        <amexio-data-table-column [data-index]="'developerTypeDisplay'"
         [width]="10" [data-type]="'string'" [hidden]="false" [text]="'Developer Type'">
        </amexio-data-table-column>
         <amexio-data-table-column [data-index]="'licenseTypeDisplay'" [width]="15"
         [data-type]="'string'" [hidden]="false" [text]="'License Type'">
        </amexio-data-table-column> 
        <amexio-data-table-column [data-index]="'productDisplay'" [width]="15"
         [data-type]="'string'" [hidden]="false" [text]="'Product'">
        </amexio-data-table-column>
        <amexio-data-table-column [data-index]="'firstName'" [width]="15"
         [data-type]="'string'" [hidden]="false" [text]="'First Name'">
        </amexio-data-table-column>
        <amexio-data-table-column [data-index]="'lastName'" [width]="15"
         [data-type]="'string'" [hidden]="false" [text]="'Last Name'">
        </amexio-data-table-column>
         <amexio-data-table-column [data-index]="'loginId'" [width]="25"
         [data-type]="'string'" [hidden]="false" [text]="'Login Id'">
        </amexio-data-table-column>
        <amexio-data-table-column [data-index]="'emailId'" [width]="25"
         [data-type]="'string'" [hidden]="false" [text]="'Email Id'">
        </amexio-data-table-column>
        <amexio-data-table-column [data-index]="'phoneNumber'" [width]="15"
         [data-type]="'string'" [hidden]="false" [text]="'Phone Number'">
        </amexio-data-table-column>
           <amexio-data-table-column [data-index]="'requestId'" [width]="15"
         [data-type]="'string'" [hidden]="true" [text]="'requestId'">
        </amexio-data-table-column>       
            </amexio-datagrid>
        </amexio-column>
    </amexio-row>
</amexio-tab>
<amexio-tab title="Rejected Requests" [active]="false">
<amexio-row>
        <amexio-column [size] =12 >
            <amexio-datagrid  title=""
                [data]="rejectedData"
                [page-size] = "10"
                [enable-data-filter]="false">
        <amexio-data-table-column [data-index]="'developerTypeDisplay'"
         [width]="10" [data-type]="'string'" [hidden]="false" [text]="'Developer Type'">
        </amexio-data-table-column>
         <amexio-data-table-column [data-index]="'licenseTypeDisplay'" [width]="15"
         [data-type]="'string'" [hidden]="false" [text]="'License Type'">
        </amexio-data-table-column> 
        <amexio-data-table-column [data-index]="'productDisplay'" [width]="15"
         [data-type]="'string'" [hidden]="false" [text]="'Product'">
        </amexio-data-table-column>
        <amexio-data-table-column [data-index]="'firstName'" [width]="15"
         [data-type]="'string'" [hidden]="false" [text]="'First Name'">
        </amexio-data-table-column>
        <amexio-data-table-column [data-index]="'lastName'" [width]="15"
         [data-type]="'string'" [hidden]="false" [text]="'Last Name'">
        </amexio-data-table-column>
         <amexio-data-table-column [data-index]="'loginId'" [width]="25"
         [data-type]="'string'" [hidden]="false" [text]="'Login Id'">
        </amexio-data-table-column>
        <amexio-data-table-column [data-index]="'emailId'" [width]="25"
         [data-type]="'string'" [hidden]="false" [text]="'Email Id'">
        </amexio-data-table-column>
        <amexio-data-table-column [data-index]="'phoneNumber'" [width]="15"
         [data-type]="'string'" [hidden]="false" [text]="'Phone Number'">
        </amexio-data-table-column>
           <amexio-data-table-column [data-index]="'requestId'" [width]="15"
         [data-type]="'string'" [hidden]="true" [text]="'requestId'">
        </amexio-data-table-column>       
            </amexio-datagrid>
        </amexio-column>
    </amexio-row>
</amexio-tab>
            </amexio-tab-view>
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
    <platform-notification></platform-notification>
  `
})
export class ApprovalComponent implements OnInit {
  messageArray: any[];
  pendingData: any;
  approvedData: any;
  rejectedData: any;
  validationMsgArray: any = [];
  isValidateForm: boolean = false;
  constructor(
    private http: HttpClient,
    public _notificationService: NotificationService,
    public loaderService: LoaderService
  ) {
    this.getPendingData();
    this.messageArray = [];
    this.pendingData = [];
    this.approvedData = [];
    this.rejectedData = [];
  }

  ngOnInit() {}

  okErrorBtnClick() {
    this.isValidateForm = false;
    this.validationMsgArray = [];
  }

  createErrorData() {
    let errorData: any[] = [];
    let errorObj: any = {};
    errorObj['data'] = [];
    errorObj.data = this.validationMsgArray;
    errorData.push(errorObj);
    this._notificationService.showerrorData('Error Message', errorData);
  }
  onApprove(row: any) {
    let response: any;
    const requestJson = {
      requestId: row.requestId
    };
    this.http
      .post('/api/user/SignupRequestCommand/approve', requestJson)
      .subscribe(
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
            this._notificationService.setSuccessData(response.successMessage);
            this.getPendingData();
          } else {
            this.validationMsgArray.push(response.errorMessage);
            // this.isValidateForm = true;
            this.createErrorData();
          }
        }
      );
  }

  onReject(row: any) {
    let response: any;
    const requestJson = {
      requestId: row.requestId
    };
    this.http
      .post('/api/user/SignupRequestCommand/reject', requestJson)
      .subscribe(
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
            this._notificationService.setSuccessData(response.successMessage);
            this.getPendingData();
          } else {
            this.validationMsgArray.push(response.errorMessage);
            // this.isValidateForm = true;
            this.createErrorData();
          }
        }
      );
  }
  getPendingData() {
    let dataresponse: any;
    this.loaderService.showLoader();
    this.http
      .get('/api/user/SignupRequestQuery/findAllPendingRequest')
      .subscribe(
        response => {
          dataresponse = response;
        },
        error => {
          this.validationMsgArray.push('Unable to connect to server');
          // this.isValidateForm = true;
          this.createErrorData();
          this.loaderService.hideLoader();
        },
        () => {
          if (dataresponse.success) {
            this.pendingData = dataresponse.response;
            this.loaderService.hideLoader();
          } else {
            this.validationMsgArray.push(dataresponse.errorMessage);
            // this.isValidateForm = true;
            this.createErrorData();
            this.loaderService.hideLoader();
          }
        }
      );
  }

  getApprovedData() {
    let dataresponse: any;
    this.loaderService.showLoader();
    this.http
      .get('/api/user/SignupRequestQuery/findAllApprovedRequest')
      .subscribe(
        response => {
          dataresponse = response;
        },
        error => {
          this.validationMsgArray.push('Unable to connect to server');
          // this.isValidateForm = true;
          this.createErrorData();
          this.loaderService.hideLoader();
        },
        () => {
          if (dataresponse.success) {
            this.approvedData = dataresponse.response;
            this.loaderService.hideLoader();
          } else {
            this.validationMsgArray.push(dataresponse.errorMessage);
            // this.isValidateForm = true;
            this.createErrorData();
            this.loaderService.hideLoader();
          }
        }
      );
  }
  getRejectedData() {
    let dataresponse: any;
    this.loaderService.showLoader();
    this.http
      .get('/api/user/SignupRequestQuery/findAllRejectedRequest')
      .subscribe(
        response => {
          dataresponse = response;
        },
        error => {
          this.validationMsgArray.push('Unable to connect to server');
          // this.isValidateForm = true;
          this.createErrorData();
          this.loaderService.hideLoader();
        },
        () => {
          if (dataresponse.success) {
            this.rejectedData = dataresponse.response;
            this.loaderService.hideLoader();
          } else {
            this.validationMsgArray.push(dataresponse.errorMessage);
            // this.isValidateForm = true;
            this.createErrorData();
            this.loaderService.hideLoader();
          }
        }
      );
  }

  onTabClick(event: any) {
    if (event.title == 'Pending Requests') {
      this.getPendingData();
    } else if (event.title == 'Approved Requests') {
      this.getApprovedData();
    } else if (event.title == 'Rejected Requests') {
      this.getRejectedData();
    }
  }
}
