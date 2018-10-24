"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
/**
 * Created by sagar on 20/3/18.
 */
var core_1 = require("@angular/core");
var ButtonFloatPropertyComponent = (function () {
    function ButtonFloatPropertyComponent() {
        this.squareBtn = false;
        this.enableVerticalPTop = true;
        this.enableHorizontalPLeft = true;
        this.relAbsPositionData = [
            {
                type: 'Absolute',
                value: 'absolute'
            },
            {
                type: 'Relative',
                value: 'relative'
            }
        ];
        this.typeData = [
            {
                type: 'Green',
                value: 'green'
            },
            {
                type: 'Red',
                value: 'red'
            },
            {
                type: 'Yellow',
                value: 'yellow'
            },
            {
                type: 'Theme color',
                value: 'theme-color'
            }
        ];
        this.btnBlockData = [
            {
                type: 'Circle',
                value: 'circle'
            },
            {
                type: 'Square',
                value: 'square'
            }
        ];
        this.positionData = [
            {
                type: 'Top',
                value: 'top'
            }
            // ,
            // {
            //   type: 'Center',
            //   value: 'center'
            // },
            // {
            //   type: 'Bottom',
            //   value: 'bottom'
            // }
        ];
        this.horiPositionData = [
            {
                type: 'Left',
                value: 'left'
            }
            // ,
            // {
            //   type: 'Center',
            //   value: 'center'
            // },
            // {
            //   type: 'Right',
            //   value: 'right'
            // }
        ];
    }
    // THIS METHOD IS USED FOR SET BUTTON STYLE CIRCLE/SQUARE
    ButtonFloatPropertyComponent.prototype.onBlockClick = function (data) {
        if (data.value == 'square') {
            this.squareBtn = true;
        }
        else {
            this.squareBtn = false;
            this.componentInstance.properties.label = '';
        }
    };
    //THIS METHOD IS USED FOR SELECT VERTICAL POSITION
    ButtonFloatPropertyComponent.prototype.onVerticalPosition = function (data) {
        if (data.value == 'bottom') {
            this.enableVerticalPBottom = true;
            this.enableVerticalPTop = false;
        }
        else if (data.value == 'top') {
            this.enableVerticalPTop = true;
            this.enableVerticalPBottom = false;
        }
    };
    //THIS METHOD IS USED FOR SELECT HORIZONTAL POSITION
    ButtonFloatPropertyComponent.prototype.onHorizontalPosition = function (data) {
        if (data.value == 'left') {
            this.enableHorizontalPLeft = true;
            this.enableHorizontalPRight = false;
        }
        else if (data.value == 'right') {
            this.enableHorizontalPRight = true;
            this.enableHorizontalPLeft = false;
        }
    };
    //THIS METHOD USED FOR POSITION
    ButtonFloatPropertyComponent.prototype.positionClick = function (event) {
        if (event.value == 'relative') {
            this.showPositionField = false;
            this.componentInstance.properties.relative = true;
            this.componentInstance.hiddenProperties.positionLeft = '0%';
        }
        else if (event.value == 'absolute') {
            this.componentInstance.properties.relative = false;
            this.showPositionField = true;
            var documents = document.getElementById('canvasLeftSideColumn');
            if (documents) {
                var defaultWidth = 5;
                var width = 0;
                var actualWidth = 0;
                actualWidth = window.innerWidth % documents.offsetWidth + defaultWidth;
                this.componentInstance.properties.positionLeft = actualWidth + '%';
                this.componentInstance.hiddenProperties.positionLeft = '23%';
                this.componentInstance.hiddenProperties.positionTop = '16%';
            }
        }
    };
    ButtonFloatPropertyComponent.prototype.onLeftPositionNumberClick = function (event) {
        if (!(this.componentInstance.hiddenProperties.positionLeft.substring(0, this.componentInstance.hiddenProperties.positionLeft.length - 1) > 100)) {
            this.componentInstance.hiddenProperties.positionLeft =
                22 + this.componentInstance.properties.positionLeft / 2 + '%';
        }
    };
    ButtonFloatPropertyComponent.prototype.onTopPositionNumberClick = function (event) {
        if (!(this.componentInstance.hiddenProperties.positionTop.substring(0, this.componentInstance.hiddenProperties.positionTop.length - 1) > 100)) {
            this.componentInstance.hiddenProperties.positionTop =
                17 + this.componentInstance.properties.positionTop / 2 + '%';
        }
    };
    ButtonFloatPropertyComponent.prototype.ngOnInit = function () { };
    ButtonFloatPropertyComponent.prototype.propertyValidation = function () {
        this.componentInstance._eventHndl.componentValidation(this.componentInstance);
    };
    ButtonFloatPropertyComponent.prototype.onIconOpenWindow = function () {
        this.iconWindow = !this.iconWindow;
    };
    ButtonFloatPropertyComponent.prototype.getSelectedIcon = function (icon) {
        this.componentInstance.properties.iconClass = icon;
        this.onIconOpenWindow();
    };
    return ButtonFloatPropertyComponent;
}());
ButtonFloatPropertyComponent = __decorate([
    core_1.Component({
        selector: 'button-float-property',
        template: "    \n            <ng-container *ngIf=\"componentInstance\">\n\n          <amexio-text-input field-label=\"Name\" [(ngModel)]=\"componentInstance.properties.name\"\n                             (onBlur)=\"propertyValidation()\"\n                             name=\"componentInstance.properties.name\"\n                             place-holder=\"enter name\">\n          </amexio-text-input>\n\n          <amexio-dropdown [(ngModel)]=\"componentInstance.properties.blockName\"\n          [place-holder]=\"'Block'\"\n          [field-label]=\"'Button Block'\"\n          [data]=\"btnBlockData\"\n          (onSingleSelect)=\"onBlockClick($event)\"\n          [display-field]=\"'type'\"\n          [value-field]=\"'value'\">\n          </amexio-dropdown>\n\n          <ng-container *ngIf=\"squareBtn\">\n            <amexio-text-input field-label=\"Label\" [(ngModel)]=\"componentInstance.properties.label\"\n            name=\"componentInstance.properties.label\"\n            place-holder=\"enter label\">\n            </amexio-text-input>\n          </ng-container>\n\n          <amexio-dropdown [(ngModel)]=\"componentInstance.properties.type\"\n          [place-holder]=\"'Type'\"\n          [field-label]=\"'Button Type'\"\n          [data]=\"typeData\"\n          [display-field]=\"'type'\"\n          [value-field]=\"'value'\">\n          </amexio-dropdown>\n          \n          <amexio-radio-group\n           [field-label]=\"'Position'\"\n           [name]=\"'position'\"\n            [display-field]=\"'type'\"\n            [value-field]=\"'value'\"\n            [horizontal]=\"true\"\n            [data]=\"relAbsPositionData\"\n            [default-value]=\"'relative'\"\n            (onSelection)=\"positionClick($event)\">\n          </amexio-radio-group>\n\n              <amexio-button [block]=\"true\" label=\"Attach Icon\" size=\"medium\" type=\"theme-color\" (onClick)=\"onIconOpenWindow()\"></amexio-button>\n             \n         \n          <ng-container *ngIf=\"showPositionField\">\n\n\n    <amexio-dropdown [(ngModel)]=\"componentInstance.properties.verticalPosition\"\n    [place-holder]=\"'Vertical Position'\"\n    [field-label]=\"'Vertical Position'\"\n    [data]=\"positionData\"\n    (onSingleSelect)=\"onVerticalPosition($event)\"\n    [display-field]=\"'type'\"\n    [value-field]=\"'value'\">\n    </amexio-dropdown>\n\n    <ng-container *ngIf=\"enableVerticalPTop\">\n    <amexio-number-input field-label=\"Position Top\" [(ngModel)]=\"componentInstance.properties.positionTop\"\n    name=\"componentInstance.properties.positionTop\"\n    place-holder=\"Position Top\"\n    [min-value]=\"0\"\n    [error-msg] =\"'Please enter position height'\"\n    [min-error-msg]=\"'position height can not be less than 1'\"\n    [max-error-msg]=\"'position height can not be greater than 100'\"\n    [enable-popover]=\"true\"\n    [max-value]=\"100\"\n    (ngModelChange)=\"onTopPositionNumberClick($event)\"\n    >\n    </amexio-number-input>\n    </ng-container>\n    <ng-container *ngIf=\"enableVerticalPBottom\">\n    <amexio-text-input field-label=\"Position Bottom\" [(ngModel)]=\"componentInstance.properties.positionBottom\"\n    name=\"componentInstance.properties.positionBottom\"\n    place-holder=\"Position Bottom\">\n    </amexio-text-input>\n    </ng-container>\n\n    <amexio-dropdown [(ngModel)]=\"componentInstance.properties.horizontalPosition\"\n    [place-holder]=\"'Horizontal Position'\"\n    [field-label]=\"'Horizontal Position'\"\n    [data]=\"horiPositionData\"\n    (onSingleSelect)=\"onHorizontalPosition($event)\"\n    [display-field]=\"'type'\"\n    [value-field]=\"'value'\">\n    </amexio-dropdown>\n    <ng-container *ngIf=\"enableHorizontalPRight\">\n    <amexio-text-input field-label=\"Position Right\" [(ngModel)]=\"componentInstance.properties.positionRight\"\n    name=\"componentInstance.properties.positionRight\"\n    place-holder=\"Position Right\">\n    </amexio-text-input>\n    </ng-container>\n    <ng-container *ngIf=\"enableHorizontalPLeft\">\n    <amexio-number-input  field-label=\"Position Left\" \n    [(ngModel)]=\"componentInstance.properties.positionLeft\"\n    name=\"componentInstance.properties.positionLeft\"\n    place-holder=\"Position Left\"\n    [min-value]=\"0\"\n    [error-msg] =\"'Please enter position width'\"\n    [min-error-msg]=\"'position width can not be less than 1'\"\n    [max-error-msg]=\"'position width can not be greater than 100'\"\n    [enable-popover]=\"true\"\n    [max-value]=\"100\"\n    (ngModelChange)=\"onLeftPositionNumberClick($event)\"\n    >\n    </amexio-number-input>\n    \n    </ng-container>\n            <amexio-checkbox [field-label]=\"'Disabled'\"\n                             [(ngModel)]=\"componentInstance.properties.disabled\">\n            </amexio-checkbox>\n    </ng-container>\n          </ng-container>\n        \n \n     <!-- <amexio-tab [icon]=\"componentInstance._eventHndl._sharedDataService.behaviourIcon\">\n        <ng-container *ngIf=\"componentInstance\">\n          <show-event-list [componentInstance]=\"componentInstance\"></show-event-list>\n        </ng-container>\n      </amexio-tab>\n    -->\n\n    <ng-container *ngIf=\"iconWindow\">\n      <canvas-icon-search [selectedIcon]=\"componentInstance.properties.iconClass\" [componentInstance]=\"componentInstance\" [iconWindow]=\"iconWindow\" (getSelectedIcon)=\"getSelectedIcon($event)\"></canvas-icon-search>\n    </ng-container>\n  "
    })
], ButtonFloatPropertyComponent);
exports.ButtonFloatPropertyComponent = ButtonFloatPropertyComponent;
