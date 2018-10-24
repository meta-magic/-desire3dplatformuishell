import { Component, OnInit } from '@angular/core';
import { EventNode } from '../models/event.basemodel';
import { EventRelationshipService } from '../../canvas-service/event-relationship.service';
import { SharedDataService } from '../../canvas-service/shared-data.service';

@Component({
  selector: 'update-model',
  template: `
      <amexio-label font-color="#436EC1" >Update {{_sharedDataService.uiDetails.name}} Model</amexio-label>
      <amexio-label (onClick)="showUpdateModelWindow = true" [enable-click]="true" *ngIf="metadata.defination.length > 0"  size="small-bold" font-color="red">
        update /
      </amexio-label>
      <amexio-label (onClick)="showUpdateModelWindow = true" [enable-click]="true" *ngIf="metadata.defination.length == 0" size="small-bold" font-color="red">
        add /
      </amexio-label>
      <amexio-label (onClick)="removeServiceBlock()" [enable-click]="true"  size="small-bold" font-color="red">
        remove
      </amexio-label>
      <br>
     
      <ng-container *ngIf="showUpdateModelWindow">
        <update-model-behaviour [(show)]="showUpdateModelWindow" [updateModelMetadata]="metadata"></update-model-behaviour>
      </ng-container>
      
    `
})
export class UpdateModelBlockBehaviour implements OnInit {
  showUpdateModelWindow: boolean = false;
  title: string;
  metadata: any;
  id: any;
  body: any[] = [];
  config: any = {};
  constructor(
    private _eventRelationshipService: EventRelationshipService,
    public _sharedDataService: SharedDataService
  ) {
    this.title = 'Condition is';
    this.metadata = new UpdateModelMetaData();
  }

  ngOnInit() {
    this.id = +Math.floor(Math.random() * 90000) + 10000 + '_updatemodel';
  }
  removeServiceBlock() {
    this._eventRelationshipService.removeLogicBlock(this.id);
  }
}

export class UpdateModelMetaData extends EventNode {
  constructor() {
    super();
    this.type = 'updatemodel';
  }
}
