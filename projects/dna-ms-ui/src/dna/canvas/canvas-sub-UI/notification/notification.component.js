"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
/**
 * Created by dattaram on 21/6/18.
 */
var core_1 = require("@angular/core");
var CanvasNotificationComponent = (function () {
    function CanvasNotificationComponent(_notificationService) {
        this._notificationService = _notificationService;
    }
    CanvasNotificationComponent.prototype.ngOnInit = function () { };
    return CanvasNotificationComponent;
}());
CanvasNotificationComponent = __decorate([
    core_1.Component({
        selector: 'canvas-notification',
        template: "\n   <div class=\"custom-style\">\n     <ng-container *ngIf=\"_notificationService.showCustomDialogue\">\n       <amexio-dialogue [(show)]=\"_notificationService.showCustomDialogue\"\n                        [custom]=\"true\"\n                        [title]=\"_notificationService.title\"\n                        [type]=\"'alert'\">\n         <amexio-body *ngFor=\"let msg of _notificationService.errorMsgData let index=index\">\n           <amexio-label>{{index+1}}) {{msg}}</amexio-label>\n         </amexio-body>\n         <amexio-action>\n           <amexio-button type=\"theme-color\"\n                          (onClick)=\"_notificationService.showCustomDialogue = false\"\n                          [label]=\"'ok'\">\n           </amexio-button>\n         </amexio-action>\n       </amexio-dialogue>\n     </ng-container>\n     <ng-container *ngIf=\"_notificationService.showDialogue\">\n       <amexio-dialogue [(show)]=\"_notificationService.showDialogue\"\n                        [title]=\"_notificationService.title\"\n                        [message]=\"_notificationService.dialogueMessage\"\n                        [primary-action-label]=\"'ok'\"\n                        [type]=\"'alert'\">\n       </amexio-dialogue>\n     </ng-container>\n   </div>\n\n   <ng-container *ngIf=\"_notificationService.showCustomNotification\">\n     <amexio-notification\n       [data]=\"_notificationService.notificationData\"\n       [vertical-position]=\"'top'\"\n       [horizontal-position]=\"'right'\"\n       [close-on-escape] =\"true\"\n       [background-color]=\"'red'\"\n       [auto-dismiss-msg]=\"false\"\n       [auto-dismiss-msg-interval]=\"4000\">\n       <ng-template #amexioNotificationTemp let-data=\"data\" >\n         <amexio-row>\n           <amexio-column size=\"1\">\n             <amexio-image [icon-class]=\"'\tfa fa-times-circle-o'\" style=\"font-size: 25px;\">\n             </amexio-image> &nbsp;&nbsp;\n           </amexio-column>\n           <amexio-column size=\"11\">\n             <amexio-label *ngIf=\"_notificationService.notificationTitle\" size=\"small-bold\" font-color=\"white\" >{{_notificationService.notificationTitle}}</amexio-label><br/>\n             <ng-container *ngFor=\"let obj of  data.data; let index= index\">\n               <amexio-label font-color=\"black\" >{{index+1}}) {{obj.text}}</amexio-label><br/>\n             </ng-container>\n           </amexio-column>\n         </amexio-row>\n       </ng-template>\n     </amexio-notification>\n   </ng-container>\n   \n    \n    <ng-container *ngIf=\"_notificationService.showNotification\">\n      <amexio-notification\n        [data]=\"_notificationService.notificationData\"\n        [vertical-position]=\"'top'\"\n        [horizontal-position]=\"'right'\"\n        [close-on-escape] =\"true\"\n        [background-color]=\"_notificationService.notificationColor\"\n        [auto-dismiss-msg]=\"true\"\n        [auto-dismiss-msg-interval]=\"3000\">\n      </amexio-notification>\n    </ng-container>\n    \n  ",
        styles: [
            "\n      .custom-style {\n      }\n    "
        ]
    })
], CanvasNotificationComponent);
exports.CanvasNotificationComponent = CanvasNotificationComponent;
