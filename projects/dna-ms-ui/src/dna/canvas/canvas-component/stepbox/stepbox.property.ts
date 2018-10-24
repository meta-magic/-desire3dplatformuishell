/**
 * Created by dattaram on 5/3/18.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'stepbox-property',
  template: `
              <ng-container *ngIf="componentInstance && !componentInstance.showBlockProperties">
                <amexio-text-input field-label="Name" [(ngModel)]="componentInstance.properties.name"
                                   name="componentInstance.properties.name"
                                   place-holder="name"
                                   icon-feedback="true" (onBlur)="propertyValidation()">
                </amexio-text-input>
                <amexio-checkbox  [field-label]="'Show Block'"
                                  [(ngModel)]="componentInstance.properties.block"
                                  (onSelection)="onCheckClick($event)">
                </amexio-checkbox>
                <amexio-checkbox  [field-label]="'Show Index'"
                                  [(ngModel)]="componentInstance.properties.index"
                                  (onSelection)="onCheckClick($event)">
                </amexio-checkbox>
                <amexio-checkbox  [field-label]="'Show Icon'"
                                  [(ngModel)]="componentInstance.properties.icon"
                                  (onSelection)="onCheckClick($event)">
                </amexio-checkbox>
                <amexio-button [label]="'Add Block'"
                               [type]="'primary'"  [size]="'small'" (onClick)="addBlock()">
                </amexio-button>
                <amexio-button [label]="'Remove Block'"
                               [type]="'primary'"  [size]="'small'" (onClick)="removeBlock()">
                </amexio-button>
              </ng-container>

              <ng-container *ngIf="componentInstance && componentInstance.showBlockProperties">

                <amexio-text-input field-label="Name" [(ngModel)]="componentInstance.blockPropertyObject.name"
                                   (onBlur)="propertyValidation()"
                                   name="componentInstance.blockPropertyObject.name"
                                   place-holder="name">
                </amexio-text-input>
                <amexio-text-input field-label="Label" [(ngModel)]="componentInstance.blockPropertyObject.label"
                                   name="componentInstance.blockPropertyObject.label"
                                   place-holder="label">
                </amexio-text-input>
                <amexio-checkbox  [field-label]="'Active'"
                                  [(ngModel)]="componentInstance.blockPropertyObject.active">
                </amexio-checkbox>
                <ng-container *ngIf="componentInstance.properties.icon">
                <amexio-button [block]="true" label="Search Icon" size="medium" type="theme-color" (onClick)="onIconOpenWindow()"></amexio-button>
                </ng-container>
              </ng-container>
          

      <ng-container *ngIf="iconWindow">
        <canvas-icon-search [selectedIcon]="componentInstance.blockPropertyObject.icon" [componentInstance]="componentInstance" [iconWindow]="iconWindow" (getSelectedIcon)="getSelectedIcon($event)"></canvas-icon-search>
      </ng-container>
    
  `
})
export class StepboxPropertyComponent implements OnInit {
  componentInstance: any;
  iconWindow: boolean;
  constructor() {}

  ngOnInit() {}

  propertyValidation() {
    if (
      this.componentInstance.properties.name.split(' ').length == 1 &&
      this.componentInstance.properties.name != ''
    ) {
      if (this.checkChildBlockValidation()) {
        this.componentInstance.properties.isComponentValid = true;
      }
    } else {
      this.componentInstance.properties.isComponentValid = false;
    }
  }

  addBlock() {
    this.componentInstance.createComponentConfig();
    this.checkChildBlockValidation();
  }

  removeBlock() {
    if (this.componentInstance.children.length > 1) {
      this.componentInstance.children.pop();
      this.componentInstance.createLocalData();
    }
  }

  checkChildBlockValidation() {
    let status = true;
    this.componentInstance.children.forEach((item: any) => {
      if (
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

  onCheckClick(data: any) {
    // this.changeStepBoxStyle();
  }

  changeStepBoxStyle() {
    if (this.componentInstance.properties.index) {
      this.componentInstance.properties.block = false;
      this.componentInstance.properties.icon = false;
    }
    if (this.componentInstance.properties.icon) {
      this.componentInstance.properties.block = false;
      this.componentInstance.properties.index = false;
    }
    if (!this.componentInstance.properties.block) {
      this.componentInstance.properties.block = true;
      this.componentInstance.properties.index = true;
    }
  }

  onIconOpenWindow() {
    this.iconWindow = !this.iconWindow;
  }
  getSelectedIcon(icon: any) {
    this.componentInstance.blockPropertyObject.icon = icon;
    this.componentInstance.blockPropertyObject.iconClass = icon;
    this.onIconOpenWindow();
  }
}
