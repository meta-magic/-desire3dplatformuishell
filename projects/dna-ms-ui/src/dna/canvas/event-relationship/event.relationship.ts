/**
 * Created by dattaram on 7/5/18.
 */
import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {RelationshipBlockMap} from '../canvas-component-map/retionship.map';
import { EventRelationshipService } from '../canvas-service/event-relationship.service';
import { SharedDataService } from '../canvas-service/shared-data.service';

@Component({
  selector: 'event-relationship',
  template: `
    <amexio-row>
          <amexio-column [size] =2 >
            <amexio-card  class="canvas-behaviour-drag-area-lhs"  [header]="true" [body-height]="83">
              <amexio-header><i (click)="backToCanvas()" style="cursor: pointer" class="fa fa-chevron-left" aria-hidden="true"></i>&nbsp;Logic Blocks</amexio-header>
              <amexio-body>
                <amexio-row *ngFor="let node of lhsblock">
                  <amexio-column [size] =12 >
                    <amexio-label *ngIf="(node.type==1)" size="medium">
                      {{node.text}}
                    </amexio-label>
                    <div    *ngIf="(node.type==2)" class="button-custom button button-default button-block"
                               [ngStyle]="{'border-color':node.bgcolor,'background-color':node.bgcolor,'color':node.color}"
                               draggable="true"  (dragstart) = "onDragStart($event,node)">
                      <i [ngClass]="node.icon" ></i>
                      <span>{{node.text}}</span>
                    </div>
                  </amexio-column>
                </amexio-row>
              </amexio-body>
            </amexio-card>
          </amexio-column>
      <amexio-column [size] =10 >

        <amexio-card class="canvas-behaviour-drag-area-rhs" [footer]="true" [header]="true" [body-height]="83">
          <amexio-header>
            Drop the Logic blocks into the Logic Block Area
          </amexio-header>
          <amexio-body >

            <div (drop)="onDrop($event)" (dragover)="onDragOver($event)"
                 style="background-color: white; height: 98%;
                    padding: 0px 10px 0px 10px;">
              <div>
                <amexio-label size="small-bold">{{givenStatement}}</amexio-label>
                <hr/>
              </div>
              <div style="padding-bottom: 100px">
                <ng-template #target></ng-template>
              </div>
            </div>



          </amexio-body>
          <amexio-action>
            <amexio-button (onClick)="backToCanvas()" [label]="'Cancel'" [type]="'default'" [tooltip]="'Cancel'">
            </amexio-button>
            <amexio-button (onClick)="onEventSaveClick()" [label]="'Save'" [type]="'theme-color'" [tooltip]="'Save'" >
            </amexio-button>
          </amexio-action>
        </amexio-card>

      </amexio-column>
        </amexio-row>

  `,
  styles: [
    `
      .verticalList{
        float: left;
        padding-left: 50px;
        list-style: none;
      }
      .disabled-area {
        pointer-events: none;
        opacity: 0.4;
        cursor: not-allowed;
      }
      
      .button-custom{
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
        position: relative;
        overflow: hidden;
        display: inline-block;
        font-weight: 400;
        line-height: 1.25;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        outline: none;
        user-select: none;
        border: 1px solid #ced4da;
        padding: .5rem 1rem;
        border-radius: 2px;
        transition: all .2s ease-in-out;
        width: 80%;
      }
      `
  ]
})
export class EventRelationShipComponent implements OnInit {
  @Input() componentInstance: any;

  @Input() selectedEventData: any;

  dropValidationKey: any;

  eventTreeData: any[] = [];

  dragDataKey: any;

  dynamicHeight: any;

  body: any[] = [];

  lhsblock: any[] = [];

  methodCount: number = 0;

  givenStatement: string = '';

  @ViewChild('target', { read: ViewContainerRef })
  target: any;

  constructor(
    public _componentFactoryResolver: ComponentFactoryResolver,
    private _eventRelationshipService: EventRelationshipService,
    public _sharedDataService: SharedDataService
  ) {
    this.dropValidationKey = null;

    this.lhsblock = [
      { text: 'Function', type: '1' },
      {
        text: 'Condition',
        type: '2',
        blocktype: '1',
        icon: 'fa fa-code',
        btntype: 'green',
        btnclass: 'button-default',
        bgcolor: '#A0AED7',
        color: '#000000',
        key: 'condition'
      },
      {
        text: 'Service',
        type: '2',
        blocktype: '2',
        icon: 'fa fa-bolt',
        btntype: 'green',
        btnclass: 'button-success',
        bgcolor: '#000000',
        color: '#FFFFFF',
        key: 'service'
      },
      { text: 'Data', type: '1' },
      {
        text: 'Model',
        type: '2',
        blocktype: '3',
        icon: 'fa fa-medium',
        btntype: 'yellow',
        btnclass: 'button-warning',
        bgcolor: '#3B66B8',
        color: '#FFFFFF',
        key: 'updatemodel'
      },
      {
        text: 'Components',
        type: '2',
        blocktype: '4',
        icon: 'fa fa-creative-commons',
        btntype: 'yellow',
        btnclass: 'button-warning',
        bgcolor: '#F0C242',
        color: '#FFFFFF',
        key: 'component'
      },
      { text: 'Communication', type: '1' },
      {
        text: 'Navigate',
        type: '2',
        blocktype: '5',
        icon: 'fa fa-code-fork',
        btntype: 'theme-color',
        btnclass: ' button-primary',
        bgcolor: '#B4CEA2',
        color: '#000000',
        key: 'navigate'
      },
      {
        text: 'Notify',
        type: '2',
        blocktype: '6',
        icon: 'fa fa-commenting-o',
        btntype: 'theme-color',
        btnclass: ' button-primary',
        bgcolor: '#E67F3D',
        color: '#FFFFFF',
        key: 'notify'
      }
    ];
  }

  ngOnInit() {
    this.createGivenString();
    if (this.selectedEventData != null) {
      if (
        this.selectedEventData.body != null &&
        this.selectedEventData.body.length > 0
      ) {
        this.parseStringToObject(this.selectedEventData.body);
        if (this.methodCount == 0) {
          this.setUpdateModeData();
          this.methodCount++;
        }
      }
    }
    this._eventRelationshipService.relationshipRef = this.selectedEventData;
  }

  createGivenString() {
    if (this.componentInstance.name == 'rootpane') {
      this.givenStatement =
        'Given : ' +
        this._sharedDataService.uiDetails.name +
        ' / ' +
        this.selectedEventData.eventName +
        ' event';
    } else {
      this.givenStatement =
        'Given : ' +
        this.componentInstance.properties.fieldLabel +
        ' ' +
        this.componentInstance.name +
        ' / ' +
        this.selectedEventData.eventName +
        ' event';
    }
  }

  setUpdateModeData() {
    let localArray: any[] = [];
    this.selectedEventData.body.forEach((com: any) => {
      let componentInstance: any;
      componentInstance = this.createComponentInstance(com, this);
      if (componentInstance != null) {
        componentInstance.instance.config['onRoot'] = true;
        componentInstance.instance.config[
          'componentLabel'
        ] = this.componentInstance.properties.fieldLabel;
        componentInstance.instance.config[
          'componentName'
        ] = this.componentInstance.name;
        componentInstance.instance.config[
          'eventName'
        ] = this.selectedEventData.eventName;

        if (com.body.length > 0) {
          this.setInChild(com, componentInstance);
        }
        localArray.push(componentInstance);
      }
    });
    this.selectedEventData.body = localArray;
  }

  setInChild(comData: any, comInstance: any) {
    comData.body.forEach((com: any) => {
      let componentInstance: any;
      componentInstance = this.createComponentInstance(
        com,
        comInstance.instance
      );
      componentInstance.instance.config['onRoot'] = false;
      if (com.body.length > 0) {
        this.setInChild(com, componentInstance);
      }
    });
  }

  createComponentInstance(com: any, comRef: any): any {
    if (RelationshipBlockMap.Block_MAP[com.type]) {
      const componentFactory = this._componentFactoryResolver.resolveComponentFactory(
        RelationshipBlockMap.Block_MAP[com.type]
      );
      const componentInstance = comRef.target.createComponent(componentFactory);
      componentInstance.instance.metadata = com;
      comRef.body.push(componentInstance);
      return componentInstance;
    } else return null;
  }

  getMaximizeEvent(event: any) {
    if (event) {
      this.dynamicHeight = {
        height: '77vh'
      };
    } else {
      this.dynamicHeight = {
        height: '55vh'
      };
    }
  }

  onDragStart(event: any, data: string) {
    event.dataTransfer.setData('dragdata', JSON.stringify(data));
    this._eventRelationshipService.eventLogicBlockDragKey = 'EVR';
  }

  onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: any) {
    if (this._eventRelationshipService.eventLogicBlockDragKey == 'EVR') {
      let dragData = JSON.parse(event.dataTransfer.getData('dragdata'));
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      let comInstance: any;
      console.log(dragData);
      comInstance = this.createComponentInstanceOnDrop(dragData.key, this);
      comInstance.instance.config['onRoot'] = true;
      comInstance.instance.config[
        'componentLabel'
      ] = this.componentInstance.properties.fieldLabel;
      comInstance.instance.config[
        'componentName'
      ] = this.componentInstance.name;
      comInstance.instance.config[
        'eventName'
      ] = this.selectedEventData.eventName;

      if(dragData.key == 'condition') {
        this.createComponentInstanceOnDrop('if', comInstance.instance);
      }
      this.selectedEventData.body.push(comInstance);
      this._eventRelationshipService.eventLogicBlockDragKey = '';
    }
  }

  createComponentInstanceOnDrop(key: any, comRef: any): any {
    console.log(key);
    debugger;
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(
      RelationshipBlockMap.Block_MAP[key]
    );
    const componentInstance = comRef.target.createComponent(componentFactory);
    comRef.body.push(componentInstance);
    return componentInstance;
  }

  dragOverOnTree(data: any) {
    data.event.preventDefault();
  }

  backToCanvas() {
    let localArrayData: any[] = [];
    this.parseEventData(
      this._eventRelationshipService.relationshipRef.body,
      localArrayData
    );
    this.selectedEventData.body = [];
    this.selectedEventData.body = localArrayData;
    this.parseEventReationshipData();
    this.componentInstance._eventHndl.showDataSource = false;
    this.componentInstance._eventHndl.showRelationship = false;
    this.componentInstance._eventHndl.showCanvas = true;
  }

  onEventSaveClick() {
    this.backToCanvas();
  }
  parseEventData(eventData: any, localArrayData: any) {
    eventData.forEach((comRef: any, index: any) => {
      if (comRef.instance.body.length > 0) {
        localArrayData.push(comRef.instance.metadata);
        localArrayData[index].body = [];
        this.parseEventDataInChild(
          comRef.instance.body,
          localArrayData[index].body
        );
      } else {
        localArrayData.push(comRef.instance.metadata);
        localArrayData[index].body = [];
      }
    });
  }

  parseEventDataInChild(eventData: any, orgData: any) {
    eventData.forEach((childComRef: any, index: any) => {
      if (childComRef.instance.body.length > 0) {
        orgData.push(childComRef.instance.metadata);
        orgData[index].body = [];
        this.parseEventDataInChild(
          childComRef.instance.body,
          orgData[index].body
        );
      } else {
        orgData.push(childComRef.instance.metadata);
        orgData[index].body = [];
      }
    });
  }

  parseEventReationshipData() {
    this.componentInstance.eventRelationship.eventDefination.forEach(
      (event: any) => {
        this.parseObjectToString(event.body);
      }
    );
  }

  parseObjectToString(bodyData: any) {
    bodyData.forEach((evt: any) => {
      if (evt.hasOwnProperty('metadata') && typeof evt.metadata == 'object') {
        evt.metadata = JSON.stringify(evt.metadata);
      }
      if (evt.hasOwnProperty('body') && evt.body.length > 0) {
        this.parseObjectToString(evt.body);
      }
    });
  }

  parseStringToObject(bodyData: any) {
    bodyData.forEach((evt: any) => {
      if (evt.hasOwnProperty('metadata') && typeof evt.metadata == 'string') {
        evt.metadata = JSON.parse(evt.metadata);
      }

      if (evt.hasOwnProperty('body') && evt.body.length > 0) {
        this.parseStringToObject(evt.body);
      }
    });
  }
}
