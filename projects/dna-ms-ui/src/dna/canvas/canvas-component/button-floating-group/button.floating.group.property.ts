/**
 * Created by sagar on 20/3/18.
 */
import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'button-group-float-property',
  template: `
            <ng-container *ngIf="componentInstance">

              <amexio-text-input field-label="Name" [(ngModel)]="componentInstance.properties.name"
                                 (onBlur)="propertyValidation()"
                                 name="componentInstance.properties.name"
                                 place-holder="enter name">
              </amexio-text-input>

              <!-- Block Property missing from AMEXIO -->
            <!--  <amexio-dropdown [(ngModel)]="componentInstance.properties.blockName"
                               [place-holder]="'Block'"
                               [field-label]="'Button Block'"
                               [data]="btnBlockData"
                               (onSingleSelect)="onBlockClick($event)"
                               [display-field]="'type'"
                               [value-field]="'value'">
              </amexio-dropdown>-->

              <ng-container *ngIf="squareBtn">
                <amexio-text-input field-label="Label" [(ngModel)]="componentInstance.properties.label"
                                   name="componentInstance.properties.label"
                                   place-holder="enter label">
                </amexio-text-input>
              </ng-container>

              <amexio-dropdown [(ngModel)]="componentInstance.properties.type"
                               [place-holder]="'Type'"
                               [field-label]="'Button Type'"
                               [data]="typeData"
                               [display-field]="'type'"
                               [value-field]="'value'">
              </amexio-dropdown>
              <amexio-text-input field-label="Icon" [(ngModel)]="componentInstance.properties.iconClass"
                                 name="componentInstance.properties.iconClass"
                                 place-holder="icon">
              </amexio-text-input>

              <amexio-radio-group
                [field-label]="'Position'"
                [(ngModel)]="componentInstance.properties.relative"
                name="componentInstance.properties.relative"
                [display-field]="'type'"
                [value-field]="'value'"
                [horizontal]="true"
                [data]="relAbsPositionData"
                [default-value]="'relative'"
                (onSelection)="positionClick($event)">
              </amexio-radio-group>


              <ng-container *ngIf="showPositionField">


                <amexio-dropdown [(ngModel)]="componentInstance.properties.verticalPosition"
                                 [place-holder]="'Vertical Position'"
                                 [field-label]="'Vertical Position'"
                                 [data]="positionData"
                                 (onSingleSelect)="onVerticalPosition($event)"
                                 [display-field]="'type'"
                                 [value-field]="'value'">
                </amexio-dropdown>

                <ng-container *ngIf="enableVerticalPTop">
                  <amexio-text-input field-label="Position Top" [(ngModel)]="componentInstance.properties.positionTop"
                                     name="componentInstance.properties.positionTop"
                                     place-holder="Position Top">
                  </amexio-text-input>
                </ng-container>
                <ng-container *ngIf="enableVerticalPBottom">
                  <amexio-text-input field-label="Position Bottom" [(ngModel)]="componentInstance.properties.positionBottom"
                                     name="componentInstance.properties.positionBottom"
                                     place-holder="Position Bottom">
                  </amexio-text-input>
                </ng-container>

                <amexio-dropdown [(ngModel)]="componentInstance.properties.horizontalPosition"
                                 [place-holder]="'Horizontal Position'"
                                 [field-label]="'Horizontal Position'"
                                 [data]="horiPositionData"
                                 (onSingleSelect)="onHorizontalPosition($event)"
                                 [display-field]="'type'"
                                 [value-field]="'value'">
                </amexio-dropdown>
                <ng-container *ngIf="enableHorizontalPRight">
                  <amexio-text-input field-label="Position Right" [(ngModel)]="componentInstance.properties.positionRight"
                                     name="componentInstance.properties.positionRight"
                                     place-holder="Position Right">
                  </amexio-text-input>
                </ng-container>
                <ng-container *ngIf="enableHorizontalPLeft">
                  <amexio-text-input field-label="Position Left" [(ngModel)]="componentInstance.properties.positionLeft"
                                     name="componentInstance.properties.positionLeft"
                                     place-holder="Position Left">
                  </amexio-text-input>
                </ng-container>
                <amexio-checkbox [field-label]="'Disabled'"
                                 [(ngModel)]="componentInstance.properties.disabled">
                </amexio-checkbox>
              </ng-container>
            </ng-container>
        
    <!--  <amexio-tab [icon]="componentInstance._eventHndl._sharedDataService.behaviourIcon">
        <ng-container *ngIf="componentInstance">
          <show-event-list [componentInstance]="componentInstance"></show-event-list>
        </ng-container>
      </amexio-tab>-->
  `
})
export class ButtonFloatGroupPropertyComponent implements OnInit {
  componentInstance: any;
  typeData: any;
  btnBlockData: any;
  positionData: any;
  horiPositionData: any;
  squareBtn: boolean = false;
  relAbsPositionData: any;
  showPositionField: boolean;

  enableVerticalPBottom: boolean;
  enableVerticalPTop: boolean = true;

  enableHorizontalPLeft: boolean = true;
  enableHorizontalPRight: boolean;
  constructor() {
    this.relAbsPositionData = [
      {
        type: 'Absolute',
        value: 'absolute'
      },
      {
        type: 'Relative',
        value: 'relative'
      }
    ];
    this.typeData = [
      {
        type: 'Green',
        value: 'green'
      },
      {
        type: 'Red',
        value: 'red'
      },
      {
        type: 'Yellow',
        value: 'yellow'
      },
      {
        type: 'Theme color',
        value: 'theme-color'
      }
    ];
    this.btnBlockData = [
      {
        type: 'Circle',
        value: 'circle'
      },
      {
        type: 'Square',
        value: 'square'
      }
    ];
    this.positionData = [
      {
        type: 'Top',
        value: 'top'
      },
      {
        type: 'Center',
        value: 'center'
      },
      {
        type: 'Bottom',
        value: 'bottom'
      }
    ];
    this.horiPositionData = [
      {
        type: 'Left',
        value: 'left'
      },
      {
        type: 'Center',
        value: 'center'
      },
      {
        type: 'Right',
        value: 'right'
      }
    ];
  }

  // THIS METHOD IS USED FOR SET BUTTON STYLE CIRCLE/SQUARE
  onBlockClick(data: any) {
    if (data.value == 'square') {
      this.squareBtn = true;
    } else {
      this.squareBtn = false;
      this.componentInstance.properties.label = '';
    }
  }
  //THIS METHOD IS USED FOR SELECT VERTICAL POSITION
  onVerticalPosition(data: any) {
    if (data.value == 'bottom') {
      this.enableVerticalPBottom = true;
      this.enableVerticalPTop = false;
    } else if (data.value == 'top') {
      this.enableVerticalPTop = true;
      this.enableVerticalPBottom = false;
    }
  }
  //THIS METHOD IS USED FOR SELECT HORIZONTAL POSITION
  onHorizontalPosition(data: any) {
    if (data.value == 'left') {
      this.enableHorizontalPLeft = true;
      this.enableHorizontalPRight = false;
    } else if (data.value == 'right') {
      this.enableHorizontalPRight = true;
      this.enableHorizontalPLeft = false;
    }
  }
  //THIS METHOD USED FOR POSITION
  positionClick(event: any) {
    if (event.value == 'relative') {
      this.showPositionField = false;
      this.componentInstance.properties.relative = true;
    } else if (event.value == 'absolute') {
      this.showPositionField = true;
      this.componentInstance.properties.relative = false;
      let documents = document.getElementById('canvasLeftSideColumn');
      if (documents) {
        let defaultWidth: number = 5;
        let width: number = 0;
        let actualWidth: number = 0;
        actualWidth = window.innerWidth % documents.offsetWidth + defaultWidth;
        this.componentInstance.properties.positionLeft = actualWidth + '%';
      }
    }
  }
  ngOnInit() {}

  propertyValidation() {
    this.componentInstance._eventHndl.componentValidation(
      this.componentInstance
    );
  }
}
