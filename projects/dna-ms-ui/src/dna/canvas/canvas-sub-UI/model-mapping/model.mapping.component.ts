/**
 * Created by dattaram on 1/8/18.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventHandlerService } from '../../canvas-service/event.service';

@Component({
  selector: 'model-mapping-UI',
  template: `
    <amexio-checkbox-group
      [display-field]="'name'"
      [value-field]="'checked'"
      [data]="modelsData" (onSelection)="getSelectedModel($event)">
    </amexio-checkbox-group>
    <amexio-button [label]="'Map Model To Component Field'"
                   [type]="'green'"
                   [tooltip]="'green'"
                   [block]="true"
                   [disabled]="disabledMapButton"
                   (onClick)="onMapModelToComponentClick()">
    </amexio-button>

    <amexio-window
      [body-height]="60"
      [(show)]="showModelWindow"
      [close-on-escape]="true"
      [material-design]="true"
      [footer]="true"
      [vertical-position]="'top'"
      [horizontal-position]="'center'">
      <amexio-header>
        Map model to component field
      </amexio-header>
      <amexio-body>
        <amexio-row>
          <amexio-column [size]="'6'">
            <amexio-card [header]="true" [body-height]="40"
                         [footer]="false"
                         [show]="true">
              <amexio-header>
                Models
              </amexio-header>
              <amexio-body>
                <ng-container *ngIf="treeLocalData.length>0">
                  <amexio-treeview
                    (onDrag)="drag($event)"
                    [enable-drag]="true"
                    [enable-drop]="false"
                    [data]="treeLocalData">
                  </amexio-treeview>
                </ng-container>
              </amexio-body>
            </amexio-card>
          </amexio-column>
          <amexio-column [size]="'6'">
            <amexio-datagrid [data]="componentList" [height]="280"
                             [page-size]="10" >
              <amexio-data-table-column [sort]="false" [data-index]="'name'" [data-type]="'string'" [hidden]="false" [text]="'Component Fields'">
              </amexio-data-table-column>
              <amexio-data-table-column [sort]="false" [data-index]="'model'" [data-type]="'string'" [hidden]="false" [text]="'Map Model Fields'">
                <ng-template #amexioBodyTmpl let-column let-row="row">
                  <div (dragover)="onDragOver($event)" (drop)="onDrop($event,row)">
                    <input type="text" [attr.value]="row.model.modelFieldKey"> &nbsp; <amexio-image (onClick)="clearData(row)" [icon-class]="'fa fa-refresh'" [tooltip]="'refresh'"></amexio-image>
                  </div>
                </ng-template>
              </amexio-data-table-column>
            </amexio-datagrid>
          </amexio-column>
        </amexio-row>
      </amexio-body>
      <amexio-action>
        <amexio-button [type]="'theme-color'"  label="Auto Map"></amexio-button>
        <amexio-button [type]= "'default'" label="Cancel" (onClick)="showModelWindow = false"></amexio-button>
        <amexio-button [type]="'theme-color'"  label="Save" (onClick)="showModelWindow = false"></amexio-button>

      </amexio-action>

    </amexio-window>
  `
})
export class ModelMapComponent {
  showModelWindow: boolean = false;
  componentList: any = [];
  @Input() modelsData: any[] = [];
  treeLocalData: any[] = [];
  modelNamePath: any;
  mappedModelClone: any[] = [];
  @Input() disabledMapButton: boolean = true;
  @Output() listOfModels: any = new EventEmitter();
  constructor(
    public _eventHndl: EventHandlerService,
  ) {}
  ngOnInit() {}

  updateModelList(model: any) {
    model['checked'] = true;
    let cloneData: any = [];
    cloneData = JSON.parse(JSON.stringify(this.modelsData));
    cloneData.push(model);
    this.modelsData = cloneData;
  }

  onMapModelToComponentClick() {
    this.createSelectedModelTree();
    this.componentList = [];
    this._eventHndl.findListOfComponent().forEach((data: any) => {
      if (data.componentBehaviour.hasModelBinding) {
        let object = new componentListModel();
        object.name = data.properties.name;
        object.model = data.properties.model;
        this.componentList.push(object);
      }
    });
    this.showModelWindow = true;
  }

  createSelectedModelTree() {
    this.treeLocalData.length = 0;
    this.modelsData.forEach((opt: any) => {
      if (opt.hasOwnProperty('checked') && opt.checked) {
        this.treeLocalData.push(opt);
      }
    });

    this.createTreeData(this.treeLocalData);
  }

  drag(data: any) {
    data.event.dataTransfer.setData('treenodedata', JSON.stringify(data.data));
  }

  onDragOver(event: any) {
    event.preventDefault();
  }

  onDrop(event: any, rowData: any) {
    let splitCount: number;
    this.modelNamePath = JSON.parse(
      event.dataTransfer.getData('treenodedata')
    ).key;
    if (this.modelNamePath) {
      splitCount = this.modelNamePath.indexOf('.');
      rowData.model.modelName = this.modelNamePath.slice(0, splitCount);
      splitCount++;
      rowData.model.modelFieldKey = this.modelNamePath.slice(splitCount);
    }
  }

  clearData(rowData: any) {
    rowData.model.modelFieldKey = '';
    rowData.model.modelName = '';
  }

  getSelectedModel(data: any) {
    if (data.length > 0) {
      this.disabledMapButton = false;
      this.treeLocalData.length = 0;
      this.treeLocalData = data;
      if(this.mappedModelClone.length <= data.length) {
        this.removeDependancy(data);
      }
      this.createTreeData(this.treeLocalData);
      this.listOfModels.emit(this.treeLocalData);
    } else {
      this.disabledMapButton = true;
    }
  }

  removeDependancy(data:any) {
    data.forEach(()=>{

    });
  }

  createTreeData(data: any) {
    data.forEach((opt: any) => {
      opt['key'] = opt.name;
      if (opt.children != null) {
        opt.children.forEach((childOpt: any) => {
          childOpt['key'] = opt.key + '.' + childOpt.name;
          if (childOpt.children != null) {
            this.createNodeData(childOpt, opt.key);
          }
        });
      }
    });
  }
  createNodeData(data: any, parentName: any) {
    data.children.forEach((opt: any) => {
      opt['key'] = parentName + '.' + data.name + '.' + opt.name;
      if (opt.children != null) {
        opt.children.forEach((childOpt: any) => {
          childOpt['key'] = opt.key + '.' + childOpt.name;
          if (childOpt.children != null) {
            this.createNodeData(childOpt, opt.key);
          }
        });
      }
    });
  }
}

export class componentListModel {
  name: string;
  model: any;
}
