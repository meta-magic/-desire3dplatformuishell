/**
 * Created by pratik on 23/2/18.
 */
import { Component, OnInit } from '@angular/core';
import { EventModel } from '../../event-relationship/models/event.basemodel';

@Component({
  selector: 'dropdown-property',
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
                         place-holder="enter label"
                         icon-feedback="false" [allow-blank]="true">
      </amexio-text-input>
      <amexio-text-input field-label="Placeholder" [(ngModel)]="componentInstance.properties.placeholder"
                         name="componentInstance.properties.fieldLabel"
                         place-holder="placeholder"
                         icon-feedback="false" [allow-blank]="true">
      </amexio-text-input>
      <amexio-checkbox [field-label]="'Enable Search'"
                       [(ngModel)]="componentInstance.properties.search">
      </amexio-checkbox>
      <amexio-checkbox [field-label]="'Multi Select'"
                       [(ngModel)]="componentInstance.properties.multiselect">
      </amexio-checkbox>

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
export class DropDownPropertyComponent implements OnInit {
  componentInstance: any;
  constructor() {}
  ngOnInit() {}

  propertyValidation() {
    this.componentInstance._eventHndl.componentValidation(
      this.componentInstance
    );
  }
}
