/**
 * Created by dattaram on 23/2/18.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rating-property',
  template: `    
    <ng-container *ngIf="componentInstance">
      <amexio-text-input field-label="Name" [(ngModel)]="componentInstance.properties.name"
                         name="componentInstance.properties.name"
                         place-holder="name"
                         icon-feedback="true"
                         (onBlur)="propertyValidation()">
      </amexio-text-input>
      <amexio-text-input field-label="Field Label" [(ngModel)]="componentInstance.properties.fieldLabel"
                         name="componentInstance.properties.fieldLabel"
                         place-holder="label"
                         icon-feedback="false" [allow-blank]="true">
      </amexio-text-input>
      <amexio-text-input field-label="Full Icon" [(ngModel)]="componentInstance.properties.fullIcon"
                         name="componentInstance.properties.fullIcon"
                         place-holder="full icon"
                         icon-feedback="false" [allow-blank]="true">
      </amexio-text-input>
      <amexio-text-input field-label="Empty Icon" [(ngModel)]="componentInstance.properties.emptyIcon"
                         name="componentInstance.properties.emptyIcon"
                         place-holder="empty icon"
                         icon-feedback="false" [allow-blank]="true">
      </amexio-text-input>
      <amexio-number-input [field-label]="'Max Rating'" name ="componentInstance.properties.max"
                           place-holder="max rating" (change)="onMaxChange()"
                           [allow-blank]="true" [(ngModel)]="componentInstance.properties.max">
      </amexio-number-input>
      <amexio-checkbox  [field-label]="'Disabled'"
                        [(ngModel)]="componentInstance.properties.disabled">
      </amexio-checkbox>
      <amexio-checkbox  [field-label]="'Readonly'"
                        [(ngModel)]="componentInstance.properties.readonly">
      </amexio-checkbox>
      <amexio-checkbox  [field-label]="'Required'"
                        [(ngModel)]="componentInstance.properties.required">
      </amexio-checkbox>

      <amexio-button [block]="true" label="Add Titles" size="medium" [type]="'theme-color'" (onClick)="showTitleWindow = !showTitleWindow"></amexio-button>

    </ng-container>

    
    <ng-container *ngIf="showTitleWindow">
      <amexio-window [show-window]="showTitleWindow"
                     type="window" [closable]="true" [footer]="true">
        <amexio-header>
          Add Titles
        </amexio-header>
        <amexio-body>
          <amexio-row>
            <amexio-column [size]="6"  *ngFor="let data of titleData">
              <amexio-text-input     [(ngModel)]="data.text"
                                     [place-holder]="'title'"
                                     [icon-feedback]="false"
                                     [allow-blank]="true">
              </amexio-text-input>
            </amexio-column>
          </amexio-row>
        </amexio-body>
        <amexio-action>
          <amexio-button [label]="'Cancel'" [type]="'theme-color'" (onClick)="showTitleWindow = !showTitleWindow"></amexio-button>
          <amexio-button [label]="'Save'" [type]="'theme-color'" (onClick)="onTitleSave();"></amexio-button>
        </amexio-action>
      </amexio-window>

    </ng-container>
    
    
  `
})
export class RatingPropertyComponent implements OnInit {
  componentInstance: any;
  showTitleWindow: boolean;
  titleData: any[] = [];
  constructor() {
    this.showTitleWindow = false;
  }

  ngOnInit() {
    if (this.componentInstance.properties.titles.length > 0) {
      this.componentInstance.properties.titles.forEach((opt: any) => {
        let obj: any;
        obj = {};
        obj['text'] = opt;
        this.titleData.push(obj);
      });
    } else {
      this.createTitleData();
    }
  }

  propertyValidation() {
    this.componentInstance._eventHndl.componentValidation(
      this.componentInstance
    );
  }

  onMaxChange() {
    this.createTitleData();
  }
  createTitleData() {
    this.titleData = [];
    for (let i = 1; i <= this.componentInstance.properties.max; i++) {
      let obj: any;
      obj = {};
      obj['text'] = 'title' + i;
      this.titleData.push(obj);
    }
  }
  onTitleSave() {
    this.componentInstance.properties.titles = [];
    this.titleData.forEach((opt: any) => {
      this.componentInstance.properties.titles.push(opt.text);
    });
    this.showTitleWindow = !this.showTitleWindow;
  }
}
