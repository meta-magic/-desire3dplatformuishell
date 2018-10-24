/**
 * Created by ketangote on 11/23/17.
 */

import {
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef
} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'amexio-treeview-canvas',
  template: `
    <div *ngIf="data == null" style="height: 300px;width: 300px;">
      <div class="spinner"></div>
    </div>
    <li class="treenode" *ngFor="let node of data" >
      <div class="treenode-content" (click)="onClick(node)">
          <span class="treenode-toggler"  *ngIf="node.children && (node.children.length>0)">
            <span *ngIf="node.expand"><i class="fa fa-chevron-down"></i> </span>
            <span *ngIf="!node.expand"><i class="fa fa-chevron-right"></i> </span>
          </span>
        <span class="treenode-toggler" *ngIf="!node.children || (node.children.length == 0)">
            <span class="treenode-empty-space">
            </span>
          </span>
        <span class="treenode-label" draggable="true" (dragstart)="onNodeDrag({event:$event,data:node})">
            <span *ngIf="enablecheckbox">
              <input type="checkbox" [checked]="'checked'?node.checked:null" (click)="emitCheckedData(node)"/>
            </span>
            <span (click)="onNodeClick(node)">

              <ng-container *ngIf="templates == null">
                <span *ngIf="node.icon" [ngClass]="node.icon" aria-hidden="true"> </span>
                <label (dragstart)="onNodeDrag({event:$event,data:node})">&nbsp;{{node.text}}</label>
              </ng-container>

              <ng-template *ngIf="templates != null"
                           [ngTemplateOutlet]="parentTmp"
                           [ngTemplateOutletContext]="{ $implicit: { text: node.text } , icon: node.icon,node : node }">
              </ng-template>
            </span>
          </span>
      </div>
      <ul class="treenode-children" style="display: block;" *ngIf="node.expand && node.children && (node.children.length>0)">
        <amexio-treeview-canvas [data]="node.children" (nodeClick)="onNodeClick($event)" [templates]="templates" [enable-checkbox]="enablecheckbox" (onDrag)="onNodeDrag($event)" (onTreeNodeChecked)="this.onTreeNodeCheck($event)" ></amexio-treeview-canvas>
      </ul>
    </li>

  `
})
export class AmexioTreeViewComponentCanvas {
  @Input() data: any[];

  @Input('http-url') httpurl: string;

  @Input('http-method') httpmethod: string;

  @Input('data-reader') datareader: string;

  @Output() nodeClick: any = new EventEmitter<any>();

  @Input('enable-checkbox') enablecheckbox = false;

  @Input() templates: any;

  @ContentChild('amexioTreeTemplate') parentTmp: TemplateRef<any>;

  @Output() onTreeNodeChecked: any = new EventEmitter<any>();

  @Output() onDrag: any = new EventEmitter<any>();

  previousValue: any;

  responseData: any;

  constructor(private cdf: ChangeDetectorRef, private http: HttpClient) {}

  ngOnInit() {
    if (this.httpmethod && this.httpurl) {
      this.http.get(this.httpurl).subscribe(
        response => {
          this.responseData = response;
        },
        error => {
          console.error(error);
        },
        () => {
          this.setData(this.responseData);
        }
      );
    } else if (this.data) {
      this.setData(this.data);
      this.previousValue = JSON.parse(JSON.stringify(this.data));
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.parentTmp != null) {
        this.templates = { treeNodeTemplate: this.parentTmp };
      } else if (this.templates != null) {
        this.parentTmp = this.templates.treeNodeTemplate;
      }
    });
    this.cdf.detectChanges();
  }

  ngDoCheck() {
    if (
      JSON.stringify(this.previousValue) != JSON.stringify(this.data) &&
      this.data != null
    ) {
      this.previousValue = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }
  }

  onClick(node: any) {
    node.expand = !node.expand;
  }

  onNodeDrag(node: any) {
    node.event.dataTransfer.setData('dragData', JSON.stringify(node.data));
    this.onDrag.emit(node);
  }

  onNodeClick(node: any) {
    this.nodeClick.emit(node);
    this.activateNode(this.data, node);
  }

  activateNode(data: any[], node: any) {
    for (let i = 0; i < data.length; i++) {
      if (node === data[i] && !data[i]['children']) {
        data[i]['active'] = true;
      } else {
        data[i]['active'] = false;
      }

      if (data[i]['children']) {
        this.activateNode(data[i]['children'], node);
      }
    }
  }

  setData(httpResponse: any) {
    let responsedata = httpResponse;
    if (this.datareader != null) {
      let dr = this.datareader.split('.');
      for (let ir = 0; ir < dr.length; ir++) {
        responsedata = responsedata[dr[ir]];
      }
    } else {
      responsedata = httpResponse;
    }
    this.data = responsedata;
    this.activateNode(this.data, null);
  }

  emitCheckedData(checkedData: any) {
    checkedData.checked = !checkedData.checked;

    if (checkedData.checked) {
      if (checkedData.hasOwnProperty('children')) {
        checkedData.children.forEach((option: any) => {
          option.checked = true;
          if (option.hasOwnProperty('children')) {
            this.setCheckedStatusFromParent(option);
          }
        });
      }
      this.onTreeNodeChecked.emit(this.data);
    } else {
      if (checkedData.hasOwnProperty('children')) {
        checkedData.children.forEach((option: any) => {
          option.checked = false;
          if (option.hasOwnProperty('children')) {
            this.searchObject(option);
          }
        });
      }
      this.onTreeNodeChecked.emit(this.data);
    }
  }

  searchObject(object: any) {
    object.children.forEach((childOption: any) => {
      childOption.checked = false;
      if (childOption.hasOwnProperty('children')) {
        this.searchObject(childOption);
      }
    });
  }

  setCheckedStatusFromParent(object: any) {
    object.children.forEach((childOption: any) => {
      childOption.checked = true;
      if (childOption.hasOwnProperty('children')) {
        this.setCheckedStatusFromParent(childOption);
      }
    });
  }

  onTreeNodeCheck(data: any) {
    this.onTreeNodeChecked.emit(this.data);
  }
}
