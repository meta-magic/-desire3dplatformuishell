/**
 * Created by dattaram on 7/3/18.
 */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'datagrid-property',
  template: `    
            <ng-container *ngIf="componentInstance">
              <amexio-text-input field-label="Name" [(ngModel)]="componentInstance.properties.name"
                                 name="componentInstance.properties.name"
                                 place-holder="enter name"
                                 icon-feedback="true"
                                 (onBlur)="propertyValidation()">
              </amexio-text-input>
              <amexio-text-input field-label="Title" [(ngModel)]="componentInstance.properties.title"
                                 name="componentInstance.properties.title"
                                 place-holder="title" (onBlur)="componentInstance.properties.fieldLabel = componentInstance.properties.title"
                                 icon-feedback="false" [allow-blank]="true">
              </amexio-text-input>
              <amexio-number-input [field-label]="'Page Size'" name="componentInstance.properties.pageSize"
                                   [allow-blank]="true" [(ngModel)]="componentInstance.properties.pageSize">
              </amexio-number-input>
              <amexio-number-input [field-label]="'Height'" name="componentInstance.properties.height"
                                   [allow-blank]="true" [(ngModel)]="componentInstance.properties.height">
              </amexio-number-input>


              <amexio-fieldset [collapsible]="false" title="Column">
                <amexio-text-input [field-label]="'Column Label'" name="componentInstance.columnProperty.text"
                                   [place-holder]="'label'"
                                   [enable-popover]="false"
                                   [icon-feedback]="true"
                                   [allow-blank]="false"
                                   [(ngModel)]="componentInstance.columnProperty.text">
                </amexio-text-input>
                  <amexio-text-input [field-label]="'Column Index'" name="componentInstance.columnProperty.dataindex"
                                     [place-holder]="'data Index'"
                                     [enable-popover]="false"
                                     [icon-feedback]="true"
                                     [allow-blank]="false"
                                     [(ngModel)]="componentInstance.columnProperty.dataindex">
                  </amexio-text-input>
                <amexio-checkbox [field-label]="'Hidden'"
                                 [(ngModel)]="componentInstance.columnProperty.hidden">
                </amexio-checkbox>
                <amexio-button
                  [type]="'theme-color'" [size]="'small'"
                  [tooltip]="'Save'"
                  [icon]="'fa fa-save'" (onClick)="addColumn()">
                </amexio-button>
                <amexio-button
                  [type]="'default'" [size]="'small'"
                  [tooltip]="'Save'"
                  [icon]="'fa fa-trash-o'" (onClick)="removeColumn()">
                </amexio-button>
              </amexio-fieldset>

              <amexio-checkbox [field-label]="'Column Toggle'"
                               [(ngModel)]="componentInstance.properties.enableColumnToggle">
              </amexio-checkbox>
              <amexio-checkbox [field-label]="'Enable Checkbox'"
                               [(ngModel)]="componentInstance.properties.enableCheckbox">
              </amexio-checkbox>
              <amexio-checkbox [field-label]="'Group By'"
                               [(ngModel)]="componentInstance.properties.groupBy">
              </amexio-checkbox>
              <amexio-checkbox [field-label]="'Enable Filtering'"
                               [(ngModel)]="componentInstance.properties.enableFiltering">
              </amexio-checkbox>
            </ng-container>
     <!-- <amexio-tab [icon]="componentInstance._eventHndl._sharedDataService.behaviourIcon">
        <ng-container *ngIf="componentInstance">
          <br><amexio-button [block]="true" label="Datasource" size="medium" type="primary" (onClick)="componentInstance._eventHndl.createDatasourceInstance(componentInstance)"></amexio-button>
          <show-event-list [componentInstance]="componentInstance"></show-event-list>
        </ng-container>
      </amexio-tab>-->
   
  `
})
export class DatagridPropertyComponent implements OnInit {
  componentInstance: any;
  constructor() {}

  ngOnInit() {}

  propertyValidation() {
    this.componentInstance._eventHndl.componentValidation(
      this.componentInstance
    );
  }

  addColumn() {
    this.componentInstance.addColumn();
  }
  removeColumn() {
    this.componentInstance.removeColumn();
  }
}
