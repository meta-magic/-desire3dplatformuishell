/**
 * Created by dattaram on 14/2/18.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'timelinechart-chart-property',
  template: `    
         <ng-container *ngIf="componentInstance">
                            <amexio-text-input field-label="Name" [(ngModel)]="componentInstance.properties.name"
                            name="componentInstance.properties.name"
                            place-holder="name"
                            icon-feedback="true" (onBlur)="propertyValidation()">
         </amexio-text-input>
                              <chart-properties [componentInstance]="componentInstance" ></chart-properties>
                              </ng-container>
     <!-- <amexio-tab [icon]="componentInstance._eventHndl._sharedDataService.behaviourIcon">
        <ng-container *ngIf="componentInstance">
          <br><amexio-button [block]="true" label="Datasource" size="medium" type="primary" (onClick)="componentInstance._eventHndl.createDatasourceInstance(componentInstance)"></amexio-button>
        </ng-container>
      </amexio-tab>-->
  `
})
export class TimelinechartPropertyComponent implements OnInit {
  componentInstance: any;
  constructor() {}

  ngOnInit() {}

  propertyValidation() {
    this.componentInstance._eventHndl.componentValidation(
      this.componentInstance
    );
  }
}
