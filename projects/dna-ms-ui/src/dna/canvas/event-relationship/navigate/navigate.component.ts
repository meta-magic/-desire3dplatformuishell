/**
 * Created by dattaram on 3/7/18.
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventHandlerService } from '../../canvas-service/event.service';
import { SharedDataService } from '../../canvas-service/shared-data.service';
import { RestCallService } from '../../canvas-service/restcall.service';

@Component({
  selector: 'navigate-model',
  template: `
    <amexio-window [show]="show" (showChange)="closeWindow()" [footer]="true" [vertical-position]="'center'" [horizontal-position]="'right'"
                   [body-height]="75"  type="window" [closable]="true">
      <amexio-header>
        Navigate To
      </amexio-header>
      <amexio-body>

        <div class="vertical-radio-buttons" *ngFor="let obj of uiData">
          <div>
    <span>
      <input class="big" type="radio" [(ngModel)]="selectedUIName" name="radio" [value]="obj.name"  required (click)="onNavigatedUISelect(obj)">
       <label *ngIf="obj.boundedContext" style="color:Black;">
  {{ obj.boundedContext}}</label> /
  <label *ngIf="obj.domain" style="color:red;">
  {{ obj.domain}}</label> /
  <label *ngIf="obj.name" style="color:orange;">{{ obj.name}}
  </label><br>
    </span>
          </div>
        </div>
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
    <amexio-notification
      [vertical-position]="'top'"
      [horizontal-position]="'right'"
      [close-on-escape] ="true"
      [background-color]="'red'"
      [auto-dismiss-msg]="false"
      [auto-dismiss-msg-interval]="5000">
      <ng-template #amexioNotificationTemp >
        <amexio-row>
          <amexio-column size="12">
            <amexio-label size="small-bold" font-color="white" >{{msgData}}</amexio-label><br/>
          </amexio-column>
        </amexio-row>
      </ng-template>
    </amexio-notification>

  `,
  styles: [
    `

      input[type="radio"] {
        margin-top: -1px;
        vertical-align: middle;
      }
      .big{
        width: 1.3em; height: 1.3em;
        margin-top:0px;
        cursor:pointer;
      }

      .vertical-radio-buttons div {
        display: block;
        padding: 0 0 5px 5px;
        clear: both;
      }

      .vertical-radio-buttons span {
        display: block;
        padding-left: 20px;
        cursor: inherit;
      }

      .vertical-radio-buttons label {
        display: inline-block;
        margin-top: 1px;
        margin-bottom: 5px;
        margin-left: 5px;
        max-width: 100%;
        font-size: 14px;
        font-weight: 500;
      }

      .vertical-radio-buttons input {
        float: left;
        width: 20px;
        margin-left: -20px;
        margin-top: 6px; // vertically align radio button with text
      padding: 0;
        -webkit-appearance: radio;
      }
    `
  ]
})
export class NavigateModelComponent implements OnInit {
  @Input() show: boolean;
  @Input() metadata: any;
  @Output() showChange: EventEmitter<any> = new EventEmitter();

  @Output() onSaveClick: EventEmitter<any> = new EventEmitter();

  navigationModelData: any[] = [];
  uiData: any[] = [];
  selectedData: any = {};
  msgData: string;
  selectedUIName: string;
  constructor(
    private _restCallService: RestCallService,
    public _eventHndl: EventHandlerService,
    public _sharedDataService: SharedDataService
  ) {}
  /*/api/dna/design/getAllUiLis*/
  ngOnInit() {
    let reponseData: any;
    this._restCallService.getRestCall('/api/dna/design/getAllUiList').subscribe(
      (resp: any) => {
        reponseData = resp;
      },
      (error: any) => {
        console.log(error);
      },
      () => {
        this.uiData = reponseData.response;
        if (this.metadata.defination.length > 0) {
          this.selectedUIName = this.metadata.defination[0].navigate.name;
        }
      }
    );
  }
  //NAVIGATE UI SELECT
  onNavigatedUISelect(data: any) {
    this.selectedUIName = data.name;
    this.selectedData = data;
    this.selectedData['routeType'] = 1;
  }
  closeWindow() {
    this.show = false;
    this.showChange.emit(this.show);
  }
  onSave() {
    if (!this.selectedData) {
      this.msgData = 'Please select route';
    } else {
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
      obj['navigate'] = this.selectedData;
      this.metadata.defination[0] = obj;
      this.onSaveClick.emit(this.selectedData);
      this.closeWindow();
      this.selectedData = {};
    }
  }
}
