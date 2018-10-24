/**
 * Created by pratik on 27/2/18.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'button-dropdown-property',
  template: `
    <ng-container *ngIf="componentInstance && !componentInstance.showButtonProperties">

          <amexio-text-input field-label="Name" [(ngModel)]="componentInstance.properties.name"
                             (onBlur)="propertyValidation()"
                             name="componentInstance.properties.name"
                             place-holder="name">
          </amexio-text-input>


          <amexio-text-input field-label="Label" [(ngModel)]="componentInstance.properties.label"
                             name="componentInstance.properties.label"
                             place-holder="label">
          </amexio-text-input>


          <amexio-text-input field-label="Tooltip" [(ngModel)]="componentInstance.properties.tooltip"
                             name="componentInstance.properties.tooltip"
                             place-holder="tooltip">
          </amexio-text-input>

          <amexio-dropdown [(ngModel)]="componentInstance.properties.type"
                           [place-holder]="'type'"
                           [field-label]="'Button Type'"
                           [data]="typeData"
                           [display-field]="'type'"
                           [value-field]="'value'">
          </amexio-dropdown>  
          
          <amexio-dropdown [(ngModel)]="componentInstance.properties.size"
                           [place-holder]="'size'"
                           [field-label]="'Button Size'"
                           [data]="sizeData"
                           [display-field]="'type'"
                           [value-field]="'value'">
          </amexio-dropdown>
              <amexio-checkbox [field-label]="'Disabled'"
                               [(ngModel)]="componentInstance.properties.disabled">
              </amexio-checkbox>

          <amexio-button [label]="'Add'"
                         [type]="'primary'"  [size]="'small'" (onClick)="addButton()">
          </amexio-button>
          <amexio-button [label]="'Remove '"
                         [type]="'primary'"  [size]="'small'" (onClick)="remove()">
          </amexio-button>
        </ng-container>
    <ng-container *ngIf="componentInstance && componentInstance.showButtonProperties">
              <amexio-text-input field-label="Name" [(ngModel)]="componentInstance.buttonPropertyObject.name"
                                 (onBlur)="propertyValidation()"
                                 name="componentInstance.buttonPropertyObject.name"
                                 place-holder="name">
              </amexio-text-input>
              <amexio-text-input field-label="Label" [(ngModel)]="componentInstance.buttonPropertyObject.label"
                                 name="componentInstance.buttonPropertyObject.label"
                                 place-holder="label">
              </amexio-text-input>
              <amexio-checkbox [field-label]="'Disabled'"
                               [(ngModel)]="componentInstance.buttonPropertyObject.disabled">
              </amexio-checkbox>
              <amexio-button [block]="true" label="Attach Icon" size="medium" type="theme-color" (onClick)="onIconOpenWindow()"></amexio-button>
              <br>
              <amexio-button [label]="'Remove'"
                             [type]="'theme-color'"  [size]="'medium'" (onClick)="removeButton()">
              </amexio-button>
            </ng-container>
    
    <ng-container *ngIf="iconWindow">
      <canvas-icon-search [selectedIcon]="componentInstance.buttonPropertyObject.icon" [componentInstance]="componentInstance" [iconWindow]="iconWindow" [ischild]="true" (getSelectedIcon)="getSelectedIcon($event)" ></canvas-icon-search>
    </ng-container>
  `
})
export class ButtonDropDownPropertyComponent implements OnInit {
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
    if (
      this.componentInstance.properties.name.split(' ').length == 1 &&
      this.componentInstance.properties.name != ''
    ) {
      if (this.checkButtonChildButtonValidation()) {
        this.componentInstance.properties.isComponentValid = true;
      }
    } else {
      this.componentInstance.properties.isComponentValid = false;
    }
  }

  addButton() {
    this.componentInstance.createComponentConfig();
    this.checkButtonChildButtonValidation();
  }

  remove() {
    if (this.componentInstance.children.length > 1) {
      this.componentInstance.children.pop();
      this.componentInstance.createLocalData();
    }
  }

  removeButton() {
    this.componentInstance.children.forEach((item: any, index: any) => {
      if (
        item.instance.properties === this.componentInstance.buttonPropertyObject
      ) {
        this.componentInstance.children.splice(index, 1);
      }
    });
    this.componentInstance.createLocalData();
  }

  checkButtonChildButtonValidation() {
    let status = true;
    this.componentInstance.children.forEach((item: any) => {
      if (
        item.instance.properties.name &&
        item.instance.properties.name.split(' ').length == 1 &&
        item.instance.properties.name !== ''
      ) {
        item.instance.properties.isComponentValid = true;
      } else {
        status = false;
        item.instance.properties.isComponentValid = false;
      }
    });
    if (status) {
      this.componentInstance.properties.isComponentValid = true;
    } else {
      this.componentInstance.properties.isComponentValid = false;
    }
    return status;
  }

  onIconOpenWindow() {
    this.iconWindow = !this.iconWindow;
  }

  getSelectedIcon(icon: any) {
    this.componentInstance.buttonPropertyObject.icon = icon;
    this.componentInstance.buttonPropertyObject.iconClass = icon;
    this.onIconOpenWindow();
  }
}
