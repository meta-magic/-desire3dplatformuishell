import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'platform-commons';
import { LoaderService } from 'platform-commons';
@Component({
  selector: 'service-defination',
  template: `
             <div class="loadingnav" *ngIf="loaderService.isLoading"></div>
<amexio-form [body-height]="80" [header]="true" form-name="servicedefinationform"  [show-error]="true">
    <amexio-form-header>Service Builder</amexio-form-header>
    <amexio-form-body>
        <amexio-row>
            <amexio-column [size]=6>
                <amexio-dropdown [search]="true" [(ngModel)]="servicemodel.boundedContextId"
                                [place-holder]="'Select Bounded Context'" name="servicemodel.boundedContextId"
                                 [error-msg]="'Select Bounded Context'"
                                [field-label]="'Bounded Context'" 
                                [data]="servicemodel.boundedContextData" [display-field]="'name'"
                                (onSingleSelect) = "onBoundedContextSelect($event)"
                                [value-field]="'id'">
                </amexio-dropdown>
            </amexio-column>
            <amexio-column [size]=6>
                <amexio-dropdown [search]="true" [(ngModel)]="servicemodel.domainId" [place-holder]="'Select Module'" name="servicemodel.domainId"
                     [error-msg]="'Select Module'"
                    [data]="servicemodel.domainData" [field-label]="'Module'" [display-field]="'name'" [value-field]="'id'">
                </amexio-dropdown>
            </amexio-column>
        </amexio-row>
        <amexio-row>
            <amexio-column [size]=6>
                <amexio-text-input field-label="Name" [pattern]="'^[a-zA-Z][a-zA-Z0-9]*$'" name="servicemodel.serviceName"
                        place-holder="Enter Service Name" [(ngModel)]="servicemodel.serviceName"
                        enable-popover="true" error-msg="Please Enter Service Name" icon-feedback="true">
                </amexio-text-input>
            </amexio-column>
            <amexio-column [size]=6>
                <amexio-text-input field-label="URL" name="servicemodel.baseUrl"
                        place-holder="Enter Base URL" [(ngModel)]="servicemodel.baseUrl"
                        enable-popover="true" error-msg="Please Enter Service URL" >
                </amexio-text-input>
            </amexio-column>
        </amexio-row>
    </amexio-form-body>
    <amexio-form-action>
        <amexio-button [label]="'Cancel'" [icon]="'fa fa-close'" [type]="'secondary'"
                    [size]="'default'" [tooltip]="'Cancel'"
                    (onClick)="cancel()">
        </amexio-button>
        <amexio-button [form-bind]="'servicedefinationform'" [disabled]="saveBtnEnable" [label]="'Save'" [icon]="'fa fa-save'"  [type]="'primary'"
                    [size]="'default'" [tooltip]="'Save'"
                    (onClick)="save()">
        </amexio-button>
    </amexio-form-action>
</amexio-form>
<dna-notification></dna-notification>
    `
})
export class ServiceDefinationComponent implements OnInit {
  servicemodel: ServiceDefinationModel;
  notificationmsg: any[];
  saveBtnEnable: any = false;
  hasModelNameValid:boolean=true;
  @Output() reset: any = new EventEmitter<any>();

  constructor(
    private http: HttpClient,
    public loaderService: LoaderService,
    public _notificationService: NotificationService
  ) {
    this.notificationmsg = [];
    this.servicemodel = new ServiceDefinationModel();
  }

  ngOnInit() {
    this.getBoundedContext();
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
    this.servicemodel.id = id;

    if (this.servicemodel.id != null && this.servicemodel.id != '') {
      this.fetchServiceDefination();
    }
  }

  onIdChange(id: any) {
    //this.fetchServiceDefination();
  }

  fetchServiceDefination() {
    this.notificationmsg = [];
    let responsedata: any;
    this.http
      .post('/api/dna/servicedefinition/findById', { id: this.servicemodel.id })
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
    this.servicemodel.setData(responsedata);
    this.onBoundedContextSelect({ id: this.servicemodel.boundedContextId });
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
        this.servicemodel.boundedContextData = bcData.response;
        this.servicemodel.boundedContextId = this.servicemodel.boundedContextData[0].id;
        this.onBoundedContextSelect(this.servicemodel.boundedContextData[0]);
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
          this.servicemodel.domainData = responedata.response;
          this.servicemodel.domainId = this.servicemodel.domainData[0].id;
        }
      );
  }

  save() {
    this.notificationmsg = [];
    this.loaderService.showLoader();
    let responsedata: any;
    this.http
      .post('/api/dna/servicedefinition/save', this.servicemodel.toSaveJSON())
      .subscribe(
        response => {
          responsedata = response;
        },
        err => {
          this.notificationmsg.push('Unable to connect to server');
          this.createErrorData();
          this.saveBtnEnable = true;
          this.loaderService.hideLoader();
        },
        () => {
          if (!responsedata.success && responsedata.errorMessage) {
            this.notificationmsg.push(responsedata.errorMessage);
            this.createErrorData();
            this.loaderService.hideLoader();
          } else {
            this.loaderService.hideLoader();
            this.notificationmsg.push('Service defination saved successfully!');
            this._notificationService.showSuccessData(this.notificationmsg);
            this.resetData();
          }
          this.saveBtnEnable = true;
        }
      );
  }
  nameValidation() {
    if (
     this.servicemodel.serviceName.split(' ').length == 1 &&
      this.servicemodel.serviceName != ''
    ) {
      this.hasModelNameValid = false;
      let i: number = 0;
      let character: string = '';
      while (i < this.servicemodel.serviceName.length) {
        character = this.servicemodel.serviceName.charAt(i);
        if (character == character.toUpperCase()) {
          this.hasModelNameValid = true;
        }
        i++;
      }
    } else {
      this.hasModelNameValid = true;
    }
  }
  cancel() {
    this.resetData();
  }

  resetData() {
    this.servicemodel.reset();
    this.reset.emit({ reset: true });
  }
}

export class ServiceDefinationModel {
  id: string;
  boundedContextId: string;
  domainId: string;
  serviceName: string;
  baseUrl: string;
  domainData: any[];
  boundedContextData: any[];

  constructor() {}

  reset() {
    this.id = '';
    this.boundedContextId = '';
    this.domainId = '';
    this.serviceName = '';
    this.baseUrl = '';
    this.domainData = [];
  }

  setDomainData(domainData: any) {
    this.domainData = domainData;
  }
  setData(resp: any) {
    if (resp.success && resp.response) {
      let response = resp.response;
      this.id = response.id;
      this.serviceName = response.name;
      this.boundedContextId = response.boundedContextId;
      this.domainId = response.domainId;
      this.baseUrl = response.url;
    }
  }

  toSaveJSON() {
    return {
      id: this.id,
      name: this.serviceName,
      boundedContextId: this.boundedContextId,
      domainId: this.domainId,
      description: '',
      url: this.baseUrl
    };
  }
}
