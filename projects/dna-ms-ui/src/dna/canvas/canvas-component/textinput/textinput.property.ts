/**
 * Created by dattaram on 14/2/18.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'text-input-property',
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
                         [place-holder]="'error message'" [allow-blank]="true" [(ngModel)]="componentInstance.properties.errormessage">
      </amexio-text-input>

      <amexio-number-input [field-label]="'Min Length'" name ="componentInstance.properties.minLength"
                           [allow-blank]="true" [(ngModel)]="componentInstance.properties.minLength">
      </amexio-number-input>

      <amexio-text-input [field-label]="'Min Error Message'" [allow-blank]="true" name ="componentInstance.properties.minErrorMsg"
                         [place-holder]="'min error message'" [(ngModel)]="componentInstance.properties.minErrorMsg">
      </amexio-text-input>

      <amexio-number-input [field-label]="'Max Length'" [allow-blank]="true" name ="componentInstance.properties.maxLength" [(ngModel)]="componentInstance.properties.maxLength">
      </amexio-number-input>

      <amexio-text-input [field-label]="'Max Error Message'" [allow-blank]="true" name ="componentInstance.properties.maxErrorMsg"
                         [place-holder]="'max error message'" [(ngModel)]="componentInstance.properties.maxErrorMsg">
      </amexio-text-input>

      <amexio-text-input [field-label]="'Pattern'" [allow-blank]="true" name ="componentInstance.properties.pattern"
                         [place-holder]="'pattern'" [(ngModel)]="componentInstance.properties.pattern">
      </amexio-text-input>

      <amexio-number-input [field-label]="'Font Size'" [allow-blank]="true" name ="componentInstance.properties.fontSize"
                           [(ngModel)]="componentInstance.properties.fontSize"
                           [place-holder]="'font size'">
      </amexio-number-input>

      <amexio-text-input [field-label]="'Font Family'" [allow-blank]="true"
                         [(ngModel)]="componentInstance.properties.fontFamily"
                         [place-holder]="'font family'">
      </amexio-text-input>

      <amexio-text-input [field-label]="'Font Style'" [allow-blank]="true"
                         [(ngModel)]="componentInstance.properties.fontStyle"
                         [place-holder]="'font style'">
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
export class TextInputPropertyComponent implements OnInit {
  componentInstance: any;
  constructor() {}

  ngOnInit() {}

  propertyValidation() {
    this.componentInstance._eventHndl.componentValidation(
      this.componentInstance
    );
  }
}
