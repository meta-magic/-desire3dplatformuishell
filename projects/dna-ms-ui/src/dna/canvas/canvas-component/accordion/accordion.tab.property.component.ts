/**
 * Created by pratik on 12/3/18.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'accordion-pill-property',
  template: `    
        
    <ng-container *ngIf="componentInstance">
      <amexio-text-input field-label="name" [(ngModel)]="componentInstance.properties.name"
                         place-holder="name"
                         icon-feedback="true">
      </amexio-text-input>

      <amexio-text-input field-label="Header" [(ngModel)]="componentInstance.properties.header"
                         name="componentInstance.properties.header"
                         place-holder="name"
                         icon-feedback="true">
      </amexio-text-input>

      <amexio-checkbox [field-label]="'Active'"
                       [(ngModel)]="componentInstance.properties.active"
                       (onSelection)="setActive()">
      </amexio-checkbox>

      <amexio-checkbox [field-label]="'Disabled'"
                       [(ngModel)]="componentInstance.properties.disabled"
                       (onSelection)="setDisabled()">
      </amexio-checkbox>
    </ng-container>
        
        

      <!--  <amexio-button [label]="'Add Tab'"
                       [type]="'primary'"
                       (onClick)="onAddTab()"
                       [tooltip]="'add'">
        </amexio-button>
      
        <amexio-button [label]="'Remove Tab'"
                       [type]="'primary'"
                       [tooltip]="'remove'">
        </amexio-button>-->
  `
})
export class AccordionTabPropertyComponent implements OnInit {
  componentInstance: any;
  constructor() {}

  ngOnInit() {}

  updateTitle() {
    this.componentInstance.title = this.componentInstance.properties.title;
  }
  setDisabled() {
    this.componentInstance.disabled = this.componentInstance.properties.disabled;
  }
  setActive() {
    this.componentInstance.active = this.componentInstance.properties.active;
  }
}
