/**
 * Created by dattaram on 21/2/18.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'column-property',
  template: `
        <ng-container *ngIf="componentInstance">
          <amexio-number-input [enable-popover]="false" [ngModel]="componentInstance.properties.columnlg"
                               (ngModelChange)="onModelChange($event)"
                               name="componentInstance.properties.columnlg"
                               [field-label]="'Column'"
                               [place-holder]="'column'"
                               [allow-blank]="true"
                               [min-value]="1"
                               [max-value]="12">
          </amexio-number-input>
        </ng-container>

  `
})
export class ColumnPropertyComponent implements OnInit {
  maxValue: number = 1;
  componentInstance: any;
  previousValue: number;
  value: number;
  constructor() {}

  ngOnInit() {
    this.value = this.componentInstance.properties.columnlg;
  }

  onModelChange(event: any) {
    if (event && event) {
      let currentVal: number = parseInt(event);
      if (currentVal > this.value) {
        this.componentInstance.increaseColumn(currentVal);
      } else {
        this.componentInstance.descreaseColumn(currentVal);
      }
      //this.value = currentVal;
    }
  }
  getMaxValue(param: any, from: any): number {
    if (param == null) {
      let rowOccupiedSpace: number = 0;
      // On every render -> Calculate the surronding space left -> maxValue
      if (this.componentInstance != null) {
        if (this.componentInstance.hasOwnProperty('parentComponentRef')) {
          this.componentInstance.parentComponentRef.children.forEach(
            (child: any, index: number) => {
              rowOccupiedSpace += parseInt(child.instance.properties.columnlg);
            }
          );
        }
      }
      let val = 12 - rowOccupiedSpace;
      //Assuming that the default init is correct TODO ?
      if (val > this.componentInstance.properties.columnlg) {
        this.maxValue = val;
        this.componentInstance.adjustColumnSize();
        return val;
      } else {
        this.componentInstance.adjustColumnSize();
        return this.componentInstance.properties.columnlg;
      }
    } else {
      if (this.componentInstance.availableMax == 0) {
        let currentVal: number = parseInt(param);
        this.previousValue = currentVal;
        if (currentVal > this.previousValue)
          this.componentInstance.properties.columnlg = currentVal - 1;
        //on increase
        else this.componentInstance.properties.columnlg = currentVal; //on decrease
        this.maxValue = currentVal - 1;
      } else {
        this.componentInstance.properties.columnlg = param;
        this.maxValue = this.componentInstance.availableMax - parseInt(param);
        this.componentInstance.availableMax = this.maxValue;
      }
      this.componentInstance.adjustColumnSize();
      return 1;
    }
  }
}
