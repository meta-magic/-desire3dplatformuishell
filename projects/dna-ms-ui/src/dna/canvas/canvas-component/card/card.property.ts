/**
 * Created by dattaram on 1/3/18.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'card-property',
  template: `
    <ng-container *ngIf="componentInstance">
        <ng-container *ngIf="!componentInstance.properties.customHeader">
          <amexio-text-input [enable-popover]="false" [(ngModel)]="componentInstance.properties.header"
                             [field-label]="'Header'"
                             [place-holder]="'header'"
                             [allow-blank]="true">
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
          <div>
            <label>Font Color :</label>&nbsp;<input
            type="color" name="favcolor"
            [(ngModel)]="componentInstance.properties.color"
            name="componentInstance.properties.color">
          </div>
          <br>
        </ng-container>
        <amexio-number-input [enable-popover]="false" [(ngModel)]="componentInstance.properties.height"
                             [field-label]="'Height'"
                             [place-holder]="'height'"
                             [allow-blank]="true"
                             [min-value]="1"
                             [max-value]="100">
        </amexio-number-input>
        <amexio-dropdown [(ngModel)]="componentInstance.properties.headerAlign"
                         [place-holder]="'select'"
                         [field-label]="'Header Alignment'"
                         [data]="alignData"
                         [display-field]="'type'"
                         [value-field]="'value'">
        </amexio-dropdown>
        <amexio-dropdown [(ngModel)]="componentInstance.properties.footerAlign"
                         [place-holder]="'select'"
                         [field-label]="'Footer Alignment'"
                         [data]="alignData"
                         [display-field]="'type'"
                         [value-field]="'value'">
        </amexio-dropdown>
        <amexio-checkbox [field-label]="'Custom Header'"
                          [(ngModel)]="componentInstance.properties.customHeader">
        </amexio-checkbox>
        
        <amexio-checkbox [field-label]="'Show'"
                          [(ngModel)]="componentInstance.properties.show">
        </amexio-checkbox>
      <amexio-checkbox  [field-label]="'Enable Header'"
      [(ngModel)]="componentInstance.properties.enableHeader">
      </amexio-checkbox>
      <amexio-checkbox  [field-label]="'Enable Footer'"
      [(ngModel)]="componentInstance.properties.enableFooter">
      </amexio-checkbox>
    </ng-container>
  `
})
export class CardPropertyComponent implements OnInit {
  componentInstance: any;
  alignData: any;
  labelSizeLocalData: any;
  constructor() {
    this.alignData = [
      {
        type: 'Right',
        value: 'right'
      },
      {
        type: 'Center',
        value: 'center'
      },
      {
        type: 'Left',
        value: 'left'
      }
    ];

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
