import { HiddenProperties } from './buttonfloat.canvas.component';
/**
 * Created by sagar on 20/3/18.
 */
import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'button-float-property',
  template: `    
            <ng-container *ngIf="componentInstance">

          <amexio-text-input field-label="Name" [(ngModel)]="componentInstance.properties.name"
                             (onBlur)="propertyValidation()"
                             name="componentInstance.properties.name"
                             place-holder="enter name">
          </amexio-text-input>

          <amexio-dropdown [(ngModel)]="componentInstance.properties.blockName"
          [place-holder]="'Block'"
          [field-label]="'Button Block'"
          [data]="btnBlockData"
          (onSingleSelect)="onBlockClick($event)"
          [display-field]="'type'"
          [value-field]="'value'">
          </amexio-dropdown>

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
          
          <amexio-radio-group
           [field-label]="'Position'"
           [name]="'position'"
            [display-field]="'type'"
            [value-field]="'value'"
            [horizontal]="true"
            [data]="relAbsPositionData"
            [default-value]="'relative'"
            (onSelection)="positionClick($event)">
          </amexio-radio-group>

              <amexio-button [block]="true" label="Attach Icon" size="medium" type="theme-color" (onClick)="onIconOpenWindow()"></amexio-button>
             
         
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
    <amexio-number-input field-label="Position Top" [(ngModel)]="componentInstance.properties.positionTop"
    name="componentInstance.properties.positionTop"
    place-holder="Position Top"
    [min-value]="0"
    [error-msg] ="'Please enter position height'"
    [min-error-msg]="'position height can not be less than 1'"
    [max-error-msg]="'position height can not be greater than 100'"
    [enable-popover]="true"
    [max-value]="100"
    (ngModelChange)="onTopPositionNumberClick($event)"
    >
    </amexio-number-input>
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
    <amexio-number-input  field-label="Position Left" 
    [(ngModel)]="componentInstance.properties.positionLeft"
    name="componentInstance.properties.positionLeft"
    place-holder="Position Left"
    [min-value]="0"
    [error-msg] ="'Please enter position width'"
    [min-error-msg]="'position width can not be less than 1'"
    [max-error-msg]="'position width can not be greater than 100'"
    [enable-popover]="true"
    [max-value]="100"
    (ngModelChange)="onLeftPositionNumberClick($event)"
    >
    </amexio-number-input>
    
    </ng-container>
            <amexio-checkbox [field-label]="'Disabled'"
                             [(ngModel)]="componentInstance.properties.disabled">
            </amexio-checkbox>
    </ng-container>
          </ng-container>
        
 
     <!-- <amexio-tab [icon]="componentInstance._eventHndl._sharedDataService.behaviourIcon">
        <ng-container *ngIf="componentInstance">
          <show-event-list [componentInstance]="componentInstance"></show-event-list>
        </ng-container>
      </amexio-tab>
    -->

    <ng-container *ngIf="iconWindow">
      <canvas-icon-search [selectedIcon]="componentInstance.properties.iconClass" [componentInstance]="componentInstance" [iconWindow]="iconWindow" (getSelectedIcon)="getSelectedIcon($event)"></canvas-icon-search>
    </ng-container>
  `
})
export class ButtonFloatPropertyComponent implements OnInit {
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
  iconWindow: boolean;
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
      }
      // ,
      // {
      //   type: 'Center',
      //   value: 'center'
      // },
      // {
      //   type: 'Bottom',
      //   value: 'bottom'
      // }
    ];
    this.horiPositionData = [
      {
        type: 'Left',
        value: 'left'
      }
      // ,
      // {
      //   type: 'Center',
      //   value: 'center'
      // },
      // {
      //   type: 'Right',
      //   value: 'right'
      // }
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
      this.componentInstance.hiddenProperties.positionLeft = '0%';
    } else if (event.value == 'absolute') {
      this.componentInstance.properties.relative = false;
      this.showPositionField = true;
      let documents = document.getElementById('canvasLeftSideColumn');
      if (documents) {
        let defaultWidth: number = 5;
        let width: number = 0;
        let actualWidth: number = 0;
        actualWidth = window.innerWidth % documents.offsetWidth + defaultWidth;
        this.componentInstance.properties.positionLeft = actualWidth + '%';
        this.componentInstance.hiddenProperties.positionLeft = '23%';
        this.componentInstance.hiddenProperties.positionTop = '16%';
      }
    }
  }

  onLeftPositionNumberClick(event: any) {
    if (
      !(
        this.componentInstance.hiddenProperties.positionLeft.substring(
          0,
          this.componentInstance.hiddenProperties.positionLeft.length - 1
        ) > 100
      )
    ) {
      this.componentInstance.hiddenProperties.positionLeft =
        22 + this.componentInstance.properties.positionLeft / 2 + '%';
    }
  }

  onTopPositionNumberClick(event: any) {
    if (
      !(
        this.componentInstance.hiddenProperties.positionTop.substring(
          0,
          this.componentInstance.hiddenProperties.positionTop.length - 1
        ) > 100
      )
    ) {
      this.componentInstance.hiddenProperties.positionTop =
        17 + this.componentInstance.properties.positionTop / 2 + '%';
    }
  }
  ngOnInit() {}

  propertyValidation() {
    this.componentInstance._eventHndl.componentValidation(
      this.componentInstance
    );
  }

  onIconOpenWindow() {
    this.iconWindow = !this.iconWindow;
  }
  getSelectedIcon(icon: any) {
    this.componentInstance.properties.iconClass = icon;
    this.onIconOpenWindow();
  }
}
