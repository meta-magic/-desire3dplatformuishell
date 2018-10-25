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
  selector: 'condition-behaviour',
  template: `
    <table style="color: #000000; " (drop)="onDrop($event)" (dragover)="onDragOver($event)">
      <tr>
        <td colspan="2">
          <amexio-label>If:</amexio-label>
          <amexio-label font-color="green">{{title}} </amexio-label>
          <amexio-label>Is Matched</amexio-label>
          <amexio-label (onClick)="this.showConditionBindingWindow = true" [enable-click]="true" *ngIf="body[0].instance.metadata.defination.length > 0" size="small-bold" font-color="red">
            update /
          </amexio-label>
          <amexio-label (onClick)="showConditionBindingWindow = true" [enable-click]="true" *ngIf="body[0].instance.metadata.defination.length == 0" size="small-bold" font-color="red">
            add /
          </amexio-label>
          <amexio-label (onClick)="removeServiceBlock()" [enable-click]="true"  size="small-bold" font-color="red">
            remove
          </amexio-label>&nbsp;
          <amexio-label (onClick)="addBlock('elseif')" [enable-click]="true"  size="small-bold" font-color="green">
            Else If /
          </amexio-label>

          <amexio-label (onClick)="addBlock('else')" [enable-click]="true"  size="small-bold" font-color="green">
            Else
          </amexio-label>
        </td>
      </tr>
      <tr>
        <td colspan="1" style="vertical-align:top;">
        </td>
        <td width="100%">
          <div class="curly-braces-contains">
            <ng-template #target></ng-template>
          </div>
        </td>
      </tr>
    </table>
    <ng-container *ngIf="showConditionBindingWindow">
      <condition-binding-component-behaviour (onClick)="getOnClick($event)" [(show)]="showConditionBindingWindow" [conditionMetadata]="body[0].instance.metadata"></condition-binding-component-behaviour>
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
export class ConditionBlockBehaviour implements OnInit {
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
    this.title = 'Condition ';
    this.metadata = new ConditionMetaData();
  }
  ngOnInit() {
    this.id = +Math.floor(Math.random() * 90000) + 10000 + '_condition';
    if (this.body[0].instance.metadata.metadata.hasOwnProperty('conditionStatement')) {
      this.title = this.body[0].instance.metadata.metadata.conditionStatement;
    }
  }

  onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: any) {
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
  }

  addBlock(key:any) {
    let componentInstance: any;
    componentInstance = this.createComponentInstance(key);
    componentInstance.instance.metadata.parentRef = this.metadata.parentRef;
    componentInstance.instance.config = this.config;
    componentInstance.instance.config.onRoot = false;
    this.body.push(componentInstance);
  }

  createComponentInstance(key: string): any {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(
      RelationshipBlockMap.Block_MAP[key]
    );
    const componentInstance = this.target.createComponent(componentFactory);
    return componentInstance;
  }

  removeServiceBlock() {
    debugger;
    this._eventRelationshipService.removeLogicBlock(this.id);
  }
  getOnClick(event: any) {
    this.title = event;
  }
}

export class ConditionMetaData extends EventNode {
  constructor() {
    super();
    this.type = 'condition';
  }
}
