/**
 * Created by pratik on 23/2/18.
 */
import {
  Component,
  ComponentFactoryResolver,
  HostListener,
  OnInit
} from '@angular/core';
import {
  FormsInterface,
  ModelClass
} from '../../canvas-models/forms.properties';
import { CanvasWidgetClass } from '../../canvas-models/canvas.widget.class';
import { EventHandlerService } from '../../canvas-service/event.service';
import { DatasourceModel, Metadata } from '../../canvas-models/datasource.model';
import { EventRelationBaseModel } from '../../event-relationship/models/event.basemodel';

@Component({
  selector: 'dropdown-component',
  template: `

   <div (click)="setSelfActive($event)" [attr.id]="componentId"
        draggable="true" [ngClass]="{'componentStyle':isOver,'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}"
         (dragstart)="_eventHndl.componentElementRelocateDragBegin($event,this)"
        (contextmenu)="loadContextMenu($event)"
         (dragover)="componentElementDraggedOver($event)" #dropdown>
     <amexio-dropdown [place-holder]="properties.placeholder"
                      [field-label]="properties.fieldLabel">
     </amexio-dropdown>

   </div>
   <span  *ngIf="showContextMenu" (click)="onDeleteClick()" class="dropdown"
      [ngStyle]="{left: this.mouseLocation.left + 'px',top: this.mouseLocation.top + 'px',position:'fixed','box-shadow': '1px 1px 2px #000000',width: '15%'}">
          <ul class="dropdown-list">
            <li class="list-items">
              <span ><i class="fa fa-trash" style="padding-right: 5px;"></i> <b>Delete</b> </span>
            </li>
          </ul>
        </span>
 `
})
export class DropDownCanvasComponent extends CanvasWidgetClass
  implements OnInit {
  dataSource: DropdownDatasource;
  eventRelationship: EventRelationBaseModel;
  overStyle: any;
  type: string = 'default';
  showContextMenu: boolean;
  mouseLocation: { left: number; top: number } = { left: 0, top: 0 };
  constructor(
    public _eventHndl: EventHandlerService,
    public _componentFactoryResolver: ComponentFactoryResolver
  ) {
    super();
    this.componentBehaviour.hasModelBinding = true;
    this.componentBehaviour.hasRelationship = true;
    this.componentBehaviour.isBindingComponent = true;
    this.componentBehaviour.hasDataSource = true;
    this.properties = new DropDownProperties();
    this.dataSource = new DropdownDatasource();
    this.eventRelationship = new EventRelationBaseModel();
  }
  ngOnInit() {
    this.componentId =
      +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
  }

  onMouseOver(event: any) {
    event.stopPropagation();
    this.isOver = true;
  }
  onMouseLeave(event: any) {
    event.stopPropagation();
    this.isOver = false;
  }

  @HostListener('document:click')
  onWindowClick() {
    this.showContextMenu = false;
  }
  getContextMenuStyle() {
    return {
      position: 'fixed',
      display: this.showContextMenu ? 'block' : 'none',
      left: this.mouseLocation.left + 'px',
      top: this.mouseLocation.top + 'px',
      'box-shadow': '1px 1px 2px #000000',
      width: '15%'
    };
  }
  loadContextMenu(event: any) {
    this.mouseLocation.left = event.clientX;
    this.mouseLocation.top = event.clientY;
    this.showContextMenu = true;
    event.preventDefault();
    event.stopPropagation();
    this._eventHndl.deleteComponentRef = this.componentId;
  }
  onDeleteClick() {
    this.showContextMenu = false;
    this._eventHndl.componentIdToDel = this.componentId;
    this._eventHndl.deleteComponent();
    this._eventHndl.addEditorNewState();
  }
  setSelfActive(event: any) {
    event.stopPropagation();
    this._eventHndl.deleteComponentRef = null;
    this._eventHndl.deleteComponentRef = this.componentId;
    this._eventHndl.setAllComponentsInactive(this.componentId);
    this._eventHndl.loadComponentProperties(this.name);
  }

  /*loadComponentProperties() {
    this._eventHndl.propertyViewRef.clear();
    this._eventHndl.behaviourViewRef.clear();
    const propertyFactory = this._componentFactoryResolver.resolveComponentFactory(
      PropertyMap.PROPERTY_MAP[this.name]
    );
    const behaviourFactory = this._componentFactoryResolver.resolveComponentFactory(
      BehaviourMap.BEHAVIOUR_MAP[this.name]
    );

    const propertyInstance = this._eventHndl.propertyViewRef.createComponent(
      propertyFactory
    );
    const behaviourInstance = this._eventHndl.behaviourViewRef.createComponent(
      behaviourFactory
    );
    propertyInstance.instance.componentInstance = this._eventHndl.currentWidgetRef;
    behaviourInstance.instance.componentInstance = this._eventHndl.currentWidgetRef;
    propertyInstance.changeDetectorRef.detectChanges();
    behaviourInstance.changeDetectorRef.detectChanges();

  }*/

  componentElementDraggedOver(event: any) {
    event.preventDefault();
  }
}

export class DropDownProperties implements FormsInterface {
  disabled: boolean;
  errorMsg: string;
  name: string;

  /*validation related attribute*/

  fieldLabel: string;
  placeholder: string;
  search: boolean;
  multiselect: boolean;
  allowBlank: boolean;

  /*style related attribute*/
  isComponentValid: boolean;

  displayField: string;
  valueField: string;
  model: any;
  constructor() {
    this.model = new ModelClass();
    this.name = '';
    this.isComponentValid = false;
    this.fieldLabel = 'Dropdown';
    this.disabled = false;
    this.errorMsg = '';
    this.search = false;
    this.multiselect = false;
    this.allowBlank = true;
    this.displayField = '';
    this.valueField = '';
  }
}

export class DropdownDatasource extends DatasourceModel {
  dataReader: string;
  metadata: any;
  servicetype: any;
  localDataName: any;
  displayField: string;
  valueField: string;
  constructor() {
    super();
    this.metadata = new Metadata();
    this.dataReader = '';
    this.servicetype = '1';
    this.displayField = '';
    this.valueField = '';
    this.localDataName = null;
    this.remote.httpMethod = 1;
    this.remote.httpUrl = '';
  }
}
