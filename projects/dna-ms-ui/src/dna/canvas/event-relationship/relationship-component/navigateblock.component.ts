/**
 * Created by dattaram on 3/7/18.
 */

import { Component, OnInit } from '@angular/core';
import { EventNode } from '../models/event.basemodel';
import { EventRelationshipService } from '../../canvas-service/event-relationship.service';
import { SharedDataService } from '../../canvas-service/shared-data.service';

@Component({
  selector: 'navigateblock-model',
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
                <amexio-label> Navigate To &nbsp;</amexio-label>
                <amexio-label font-color="green" > {{title}}&nbsp;:</amexio-label>
              <amexio-label (onClick)="this.showNavigateWindow = true" [enable-click]="true" *ngIf="metadata.defination.length > 0" size="small-bold" font-color="red">
                update /
              </amexio-label>
              <amexio-label  *ngIf="metadata.defination.length == 0" (onClick)="showNavigateWindow = true" [enable-click]="true"
                             size="small-bold" font-color="red">
                add /
              </amexio-label>
              <amexio-label (onClick)="removeServiceBlock()" [enable-click]="true"  size="small-bold" font-color="red">
                remove
              </amexio-label>
              <ng-template #target></ng-template>
            </div>
          </td>
        </tr>
      </ng-container>
      <ng-template #onChild>
        <div class="without-curly-braces">
                    <amexio-label> Navigate To &nbsp;</amexio-label>
                    <amexio-label font-color="green" > {{title}}&nbsp;:</amexio-label>
                    <amexio-label (onClick)="this.showNavigateWindow = true" [enable-click]="true" *ngIf="metadata.defination.length > 0" size="small-bold" font-color="red">
                        update /
                    </amexio-label>
                    <amexio-label  *ngIf="metadata.defination.length == 0" (onClick)="showNavigateWindow = true" [enable-click]="true"
                                   size="small-bold" font-color="red">
                        add /
                    </amexio-label>
                    <amexio-label (onClick)="removeServiceBlock()" [enable-click]="true"  size="small-bold" font-color="red">
                        remove
                    </amexio-label>
      
        </div>
      </ng-template>

    </table>

    <ng-container *ngIf="showNavigateWindow">
      <navigate-model (onSaveClick)="getSaveClick($event)" [(show)]="showNavigateWindow" [metadata]="metadata" ></navigate-model>
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
      width: 100%;
      padding: 10px;
    }
    `
  ]
})
export class NavigateBlockBehaviour implements OnInit {
  showNavigateWindow = false;
  title: string;
  metadata: any;
  id: any;
  body: any[] = [];
  config: any = {};
  whenStatement = '';
  constructor(
    private _eventRelationshipService: EventRelationshipService,
    public _sharedDataService: SharedDataService
  ) {
    this.title = '';
    this.metadata = new NavigateModelMetaData();
  }
  ngOnInit() {
    if (this.metadata.hasOwnProperty('navigate')) {
      let obj: any = {
        text: '',
        fieldName: '',
        fieldLabel: '',
        fieldType: '',
        inputParamTypeId: 1,
        expanded: false,
        children: null,
        id: null,
        values: [],
        collection: false
      };
      this.metadata.obj['navigate'] = this.metadata.navigation;
    }
    this.id = +Math.floor(Math.random() * 90000) + 10000 + '_navigate';
    this.createWhenString();
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

  getSaveClick(event: any) {
   this.title = event.boundedContext + '/' + event.domain + '/' + event.name;
  }
}

export class NavigateModelMetaData extends EventNode {
  constructor() {
    super();
    this.type = 'navigate';
  }
}
