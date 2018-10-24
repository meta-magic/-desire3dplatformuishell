import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tree-property',
  template: `
<ng-container *ngIf="componentInstance">

<amexio-text-input field-label="Name" [(ngModel)]="componentInstance.properties.name"
                   name="componentInstance.properties.name"
                   place-holder="enter name"
                   icon-feedback="true"
                   (onBlur)="propertyValidation()">
</amexio-text-input>
<amexio-checkbox [field-label]="'Enable Checkbox'"
[(ngModel)]="componentInstance.properties.enableCheckbox" >
</amexio-checkbox>

<amexio-checkbox [field-label]="'Enable Filter'"
[(ngModel)]="componentInstance.properties.filter">
</amexio-checkbox>

</ng-container>

    <!--  <amexio-tab [icon]="componentInstance._eventHndl._sharedDataService.behaviourIcon">
        <ng-container *ngIf="componentInstance">
          <br><amexio-button [block]="true" label="Datasource" size="medium" type="primary" (onClick)="componentInstance._eventHndl.createDatasourceInstance(componentInstance)"></amexio-button>

          <show-event-list [componentInstance]="componentInstance"></show-event-list>
        </ng-container>
      </amexio-tab>-->
  


  `
})
export class TreePropertyComponent implements OnInit {
  componentInstance: any;
  constructor() {}

  propertyValidation() {
    this.componentInstance._eventHndl.componentValidation(
      this.componentInstance
    );
  }

  ngOnInit() {}
}
