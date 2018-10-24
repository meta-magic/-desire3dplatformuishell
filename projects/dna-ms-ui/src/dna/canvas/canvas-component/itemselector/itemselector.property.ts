/**
 * Created by dattaram on 6/3/18.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'item-selector-property',
  template: `
    <ng-container *ngIf="componentInstance">
      <amexio-text-input field-label="Name" [(ngModel)]="componentInstance.properties.name"
                         name="componentInstance.properties.name"
                         place-holder="enter name"
                         icon-feedback="true"
                         (onBlur)="propertyValidation()">
      </amexio-text-input>
      <amexio-number-input [field-label]="'Height'" name ="componentInstance.properties.height"
                           [allow-blank]="true" [(ngModel)]="componentInstance.properties.height">
      </amexio-number-input>
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
export class ItemSelectorPropertyComponent implements OnInit {
  componentInstance: any;
  constructor() {}

  ngOnInit() {}

  propertyValidation() {
    this.componentInstance._eventHndl.componentValidation(
      this.componentInstance
    );
  }
}
