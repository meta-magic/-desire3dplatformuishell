/**
 * Created by dattaram on 21/6/18.
 */
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../canvas-service/notification.service';

@Component({
  selector: 'canvas-notification',
  template: `
   <div class="custom-style">
     <ng-container *ngIf="_notificationService.showCustomDialogue">
       <amexio-dialogue [(show)]="_notificationService.showCustomDialogue"
                        [custom]="true"
                        [title]="_notificationService.title"
                        [type]="'alert'">
         <amexio-body *ngFor="let msg of _notificationService.errorMsgData let index=index">
           <amexio-label>{{index+1}}) {{msg}}</amexio-label>
         </amexio-body>
         <amexio-action>
           <amexio-button type="theme-color"
                          (onClick)="_notificationService.showCustomDialogue = false"
                          [label]="'ok'">
           </amexio-button>
         </amexio-action>
       </amexio-dialogue>
     </ng-container>
     <ng-container *ngIf="_notificationService.showDialogue">
       <amexio-dialogue [(show)]="_notificationService.showDialogue"
                        [title]="_notificationService.title"
                        [message]="_notificationService.dialogueMessage"
                        [primary-action-label]="'ok'"
                        [type]="'alert'">
       </amexio-dialogue>
     </ng-container>
   </div>

   <ng-container *ngIf="_notificationService.showCustomNotification">
     <amexio-notification
       [data]="_notificationService.notificationData"
       [vertical-position]="'top'"
       [horizontal-position]="'right'"
       [close-on-escape] ="true"
       [background-color]="'red'"
       [auto-dismiss-msg]="false"
       [auto-dismiss-msg-interval]="4000">
       <ng-template #amexioNotificationTemp let-data="data" >
         <amexio-row>
           <amexio-column size="1">
             <amexio-image [icon-class]="'	fa fa-times-circle-o'" style="font-size: 25px;">
             </amexio-image> &nbsp;&nbsp;
           </amexio-column>
           <amexio-column size="11">
             <amexio-label *ngIf="_notificationService.notificationTitle" size="small-bold" font-color="white" >{{_notificationService.notificationTitle}}</amexio-label><br/>
             <ng-container *ngFor="let obj of  data.data; let index= index">
               <amexio-label font-color="black" >{{index+1}}) {{obj.text}}</amexio-label><br/>
             </ng-container>
           </amexio-column>
         </amexio-row>
       </ng-template>
     </amexio-notification>
   </ng-container>
   
    
    <ng-container *ngIf="_notificationService.showNotification">
      <amexio-notification
        [data]="_notificationService.notificationData"
        [vertical-position]="'top'"
        [horizontal-position]="'right'"
        [close-on-escape] ="true"
        [background-color]="_notificationService.notificationColor"
        [auto-dismiss-msg]="true"
        [auto-dismiss-msg-interval]="3000">
      </amexio-notification>
    </ng-container>
    
  `,
  styles: [
    `
      .custom-style {
      }
    `
  ]
})
export class CanvasNotificationComponent implements OnInit {
  constructor(public _notificationService: NotificationService) {}

  ngOnInit() {}
}
