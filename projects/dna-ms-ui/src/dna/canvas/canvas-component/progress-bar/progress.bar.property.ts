/**
 * Created by dattaram on 23/2/18.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'progress-property',
  template: `    
    <ng-container *ngIf="componentInstance">
      <amexio-text-input field-label="Name" [(ngModel)]="componentInstance.properties.name"
                         name="componentInstance.properties.name"
                         place-holder="enter name"
                         icon-feedback="true"
                         (onBlur)="propertyValidation()">
      </amexio-text-input>

      <amexio-text-input field-label="Lable" [(ngModel)]="componentInstance.properties.label"
                         name="componentInstance.properties.label"
                         place-holder="enter label">
      </amexio-text-input>

      <amexio-number-input [field-label]="'Height'" name ="componentInstance.properties.height"
                           [allow-blank]="true" [(ngModel)]="componentInstance.properties.height">
      </amexio-number-input>

      <amexio-number-input [field-label]="'Current Value'" name ="componentInstance.properties.currentValue"
                           [allow-blank]="true" [(ngModel)]="componentInstance.properties.currentValue">
      </amexio-number-input>

      <amexio-dropdown [(ngModel)]="componentInstance.properties.type"
                       [place-holder]="'choose type'"
                       [field-label]="'Progress Type'"
                       [data]="typeData"
                       [display-field]="'type'"
                       [value-field]="'value'">
      </amexio-dropdown>


      <amexio-checkbox  [field-label]="'Show'"
                        [(ngModel)]="componentInstance.properties.show">
      </amexio-checkbox>
      <amexio-checkbox  [field-label]="'Stripped'"
                        [(ngModel)]="componentInstance.properties.stripped">
      </amexio-checkbox>
      <amexio-checkbox  [field-label]="'Infinite'"
                        [(ngModel)]="componentInstance.properties.infinite">
      </amexio-checkbox>
    </ng-container>
       

     <!-- <amexio-tab [icon]="componentInstance._eventHndl._sharedDataService.behaviourIcon">
        <ng-container *ngIf="componentInstance">
          <show-event-list [componentInstance]="componentInstance"></show-event-list>
        </ng-container>
      </amexio-tab>-->
   
  `
})
export class ProgressBarPropertyComponent implements OnInit {
  componentInstance: any;
  typeData: any[] = [];
  constructor() {
    this.typeData = [
      {
        type: 'Success',
        value: 'success'
      },
      {
        type: 'Danger',
        value: 'danger'
      },
      {
        type: 'Warning',
        value: 'warning'
      }
    ];
  }

  ngOnInit() {}

  propertyValidation() {
    this.componentInstance._eventHndl.componentValidation(
      this.componentInstance
    );
  }
}
