/**
 * Created by pratik on 12/3/18.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'accordion-container-property',
  template: `

    <ng-container *ngIf="componentInstance">
      <amexio-text-input field-label="Name" [(ngModel)]="componentInstance.properties.name"
                         name="componentInstance.properties.name"
                         place-holder="enter name"
                         icon-feedback="true">
      </amexio-text-input>

      <amexio-checkbox [field-label]="'Expand All'"
                       [(ngModel)]="componentInstance.properties.expandAll">
      </amexio-checkbox>

      <amexio-checkbox [field-label]="'Transparent'"
                       [(ngModel)]="componentInstance.properties.transparent">
      </amexio-checkbox>

      <amexio-checkbox [field-label]="'Angle Icon'"
                       [(ngModel)]="componentInstance.properties.angleIcon">
      </amexio-checkbox>


      <amexio-button size="small" [label]="'Add'"
                     [type]="'primary'"
                     (onClick)="onTabAdd()"
                     [tooltip]="'primary'">
      </amexio-button>
      <amexio-button  size="small" [label]="'Remove'"
                      [type]="'warning'"
                      (onClick)="onTabRemove()"
                      [tooltip]="'remove'">
      </amexio-button>
    </ng-container>

  `
})
export class AccordionContainerPropertyComponent implements OnInit {
  componentInstance: any;

  constructor() {}

  ngOnInit() {}

  onTabAdd() {
    this.componentInstance.createComponentConfig();
  }

  onTabRemove() {
    let pillToDelete = this.componentInstance.tabpillCollection.pop();
    this.componentInstance._eventHndl.deleteComponentRef =
      pillToDelete.componentId;
    this.componentInstance._eventHndl.deleteComponent();
  }
}
