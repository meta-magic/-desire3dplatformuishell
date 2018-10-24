/**
 * Created by pratik on 28/2/18.
 */
/**
 * Created by pratik on 23/2/18.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'password-field-property',
  template: `
    
   <ng-container *ngIf="componentInstance">
<amexio-text-input field-label="Name" [(ngModel)]="componentInstance.properties.name"
                   name="componentInstance.properties.name"
                   place-holder="enter name"
                   icon-feedback="true" (onBlur)="propertyValidation()">
</amexio-text-input>

<amexio-number-input [enable-popover]="false" [(ngModel)]="componentInstance.properties.pages"
                     name="componentInstance.properties.pages"
                     [field-label]="'Pages'"
                     [place-holder]="'Pages'"
                     [allow-blank]="false"
                     [min-value]="1">
</amexio-number-input>

<amexio-number-input [enable-popover]="false" [(ngModel)]="componentInstance.properties.rows"
                     name="componentInstance.properties.rows"
                     [field-label]="'Rows'"
                     [place-holder]="'rows'"
                     [allow-blank]="false"
                     [min-value]="1">
</amexio-number-input>


</ng-container>

  `
})
export class PaginatorPropertyComponent implements OnInit {
  componentInstance: any;
  constructor() {}

  ngOnInit() {}

  propertyValidation() {
    this.componentInstance._eventHndl.componentValidation(
      this.componentInstance
    );
  }
}
