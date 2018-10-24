"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
/**
 * Created by sagar on 12/3/18.
 */
var core_2 = require("@angular/core");
var ChartProperties = (function () {
    function ChartProperties() {
        this.alignmentData = [
            {
                type: 'Start',
                value: 'start'
            },
            {
                type: 'Center',
                value: 'center'
            },
            {
                type: 'End',
                value: 'end'
            }
        ];
        this.positionData = [
            {
                type: 'Bottom',
                value: 'bottom'
            },
            {
                type: 'Top',
                value: 'top'
            },
            {
                type: 'Right',
                value: 'right'
            }
        ];
    }
    return ChartProperties;
}());
__decorate([
    core_1.Input()
], ChartProperties.prototype, "componentInstance");
__decorate([
    core_1.Input()
], ChartProperties.prototype, "candlesStickChart");
__decorate([
    core_1.Input()
], ChartProperties.prototype, "title");
__decorate([
    core_1.Input()
], ChartProperties.prototype, "legend");
__decorate([
    core_1.Input()
], ChartProperties.prototype, "horizontal");
__decorate([
    core_1.Input()
], ChartProperties.prototype, "vertical");
__decorate([
    core_1.Input()
], ChartProperties.prototype, "stacked");
__decorate([
    core_1.Input()
], ChartProperties.prototype, "is3d");
__decorate([
    core_1.Input()
], ChartProperties.prototype, "treemap");
__decorate([
    core_1.Input()
], ChartProperties.prototype, "gauge");
ChartProperties = __decorate([
    core_2.Component({
        selector: 'chart-properties',
        template: "\n    <ng-container *ngIf=\"componentInstance\">\n      <amexio-text-input field-label=\"Height\" [(ngModel)]=\"componentInstance.properties.chartBasic.height\"\n                         name=\"componentInstance.properties.chartBasic.height\"\n                         place-holder=\"Height\"\n                         icon-feedback=\"true\">\n      </amexio-text-input>\n      <amexio-text-input field-label=\"Width\" [(ngModel)]=\"componentInstance.properties.chartBasic.width\"\n                         name=\"componentInstance.properties.chartBasic.width\"\n                         place-holder=\"Width\"\n                         icon-feedback=\"true\">\n      </amexio-text-input>\n\n      <ng-container *ngIf=\"stacked\">\n        <!--<amexio-checkbox [field-label]=\"'Stacked'\"\n        [(ngModel)]=\"componentInstance.properties.chartBasic.stacked\"\n        name=\"componentInstance.properties.chartBasic.stacked\"\n        >\n    </amexio-checkbox>-->\n      </ng-container>\n\n      <ng-container *ngIf=\"is3d\">\n        <amexio-checkbox [field-label]=\"'3D'\"\n                         [(ngModel)]=\"componentInstance.properties.chartBasic.is3d\"\n                         name=\"componentInstance.properties.chartBasic.is3d\"\n        >\n        </amexio-checkbox>\n      </ng-container>\n      <ng-container *ngIf=\"treemap\">\n        <amexio-column size=\"12\">\n          Max Color\n          <input type=\"color\" [(ngModel)]=\"componentInstance.properties.chartBasic.maxColor\"\n                 name=\"componentInstance.properties.chartBasic.maxColor\"\n                 value=\"componentInstance.properties.chartBasic.maxColor\">\n        </amexio-column>\n        <amexio-column size=\"12\">\n          Mid Color\n          <input type=\"color\" [(ngModel)]=\"componentInstance.properties.chartBasic.midColor\"\n                 name=\"componentInstance.properties.chartBasic.midColor\"\n                 value=\"componentInstance.properties.chartBasic.midColor\">\n        </amexio-column>\n        <amexio-column size=\"12\">\n          Min Color\n          <input type=\"color\" [(ngModel)]=\"componentInstance.properties.chartBasic.minColor\"\n                 name=\"componentInstance.properties.chartBasic.minColor\"\n                 value=\"componentInstance.properties.chartBasic.minColor\">\n        </amexio-column>\n      </ng-container>\n\n      <ng-container *ngIf=\"gauge\">\n        <amexio-column size=\"12\">\n          <amexio-number-input field-label=\"Red Color From\" [(ngModel)]=\"componentInstance.properties.chartBasic.redColorFrom\"\n                               name=\"componentInstance.properties.chartBasic.redColorFrom\">\n          </amexio-number-input>\n\n        </amexio-column>\n        <amexio-column size=\"12\">\n          <amexio-number-input field-label=\"Red Color To\" [(ngModel)]=\"componentInstance.properties.chartBasic.redColorTo\"\n                               name=\"componentInstance.properties.chartBasic.redColorTo\">\n          </amexio-number-input>\n\n        </amexio-column>\n        <amexio-column size=\"12\">\n          <amexio-number-input field-label=\"Yellow Color From\" [(ngModel)]=\"componentInstance.properties.chartBasic.yellowColorFrom\"\n                               name=\"componentInstance.properties.chartBasic.yellowColorFrom\">\n          </amexio-number-input>\n\n        </amexio-column>\n        <amexio-column size=\"12\">\n          <amexio-number-input field-label=\"Yellow Color To\" [(ngModel)]=\"componentInstance.properties.chartBasic.yellowColorTo\"\n                               name=\"componentInstance.properties.chartBasic.yellowColorTo\">\n          </amexio-number-input>\n\n        </amexio-column>\n        <amexio-column size=\"12\">\n          <amexio-number-input field-label=\"Scale Value\" [(ngModel)]=\"componentInstance.properties.chartBasic.scaleValue\"\n                               name=\"componentInstance.properties.chartBasic.scaleValue\">\n          </amexio-number-input>\n\n        </amexio-column>\n      </ng-container>\n\n      <ng-container *ngIf=\"candlesStickChart\">\n        <amexio-text-input field-label=\"Bar Width\" [(ngModel)]=\"componentInstance.properties.chartBasic.barWidth\"\n                           name=\"componentInstance.properties.chartBasic.barWidth\"\n                           place-holder=\"Bar Width\"\n                           icon-feedback=\"true\">\n        </amexio-text-input>\n        Falling Color\n        <input type=\"color\" [(ngModel)]=\"componentInstance.properties.chartBasic.fallingColor\"\n               name=\"componentInstance.properties.chartBasic.fallingColor\"\n               value=\"componentInstance.properties.chartBasic.fallingColor\"><br>\n        Rising Color\n        <input type=\"color\" [(ngModel)]=\"componentInstance.properties.chartBasic.risingColor\"\n               name=\"componentInstance.properties.chartBasic.risingColor\"\n               value=\"componentInstance.properties.chartBasic.risingColor\">\n      </ng-container>\n\n      <ng-container *ngIf=\"title\">\n        <amexio-fieldset [collapsible]=\"true\" title=\"Chart Title\">\n          <amexio-row>\n\n            <amexio-column size=\"12\">\n              <amexio-text-input field-label=\"Title\" [(ngModel)]=\"componentInstance.properties.chartTitle.title\"\n                                 name=\"componentInstance.properties.chartTitle.title\"\n                                 place-holder=\"Title\"\n                                 icon-feedback=\"true\">\n              </amexio-text-input>\n            </amexio-column>\n            <amexio-column size=\"12\">\n              Title Color\n              <input type=\"color\" [(ngModel)]=\"componentInstance.properties.chartTitle.color\"\n                     name=\"componentInstance.properties.chartTitle.color\" value=\"componentInstance.properties.chartTitle.color\">\n            </amexio-column>\n\n            <amexio-column size=\"12\">\n              <amexio-number-input field-label=\"Font Size\" [(ngModel)]=\"componentInstance.properties.chartTitle.fontSize\"\n                                   name=\"componentInstance.properties.chartTitle.fontSize\">\n              </amexio-number-input>\n\n            </amexio-column>\n            <amexio-column size=\"12\">\n              <amexio-checkbox [field-label]=\"'Bold'\"\n                               [(ngModel)]=\"componentInstance.properties.chartTitle.bold\"\n                               name=\"componentInstance.properties.chartTitle.bold\"\n              >\n              </amexio-checkbox>\n            </amexio-column>\n\n            <amexio-column size=\"12\">\n              <amexio-checkbox [field-label]=\"'Italic'\"\n                               [(ngModel)]=\"componentInstance.properties.chartTitle.italic\">\n              </amexio-checkbox>\n            </amexio-column>\n\n          </amexio-row>\n        </amexio-fieldset>\n\n      </ng-container>\n\n\n      <ng-container *ngIf=\"legend\">\n        <amexio-fieldset [collapsible]=\"true\" title=\"Legend \">\n          Legend Color\n          <input type=\"color\" [(ngModel)]=\"componentInstance.properties.chartLegend.color\"\n                 name=\"componentInstance.properties.chartLegend.color\" value=\"componentInstance.properties.chartLegend.color\"><br>\n          <amexio-row>\n            <amexio-column size=\"12\">\n\n              <amexio-dropdown [(ngModel)]=\"componentInstance.properties.chartLegend.position\"\n                               name=\"componentInstance.properties.chartLegend.position\"\n                               [place-holder]=\"'Position'\"\n                               [field-label]=\"'Position'\"\n                               [data]=\"positionData\"\n                               [display-field]=\"'type'\"\n                               [value-field]=\"'value'\">\n              </amexio-dropdown>\n            </amexio-column>\n\n            <amexio-column size=\"12\">\n\n              <amexio-dropdown [(ngModel)]=\"componentInstance.properties.chartLegend.alignment\"\n                               name=\"componentInstance.properties.chartLegend.position\"\n                               [place-holder]=\"'Alignment'\"\n                               [field-label]=\"'Alignment'\"\n                               [data]=\"alignmentData\"\n                               [display-field]=\"'type'\"\n                               [value-field]=\"'value'\">\n              </amexio-dropdown>\n            </amexio-column>\n\n            <amexio-column size=\"12\">\n              <amexio-text-input field-label=\"Font Name\" [(ngModel)]=\"componentInstance.properties.chartLegend.fontName\"\n                                 name=\"componentInstance.properties.chartLegend.fontName\"\n                                 place-holder=\"FontName\"\n                                 icon-feedback=\"true\">\n              </amexio-text-input>\n            </amexio-column>\n\n            <amexio-column size=\"12\">\n              <amexio-number-input field-label=\"Font Size\" [(ngModel)]=\"componentInstance.properties.chartLegend.fontSize\"\n                                   name=\"componentInstance.properties.chartLegend.fontSize\">\n              </amexio-number-input>\n            </amexio-column>\n\n            <amexio-column size=\"12\">\n              <amexio-checkbox [field-label]=\"'Bold'\"\n                               [(ngModel)]=\"componentInstance.properties.chartLegend.bold\"\n                               name=\"componentInstance.properties.chartLegend.bold\"\n              >\n              </amexio-checkbox>\n            </amexio-column>\n\n            <amexio-column size=\"12\">\n              <amexio-number-input field-label=\"Max Lines\" [(ngModel)]=\"componentInstance.properties.chartLegend.maxlines\"\n                                   name=\"componentInstance.properties.chartLegend.maxlines\">\n              </amexio-number-input>\n            </amexio-column>\n          </amexio-row>\n        </amexio-fieldset>\n      </ng-container>\n\n      <ng-container *ngIf=\"horizontal\">\n        <amexio-fieldset [collapsible]=\"true\" title=\"Horizontal Axis \">\n          <amexio-row>\n            <amexio-column size=\"12\">\n              <amexio-text-input field-label=\"Title\" [(ngModel)]=\"componentInstance.properties.horizontaAxis.title\"\n                                 name=\"componentInstance.properties.horizontaAxis.title\"\n                                 place-holder=\"Title\"\n                                 icon-feedback=\"true\">\n              </amexio-text-input>\n            </amexio-column>\n\n            <amexio-column size=\"12\">\n              H Axis Color\n              <input type=\"color\" [(ngModel)]=\"componentInstance.properties.horizontaAxis.titleColor\"\n                     name=\"componentInstance.properties.horizontaAxis.titleColor\" value=\"componentInstance.properties.horizontaAxis.titleColor\">\n\n            </amexio-column>\n\n          </amexio-row>\n        </amexio-fieldset>\n      </ng-container>\n\n      <ng-container *ngIf=\"vertical\">\n        <amexio-fieldset [collapsible]=\"true\" title=\"Vertical Axis \">\n          <amexio-row>\n            <amexio-column size=\"12\">\n              <amexio-text-input field-label=\"Title\" [(ngModel)]=\"componentInstance.properties.verticalAxis.title\"\n                                 name=\"componentInstance.properties.verticalAxis.title\"\n                                 place-holder=\"Title\"\n                                 icon-feedback=\"true\">\n              </amexio-text-input>\n            </amexio-column>\n\n            <amexio-column size=\"12\">\n              V Axis Color\n              <input type=\"color\" [(ngModel)]=\"componentInstance.properties.verticalAxis.titleColor\"\n                     name=\"componentInstance.properties.verticalAxis.titleColor\" value=\"componentInstance.properties.verticalAxis.titleColor\">\n            </amexio-column>\n\n          </amexio-row>\n        </amexio-fieldset>\n      </ng-container>\n    </ng-container>\n \n\n  "
    })
], ChartProperties);
exports.ChartProperties = ChartProperties;
