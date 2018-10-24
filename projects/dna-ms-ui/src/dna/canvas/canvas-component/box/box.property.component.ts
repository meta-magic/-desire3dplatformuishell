/**
 * Created by dattaram on 21/2/18.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'box-property',
  template: `
    <ng-container *ngIf="componentInstance">
                    <amexio-checkbox  [field-label]="'Enbale Border'"
                    (onSelection)="onCheckClick($event)">
                    </amexio-checkbox>
                    <ng-container *ngIf="enableBorderField">
                    <amexio-dropdown [(ngModel)]="componentInstance.properties.border"
                    [place-holder]="'Border'"
                    [field-label]="'Border'"
                    [data]="borderListData"
                    [display-field]="'type'"
                    [value-field]="'value'">
                    </amexio-dropdown>
                    </ng-container>
                    
                    <amexio-text-input field-label="Border Color" [(ngModel)]="componentInstance.properties.borderColor"
                                       name="componentInstance.properties.borderColor"
                                       place-holder="Border Color"
                                       icon-feedback="false" [allow-blank]="true">
                    </amexio-text-input>
                    <amexio-text-input field-label="Background Color" [(ngModel)]="componentInstance.properties.backgroundColor"
                                       name="componentInstance.properties.backgroundColor"
                                       place-holder="Background Color"
                                       icon-feedback="false" [allow-blank]="true">
                    </amexio-text-input>
                    <amexio-text-input field-label="Box Height" [(ngModel)]="componentInstance.properties.boxHeight"
                                       name="componentInstance.properties.boxHeight"
                                       place-holder="Box Height"
                                       icon-feedback="false" [allow-blank]="true">
                    </amexio-text-input>
                    <amexio-text-input field-label="Box Width" [(ngModel)]="componentInstance.properties.boxWidth"
                                       name="componentInstance.properties.boxWidth"
                                       place-holder="Box Width"
                                       icon-feedback="false" [allow-blank]="true">
                    </amexio-text-input>
                    <amexio-checkbox    [field-label]="'Padding'"
                    [(ngModel)]="componentInstance.properties.padding">
                    </amexio-checkbox>
                    </ng-container>
  `
})
export class BoxPropertyComponent implements OnInit {
  componentInstance: any;
  borderListData: any;
  enableBorderField: boolean;
  constructor() {
    this.borderListData = [
      {
        type: 'All',
        value: 'all'
      },
      {
        type: 'Top',
        value: 'top'
      },
      {
        type: 'Bottom',
        value: 'bottom'
      },
      {
        type: 'Left',
        value: 'left'
      },
      {
        type: 'Right',
        value: 'right'
      },
      {
        type: 'Top-Bottom',
        value: 'top-bottom'
      },
      {
        type: 'Left-Right',
        value: 'left-right'
      }
    ];
  }

  propertyValidation() {
    this.componentInstance._eventHndl.componentValidation(
      this.componentInstance
    );
  }
  ngOnInit() {}
  //ON CHECK CLICK
  onCheckClick(data: any) {
    if (data) {
      this.enableBorderField = true;
      this.componentInstance.properties.border = 'left';
    } else {
      this.enableBorderField = false;
      this.componentInstance.properties.border = '';
    }
  }
}
