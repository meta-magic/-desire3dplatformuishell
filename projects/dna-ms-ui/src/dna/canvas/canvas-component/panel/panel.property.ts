/**
 * Created by dattaram on 21/2/18.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'panel-property',
  template: `
    <ng-container *ngIf="componentInstance">
      <amexio-text-input field-label="Title" [(ngModel)]="componentInstance.properties.title"
                         name="componentInstance.properties.title"
                         place-holder="enter title"
                         icon-feedback="false" [allow-blank]="true">
      </amexio-text-input>
      <br>
      <amexio-number-input field-label="Height" [(ngModel)]="componentInstance.properties.height"
                         name="componentInstance.properties.height"
                         place-holder="enter height"
                           [min-value]="1"
                           [max-value]="100"
                         icon-feedback="false"
                           [allow-blank]="true">
      </amexio-number-input>
      <amexio-checkbox [field-label]="'Enable header'"
                       [(ngModel)]="componentInstance.properties.header">
      </amexio-checkbox>
      <amexio-checkbox [field-label]="'Enable expanded'"
                       [(ngModel)]="componentInstance.properties.expanded">
      </amexio-checkbox>
    </ng-container>

  `
})
export class PanelPropertyComponent implements OnInit {
  componentInstance: any;
  constructor() {}

  propertyValidation() {
    this.componentInstance._eventHndl.componentValidation(
      this.componentInstance
    );
  }

  ngOnInit() {}
}
