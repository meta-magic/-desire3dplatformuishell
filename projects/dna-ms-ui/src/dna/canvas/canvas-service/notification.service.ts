import { Injectable, OnInit } from '@angular/core';
/**
 * Created by dattaram on 21/6/18.
 */

@Injectable()
export class NotificationService implements OnInit {
  // Attribute for Custom Dialogue box
  showCustomDialogue: boolean = false;
  showDialogue: boolean = false;
  errorMsgData: any[];

  // Attribute for Simple Dialogue box
  dialogueMessage: string;
  title: string;

  // Attribute for Custom Notification
  notificationData: any[] = [];
  notificationTitle: string;

  showNotification = false;
  showCustomNotification = false;

  notificationColor: string;
  ngOnInit() {}
  constructor() {}
  setDialogueData(show: boolean, message: string, title: string) {
    this.showDialogue = show;
    this.title = title;
    this.dialogueMessage = message;
  }

  setCustomDialogueData(show: boolean, data: any, title: string) {
    this.showCustomDialogue = show;
    this.errorMsgData = data;
    this.title = title;
  }

  setCustomNotificationData(show: boolean, title: string, data: any) {
    this.reset();
    this.showCustomNotification = show;
    this.notificationTitle = title;
    this.notificationData = data;
  }

  setNotificationData(show: boolean, data: any, color: string) {
    this.reset();
    this.showNotification = show;
    this.notificationData = data;
    this.notificationColor = color;
  }

  reset() {
    this.showCustomNotification = false;
    this.showNotification = false;
  }
}
