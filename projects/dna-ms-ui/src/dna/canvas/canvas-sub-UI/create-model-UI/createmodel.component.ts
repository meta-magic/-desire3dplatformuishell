/**
 * Created by dattaram on 21/8/18.
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RelationshipBlockMap } from '../../canvas-component-map/retionship.map';
import { EventHandlerService } from '../../canvas-service/event.service';
import { SharedDataService } from '../../canvas-service/shared-data.service';
import { NotificationService } from '../../canvas-service/notification.service';
import { ComponentDataTypeMap } from '../../canvas-component-map/datatype.map';

@Component({
  selector: 'create-model',
  template: `
    <amexio-window
      [body-height]="60"
      [(show)]="showModel"
      [closable]="true"
      [footer]="true"
      [vertical-position]="'top'"
      [horizontal-position]="'center'"
      (close)="onClose($event)">
      <amexio-header>
        Create Model
      </amexio-header>
      <amexio-body>
        <amexio-row>
          <amexio-column size="6">
            <amexio-text-input field-label="Model Name"
                               [(ngModel)]="modelObject.name"
                               place-holder="Enter model name"
                               (onBlur)="nameValidation()"
                               icon-feedback="false">
            </amexio-text-input>
            <label *ngIf="hasModelNameValid" style="color: red">Model name should be in lowercase and single word.</label>
          </amexio-column>
          <amexio-column size="6">
            <amexio-text-input field-label="Description"
                               [(ngModel)]="modelObject.description"
                               place-holder="Enter description">
            </amexio-text-input>
          </amexio-column>
        </amexio-row>
        <amexio-datagrid [data]="modelDataStructure"
                         [page-size]="10" >
          <amexio-data-table-column [sort]="false"  [data-index]="'fieldLabel'" [data-type]="'string'" [hidden]="false" [text]="'Field Label'">
          </amexio-data-table-column>
          <amexio-data-table-column [sort]="false"  [data-index]="'displayName'" [data-type]="'string'" [hidden]="false" [text]="'Display Name'">
            <ng-template #amexioBodyTmpl let-row="row">
              <input type="text" [attr.value]="row.displayName" name="row.displayName" [(ngModel)]="row.displayName"/>
            </ng-template>
          </amexio-data-table-column>
        </amexio-datagrid>
      </amexio-body>
      <amexio-action>
        <amexio-button [type]= "'theme-color'" label="Create" (onClick)="createModel()"></amexio-button>
      </amexio-action>
    </amexio-window>
  `
})
export class CreateModelComponent implements OnInit {
  @Input() showModel: boolean;

  @Output() showModelChange: EventEmitter<any> = new EventEmitter();

  @Output() createModelEvent: EventEmitter<any> = new EventEmitter();

  modelDataStructure: any[] = [];

  isModelValid: boolean = true;

  hasModelNameValid: boolean = true;

  modelObject: ModelStructure;
  constructor(
    public _eventHndl: EventHandlerService,
    public _sharedDataService: SharedDataService,
    private _notificationService: NotificationService
  ) {
    this.modelObject = new ModelStructure();
  }

  ngOnInit() {
    this.modelObject.bondedContextId = this._sharedDataService.uiDetails.boundedcontextId;
    this.modelObject.domainId = this._sharedDataService.uiDetails.domainId;
    this.getComponentList();
  }

  /*GET UI COMPONENT LIST*/

  getComponentList() {
    this.modelDataStructure = [];
    this._eventHndl.findListOfComponent().forEach((com: any) => {
      if (com.componentBehaviour.hasModelBinding) {
        if (com.properties.model && com.properties.model.modelName == '') {
          let object: any = {};
          object['name'] = com.properties.name;
          object['displayName'] = com.properties.name;
          object['fieldLabel'] = com.properties.fieldLabel;
          object['datatype'] =
            ComponentDataTypeMap.COMPONENT_DATATYPE[com.name];
          object['objectTypeId'] =
            ComponentDataTypeMap.DATATYPE_ID[
              ComponentDataTypeMap.COMPONENT_DATATYPE[com.name]
            ];
          this.modelDataStructure.push(object);
        }
      }
    });
  }

  /*CREATE MODEL STRUCTURE DATA AND EMIT EVENT*/

  createModel() {
    this.isModelValid = true;
    this.checkFormValidation();
    this.modelObject.text = this.modelObject.name;
    this.modelObject.path =
      this._sharedDataService.uiDetails.boundedcontext +
      '/' +
      this._sharedDataService.uiDetails.domain +
      '/' +
      this.modelObject.name;
    if (this.isModelValid) {
      this._eventHndl.modelbindedDataRef = {
        modelName: this.modelObject.name,
        modelFields: this.modelDataStructure
      };
      this.showModel = false;
      this.createModelEvent.emit(this.modelObject);
      this.showModelChange.emit(this.showModel);
    }
  }

  /*CLOSE MODEL*/

  onClose(event: any) {
    this.showModel = false;
    this.showModelChange.emit(this.showModel);
  }

  /*VALIDATE MODEL*/

  checkFormValidation() {
    if (this.modelObject.name != '' && !this.hasModelNameValid) {
      if (this.modelObject.description == '') {
        this.modelObject.description = this.modelObject.name;
      }
      this.checkFormFieldValidation();
    } else {
      this.isModelValid = false;
      this._notificationService.setNotificationData(
        true,
        ['Model name is required '],
        'red'
      );
    }
  }

  /*VALIDATE MODEL FIELDS*/

  checkFormFieldValidation() {
    this.modelObject.objectFields = [];
    this.modelDataStructure.forEach((opt: any) => {
      if (opt.displayName && opt.displayName != '') {
        let object = new ModelFieldStructure();
        object.name = opt.displayName;
        object.text = opt.displayName;
        object.displayName = opt.displayName;
        object.objectName = opt.datatype;
        object.objectTypeId = opt.objectTypeId;
        object.description = object.displayName;
        this.modelObject.objectFields.push(object);
      } else {
        this.isModelValid = false;
        this._notificationService.setNotificationData(
          true,
          ['Display name required for each field '],
          'red'
        );
      }
    });
  }

  nameValidation() {
    if (
      this.modelObject.name.split(' ').length == 1 &&
      this.modelObject.name != ''
    ) {
      this.hasModelNameValid = false;
      let i: number = 0;
      let character: string = '';
      while (i < this.modelObject.name.length) {
        character = this.modelObject.name.charAt(i);
        if (character == character.toUpperCase()) {
          this.hasModelNameValid = true;
        }
        i++;
      }
    } else {
      this.hasModelNameValid = true;
    }
  }
}

/*MODEL FIELD STRUCTURE*/

export class ModelFieldStructure {
  collection: boolean;
  collectionId: string;
  description: string;
  displayName: string;
  name: string;
  objectType: number;
  objectTypeId: string;
  objectName: string;
  objectTypeLabel: string;
  update: boolean;
  text: string;
  constructor() {
    this.collection = false;
    this.objectType = 2;
    this.name = '';
    this.collectionId = null;
    this.description = '';
    this.displayName = '';
    this.objectName = '';
    this.objectTypeLabel = 'Primitive Type';
    this.update = false;
    this.objectTypeId = '';
    this.text = '';
  }
}

/* MODEL STRUCTURE*/

export class ModelStructure {
  bondedContextId: string;
  domainId: string;
  name: string;
  description: string;
  objectFields: any[];
  text: string;
  path: string;
  constructor() {
    this.bondedContextId = '';
    this.domainId = '';
    this.name = '';
    this.description = '';
    this.objectFields = [];
    this.text = '';
    this.path = '';
  }
}
