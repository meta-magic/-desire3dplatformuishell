/**
 * Created by dattaram on 23/2/18.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'slider-property',
  template: `

    <ng-container *ngIf="componentInstance">
      <amexio-text-input field-label="Name" [(ngModel)]="componentInstance.properties.name"
                         name="componentInstance.properties.name"
                         place-holder="enter name"
                         icon-feedback="true"
                         (onBlur)="propertyValidation()">
      </amexio-text-input>
      <amexio-number-input [field-label]="'Min Value'" name ="componentInstance.properties.minValue"
                           [allow-blank]="true" [(ngModel)]="componentInstance.properties.minValue">
      </amexio-number-input>
      <amexio-number-input [field-label]="'Max Value'" name ="componentInstance.properties.maxValue"
                           [allow-blank]="true" [(ngModel)]="componentInstance.properties.maxValue">
      </amexio-number-input>

      <amexio-number-input [field-label]="'Step Value'" name ="componentInstance.properties.stepValue"
                           [allow-blank]="true" [(ngModel)]="componentInstance.properties.stepValue">
      </amexio-number-input>

      <amexio-radio-group [field-label]="'Orientation'"
                          name ="orientation"
                          [data-reader]="'data'"
                          [display-field]="'orientation'"
                          [value-field]="'value'"
                          [default-value]="componentInstance.properties.orientation"
                          [data]="orientationData"
                          (onSelection)="getOrientaionData($event)">
      </amexio-radio-group>


      <amexio-checkbox [field-label]="'Disabled'"
                       [(ngModel)]="componentInstance.properties.disabled">
      </amexio-checkbox>
    </ng-container>
              
  `
})
export class SliderPropertyComponent implements OnInit {
  componentInstance: any;
  orientationData: any;
  constructor() {
    this.orientationData = {
      data: [
        {
          orientation: 'horizontal',
          value: 'horizontal'
        },
        {
          orientation: 'Vertical',
          value: 'vertical'
        }
      ]
    };
  }

  ngOnInit() {}

  getOrientaionData(data: any) {
    this.componentInstance.properties.orientation = data.value;
  }

  propertyValidation() {
    this.componentInstance._eventHndl.componentValidation(
      this.componentInstance
    );
  }
}
