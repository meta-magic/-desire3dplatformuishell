/**
 * Created by pratik on 5/3/18.
 */
import { Component, Input, OnInit } from '@angular/core';
import { NotificationService } from '../canvas-service/notification.service';

@Component({
  selector: 'response-mapper',
  template: `
    <ng-container *ngIf="component != undefined">
      <amexio-row>
      </amexio-row>
      <amexio-row>
        <amexio-column size="6">
          <amexio-card [header]="true"
                       [body-height]="40">
            <amexio-header>
              Data Structure
            </amexio-header>
            <amexio-body>
              <amexio-treeview-canvas [data]="treeLocalData"
                                      (onDrag)="onNodeDrag($event)">
              </amexio-treeview-canvas>
            </amexio-body>
          </amexio-card>
        </amexio-column>
        <amexio-column size="6">
          <ng-container [ngSwitch]="type">
            <ng-container *ngSwitchCase="'default'">
              <div class="datatable-height" style="height: 330px;border: 1px solid lightgrey">
                <div class="datatable">
                  <div class="datatable-header">
                    <div class="datatable-col" style="width: 45%">
                      Component Property
                    </div>
                    <div class="datatable-col" style="width: 45%;">
                      Mapped References
                    </div>
                    <div class="datatable-col" style="width: 10%;">
                      Action
                    </div>
                  </div>
                  <div class="datatable-row">
                    <div class="datatable-col">
                      <b>Display Field</b>
                    </div>
                    <div #ref class="datatable-col overEffect" (dragover)="onDragOver($event,ref)" (dragleave)="onDragLeave(ref)" (drop)="onNodeDrop('display',ref)">
                      {{component.dataSource.displayField}}
                    </div>
                    <div class="datatable-col" >
                      <div style="text-align: center">
                        <amexio-image [icon-class]="'fa fa-refresh fa-lg'"
                                      [tooltip]="'clear data'" (onClick)="clearDisplayField()">
                        </amexio-image>
                      </div>
                    </div>
                  </div>
                  <div *ngIf="checkValuefield(component.dataSource)" class="datatable-row">
                    <div class="datatable-col">
                      <b>Value Field</b>
                    </div>
                    <div #ref class="datatable-col overEffect" (dragover)="onDragOver($event,ref)" (dragleave)="onDragLeave(ref)" (drop)="onNodeDrop('value',ref)">
                      {{component.dataSource.valueField}}
                    </div>
                    <div class="datatable-col">
                      <div style="text-align: center">
                        <amexio-image [icon-class]="'fa fa-refresh fa-lg'"
                                      [tooltip]="'clear data'" (onClick)="clearValueField()">
                        </amexio-image>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </ng-container>
            <ng-container *ngSwitchCase="'datagrid'">
              <div class="datatable-height" style="height: 330px;border: 1px solid lightgrey">
                <div class="datatable">
                  <div class="datatable-header">
                    <div class="datatable-col" style="width: 35%">
                      Column Property
                    </div>
                    <div class="datatable-col" style="width: 35%;">
                      Mapped References
                    </div>
                    <div class="datatable-col" style="width: 10%">
                      Hidden
                    </div>
                    <div class="datatable-col" style="width: 10%;">
                      Action
                    </div>
                  </div>
                  <div class="datatable-row" *ngFor="let colData of component.children">
                    <div class="datatable-col">
                      <b>{{colData.instance.properties.text}}</b>
                    </div>
                    <div #ref class="datatable-col" (dragover)="onDragOver($event,ref)" (dragleave)="onDragLeave(ref)" (drop)="onGridNodeDrop(colData,ref)">
                      <amexio-text-input name="colData.instance.properties.dataindex"
                                         [icon-feedback]="false"
                                         [allow-blank]="true"
                                         [field-label]="''"
                                         [(ngModel)]="colData.instance.properties.dataindex">
                      </amexio-text-input>
                   
                    </div>
                    <div class="datatable-col">
                      <amexio-checkbox  [(ngModel)]="colData.instance.properties.hidden">
                      </amexio-checkbox>
                    </div>
                    <div class="datatable-col">
                      <div style="text-align: center">
                        <amexio-image [icon-class]="'fa fa-refresh fa-lg'"
                                      [tooltip]="'clear data'" (onClick)="removeRecord(colData)">
                        </amexio-image>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ng-container>

            <ng-container *ngSwitchCase="'tree'">
              <amexio-card [header]="false"
                           [body-height]="46">
                <amexio-body>
                  <amexio-row>
                    <amexio-column size="12">
                      <amexio-text-input
                        field-label="Data Reader"
                        [icon-feedback]="false"
                        [disabled]="true"
                        [(ngModel)]="component.dataSource.dataReader"
                        [allow-blank]="true"
                        [has-label]="true">
                      </amexio-text-input>
                    </amexio-column>

                  </amexio-row>
                  <amexio-row>
                    <amexio-column size="12">
                      <div #ref class="drop-input-style" (dragover)="onDragOver($event,ref)" (dragleave)="onDragLeave(ref)" (drop)="onTreeNodeDrop(ref)">
                        Drop node here for setting data reader
                      </div>
                    </amexio-column>
                  </amexio-row>

                </amexio-body>
              </amexio-card>
            </ng-container>
          </ng-container>
        </amexio-column>
      </amexio-row>
    </ng-container>
  `,
  styles:[
      `
        drop-input-style {
            background-color: white; height: 180px;
            border: 2px dotted lightgrey;
            padding: 0px 10px;
        }
    `
  ]
})
export class ResponseMapperComponent implements OnInit {
  @Input() component: any;
  @Input() treeLocalData: any;

  displayField: any;
  valueField: any;

  nodeDragged: any;

  type: 'default' | 'datagrid' = 'default';

  treeData: any[] = [];

  previousValue: any;

  nodeDataOfDataReader: any;

  dataReaderSearchObject: any;

  constructor(private _notificationService: NotificationService) {}

  ngOnInit() {
    if (this.component != null) {
      this.type = this.component.type;
    }
  }

  onNodeDrag(node: any) {
    this.nodeDragged = null;
    this.nodeDataOfDataReader = JSON.parse(JSON.stringify(node.data));
    this.nodeDragged = node.data;
    this.dataReaderSearchObject = node.data;
  }

  onDragOver(event: any, ref: any) {
    ref.style.border = '2px dashed green';
    event.preventDefault();
  }
  onDragLeave(ref: any) {
    ref.style.border = '2px dashed lightgrey';
  }

  checkValuefield(data: any): boolean {
    return data.hasOwnProperty('valueField');
  }

  onNodeDrop(type: any, ref: any) {
    if (this.nodeDragged.children == null) {
      this.component.dataSource.dataReader = '';
      this.findDataReader();
      if (type == 'display') {
        this.component.dataSource.displayField = this.nodeDragged['text'];
        this.component.properties.displayField = this.component.dataSource.displayField;
        if (this.component.dataSource.hasOwnProperty('key'))
          this.component.dataSource.key = this.nodeDragged['text'];
      } else if (type == 'value') {
        this.component.dataSource.valueField = this.nodeDragged['text'];
        this.component.properties.valueField = this.component.dataSource.valueField;
      }
    } else {
      this._notificationService.setNotificationData(
        true,
        ['Please drag leaf node'],
        'red'
      );
    }
    ref.style.border = '2px dashed lightgrey';
  }

  onGridNodeDrop(column: any, ref: any) {
    if (this.nodeDragged.children == null) {
      column.instance.properties.dataindex = this.nodeDragged['text'];
      this.component.dataSource.dataReader = '';
      this.findDataReader();
    } else {
      this._notificationService.setNotificationData(
        true,
        ['Please drag leaf node'],
        'red'
      );
    }
    ref.style.border = '2px dashed lightgrey';
  }

  clearDisplayField() {
    this.component.dataSource.displayField = '';
  }
  clearValueField() {
    this.component.dataSource.valueField = '';
  }

  findDataReader() {
    this.treeLocalData.forEach((option: any) => {
      if (
        JSON.stringify(option).toLowerCase() ===
        JSON.stringify(this.dataReaderSearchObject).toLowerCase()
      ) {
        return;
      } else if (option.hasOwnProperty('children')) {
        if (option.children != null) {
          this.findDataReaderInChild(option);
        }
      }
    });
  }

  findDataReaderInChild(child: any) {
    child.children.forEach((option: any) => {
      if (
        JSON.stringify(option).toLowerCase() ===
        JSON.stringify(this.dataReaderSearchObject).toLowerCase()
      ) {
        if (this.component.dataSource.dataReader == '') {
          this.component.dataSource.dataReader = child.text;
        } else {
          this.component.dataSource.dataReader =
            child.text + '.' + this.component.dataSource.dataReader;
        }
        this.dataReaderSearchObject = child;
        this.findDataReader();
      } else if (option.hasOwnProperty('children')) {
        if (option.children != null) {
          this.findDataReaderInChild(option);
        }
      }
    });
  }

  removeRecord(data: any) {
    data.instance.properties.dataindex = '';
  }

  onTreeNodeDrop(ref: any) {
    if (this.nodeDragged.children == null) {
      this.component.dataSource.dataReader = '';
      this.findDataReader();
    } else {
      this._notificationService.setNotificationData(
        true,
        ['Please drag leaf node'],
        'red'
      );
    }
    ref.style.border = '2px dashed lightgrey';
  }
}
