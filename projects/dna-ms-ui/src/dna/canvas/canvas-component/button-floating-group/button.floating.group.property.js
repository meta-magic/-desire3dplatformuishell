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
var ButtonFloatGroupPropertyComponent = (function () {
    function ButtonFloatGroupPropertyComponent() {
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
            },
            {
                type: 'Center',
                value: 'center'
            },
            {
                type: 'Bottom',
                value: 'bottom'
            }
        ];
        this.horiPositionData = [
            {
                type: 'Left',
                value: 'left'
            },
            {
                type: 'Center',
                value: 'center'
            },
            {
                type: 'Right',
                value: 'right'
            }
        ];
    }
    // THIS METHOD IS USED FOR SET BUTTON STYLE CIRCLE/SQUARE
    ButtonFloatGroupPropertyComponent.prototype.onBlockClick = function (data) {
        if (data.value == 'square') {
            this.squareBtn = true;
        }
        else {
            this.squareBtn = false;
            this.componentInstance.properties.label = '';
        }
    };
    //THIS METHOD IS USED FOR SELECT VERTICAL POSITION
    ButtonFloatGroupPropertyComponent.prototype.onVerticalPosition = function (data) {
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
    ButtonFloatGroupPropertyComponent.prototype.onHorizontalPosition = function (data) {
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
    ButtonFloatGroupPropertyComponent.prototype.positionClick = function (event) {
        if (event.value == 'relative') {
            this.showPositionField = false;
            this.componentInstance.properties.relative = true;
        }
        else if (event.value == 'absolute') {
            this.showPositionField = true;
            this.componentInstance.properties.relative = false;
            var documents = document.getElementById('canvasLeftSideColumn');
            if (documents) {
                var defaultWidth = 5;
                var width = 0;
                var actualWidth = 0;
                actualWidth = window.innerWidth % documents.offsetWidth + defaultWidth;
                this.componentInstance.properties.positionLeft = actualWidth + '%';
            }
        }
    };
    ButtonFloatGroupPropertyComponent.prototype.ngOnInit = function () { };
    ButtonFloatGroupPropertyComponent.prototype.propertyValidation = function () {
        this.componentInstance._eventHndl.componentValidation(this.componentInstance);
    };
    return ButtonFloatGroupPropertyComponent;
}());
ButtonFloatGroupPropertyComponent = __decorate([
    core_1.Component({
        selector: 'button-group-float-property',
        template: "\n            <ng-container *ngIf=\"componentInstance\">\n\n              <amexio-text-input field-label=\"Name\" [(ngModel)]=\"componentInstance.properties.name\"\n                                 (onBlur)=\"propertyValidation()\"\n                                 name=\"componentInstance.properties.name\"\n                                 place-holder=\"enter name\">\n              </amexio-text-input>\n\n              <!-- Block Property missing from AMEXIO -->\n            <!--  <amexio-dropdown [(ngModel)]=\"componentInstance.properties.blockName\"\n                               [place-holder]=\"'Block'\"\n                               [field-label]=\"'Button Block'\"\n                               [data]=\"btnBlockData\"\n                               (onSingleSelect)=\"onBlockClick($event)\"\n                               [display-field]=\"'type'\"\n                               [value-field]=\"'value'\">\n              </amexio-dropdown>-->\n\n              <ng-container *ngIf=\"squareBtn\">\n                <amexio-text-input field-label=\"Label\" [(ngModel)]=\"componentInstance.properties.label\"\n                                   name=\"componentInstance.properties.label\"\n                                   place-holder=\"enter label\">\n                </amexio-text-input>\n              </ng-container>\n\n              <amexio-dropdown [(ngModel)]=\"componentInstance.properties.type\"\n                               [place-holder]=\"'Type'\"\n                               [field-label]=\"'Button Type'\"\n                               [data]=\"typeData\"\n                               [display-field]=\"'type'\"\n                               [value-field]=\"'value'\">\n              </amexio-dropdown>\n              <amexio-text-input field-label=\"Icon\" [(ngModel)]=\"componentInstance.properties.iconClass\"\n                                 name=\"componentInstance.properties.iconClass\"\n                                 place-holder=\"icon\">\n              </amexio-text-input>\n\n              <amexio-radio-group\n                [field-label]=\"'Position'\"\n                [(ngModel)]=\"componentInstance.properties.relative\"\n                name=\"componentInstance.properties.relative\"\n                [display-field]=\"'type'\"\n                [value-field]=\"'value'\"\n                [horizontal]=\"true\"\n                [data]=\"relAbsPositionData\"\n                [default-value]=\"'relative'\"\n                (onSelection)=\"positionClick($event)\">\n              </amexio-radio-group>\n\n\n              <ng-container *ngIf=\"showPositionField\">\n\n\n                <amexio-dropdown [(ngModel)]=\"componentInstance.properties.verticalPosition\"\n                                 [place-holder]=\"'Vertical Position'\"\n                                 [field-label]=\"'Vertical Position'\"\n                                 [data]=\"positionData\"\n                                 (onSingleSelect)=\"onVerticalPosition($event)\"\n                                 [display-field]=\"'type'\"\n                                 [value-field]=\"'value'\">\n                </amexio-dropdown>\n\n                <ng-container *ngIf=\"enableVerticalPTop\">\n                  <amexio-text-input field-label=\"Position Top\" [(ngModel)]=\"componentInstance.properties.positionTop\"\n                                     name=\"componentInstance.properties.positionTop\"\n                                     place-holder=\"Position Top\">\n                  </amexio-text-input>\n                </ng-container>\n                <ng-container *ngIf=\"enableVerticalPBottom\">\n                  <amexio-text-input field-label=\"Position Bottom\" [(ngModel)]=\"componentInstance.properties.positionBottom\"\n                                     name=\"componentInstance.properties.positionBottom\"\n                                     place-holder=\"Position Bottom\">\n                  </amexio-text-input>\n                </ng-container>\n\n                <amexio-dropdown [(ngModel)]=\"componentInstance.properties.horizontalPosition\"\n                                 [place-holder]=\"'Horizontal Position'\"\n                                 [field-label]=\"'Horizontal Position'\"\n                                 [data]=\"horiPositionData\"\n                                 (onSingleSelect)=\"onHorizontalPosition($event)\"\n                                 [display-field]=\"'type'\"\n                                 [value-field]=\"'value'\">\n                </amexio-dropdown>\n                <ng-container *ngIf=\"enableHorizontalPRight\">\n                  <amexio-text-input field-label=\"Position Right\" [(ngModel)]=\"componentInstance.properties.positionRight\"\n                                     name=\"componentInstance.properties.positionRight\"\n                                     place-holder=\"Position Right\">\n                  </amexio-text-input>\n                </ng-container>\n                <ng-container *ngIf=\"enableHorizontalPLeft\">\n                  <amexio-text-input field-label=\"Position Left\" [(ngModel)]=\"componentInstance.properties.positionLeft\"\n                                     name=\"componentInstance.properties.positionLeft\"\n                                     place-holder=\"Position Left\">\n                  </amexio-text-input>\n                </ng-container>\n                <amexio-checkbox [field-label]=\"'Disabled'\"\n                                 [(ngModel)]=\"componentInstance.properties.disabled\">\n                </amexio-checkbox>\n              </ng-container>\n            </ng-container>\n        \n    <!--  <amexio-tab [icon]=\"componentInstance._eventHndl._sharedDataService.behaviourIcon\">\n        <ng-container *ngIf=\"componentInstance\">\n          <show-event-list [componentInstance]=\"componentInstance\"></show-event-list>\n        </ng-container>\n      </amexio-tab>-->\n  "
    })
], ButtonFloatGroupPropertyComponent);
exports.ButtonFloatGroupPropertyComponent = ButtonFloatGroupPropertyComponent;
