import { Injectable, OnInit } from '@angular/core';
/**
 * Created by dattaram on 21/6/18.
 */

@Injectable()
export class NotificationService implements OnInit {
  //Attribut for notification
  notificationType: string;
  notificationData: any[];
  notificationColor: string;

  //Attribut for error notification
  title: string;
  errorData: any[];

  //Attribut for success notification
  successData: any[];

  //Attribut for success notification
  warningData: any[];

  //Attribut for success notification
  infoData: any[];

   icon: string  = '';

   color: string = ''

  constructor() {
    this.resetData();
  }
  ngOnInit() {}
/*  setNotificationData(type: string, data: any) {
    this.resetData();
    this.notificationType = type;
    this.notificationData = data;
  }*/

  showerrorData(title: string, data: any) {
    this.resetData();
    this.title = title;
    this.errorData = data;
  }
  showSuccessData(data: any) {
    this.resetData();
    this.successData = data;
  }
  showWarningData(data: any) {
    this.resetData();
    this.warningData = data;
  }
  showInfoData(data: any) {
    this.resetData();
    this.infoData = data;
  }

  getNotificationData() {
    return this.notificationData;
  }

  setWarningData(data: any) {
    this.color = 'orange';
    this.icon = 'fa fa-exclamation-triangle';
    this.notificationData.push(data);
  }

  setErrorData(data: any) {
    this.color = 'red';
    this.icon = 'fa fa-times-circle-o';
    this.notificationData.push(data);
  }

  setSuccessData(data: any) {
    this.color = 'green';
    this.icon = 'fa fa-check';
    this.notificationData.push(data);
  }

  resetData() {
    this.errorData = [];
    this.infoData = [];
    this.warningData = [];
    this.successData = [];
    this.notificationData = [];
  }
}
