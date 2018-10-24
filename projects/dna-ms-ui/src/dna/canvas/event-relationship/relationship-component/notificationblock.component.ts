/**
 * Created by dattaram on 3/7/18.
 */

import { Component, OnInit } from '@angular/core';
import { EventNode } from '../models/event.basemodel';
import { EventRelationshipService } from '../../canvas-service/event-relationship.service';
import { SharedDataService } from '../../canvas-service/shared-data.service';

@Component({
  selector: 'notification',
  template: `

    <table style="color: #000000; ">
      <ng-container *ngIf="config.onRoot; else onChild">
        <tr>
          <td colspan="2">
            <amexio-label>
              {{whenStatement}}
            </amexio-label>
          </td>
        </tr>
        <tr>
          <td colspan="1" style="vertical-align:top;">
            <amexio-label>Then &nbsp;&nbsp;</amexio-label>

          </td>
          <td width="100%" class="curly-braces">
            <div class="curly-braces-contains">
              <amexio-label>Notify &nbsp;:</amexio-label>
              <amexio-label (onClick)="this.showNotificationModelWindow = true" [enable-click]="true" *ngIf="metadata.defination.length > 0" size="small-bold" font-color="red">
                update /
              </amexio-label>
              <amexio-label  *ngIf="metadata.defination.length == 0" (onClick)="showNotificationModelWindow = true" [enable-click]="true"
                             size="small-bold" font-color="red">add /</amexio-label>
              <amexio-label (onClick)="removeServiceBlock()" [enable-click]="true"  size="small-bold" font-color="red">
                remove
              </amexio-label>
            </div>
          </td>
        </tr>
      </ng-container>
      <ng-template #onChild>
        <div class="without-curly-braces">
          <amexio-label>Notify &nbsp;:</amexio-label>
          <amexio-label (onClick)="this.showNotificationModelWindow = true" [enable-click]="true" *ngIf="metadata.defination.length > 0" size="small-bold" font-color="red">
            update /
          </amexio-label>
          <amexio-label  *ngIf="metadata.defination.length == 0" (onClick)="showNotificationModelWindow = true" [enable-click]="true"
                         size="small-bold" font-color="red">add /</amexio-label>
          <amexio-label (onClick)="removeServiceBlock()" [enable-click]="true"  size="small-bold" font-color="red">remove</amexio-label>
        </div>
      </ng-template>

    </table>
    <ng-container *ngIf="showNotificationModelWindow">
      <notification-model [(show)]="showNotificationModelWindow" [notificationMetadata]="metadata"></notification-model>
    </ng-container>

  `,
  styles: [
    `.curly-braces {
      border-left: 2px dashed;
      border-right: 2px dashed;
      border-color: #000000;
      border-radius: 15px;
    }
      .curly-braces-contains {
        min-height:50px;
        width: 95%; 
        padding: 10px;
      }
      .without-curly-braces {
        width: 95%;
        padding: 10px;
      }
    `
  ]
})
export class NotificationBlockBehaviour implements OnInit {
  showNotificationModelWindow: boolean = false;
  metadata: any;
  id: any;
  body: any[] = [];
  config: any = {};
  whenStatement: string = '';
  constructor(
    private _eventRelationshipService: EventRelationshipService,
    public _sharedDataService: SharedDataService
  ) {
    this.metadata = new NotificationModelMetaData();
  }

  ngOnInit() {
    this.createWhenString();
    this.id = +Math.floor(Math.random() * 90000) + 10000 + '_';
  }
  removeServiceBlock() {
    this._eventRelationshipService.removeLogicBlock(this.id);
  }

  createWhenString() {
    if (this.config.componentName == 'rootpane') {
      this.whenStatement =
        'When : ' +
        this._sharedDataService.uiDetails.name +
        ' ' +
        this.config.eventName +
        ' event';
    } else {
      this.whenStatement =
        'Given : ' +
        this.config.componentLabel +
        ' ' +
        this.config.componentName +
        ' ' +
        this.config.eventName +
        ' event';
    }
  }
}

export class NotificationModelMetaData extends EventNode {
  constructor() {
    super();
    this.type = 'notify';
  }
}
