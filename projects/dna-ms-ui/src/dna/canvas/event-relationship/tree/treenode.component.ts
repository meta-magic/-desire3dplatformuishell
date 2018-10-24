/**
 * Created by ketangote on 11/23/17.
 */

import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  DoCheck,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef
} from '@angular/core';

@Component({
  selector: 'service-component-tree',
  template: `

    <li class="treenode" *ngFor="let node of data" >
      <div class="treenode-content">
          <span class="treenode-toggler" (click)="onClick(node)" *ngIf="node[childKey] && (node[childKey].length>0)">
            <span *ngIf="node.expand">&#9662;</span>
            <span *ngIf="!node.expand">&#9656;</span>
          </span>
        <span class="treenode-label">
            <span *ngIf="enableCheckBox">
              <input type="checkbox" [checked]="'checked'?node.checked:null" (click)="emitCheckedData(node)"/>
            </span>
            <span (click)="onNodeClick(node)">

              <ng-container *ngIf="templates == null">
                <label draggable="true" (drag)="dragTreeNode($event,node)">{{getNodeKey(node)}}</label>
              </ng-container>

              <ng-template *ngIf="templates != null"
                           [ngTemplateOutlet]="parentTmp"
                           [ngTemplateOutletContext]="{ $implicit: { text: node[nodeKey] } , icon: node.icon,node : node }">
              </ng-template>
            </span>
          </span>
      </div>
      <ul class="treenode-children" style="display: block;" *ngIf="node.expand && node[childKey] && (node[childKey].length>0)">
        <service-component-tree [data]="node[childKey]" (nodeClick)="onNodeClick($event)" [templates]="templates" [enableCheckBox]="enableCheckBox" (onTreeNodeChecked)="onTreeNodeCheck($event)" (treeNodeDrag)="dragEmitData($event)"></service-component-tree>
      </ul>
    </li>

  `
})
export class TreeViewComponent implements OnInit, AfterViewInit, DoCheck {
  @Input() data: any[];

  @Input() httpUrl: string;

  @Input() httpMethod: string;

  @Input() dataReader: string;

  @Output() nodeClick: any = new EventEmitter<any>();

  @Output() treeDataStructure: any = new EventEmitter<any>();

  @Output() treeNodeDrag: any = new EventEmitter<any>();

  @Input() enableCheckBox = false;

  @Input() templates: any;

  @Input() childKey: string;

  @Input() nodeKey: string;

  @ContentChild('amexioTreeTemplate') parentTmp: TemplateRef<any>;

  @Output() onTreeNodeChecked: any = new EventEmitter<any>();

  previousValue: any;

  responseData: any;

  constructor(private cdf: ChangeDetectorRef) {
    this.childKey = 'children';
    this.nodeKey = 'text';
  }

  ngOnInit() {
    this.setData(this.data);
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
  onTreeNodeCheck(data: any) {
    this.onTreeNodeChecked.emit(this.data);
  }
  ngDoCheck() {
    if (
      JSON.stringify(this.previousValue) !== JSON.stringify(this.data) &&
      this.previousValue != null &&
      this.data != null
    ) {
      this.previousValue = JSON.parse(JSON.stringify(this.data));
      this.setData(this.data);
    }
  }

  onClick(node: any) {
    node.expand = !node.expand;
  }

  onNodeClick(node: any) {
    this.treeDataStructure.emit(this.data);
    this.nodeClick.emit(node);
  }
  setData(httpResponse: any) {
    //Check if key is added?
    let responsedata = httpResponse;
    if (this.dataReader != null) {
      const dr = this.dataReader.split('.');
      for (let ir = 0; ir < dr.length; ir++) {
        responsedata = responsedata[dr[ir]];
      }
    } else {
      responsedata = httpResponse;
    }
    this.data = responsedata;
  }

  emitCheckedData(checkedData: any) {
    checkedData.checked = !checkedData.checked;

    if (checkedData.checked) {
      if (checkedData.hasOwnProperty(this.childKey)) {
        checkedData[this.childKey].forEach((option: any) => {
          option.checked = true;
          if (option.hasOwnProperty(this.childKey)) {
            this.setCheckedStatusFromParent(option);
          }
        });
      }
      this.onTreeNodeChecked.emit(this.data);
    } else {
      if (checkedData.hasOwnProperty(this.childKey)) {
        checkedData[this.childKey].forEach((option: any) => {
          option.checked = false;
          if (option.hasOwnProperty(this.childKey)) {
            this.searchObject(option);
          }
        });
      }
      this.onTreeNodeChecked.emit(this.data);
    }
  }

  searchObject(object: any) {
    object[this.childKey].forEach((childOption: any) => {
      childOption.checked = false;
      if (childOption.hasOwnProperty(this.childKey)) {
        this.searchObject(childOption);
      }
    });
  }

  setCheckedStatusFromParent(object: any) {
    object[this.childKey].forEach((childOption: any) => {
      childOption.checked = true;
      if (childOption.hasOwnProperty(this.childKey)) {
        this.setCheckedStatusFromParent(childOption);
      }
    });
  }

  dragTreeNode(event: any, nodeData: any) {
    this.dragEmitData(nodeData);
  }

  dragEmitData(event: any) {
    this.treeDataStructure.emit(this.data);
    this.treeNodeDrag.emit(event);
  }

  getNodeKey(node: any): string {
    let nodeKeyData: any;
    const keys = this.nodeKey.split('.');
    let data: any;
    for (let ir = 0; ir < keys.length; ir++) {
      if (data == null) {
        let key: any;
        key = keys[ir];
        data = node[key];
      } else {
        data = data[keys[ir]];
      }
      nodeKeyData = data;
    }
    return nodeKeyData;
  }
}
