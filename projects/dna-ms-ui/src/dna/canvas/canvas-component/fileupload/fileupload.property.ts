/**
 * Created by pratik on 23/2/18.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'file-uplpoad-property',
  template: `    
    <ng-container *ngIf="componentInstance">

         <amexio-text-input field-label="Name" [(ngModel)]="componentInstance.properties.name"
                            name="componentInstance.properties.name"
                            place-holder="enter name"
                            icon-feedback="true"
                            (onBlur)="propertyValidation()">
         </amexio-text-input>
         <amexio-text-input field-label="Field Label" [(ngModel)]="componentInstance.properties.fieldLabel"
                            name="componentInstance.properties.fieldLabel"
                            place-holder="field label"
                            icon-feedback="false" [allow-blank]="true">
         </amexio-text-input>

         <amexio-text-input field-label="File Type" [(ngModel)]="componentInstance.properties.fileType"
                            name="componentInstance.properties.fileType"
                            place-holder="file type"
                            icon-feedback="false" [allow-blank]="true">
         </amexio-text-input> 
  
        <amexio-text-input field-label="Parameter Name" [(ngModel)]="componentInstance.properties.requestParamName"
                            name="componentInstance.properties.requestParamName"
                            place-holder="parameter name"
                            icon-feedback="false" [allow-blank]="true">
         </amexio-text-input> 
  
          <amexio-text-input field-label="Http URL" [(ngModel)]="componentInstance.properties.httpUrl"
                            name="componentInstance.properties.httpUrl"
                            place-holder="url"
                            icon-feedback="false" [allow-blank]="true">
         </amexio-text-input>
  
        <amexio-text-input field-label="Http Method" [(ngModel)]="componentInstance.properties.httpMethod"
                            name="componentInstance.properties.httpMethod"
                            place-holder="Method"
                            icon-feedback="false" [allow-blank]="true">
         </amexio-text-input>
  
  

         <amexio-checkbox [field-label]="'Allow Multiple Files'"
                          [(ngModel)]="componentInstance.properties.multipleFile" (onSelection)="toggle()">
         </amexio-checkbox>

         <amexio-checkbox [field-label]="'Droppable'"
                          [(ngModel)]="componentInstance.properties.droppable">
         </amexio-checkbox>
        

       </ng-container>
  
    <!-- <amexio-tab [icon]="componentInstance._eventHndl._sharedDataService.behaviourIcon">
       <ng-container *ngIf="componentInstance">
         <show-event-list [componentInstance]="componentInstance"></show-event-list>
       </ng-container>
     </amexio-tab>-->
 `
})
export class FileUploadPropertyComponent implements OnInit {
  componentInstance: any;
  enableMultipleFile = false;
  constructor() {}

  ngOnInit() {}

  propertyValidation() {
    this.componentInstance._eventHndl.componentValidation(
      this.componentInstance
    );
  }

  toggle() {
    /* this.enableMultipleFile = !this.enableMultipleFile;
    if (this.enableMultipleFile) {
      this.componentInstance.properties.multipleFile = '*';
    } else {
      this.componentInstance.properties.multipleFile = '';
    }*/
  }
}
