/**
 * Created by pratik on 27/2/18.
 */
/**
 * Created by pratik on 23/2/18.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'time-picker-property',
  template: `
  
<ng-container *ngIf="componentInstance">

          <amexio-text-input field-label="Name" [(ngModel)]="componentInstance.properties.name"
                             name="componentInstance.properties.name"
                             place-holder="enter name"
                             icon-feedback="true"
                             (onBlur)="propertyValidation()">
          </amexio-text-input>

          <amexio-text-input field-label="Label" [(ngModel)]="componentInstance.properties.fieldLabel"
                             name="componentInstance.properties.fieldLabel"
                             place-holder="label">
          </amexio-text-input>

          <amexio-checkbox [field-label]="'Read Only'"
                           [(ngModel)]="componentInstance.properties.readonly">
          </amexio-checkbox>

        </ng-container>
      <!--<amexio-tab [icon]="componentInstance._eventHndl._sharedDataService.behaviourIcon">
        <ng-container *ngIf="componentInstance">
          <show-event-list [componentInstance]="componentInstance"></show-event-list>
        </ng-container>
      </amexio-tab>-->
  `
})
export class TimePickerPropertyComponent implements OnInit {
  componentInstance: any;
  constructor() {}

  ngOnInit() {}

  onChange(event: boolean) {
    this.componentInstance.properties.datepicker = event;
    if (!event && !this.componentInstance.properties.timepicker)
      this.componentInstance.properties.timepicker = true;
    if (event && this.componentInstance.properties.timepicker)
      this.componentInstance.properties.timepicker = false;
  }

  propertyValidation() {
    this.componentInstance._eventHndl.componentValidation(
      this.componentInstance
    );
  }
}
