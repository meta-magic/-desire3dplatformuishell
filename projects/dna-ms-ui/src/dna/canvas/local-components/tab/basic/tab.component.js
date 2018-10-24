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
var tab_pill_component_1 = require("./tab.pill.component");
var TabComponent = (function () {
    function TabComponent(render) {
        this.render = render;
        this.onClick = new core_1.EventEmitter();
        this.showprev = false;
        this.shownext = false;
    }
    TabComponent.prototype.ngOnInit = function () {
        //render tab pills from binded input
    };
    TabComponent.prototype.ngAfterViewInit = function () {
        if (this.tabs.nativeElement.scrollWidth > this.tabs.nativeElement.clientWidth) {
            this.shownext = true;
        }
    };
    TabComponent.prototype.ngAfterContentInit = function () { };
    TabComponent.prototype.onTabClick = function (tab) {
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
    TabComponent.prototype.next = function () {
        var nxt = this.tabs.nativeElement;
        nxt.scrollLeft = nxt.scrollLeft + 200;
        if (nxt.scrollWidth - nxt.offsetWidth - nxt.scrollLeft <= 0) {
            this.shownext = false;
        }
        this.showprev = true;
    };
    TabComponent.prototype.previous = function () {
        var prev = this.tabs.nativeElement;
        prev.scrollLeft = prev.scrollLeft - 200;
        if (prev.scrollLeft == 0) {
            this.showprev = false;
        }
        this.shownext = true;
    };
    TabComponent.prototype.closeTab = function (tabNode) {
        var newTab = [];
        var tabs = this.tabs;
        var index = 0;
        var tabHighlightIndex = 0;
        this.tabPills.forEach(function (tab) {
            tab.active = false;
            if (tab.tabId == tabNode.tabId) {
                tabHighlightIndex = index;
            }
            if (tab.tabId != tabNode.tabId) {
                newTab.push(tab);
            }
            index++;
        });
        if (tabHighlightIndex == newTab.length) {
            tabHighlightIndex--;
        }
        this.activateTab(newTab[tabHighlightIndex].tabId);
        this.tabPills = newTab;
        if (this.tabPills.length == 1) {
            this.closable = false;
        }
    };
    TabComponent.prototype.activateTab = function (tabId) {
        var tabs = this.tabs;
        this.tabPills.forEach(function (tab) {
            tab.active = false;
            if (tab.tabId == tabId) {
                tab.active = true;
            }
        });
    };
    return TabComponent;
}());
__decorate([
    core_1.Input()
], TabComponent.prototype, "closable");
__decorate([
    core_1.Input()
], TabComponent.prototype, "position");
__decorate([
    core_1.Input()
], TabComponent.prototype, "tabPills");
__decorate([
    core_1.ViewChild('tab', { read: core_1.ElementRef })
], TabComponent.prototype, "tabs");
__decorate([
    core_1.ContentChildren(tab_pill_component_1.TabPill)
], TabComponent.prototype, "queryTabs");
__decorate([
    core_1.Output()
], TabComponent.prototype, "onClick");
__decorate([
    core_1.Input()
], TabComponent.prototype, "tabLocalData");
TabComponent = __decorate([
    core_1.Component({
        selector: 'tab-view',
        template: "\n    <div class=\"tabwrapper\">\n      <div *ngIf=\"showprev\" class=\"tabnavigation float-left\" (click)=\"previous()\"><i class=\"fa fa-angle-left fa-2x\" aria-hidden=\"true\"></i></div>\n      <div *ngIf=\"shownext\" class=\"tabnavigation float-right\" (click)=\"next()\"><i class=\"fa fa-angle-right  fa-2x\" aria-hidden=\"true\"></i></div>\n      <ul #tab class=\"tab\">\n        <li class=\"tablistitems\">\n          <div *ngFor=\"let tabnode of tabPills\"  class=\"tablink activetab\" [ngClass]=\"{'activetab':tabnode.active}\" (click)=\"onTabClick(tabnode)\">\n            <div class=\"table\">\n              <div class=\"tablerow\">\n                <div *ngIf=\"tabnode.iconClass\" class=\"tablecol\">\n                  <span class=\"{{tabnode.iconClass}}\"  aria-hidden=\"true\"></span>\n                </div>\n                <div class=\"tablecol\">\n                  {{tabnode.title}}\n                </div>\n                <div *ngIf=\"closable\" class=\"tablecol\" >\n                  <i class=\"fa fa-times\" aria-hidden=\"true\"></i>\n                </div>\n              </div>\n            </div>\n          </div>\n        </li>\n      </ul>\n    </div>\n\n\n    <div class=\"tabcontent\">\n      <ng-content></ng-content>\n    </div>\n\n\n  "
    })
], TabComponent);
exports.TabComponent = TabComponent;
