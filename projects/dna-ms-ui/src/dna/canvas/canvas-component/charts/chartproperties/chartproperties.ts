import { Input } from '@angular/core';
/**
 * Created by sagar on 12/3/18.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chart-properties',
  template: `
    <ng-container *ngIf="componentInstance">
      <amexio-text-input field-label="Height" [(ngModel)]="componentInstance.properties.chartBasic.height"
                         name="componentInstance.properties.chartBasic.height"
                         place-holder="Height"
                         icon-feedback="true">
      </amexio-text-input>
      <amexio-text-input field-label="Width" [(ngModel)]="componentInstance.properties.chartBasic.width"
                         name="componentInstance.properties.chartBasic.width"
                         place-holder="Width"
                         icon-feedback="true">
      </amexio-text-input>

      <ng-container *ngIf="stacked">
        <!--<amexio-checkbox [field-label]="'Stacked'"
        [(ngModel)]="componentInstance.properties.chartBasic.stacked"
        name="componentInstance.properties.chartBasic.stacked"
        >
    </amexio-checkbox>-->
      </ng-container>

      <ng-container *ngIf="is3d">
        <amexio-checkbox [field-label]="'3D'"
                         [(ngModel)]="componentInstance.properties.chartBasic.is3d"
                         name="componentInstance.properties.chartBasic.is3d"
        >
        </amexio-checkbox>
      </ng-container>
      <ng-container *ngIf="treemap">
        <amexio-column size="12">
          Max Color
          <input type="color" [(ngModel)]="componentInstance.properties.chartBasic.maxColor"
                 name="componentInstance.properties.chartBasic.maxColor"
                 value="componentInstance.properties.chartBasic.maxColor">
        </amexio-column>
        <amexio-column size="12">
          Mid Color
          <input type="color" [(ngModel)]="componentInstance.properties.chartBasic.midColor"
                 name="componentInstance.properties.chartBasic.midColor"
                 value="componentInstance.properties.chartBasic.midColor">
        </amexio-column>
        <amexio-column size="12">
          Min Color
          <input type="color" [(ngModel)]="componentInstance.properties.chartBasic.minColor"
                 name="componentInstance.properties.chartBasic.minColor"
                 value="componentInstance.properties.chartBasic.minColor">
        </amexio-column>
      </ng-container>

      <ng-container *ngIf="gauge">
        <amexio-column size="12">
          <amexio-number-input field-label="Red Color From" [(ngModel)]="componentInstance.properties.chartBasic.redColorFrom"
                               name="componentInstance.properties.chartBasic.redColorFrom">
          </amexio-number-input>

        </amexio-column>
        <amexio-column size="12">
          <amexio-number-input field-label="Red Color To" [(ngModel)]="componentInstance.properties.chartBasic.redColorTo"
                               name="componentInstance.properties.chartBasic.redColorTo">
          </amexio-number-input>

        </amexio-column>
        <amexio-column size="12">
          <amexio-number-input field-label="Yellow Color From" [(ngModel)]="componentInstance.properties.chartBasic.yellowColorFrom"
                               name="componentInstance.properties.chartBasic.yellowColorFrom">
          </amexio-number-input>

        </amexio-column>
        <amexio-column size="12">
          <amexio-number-input field-label="Yellow Color To" [(ngModel)]="componentInstance.properties.chartBasic.yellowColorTo"
                               name="componentInstance.properties.chartBasic.yellowColorTo">
          </amexio-number-input>

        </amexio-column>
        <amexio-column size="12">
          <amexio-number-input field-label="Scale Value" [(ngModel)]="componentInstance.properties.chartBasic.scaleValue"
                               name="componentInstance.properties.chartBasic.scaleValue">
          </amexio-number-input>

        </amexio-column>
      </ng-container>

      <ng-container *ngIf="candlesStickChart">
        <amexio-text-input field-label="Bar Width" [(ngModel)]="componentInstance.properties.chartBasic.barWidth"
                           name="componentInstance.properties.chartBasic.barWidth"
                           place-holder="Bar Width"
                           icon-feedback="true">
        </amexio-text-input>
        Falling Color
        <input type="color" [(ngModel)]="componentInstance.properties.chartBasic.fallingColor"
               name="componentInstance.properties.chartBasic.fallingColor"
               value="componentInstance.properties.chartBasic.fallingColor"><br>
        Rising Color
        <input type="color" [(ngModel)]="componentInstance.properties.chartBasic.risingColor"
               name="componentInstance.properties.chartBasic.risingColor"
               value="componentInstance.properties.chartBasic.risingColor">
      </ng-container>

      <ng-container *ngIf="title">
        <amexio-fieldset [collapsible]="true" title="Chart Title">
          <amexio-row>

            <amexio-column size="12">
              <amexio-text-input field-label="Title" [(ngModel)]="componentInstance.properties.chartTitle.title"
                                 name="componentInstance.properties.chartTitle.title"
                                 place-holder="Title"
                                 icon-feedback="true">
              </amexio-text-input>
            </amexio-column>
            <amexio-column size="12">
              Title Color
              <input type="color" [(ngModel)]="componentInstance.properties.chartTitle.color"
                     name="componentInstance.properties.chartTitle.color" value="componentInstance.properties.chartTitle.color">
            </amexio-column>

            <amexio-column size="12">
              <amexio-number-input field-label="Font Size" [(ngModel)]="componentInstance.properties.chartTitle.fontSize"
                                   name="componentInstance.properties.chartTitle.fontSize">
              </amexio-number-input>

            </amexio-column>
            <amexio-column size="12">
              <amexio-checkbox [field-label]="'Bold'"
                               [(ngModel)]="componentInstance.properties.chartTitle.bold"
                               name="componentInstance.properties.chartTitle.bold"
              >
              </amexio-checkbox>
            </amexio-column>

            <amexio-column size="12">
              <amexio-checkbox [field-label]="'Italic'"
                               [(ngModel)]="componentInstance.properties.chartTitle.italic">
              </amexio-checkbox>
            </amexio-column>

          </amexio-row>
        </amexio-fieldset>

      </ng-container>


      <ng-container *ngIf="legend">
        <amexio-fieldset [collapsible]="true" title="Legend ">
          Legend Color
          <input type="color" [(ngModel)]="componentInstance.properties.chartLegend.color"
                 name="componentInstance.properties.chartLegend.color" value="componentInstance.properties.chartLegend.color"><br>
          <amexio-row>
            <amexio-column size="12">

              <amexio-dropdown [(ngModel)]="componentInstance.properties.chartLegend.position"
                               name="componentInstance.properties.chartLegend.position"
                               [place-holder]="'Position'"
                               [field-label]="'Position'"
                               [data]="positionData"
                               [display-field]="'type'"
                               [value-field]="'value'">
              </amexio-dropdown>
            </amexio-column>

            <amexio-column size="12">

              <amexio-dropdown [(ngModel)]="componentInstance.properties.chartLegend.alignment"
                               name="componentInstance.properties.chartLegend.position"
                               [place-holder]="'Alignment'"
                               [field-label]="'Alignment'"
                               [data]="alignmentData"
                               [display-field]="'type'"
                               [value-field]="'value'">
              </amexio-dropdown>
            </amexio-column>

            <amexio-column size="12">
              <amexio-text-input field-label="Font Name" [(ngModel)]="componentInstance.properties.chartLegend.fontName"
                                 name="componentInstance.properties.chartLegend.fontName"
                                 place-holder="FontName"
                                 icon-feedback="true">
              </amexio-text-input>
            </amexio-column>

            <amexio-column size="12">
              <amexio-number-input field-label="Font Size" [(ngModel)]="componentInstance.properties.chartLegend.fontSize"
                                   name="componentInstance.properties.chartLegend.fontSize">
              </amexio-number-input>
            </amexio-column>

            <amexio-column size="12">
              <amexio-checkbox [field-label]="'Bold'"
                               [(ngModel)]="componentInstance.properties.chartLegend.bold"
                               name="componentInstance.properties.chartLegend.bold"
              >
              </amexio-checkbox>
            </amexio-column>

            <amexio-column size="12">
              <amexio-number-input field-label="Max Lines" [(ngModel)]="componentInstance.properties.chartLegend.maxlines"
                                   name="componentInstance.properties.chartLegend.maxlines">
              </amexio-number-input>
            </amexio-column>
          </amexio-row>
        </amexio-fieldset>
      </ng-container>

      <ng-container *ngIf="horizontal">
        <amexio-fieldset [collapsible]="true" title="Horizontal Axis ">
          <amexio-row>
            <amexio-column size="12">
              <amexio-text-input field-label="Title" [(ngModel)]="componentInstance.properties.horizontaAxis.title"
                                 name="componentInstance.properties.horizontaAxis.title"
                                 place-holder="Title"
                                 icon-feedback="true">
              </amexio-text-input>
            </amexio-column>

            <amexio-column size="12">
              H Axis Color
              <input type="color" [(ngModel)]="componentInstance.properties.horizontaAxis.titleColor"
                     name="componentInstance.properties.horizontaAxis.titleColor" value="componentInstance.properties.horizontaAxis.titleColor">

            </amexio-column>

          </amexio-row>
        </amexio-fieldset>
      </ng-container>

      <ng-container *ngIf="vertical">
        <amexio-fieldset [collapsible]="true" title="Vertical Axis ">
          <amexio-row>
            <amexio-column size="12">
              <amexio-text-input field-label="Title" [(ngModel)]="componentInstance.properties.verticalAxis.title"
                                 name="componentInstance.properties.verticalAxis.title"
                                 place-holder="Title"
                                 icon-feedback="true">
              </amexio-text-input>
            </amexio-column>

            <amexio-column size="12">
              V Axis Color
              <input type="color" [(ngModel)]="componentInstance.properties.verticalAxis.titleColor"
                     name="componentInstance.properties.verticalAxis.titleColor" value="componentInstance.properties.verticalAxis.titleColor">
            </amexio-column>

          </amexio-row>
        </amexio-fieldset>
      </ng-container>
    </ng-container>
 

  `
})
export class ChartProperties {
  @Input() componentInstance: any;
  @Input() candlesStickChart: boolean;
  @Input() title: boolean;
  @Input() legend: boolean;
  @Input() horizontal: boolean;
  @Input() vertical: boolean;
  @Input() stacked: boolean;
  @Input() is3d: boolean;
  @Input() treemap: boolean;
  @Input() gauge: boolean;
  positionData: any;
  alignmentData: any;
  constructor() {
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
}
