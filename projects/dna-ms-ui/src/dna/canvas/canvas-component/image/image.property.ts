import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'image-property',
  template: `    
     <ng-container *ngIf="componentInstance">
<amexio-text-input field-label="Name" [(ngModel)]="componentInstance.properties.name"
name="componentInstance.properties.name"
place-holder="enter name"
icon-feedback="true"
(onBlur)="propertyValidation()">
</amexio-text-input>
<amexio-text-input field-label="Path" [(ngModel)]="componentInstance.properties.path"
name="componentInstance.properties.path"
place-holder="enter file path"
icon-feedback="false" [allow-blank]="true">
</amexio-text-input>

<amexio-text-input field-label="Tooltip" [(ngModel)]="componentInstance.properties.tooltip"
name="componentInstance.properties.tooltip"
place-holder="enter tooltip"
icon-feedback="false" [allow-blank]="true">
</amexio-text-input>

<amexio-text-input field-label="Title" [(ngModel)]="componentInstance.properties.title"
name="componentInstance.properties.title"
place-holder="enter title"
icon-feedback="false" [allow-blank]="true">
</amexio-text-input>

<amexio-text-input field-label="Height" [(ngModel)]="componentInstance.properties.height"
name="componentInstance.properties.height"
place-holder="enter height"
icon-feedback="false" [allow-blank]="true">
</amexio-text-input>

<amexio-text-input field-label="Width" [(ngModel)]="componentInstance.properties.width"
name="componentInstance.properties.width"
place-holder="enter width"
icon-feedback="false" [allow-blank]="true">
</amexio-text-input>
</ng-container>


  `
})
export class ImagePropertyComponent implements OnInit {
  componentInstance: any;
  constructor() {}

  propertyValidation() {
    this.componentInstance._eventHndl.componentValidation(
      this.componentInstance
    );
  }

  ngOnInit() {}
}
