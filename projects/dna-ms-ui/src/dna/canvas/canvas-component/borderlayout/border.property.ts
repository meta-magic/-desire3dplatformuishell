/**
 * Created by dattaram on 1/3/18.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'border-property',
  template: `
    <ng-container *ngIf="componentInstance">
      <amexio-checkbox  [field-label]="'North'"
                        [(ngModel)]="componentInstance?.properties.north" (ngModelChange)="onNorthChange($event)">
      </amexio-checkbox>
      <amexio-checkbox  [field-label]="'East'"
                        [(ngModel)]="componentInstance?.properties.east" (ngModelChange)="onEastChange($event)">
      </amexio-checkbox>
      <amexio-checkbox  [field-label]="'Center'"
                        [(ngModel)]="componentInstance?.properties.center" (ngModelChange)="onCenterChange($event)">
      </amexio-checkbox>
      <amexio-checkbox  [field-label]="'West'"
                        [(ngModel)]="componentInstance?.properties.west" (ngModelChange)="onWestChange($event)">
      </amexio-checkbox>
      <amexio-checkbox  [field-label]="'South'"
                        [(ngModel)]="componentInstance.properties.south" (ngModelChange)="onSouthChange($event)">
      </amexio-checkbox>
    </ng-container>
    
  `
})
export class BorderPropertyComponent implements OnInit {
  componentInstance: any;
  constructor() {}

  ngOnInit() {}

  onNorthChange(flag: any) {
    if (!flag) {
      this.componentInstance.northInstance.instance.children.forEach(
        (child: any) => {
          if (
            child.instance.hasOwnProperty('children') &&
            child.instance.children.length > 0
          ) {
            this.deleteInstances(child.instance.children);
          }
        }
      );
      this.componentInstance.children[0].instance.children.length = 0;
    }
  }
  onEastChange(flag: any) {
    if (!flag) {
      this.componentInstance.eastInstance.instance.children.forEach(
        (child: any) => {
          if (
            child.instance.hasOwnProperty('children') &&
            child.instance.children.length > 0
          ) {
            this.deleteInstances(child.instance.children);
          }
        }
      );
      this.componentInstance.children[1].instance.children.length = 0;
    }
  }
  onCenterChange(flag: any) {
    if (!flag) {
      this.componentInstance.centerInstance.instance.children.forEach(
        (child: any) => {
          if (
            child.instance.hasOwnProperty('children') &&
            child.instance.children.length > 0
          ) {
            this.deleteInstances(child.instance.children);
          }
        }
      );
      this.componentInstance.children[2].instance.children.length = 0;
    }
  }
  onWestChange(flag: any) {
    if (!flag) {
      this.componentInstance.westInstance.instance.children.forEach(
        (child: any) => {
          if (
            child.instance.hasOwnProperty('children') &&
            child.instance.children.length > 0
          ) {
            this.deleteInstances(child.instance.children);
          }
        }
      );
      this.componentInstance.children[3].instance.children.length = 0;
    }
  }
  onSouthChange(flag: any) {
    if (!flag) {
      this.componentInstance.southInstance.instance.children.forEach(
        (child: any) => {
          if (
            child.instance.hasOwnProperty('children') &&
            child.instance.children.length > 0
          ) {
            this.deleteInstances(child.instance.children);
          }
        }
      );
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
