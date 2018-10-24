/**
 * Created by dattaram on 3/7/18.
 */
import { Component } from '@angular/core';

@Component({
  selector: 'behaviour',
  template: `    
      <ng-container *ngIf="enableDatasource()">
        <amexio-button [block]="true" label="Datasource" size="medium"   [type]="'green'"  (onClick)="componentInstance._eventHndl.createDatasourceInstance(componentInstance)"></amexio-button>
      </ng-container>
      <ng-container *ngIf="enableRelationship()">
        <show-event-list [componentInstance]="componentInstance" ></show-event-list>
      </ng-container>
  `
})
export class BehaviourComponent {
  componentInstance: any;
  constructor() {}

  enableDatasource(): boolean {
    if (this.componentInstance) {
      return this.componentInstance.componentBehaviour.hasDataSource;
    } else {
      return false;
    }
  }

  enableRelationship(): boolean {
    if (this.componentInstance) {
      return this.componentInstance.componentBehaviour.hasRelationship;
    } else {
      return false;
    }
  }
}
