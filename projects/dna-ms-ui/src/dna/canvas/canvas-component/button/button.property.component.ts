/**
 * Created by pratik on 27/2/18.
 */
import { Component, OnInit } from '@angular/core';
import { EventModel } from '../../event-relationship/models/event.basemodel';

@Component({
  selector: 'button-property',
  template: `    
      <ng-container *ngIf="componentInstance">
      
      <amexio-text-input field-label="Name" [(ngModel)]="componentInstance.properties.name"
                         (onBlur)="propertyValidation()"
                         name="componentInstance.properties.name"
                         place-holder="enter name">
      </amexio-text-input>
      
      
      <amexio-text-input field-label="Label" (ngModelChange)="onLabelChange($event) "[ngModel]="componentInstance.properties.label"
                         name="componentInstance.properties.label" (onBlur)="setFieldLabel()"
                         place-holder="enter label">
      </amexio-text-input>
      
      <amexio-text-input field-label="Tooltip" [(ngModel)]="componentInstance.properties.tooltip"
      name="componentInstance.properties.tooltip"
      place-holder="tooltip">
      </amexio-text-input>
      
      <amexio-checkbox [field-label]="'Disabled'"
                       [(ngModel)]="componentInstance.properties.disabled">
      </amexio-checkbox>
      
      <amexio-dropdown [(ngModel)]="componentInstance.properties.type"
                       [place-holder]="'Type'"
                       [field-label]="'Button Type'"
                       [data]="typeData"
                       [display-field]="'type'"
                       [value-field]="'value'">
      </amexio-dropdown>  
      
      <amexio-dropdown [(ngModel)]="componentInstance.properties.size"
                       [place-holder]="'Size'"
                       [field-label]="'Button Size'"
                       [data]="sizeData"
                       [display-field]="'type'"
                       [value-field]="'value'">
      </amexio-dropdown><br>
      
        <amexio-button [block]="true" label="Attach Icon" size="medium" type="green" (onClick)="onIconOpenWindow()"></amexio-button>
      
      </ng-container>
      <ng-container *ngIf="iconWindow">
         <canvas-icon-search [selectedIcon]="componentInstance.properties.iconClass" [componentInstance]="componentInstance" [iconWindow]="iconWindow" (getSelectedIcon)="getSelectedIcon($event)"></canvas-icon-search>
      </ng-container>
  `
})
export class ButtonPropertyComponent implements OnInit {
  componentInstance: any;
  typeData: any;
  sizeData: any;
  iconWindow: boolean;
  constructor() {
    this.typeData = [
      {
        type: 'Default',
        value: 'default'
      },
      {
        type: 'Theme-Color',
        value: 'theme-color'
      },
      {
        type: 'Theme-Backgroundcolor',
        value: 'theme-backgroundcolor'
      },
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
      }
    ];
    this.sizeData = [
      {
        type: 'Default',
        value: 'default'
      },
      {
        type: 'Large',
        value: 'large'
      },
      {
        type: 'Small',
        value: 'small'
      },
      {
        type: 'XSmall',
        value: 'xsmall'
      }
    ];
  }

  ngOnInit() {}

  propertyValidation() {
    this.componentInstance._eventHndl.componentValidation(
      this.componentInstance
    );
  }

  setFieldLabel() {
    this.componentInstance.properties.fieldLabel = this.componentInstance.properties.label;
  }

  onIconOpenWindow() {
    this.iconWindow = !this.iconWindow;
  }
  getSelectedIcon(icon: any) {
    this.componentInstance.properties.iconClass = icon;
    this.onIconOpenWindow();
  }
  onLabelChange(event:any) {
    this.componentInstance.properties.label = event;
    this.componentInstance.properties.fieldLabel = event;
  }
}
