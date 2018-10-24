/**
 * Created by dattaram on 12/3/18.
 */
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'canvas-childtree-data-table',
  template: `
  <!--  <ng-container *ngFor="let row of data;let i=index">
      <div class="datatable-row"   (click)="setSelectedRow(row, $event)">
        <ng-container *ngFor="let cols of columns;let colIndex = index">
          <ng-container *ngIf="cols.datatype=='string'">
            <div class="datatable-col" [attr.data-label]="cols.text">
              <ng-container *ngIf="colIndex == 0">
              <span [ngStyle]="{'padding-left':(20*row.level)+'px'}">
                <ng-container *ngIf="!row.expanded && row.children">
                  <amexio-data-icon key="tree_collapse" (click)="toogle(row,i)"></amexio-data-icon>
                </ng-container>
                <ng-container *ngIf="row.expanded && row.children">
                  <amexio-data-icon key="tree_expand" (click)="toogle(row,i)"></amexio-data-icon>
                </ng-container>
                  <ng-container *ngIf="cols.bodyTemplate">
                <ng-template  [ngTemplateOutlet]="cols.bodyTemplate"
                              [ngTemplateOutletContext]="{ $implicit: { text : row[cols.dataindex] }, row: row }"></ng-template>
                </ng-container>
                 <ng-container *ngIf="row[cols.dataindex]!= null && row[cols.dataindex]!= '' && !cols.bodyTemplate ; else elseBlock">
                   <ng-container *ngIf="row[cols.editable]">
                     <input type="text" [attr.value]="row[cols.dataindex]"/>
                   </ng-container>
                   <ng-container *ngIf="!row[cols.editable]">
                                           &lt;!&ndash;<input type="text" [attr.value]="row[cols.dataindex]"/>&ndash;&gt;{{row[cols.dataindex]}}
                   </ng-container>
                    </ng-container>
                    <ng-template #elseBlock>
                      &nbsp;
                    </ng-template>
               </span>
              </ng-container>

              <ng-container *ngIf="colIndex > 0">
                <ng-container *ngIf="cols.bodyTemplate">
                  <ng-template  [ngTemplateOutlet]="cols.bodyTemplate"
                                [ngTemplateOutletContext]="{ $implicit: { text : row[cols.dataindex] }, row: row }"></ng-template>
                </ng-container>
                <ng-container *ngIf="row[cols.dataindex]!= null && row[cols.dataindex]!= '' && !cols.bodyTemplate">
                  {{row[cols.dataindex]}}
                </ng-container>
              </ng-container>
            </div>
          </ng-container>
        </ng-container>


      </div>

      <ng-container *ngIf="row.children && row.children.length > 1">
        <canvas-childtree-data-table [data]="row.children"></canvas-childtree-data-table>
      </ng-container>
    </ng-container>-->
   
  `
})
export class CanvasChildtreeDataTableComponent implements OnInit {
  @Input() data: any;
  constructor() {}

  ngOnInit() {}

  toogle(row: any, i: number) {

  }
}
