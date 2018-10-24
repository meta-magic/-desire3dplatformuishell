"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
/**
 * Created by pratik on 5/3/18.
 */
var core_1 = require("@angular/core");
var ResponseMapperComponent = (function () {
    function ResponseMapperComponent(_notificationService) {
        this._notificationService = _notificationService;
        this.type = 'default';
        this.treeData = [];
    }
    ResponseMapperComponent.prototype.ngOnInit = function () {
        if (this.component != null) {
            this.type = this.component.type;
        }
    };
    ResponseMapperComponent.prototype.onNodeDrag = function (node) {
        this.nodeDragged = null;
        this.nodeDataOfDataReader = JSON.parse(JSON.stringify(node.data));
        this.nodeDragged = node.data;
        this.dataReaderSearchObject = node.data;
    };
    ResponseMapperComponent.prototype.onDragOver = function (event, ref) {
        ref.style.border = '2px dashed green';
        event.preventDefault();
    };
    ResponseMapperComponent.prototype.onDragLeave = function (ref) {
        ref.style.border = '2px dashed lightgrey';
    };
    ResponseMapperComponent.prototype.checkValuefield = function (data) {
        return data.hasOwnProperty('valueField');
    };
    ResponseMapperComponent.prototype.onNodeDrop = function (type, ref) {
        if (this.nodeDragged.children == null) {
            this.component.dataSource.dataReader = '';
            this.findDataReader();
            if (type == 'display') {
                this.component.dataSource.displayField = this.nodeDragged['text'];
                this.component.properties.displayField = this.component.dataSource.displayField;
                if (this.component.dataSource.hasOwnProperty('key'))
                    this.component.dataSource.key = this.nodeDragged['text'];
            }
            else if (type == 'value') {
                this.component.dataSource.valueField = this.nodeDragged['text'];
                this.component.properties.valueField = this.component.dataSource.valueField;
            }
        }
        else {
            this._notificationService.setNotificationData(true, ['Please drag leaf node'], 'red');
        }
        ref.style.border = '2px dashed lightgrey';
    };
    ResponseMapperComponent.prototype.onGridNodeDrop = function (column, ref) {
        if (this.nodeDragged.children == null) {
            column.instance.properties.dataindex = this.nodeDragged['text'];
            this.component.dataSource.dataReader = '';
            this.findDataReader();
        }
        else {
            this._notificationService.setNotificationData(true, ['Please drag leaf node'], 'red');
        }
        ref.style.border = '2px dashed lightgrey';
    };
    ResponseMapperComponent.prototype.clearDisplayField = function () {
        this.component.dataSource.displayField = '';
    };
    ResponseMapperComponent.prototype.clearValueField = function () {
        this.component.dataSource.valueField = '';
    };
    ResponseMapperComponent.prototype.findDataReader = function () {
        var _this = this;
        this.treeLocalData.forEach(function (option) {
            if (JSON.stringify(option).toLowerCase() ===
                JSON.stringify(_this.dataReaderSearchObject).toLowerCase()) {
                return;
            }
            else if (option.hasOwnProperty('children')) {
                if (option.children != null) {
                    _this.findDataReaderInChild(option);
                }
            }
        });
    };
    ResponseMapperComponent.prototype.findDataReaderInChild = function (child) {
        var _this = this;
        child.children.forEach(function (option) {
            if (JSON.stringify(option).toLowerCase() ===
                JSON.stringify(_this.dataReaderSearchObject).toLowerCase()) {
                if (_this.component.dataSource.dataReader == '') {
                    _this.component.dataSource.dataReader = child.text;
                }
                else {
                    _this.component.dataSource.dataReader =
                        child.text + '.' + _this.component.dataSource.dataReader;
                }
                _this.dataReaderSearchObject = child;
                _this.findDataReader();
            }
            else if (option.hasOwnProperty('children')) {
                if (option.children != null) {
                    _this.findDataReaderInChild(option);
                }
            }
        });
    };
    ResponseMapperComponent.prototype.removeRecord = function (data) {
        data.instance.properties.dataindex = '';
    };
    ResponseMapperComponent.prototype.onTreeNodeDrop = function (node, ref) {
        /* this.nodeDragged = node;
         this.dataReaderSearchObject = node;*/
        if (this.nodeDragged.children == null) {
            this.component.dataSource.dataReader = '';
            this.findDataReader();
        }
        else {
            this._notificationService.setNotificationData(true, ['Please drag leaf node'], 'red');
        }
        ref.style.border = '2px dashed lightgrey';
    };
    return ResponseMapperComponent;
}());
__decorate([
    core_1.Input()
], ResponseMapperComponent.prototype, "component");
__decorate([
    core_1.Input()
], ResponseMapperComponent.prototype, "treeLocalData");
ResponseMapperComponent = __decorate([
    core_1.Component({
        selector: 'response-mapper',
        template: "\n    <ng-container *ngIf=\"component != undefined\">\n      <amexio-row>\n      </amexio-row>\n      <amexio-row>\n        <amexio-column size=\"6\">\n          <amexio-card [header]=\"true\"\n                       [body-height]=\"40\">\n            <amexio-header>\n              Data Structure\n            </amexio-header>\n            <amexio-body>\n              <amexio-treeview-canvas [data]=\"treeLocalData\"\n                                      (onDrag)=\"onNodeDrag($event)\">\n              </amexio-treeview-canvas>\n            </amexio-body>\n          </amexio-card>\n        </amexio-column>\n        <amexio-column size=\"6\">\n          <ng-container [ngSwitch]=\"type\">\n            <ng-container *ngSwitchCase=\"'default'\">\n              <div class=\"datatable-height\" style=\"height: 330px;border: 1px solid lightgrey\">\n                <div class=\"datatable\">\n                  <div class=\"datatable-header\">\n                    <div class=\"datatable-col\" style=\"width: 45%\">\n                      Component Property\n                    </div>\n                    <div class=\"datatable-col\" style=\"width: 45%;\">\n                      Mapped References\n                    </div>\n                    <div class=\"datatable-col\" style=\"width: 10%;\">\n                      Action\n                    </div>\n                  </div>\n                  <div class=\"datatable-row\">\n                    <div class=\"datatable-col\">\n                      <b>Display Field</b>\n                    </div>\n                    <div #ref class=\"datatable-col overEffect\" (dragover)=\"onDragOver($event,ref)\" (dragleave)=\"onDragLeave(ref)\" (drop)=\"onNodeDrop('display',ref)\">\n                      {{component.dataSource.displayField}}\n                    </div>\n                    <div class=\"datatable-col\">\n                      <div style=\"text-align: center\">\n                        <amexio-image [icon-class]=\"'fa fa-refresh fa-lg'\"\n                                      [tooltip]=\"'clear data'\" (onClick)=\"clearDisplayField(component.dataSource.displayField)\">\n                        </amexio-image>\n                      </div>\n                    </div>\n                  </div>\n                  <div *ngIf=\"checkValuefield(component.dataSource)\" class=\"datatable-row\">\n                    <div class=\"datatable-col\">\n                      <b>Value Field</b>\n                    </div>\n                    <div #ref class=\"datatable-col overEffect\" (dragover)=\"onDragOver($event,ref)\" (dragleave)=\"onDragLeave(ref)\" (drop)=\"onNodeDrop('value',ref)\">\n                      {{component.dataSource.valueField}}\n                    </div>\n                    <div class=\"datatable-col\">\n                      <div style=\"text-align: center\">\n                        <amexio-image [icon-class]=\"'fa fa-refresh fa-lg'\"\n                                      [tooltip]=\"'clear data'\" (onClick)=\"clearValueField(component.dataSource.valueField)\">\n                        </amexio-image>\n                      </div>\n\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"'datagrid'\">\n              <div class=\"datatable-height\" style=\"height: 330px;border: 1px solid lightgrey\">\n                <div class=\"datatable\">\n                  <div class=\"datatable-header\">\n                    <div class=\"datatable-col\" style=\"width: 35%\">\n                      Column Property\n                    </div>\n                    <div class=\"datatable-col\" style=\"width: 35%;\">\n                      Mapped References\n                    </div>\n                    <div class=\"datatable-col\" style=\"width: 10%\">\n                      Hidden\n                    </div>\n                    <div class=\"datatable-col\" style=\"width: 10%;\">\n                      Action\n                    </div>\n                  </div>\n                  <div class=\"datatable-row\" *ngFor=\"let col of component.children\">\n                    <div class=\"datatable-col\">\n                      <b>{{col.instance.properties.text}}</b>\n                    </div>\n                    <div #ref class=\"datatable-col\" (dragover)=\"onDragOver($event,ref)\" (dragleave)=\"onDragLeave(ref)\" (drop)=\"onGridNodeDrop(col,ref)\">\n                      <amexio-text-input name=\"col.instance.properties.dataindex\"\n                                         [icon-feedback]=\"false\"\n                                         [allow-blank]=\"true\"\n                                         [field-label]=\"''\"\n                                         [(ngModel)]=\"col.instance.properties.dataindex\">\n                      </amexio-text-input>\n                      <!-- <input [attr.value]=\"col.instance.properties.dataindex\" />-->\n                    </div>\n                    <div class=\"datatable-col\">\n                      <amexio-checkbox  [(ngModel)]=\"col.instance.properties.hidden\">\n                      </amexio-checkbox>\n                    </div>\n                    <div class=\"datatable-col\">\n                      <div style=\"text-align: center\">\n                        <amexio-image [icon-class]=\"'fa fa-refresh fa-lg'\"\n                                      [tooltip]=\"'clear data'\" (onClick)=\"removeRecord(col)\">\n                        </amexio-image>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </ng-container>\n\n            <ng-container *ngSwitchCase=\"'tree'\">\n              <amexio-card [header]=\"false\"\n                           [body-height]=\"46\">\n                <amexio-body>\n                  <amexio-row>\n                    <amexio-column size=\"12\">\n                      <amexio-text-input\n                        field-label=\"Data Reader\"\n                        [icon-feedback]=\"false\"\n                        [disabled]=\"true\"\n                        [(ngModel)]=\"component.dataSource.dataReader\"\n                        [allow-blank]=\"true\"\n                        [has-label]=\"true\">\n                      </amexio-text-input>\n                    </amexio-column>\n\n                  </amexio-row>\n                  <amexio-row>\n                    <amexio-column size=\"12\">\n                      <div #ref (dragover)=\"onDragOver($event,ref)\" (dragleave)=\"onDragLeave(ref)\" (drop)=\"onTreeNodeDrop(col,ref)\"\n                           style=\"background-color: white; height: 180px;\n                    border: 2px dotted lightgrey;\n                    padding: 0px 10px;\">\n                        Drop node here for setting data reader\n                      </div>\n                    </amexio-column>\n                  </amexio-row>\n\n                </amexio-body>\n              </amexio-card>\n            </ng-container>\n          </ng-container>\n        </amexio-column>\n      </amexio-row>\n    </ng-container>\n  "
    })
], ResponseMapperComponent);
exports.ResponseMapperComponent = ResponseMapperComponent;
