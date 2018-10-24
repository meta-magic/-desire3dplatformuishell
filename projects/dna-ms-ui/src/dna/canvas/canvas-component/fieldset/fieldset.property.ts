/**
 * Created by dattaram on 21/2/18.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fieldset-property',
  template: `    
    <ng-container *ngIf="componentInstance">
      <amexio-text-input field-label="Title" [(ngModel)]="componentInstance.properties.title"
                         name="componentInstance.properties.title"
                         place-holder="enter title"
                         icon-feedback="false" [allow-blank]="true">
      </amexio-text-input>
      <br>
      <amexio-checkbox [field-label]="'Enable Collapsible'"
                       [(ngModel)]="componentInstance.properties.collapsible">
      </amexio-checkbox>
    </ng-container>
    
  `
})
export class FieldSetPropertyComponent implements OnInit {
  componentInstance: any;
  title: any;
  constructor() {}

  ngOnInit() {}
}
