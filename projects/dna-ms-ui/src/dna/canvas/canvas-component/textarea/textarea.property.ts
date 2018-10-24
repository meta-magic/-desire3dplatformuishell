/**
 * Created by dattaram on 14/2/18.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'text-area-property',
  template: `
      <ng-container *ngIf="componentInstance">
              <amexio-text-input field-label="Name" [(ngModel)]="componentInstance.properties.name"
                                name="componentInstance.properties.name"
                                place-holder="name"
                                icon-feedback="true" (onBlur)="propertyValidation()">
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

              <amexio-number-input [enable-popover]="false" [(ngModel)]="componentInstance.properties.noOfRows"
                                  name="componentInstance.properties.noOfRows"
                                  [field-label]="'Rows'"
                                  [place-holder]="'no of rows'"
                                  [allow-blank]="false"
                                  [min-value]="1">
              </amexio-number-input>

              <amexio-number-input [enable-popover]="false" [(ngModel)]="componentInstance.properties.noOfCols"
                                  name="componentInstance.properties.noOfCols"
                                  [field-label]="'Columns'"
                                  [place-holder]="'no of columns'"
                                  [allow-blank]="false"
                                  [min-value]="1">
              </amexio-number-input>

              <amexio-text-input [field-label]="'Error Message'" name ="componentInstance.properties.errorMsg"
                                [place-holder]="'error message'" [allow-blank]="true" [(ngModel)]="componentInstance.properties.errorMsg">
              </amexio-text-input>

              <amexio-number-input [field-label]="'Font Size'" [allow-blank]="true"
                                [(ngModel)]="componentInstance.properties.fontSize"
                                 [place-holder]="'font size'">
              </amexio-number-input>

              <amexio-text-input [field-label]="'Font Family'"
                                 [place-holder]="'font family'" [allow-blank]="true" name ="componentInstance.properties.maxErrorMsg"
                                  [(ngModel)]="componentInstance.properties.fontFamily">
              </amexio-text-input>

              <amexio-text-input [field-label]="'Font Style'"
                                 [place-holder]="'font style'" [allow-blank]="true" name ="componentInstance.properties.maxErrorMsg"
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
                          <!--<amexio-tab [icon]="componentInstance._eventHndl._sharedDataService.behaviourIcon">
                            <ng-container *ngIf="componentInstance">
                              <show-event-list [componentInstance]="componentInstance"></show-event-list>
                            </ng-container>
                          </amexio-tab>-->
  
  `
})
export class TextAreaInputPropertyComponent implements OnInit {
  componentInstance: any;
  constructor() {}

  ngOnInit() {}

  propertyValidation() {
    this.componentInstance._eventHndl.componentValidation(
      this.componentInstance
    );
  }
}
