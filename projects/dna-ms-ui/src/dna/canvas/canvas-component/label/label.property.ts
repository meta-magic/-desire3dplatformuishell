/**
 * Created by pratik on 23/2/18.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'label-property-component',
  template: `

    <ng-container *ngIf="componentInstance">
    <amexio-text-input field-label="Field Label" [(ngModel)]="componentInstance.properties.fieldLabel"
                       name="componentInstance.properties.fieldLabel"
                       place-holder="enter label"
                       icon-feedback="false" [allow-blank]="true">
    </amexio-text-input>
    <amexio-dropdown [(ngModel)]="componentInstance.properties.size"
                     [place-holder]="'choose'"
                     name="componentInstance.properties.size"
                     [data-reader]="'data'"
                     [field-label]="'Choose Size'"
                     [data]="labelSizeLocalData"
                     [display-field]="'text'"
                     [value-field]="'value'">
    </amexio-dropdown><br>
    
      <label>Font Color :</label>&nbsp;<input type="color" name="favcolor" [(ngModel)]="componentInstance.properties.color"
                                         name="componentInstance.properties.color">
    </ng-container>
 `
})
export class LabelPropertyComponent implements OnInit {
  componentInstance: any;
  labelSizeLocalData: any;
  constructor() {
    this.labelSizeLocalData = {
      data: [
        {
          text: 'Large',
          value: 'large'
        },
        {
          text: 'Medium',
          value: 'medium'
        },
        {
          text: 'Small',
          value: 'small'
        },
        {
          text: 'Bold',
          value: 'bold'
        },
        {
          text: 'Large Bold',
          value: 'large-bold'
        },
        {
          text: 'Medium Bold',
          value: 'medium-bold'
        },
        {
          text: 'Small Bold',
          value: 'small-bold'
        }
      ]
    };
  }

  ngOnInit() {}
}
