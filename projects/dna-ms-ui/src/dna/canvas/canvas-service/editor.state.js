"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
/**
 * Created by pratik on 12/9/17.
 */
var core_1 = require("@angular/core");
var EditorStateService = (function () {
    function EditorStateService() {
        this.past = [];
        this.future = [];
    }
    EditorStateService.prototype.onAddNewState = function (state) {
        if (this.present != null) {
            this.past.push(this.present);
            this.present = state;
        }
        else {
            this.present = state;
        }
    };
    EditorStateService.prototype.onUndoState = function () {
        if (this.past.length > 0) {
            var previousState = this.past.pop();
            this.future.push(this.present);
            this.present = previousState; //call view updation here
            return true;
        }
        else {
            if (this.present != null) {
                this.future.push(this.present);
            }
            return false;
        }
    };
    EditorStateService.prototype.onRedoState = function () {
        if (this.future.length > 0) {
            var nextState = this.future.pop();
            this.past.push(this.present);
            this.present = nextState;
            return true;
        }
        else {
            return false;
        }
    };
    EditorStateService.prototype.resetState = function () {
        this.present = null;
        this.past = [];
        this.future = [];
    };
    return EditorStateService;
}());
EditorStateService = __decorate([
    core_1.Injectable()
], EditorStateService);
exports.EditorStateService = EditorStateService;
