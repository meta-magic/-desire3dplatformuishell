import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tab-container-property',
  template: `    
            <ng-container *ngIf="componentInstance">
              <amexio-checkbox [field-label]="'Closable'"
                               [(ngModel)]="componentInstance.properties.closable">
              </amexio-checkbox>
              <br>
              <amexio-button  size="small" [label]="'Add Tab'"
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
export class TabContainerPropertyComponent implements OnInit {
  componentInstance: any;

  constructor() {}

  ngOnInit() {}

  onTabAdd() {
    this.componentInstance.createComponentConfig();
  }

  onTabRemove() {
    this.componentInstance.children.pop();
    this.componentInstance.createLocalData();
  }
}
