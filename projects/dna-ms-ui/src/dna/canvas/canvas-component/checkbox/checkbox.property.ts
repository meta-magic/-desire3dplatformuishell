/**
 * Created by pratik on 23/2/18.
 */
import { Component, OnInit } from '@angular/core';
import { EventModel } from '../../event-relationship/models/event.basemodel';

@Component({
  selector: 'checkbox-property',
  template: `
      <ng-container *ngIf="componentInstance">

<amexio-text-input field-label="Name" [(ngModel)]="componentInstance.properties.name"
                   name="componentInstance.properties.name"
                   place-holder="enter name"
                   icon-feedback="true" (onBlur)="propertyValidation()">
</amexio-text-input>

<amexio-text-input field-label="Field Label" [(ngModel)]="componentInstance.properties.fieldLabel"
                   name="componentInstance.properties.fieldLabel"
                   place-holder="enter label">
</amexio-text-input>

<amexio-checkbox [field-label]="'Disabled'"
                 [(ngModel)]="componentInstance.properties.disabled">
</amexio-checkbox>
<amexio-checkbox [field-label]="'Required'"
                 [(ngModel)]="componentInstance.properties.required">
</amexio-checkbox>
</ng-container>

   <!--  <amexio-tab [icon]="componentInstance._eventHndl._sharedDataService.behaviourIcon">
       <ng-container *ngIf="componentInstance">
       <show-event-list [componentInstance]="componentInstance" ></show-event-list>
       </ng-container>
     </amexio-tab>-->
  
 `
})
export class CheckBoxPropertyComponent implements OnInit {
  dataSourceWindow: boolean;
  componentInstance: any;
  constructor() {}

  ngOnInit() {}

  propertyValidation() {
    this.componentInstance._eventHndl.componentValidation(
      this.componentInstance
    );
  }
}
