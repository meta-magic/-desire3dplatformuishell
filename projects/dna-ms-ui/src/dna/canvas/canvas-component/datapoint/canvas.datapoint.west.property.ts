/**
 * Created by dattaram on 1/3/18.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'datapoint-west-property',
  template: `
    <ng-container *ngIf="componentInstance">
      <amexio-text-input field-label="Background Color" [(ngModel)]="componentInstance.properties.backgroundColor"
                         place-holder="background color"
                         icon-feedback="true">
      </amexio-text-input>
      <amexio-text-input field-label="Font Color" [(ngModel)]="componentInstance.properties.fontColor"
                         place-holder="font color"
                         icon-feedback="true">
      </amexio-text-input>
      <amexio-dropdown [(ngModel)]="componentInstance.properties.contentAlign"
                       [place-holder]="'Align'"
                       [field-label]="'Alignment'"
                       [data]="alignment"
                       [display-field]="'type'"
                       [value-field]="'value'">
      </amexio-dropdown>
      <amexio-text-input field-label="Width" [(ngModel)]="componentInstance.properties.width"
                         place-holder="width"
                         icon-feedback="true">
      </amexio-text-input>
      <amexio-text-input field-label="Height" [(ngModel)]="componentInstance.properties.height"
                         place-holder="height"
                         icon-feedback="true">
      </amexio-text-input>

    </ng-container>
        

  `
})
export class DatapointWestPropertyComponent implements OnInit {
  componentInstance: any;
  alignment: any[] = [];
  constructor() {
    this.alignment = [
      {
        type: 'center',
        value: 'center'
      },
      {
        type: 'left',
        value: 'left'
      },
      {
        type: 'right',
        value: 'right'
      },
      {
        type: 'justify',
        value: 'justify'
      }
    ];
  }
  ngOnInit() {}

  onNorthChange(flag: any) {
    if (!flag) {
      this.componentInstance.children.forEach((child: any) => {
        if (
          child.instance.hasOwnProperty('children') &&
          child.instance.children.length > 0
        ) {
          this.deleteInstances(child.instance.children);
        }
      });
      this.componentInstance.children[0].instance.children.length = 0;
    }
  }
  onEastChange(flag: any) {
    if (!flag) {
      this.componentInstance.children.forEach((child: any) => {
        if (
          child.instance.hasOwnProperty('children') &&
          child.instance.children.length > 0
        ) {
          this.deleteInstances(child.instance.children);
        }
      });
      this.componentInstance.children[1].instance.children.length = 0;
    }
  }
  onCenterChange(flag: any) {
    if (!flag) {
      this.componentInstance.children.forEach((child: any) => {
        if (
          child.instance.hasOwnProperty('children') &&
          child.instance.children.length > 0
        ) {
          this.deleteInstances(child.instance.children);
        }
      });
      this.componentInstance.children[2].instance.children.length = 0;
    }
  }
  onWestChange(flag: any) {
    if (!flag) {
      this.componentInstance.children.forEach((child: any) => {
        if (
          child.instance.hasOwnProperty('children') &&
          child.instance.children.length > 0
        ) {
          this.deleteInstances(child.instance.children);
        }
      });
      this.componentInstance.children[3].instance.children.length = 0;
    }
  }
  onSouthChange(flag: any) {
    if (!flag) {
      this.componentInstance.children.forEach((child: any) => {
        if (
          child.instance.hasOwnProperty('children') &&
          child.instance.children.length > 0
        ) {
          this.deleteInstances(child.instance.children);
        }
      });
      this.componentInstance.children[4].instance.children.length = 0;
    }
  }

  deleteInstances(child: any[]) {
    child.forEach((innerChild: any) => {
      if (
        innerChild.instance.hasOwnProperty('children') &&
        innerChild.instance.children.length > 0
      ) {
        this.deleteInstances(innerChild.instance.children);
        innerChild.destroy();
      } else {
        innerChild.destroy();
      }
    });
  }
}
