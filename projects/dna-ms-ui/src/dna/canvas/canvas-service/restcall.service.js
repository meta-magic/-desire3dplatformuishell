"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
/**
 * Created by dattaram on 15/2/18.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var canvas_constant_1 = require("../canvas-models/canvas.constant");
var RestCallService = (function () {
    function RestCallService(_httpClient) {
        this._httpClient = _httpClient;
    }
    RestCallService.prototype.getRestCall = function (url) {
        return this._httpClient.get(url);
    };
    RestCallService.prototype.postRestCall = function (url, requestJson) {
        var headers = new http_1.HttpHeaders().append('Content-Type', 'application/json;charset=UTF-8');
        return this._httpClient.post(canvas_constant_1.prefixUrl + url, requestJson, { headers: headers });
    };
    return RestCallService;
}());
RestCallService = __decorate([
    core_1.Injectable()
], RestCallService);
exports.RestCallService = RestCallService;
