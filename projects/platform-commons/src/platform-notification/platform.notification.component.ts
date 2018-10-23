/**
 * Created by dattaram on 18/10/18.
 */
import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../notification-service/notification.service";

@Component({
  selector: 'platform-notification',
  template:`
    <amexio-notification
      [data]="_notificationService.getNotificationData()"
      [vertical-position]="'top'"
      [horizontal-position]="'right'"
      [close-on-escape] ="true"
      [background-color]="_notificationService.color"
      [auto-dismiss-msg]="true"
      [auto-dismiss-msg-interval]="4000">
      <ng-template #amexioNotificationTemp let-data="data">
        <amexio-box [box-width]="'350px'" >
          <amexio-image [icon-class]="_notificationService.icon" >
          </amexio-image> &nbsp;&nbsp;
          <amexio-label size="small-bold"  font-color="black"> {{data}}</amexio-label>
        </amexio-box>
      </ng-template>
    </amexio-notification>
    
    
  `
})

export class PlatformNotificationComponent implements OnInit {
  constructor(public _notificationService: NotificationService) {
  }

  ngOnInit() {
  }
}
