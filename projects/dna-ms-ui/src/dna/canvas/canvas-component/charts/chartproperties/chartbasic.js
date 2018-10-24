"use strict";
exports.__esModule = true;
var ChartBasic = (function () {
    function ChartBasic() {
        this.height = '400px';
        this.width = '100%';
        this.stacked = false;
        this.barWidth = '100%';
        this.fallingColor = '#a52714';
        this.risingColor = '#0f9d58';
        this.maxColor = '#00DD00';
        this.midColor = '#DDDDDD';
        this.minColor = '#FF0000';
        this.maxPostDepth = 2;
        this.showScale = true;
        this.redColorFrom = 90;
        this.redColorTo = 100;
        this.yellowColorFrom = 75;
        this.yellowColorTo = 90;
        this.scaleValue = 5;
    }
    return ChartBasic;
}());
exports.ChartBasic = ChartBasic;
