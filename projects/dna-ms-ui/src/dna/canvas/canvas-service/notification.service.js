"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
/**
 * Created by dattaram on 21/6/18.
 */
var NotificationService = (function () {
    function NotificationService() {
        // Attribute for Custom Dialogue box
        this.showCustomDialogue = false;
        this.showDialogue = false;
        // Attribute for Custom Notification
        this.notificationData = [];
        this.showNotification = false;
        this.showCustomNotification = false;
    }
    NotificationService.prototype.ngOnInit = function () { };
    NotificationService.prototype.setDialogueData = function (show, message, title) {
        this.showDialogue = show;
        this.title = title;
        this.dialogueMessage = message;
    };
    NotificationService.prototype.setCustomDialogueData = function (show, data, title) {
        this.showCustomDialogue = show;
        this.errorMsgData = data;
        this.title = title;
    };
    NotificationService.prototype.setCustomNotificationData = function (show, title, data) {
        this.reset();
        this.showCustomNotification = show;
        this.notificationTitle = title;
        this.notificationData = data;
    };
    NotificationService.prototype.setNotificationData = function (show, data, color) {
        this.reset();
        this.showNotification = show;
        this.notificationData = data;
        this.notificationColor = color;
    };
    NotificationService.prototype.reset = function () {
        this.showCustomNotification = false;
        this.showNotification = false;
    };
    return NotificationService;
}());
NotificationService = __decorate([
    core_1.Injectable()
], NotificationService);
exports.NotificationService = NotificationService;
