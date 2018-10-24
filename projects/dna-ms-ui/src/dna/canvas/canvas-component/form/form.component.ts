/**
 * Created by dattaram on 1/3/18.
 */
import {
  Component,
  ComponentFactoryResolver,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { CanvasWidgetClass } from '../../canvas-models/canvas.widget.class';
import { EventHandlerService } from '../../canvas-service/event.service';
import { PropertyMap } from '../../canvas-component-map/properties.map';
import { FormsInterface } from '../../canvas-models/forms.properties';
import { WidgetMap } from '../../canvas-component-map/component.map';

@Component({
  selector: 'canvas-form',
  template: `
    <div class="canvas-card" (click)="setSelfActive($event)" [attr.id]="componentId"
         (mouseover)="onMouseOver($event)" (mouseleave)="onMouseLeave($event)"
         draggable="true" [ngClass]="{'componentStyle':isOver,'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}"
          (dragstart)="_eventHndl.componentElementRelocateDragBegin($event,this)"
          (contextmenu)="loadContextMenu($event)"
         (dragenter)="componentDragExit($event)"
          (dragover)="componentElementDraggedOver($event)" #form>
    <amexio-form [header]="properties.enableHeader"
                 [footer-align]="properties.footerAlign"
                 [header-align]="properties.headerAlign">
      <amexio-form-header>
          <div [ngStyle]="{'display' : properties.customHeader ? 'block' : 'none'}">
            <div #formheadertarget></div>
          </div>
        <div [ngStyle]="{'display' : !properties.customHeader ? 'block' : 'none'}">
          <amexio-label [size]="properties.size" [font-color]="properties.color">{{properties.header}}</amexio-label>
        </div>
      </amexio-form-header>
      <amexio-form-body>
          <div #formbodytarget></div>
      </amexio-form-body>
      <amexio-form-action>
        <div #formactiontarget></div>
      </amexio-form-action>
    </amexio-form>
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
export class CanvasFormComponent extends CanvasWidgetClass
  implements OnInit, OnDestroy {
  @ViewChild('formbodytarget', { read: ViewContainerRef })
  target: any;
  @ViewChild('formactiontarget', { read: ViewContainerRef })
  actionTarget: any;
  @ViewChild('formheadertarget', { read: ViewContainerRef })
  headerTarget: any;
  showContextMenu: boolean;
  mouseLocation: { left: number; top: number } = { left: 0, top: 0 };
  constructor(
    public _eventHndl: EventHandlerService,
    public _componentFactoryResolver: ComponentFactoryResolver
  ) {
    super();
    this.properties = new FormProperties();
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

  componentElementDraggedOver(event: any) {
    event.preventDefault();
  }

  createCardConfig() {
    const formHeaderComponentFactory = this._componentFactoryResolver.resolveComponentFactory(
      WidgetMap.COMPONENT_CLASS_MAP['formheader']
    );
    const formHeaderComponentInstance = this.headerTarget.createComponent(
      formHeaderComponentFactory
    );

    const formBodyComponentFactory = this._componentFactoryResolver.resolveComponentFactory(
      WidgetMap.COMPONENT_CLASS_MAP['formbody']
    );
    const formBodayComponentInstance = this.target.createComponent(
      formBodyComponentFactory
    );
    const formActionComponentFactory = this._componentFactoryResolver.resolveComponentFactory(
      WidgetMap.COMPONENT_CLASS_MAP['formaction']
    );
    const formActionComponentInstance = this.actionTarget.createComponent(
      formActionComponentFactory
    );
    formActionComponentInstance.instance.createComponentConfig();
    formActionComponentInstance.instance.createComponentConfig();
    this.addButtonProperties(formActionComponentInstance);

    this.children.push(
      formHeaderComponentInstance,
      formBodayComponentInstance,
      formActionComponentInstance
    );
  }

  // THIS METHOD IS USED FOR TO ADD BUTTON IN ACTION
  addButtonProperties(formActionComponentInstance: any): any {
    if (formActionComponentInstance.instance.children[0]) {
      formActionComponentInstance.instance.children[0].instance.properties.label =
        'Cancel';
      formActionComponentInstance.instance.children[0].instance.properties.type =
        'theme-backgroundcolor';
    }
    if (formActionComponentInstance.instance.children[1]) {
      formActionComponentInstance.instance.children[1].instance.properties.label =
        'Save';
      formActionComponentInstance.instance.children[1].instance.properties.type =
        'success';
      formActionComponentInstance.instance.children[1].instance.properties.formBind = this.properties.name;
    }
    return formActionComponentInstance;
  }
  ngOnDestroy() {
    this.removeDuplicateOnRelocate(this._eventHndl.viewRefs);
    this.removeFromParent(this.parentComponentRef);
  }

  removeDuplicateOnRelocate(components: any[]) {
    components.forEach((compRef, index) => {
      if (compRef.componentId === this.componentId) {
        components.splice(index, 1);
        return;
      } else {
        if (compRef.hasOwnProperty('children') && compRef.children.length > 0) {
          this.removeDuplicateOnRelocate(compRef.children);
        }
      }
    });
  }

  removeFromParent(parentComponentRef: any) {
    if (parentComponentRef != null) {
      parentComponentRef.children.forEach((del: any, index: any) => {
        if (del.instance.componentId === this.componentId) {
          parentComponentRef.children.splice(index, 1);
        }
      });
    }
  }

  componentDragExit(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.isActive = false;
  }
}

export class FormProperties implements FormsInterface {
  isComponentValid: boolean;
  name: string;
  enableHeader: boolean;
  enableFooter: boolean;
  height: number;
  showError: boolean;
  headerAlign: string;
  footerAlign: string;
  header: string;
  customHeader: boolean;
  size: string;
  color: any;
  constructor() {
    /*temporary use*/
    this.name = 'form_' + Math.floor(Math.random() * 90000) + 10000;
    this.isComponentValid = true;
    this.enableHeader = true;
    this.enableFooter = true;
    this.height = 50;
    this.showError = true;
    this.headerAlign = 'right';
    this.footerAlign = 'right';
    this.customHeader = false;
    this.color = '';
    this.size = '';
  }
}
