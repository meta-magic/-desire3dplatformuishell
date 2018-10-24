import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomainModel } from '../domain/domain.component';
import { Router } from '@angular/router';
import { NotificationService, LocalStorageService } from 'platform-commons';
import { BoundedContextDefinitionService } from './bounded.context.definition.service';
@Component({
  selector: 'bounded-context-definition',
  template: `

     <amexio-row>
          <amexio-column [size] = "3">
          <div class="boundedContext-component-pane">
                  <amexio-card [header]="true"
          [footer]="true"
          [show]="true"
          [body-height]="80">
              <amexio-header>
                  Modules
              </amexio-header>
              <amexio-body>
                  <amexio-tree-filter-view [data-reader]="'response'" [data]="bs.bContextList" (nodeClick)="onNodeClick($event)">
                  </amexio-tree-filter-view>
              </amexio-body>
              <amexio-action>
              <amexio-button
              [label]="'BC'"
              [type]="'secondary'"
              [tooltip]="'New Bounded Context'"
              [size]="'default'"
              [icon]="'fa fa-plus fa-lg'"
              (onClick)="newBoundedContext()">
              </amexio-button>
              <amexio-button
              [label]="'Module'"
              [type]="'secondary'"
              [tooltip]="'New Domain'"
              [icon]="'fa fa-plus fa-lg'"
              [size]="'default'"
              (onClick)="newDomain()">
              </amexio-button>
          </amexio-action>
          </amexio-card>
          </div>
           </amexio-column>
         <amexio-column [size]="9">
        <ng-container *ngIf="!cardflag">
         <router-outlet></router-outlet>
        </ng-container>
        <ng-container *ngIf="cardflag">
        <amexio-card [header]="true"
                     [footer]="false"
                     [show]="true"
                     [body-height]="80"
                     [footer-align]="'right'">
                    <amexio-header>
                       Help Document
                    </amexio-header>
        <amexio-body>
          Help Document
        </amexio-body>
        </amexio-card>
        </ng-container>
         </amexio-column>
         </amexio-row>
<dna-notification></dna-notification>

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
export class BoundedContextDefinitionComponent implements OnInit {
  domainModel: DomainModel;
  bcDetails: any;
  // isValidateForm: boolean = false;
  validationMsgArray: any = [];
  cardflag: boolean;

  constructor(
    private _router: Router,
    private ls: LocalStorageService,
    public _notificationService: NotificationService,
    private http: HttpClient,
    public bs: BoundedContextDefinitionService
  ) {
    this.bcDetails = [];
    this.getBContextList();
    // this._router.navigateByUrl(
    //   '/home/dna/boundedcontextDefinition/boundedContext'
    // );
    this.cardflag = true;
  }

  createErrorData() {
    let errorData: any[] = [];
    let errorObj: any = {};
    errorObj['data'] = [];
    errorObj.data = this.validationMsgArray;
    errorData.push(errorObj);
    this._notificationService.showerrorData('Error Message', errorData);
  }

  getBContextList() {
    this.bs.getBContextList().subscribe(
      response => {
        this.bcDetails = response;
      },
      (error: any) => {
        this.validationMsgArray.push('Unable to connect the server');
        // this.isValidateForm = true;
        this.createErrorData();
      },
      () => {
        this.bs.bContextList = this.bcDetails;
      }
    );
  }

  //Open domain screen uder selected Bounded Context
  onNodeClick(data: any) {
    this.validationMsgArray = [];
    if (data.children != null && data.children.length >= 0) {
      let bContextData: any;
      this.bs.bcTextflag = true;
      this.bs.bcDropdownflag = false;
      this.bs.disabledflag = false;
      this.bs.domainBtnflag = true;
      this.cardflag = false;
      this.domainModel = new DomainModel();
      let requestJson = {
        id: data.id
      };
      this.http.post('/api/dna/bcontext/findById', requestJson).subscribe(
        response => {
          bContextData = response;
        },
        err => {
          this.validationMsgArray.push('Unable to connect the server');
          // this.isValidateForm = true;
          this.createErrorData();
        },
        () => {
          if (bContextData.success) {
            let BContextId = new Date().getTime();
            this.ls.set('BContextId', bContextData.response.id);
            this._router.navigate([
              'home/designPipeline/boundedcontextDefinition/module/' +
                BContextId
            ]);
          }
          if (bContextData.errorMessage) {
            this.validationMsgArray.push(bContextData.errorMessage);
            // this.isValidateForm = true;
            this.createErrorData();
          }
        }
      );
    } else {
      let domainData: any;
      this.bs.bcTextflag = false;
      this.bs.bcDropdownflag = false;
      this.bs.domainBtnflag = false;
      this.bs.disabledflag = true;
      this.cardflag = false;
      this.domainModel = new DomainModel();
      let requestJson = {
        id: data.id
      };
      this.http.post('/api/dna/domain/findById', requestJson).subscribe(
        response => {
          domainData = response;
        },
        err => {
          this.validationMsgArray.push('Unable to connect the server');
          // this.isValidateForm = true;
          this.createErrorData();
        },
        () => {
          if (domainData.success) {
            let domainId = new Date().getTime();
            this.ls.set('domainId', domainData.response.id);
            this._router.navigate([
              'home/designPipeline/boundedcontextDefinition/module/' + domainId
            ]);
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

  ngOnInit() {
    // this.loadBCTreeData();
  }

  // Open bounded context screen
  newBoundedContext() {
    this.cardflag = false;
    this._router.navigate([
      'home/designPipeline/boundedcontextDefinition/boundedContext'
    ]);
  }

  //Open Domain Screen
  newDomain() {
    this.cardflag = false;
    this._router.navigate([
      'home/designPipeline/boundedcontextDefinition/module'
    ]);
    this.bs.bcDropdownflag = true;
    this.bs.domainBtnflag = true;
    this.bs.bcTextflag = false;
    this.bs.disabledflag = false;
  }

  // To Close Window
  // okErrorBtnClick() {
  //   this.isValidateForm = false;
  // }
}
