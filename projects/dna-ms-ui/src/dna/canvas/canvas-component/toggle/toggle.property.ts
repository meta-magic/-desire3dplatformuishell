/**
 * Created by dattaram on 23/2/18.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'toggle-property',
  template: `    
          <amexio-text-input field-label="Name" [(ngModel)]="componentInstance.properties.name"
          name="componentInstance.properties.name"
          place-holder="Enter name"
          icon-feedback="true"
          (onBlur)="propertyValidation()">
          </amexio-text-input>
          <amexio-text-input field-label="Field Label" [(ngModel)]="componentInstance.properties.fieldLabel"
          name="componentInstance.properties.fieldLabel"
          place-holder="Enter Label"
          icon-feedback="false" [allow-blank]="true">
          </amexio-text-input>
          <amexio-radio-group [field-label]="'Toggle Shape'"
          name ="shape"
          [data-reader]="'data'"
          [display-field]="'shape'"
          [value-field]="'value'"
          [default-value]="componentInstance.properties.shape"
          [data]="shapeData"
          (onSelection)="getShapeData($event)">
          </amexio-radio-group>
       
     <!-- <amexio-tab [icon]="componentInstance._eventHndl._sharedDataService.behaviourIcon">
        <ng-container *ngIf="componentInstance">
          <show-event-list [componentInstance]="componentInstance"></show-event-list>
        </ng-container>
      </amexio-tab>-->

  `
})
export class TogglePropertyComponent implements OnInit {
  componentInstance: any;
  shapeData: any;
  constructor() {
    this.shapeData = {
      data: [
        {
          shape: 'Round',
          value: 'round'
        },
        {
          shape: 'Square',
          value: 'square'
        }
      ]
    };
  }

  ngOnInit() {}

  getShapeData(data: any) {
    this.componentInstance.properties.shape = data.value;
  }

  propertyValidation() {
    this.componentInstance._eventHndl.componentValidation(
      this.componentInstance
    );
  }
}
