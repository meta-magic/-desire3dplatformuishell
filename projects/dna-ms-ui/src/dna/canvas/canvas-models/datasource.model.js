/**
 * Created by dattaram on 5/1/18.
 */
"use strict";
exports.__esModule = true;
var DatasourceModel = (function () {
    function DatasourceModel() {
        this.remote = new Remote();
        this.local = new Local();
        this.localTreeData = null;
    }
    return DatasourceModel;
}());
exports.DatasourceModel = DatasourceModel;
//FOR REMOTE SERVICE CALL
var Remote = (function () {
    function Remote() {
        this.httpMethod = '';
        this.httpUrl = '';
    }
    return Remote;
}());
exports.Remote = Remote;
//FOR LOCAL DATA
var Local = (function () {
    function Local() {
        this.data = null;
    }
    return Local;
}());
exports.Local = Local;
var Metadata = (function () {
    function Metadata() {
        this.bcId = '';
        this.domainId = '';
        this.serviceId = '';
        this.operationId = '';
        this.methodType = '';
        this.recordData = [];
        this.servicetype = 1;
    }
    return Metadata;
}());
exports.Metadata = Metadata;
