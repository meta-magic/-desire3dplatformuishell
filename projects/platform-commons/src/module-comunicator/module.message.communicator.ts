import { Injectable } from '@angular/core';

/**
 * Using Window's post message for cross-module communication
 */
@Injectable()
export class MessagingService {
  constructor() {}

  sendMessage(message: any) {
    window.postMessage(message, window.location.href);
  }

  getMessage(callback: (msg: any) => any): any {
    window.addEventListener(
      'message',
      (e: any) => {
        callback(e);
      },
      false
    );
  }
}
