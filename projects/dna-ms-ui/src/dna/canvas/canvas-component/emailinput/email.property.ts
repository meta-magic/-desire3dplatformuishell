import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'email-input-property',
  template: `
            <ng-container *ngIf="componentInstance">
              <amexio-text-input field-label="Name" [(ngModel)]="componentInstance.properties.name"
                                 name="componentInstance.properties.name"
                                 place-holder="name"
                                 icon-feedback="true"
                                 (onBlur)="propertyValidation()">
              </amexio-text-input>
              <amexio-text-input field-label="Field Label" [(ngModel)]="componentInstance.properties.fieldLabel"
                                 name="componentInstance.properties.fieldLabel"
                                 place-holder="label"
                                 icon-feedback="false" [allow-blank]="true">
              </amexio-text-input>
              <amexio-text-input field-label="Placeholder" [(ngModel)]="componentInstance.properties.placeholder"
                                 name="componentInstance.properties.fieldLabel"
                                 place-holder="placeholder"
                                 icon-feedback="false" [allow-blank]="true">
              </amexio-text-input>
              <amexio-text-input [field-label]="'Error Message'" name ="componentInstance.properties.errorMsg"
                                 [place-holder]="'error message'" [allow-blank]="true" [(ngModel)]="componentInstance.properties.errorMsg">
              </amexio-text-input>
              <amexio-text-input [field-label]="'Pattern'" [allow-blank]="true" name ="componentInstance.properties.pattern"
                                 [place-holder]="'pattern'" [(ngModel)]="componentInstance.properties.pattern">
              </amexio-text-input>
              <amexio-number-input [field-label]="'Font Size'" [allow-blank]="true"
                                   place-holder="font size"
                                   [(ngModel)]="componentInstance.properties.fontSize">
              </amexio-number-input>
              <amexio-text-input [field-label]="'Font Family'" [allow-blank]="true" name ="componentInstance.properties.maxErrorMsg"
                                 place-holder="font family"
                                 [(ngModel)]="componentInstance.properties.fontFamily">
              </amexio-text-input>
              <amexio-text-input [field-label]="'Font Style'" [allow-blank]="true" name ="componentInstance.properties.maxErrorMsg"
                                 place-holder="font style"
                                 [(ngModel)]="componentInstance.properties.fontStyle">
              </amexio-text-input>
              <amexio-checkbox    [field-label]="'Has Label'"
                                  [(ngModel)]="componentInstance.properties.hasLabel">
              </amexio-checkbox>
              <amexio-checkbox [field-label]="'Allow Blank'"
                               [(ngModel)]="componentInstance.properties.allowBlank">
              </amexio-checkbox>
              <amexio-checkbox [field-label]="'Icon FeedBack'"
                               [(ngModel)]="componentInstance.properties.iconFeedBack">
              </amexio-checkbox>
              <amexio-checkbox [field-label]="'Disabled'"
                               [(ngModel)]="componentInstance.properties.disabled">
              </amexio-checkbox>
              <amexio-checkbox [field-label]="'Enable Popover'"
                               [(ngModel)]="componentInstance.properties.enablePopOver">
              </amexio-checkbox>
            </ng-container>
    

  `
})
export class EmailInputPropertyComponent implements OnInit {
  componentInstance: any;
  constructor() {}

  ngOnInit() {}

  propertyValidation() {
    this.componentInstance._eventHndl.componentValidation(
      this.componentInstance
    );
  }
}
