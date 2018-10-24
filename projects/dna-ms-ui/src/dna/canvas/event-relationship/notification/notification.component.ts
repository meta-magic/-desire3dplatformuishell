/**
 * Created by dattaram on 3/7/18.
 */

import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { SharedDataService } from '../../canvas-service/shared-data.service';
import { EventHandlerService } from '../../canvas-service/event.service';
import { RelationshipBlockMap } from '../../canvas-component-map/retionship.map';

export enum KEY_CODE {
  enter = 13
}
@Component({
  selector: 'notification-model',
  template: `
    <amexio-window [show]="show" (showChange)="closeWindow()" [footer]="true" [vertical-position]="'center'" [horizontal-position]="'right'"
                   [body-height]="75"  type="window" [closable]="true">
      <amexio-header>
        Notification for {{_sharedDataService.uiDetails.name}} 
      </amexio-header>
      <amexio-body>
        <amexio-row>
          <amexio-column size="4">
            <div class="notification-acordian-style">
              <amexio-accordion>
                <amexio-accordion-tab [header]="_sharedDataService.uiDetails.name+ ' Model Fields'" active="true">
                  <amexio-row>
                    <amexio-column size="12">
                        <amexio-card [header]="false"
                                     [body-height]="44" [footer]="false">
                          <amexio-body>
                            <amexio-listbox [enable-header]="false"
                                            [data]="modelDefinationData" [filter]="false"
                                            [enable-checkbox]="false" [data-reader]=""
                                            [display-field]="'fieldLabel'">
                              <ng-template #amexioBodyTmpl let-row="row">
                                <div draggable="true" (dragstart)="dragStart($event,row,'local')">{{row.fieldLabel}}</div>
                              </ng-template>
                            </amexio-listbox>
                          </amexio-body>
                        </amexio-card>
                    </amexio-column>
                  </amexio-row>
                </amexio-accordion-tab>
                <amexio-accordion-tab header="Response Output">
                  <amexio-row>
                    <amexio-column size="12">
                      <amexio-card [header]="false"
                                   [body-height]="44" [footer]="false">
                        <amexio-body>
                          <amexio-listbox [enable-header]="false"
                                          [data]="serviceModelData" [filter]="false"
                                          [enable-checkbox]="false" [data-reader]=""
                                          [display-field]="'fieldLabel'">
                            <ng-template #amexioBodyTmpl let-row="row">
                              <div draggable="true" (dragstart)="dragStart($event,row,'remote')">{{row.fieldLabel}}</div>
                            </ng-template>
                          </amexio-listbox>
                        </amexio-body>
                      </amexio-card>
                    </amexio-column>
                  </amexio-row>
                </amexio-accordion-tab>
              </amexio-accordion>
            </div>
            
          </amexio-column>
          <amexio-column size="8">
            <amexio-row>
              <amexio-column size="12">
                <amexio-radio-group
                                    name ="notifytype"
                                    [data-reader]="'data'"
                                    [display-field]="'fieldLabel'"
                                    [value-field]="'fieldName'"
                                    [horizontal]="true"
                                    [data]="notificationTypeData"
                                    [default-value]="notificationMetadata.notifyMsgType"
                                    (onSelection)="setSelectedGender($event)">
                </amexio-radio-group>
              </amexio-column>
            </amexio-row>

            <amexio-row>
              <amexio-column size="12">
                
                <div class="tag-container"  style="display: inline-block;cursor: pointer">
                  <div (mouseover)="onMouseOver(item)" (mouseleave)="onMouseLeave(item)" style="display: inline-block" [ngClass]="getChipsTagClass(item)" *ngFor="let item of addedNotificationData">
                   &nbsp; {{item.fieldLabel}}
                    <i *ngIf="item.showCloseIcon" style="padding-left: 3px;padding-right: 5px;" class="fa fa-times-circle" (click)="removePill(item)"></i>
                  </div>
                </div>
               <input placeholder="type message and press enter" (keyup.enter)="keyEnter($event)" [(ngModel)]="notifyInput" name="notifyInput" style="min-height: 20px;width: 100%;border: none;!important;border-bottom: 1px solid" type="text"/>
              </amexio-column>
            </amexio-row>

            <amexio-row>
              <amexio-column size="12">
                <div #ref style="min-height:200px;border: 2px dashed lightgrey; width: 100%;" (dragover)="dragOver($event,ref)" (dragleave)="onDragLeave(ref)" (drop)="drop($event,ref)">
                &nbsp; drag field here......
                </div>
              </amexio-column>
            </amexio-row>
          </amexio-column>
        </amexio-row>
      </amexio-body>
      <amexio-action>
        <amexio-button
          [label]="'Cancel'"
          [type]="'default'"
          [tooltip]="'Cancel'" (onClick)="closeWindow()">
        </amexio-button>
        <amexio-button
          [label]="'Save'"
          [type]="'theme-color'"
          [tooltip]="'Save'" (onClick)="onSave()">
        </amexio-button>
      </amexio-action>
    </amexio-window>

  `,
  styles: [
    `.notification-acordian-style {
      
    }
    .notification-acordian-style .panel {
      padding: 0px !important;
    }


    `
  ]
})
export class NotificationModelComponent implements OnInit {
  @Input() show: boolean;
  @Input() notificationMetadata: any;
  @Output() showChange: EventEmitter<any> = new EventEmitter();
  modelDefinationData: any[] = [];
  serviceModelData: any[] = [];
  height: any = 53;
  notificationTypeData: any;
  addedNotificationData: any[] = [];
  notifyInput: any;
  constructor(
    public _eventHndl: EventHandlerService,
    public _sharedDataService: SharedDataService
  ) {
    this.addedNotificationData = [];
  }

  @HostListener('window:enter', ['$event'])
  keyEnter(event: any) {
    if (this.notifyInput) {
      let obj = new NotifyModel();
      obj.type = 'userdefined';
      obj.fieldLabel = this.notifyInput;
      obj.showCloseIcon = false;
      obj.fieldName = this.notifyInput;
      this.addedNotificationData.push(obj);
      this.notifyInput = '';
    }
  }

  ngOnInit() {
    if (this.notificationMetadata.defination.length > 0) {
      this.notificationMetadata.defination[0].values.forEach(
        (node: any, index: any) => {
          if (node.type == 'operator') {
            this.notificationMetadata.defination[0].values.splice(index, 1);
          }
        }
      );

      this.convertToNotifyModel();
    }
    this.notificationTypeData = {
      data: [
        {
          fieldName: 'success',
          fieldLabel: 'Success'
        },
        {
          fieldName: 'error',
          fieldLabel: 'Error'
        },
        {
          fieldName: 'warning',
          fieldLabel: 'Warning'
        }
      ]
    };
    this.getComponentList();
    if (this.notificationMetadata.parentRef.hasOwnProperty('responseModel')) {
      this.serviceModelData = this.notificationMetadata.parentRef.responseModel;
    }

    /* this.serviceModelData = [
      {
        fieldLabel: 'errorMessage',
        fieldName: 'Record save successfully'
      }
    ];*/
  }

  convertToNotifyModel() {
    this.notificationMetadata.defination[0].values.forEach((node: any) => {
      let obj = new NotifyModel();
      obj.type = node.type;
      obj.fieldName = node.fieldName;
      obj.fieldLabel = node.fieldLabel;
      this.addedNotificationData.push(obj);
    });
  }
  getComponentList() {
    this._eventHndl.findListOfComponent().forEach((com: any) => {
      if (!RelationshipBlockMap.Component_Restrict[com.name]) {
        let object: any = {};
        object['fieldName'] = com.properties.name;
        object['fieldLabel'] = com.properties.fieldLabel;
        this.modelDefinationData.push(object);
      }
    });
  }
  closeWindow() {
    this.show = false;
    this.showChange.emit(this.show);
  }
  setSelectedGender(data: any) {
    this.notificationMetadata.notifyMsgType = data.fieldName;
  }
  onSave() {
    this.createDefinationData();
    this.closeWindow();
  }

  createDefinationData() {
    this.notificationMetadata.defination = [];
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
    this.addedNotificationData.forEach((data: any, index: any) => {
      let object: any = {};
      object['key'] = data.fieldName;
      object['fieldName'] = data.fieldName;
      object['fieldLabel'] = data.fieldLabel;
      object['type'] = data.type;
      // operator object
      let operatorObject: any = {};
      operatorObject['key'] = '+';
      operatorObject['type'] = 'operator';
      if (index == this.addedNotificationData.length - 1) {
        obj.values.push(object);
      } else {
        obj.values.push(object, operatorObject);
      }
    });
    this.notificationMetadata.defination.push(obj);
  }

  getChipsTagClass(data: any): any {
    switch (data.type) {
      case 'remote': {
        return 'tag-resp';
      }
      case 'local': {
        return 'tag-local';
      }
      default: {
        return 'tag-default';
      }
    }
  }

  dragStart(event: any, row: any, type: any) {
    event.dataTransfer.setData('dragData', JSON.stringify(row));
    event.dataTransfer.setData('type', type);
  }

  dragOver(event: any, ref: any) {
    ref.style.border = '2px dashed green';
    event.stopPropagation();
    event.preventDefault();
  }

  onDragLeave(ref: any) {
    ref.style.border = '2px dashed lightgrey';
  }

  drop(event: any, ref: any) {
    const dragObject = JSON.parse(event.dataTransfer.getData('dragData'));
    let object: any = new NotifyModel();
    object.key = dragObject.fieldName;
    object.fieldName = dragObject.fieldName;
    object.fieldLabel = dragObject.fieldLabel;
    object.type = event.dataTransfer.getData('type');
    this.addedNotificationData.push(object);
    ref.style.border = '2px dashed lightgrey';
  }

  onMouseOver(item: any) {
    item.showCloseIcon = true;
  }

  onMouseLeave(item: any) {
    item.showCloseIcon = false;
  }

  removePill(data: any) {
    this.addedNotificationData.forEach((item: any, index: any) => {
      if (item.id == data.id) {
        this.addedNotificationData.splice(index, 1);
      }
    });
  }
}

export class NotifyModel {
  id: any;
  fieldLabel: string;
  type: string;
  showCloseIcon: boolean;
  key: string;
  fieldName: string;

  constructor() {
    this.id = Math.floor(Math.random() * 90000) + 10000;
    this.type = '';
    this.fieldLabel = '';
    this.showCloseIcon = false;
  }
}
