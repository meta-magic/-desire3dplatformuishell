import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'listbox-property',
  template: `    
  <ng-container *ngIf="componentInstance">

                  <amexio-text-input field-label="Name" [(ngModel)]="componentInstance.properties.name"
                                    name="componentInstance.properties.name"
                                    place-holder="enter name"
                                    icon-feedback="true"
                                    (onBlur)="propertyValidation()">
                  </amexio-text-input>
                  <amexio-text-input field-label="Title" [(ngModel)]="componentInstance.properties.header"
                  name="componentInstance.properties.header"
                  place-holder="enter title"
                  icon-feedback="true"
                  (onBlur)="propertyValidation()">
                  </amexio-text-input>
    <amexio-number-input [enable-popover]="false" [(ngModel)]="componentInstance.properties.height"
                         [field-label]="'Height'"
                         [place-holder]="'height'"
                         [allow-blank]="true"
                         [min-value]="1"
                         [max-value]="1000">
    </amexio-number-input>
                  <amexio-checkbox [field-label]="'Enable Filter'"
                  [(ngModel)]="componentInstance.properties.filter">
                  </amexio-checkbox>
                  <ng-container *ngIf="componentInstance.properties.filter">
                  <amexio-text-input field-label="Search Placeholder" [(ngModel)]="componentInstance.properties.searchPlaceholder"
                  name="componentInstance.properties.searchPlaceholder"
                  place-holder="enter search placeholder"
                  icon-feedback="true"
                  (onBlur)="propertyValidation()">
                  </amexio-text-input>
                  </ng-container>


                  <amexio-checkbox [field-label]="'Enable Checkbox'"
                  [(ngModel)]="componentInstance.properties.enableCheckbox" >
                  </amexio-checkbox>
                  </ng-container>
     <!-- <amexio-tab [icon]="componentInstance._eventHndl._sharedDataService.behaviourIcon">
        <ng-container *ngIf="componentInstance">
          <br><amexio-button [block]="true" label="Datasource" size="medium" type="primary" (onClick)="componentInstance._eventHndl.createDatasourceInstance(componentInstance)"></amexio-button>

          <show-event-list [componentInstance]="componentInstance"></show-event-list>
        </ng-container>
      </amexio-tab>-->


  `
})
export class ListboxPropertyComponent implements OnInit {
  componentInstance: any;
  constructor() {}

  propertyValidation() {
    this.componentInstance._eventHndl.componentValidation(
      this.componentInstance
    );
  }

  ngOnInit() {}
}
