import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'icon-property',
  template: `
    
  <ng-container *ngIf="componentInstance">

              <amexio-text-input field-label="Name" [(ngModel)]="componentInstance.properties.name"
                                 name="componentInstance.properties.name"
                                 place-holder="enter name"
                                 icon-feedback="true"
                                 (onBlur)="propertyValidation()">
              </amexio-text-input>
              <br>
              <amexio-button [block]="true" label="Search Icon" size="medium" type="primary" (onClick)="onIconOpenWindow()"></amexio-button>
            </ng-container>
        
      <!--<amexio-tab [icon]="componentInstance._eventHndl._sharedDataService.behaviourIcon">
        <ng-container *ngIf="componentInstance">
          <show-event-list [componentInstance]="componentInstance"></show-event-list>
        </ng-container>
      </amexio-tab>-->
   


    <amexio-window [show-window]="iconWindow"
                   type="window" [closable]="true" [footer]="true" (close)="closeIconWindow()">
      <amexio-header>
        Icons
      </amexio-header>
      <amexio-body>
        <amexio-row>
          <amexio-column [size]="12">
            <amexio-card >
              <amexio-body>
                <amexio-row>
                  <amexio-column size="12">
                    <amexio-radio-group 
                                        name ="icon"
                                        [display-field]="'name'"
                                        [value-field]="'id'"
                                        [horizontal]="true"
                                        [data]="iconRadioGroupData"
                                        [default-value]="iconId"
                                        (onSelection)="selectRadio($event)">
                    </amexio-radio-group>
                  </amexio-column>
                </amexio-row>
              </amexio-body>
            </amexio-card>
          </amexio-column>
        </amexio-row>
        <amexio-row>
          <amexio-column [size]="12">
            <amexio-card  [header]="false"
                          [footer]="true"
                          [footer-align]="'left'"[body-height]="45">
              <amexio-body>
                <amexio-row>
                  <amexio-column size="1" *ngFor="let iconObject of iconList" >
                    <div class="select-icon">
                      <ng-container *ngIf="iconId == '1'">
                        <amexio-image (onClick)="iconSelect(iconObject.iconName)"
                          [icon-class]="iconObject.iconName">
                        </amexio-image>
                      </ng-container>
                      <ng-container *ngIf="iconId == '2'">
                        <amexio-image
                          [icon-class]="'material-icons'"
                          (onClick)="iconSelect(iconObject.iconName)"
                          [mda]="iconObject.iconName">
                        </amexio-image>
                     
                      </ng-container>
                      
                    </div>
                  </amexio-column>
                </amexio-row>
              </amexio-body>
              <amexio-action>
                <amexio-text-input [has-label]="false" [(ngModel)]="selectedIcon"
                                   place-holder="icon">
                </amexio-text-input>
              </amexio-action>
            </amexio-card>
          </amexio-column>
        </amexio-row>

      </amexio-body>
      <amexio-action>
        <amexio-button [label]="'Cancel'" [type]="'secondary'" (onClick)="closeIconWindow();"></amexio-button>
        <amexio-button [label]="'Save'" [type]="'primary'" (onClick)="onIconSave();"></amexio-button>

      </amexio-action>
    </amexio-window>


  `
})
export class IconPropertyComponent implements OnInit {
  componentInstance: any;
  iconRadioGroupData: any;
  isFontIcon: boolean;
  iconWindow: boolean;
  iconId: any;
  iconList: any;
  selectedIcon: any;
  constructor(private _httpClient: HttpClient) {
    this.iconId = '1';
    this.isFontIcon = true;
    this.iconRadioGroupData = [
      {
        id: '1',
        name: 'Font Awesome'
      },
      {
        id: '2',
        name: 'Material Icon'
      }
    ];
  }

  //ON RADIO CLICK
  onRadioCheck(data: any) {
    this.iconId = data.id;
    if (data.id == '1') {
      this.isFontIcon = true;
      this.componentInstance.properties.mda = '';
      this.componentInstance.properties.iconClass = 'fa fa-user';
    } else {
      this.isFontIcon = false;
      this.componentInstance.properties.mda = 'cloud';
      this.componentInstance.properties.iconClass = 'material-icons';
    }
  }
  propertyValidation() {
    this.componentInstance._eventHndl.componentValidation(
      this.componentInstance
    );
  }

  ngOnInit() {}

  onIconOpenWindow() {
    this.iconWindow = !this.iconWindow;
    this.getIconData();
  }
  selectRadio(event: any) {
    this.iconId = event.id;
    this.getIconData();
  }

  getIconData() {
    let responseData: any;
    if (this.iconId == '1') {
      this._httpClient.get('assets/dna/icon/faicon.json').subscribe(
        response => {
          responseData = response;
        },
        err => {},
        () => {
          this.iconList = responseData.data;
        }
      );
    } else {
      this._httpClient.get('assets/dna/icon/materialicon.json').subscribe(
        response => {
          responseData = response;
        },
        err => {},
        () => {
          this.iconList = responseData.data;
        }
      );
    }
  }

  iconSelect(iconName: any) {
    this.selectedIcon = iconName;
  }

  closeIconWindow() {
    this.iconWindow = false;
  }

  onIconSave() {
    if (this.iconId == '1') {
      this.componentInstance.properties.iconClass = '';
      this.componentInstance.properties.mda = '';
      this.componentInstance.properties.iconClass = this.selectedIcon;
    } else {
      this.componentInstance.properties.iconClass = 'material-icons';
      this.componentInstance.properties.mda = '';
      this.componentInstance.properties.mda = this.selectedIcon;
    }
    this.closeIconWindow();
  }
}
