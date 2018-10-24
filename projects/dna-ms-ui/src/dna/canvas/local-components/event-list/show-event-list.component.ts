/**
 * Created by dattaram on 15/6/18.
 */
import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import { EventHandlerService } from '../../canvas-service/event.service';
import { EventModel } from '../../event-relationship/models/event.basemodel';

@Component({
  selector: 'show-event-list',
  template: `
    <ng-container *ngIf="eventList.length > 0">
      <amexio-label size="medium-bold">Events</amexio-label><hr/>
      <ng-container *ngFor="let event of eventList">
        <amexio-button [block]="true" [label]="event.eventName" size="medium" [type]="'yellow'" (onClick)="openEventRelationship(event)"></amexio-button>
      </ng-container>
    </ng-container>
  
  `
})
export class ShowEventListComponent implements OnInit {
  eventList: any[] = [];

  @Input() componentInstance: any;
  constructor(public _eventHndl: EventHandlerService, private cdf: ChangeDetectorRef) {}

  ngOnInit() {
    let eventData: any;
    if (this.componentInstance) {
      eventData = this._eventHndl.findEventListByName(
        this.componentInstance.name
      );
      if (eventData != null) {
        this.eventList = eventData;
      } else {
        this.eventList = [];
      }
    }
  }

  /* OPEN RELATIONSHIP WINDOW */

  openEventRelationship(selectedEvent: any) {
    this._eventHndl.resetValidationData();
    if (this._eventHndl.checkUIComponentValidation(this._eventHndl.viewRefs)) {
      if (this._eventHndl.isModelBinded) {
        let objStatus: any;
        if (this.componentInstance.eventRelationship.eventDefination && this.componentInstance.eventRelationship.eventDefination.length > 0) {
          objStatus = this.objectSearching(this.componentInstance.eventRelationship.eventDefination, selectedEvent);
          if (objStatus.flag) {
            this._eventHndl.showEventretionshipUI(this.componentInstance, objStatus.data);
          }
        } else {
          const eventRelation = new EventModel();
          eventRelation.type = selectedEvent.type;
          eventRelation.eventName = selectedEvent.eventName;
          this.componentInstance.eventRelationship.eventDefination = [];
          this.componentInstance.eventRelationship.eventDefination.push(eventRelation);
          this.componentInstance.eventRelationship.eventDefination.forEach((opt: any, index: any) => {
            if (opt.type == selectedEvent.type) {
              this._eventHndl.showEventretionshipUI(this.componentInstance, this.componentInstance.eventRelationship.eventDefination[index]);
            }
          });
        }
      } else {
        this._eventHndl.showCreateModel = true;
      }
    } else {
      this._eventHndl.createNotificationData();
      this.cdf.detectChanges();
    }
  }

  objectSearching(searchData: any[], selectedObj: any): any {
    let object: any = {};
    object['flag'] = false;
    object['data'] = {};
    searchData.forEach(seObj => {
      if (seObj.type == selectedObj.type) {
        object.flag = true;
        object.data = seObj;
      }
    });
    return object;
  }
}
