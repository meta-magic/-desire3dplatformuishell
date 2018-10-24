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
import {NotificationService} from '../../canvas-service/notification.service';

@Component({
  selector: 'service-defination-behaviour',
  template: `
      <table style="color: #000000; " (drop)="onDrop($event)" (dragover)="onDragOver($event)">
          <tr>
              <td colspan="2">
                  <amexio-label>
                      When: {{title}} Is Called
                  </amexio-label>
                  <amexio-label (onClick)="this.showServiceBindingWindow = true" [enable-click]="true" *ngIf="metadata.defination.length > 0" size="small-bold" font-color="red">
                      update /
                  </amexio-label>
                  <amexio-label (onClick)="showServiceBindingWindow = true" [enable-click]="true" *ngIf="metadata.defination.length == 0" size="small-bold" font-color="red">
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
      <ng-container *ngIf="showServiceBindingWindow">
          <service-binding-component-behaviour (onClick)="getOnClick($event)" [(show)]="showServiceBindingWindow" [serviceMetadata]="metadata"></service-binding-component-behaviour>
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
export class ServiceBlockBehaviour implements OnInit {
  @ViewChild('target', { read: ViewContainerRef })
  target: any;
  showServiceBindingWindow = false;
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
    this.title = 'Service ';
    this.metadata = new ServiceMetaData();
  }

  ngOnInit() {
    this.id = +Math.floor(Math.random() * 90000) + 10000 + '_service';
    if (this.metadata.metadata.hasOwnProperty('servicedefination')) {
      this.title =
          this.metadata.metadata.servicedefination.serviceName +
          ' ' +
          this.metadata.metadata.servicedefination.operationName;
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
              let key = JSON.parse(event.dataTransfer.getData('dragdata')).key;
              let componentInstance: any;
              componentInstance = this.createComponentInstance(key, this);
              componentInstance.instance.metadata.parentRef = JSON.parse(JSON.stringify(this.metadata.parentRef));
              componentInstance.instance.config = this.config;
              componentInstance.instance.config.onRoot = false;
              if (key == 'condition'){
                  let ifComInstance = this.createComponentInstance('if', componentInstance.instance);
                  ifComInstance.instance.metadata.parentRef = JSON.parse(JSON.stringify(this.metadata.parentRef));
                  ifComInstance.instance.config = this.config;
                  ifComInstance.instance.config.onRoot = false;
                  componentInstance.instance.body.push(ifComInstance);

              }
              this.body.push(componentInstance);
              this._eventRelationshipService.eventLogicBlockDragKey = '';
          }
       /*else {
          this._eventRelationshipService.eventLogicBlockDragKey = '';
          this._notificationService.setNotificationData(
              true,
              ['Please add Service Definition.'],
              'red'
          );
      }
*/
  }

  createComponentInstance(key: string, comRef: any): any {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(
        RelationshipBlockMap.Block_MAP[key]
    );
    const componentInstance = comRef.target.createComponent(componentFactory);
    return componentInstance;
  }

  removeServiceBlock() {
    this._eventRelationshipService.removeLogicBlock(this.id);
  }
  getOnClick(event: any) {
    this.title = event.serviceData;
  }
}

export class ServiceMetaData extends EventNode {
  constructor() {
    super();
    this.type = 'service';
  }
}
