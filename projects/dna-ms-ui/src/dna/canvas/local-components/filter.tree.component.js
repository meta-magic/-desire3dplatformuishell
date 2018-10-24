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
/*
 Component Name : Amexio tree filter
 Component Selector : <amexio-tree-filter-view>
 Component Description : A Expandable Tree Component for Angular, having Filtering functionality.
 */
var core_1 = require("@angular/core");
var AmexioTreeViewComponent1 = (function () {
    function AmexioTreeViewComponent1(dataService, cdf) {
        this.dataService = dataService;
        this.cdf = cdf;
        /*
         Events
         name : nodeClick
         datatype : none
         version : none
         default : none
         description : It will gives you clicked node data.
         */
        this.nodeClick = new core_1.EventEmitter();
        /*
         Properties
         name : enable-checkbox
         datatype : false
         version : 4.0 onwards
         default : none
         description : Enables checkbox for each row, this allows user for multi selection.
         */
        this.enablecheckbox = false;
        /*
         Events
         name : onTreeNodeChecked
         datatype : any
         version : 4.0 onwards
         default : none
         description : It will gives whole tree data with checked flag status.
         */
        this.onTreeNodeChecked = new core_1.EventEmitter();
    }
    AmexioTreeViewComponent1.prototype.ngOnInit = function () {
        var _this = this;
        if (this.httpmethod && this.httpurl) {
            this.dataService.fetchData(this.httpurl, this.httpmethod).subscribe(function (response) {
                _this.responseData = response;
            }, function (error) { }, function () {
                _this.setData(_this.responseData);
            });
        }
        else if (this.datareader && this.data) {
            this.setData(this.data);
        }
    };
    AmexioTreeViewComponent1.prototype.ngAfterViewInit = function () {
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
    AmexioTreeViewComponent1.prototype.ngDoCheck = function () {
        if (JSON.stringify(this.previousValue) != JSON.stringify(this.data) &&
            this.previousValue != null &&
            this.data != null) {
            this.previousValue = JSON.parse(JSON.stringify(this.data));
            this.setData(this.data);
        }
    };
    AmexioTreeViewComponent1.prototype.onClick = function (node, event) {
        event.stopPropagation();
        node.expand = !node.expand;
    };
    AmexioTreeViewComponent1.prototype.onNodeClick = function (node) {
        this.nodeClick.emit(node);
        this.activateNode(this.data, node);
    };
    AmexioTreeViewComponent1.prototype.activateNode = function (data, node) {
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
    AmexioTreeViewComponent1.prototype.setData = function (httpResponse) {
        //Check if key is added?
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
    AmexioTreeViewComponent1.prototype.emitCheckedData = function (checkedData) {
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
    AmexioTreeViewComponent1.prototype.searchObject = function (object) {
        var _this = this;
        object.children.forEach(function (childOption) {
            childOption.checked = false;
            if (childOption.hasOwnProperty('children')) {
                _this.searchObject(childOption);
            }
        });
    };
    AmexioTreeViewComponent1.prototype.setCheckedStatusFromParent = function (object) {
        var _this = this;
        object.children.forEach(function (childOption) {
            childOption.checked = true;
            if (childOption.hasOwnProperty('children')) {
                _this.setCheckedStatusFromParent(childOption);
            }
        });
    };
    AmexioTreeViewComponent1.prototype.onTreeNodeCheck = function (data) {
        this.onTreeNodeChecked.emit(this.data);
    };
    return AmexioTreeViewComponent1;
}());
__decorate([
    core_1.Input()
], AmexioTreeViewComponent1.prototype, "data");
__decorate([
    core_1.Input('http-url')
], AmexioTreeViewComponent1.prototype, "httpurl");
__decorate([
    core_1.Input('http-method')
], AmexioTreeViewComponent1.prototype, "httpmethod");
__decorate([
    core_1.Input('data-reader')
], AmexioTreeViewComponent1.prototype, "datareader");
__decorate([
    core_1.Output()
], AmexioTreeViewComponent1.prototype, "nodeClick");
__decorate([
    core_1.Input('enable-checkbox')
], AmexioTreeViewComponent1.prototype, "enablecheckbox");
__decorate([
    core_1.Input()
], AmexioTreeViewComponent1.prototype, "templates");
__decorate([
    core_1.ContentChild('amexioTreeTemplate')
], AmexioTreeViewComponent1.prototype, "parentTmp");
__decorate([
    core_1.Output()
], AmexioTreeViewComponent1.prototype, "onTreeNodeChecked");
AmexioTreeViewComponent1 = __decorate([
    core_1.Component({
        selector: 'tag-input-option-tree',
        template: "\n    <div *ngIf=\"data == null\" style=\"height: 300px;width: 300px;\">\n      <div class=\"spinner\"></div>\n    </div>\n    <li class=\"treenode\" style=\"padding: 0px!important;\"  *ngFor=\"let node of data\" >\n      <div class=\"treenode-content\" (click)=\"onNodeClick(node)\">\n          <span class=\"treenode-toggler\" (click)=\"onClick(node,$event)\"  *ngIf=\"node.children && (node.children.length>0)\">\n            <span *ngIf=\"node.expand\"><i class=\"fa fa-angle-up\"></i></span>\n            <span *ngIf=\"!node.expand\"><i class=\"fa fa-angle-down\"></i> </span>\n          </span>\n        <span class=\"treenode-toggler\" *ngIf=\"!node.children || (node.children.length == 0)\">\n            <span class=\"treenode-empty-space\">\n            </span>\n          </span>\n        <span style=\"cursor: pointer\">\n              <ng-container *ngIf=\"templates == null\">\n                <span *ngIf=\"node.icon\" [ngClass]=\"node.icon\" aria-hidden=\"true\"> </span>\n                <label>&nbsp;{{node.text}}</label>\n\n              </ng-container>\n              <ng-template *ngIf=\"templates != null\"\n                           [ngTemplateOutlet]=\"parentTmp\"\n                           [ngTemplateOutletContext]=\"{ $implicit: { text: node.text } , icon: node.icon,node : node }\">\n              </ng-template>\n          </span>\n\n      </div>\n      <ul class=\"treenode-children\" style=\"display: block;\" *ngIf=\"node.expand && node.children && (node.children.length>0)\">\n        <tag-input-option-tree [data]=\"node.children\" (nodeClick)=\"onNodeClick($event)\" [templates]=\"templates\" [enable-checkbox]=\"enablecheckbox\" (onTreeNodeChecked)=\"this.onTreeNodeCheck($event)\" ></tag-input-option-tree>\n      </ul>\n    </li>\n\n\n\n  "
    })
], AmexioTreeViewComponent1);
exports.AmexioTreeViewComponent1 = AmexioTreeViewComponent1;
