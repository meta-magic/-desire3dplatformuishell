"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
/**
 * Created by pratik on 23/2/18.
 */
var core_1 = require("@angular/core");
var FileUploadPropertyComponent = (function () {
    function FileUploadPropertyComponent() {
        this.enableMultipleFile = false;
    }
    FileUploadPropertyComponent.prototype.ngOnInit = function () { };
    FileUploadPropertyComponent.prototype.propertyValidation = function () {
        this.componentInstance._eventHndl.componentValidation(this.componentInstance);
    };
    FileUploadPropertyComponent.prototype.toggle = function () {
        /* this.enableMultipleFile = !this.enableMultipleFile;
        if (this.enableMultipleFile) {
          this.componentInstance.properties.multipleFile = '*';
        } else {
          this.componentInstance.properties.multipleFile = '';
        }*/
    };
    return FileUploadPropertyComponent;
}());
FileUploadPropertyComponent = __decorate([
    core_1.Component({
        selector: 'file-uplpoad-property',
        template: "    \n    <ng-container *ngIf=\"componentInstance\">\n\n         <amexio-text-input field-label=\"Name\" [(ngModel)]=\"componentInstance.properties.name\"\n                            name=\"componentInstance.properties.name\"\n                            place-holder=\"enter name\"\n                            icon-feedback=\"true\"\n                            (onBlur)=\"propertyValidation()\">\n         </amexio-text-input>\n         <amexio-text-input field-label=\"Field Label\" [(ngModel)]=\"componentInstance.properties.fieldLabel\"\n                            name=\"componentInstance.properties.fieldLabel\"\n                            place-holder=\"field label\"\n                            icon-feedback=\"false\" [allow-blank]=\"true\">\n         </amexio-text-input>\n\n         <amexio-text-input field-label=\"File Type\" [(ngModel)]=\"componentInstance.properties.fileType\"\n                            name=\"componentInstance.properties.fileType\"\n                            place-holder=\"file type\"\n                            icon-feedback=\"false\" [allow-blank]=\"true\">\n         </amexio-text-input> \n  \n        <amexio-text-input field-label=\"Parameter Name\" [(ngModel)]=\"componentInstance.properties.requestParamName\"\n                            name=\"componentInstance.properties.requestParamName\"\n                            place-holder=\"parameter name\"\n                            icon-feedback=\"false\" [allow-blank]=\"true\">\n         </amexio-text-input> \n  \n          <amexio-text-input field-label=\"Http URL\" [(ngModel)]=\"componentInstance.properties.httpUrl\"\n                            name=\"componentInstance.properties.httpUrl\"\n                            place-holder=\"url\"\n                            icon-feedback=\"false\" [allow-blank]=\"true\">\n         </amexio-text-input>\n  \n        <amexio-text-input field-label=\"Http Method\" [(ngModel)]=\"componentInstance.properties.httpMethod\"\n                            name=\"componentInstance.properties.httpMethod\"\n                            place-holder=\"Method\"\n                            icon-feedback=\"false\" [allow-blank]=\"true\">\n         </amexio-text-input>\n  \n  \n\n         <amexio-checkbox [field-label]=\"'Allow Multiple Files'\"\n                          [(ngModel)]=\"componentInstance.properties.multipleFile\" (onSelection)=\"toggle()\">\n         </amexio-checkbox>\n\n         <amexio-checkbox [field-label]=\"'Droppable'\"\n                          [(ngModel)]=\"componentInstance.properties.droppable\">\n         </amexio-checkbox>\n        \n\n       </ng-container>\n  \n    <!-- <amexio-tab [icon]=\"componentInstance._eventHndl._sharedDataService.behaviourIcon\">\n       <ng-container *ngIf=\"componentInstance\">\n         <show-event-list [componentInstance]=\"componentInstance\"></show-event-list>\n       </ng-container>\n     </amexio-tab>-->\n "
    })
], FileUploadPropertyComponent);
exports.FileUploadPropertyComponent = FileUploadPropertyComponent;
