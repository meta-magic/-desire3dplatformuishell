"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
/**
 * Created by dattaram on 28/3/18.
 */
var core_1 = require("@angular/core");
var CanvasIconSearchComponent = (function () {
    function CanvasIconSearchComponent(_httpClient) {
        this._httpClient = _httpClient;
        this.getSelectedIcon = new core_1.EventEmitter();
        this.iconSizeList = [];
        this.getIconData();
    }
    CanvasIconSearchComponent.prototype.ngOnInit = function () {
        this.iconSizeList = [
            {
                iconSizeName: 'fa 2x'
            },
            {
                iconSizeName: 'fa 3x'
            },
            {
                iconSizeName: 'fa 4x'
            },
            {
                iconSizeName: 'fa 5x'
            }
        ];
        if (this.selectedIcon) {
            this.iconSize = this.selectedIcon.slice(-5);
            this.selectedIcon = this.selectedIcon.slice(0, -5);
        }
        else {
            this.iconSize = 'fa 2x';
        }
    };
    CanvasIconSearchComponent.prototype.onFontSizeClick = function (data) {
        if (data.iconName && this.selectedIcon) {
            this.selectedIcon.substring(0, this.selectedIcon.length - 4);
        }
    };
    //
    CanvasIconSearchComponent.prototype.onSearchIconChange = function (event) {
        var _this = this;
        this.finalIconList = [];
        if (event == '' || !event) {
            this.finalIconList = this.iconList;
        }
        else {
            var keyword = event.target.value;
            if (keyword != null && keyword != ' ') {
                var search_term_1 = keyword.toLowerCase();
                this.iconList.forEach(function (item) {
                    if (item != null) {
                        if (item['iconName'].toLowerCase().includes(search_term_1)) {
                            _this.finalIconList.push(item);
                        }
                        // if (item['iconName'].toLowerCase().indexOf(' ' + search_term)) {
                        //   this.finalIconList.push(item);
                        // }
                    }
                });
            }
        }
    };
    CanvasIconSearchComponent.prototype.closeIconWindow = function () {
        this.iconWindow = false;
    };
    CanvasIconSearchComponent.prototype.iconSelect = function (iconName) {
        this.selectedIcon = iconName;
    };
    CanvasIconSearchComponent.prototype.getIconData = function () {
        var _this = this;
        var responseData;
        this._httpClient.get('assets/dna/icon/faicon.json').subscribe(function (response) {
            responseData = response;
        }, function (err) { }, function () {
            _this.iconList = responseData.data;
            _this.finalIconList = responseData.data;
        });
    };
    CanvasIconSearchComponent.prototype.onIconSave = function () {
        this.selectedIcon = this.selectedIcon + ' ' + this.iconSize;
        this.getSelectedIcon.emit(this.selectedIcon);
    };
    return CanvasIconSearchComponent;
}());
__decorate([
    core_1.Input()
], CanvasIconSearchComponent.prototype, "componentInstance");
__decorate([
    core_1.Input()
], CanvasIconSearchComponent.prototype, "iconWindow");
__decorate([
    core_1.Input()
], CanvasIconSearchComponent.prototype, "ischild");
__decorate([
    core_1.Input()
], CanvasIconSearchComponent.prototype, "key");
__decorate([
    core_1.Output()
], CanvasIconSearchComponent.prototype, "getSelectedIcon");
__decorate([
    core_1.Input()
], CanvasIconSearchComponent.prototype, "selectedIcon");
CanvasIconSearchComponent = __decorate([
    core_1.Component({
        selector: 'canvas-icon-search',
        template: "\n    <amexio-window [show-window]=\"iconWindow\"\n                   type=\"window\" [closable]=\"true\" [footer]=\"true\" (close)=\"closeIconWindow()\">\n      <amexio-header>\n        Icons\n      </amexio-header>\n      <amexio-body>\n        <amexio-row>\n          <amexio-column [size]=\"12\">\n            <amexio-card  [header]=\"false\"\n                          [footer]=\"true\"\n                          [footer-align]=\"'left'\"[body-height]=\"55\">\n              <amexio-body>\n                <amexio-row>\n                  <amexio-column size=\"1\" *ngFor=\"let iconObject of finalIconList\" >\n                    <div class=\"select-icon\" (click)=\"iconSelect(iconObject.iconName)\">\n                      <amexio-image\n                                    [icon-class]=\"iconObject.iconName+' fa-2x'\">\n                      </amexio-image>\n                    </div>\n                  </amexio-column>\n                </amexio-row>\n              </amexio-body>\n              <amexio-action>\n              <amexio-row>\n              <amexio-column size=\"4\">\n              <amexio-text-input  [(ngModel)]=\"selectedIcon\"\n                                       place-holder=\"Search icon\" (keyup)=\"onSearchIconChange($event)\" >\n                    </amexio-text-input>\n              </amexio-column>\n              <amexio-column size=\"4\">\n              <amexio-dropdown [(ngModel)]=\"iconSize\"\n              [place-holder]=\"'Choose size'\"\n              name=\"iconSize\"\n               [data]=\"iconSizeList\"\n              [readonly]=\"true\"\n              [display-field]=\"'iconSizeName'\"\n              [value-field]=\"'iconSizeName'\">\n              </amexio-dropdown>\n              </amexio-column>\n\n              </amexio-row>\n              </amexio-action>\n            </amexio-card>\n          </amexio-column>\n        </amexio-row>\n\n      </amexio-body>\n      <amexio-action>\n            <amexio-button [label]=\"'Cancel'\" [type]=\"'secondary'\" (onClick)=\"closeIconWindow();\"></amexio-button>\n            <amexio-button [label]=\"'Select'\" [type]=\"'primary'\" (onClick)=\"onIconSave();\"></amexio-button>\n\n      </amexio-action>\n    </amexio-window>\n\n  "
    })
], CanvasIconSearchComponent);
exports.CanvasIconSearchComponent = CanvasIconSearchComponent;
