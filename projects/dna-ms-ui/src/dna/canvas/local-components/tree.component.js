/**
 * Created by ketangote on 11/23/17.
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
var AmexioTreeViewComponentCanvas = (function () {
    function AmexioTreeViewComponentCanvas(cdf, http) {
        this.cdf = cdf;
        this.http = http;
        this.nodeClick = new core_1.EventEmitter();
        this.enablecheckbox = false;
        this.onTreeNodeChecked = new core_1.EventEmitter();
        this.onDrag = new core_1.EventEmitter();
    }
    AmexioTreeViewComponentCanvas.prototype.ngOnInit = function () {
        var _this = this;
        if (this.httpmethod && this.httpurl) {
            this.http.get(this.httpurl).subscribe(function (response) {
                _this.responseData = response;
            }, function (error) {
                console.error(error);
            }, function () {
                _this.setData(_this.responseData);
            });
        }
        else if (this.data) {
            this.setData(this.data);
            this.previousValue = JSON.parse(JSON.stringify(this.data));
        }
    };
    AmexioTreeViewComponentCanvas.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.parentTmp != null) {
                _this.templates = { treeNodeTemplate: _this.parentTmp };
            }
            else if (_this.templates != null) {
                _this.parentTmp = _this.templates.treeNodeTemplate;
            }
        });
        this.cdf.detectChanges();
    };
    AmexioTreeViewComponentCanvas.prototype.ngDoCheck = function () {
        if (JSON.stringify(this.previousValue) != JSON.stringify(this.data) &&
            this.data != null) {
            this.previousValue = JSON.parse(JSON.stringify(this.data));
            this.setData(this.data);
        }
    };
    AmexioTreeViewComponentCanvas.prototype.onClick = function (node) {
        node.expand = !node.expand;
    };
    AmexioTreeViewComponentCanvas.prototype.onNodeDrag = function (node) {
        node.event.dataTransfer.setData('dragData', JSON.stringify(node.data));
        this.onDrag.emit(node);
    };
    AmexioTreeViewComponentCanvas.prototype.onNodeClick = function (node) {
        this.nodeClick.emit(node);
        this.activateNode(this.data, node);
    };
    AmexioTreeViewComponentCanvas.prototype.activateNode = function (data, node) {
        for (var i = 0; i < data.length; i++) {
            if (node === data[i] && !data[i]['children']) {
                data[i]['active'] = true;
            }
            else {
                data[i]['active'] = false;
            }
            if (data[i]['children']) {
                this.activateNode(data[i]['children'], node);
            }
        }
    };
    AmexioTreeViewComponentCanvas.prototype.setData = function (httpResponse) {
        var responsedata = httpResponse;
        if (this.datareader != null) {
            var dr = this.datareader.split('.');
            for (var ir = 0; ir < dr.length; ir++) {
                responsedata = responsedata[dr[ir]];
            }
        }
        else {
            responsedata = httpResponse;
        }
        this.data = responsedata;
        this.activateNode(this.data, null);
    };
    AmexioTreeViewComponentCanvas.prototype.emitCheckedData = function (checkedData) {
        var _this = this;
        checkedData.checked = !checkedData.checked;
        if (checkedData.checked) {
            if (checkedData.hasOwnProperty('children')) {
                checkedData.children.forEach(function (option) {
                    option.checked = true;
                    if (option.hasOwnProperty('children')) {
                        _this.setCheckedStatusFromParent(option);
                    }
                });
            }
            this.onTreeNodeChecked.emit(this.data);
        }
        else {
            if (checkedData.hasOwnProperty('children')) {
                checkedData.children.forEach(function (option) {
                    option.checked = false;
                    if (option.hasOwnProperty('children')) {
                        _this.searchObject(option);
                    }
                });
            }
            this.onTreeNodeChecked.emit(this.data);
        }
    };
    AmexioTreeViewComponentCanvas.prototype.searchObject = function (object) {
        var _this = this;
        object.children.forEach(function (childOption) {
            childOption.checked = false;
            if (childOption.hasOwnProperty('children')) {
                _this.searchObject(childOption);
            }
        });
    };
    AmexioTreeViewComponentCanvas.prototype.setCheckedStatusFromParent = function (object) {
        var _this = this;
        object.children.forEach(function (childOption) {
            childOption.checked = true;
            if (childOption.hasOwnProperty('children')) {
                _this.setCheckedStatusFromParent(childOption);
            }
        });
    };
    AmexioTreeViewComponentCanvas.prototype.onTreeNodeCheck = function (data) {
        this.onTreeNodeChecked.emit(this.data);
    };
    return AmexioTreeViewComponentCanvas;
}());
__decorate([
    core_1.Input()
], AmexioTreeViewComponentCanvas.prototype, "data");
__decorate([
    core_1.Input('http-url')
], AmexioTreeViewComponentCanvas.prototype, "httpurl");
__decorate([
    core_1.Input('http-method')
], AmexioTreeViewComponentCanvas.prototype, "httpmethod");
__decorate([
    core_1.Input('data-reader')
], AmexioTreeViewComponentCanvas.prototype, "datareader");
__decorate([
    core_1.Output()
], AmexioTreeViewComponentCanvas.prototype, "nodeClick");
__decorate([
    core_1.Input('enable-checkbox')
], AmexioTreeViewComponentCanvas.prototype, "enablecheckbox");
__decorate([
    core_1.Input()
], AmexioTreeViewComponentCanvas.prototype, "templates");
__decorate([
    core_1.ContentChild('amexioTreeTemplate')
], AmexioTreeViewComponentCanvas.prototype, "parentTmp");
__decorate([
    core_1.Output()
], AmexioTreeViewComponentCanvas.prototype, "onTreeNodeChecked");
__decorate([
    core_1.Output()
], AmexioTreeViewComponentCanvas.prototype, "onDrag");
AmexioTreeViewComponentCanvas = __decorate([
    core_1.Component({
        selector: 'amexio-treeview-canvas',
        template: "\n    <div *ngIf=\"data == null\" style=\"height: 300px;width: 300px;\">\n      <div class=\"spinner\"></div>\n    </div>\n    <li class=\"treenode\" *ngFor=\"let node of data\" >\n      <div class=\"treenode-content\" (click)=\"onClick(node)\">\n          <span class=\"treenode-toggler\"  *ngIf=\"node.children && (node.children.length>0)\">\n            <span *ngIf=\"node.expand\"><i class=\"fa fa-chevron-down\"></i> </span>\n            <span *ngIf=\"!node.expand\"><i class=\"fa fa-chevron-right\"></i> </span>\n          </span>\n        <span class=\"treenode-toggler\" *ngIf=\"!node.children || (node.children.length == 0)\">\n            <span class=\"treenode-empty-space\">\n            </span>\n          </span>\n        <span class=\"treenode-label\" draggable=\"true\" (dragstart)=\"onNodeDrag({event:$event,data:node})\">\n            <span *ngIf=\"enablecheckbox\">\n              <input type=\"checkbox\" [checked]=\"'checked'?node.checked:null\" (click)=\"emitCheckedData(node)\"/>\n            </span>\n            <span (click)=\"onNodeClick(node)\">\n\n              <ng-container *ngIf=\"templates == null\">\n                <span *ngIf=\"node.icon\" [ngClass]=\"node.icon\" aria-hidden=\"true\"> </span>\n                <label (dragstart)=\"onNodeDrag({event:$event,data:node})\">&nbsp;{{node.text}}</label>\n              </ng-container>\n\n              <ng-template *ngIf=\"templates != null\"\n                           [ngTemplateOutlet]=\"parentTmp\"\n                           [ngTemplateOutletContext]=\"{ $implicit: { text: node.text } , icon: node.icon,node : node }\">\n              </ng-template>\n            </span>\n          </span>\n      </div>\n      <ul class=\"treenode-children\" style=\"display: block;\" *ngIf=\"node.expand && node.children && (node.children.length>0)\">\n        <amexio-treeview-canvas [data]=\"node.children\" (nodeClick)=\"onNodeClick($event)\" [templates]=\"templates\" [enable-checkbox]=\"enablecheckbox\" (onDrag)=\"onNodeDrag($event)\" (onTreeNodeChecked)=\"this.onTreeNodeCheck($event)\" ></amexio-treeview-canvas>\n      </ul>\n    </li>\n\n  "
    })
], AmexioTreeViewComponentCanvas);
exports.AmexioTreeViewComponentCanvas = AmexioTreeViewComponentCanvas;
