import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'service-operation-defination',
  template: `

<amexio-row>

    <amexio-column [size] =3 >
        <amexio-card [header]="true" [footer]="true" [footer-align]="'right'"  [body-height]="80">
            <amexio-header>Services</amexio-header>
            <amexio-body>
                <amexio-tree-filter-view [data-reader]="'response'" [data]="servicedefinationdata" (nodeClick)="onServiceDefinitionTreeClick($event)">
                </amexio-tree-filter-view>
            </amexio-body>
            <amexio-action>
                <amexio-button *ngIf="isOperationDefination" (onClick)="showServiceUI()" [label]="'Service'" [type]="'secondary'" [size]="'default'" [tooltip]="'New Service'" [icon]="'fa fa-plus fa-lg'">
                </amexio-button>
                <amexio-button *ngIf="isServiceDefination"  (onClick)="showOperationUI()"[label]="'Operation'" [type]="'secondary'" [size]="'default'" [tooltip]="'New Operation'" [icon]="'fa fa-plus fa-lg'">
                </amexio-button>
            </amexio-action>
        </amexio-card>
    </amexio-column>

    <amexio-column [size] =9 >

        <service-defination   [id]="serviceId" (reset)= "reset()" *ngIf="isServiceDefination"></service-defination>

        <operation-defination [id]="operationId" (reset)= "reset()" *ngIf="isOperationDefination"></operation-defination>

    </amexio-column>

</amexio-row>
    `
})
export class ServiceOperationDefinationComponent implements OnInit {
  servicedefinationdata: any[];

  isServiceDefination: boolean = true;
  isOperationDefination: boolean = false;

  serviceId: any = null;
  operationId: any = null;

  constructor(private http: HttpClient) {
    this.servicedefinationdata = [];
  }

  ngOnInit() {
    this.loadServiceDefinitionsTree();
  }

  //LOAD SERVICE TREE
  loadServiceDefinitionsTree() {
    let responsedata: any = {};
    this.http.get('/api/dna/servicedefinition/findAll').subscribe(
      response => {
        responsedata = response;
      },
      err => {
        console.log('Unable to connect to service');
      },
      () => {
        this.servicedefinationdata = responsedata;
      }
    );
  }

  showServiceUI() {
    this.unsetData();
    this.isServiceDefination = true;
    this.isOperationDefination = false;
  }

  showOperationUI() {
    this.unsetData();
    this.isServiceDefination = false;
    this.isOperationDefination = true;
  }

  unsetData() {
    this.serviceId = null;
    this.operationId = null;
  }

  onServiceDefinitionTreeClick(event: any) {
    if (event.type && event.type === '4') {
      this.showOperationUI();
      this.operationId = event.parentId + '###' + event.text;
    } else if (event.type && event.type === '3') {
      this.showServiceUI();
      this.serviceId = event.id;
    }
  }

  reset() {
    this.unsetData();
    this.loadServiceDefinitionsTree();
  }
}
