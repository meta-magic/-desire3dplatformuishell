import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'video-property',
  template: `    
            <ng-container *ngIf="componentInstance">
              <amexio-text-input field-label="Path" [(ngModel)]="componentInstance.properties.path"
                                 name="componentInstance.properties.path"
                                 place-holder="enter file path"
                                 icon-feedback="false" [allow-blank]="true">
              </amexio-text-input>
              <amexio-text-input field-label="Extension" [(ngModel)]="componentInstance.properties.extension"
                                 name="componentInstance.properties.extension"
                                 place-holder="enter extension of video"
                                 icon-feedback="false" [allow-blank]="true">
              </amexio-text-input>
            </ng-container>
  `
})
export class VideoPropertyComponent implements OnInit {
  componentInstance: any;
  constructor() {}

  ngOnInit() {}
}
