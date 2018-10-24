/**
 * Created by dattaram on 25/9/18.
 */


import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { RelationshipBlockMap } from '../../canvas-component-map/retionship.map';
import { EventNode } from '../models/event.basemodel';
import { EventRelationshipService } from '../../canvas-service/event-relationship.service';
import {NotificationService} from "../../canvas-service/notification.service";

@Component({
  selector: 'else-if-behaviour',
  template: `
    <table style="color: #000000; " (drop)="onDrop($event)" (dragover)="onDragOver($event)">
      <tr>
        <td colspan="2">
          <amexio-label>Else If:</amexio-label>
            <amexio-label font-color="green">{{title}}</amexio-label>
            <amexio-label>Is Matched</amexio-label>
            <amexio-label (onClick)="this.showConditionBindingWindow = true" [enable-click]="true" *ngIf="metadata.defination.length > 0" size="small-bold" font-color="red">
                update /
            </amexio-label>
          <amexio-label (onClick)="showConditionBindingWindow = true" [enable-click]="true" *ngIf="metadata.defination.length == 0" size="small-bold" font-color="red">
            add /
          </amexio-label>
          <amexio-label (onClick)="removeServiceBlock()" [enable-click]="true"  size="small-bold" font-color="red">
            remove
          </amexio-label>

        </td>
      </tr>
      <tr>
        <td colspan="1" style="vertical-align:top;">
          <amexio-label>Then</amexio-label>
        </td>
        <td width="100%" class="curly-braces">
          <div class="curly-braces-contains">
            <ng-template #target></ng-template>
          </div>
        </td>
      </tr>
    </table>

    <ng-container *ngIf="showConditionBindingWindow">
      <condition-binding-component-behaviour (onClick)="getOnClick($event)" [(show)]="showConditionBindingWindow" [conditionMetadata]="metadata"></condition-binding-component-behaviour>
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
    `
  ]
})
export class ElseIfBlockBehaviour implements OnInit {
  @ViewChild('target', { read: ViewContainerRef })
  target: any;
  showConditionBindingWindow: boolean = false;
  title: string;
  body: any[] = [];
  metadata: any;
  config: any = {};
  id: any;

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _eventRelationshipService: EventRelationshipService,
    private _notificationService: NotificationService
  ) {
    this.title = 'Condition';
    this.metadata = new ElseIfMetaData();
  }

  ngOnInit() {
    this.id = +Math.floor(Math.random() * 90000) + 10000 + '_elseif';
    if (this.metadata.metadata.hasOwnProperty('conditionStatement')) {
      this.title = this.metadata.metadata.conditionStatement;
    }
  }

  onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: any) {
    if(this.metadata.defination.length > 0) {
      if (this._eventRelationshipService.eventLogicBlockDragKey == 'EVR') {
        event.preventDefault();
        event.stopPropagation();
        let componentInstance: any;
        componentInstance = this.createComponentInstance(
            JSON.parse(event.dataTransfer.getData('dragdata')).key
        );
        componentInstance.instance.metadata.parentRef = JSON.parse(JSON.stringify(this.metadata.parentRef));
        componentInstance.instance.config = this.config;
        componentInstance.instance.config.onRoot = false;
        this.body.push(componentInstance);
        this._eventRelationshipService.eventLogicBlockDragKey = '';
      }
    } else {
      this._eventRelationshipService.eventLogicBlockDragKey = '';
      this._notificationService.setNotificationData(
          true,
          ['Please add Else If Condition Definition.'],
          'red'
      );
    }

  }

  createComponentInstance(key: string): any {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(
      RelationshipBlockMap.Block_MAP[key]
    );
    const componentInstance = this.target.createComponent(componentFactory);
    return componentInstance;
  }

  removeServiceBlock() {
    this._eventRelationshipService.removeLogicBlock(this.id);
  }
  getOnClick(event: any) {
    this.title = event;
  }
}

export class ElseIfMetaData extends EventNode {
  constructor() {
    super();
    this.type = 'elseif';
  }
}
