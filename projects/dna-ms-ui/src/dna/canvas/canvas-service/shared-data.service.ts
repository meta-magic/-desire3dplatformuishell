import { Injectable, OnInit } from '@angular/core';
/**
 * Created by dattaram on 21/6/18.
 */

@Injectable()
export class SharedDataService implements OnInit {
  uiDetails: any = {};
  propertyIcon: string = 'fa fa-arrows';
  behaviourIcon: string = 'fa fa-bolt';
  propertyPaneHeight: any = 66.5;
  ngOnInit() {}
  constructor() {}
}
