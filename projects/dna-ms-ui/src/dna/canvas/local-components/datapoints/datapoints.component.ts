/**
 * Created by pratik on 16/3/18.
 */

import {
  Component, Input, OnInit
} from '@angular/core';


@Component({
  selector: 'local-canvas-datapoint', template: `

    <div class="datapoints">
      <table width="100%" [style.background-color]="backgroundcolor" [style.color]="fontcolor">
        <tr *ngIf="north">
          <td [attr.colspan]="colspan">
            <ng-content select="amexio-north"></ng-content>
          </td>
        </tr>
        <tr>
          <td [ngStyle]="{'display' : west ? 'block' : 'none'}">
            <ng-content select="amexio-west"></ng-content>
          </td>
          <td [ngStyle]="{'display' : center ? 'block' : 'none'}">
            <ng-content select="amexio-center"></ng-content>
          </td>
          <td [ngStyle]="{'display' : east ? 'block' : 'none'}">
            <ng-content select="amexio-east"></ng-content>
          </td>
        </tr>
        <tr [ngStyle]="{'display' : south ? 'block' : 'none'}">
          <td [attr.colspan]="colspan">
            <ng-content select="amexio-south"></ng-content>
          </td>
        </tr>
      </table>
    </div>


  `, styles: [`
    .datapoints {
      background: white;
      color: #1f0000; }
    .datapoints .datapoints-north {
      color: #1f0000; }
    .datapoints .datapoint-south {
      background-color: #1f0000;
      color: #ff9e9e; }
    .datapoints .datapoint-west {
      padding: 5px; }
    .datapoints .datapoint-east {
      padding: 5px; }

    /** Datapoints - Structure CSS **/
    .datapoints {
      font-size: 125%;
      /* Border */
      border-radius: 0px;
      border: 1px solid #ced4da;
      padding: 0px;
      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1); }
    .datapoints .datapoints {
      border: none;
      box-shadow: none; }
    .datapoints .datapoint-south {
      border-radius: 0px;
      padding: 5px;
      margin: 1px; }
    .datapoints .datapoint-west {
      padding: 5px; }
    .datapoints .datapoint-east {
      padding: 5px; }
  `]
})

export class CanvasLocalDataPointsComponent implements OnInit {

  @Input() north: boolean;

  @Input() south: boolean;

  @Input() west: boolean;

  @Input() center: boolean;

  @Input() east: boolean;

  @Input('background-color') backgroundcolor: string;

  @Input('font-color') fontcolor: string;

  colspan: number;


  constructor() {
    this.colspan = 1;
  }

  ngOnInit() {


    if (this.west) this.colspan++;

    if (this.east) this.colspan++;


  }


}
