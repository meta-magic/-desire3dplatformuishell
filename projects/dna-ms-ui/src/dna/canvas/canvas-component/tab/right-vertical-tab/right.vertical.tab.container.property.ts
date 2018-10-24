/**
 * Created by dattaram on 6/3/18.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'right-vertical-right-prop',
  template: `    
            <ng-container *ngIf="componentInstance">
              <amexio-text-input field-label="name" [(ngModel)]="componentInstance.properties.name"
                                 name="componentInstance.properties.name"
                                 place-holder="name"
                                 icon-feedback="true"
                                 (onBlur)="propertyValidation()">
              </amexio-text-input><br>
              <amexio-button size="small" [label]="'Add Tab'"
                             [type]="'theme-color'"
                             (onClick)="onTabAdd()"
                             [tooltip]="'primary'">
              </amexio-button>
              <amexio-button  size="small" [label]="'Remove Tab'"
                              [type]="'theme-color'"
                              (onClick)="onTabRemove()"
                              [tooltip]="'remove'">
              </amexio-button>
            </ng-container>
  `
})
export class VerticalRightTabPropertyComponent implements OnInit {
  componentInstance: any;

  constructor() {}

  ngOnInit() {}

  onTabAdd() {
    this.componentInstance.createComponentConfig();
  }

  propertyValidation() {}

  onTabRemove() {
    this.componentInstance.children.pop();
    this.componentInstance.createLocalData();
  }
}
