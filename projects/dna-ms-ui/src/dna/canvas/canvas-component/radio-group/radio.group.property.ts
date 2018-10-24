/**
 * Created by pratik on 23/2/18.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'radio-group-property',
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

              <amexio-text-input field-label="Group Name" [(ngModel)]="componentInstance.properties.groupName"
                                name="componentInstance.properties.groupName"
                                place-holder="group name"
                                icon-feedback="false" [allow-blank]="true">
              </amexio-text-input>

              <amexio-checkbox [field-label]="'Horizontal'"
                              [(ngModel)]="componentInstance.properties.horizontal">
              </amexio-checkbox>


              <amexio-checkbox [field-label]="'Disabled'"
                              [(ngModel)]="componentInstance.properties.disabled">
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
export class RadioGroupPropertyComponent implements OnInit {
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
