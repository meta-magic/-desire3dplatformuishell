/**
 * Created by dattaram on 14/2/18.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gauge-chart-property',
  template: `

<ng-container *ngIf="componentInstance">
<amexio-text-input field-label="Name" [(ngModel)]="componentInstance.properties.name"
name="componentInstance.properties.name"
place-holder="enter name"
icon-feedback="true" (onBlur)="propertyValidation()">
</amexio-text-input>
  <chart-properties [componentInstance]="componentInstance" gauge="true"></chart-properties>
  </ng-container>

  `
})
export class GuagechartPropertyComponent implements OnInit {
  componentInstance: any;
  dataSourceWindow: boolean;
  constructor() {}

  ngOnInit() {}

  propertyValidation() {
    this.componentInstance._eventHndl.componentValidation(
      this.componentInstance
    );
  }
}
