import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tab-pill-property',
  template: `

    <ng-container *ngIf="componentInstance">
      <amexio-text-input field-label="name" [(ngModel)]="componentInstance.properties.name"
                         place-holder="name"
                         icon-feedback="true" (onBlur)="propertyValidation()">
      </amexio-text-input>

      <amexio-text-input field-label="Title" [(ngModel)]="componentInstance.properties.title"
                         place-holder="title"
                         (input)="updateTitle()"
                         icon-feedback="true">
      </amexio-text-input>


      <amexio-checkbox [field-label]="'Active'"
                       [(ngModel)]="componentInstance.properties.active">
      </amexio-checkbox>

      <amexio-button [block]="true" label="Attach Icon" size="medium" type="theme-color" (onClick)="onIconOpenWindow()"></amexio-button><br>
      <amexio-button [block]="true" label="Remove" size="medium" type="theme-color" (onClick)="onTabRemove()"></amexio-button>

    </ng-container>
       
    <ng-container *ngIf="iconWindow">
      <canvas-icon-search [selectedIcon]="componentInstance.iconClass" [componentInstance]="componentInstance" [iconWindow]="iconWindow" (getSelectedIcon)="getSelectedIcon($event)"></canvas-icon-search>
    </ng-container>

  `
})
export class TabPillPropertyComponent implements OnInit {
  componentInstance: any;
  iconWindow: boolean;
  constructor() {}

  ngOnInit() {}

  updateTitle() {
    this.componentInstance.title = this.componentInstance.properties.title;
  }

  onTabRemove() {
    this.componentInstance.parentComponentRef.children.forEach(
      (item: any, index: any) => {
        if (item.instance === this.componentInstance) {
          this.componentInstance.parentComponentRef.children.splice(index, 1);
          item.destroy();
          this.componentInstance.parentComponentRef.createLocalData();
          this.componentInstance.parentComponentRef.loadComponentProperties();
        }
      }
    );
  }

  propertyValidation() {
    this.componentInstance._eventHndl.componentValidation(
      this.componentInstance
    );
  }

  onIconOpenWindow() {
    this.iconWindow = !this.iconWindow;
  }
  getSelectedIcon(icon: any) {
    this.componentInstance.iconClass = icon;
    this.componentInstance.properties.iconClass = icon;
    this.onIconOpenWindow();
  }
}
