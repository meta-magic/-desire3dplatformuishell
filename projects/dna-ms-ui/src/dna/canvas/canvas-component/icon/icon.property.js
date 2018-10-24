"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var IconPropertyComponent = (function () {
    function IconPropertyComponent(_httpClient) {
        this._httpClient = _httpClient;
        this.iconId = '1';
        this.isFontIcon = true;
        this.iconRadioGroupData = [
            {
                id: '1',
                name: 'Font Awesome'
            },
            {
                id: '2',
                name: 'Material Icon'
            }
        ];
    }
    //ON RADIO CLICK
    IconPropertyComponent.prototype.onRadioCheck = function (data) {
        this.iconId = data.id;
        if (data.id == '1') {
            this.isFontIcon = true;
            this.componentInstance.properties.mda = '';
            this.componentInstance.properties.iconClass = 'fa fa-user';
        }
        else {
            this.isFontIcon = false;
            this.componentInstance.properties.mda = 'cloud';
            this.componentInstance.properties.iconClass = 'material-icons';
        }
    };
    IconPropertyComponent.prototype.propertyValidation = function () {
        this.componentInstance._eventHndl.componentValidation(this.componentInstance);
    };
    IconPropertyComponent.prototype.ngOnInit = function () { };
    IconPropertyComponent.prototype.onIconOpenWindow = function () {
        this.iconWindow = !this.iconWindow;
        this.getIconData();
    };
    IconPropertyComponent.prototype.selectRadio = function (event) {
        this.iconId = event.id;
        this.getIconData();
    };
    IconPropertyComponent.prototype.getIconData = function () {
        var _this = this;
        var responseData;
        if (this.iconId == '1') {
            this._httpClient.get('assets/dna/icon/faicon.json').subscribe(function (response) {
                responseData = response;
            }, function (err) { }, function () {
                _this.iconList = responseData.data;
            });
        }
        else {
            this._httpClient.get('assets/dna/icon/materialicon.json').subscribe(function (response) {
                responseData = response;
            }, function (err) { }, function () {
                _this.iconList = responseData.data;
            });
        }
    };
    IconPropertyComponent.prototype.iconSelect = function (iconName) {
        this.selectedIcon = iconName;
    };
    IconPropertyComponent.prototype.closeIconWindow = function () {
        this.iconWindow = false;
    };
    IconPropertyComponent.prototype.onIconSave = function () {
        if (this.iconId == '1') {
            this.componentInstance.properties.iconClass = '';
            this.componentInstance.properties.mda = '';
            this.componentInstance.properties.iconClass = this.selectedIcon;
        }
        else {
            this.componentInstance.properties.iconClass = 'material-icons';
            this.componentInstance.properties.mda = '';
            this.componentInstance.properties.mda = this.selectedIcon;
        }
        this.closeIconWindow();
    };
    return IconPropertyComponent;
}());
IconPropertyComponent = __decorate([
    core_1.Component({
        selector: 'icon-property',
        template: "\n    \n  <ng-container *ngIf=\"componentInstance\">\n\n              <amexio-text-input field-label=\"Name\" [(ngModel)]=\"componentInstance.properties.name\"\n                                 name=\"componentInstance.properties.name\"\n                                 place-holder=\"enter name\"\n                                 icon-feedback=\"true\"\n                                 (onBlur)=\"propertyValidation()\">\n              </amexio-text-input>\n              <br>\n              <amexio-button [block]=\"true\" label=\"Search Icon\" size=\"medium\" type=\"primary\" (onClick)=\"onIconOpenWindow()\"></amexio-button>\n            </ng-container>\n        \n      <!--<amexio-tab [icon]=\"componentInstance._eventHndl._sharedDataService.behaviourIcon\">\n        <ng-container *ngIf=\"componentInstance\">\n          <show-event-list [componentInstance]=\"componentInstance\"></show-event-list>\n        </ng-container>\n      </amexio-tab>-->\n   \n\n\n    <amexio-window [show-window]=\"iconWindow\"\n                   type=\"window\" [closable]=\"true\" [footer]=\"true\" (close)=\"closeIconWindow()\">\n      <amexio-header>\n        Icons\n      </amexio-header>\n      <amexio-body>\n        <amexio-row>\n          <amexio-column [size]=\"12\">\n            <amexio-card >\n              <amexio-body>\n                <amexio-row>\n                  <amexio-column size=\"12\">\n                    <amexio-radio-group \n                                        name =\"icon\"\n                                        [display-field]=\"'name'\"\n                                        [value-field]=\"'id'\"\n                                        [horizontal]=\"true\"\n                                        [data]=\"iconRadioGroupData\"\n                                        [default-value]=\"iconId\"\n                                        (onSelection)=\"selectRadio($event)\">\n                    </amexio-radio-group>\n                  </amexio-column>\n                </amexio-row>\n              </amexio-body>\n            </amexio-card>\n          </amexio-column>\n        </amexio-row>\n        <amexio-row>\n          <amexio-column [size]=\"12\">\n            <amexio-card  [header]=\"false\"\n                          [footer]=\"true\"\n                          [footer-align]=\"'left'\"[body-height]=\"45\">\n              <amexio-body>\n                <amexio-row>\n                  <amexio-column size=\"1\" *ngFor=\"let iconObject of iconList\" >\n                    <div class=\"select-icon\">\n                      <ng-container *ngIf=\"iconId == '1'\">\n                        <amexio-image (onClick)=\"iconSelect(iconObject.iconName)\"\n                          [icon-class]=\"iconObject.iconName\">\n                        </amexio-image>\n                      </ng-container>\n                      <ng-container *ngIf=\"iconId == '2'\">\n                        <amexio-image\n                          [icon-class]=\"'material-icons'\"\n                          (onClick)=\"iconSelect(iconObject.iconName)\"\n                          [mda]=\"iconObject.iconName\">\n                        </amexio-image>\n                     \n                      </ng-container>\n                      \n                    </div>\n                  </amexio-column>\n                </amexio-row>\n              </amexio-body>\n              <amexio-action>\n                <amexio-text-input [has-label]=\"false\" [(ngModel)]=\"selectedIcon\"\n                                   place-holder=\"icon\">\n                </amexio-text-input>\n              </amexio-action>\n            </amexio-card>\n          </amexio-column>\n        </amexio-row>\n\n      </amexio-body>\n      <amexio-action>\n        <amexio-button [label]=\"'Cancel'\" [type]=\"'secondary'\" (onClick)=\"closeIconWindow();\"></amexio-button>\n        <amexio-button [label]=\"'Save'\" [type]=\"'primary'\" (onClick)=\"onIconSave();\"></amexio-button>\n\n      </amexio-action>\n    </amexio-window>\n\n\n  "
    })
], IconPropertyComponent);
exports.IconPropertyComponent = IconPropertyComponent;
