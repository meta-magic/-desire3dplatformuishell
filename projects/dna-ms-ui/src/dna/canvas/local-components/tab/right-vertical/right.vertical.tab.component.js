/**
 * Created by ketangote on 12/1/17.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var tab_pill_component_1 = require("../basic/tab.pill.component");
var VerticalRightTabComponent = (function () {
    function VerticalRightTabComponent(render) {
        this.render = render;
        this.onClick = new core_1.EventEmitter();
        this.showprev = false;
        this.shownext = false;
    }
    VerticalRightTabComponent.prototype.ngOnInit = function () {
        //render tab pills from binded input
    };
    VerticalRightTabComponent.prototype.ngAfterViewInit = function () {
        if (this.tabs.nativeElement.scrollWidth > this.tabs.nativeElement.clientWidth) {
            this.shownext = true;
        }
    };
    VerticalRightTabComponent.prototype.ngAfterContentInit = function () { };
    VerticalRightTabComponent.prototype.onTabClick = function (tab) {
        for (var i = 0; i < this.tabPills.length; i++) {
            if (this.tabPills[i] === tab) {
                this.tabPills[i]['active'] = true;
                this.onClick.emit(tab);
            }
            else {
                this.tabPills[i]['active'] = false;
            }
        }
        // this.content = tab.title;
    };
    VerticalRightTabComponent.prototype.next = function () {
        var nxt = this.tabs.nativeElement;
        nxt.scrollLeft = nxt.scrollLeft + 200;
        if (nxt.scrollWidth - nxt.offsetWidth - nxt.scrollLeft <= 0) {
            this.shownext = false;
        }
        this.showprev = true;
    };
    VerticalRightTabComponent.prototype.previous = function () {
        var prev = this.tabs.nativeElement;
        prev.scrollLeft = prev.scrollLeft - 200;
        if (prev.scrollLeft == 0) {
            this.showprev = false;
        }
        this.shownext = true;
    };
    return VerticalRightTabComponent;
}());
__decorate([
    core_1.Input()
], VerticalRightTabComponent.prototype, "closable");
__decorate([
    core_1.Input()
], VerticalRightTabComponent.prototype, "position");
__decorate([
    core_1.Input()
], VerticalRightTabComponent.prototype, "tabPills");
__decorate([
    core_1.ViewChild('tab', { read: core_1.ElementRef })
], VerticalRightTabComponent.prototype, "tabs");
__decorate([
    core_1.ContentChildren(tab_pill_component_1.TabPill)
], VerticalRightTabComponent.prototype, "queryTabs");
__decorate([
    core_1.Output()
], VerticalRightTabComponent.prototype, "onClick");
__decorate([
    core_1.Input()
], VerticalRightTabComponent.prototype, "tabLocalData");
VerticalRightTabComponent = __decorate([
    core_1.Component({
        selector: 'vertical-right-tab-view',
        template: "\n\n    <div class=\"table\">\n      <div class=\"tablerow\">\n        <div class=\"tablecol verticalalign-tabcontent\">\n          <div class=\"tabcontent\">\n            <ng-content></ng-content>\n          </div>\n        </div>\n\n        <div class=\"tablecol verticalalign-tabright\">\n          <div class=\"verticalnavtab verticalnavtab-right\">\n            <ul #tab>\n              <li *ngFor=\"let tabnode of tabPills\">\n                <div class=\"defaultnode\" [ngClass]=\"{'rightactivetab':tabnode.active}\"    (click)=\"onTabClick(tabnode)\">\n                  <span *ngIf=\"tabnode.iconClass\" [ngClass]=\"tabnode.iconClass\"  aria-hidden=\"true\"></span>\n                  <span>{{tabnode.title}}</span>\n                </div>\n              </li>\n            </ul>\n          </div>\n        </div>\n\n      </div>\n    </div>\n\n\n  "
    })
], VerticalRightTabComponent);
exports.VerticalRightTabComponent = VerticalRightTabComponent;
