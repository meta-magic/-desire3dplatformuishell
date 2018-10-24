
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import { EventHandlerService } from './canvas-service/event.service';
import { RestCallService } from './canvas-service/restcall.service';
import { WidgetMap } from './canvas-component-map/component.map';
import COMPONENT_CLASS_MAP = WidgetMap.COMPONENT_CLASS_MAP;
import { PropertyMap } from './canvas-component-map/properties.map';
import PROPERTY_MAP = PropertyMap.PROPERTY_MAP;
import { EditorStateService } from './canvas-service/editor.state';
import { DragDropEventService } from './canvas-service/dragdrop.event.service';
import { ValidationMap } from './canvas-component-map/dradrop-validation-map';
import { LoaderService, LocalStorageService } from 'platform-commons';
import { MessagingService } from 'platform-commons';
import { NotificationService } from './canvas-service/notification.service';
import { SharedDataService } from './canvas-service/shared-data.service';
import { BehaviourMap } from './canvas-component-map/behaviour.map';
import { RelationshipBlockMap } from './canvas-component-map/retionship.map';
import { ModelClass } from './canvas-models/forms.properties';
import { ModelMapComponent } from './canvas-sub-UI/model-mapping/model.mapping.component';

@Component({
  selector: 'canvas-ui',
  template: `
      <div class="canvas"  [ngStyle]="{'display':_eventHndl.showCanvas ? 'block':'none'}" [ngClass]="{'fullscreen' : isFullscreen}" >
      <div class="loadingnav" *ngIf="loaderService.isLoading"></div>
       <div *ngIf="toggleCanvasUI">
          <amexio-row>
            <amexio-column [size]="'2'" id="canvasLeftSideColumn">
              <div class="canvas-component-pane">
                <amexio-card [header]="true" [body-height]="bodyHeight" [footer]="true"
                             [footer-align]="'right'">
                  <amexio-header>
                    Ui Components
                  </amexio-header>
                  <amexio-body>
                    <div [ngClass]="{'disabled-area':isCanvasDisabled}">
                      <amexio-side-nav
                        [http-url]="'assets/dna/data/components.json'"
                        [http-method]="'get'"
                        [data-reader]="'children'"
                        [width]="'100%'"
                        [position]="'relative'"
                        [enable-drag]="true"
                        (onDrag)="_eventHndl.componentElementDragBeginRoot($event)">
                      </amexio-side-nav>
                    </div>
                  </amexio-body>
                  <amexio-action>
                    <amexio-button
                      [type]="'secondary'"
                      [tooltip]="'Open'"
                      [size]="'default'"
                      (onClick)="openUIWindow()"
                      [icon]="'fa fa-folder-open'"
                    >
                    </amexio-button>
                    <amexio-button
                      [type]="'primary'"
                      [tooltip]="'New'"
                      [size]="'default'"
                      (onClick)="createUIWindow()"
                      [icon]="'fa fa-plus-square'">
                    </amexio-button>
                  </amexio-action>
                </amexio-card>
              </div>
            </amexio-column>
            <amexio-column [size]="'8'">
              <div class="canvas-draw-pane">
                <amexio-card [header]="false" [body-height]="bodyHeight" [footer-align]="'right'" [footer]="true">
                  <amexio-body>
                    <div class="uicanvas-drawingpanel">
                      <div  style="min-height: 82vh;background-color: white">
                        <ng-template #target></ng-template>
                      </div>
                    </div>

                  </amexio-body>
                  <amexio-action >
                      <div style="display: flex;justify-content:flex-end">
                          <amexio-label style="padding-right:10px;" size="small" font-color="#FF5733">{{canvasUI.name}}</amexio-label>

                          <div [ngClass]="{'disabled-area':isCanvasDisabled}">

                          <amexio-button
                            [type]="'secondary'"
                            [tooltip]="'Delete'"
                            [size]="'default'"
                            (onClick)="onDelete()"
                            [icon]="'fa fa-eraser'">
                          </amexio-button>

                          <amexio-button
                            [type]="'secondary'"
                            [tooltip]="'undo'"
                            [size]="'default'"
                            (onClick)="onUndo()"
                            [icon]="'fa fa-undo'"
                          >
                          </amexio-button>
                          <amexio-button
                            [type]="'secondary'"
                            [tooltip]="'Redo'"
                            [size]="'default'"
                            (onClick)="onRedo()"
                            [icon]="'fa fa-repeat'">
                          </amexio-button>

                         <!-- <amexio-button
                            [type]="'secondary'"
                            [tooltip]="'Preview'"
                            [icon]="'fa fa-expand'"
                            [size]="'default'" (onClick)="onPreview()">
                          </amexio-button>-->
                         <!-- <amexio-button [label]="canvasWindowSize"
                                         [type]="'secondary'"
                                         [tooltip]="'Fullscreen'"
                                         [size]="'default'"
                                         (onClick)="toggleScreenSize()"
                                         [icon]="isFullscreen ? 'fa fa-compress' :'fa fa-arrows-alt'"
                          >
                          </amexio-button>-->
                          <amexio-button  [label]="'Save'"
                                         [type]="'theme-color'"
                                         [tooltip]="'Save'"
                                         [size]="'default'"
                                         (onClick)="onSave()"
                                         [disabled]="saveComplete"
                                         [icon]="'fa fa-floppy-o'"
                          >
                          </amexio-button>

                        </div>

                        <amexio-button style="padding-left:5px" [label]="'Preview'"
                        [type]="'theme-color'"
                        [tooltip]="'Preview'"
                        [size]="'default'"
                        (onClick)="onAppPreviewClick()"
                        [icon]="'fa fa-eye'">
                      </amexio-button>
                      </div>
                  </amexio-action>
                </amexio-card>
              </div>
            </amexio-column>
            <amexio-column [size]="'2'">
              <div class="canvas-property-pane">
                <amexio-card [header]="false"
                             [body-height]="bodyHeight" [footer]="false">
                  <amexio-body>
                        <amexio-accordion #accordian>
                          <amexio-accordion-tab header="Properties" active="true" >
                            <div class="property-card-style">
                              <amexio-card [header]="false"
                                           [body-height]="propertyAccordianHeight" [footer]="false">
                                <amexio-body>
                                  <div style="padding: 5px">
                                    <ng-template #property></ng-template>
                                  </div>
                                </amexio-body>
                              </amexio-card>
                            </div>

                          </amexio-accordion-tab>
                          <amexio-accordion-tab header="Behaviour" [disabled]="false">
                                <div class="property-card-style">
                                  <amexio-card [header]="false"
                                               [footer]="false">
                                    <amexio-body>
                                      <div style="padding: 5px">
                                        <ng-template #behaviour></ng-template>
                                      </div>
                                    </amexio-body>
                                  </amexio-card>
                                </div>

                          </amexio-accordion-tab>
                          <amexio-accordion-tab header="Models" [disabled]="false">
                            <div class="property-card-style">
                              <amexio-card [header]="false"
                                           [footer]="false">
                                <amexio-body>
                                  <ng-container *ngIf="showModelBindingUI">
                                    <div style="padding: 5px">
                                      <model-mapping-UI [disabledMapButton]="disabledMapButton"  [modelsData]="modelsData" (listOfModels)="canvasUI.metadata.modelInfo.models = $event"></model-mapping-UI>
                                    </div>
                                  </ng-container>
                                </amexio-body>
                              </amexio-card>
                            </div>

                          </amexio-accordion-tab>
                        </amexio-accordion>
                  </amexio-body>
                </amexio-card>
              </div>
            </amexio-column>
          </amexio-row>
        </div>

        <ng-container *ngIf="showCreateUI">
          <create-ui [(show)]="showCreateUI" (onCreateClick)="createUI($event)"></create-ui>
        </ng-container>
        <ng-container *ngIf="showOpenUI">
          <open-ui [(show)]="showOpenUI" (onOpenClick)="openUI($event)"></open-ui>
        </ng-container>
      </div>

      <div *ngIf="_eventHndl.showDataSource">
        <data-source [componentInstance]="_eventHndl.componentInstance"></data-source>
      </div>
      <ng-container *ngIf="_eventHndl.showRelationship">
        <event-relationship [componentInstance]="_eventHndl.componentInstance" [selectedEventData]="_eventHndl.selectedEventData"></event-relationship>
      </ng-container>

      <!-- Row Drop Dialogue-->
      <div class="row-config">
        <amexio-dialogue [show-dialogue]="_dragDropEventService.rowAddDialogue"
                         [custom]="true" [closable]="false"
                         [title]="'Row Configuration'"
                         [type]="'confirm'">
          <amexio-body>
            <amexio-row>
              <amexio-column [size]="'6'" style="height: 250px">
                <amexio-number-input  [enable-popover]="false"
                                      [(ngModel)]="_dragDropEventService.rowCount"
                                      [field-label]="'No.of Rows'"
                                      [place-holder]="'Enter row'"
                                      [min-value]="1"
                                      [max-value]="100"
                                      [allow-blank]="false"
                                      [icon-feedback]="true">
                </amexio-number-input>
              </amexio-column>
              <amexio-column [size]="'6'">
                <amexio-dropdown [(ngModel)]="_dragDropEventService.columnCount"
                                 [place-holder]="'Choose'" 
                                 [http-url]="'assets/dna/data/columndropdown.json'"
                                 [http-method]="'get'"
                                 [field-label]="'Column'"
                                 [display-field]="'text'"
                                 [value-field]="'value'"
                                 [readonly]="true">
                </amexio-dropdown>
              </amexio-column>
            </amexio-row>
          </amexio-body>
          <amexio-action>
            <amexio-button type="secondary"
                           [icon]="'fa fa-times'"
                           (onClick)="_dragDropEventService.rowDropCancel()"
                           [label]="'Cancel'">
            </amexio-button>
            <amexio-button type="primary"
                           [icon]="'fa fa-pencil-square'"
                           (onClick)="_dragDropEventService.rowDrop()"
                           [label]="'Draw'">
            </amexio-button>

          </amexio-action>
        </amexio-dialogue>
      </div>


    
      <ng-container *ngIf="_eventHndl.showCreateModel">
        <create-model [(showModel)]="_eventHndl.showCreateModel" (createModelEvent)="createModel($event)"></create-model>
      </ng-container>

      <amexio-dialogue  [(show)]="migrationStatusDialogue"
                        [button-size]="'medium'"
                        [title]="'Confirm'"
                        [message]="'Please migrate project ?'"
                        [message-type]="'confirm'"
                        (actionStatus)="migrateProject($event)">
      </amexio-dialogue>

      <amexio-notification [data]="_eventHndl.notificationData"
                           [vertical-position]="'top'"
                           [horizontal-position]="'right'"
                           [auto-dismiss-msg]="true"
                           [auto-dismiss-msg-interval]="4000">
      </amexio-notification>
    <canvas-notification></canvas-notification>
    
    
    <amexio-dialogue  [(show)]="showMenuBuliderDialogue"
                        [button-size]="'medium'"
                        [title]="'Confirm'"
                        [message]="'Do you want to map menu for new saved UI ? '"
                        [message-type]="'confirm'"
                        (actionStatus)="menuBuilderConfirmation($event)">
      </amexio-dialogue>



  `,
  styles: [
    `
      .fullscreen {
        width: 100%;
        height: 100%;
      }
      .menuDisabled {
        text-decoration: line-through red;
      }

      .disabled-area {
        pointer-events: none;
        opacity: 0.4;
        cursor: not-allowed;
        padding-right: 5px;
      }
    `
  ]
})
export class CanvasComponent implements OnInit, AfterViewInit {
  canvasWindowSize = 'Fullscreen';
  isFullscreen: boolean;
  showCreateUI: boolean = false;
  showOpenUI: boolean = false;
  children: any[];
  @ViewChild('property', { read: ViewContainerRef })
  propertyTarget: any;

  @ViewChild('behaviour', { read: ViewContainerRef })
  behaviourTarget: any;
  @ViewChild('models', { read: ViewContainerRef })
  modelTarget: any;

  @ViewChild('target', { read: ViewContainerRef })
  target: any;

  @ViewChild(ModelMapComponent) modelComponent: ModelMapComponent;

  @ViewChildren('accordian') accordian: any;
  canvasUI: any;
  saveJSON: any[];
  toggleProps: any;
  saveComplete: boolean;
  typeData: any;
  bodyHeight: number = 85;
  propertyAccordianHeight: number = 66.5;
  isCanvasDisabled: boolean;

  toggleCanvasUI: boolean;

  showModelBindingUI: boolean;

  migrationStatusDialogue = false;

  componentList: any;

  modelsData: any;

  disabledMapButton: boolean = true;

  showMenuBuliderDialogue: boolean = false;

  constructor(
    public _restCallService: RestCallService,
    public _eventHndl: EventHandlerService,
    private _componentFactoryResolver: ComponentFactoryResolver,
    public _editorState: EditorStateService,
    public _dragDropEventService: DragDropEventService,
    private msgService: MessagingService,
    public loaderService: LoaderService,
    private cdf: ChangeDetectorRef,
    private _notificationService: NotificationService,
    private _sharedDataService: SharedDataService,
    private ls: LocalStorageService
  ) {
    this._eventHndl.showDataSource = false;
    this._eventHndl.showRelationship = false;
    this._eventHndl.showCanvas = true;
    this.toggleCanvasUI = true;
    this.saveComplete = false;
    this.children = [];
    this._eventHndl.appComponentInstance = this;
    this._eventHndl.viewRefs = this.children;
    this.canvasUI = new CanvasUI();
    this.isCanvasDisabled = true;
    /* let pp = {
      desire3dversionid: 2,
      projectMigrated: true
    };
     localStorage.setItem('platformInfo', JSON.stringify(pp));*/
  }

  getValidMenu(node: any): boolean {
    if (!node.hasOwnProperty('children') && !node.disabled) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this._eventHndl.propertyViewRef = this.propertyTarget;
    this._eventHndl.behaviourViewRef = this.behaviourTarget;
    this._eventHndl.modelViewref = this.modelTarget;
    this._eventHndl.accordianRef = this.accordian.toArray();
  }

  onDelete() {
    this._eventHndl.deleteComponent();
    this._eventHndl.addEditorNewState();
  }

  openUIWindow() {
    if (this.checkMigrationStatus()) {
      this.showOpenUI = true;
    } else {
      this.migrationStatusDialogue = true;
    }
    /* LOCAL CHECK */
     //this.localOpenUiTestFunction();
  }

  createUIWindow() {
    if (this.checkMigrationStatus()) {
      this.showCreateUI = true;
    } else {
      this.migrationStatusDialogue = true;
    }
  }

  checkMigrationStatus(): boolean {
    if (this.ls.get('platformInfo').projectMigrated) {
      return true;
    } else {
      return false;
    }
  }

  // Load Default Component In Open/Undo/Redo Case
  loadDefaultComponent() {
    this._eventHndl.propertyViewRef.clear();
    this._eventHndl.behaviourViewRef.clear();
    const behaviourFactory = this._componentFactoryResolver.resolveComponentFactory(
      BehaviourMap.BEHAVIOUR_MAP['rootpane']
    );
    const behaviourInstance = this._eventHndl.behaviourViewRef.createComponent(
      behaviourFactory
    );
    behaviourInstance.instance.componentInstance = this._eventHndl.currentWidgetRef;
    behaviourInstance.changeDetectorRef.detectChanges();
    this._eventHndl.setAllComponentsInactive(
      this._eventHndl.currentWidgetRef.componentId
    );
  }

  repaintWidgetsInOpen(targetComponentRef: any, widget: any) {
    widget.child.forEach((compo: any) => {
      let componentData: any;
      let componentInstance: any;
      let cInstance: any;
      let componentFactory: any;
      if (widget.name === 'card') {
        componentData = this.createCardChildComponent(
          compo,
          targetComponentRef
        );
        cInstance = componentData.cInstance;
        componentInstance = componentData.componentInstance;
      } else if (widget.name === 'border') {
        componentData = this.createBorderChildComponents(
          compo,
          targetComponentRef
        );
        cInstance = componentData.cInstance;
        componentInstance = componentData.componentInstance;
      } else if (widget.name === 'datapoint') {
        componentData = this.createDataPointChildComponents(
          compo,
          targetComponentRef
        );
        cInstance = componentData.cInstance;
        componentInstance = componentData.componentInstance;
      } else {
        cInstance = targetComponentRef.instance;
        componentFactory = this._componentFactoryResolver.resolveComponentFactory(
          WidgetMap.COMPONENT_CLASS_MAP[compo.name]
        );
        componentInstance = cInstance.target.createComponent(componentFactory);
      }
      componentInstance.instance.name = compo.name;

      /*    if (!compo.hasOwnProperty('componentBehaviour')) {
        let returnObj = this.setComponentBehaviourObject(compo);
        if (returnObj != null) {
          componentInstance.instance.componentBehaviour = returnObj;
        }
      } else {
        componentInstance.instance.componentBehaviour =
          compo.componentBehaviour;
      }
*/
      /* Edit mode code */

      if (componentInstance.instance.hasOwnProperty('editMode')) {
        componentInstance.instance.editMode = true;
      }

      if (componentInstance.instance.hasOwnProperty('parentComponentRef')) {
        componentInstance.instance.parentComponentRef = cInstance;
      }
      /* End edit mode code */
      componentInstance.instance.properties = compo.properties;
      if (ValidationMap.Icon_Class_Change[compo.name]) {
        componentInstance.instance.properties['icon'] =
          componentInstance.instance.properties.iconClass;
      }
      if (compo.hasOwnProperty('dataSource')) {
        componentInstance.instance.dataSource = compo.dataSource;
      }
      if (compo.hasOwnProperty('eventRelationship')) {
        componentInstance.instance.eventRelationship = compo.eventRelationship;
      }
      componentInstance.instance.parentComponentRef =
        targetComponentRef.instance;

      if (
        !componentInstance.instance.properties.hasOwnProperty('model') &&
        componentInstance.instance.isComponent
      ) {
        if (
          !RelationshipBlockMap.Component_Restrict[
            componentInstance.instance.name
          ]
        ) {
          componentInstance.instance.properties['model'] = new ModelClass();
        }
      }

      componentInstance.changeDetectorRef.detectChanges();
      if (compo.child && compo.child.length > 0) {
        this.repaintWidgetsInOpen(componentInstance, compo);
        if (compo && compo.name == 'row') {
          componentInstance.instance.componentInitailized();
        }
      }

      cInstance.children.push(componentInstance);

      /* code for spl component open */

      if (WidgetMap.SPL_COMPONENTS[cInstance.name]) {
        cInstance.createLocalData();
      }

      /* End of code for spl component relocation */
    });
  }

  onSave() {
    this._eventHndl.resetValidationData();
    this.saveJSON = [];
    // this.saveCallExecution();
    if (this._eventHndl.checkUIComponentValidation(this.children)) {
      if (this._eventHndl.isModelBinded) {
        this.saveCallExecution();
      } else {
        this._eventHndl.showCreateModel = true;
      }
    } else {
      //display invalid component to ui on window
      this._eventHndl.createNotificationData();
      this.cdf.detectChanges();
    }
  }

  createModel(modelObject: any) {
    /*  let response = { response: modelObject };
    this.createModelSuccess(response);*/

    this.loaderService.showLoader();
    let response: any;
    this._restCallService
      .postRestCall('/api/dna/objects/createModelByUiDesign', modelObject)
      .subscribe(
        res => {
          response = res;
        },
        err => {
          console.log(err);
        },
        () => {
          if (response.success) {
            this.createModelSuccess(response);
          } else {
            this.createModelFails(response);
          }
        }
      );
  }

  createModelSuccess(response: any) {
    this.createModelTreeStructure(response.response);
    this._eventHndl.isModelBinded = true;
    this._eventHndl.reflectModelChangeInComponent(this.children);
    this.canvasUI.metadata.modelInfo.models.push(response.response);
    this.modelComponent.updateModelList(response.response);
    this._notificationService.setNotificationData(
      true,
      [response.successMessage],
      'green'
    );
    this.disabledMapButton = false;
    this._eventHndl.showCreateModel = false;
    this.loaderService.hideLoader();
    this.saveCallExecution();
  }

  createModelTreeStructure(modelObject: any) {
    modelObject['text'] = modelObject.name;
    modelObject['children'] = [];
    modelObject.objectFields.forEach((obj: any) => {
      obj['text'] = obj.name;
      modelObject.children.push(obj);
    });
    delete modelObject['objectFields'];
  }

  createModelFails(response: any) {
    this.loaderService.hideLoader();
    this._eventHndl.isModelBinded = false;
    this._notificationService.setNotificationData(
      true,
      [response.errorMessage],
      'red'
    );
    this._eventHndl.showCreateModel = true;
  }

  /* SAVE SERVICE CALL*/

  saveCallExecution() {
    this.saveComplete = true;
    let data: any;
    let menuBuilderStatus: boolean = false;
    this.children.forEach((widget: any) => {
      const widRefObj = new SaveJSON();
      widRefObj.name = widget.instance.name;
      widRefObj.id = widget.instance.componentId;
      widRefObj.properties = widget.instance.properties;
      widRefObj.dataSource = widget.instance.dataSource;
      // widRefObj.componentBehaviour = widget.instance.componentBehaviour;
      widRefObj.eventRelationship = widget.instance.eventRelationship;
      this._eventHndl.createValidSaveJSON(widget.instance, widRefObj);
      this.saveJSON.push(widRefObj);
    });
    this.canvasUI.metadata.child = [];
    this.canvasUI.metadata.child = this.saveJSON;
    const requestJson = JSON.stringify(this.canvasUI);
    localStorage.setItem('data', requestJson);
    this.loaderService.showLoader();
    if(this.canvasUI.id == null || this.canvasUI.id == '' ){
      menuBuilderStatus = true;
    }
    this._restCallService
      .postRestCall('/api/dna/design/save', requestJson)
      .subscribe(
        res => {
          data = res;
        },
        err => {
          this.saveComplete = false;
          this.loaderService.hideLoader();
        },
        () => {
          if (
            data.success &&
            data.hasOwnProperty('successMessage') &&
            data.successMessage != null
          ) {
            this.loaderService.hideLoader();
            this.uiCreateDEvent({ ui_created: true });
            if (data.response.hasOwnProperty('id')) {
              if (data.response.id != null && data.response.id != '') {
                this.canvasUI.id = data.response.id;
              }
            }
            this._notificationService.setNotificationData(
              true,
              [data.successMessage],
              'green'
            );

            if(menuBuilderStatus){
              this.showMenuBuliderDialogue = true;
            }
            this.openUI(data.response);
        /*    this.resetCanvas();
            this.isCanvasDisabled = false;
            this.reloadFromJSON(data.response);*/
          } else {
            //error code handling using dialog
            //check error code array ? display in dial : errorMessage as popup
            this.loaderService.hideLoader();
          }
          this.saveComplete = false;
        }
      );
  }

  migrateProject(event: any) {
    if (event === 'ok') {
      let response: any;
      this.migrationStatusDialogue = false;
      this._restCallService
        .getRestCall('/api/project/migration/project')
        .subscribe(
          res => {
            response = res;
          },
          err => {
            console.log('error occur');
          },
          () => {}
        );

      this.msgService.sendMessage({
        path: 'home/codepipeline/task-ui',
        title: 'Task Details'
      });
      this.setLocalStorageData(true);
    } else this.migrationStatusDialogue = false;
  }

  setLocalStorageData(status: boolean) {
    this.ls.remove('platformInfo');
    let platformInfo = {
      desire3dversionid: this.ls.get('platformInfo').desire3dversionid,
      projectMigrated: status
    };
    this.ls.set('platformInfo', platformInfo);
  }



  //UI CREATED EVENT ADDED
  uiCreateDEvent(string: any) {
    window.postMessage(string, window.location.origin);
  }

  addInnerChild(wid: any, treeObj: any) {
    wid.children.forEach((innerChild: any) => {
      if (innerChild.instance.hasOwnProperty('children')) {
        let innTrObj = {
          text: innerChild.instance.componentId,
          children: []
        };
        this.addInnerChild(innerChild.instance, innTrObj);
        treeObj.children.push(innTrObj);
      } else {
        treeObj.children.push({
          text: innerChild.instance.componentId
        });
      }
    });
  }

  /* RESET CANVAS DATA*/

  resetCanvas() {
    this._eventHndl.viewRefs = [];
    this._eventHndl.invalidComponents.length = 0;
    this._eventHndl.isValidUI = true;
    this._eventHndl.isModelBinded = true;
    this.target.clear();
    this.propertyTarget.clear();
    this.behaviourTarget.clear();
    this.children = [];
    this.saveJSON = [];
    this._eventHndl.viewRefs = this.children;
    this._editorState.resetState();
    this.canvasUI = new CanvasUI();
    this.isCanvasDisabled = true;
    this.showModelBindingUI = false;
    this.disabledMapButton = true;
  }

  /* UNDO UI*/

  onUndo() {
    if (this._editorState.onUndoState()) {
      this.target.clear();
      this.propertyTarget.clear();
      this.behaviourTarget.clear();
      this.children = [];
      this._eventHndl.viewRefs = [];
      const saveData = this._editorState.present;
      saveData.forEach((widget: any) => {
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(
          WidgetMap.COMPONENT_CLASS_MAP[widget.name]
        );
        const componentInstance = this.target.createComponent(componentFactory);
        componentInstance.instance.name = widget.name;
        if (componentInstance.instance.hasOwnProperty('editMode')) {
          componentInstance.instance.editMode = true;
        }
        componentInstance.instance.properties = widget.properties;
        componentInstance.instance.dataSource = widget.dataSource;
        componentInstance.changeDetectorRef.detectChanges();
        this.children.push(componentInstance);

        /* code for spl component open */

        if (WidgetMap.SPL_COMPONENTS[componentInstance.instance.name]) {
          componentInstance.instance.createLocalData();
        }

        /* End of code for spl component relocation */

        this.repaintWidgets(componentInstance, widget);
      });
    } else {
      this._editorState.present = null;
    }
    this._eventHndl.viewRefs = this.children;
  }

  /* REDO UI*/

  onRedo() {
    if (this._editorState.onRedoState()) {
      this.target.clear();
      this.propertyTarget.clear();
      this.behaviourTarget.clear();
      this.modelTarget.clear();
      this.children = [];
      const saveData = this._editorState.present;
      saveData.forEach((widget: any) => {
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(
          WidgetMap.COMPONENT_CLASS_MAP[widget.name]
        );
        const componentInstance = this.target.createComponent(componentFactory);
        if (componentInstance.instance.hasOwnProperty('editMode')) {
          componentInstance.instance.editMode = true;
        }
        componentInstance.instance.name = widget.name;
        componentInstance.instance.properties = widget.properties;
        componentInstance.instance.dataSource = widget.dataSource;
        componentInstance.instance.parentComponentRef = this;
        componentInstance.changeDetectorRef.detectChanges();
        this.children.push(componentInstance);
        /* code for spl component open */

        if (WidgetMap.SPL_COMPONENTS[componentInstance.instance.name]) {
          componentInstance.instance.createLocalData();
        }

        /* End of code for spl component relocation */
        this.repaintWidgets(componentInstance, widget);
      });
    }
    this._eventHndl.viewRefs = this.children;
  }

  repaintWidgets(targetComponentRef: any, widget: any) {
    widget.child.forEach((compo: any) => {
      let componentData: any;
      let componentInstance: any;
      let cInstance: any;
      let componentFactory: any;

      if (widget.name === 'card') {
        componentData = this.createCardChildComponent(
          compo,
          targetComponentRef
        );
        cInstance = componentData.cInstance;
        componentInstance = componentData.componentInstance;
      } else if (widget.name === 'border') {
        componentData = this.createBorderChildComponents(
          compo,
          targetComponentRef
        );
        cInstance = componentData.cInstance;
        componentInstance = componentData.componentInstance;
      } else if (widget.name == 'datapoint') {
        componentData = this.createDataPointChildComponents(
          compo,
          targetComponentRef
        );
        cInstance = componentData.cInstance;
        componentInstance = componentData.componentInstance;
      } else {
        cInstance = targetComponentRef.instance;
        componentFactory = this._componentFactoryResolver.resolveComponentFactory(
          WidgetMap.COMPONENT_CLASS_MAP[compo.name]
        );
        componentInstance = cInstance.target.createComponent(componentFactory);
      }
      if (componentInstance.instance.hasOwnProperty('editMode')) {
        componentInstance.instance.editMode = true;
      }
      componentInstance.instance.name = compo.name;
      if (componentInstance.instance.hasOwnProperty('parentComponentRef')) {
        componentInstance.instance.parentComponentRef = cInstance;
      }
      componentInstance.instance.properties = compo.properties;
      componentInstance.instance.dataSource = compo.dataSource;
      componentInstance.instance.parentComponentRef =
        targetComponentRef.instance;
      componentInstance.changeDetectorRef.detectChanges();
      if (compo.child && compo.child.length > 0) {
        this.repaintWidgets(componentInstance, compo);
        if (compo && compo.name && compo.name == 'row') {
          componentInstance.instance.componentInitailized();
        }
      }
      cInstance.children.push(componentInstance);

      /* code for spl component open */

      if (WidgetMap.SPL_COMPONENTS[cInstance.name]) {
        cInstance.createLocalData();
      }

      /* End of code for spl component relocation */
    });
  }

  createCardChildComponent(compo: any, targetComponentRef: any): any {
    let componentData: any;
    let componentInstance: any;
    let cInstance: any;
    let componentFactory: any;
    if (compo.name === 'cardbody' || compo.name === 'formbody') {
      cInstance = targetComponentRef.instance;
      componentFactory = this._componentFactoryResolver.resolveComponentFactory(
        WidgetMap.COMPONENT_CLASS_MAP[compo.name]
      );
      componentInstance = cInstance.target.createComponent(componentFactory);
      return (componentData = {
        cInstance: cInstance,
        componentInstance: componentInstance
      });
    }
    if (compo.name === 'cardheader' || compo.name === 'formheader') {
      cInstance = targetComponentRef.instance;
      componentFactory = this._componentFactoryResolver.resolveComponentFactory(
        WidgetMap.COMPONENT_CLASS_MAP[compo.name]
      );
      componentInstance = cInstance.headerTarget.createComponent(
        componentFactory
      );
      return (componentData = {
        cInstance: cInstance,
        componentInstance: componentInstance
      });
    }
    if (compo.name === 'cardaction' || compo.name === 'formaction') {
      cInstance = targetComponentRef.instance;
      componentFactory = this._componentFactoryResolver.resolveComponentFactory(
        WidgetMap.COMPONENT_CLASS_MAP[compo.name]
      );
      componentInstance = cInstance.actionTarget.createComponent(
        componentFactory
      );
      return (componentData = {
        cInstance: cInstance,
        componentInstance: componentInstance
      });
    }
  }

  createBorderChildComponents(compo: any, targetComponentRef: any): any {
    let componentData: any;
    let componentInstance: any;
    let cInstance: any;
    let componentFactory: any;
    if (compo.name === 'borderNorth') {
      cInstance = targetComponentRef.instance;
      componentFactory = this._componentFactoryResolver.resolveComponentFactory(
        WidgetMap.COMPONENT_CLASS_MAP[compo.name]
      );
      componentInstance = cInstance.borderNorth.createComponent(
        componentFactory
      );
      return (componentData = {
        cInstance: cInstance,
        componentInstance: componentInstance
      });
    }
    if (compo.name === 'borderEast') {
      cInstance = targetComponentRef.instance;
      componentFactory = this._componentFactoryResolver.resolveComponentFactory(
        WidgetMap.COMPONENT_CLASS_MAP[compo.name]
      );
      componentInstance = cInstance.borderEast.createComponent(
        componentFactory
      );
      return (componentData = {
        cInstance: cInstance,
        componentInstance: componentInstance
      });
    }
    if (compo.name === 'borderCenter') {
      cInstance = targetComponentRef.instance;
      componentFactory = this._componentFactoryResolver.resolveComponentFactory(
        WidgetMap.COMPONENT_CLASS_MAP[compo.name]
      );
      componentInstance = cInstance.borderCenter.createComponent(
        componentFactory
      );
      return (componentData = {
        cInstance: cInstance,
        componentInstance: componentInstance
      });
    }
    if (compo.name === 'borderWest') {
      cInstance = targetComponentRef.instance;
      componentFactory = this._componentFactoryResolver.resolveComponentFactory(
        WidgetMap.COMPONENT_CLASS_MAP[compo.name]
      );
      componentInstance = cInstance.borderWest.createComponent(
        componentFactory
      );
      return (componentData = {
        cInstance: cInstance,
        componentInstance: componentInstance
      });
    }
    if (compo.name === 'borderSouth') {
      cInstance = targetComponentRef.instance;
      componentFactory = this._componentFactoryResolver.resolveComponentFactory(
        WidgetMap.COMPONENT_CLASS_MAP[compo.name]
      );
      componentInstance = cInstance.borderSouth.createComponent(
        componentFactory
      );
      return (componentData = {
        cInstance: cInstance,
        componentInstance: componentInstance
      });
    }
  }

  createDataPointChildComponents(compo: any, targetComponentRef: any): any {
    let componentData: any;
    let componentInstance: any;
    let cInstance: any;
    let componentFactory: any;
    if (compo.name === 'dataWest') {
      cInstance = targetComponentRef.instance;
      componentFactory = this._componentFactoryResolver.resolveComponentFactory(
        WidgetMap.COMPONENT_CLASS_MAP[compo.name]
      );
      componentInstance = cInstance.datawest.createComponent(componentFactory);
      return (componentData = {
        cInstance: cInstance,
        componentInstance: componentInstance
      });
    }
    if (compo.name === 'dataCenter') {
      cInstance = targetComponentRef.instance;
      componentFactory = this._componentFactoryResolver.resolveComponentFactory(
        WidgetMap.COMPONENT_CLASS_MAP[compo.name]
      );
      componentInstance = cInstance.datacenter.createComponent(
        componentFactory
      );
      return (componentData = {
        cInstance: cInstance,
        componentInstance: componentInstance
      });
    }
    if (compo.name === 'dataSouth') {
      cInstance = targetComponentRef.instance;
      componentFactory = this._componentFactoryResolver.resolveComponentFactory(
        WidgetMap.COMPONENT_CLASS_MAP[compo.name]
      );
      componentInstance = cInstance.datasouth.createComponent(componentFactory);
      return (componentData = {
        cInstance: cInstance,
        componentInstance: componentInstance
      });
    }
    if (compo.name === 'dataNorth') {
      cInstance = targetComponentRef.instance;
      componentFactory = this._componentFactoryResolver.resolveComponentFactory(
        WidgetMap.COMPONENT_CLASS_MAP[compo.name]
      );
      componentInstance = cInstance.datanorth.createComponent(componentFactory);
      return (componentData = {
        cInstance: cInstance,
        componentInstance: componentInstance
      });
    }
    if (compo.name === 'dataEast') {
      cInstance = targetComponentRef.instance;
      componentFactory = this._componentFactoryResolver.resolveComponentFactory(
        WidgetMap.COMPONENT_CLASS_MAP[compo.name]
      );
      componentInstance = cInstance.dataeast.createComponent(componentFactory);
      return (componentData = {
        cInstance: cInstance,
        componentInstance: componentInstance
      });
    }
  }

  toggleScreenSize() {
    this.toggleCanvasUI = false;
    this.canvasWindowSize == 'Fullscreen'
      ? (this.canvasWindowSize = 'Normal view')
      : (this.canvasWindowSize = 'Fullscreen');
    //  this.cdf.detectChanges();
    this.toggleCanvasUI = true;
    this.isFullscreen = !this.isFullscreen;

    this.isFullscreen ? (this.bodyHeight = 100) : (this.bodyHeight = 84);
    this.msgService.sendMessage({ fullscreen: this.isFullscreen });
  }

  // Create New UI
  createUI(createUIData: any) {
    this.showCreateUI = false;
    this.resetCanvas();
    this.isCanvasDisabled = false;
    this.canvasUI.name = createUIData.createModel.name;
    this.canvasUI.boundedcontextId = createUIData.createModel.boundedcontextId;
    this.canvasUI.boundedcontext = createUIData.createModel.boundedcontext;
    this.canvasUI.domain = createUIData.createModel.domain;
    this.canvasUI.domainId = createUIData.createModel.domainId;
    this.canvasUI.metadata.modelInfo.models.length = 0;
    this.canvasUI.metadata = createUIData.template;
    this.getModelData();
    this.reloadFromJSON(this.canvasUI);
  }

  /*'/api/dna/objects/findByBoundedContextId/' +
   this._sharedDataService.uiDetails.boundedcontextId*/
  /*'assets/dna/data/test.json'*/
  getModelData() {
    let response: any;
    this._restCallService
      .getRestCall(
          '/api/dna/objects/findByBoundedContextId/' +
          this._sharedDataService.uiDetails.boundedcontextId
      )
      .subscribe(
        res => {
          response = res;
        },
        err => {},
        () => {
          if (response.success) {
            this.getModelDataSuccess(response);
          }
        }
      );
  }

  getModelDataSuccess(data: any) {
    this.disabledMapButton = true;
    data.response.forEach((opt: any) => {
      if (
        this.canvasUI.metadata.modelInfo.models &&
        this.canvasUI.metadata.modelInfo.models.length > 0
      ) {
        this.canvasUI.metadata.modelInfo.models.forEach((childOpt: any) => {
          if (childOpt.hasOwnProperty('name') && opt.hasOwnProperty('name')) {
            if (childOpt.name === opt.name) {
              opt['checked'] = true;
              this.disabledMapButton = false;
            }
          } else {
            console.log('name field not found');
          }
        });
      }
    });
    this.modelsData = data.response;
    this.showModelBindingUI = true;
  }

  // Open Exiting UI
  openUI(openUIData: any) {
    this.showOpenUI = false;
    this.resetCanvas();
    this.isCanvasDisabled = false;
    this._sharedDataService.uiDetails = {};
    this._sharedDataService.uiDetails['boundedcontext'] =
      openUIData.boundedcontext;
    this._sharedDataService.uiDetails['domain'] = openUIData.domain;
    this._sharedDataService.uiDetails['boundedcontextId'] =
      openUIData.boundedcontextId;
    this._sharedDataService.uiDetails['domainId'] = openUIData.domainId;
    this._sharedDataService.uiDetails['name'] = openUIData.name;
    this.getModelData();
    this.reloadFromJSON(openUIData);
  }
  // Reload UI using Json
  reloadFromJSON(jsonData: any) {
    this.showModelBindingUI = true;
    this._eventHndl.viewRefs = [];
    this.children = [];
    this.canvasUI = jsonData;
    if (!this.canvasUI.metadata.hasOwnProperty('modelInfo')) {
      this.canvasUI.metadata['modelInfo'] = {};
      this.canvasUI.metadata.modelInfo['models'] = [];
    }

    // ONLY USE FOR OLD UI
    if (this.canvasUI.metadata.child[0].name != 'rootpane') {
      let createObj: any = {
        name: 'rootpane',
        id: '93291_rootpane',
        child: [],
        properties: {
          isComponentValid: true
        },
        eventRelationship: {
          eventDefination: []
        }
      };
      createObj.child.push(this.canvasUI.metadata.child[0]);
      this.canvasUI.metadata.child[0] = createObj;
    }

    this.canvasUI.metadata.child.forEach((widget: any) => {
      const componentFactory = this._componentFactoryResolver.resolveComponentFactory(
        WidgetMap.COMPONENT_CLASS_MAP[widget.name]
      );
      const componentInstance = this.target.createComponent(componentFactory);
      componentInstance.instance.name = widget.name;

      /* CODE FOR OLD UI JSON*/

      /*  if (!widget.hasOwnProperty('componentBehaviour')) {
        let returnObj = this.setComponentBehaviourObject(widget);
        if (returnObj != null) {
          componentInstance.instance.componentBehaviour = returnObj;
        }
      } else {
        componentInstance.instance.componentBehaviour =
          widget.componentBehaviour;
      }*/

      if (componentInstance.instance.hasOwnProperty('editMode')) {
        componentInstance.instance.editMode = true;
      }
      if (componentInstance.instance.hasOwnProperty('parentComponentRef')) {
        componentInstance.instance.parentComponentRef = this.target.instance;
      }
      componentInstance.instance.properties = widget.properties;

      if (
        !componentInstance.instance.properties.hasOwnProperty('model') &&
        componentInstance.instance.isComponent
      ) {
        if (
          !RelationshipBlockMap.Component_Restrict[
            componentInstance.instance.name
          ]
        ) {
          componentInstance.instance.properties['model'] = new ModelClass();
        }
      }
      if (widget.hasOwnProperty('dataSource')) {
        componentInstance.instance.dataSource = widget.dataSource;
      }
      if (widget.hasOwnProperty('eventRelationship')) {
        componentInstance.instance.eventRelationship = widget.eventRelationship;
      }
      componentInstance.changeDetectorRef.detectChanges();
      componentInstance.instance.parentComponentRef = this;
      this.children.push(componentInstance);
      this._eventHndl.currentWidgetRef = componentInstance.instance;
      /* code for spl component open */

      /* End of code for spl component relocation */
      if (widget.child.length > 0) {
        this.repaintWidgetsInOpen(componentInstance, widget);
      }
      if (WidgetMap.SPL_COMPONENTS[componentInstance.instance.name]) {
        componentInstance.instance.createLocalData();
      }
    });

    this._eventHndl.viewRefs = this.children;
    this._eventHndl.addEditorNewState();
    this.loadDefaultComponent();
  }

  /* MENU MAP CONFORMATION*/
  menuBuilderConfirmation(event: any) {
    if (event === 'ok') {
      let response: any;
      this.showMenuBuliderDialogue = false;
      this.msgService.sendMessage({
        path: 'home/designPipeline/menu-builder',
        title: 'Menu Builder'
      });
    } else this.showMenuBuliderDialogue = false;
  }

  /* APP PREVIEW */
  onAppPreviewClick() {
    this.msgService.sendMessage({
      path: 'home/designPipeline/preview',
      title: 'App Preview'
    });
  }

  /* FOR LOCAL TESTING ONLY*/

  localOpenUiTestFunction() {
    const lsData: any = localStorage.getItem('data');
    if (lsData != null && lsData != '') {
      const saveData: any = JSON.parse(lsData);
      if (saveData != null) {
        this.canvasUI.name = saveData.name;
        this.resetCanvas();
        this.isCanvasDisabled = false;
        this._sharedDataService.uiDetails = {};
        this._sharedDataService.uiDetails['boundedcontext'] =
          saveData.boundedcontext;
        this._sharedDataService.uiDetails['domain'] = saveData.domain;
        this._sharedDataService.uiDetails['boundedcontextId'] =
          saveData.boundedcontextId;
        this._sharedDataService.uiDetails['domainId'] = saveData.domainId;
        this._sharedDataService.uiDetails['name'] = saveData.name;
        this.getModelData();
        this.showModelBindingUI = true;
        this.reloadFromJSON(saveData);
      }
    }
  }



}

export class SaveJSON {
  name = '';
  id = '';
  child: any[] = [];
  properties: any;
  dataSource: any;
  eventRelationship: any;
  isComponent?: boolean;
  componentBehaviour: any;
}

export class CanvasPage {
  name: any;
  child: any[] = [];
  properties: any = {};
  dataSource: any = {};
  eventRelationship = {};
  modelInfo = {};
  constructor() {
    this.name = 'canvaspage';
    this.modelInfo['models'] = [];
  }
}

export class CanvasUI {
  id = null;
  name: any = '';
  boundedcontextId: string;
  boundedcontext = '';
  domain = '';
  domainId: string;
  metadata: any;
  designComplete = true;

  constructor() {
    this.metadata = new CanvasPage();
  }
}
