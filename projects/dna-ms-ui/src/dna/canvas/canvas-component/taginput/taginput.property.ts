/**
 * Created by dattaram on 23/2/18.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'taginput-property',
  template: `
    <ng-container *ngIf="componentInstance">
      <amexio-text-input field-label="Name" [(ngModel)]="componentInstance.properties.name"
                         name="componentInstance.properties.name"
                         place-holder="enter name"
                         icon-feedback="true"
                         (onBlur)="propertyValidation()">
      </amexio-text-input>
      <amexio-text-input field-label="Field Label" [(ngModel)]="componentInstance.properties.fieldLabel"
                         name="componentInstance.properties.fieldLabel"
                         place-holder="enter name"
                         icon-feedback="false" [allow-blank]="true">
      </amexio-text-input>
      <amexio-number-input [field-label]="'Trigger Char'" name ="componentInstance.properties.triggerChar"
                           [allow-blank]="true" [(ngModel)]="componentInstance.properties.triggerChar">
      </amexio-number-input>
      <amexio-text-input field-label="Key" [(ngModel)]="componentInstance.properties.key"
                         name="componentInstance.properties.key"
                         place-holder="key"
                         icon-feedback="false" [allow-blank]="true">
      </amexio-text-input>
      <amexio-text-input field-label="Display Field" [(ngModel)]="componentInstance.properties.displayField"
                         name="componentInstance.properties.displayField"
                         place-holder="display field"
                         icon-feedback="true" [allow-blank]="true">
      </amexio-text-input>
      <amexio-text-input field-label="Value  Field" [(ngModel)]="componentInstance.properties.valueField"
                         name="componentInstance.properties.valueField"
                         place-holder="value field"
                         icon-feedback="false" [allow-blank]="true">
      </amexio-text-input>
    </ng-container>
  `
})
export class TagInputPropertyComponent implements OnInit {
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
