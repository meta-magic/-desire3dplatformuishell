import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RestCallService } from '../../canvas-service/restcall.service';
import { NotificationService } from '../../canvas-service/notification.service';
import { SharedDataService } from '../../canvas-service/shared-data.service';
/**
 * Created by dattaram on 21/6/18.
 */
@Component({
  selector: 'create-ui',
  template: `

    <amexio-window [vertical-position]="'center'" [horizontal-position]="'center'" [show]="show" (showChange)="closeWindow()" footer-align="right"
                   type="window" [footer]="true" [closable]="true">
      <amexio-header>
        <i class="fa fa-file-code-o"></i> New Component
      </amexio-header>
      <amexio-body>
        <amexio-row>
          <amexio-column [size]="4">
            <amexio-dropdown [(ngModel)]="createUIModel.boundedcontextId"
                             [place-holder]="'Choose Bounded Context'"
                             [field-label]="' Bounded Context'"
                             [display-field]="'name'"
                             [value-field]="'id'"
                             [data]="bcLocalData"
                             [readonly]="true"
                             (onSingleSelect)="selectBoundedContext($event)">
            </amexio-dropdown>
          </amexio-column>
          <amexio-column [size]="4">
            <amexio-dropdown [(ngModel)]="createUIModel.domainId"
                             [place-holder]="'Choose Module'"
                             [field-label]="'Module'"
                             [display-field]="'name'"
                             [value-field]="'id'"
                             [data]="domainData"
                             [readonly]="true"
                             (onSingleSelect)="selectDomain($event)">
            </amexio-dropdown>
          </amexio-column>
          <amexio-column [size]="4">
            <amexio-text-input [field-label]="'UI Name'"
                               [(ngModel)]="createUIModel.name"
                               [place-holder]="'Enter Name'"
                               [icon-feedback]="true">
            </amexio-text-input>
          </amexio-column>
        </amexio-row>
        <amexio-row>
          <amexio-column size="12">
            <amexio-card [header]="true"
                         [footer]="false"
                         [header-align]="'center'">
              <amexio-header>
                Templates
              </amexio-header>
              <amexio-body>
                <amexio-row>
                  <amexio-column [size]="'2'" *ngFor="let template of templateOptions">
                    <amexio-card [header]="false"
                                 [footer]="true"
                                 [footer-align]="'center'">
                      <amexio-body>
                        <div style="cursor: pointer" [ngClass]="{'template-content-highlight' : template.selected}">
                          <amexio-image (onClick)="onTemplateClick(template)" [path]="'assets/dna/template/images/blank.jpg'">
                          </amexio-image>
                        </div>
                      </amexio-body>
                      <amexio-action >
                        <amexio-label>
                          {{template.name}}
                        </amexio-label>
                      </amexio-action>
                    </amexio-card>

                  </amexio-column>
                </amexio-row>

              </amexio-body>
            </amexio-card>
          </amexio-column>
        </amexio-row>
      </amexio-body>
      <amexio-action>
        <amexio-button [label]="'Cancel'" (onClick)="closeWindow()">
        </amexio-button>
        <amexio-button type="primary" [label]="'Create'" (onClick)="createUI()">
        </amexio-button>
      </amexio-action>
    </amexio-window>

  `,
  styles: [
    `.template-content-highlight{
        outline: none;
        z-index: 0.3;
        border: 1px solid #68ACCE;
      }`
  ]
})
export class CreateUIComponent implements OnInit {
  @Input() show: boolean;
  createUIModel: CreateUIModel;
  domainData: any;
  templateOptions: any[] = [];
  bcLocalData: any;
  selectedTemplate: any;
  @Output() showChange: EventEmitter<any> = new EventEmitter();
  @Output() onCreateClick: EventEmitter<any> = new EventEmitter();
  constructor(
    public _restCallService: RestCallService,
    private _notificationService: NotificationService,
    private _sharedDataService: SharedDataService
  ) {
    this.createUIModel = new CreateUIModel();
  }
  ngOnInit() {
    let bcResponse: any;
    this._restCallService
      .getRestCall('assets/dna/template/templates_menu.json')
      .subscribe(resp => {
        this.templateOptions = resp;
        this.selectedTemplate = this.templateOptions.find(
          temp => temp.key == 'blank'
        );
      });

    this._restCallService.getRestCall('/api/dna/bcontext/findAll').subscribe(
      bcResp => {
        bcResponse = bcResp;
      },
      error => console.warn(error),
      () => {
        this.bcLocalData = bcResponse.response;
        this.createUIModel.boundedcontextId = this.bcLocalData[0].id;
        this.selectBoundedContext(this.bcLocalData[0]);
      }
    );
  }

  closeWindow() {
    this.show = false;
    this.showChange.emit(this.show);
  }

  selectBoundedContext(boundedC: any) {
    this.createUIModel.boundedcontext = boundedC.hiddenName;
    let response: any;
    const requestJson = {
      id: boundedC.id
    };
    this._restCallService
      .postRestCall('/api/dna/domain/findByBContextId', requestJson)
      .subscribe(
        res => {
          response = res;
        },
        error => console.warn(error),
        () => {
          this.domainData = response.response;
          this.createUIModel.domainId = this.domainData[0].id;
          this.createUIModel.domain = this.domainData[0].hiddenName;
        }
      );
  }

  selectDomain(domain: any) {
    this.createUIModel.domainId = domain.id;
    this.createUIModel.domain = domain.hiddenName;
  }

  onTemplateClick(template: any) {
    if (this.templateOptions != null) {
      this.templateOptions.forEach((item: any) => {
        item.selected = false;
      });
      template.selected = true;
    }
    this.selectedTemplate = template;
  }

  createUI() {
    /*  this.createUIModel.boundedcontextId = 'sdfsdfsdf';
    this.createUIModel.domainId = 'sfwefwev';*/
    let errorMsg = [];
    if (this.createUIModel.name == '') {
      errorMsg.push('UI name is mandatory.');
    }
    if (this.createUIModel.boundedcontextId == '') {
      errorMsg.push('Bounded context is mandatory.');
    }
    if (this.createUIModel.domainId == '') {
      errorMsg.push('Domain is mandatory.');
    }
    if (errorMsg.length > 0) {
      this._notificationService.setCustomDialogueData(true, errorMsg, 'Error');
    } else {
      this.createTemplateData();
    }
  }

  createTemplateData() {
    if (this.selectedTemplate) {
      let templateToLoad: any;
      this._restCallService
        .getRestCall(
          'assets/dna/template/' + this.selectedTemplate.key + '.json'
        )
        .subscribe(
          response => (templateToLoad = response),
          error => console.warn('Invalid template File Name'),
          () => {
            this._sharedDataService.uiDetails = this.createUIModel;
            this.onCreateClick.emit({
              createModel: this.createUIModel,
              template: templateToLoad.metadata
            });
          }
        );
    }
  }
}

export class CreateUIModel {
  boundedcontextId: any;
  boundedcontext: any;
  domain: any;
  domainId: any;
  name: any;
  constructor() {
    this.boundedcontextId = '';
    this.boundedcontext = '';
    this.domain = '';
    this.domainId = '';
    this.name = '';
  }
}
