import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  LoaderService,
  LocalStorageService,
  MessagingService
} from 'platform-commons';
import { NotificationService } from 'platform-commons';
@Component({
  selector: 'menu-builder',
  template: `
  <amexio-row>
  <amexio-column [size]="12">
  <div class="menu-card-style">
  <amexio-card  [header]="true" [body-height]="80" [footer]="true" [footer-align]="'right'">
  <amexio-header>
   <amexio-row>
    <amexio-column [size]="12">
       <amexio-radio-group 
                name ="menuModel.menuTypeId"
                [default-value]="menuModel.menuTypeId"
                [data-reader]="'response.data'"
                [display-field]="'menuTypeName'"
                [value-field]="'menuTypeId'"
                [horizontal]="true"
                [data]="menuTypeData"
                (onSelection)="setMenuType($event)">
       </amexio-radio-group>
    </amexio-column>
   </amexio-row>
  </amexio-header> 
  <amexio-body>
   <amexio-row>
 <amexio-column [size]="3">
   <div class="menu-tree-style">
    <amexio-card  [header]="true" [footer]="false" [body-height]="55">
     <amexio-header>

         <div style=" display: flex; justify-content: space-between;">
             <div> Existing Menu</div>
             <div>
                 <amexio-image style="cursor:pointer;" [icon-class]="'fa fa-refresh 2x'" [tooltip]="'Reload'" (onClick)="getUIDesignData()"></amexio-image>
                 &nbsp;<amexio-image style="cursor:pointer;" [icon-class]="'fa fa-copy 2x'" [tooltip]="'copy all to side menus'" (onClick)="onCopyAllToMenus()"></amexio-image>
             </div>
         </div>
     
    </amexio-header>
     <amexio-body>
              <amexio-treeview
                  [badge]="true"
                  [enable-drag]="true"
                  [enable-drop]="false" 
                  [data]="UiTreeData"
                  (onDrag)="onDrag($event)"
                  [across-tree]="true">
              </amexio-treeview>
     </amexio-body>
    </amexio-card>
   </div>
 </amexio-column>
 <amexio-column [size]="9">
     <div class="menu-accordian-style">
         <amexio-card  [header]="false" [footer]="false" [body-height]="58">
             <amexio-body>
                 <div class="loadingnav" *ngIf="loaderService.isLoading"></div>
                 <amexio-accordion>
                     <ng-container *ngIf="navBarActive">
                         <amexio-accordion-tab header="Side Nav Bar" [active]="navBarActive" [disabled]="navBarDisable">
                             <canvas-tree-data-table *ngIf="treeLocalData" [data]="treeLocalData">
                                 <canvas-tree-column [data-index]="'text'" [data-type]="'string'" [hidden]="false" [text]="'Menus'" [width]="40">
                                     <ng-template #amexioHeaderTmpl let-column="column" let-index="index">
                                         {{column.text}} &nbsp; &nbsp; <amexio-image [icon-class]="'fa fa-plus'"  [tooltip]="'Add node'" (onClick)="onNodeClick()"></amexio-image>
                                     </ng-template>
                                     <ng-template #amexioBodyTmpl  let-index="index" let-column let-row="row">             
            <span (dragleave)="dragleave($event)" (mouseout)="onMouseOut($event)" (dragover)="onsideNavDragOver({event:$event,row:row})" (drop)="onsideNavDrop({event:$event,row:row,index:index})">
                   <ng-container *ngIf="row.isEditable;else label">
                    <input type="text"  name="row.text" [(ngModel)]="row.text" (blur)="onTextClick(row)"/>           
                   </ng-container>
                   <ng-template #label>
                   <i [attr.class]="row.icon"></i> {{row.text}}
                   </ng-template>
            </span>
                                     </ng-template>
                                 </canvas-tree-column>
                                 <canvas-tree-column [data-index]="'icon'" [data-type]="'string'" [hidden]="false" [text]="'Change Icon'" [width]="20">
                                     <ng-template #amexioBodyTmpl  let-index="index" let-column let-row="row">
                                         <amexio-button  label="Icon" size="medium" type="green" (onClick)="onIconOpenWindow(row)"></amexio-button>
                                     </ng-template>
                                 </canvas-tree-column>
                                 <canvas-tree-column [data-index]="'action'" [data-type]="'string'" [hidden]="false" [text]="'Action'" [width]="20">
                                     <ng-template #amexioBodyTmpl  let-index="index" let-column let-row="row">
                                         <amexio-image (onClick)="editNode(row)" [icon-class]="'fa fa-edit fa-2x'" [tooltip]="'edit'"></amexio-image>
                                         &nbsp;
                                         <amexio-image style="color:red;" (onClick)="onSideNavRemoveClick(row,index)" [icon-class]="'fa fa-minus-circle fa-2x'" [tooltip]="'remove'"></amexio-image>
                                         &nbsp;
                                         <ng-container *ngIf="!row.leaf">
                                             <amexio-image style="color:green;" (onClick)="addNode({row:row,index:index})" [icon-class]="'fa fa-plus-circle fa-2x'" [tooltip]="'add node'"></amexio-image>
                                         </ng-container>
                                     </ng-template>
                                 </canvas-tree-column>
                             </canvas-tree-data-table>
                         </amexio-accordion-tab>
                     </ng-container>

                     <ng-container *ngIf="topBarActive">
                         <amexio-accordion-tab header="Top Bar" [active]="topBarActive" [disabled]="topBarDisable">
                             <canvas-tree-data-table *ngIf="topBarData" [data]="topBarData">
                                 <canvas-tree-column [data-index]="'text'" [data-type]="'string'" [hidden]="false" [text]="'Menus'" [width]="40">
                                     <ng-template #amexioHeaderTmpl let-column="column" let-index="index">
                                         {{column.text}} &nbsp; &nbsp; <amexio-image [icon-class]="'fa fa-plus'"  [tooltip]="'Add node'" (onClick)="addTopBarNode()"></amexio-image>
                                     </ng-template>
                                     <ng-template #amexioBodyTmpl  let-index="index" let-column let-row="row">             
            <span (dragleave)="menudragleave($event)" (mouseout)="menuonMouseOut($event)" (dragover)="onMenuDragOver({event:$event,row:row})" (drop)="onMenuDrop({event:$event,row:row,index:index})">
                   <ng-container *ngIf="row.isEditable;else label">
                    <input type="text"  name="row.text" [(ngModel)]="row.text" (blur)="ontopMenuTextClick(row)"/>           
                   </ng-container>
                   <ng-template #label>
                   <i [attr.class]="row.icon"></i> {{row.text}}
                   </ng-template>
            </span>
                                     </ng-template>
                                 </canvas-tree-column>
                                 <canvas-tree-column [data-index]="'icon'" [data-type]="'string'" [hidden]="false" [text]="'Change Icon'" [width]="20">
                                     <ng-template #amexioBodyTmpl  let-index="index" let-column let-row="row">
                                         <amexio-button  [tooltip]="'change icon'" label="Icon" size="medium" type="green" (onClick)="onIconOpenWindow(row)"></amexio-button>
                                     </ng-template>
                                 </canvas-tree-column>
                                 <canvas-tree-column [data-index]="'action'" [data-type]="'string'" [hidden]="false" [text]="'Action'" [width]="20">
                                     <ng-template #amexioBodyTmpl  let-index="index" let-column let-row="row">
                                         <amexio-image (onClick)="editNode(row)" [icon-class]="'fa fa-edit fa-2x'" [tooltip]="'edit'"></amexio-image>
                                         &nbsp;
                                         <amexio-image style="color:red;" (onClick)="onTopBarRemoveClick(row,index)" [icon-class]="'fa fa-minus-circle fa-2x'" [tooltip]="'remove'"></amexio-image>
                                     </ng-template>
                                 </canvas-tree-column>
                             </canvas-tree-data-table>
                         </amexio-accordion-tab>
                     </ng-container>

                 </amexio-accordion>
             </amexio-body>
         </amexio-card>
     </div>

  <ng-container *ngIf="iconWindow">
    <canvas-icon-search  [iconWindow]="iconWindow" (getSelectedIcon)="getSelectedIcon($event)"></canvas-icon-search>
  </ng-container>

 </amexio-column>
 </amexio-row>
              
</amexio-body>
<amexio-action >
<amexio-button [loading]="asyncFlag" [tooltip]="'save'" [icon]="'fa fa-save'" [label]="'Save'" [type]="'primary'" (onClick)="saveMenuData()"></amexio-button>
  </amexio-action>
</amexio-card>  
</div>
<amexio-row>
  <amexio-column>
  <amexio-dialogue [show-dialogue]="isValidateForm" [message-type]="'error'" [closable]="true" [title]="'Error'" [type]="'alert'"
[custom]="true" (close)="isValidateForm = !isValidateForm">
<amexio-body>
  <ol>
      <li *ngFor="let msgObj of validationMsgArray let index=index">{{msgObj}}</li>
  </ol>
</amexio-body>
<amexio-action>
  <amexio-button type="primary" (onClick)="okErrorBtnClick()" [label]="'Ok'">
  </amexio-button>
</amexio-action>
</amexio-dialogue>
<amexio-dialogue [show-dialogue]="confirmdialogue"
               [title]="'Confirm'"
               [message]="'Do you want to override side menu?'"
               [message-type]="'confirm'"
               [type]="'confirm'"
               (actionStatus)="checkStatus($event)"
               (close)="confirmdialogue = !confirmdialogue">
</amexio-dialogue>
<dna-notification></dna-notification>

`
})
export class MenuBuilderComponent implements OnInit {
  UiTreeData: any[] = [];
  menuModel: MenuModel;
  menuTypeData: any;
  treenodeObj: any;
  treeLocalData: any[] = [];
  topBarData: any[] = [];

  componentInstance: any;
  iconWindow: boolean;
  nodeDataForIcon: any;
  dragedDatanode: any;
  isPresentFlag: boolean = false;
  asyncFlag: boolean = false;
  isLoading: boolean = false;
  nodepresernt: boolean = false;
  topBarDisable: boolean;
  navBarDisable: boolean;
  topBarActive: boolean;
  navBarActive: boolean;
  validationMsgArray: any[] = [];
  isValidateForm: boolean = false;
  msgData: any[] = [];
  confirmdialogue: boolean = false;
  constructor(public cdf: ChangeDetectorRef, private http: HttpClient, public loaderService: LoaderService,
    public _notificationService: NotificationService) {
    this.menuModel = new MenuModel();
    this.menuTypeData = {
      response: {
        data: [
          {
            menuTypeName: 'Side Nav Bar',
            menuTypeId: 1,
            disabled: false
          },
          {
            menuTypeName: 'Top Bar',
            menuTypeId: 2,
            disabled: false
          },
          {
            menuTypeName: 'Both',
            menuTypeId: 3,
            disabled: false
          }
        ]
      }
    };


  }
  ngOnInit() {
    this.getUIDesignData();
    this.getMenuData();
    this.setAcoordion();
  }
  setAcoordion() {
    if (this.menuModel.menuTypeId == 1) {
      this.topBarActive = false;
      this.navBarDisable = false;
      this.navBarActive = true;
      this.topBarDisable = true;

    } else if (this.menuModel.menuTypeId == 2) {
      this.navBarActive = false;
      this.topBarDisable = false;
      this.topBarActive = true;
      this.navBarDisable = true;
    } else if (this.menuModel.menuTypeId == 3) {
      this.navBarDisable = false;
      this.topBarDisable = false;
      this.navBarActive = true;
      this.topBarActive = true;
    }
  }
  createErrorData() {
    let errorData: any[] = [];
    let errorObj: any = {};
    errorObj['data'] = [];
    errorObj.data = this.validationMsgArray;
    errorData.push(errorObj);
    this._notificationService.showerrorData('Error Message', errorData);
  }

  okErrorBtnClick() {
    this.isValidateForm = false;
    this.validationMsgArray = [];
  }

  // GET ALL UI DESIGN IN PROJECT
  getUIDesignData() {
    this.validationMsgArray = [];
    let designRresponse: any;
    this.http.get('/api/dna/appmenus/findAllUis').subscribe(
      res => {
        designRresponse = res;
      },
      err => {
        this.validationMsgArray.push('Unable to connect to server');
        this.createErrorData();
      },
      () => {
        if (designRresponse.success) {
          if (designRresponse.response == null) {
          } else {
            this.UiTreeData = designRresponse.response;

          }
        }

      }
    );
  }
  showCofirmation() {
    this.confirmdialogue = !this.confirmdialogue;
  }
  checkStatus(event: any) {
    if (event === "ok") {
      this.treeLocalData = [];
      this.onCopyAllToMenus();
    }
  }

  onCopyAllToMenus() {
    if (this.treeLocalData.length > 0) {
      this.showCofirmation();
    } else {
      this.menuModel.menuTypeId = 1;
      this.setAcoordion();
      let treeData = Object.assign(this.UiTreeData);
      if (this.treeLocalData) {
        treeData.forEach((obj: any, index: any) => {
          if (obj.hasOwnProperty('children') && obj.children && obj.children.length > 0) {
            this.CheckNodeAndAddNodeId(obj.children);
          }
          if (obj) {
            obj['isEditable'] = false;
            obj['level'] = 1;
            obj['nodeId'] = Math.floor(Math.random() * 90000) + 10000 + "";
            obj.expanded = false;
          }
          this.treeLocalData.push(obj);
        });
        this.setMappedFlag(this.UiTreeData);
      }
    }
  }

  // GET DRAG NODE DATA FROM TREE UI
  onDrag(data: any) {
    // data.event.dataTransfer.setData('nodedata', JSON.stringify(data.data));
    this.dragedDatanode = {};
    this.isPresentFlag = false;
    this.dragedDatanode = JSON.parse(JSON.stringify(data.data));
  }

  //DRAG OVER ON DROP TARGET
  onDragOver(event: any, row: any) {
    event.preventDefault();
    if (row.leaf == true) {
      event.dataTransfer.dropEffect = "none"
    }
    this.checkDragNodeAvailability(event, row)
  }

  onsideNavDragOver(event: any) {
    this.onDragOver(event.event, event.row);
  }


  dragleave(event: any) {
    event.target.style.border = '';
  }

  onMouseOut(event: any) {
    event.target.style.border = '';
  }

  //CHECK  DRAGED NODE IS ALLOWED TO DROP  IN TARGET DROP NODE
  checkDragNodeAvailability(event: any, row: any) {
    if (row.hasOwnProperty('children') && row.children && row.children.length > 0) {
      row.children.forEach((obj: any) => {
        if (obj.id === this.dragedDatanode.id) {
          this.isPresentFlag = true;
        }
      });
    }
    else if (row.children.length = 0) {
      event.target.style.border = "3px dotted green";
    }
    if (!this.isPresentFlag) {
      event.target.style.border = "3px dotted green";
    } else {
      event.target.style.border = "3px dotted red";
    }
  }

  //PUSH DRAGED NODE IN TARGET DROP NODE
  onsideNavDrop(event: any) {
    this.onDrop(event.event, event.row, event.index, this.treeLocalData);
  }
  onDrop(event: any, row: any, index: number, data: any) {
    if (!this.isPresentFlag) {
      this.dragedDatanode.isEditable = false;
      this.addNodeId(this.dragedDatanode);
      row.children.push(this.dragedDatanode);
      this.checkDragNodeandSetMappedFlag(this.UiTreeData, this.dragedDatanode);
    }
    event.target.style.border = '';
    this.toogle(row, index, data);
  }

  //ADD 'nodeId' VARIABLE IN EVERY DRAGED NODE AND IN CHILDS OF THAT NODE FOR UI PRESPECTIVE ACTIONS
  addNodeId(data: any) {
    data.nodeId = Math.floor(Math.random() * 90000) + 10000 + "";
    if (data.hasOwnProperty("children") && data.children && data.children.length > 0) {
      this.CheckNodeAndAddNodeId(data.children);
    }
  }

  //ADD 'nodeId' VARIABLE IN EVERY CHILD OF DRAGED NODE FOR UI PRESPECTIVE ACTIONS
  CheckNodeAndAddNodeId(data: any) {
    data.forEach((child: any) => {
      child.nodeId = Math.floor(Math.random() * 90000) + 10000 + "";
      if (child.hasOwnProperty("children") && child.children && child.children.length > 0) {
        this.CheckNodeAndAddNodeId(child.children);
      }
    });
  }

  //AFTER DROPED NODE IN MENUS SET MAPPED FLAG TO DROAG NODE IN TREE UI DATA
  checkDragNodeandSetMappedFlag(treeData: any, dragNode: any) {
    treeData.forEach((childNode: any) => {
      if (JSON.stringify(childNode.id) === JSON.stringify(dragNode.id)) {
        // treeData.splice(index, 1);
        childNode.badge = "M"
        if (childNode.hasOwnProperty("children") && childNode.children && childNode.children.length > 0) {
          this.setMappedFlag(childNode.children)
        }
      }
      if (childNode.hasOwnProperty("children") && childNode.children && childNode.children.length > 0) {
        childNode.children.badge = "M";
        this.checkDragNodeandSetMappedFlag(childNode.children, dragNode);
      }
    });
  }


  setMappedFlag(data: any) {
    data.forEach((child: any) => {
      child.badge = "M"
      if (child.hasOwnProperty("children") && child.children && child.children.length > 0) {
        this.setMappedFlag(child.children);
      }
    });
  }

  setMenuType(event: any) {
    this.menuModel.menuTypeId = event.menuTypeId;
    this.setAcoordion();
  }

  toogle(row: any, index: number, data: any) {
    row.expanded = true;
    if (row.expanded) {
      this.addRows(row, index, data);
    }
    this.cdf.detectChanges();
  }

  addRows(row: any, index: number, data: any) {
    this.removeRows(row, data);
    if (row.hasOwnProperty('children') && row.children.length > 0) {
      for (let i = 0; i < row.children.length; i++) {
        const node = row.children[i];
        if (!row.level) {
          row.level = 1;
        }
        if (node.children) {
          node.expanded = false;
        }
        node.level = row.level + 1;
        data.splice(index + (i + 1), 0, node);
      }
    }
  }

  removeRows(node: any, data: any) {
    if (node.hasOwnProperty('children') && node.children != null && node.children.length > 0) {
      for (let i = 0; i < node.children.length; i++) {
        for (let j = 0; j < data.length; j++) {
          if (data[j] === node.children[i]) {
            if (node.children[i].children) {
              this.removeRows(node.children[i], data);
            }
            data.splice(
              data.indexOf(node.children[i]),
              1
            );
          }
        }
      }
    }
  }

  //ADD NEW NODE AT FIRST LEVEL
  onNodeClick() {
    let treenodeObj: any;
    treenodeObj = this.createBlankObject(Math.floor(Math.random() * 90000) + 10000 + "");
    this.treeLocalData.push(treenodeObj);
  }

  //ADD NEW NODE
  addNode(event: any) {
    let nodeObj = this.createBlankObject(Math.floor(Math.random() * 90000) + 10000 + "");
    event.row.children.push(nodeObj);
    this.toogle(event.row, event.index, this.treeLocalData);
  }

  //CREATE NEW NODE OBJECT
  createBlankObject(newId: String): any {
    let nodeObj: any;
    nodeObj = {
      "nodeId": newId,
      "text": "New Node",
      "icon": "fa fa-folder-open-o",
      "expand": false,
      "expanded": false,
      "level": 1,
      "isEditable": false,
      "leaf": false,
      "children": []
    }
    return nodeObj;
  }

  //REMOVE NODE ON REMOVE CLICK

  onSideNavRemoveClick(row: any, index: any) {
    this.removeRows(row, this.treeLocalData);
    let cloneObj = Object.assign(this.treeLocalData);
    cloneObj.forEach((obj: any, index: any) => {
      if (obj.hasOwnProperty('children') && obj.children && obj.children.length > 0) {
        obj.children.forEach((opt: any, index: any) => {
          if (row.nodeId === opt.nodeId) {
            obj.children.splice(index, 1)
          }
        });
      }
      if (row.nodeId === obj.nodeId) {
        cloneObj.splice(index, 1);
      }
    });
    this.treeLocalData = cloneObj;
    this.cdf.detectChanges();
    let data: any = [];
    data = data.concat(this.treeLocalData, this.topBarData);
    this.removeData(row, index, data);
  }
  removeData(row: any, index: any, data: any) {
    this.checkRemovedNodeAvailablity(row, data);
  }

  checkRemovedNodeAvailablity(row: any, data: any) {
    this.nodepresernt = false;
    let cloneObj = Object.assign(data);
    this.checkRemovednode(row, cloneObj)
    if (!this.nodepresernt) {
      this.removedMappedObj(row, this.UiTreeData);
    }
    if (row.hasOwnProperty('children') && row.children && row.children.length > 0) {
      this.checkRemovedNodeChildAvailabilty(row, data);
    }
  }

  checkRemovednode(row: any, treedata: any) {
    treedata.forEach((childNode: any) => {
      if (JSON.stringify(childNode.id) === JSON.stringify(row.id)) {
        this.nodepresernt = true
      }
      if (childNode.hasOwnProperty("children") && childNode.children && childNode.children.length > 0) {
        this.checkRemovednode(row, childNode.children);
      }
    });

  }
  checkRemovedNodeChildAvailabilty(row: any, data: any) {
    if (row.hasOwnProperty('children') && row.children && row.children.length > 0) {
      row.children.forEach((childnode: any) => {
        this.checkRemovedNodeAvailablity(childnode, data);
      });
    }
  }

  //REMOVE MAPPED FLAG ON NODE FROM UI TREE DATA NODE
  removedMappedObj(row: any, treedata: any) {
    treedata.forEach((childNode: any) => {
      if (JSON.stringify(childNode.id) === JSON.stringify(row.id)) {
        childNode.badge = ""
      }
      if (childNode.hasOwnProperty("children") && childNode.children && childNode.children.length > 0) {
        this.removedMappedObj(row, childNode.children);
      }
    });
  }

  //EDIT NODE ON EDIT CLICK
  editNode(row: any) {
    if (!row.isEditable)
      row.isEditable = true;
  }

  onTextClick(row: any) {
    row.isEditable = false;
  }

  //TO OPEN ICON WINDOW  ON ICON CLICK
  onIconOpenWindow(rowData: any) {
    this.iconWindow = !this.iconWindow;
    this.nodeDataForIcon = rowData;
  }
  getSelectedIcon(icon: any) {
    this.nodeDataForIcon.icon = icon;
    this.iconWindow = !this.iconWindow;
  }

  //GET SAVED MENU DATA FOR UPDATE
  getMenuData() {
    this.validationMsgArray = [];
    this.loaderService.showLoader();
    let menuresponse: any;
    this.http.get('/api/dna/appmenus/findByProjectId').subscribe(
      res => {
        menuresponse = res;
      },
      err => {
        this.validationMsgArray.push('Unable to connect to server');
        this.createErrorData();
        this.loaderService.hideLoader();
      },
      () => {
        if (menuresponse.success) {
          if (menuresponse.response == null) {
          } else {
            this.menuModel.menuTypeId = menuresponse.response.menuType;
            this.setAcoordion();
            let updataedSidenavData = menuresponse.response.sideNavMenu
            updataedSidenavData.forEach((obj: any, index: any) => {
              if (obj.hasOwnProperty('children') && obj.children && obj.children.length > 0) {
                this.CheckNodeAndAddNodeId(obj.children);
              }
              if (obj) {
                obj['isEditable'] = false;
                obj['level'] = 1;
                obj['nodeId'] = Math.floor(Math.random() * 90000) + 10000 + "";
              }
            });
            this.treeLocalData = updataedSidenavData;
            this.cdf.detectChanges();
            let updataedTopBarData = menuresponse.response.topNavMenu
            updataedTopBarData.forEach((obj: any, index: any) => {
              if (obj.hasOwnProperty('children') && obj.children && obj.children.length > 0) {
                this.CheckNodeAndAddNodeId(obj.children);
              }
              if (obj) {
                obj['isEditable'] = false;
                obj['level'] = 1;
                obj['nodeId'] = Math.floor(Math.random() * 90000) + 10000 + "";
              }
            });
            this.topBarData = updataedTopBarData;
            this.cdf.detectChanges();
          }
          this.loaderService.hideLoader();
        } else {
          this.loaderService.hideLoader();
          this.validationMsgArray.push(menuresponse.errorMessage);
          this.createErrorData();
          this.loaderService.hideLoader();
        }

      }
    );
  }


  collapseAll() {
    this.operationCollapse(this.treeLocalData);
    this.operationCollapse(this.topBarData);

  }

  operationCollapse(data: any) {
    if (data && data.length > 0) {
      data.forEach((obj: any) => {
        if (obj.hasOwnProperty("children") && obj.children && obj.children.length > 0)
          this.removeRows(obj, data);
        obj.expanded = false;
        this.operationCollapse(obj.children);
      });
    }
  }

  /***************************FOR TOP MENU BAR******************************************************/

  addTopBarNode() {
    let treenodeObj: any;
    treenodeObj = this.createBlankObject(Math.floor(Math.random() * 90000) + 10000 + "");
    this.topBarData.push(treenodeObj);
  }

  menudragleave(event: any) {
    event.target.style.border = '';
  }

  menuonMouseOut(event: any) {
    event.target.style.border = '';
  }

  onMenuDragOver(event: any) {
    event.event.preventDefault();
    if (event.row.leaf == true) {
      event.event.dataTransfer.dropEffect = "none"
    }
    if (this.dragedDatanode.children != null && this.dragedDatanode.children.length >= 0) {
      event.event.dataTransfer.dropEffect = "none"
      this.isPresentFlag = true;
    }
    this.checkDragNodeAvailability(event.event, event.row);
  }

  onMenuDrop(event: any) {
    this.onDrop(event.event, event.row, event.index, this.topBarData);
  }

  ontopMenuTextClick(row: any) {
    row.isEditable = false;

  }

  onTopBarRemoveClick(row: any, index: any) {
    this.removeRows(row, this.topBarData);
    let cloneObj = Object.assign(this.topBarData);
    cloneObj.forEach((obj: any, index: any) => {
      if (obj.hasOwnProperty('children') && obj.children && obj.children.length > 0) {
        obj.children.forEach((opt: any, index: any) => {
          if (row.nodeId === opt.nodeId) {
            obj.children.splice(index, 1)
          }
        });
      }
      if (row.nodeId === obj.nodeId) {
        cloneObj.splice(index, 1);
      }
    });
    this.topBarData = cloneObj;
    this.cdf.detectChanges();
    let data: any = [];
    data = data.concat(this.topBarData, this.treeLocalData);
    this.removeData(row, index, data);
  }

  deleteSideNavUnwantedVariables() {
    let clonedData = Object.assign(this.treeLocalData);
    clonedData.forEach((obj: any, index: any) => {
      if (obj.hasOwnProperty('children') && obj.children && obj.children.length > 0) {
        obj.children.forEach((opt: any, index: any) => {
          delete opt.isEditable,
            delete opt.level,
            delete opt.nodeId
        });
      }
      if (obj) {
        delete obj.isEditable,
          delete obj.level,
          delete obj.nodeId
      }
    });
    this.treeLocalData = clonedData;
  }

  deleteTopBarUnwantedVariables() {
    let clonedtopData = Object.assign(this.topBarData);
    clonedtopData.forEach((obj: any, index: any) => {
      if (obj.hasOwnProperty('children') && obj.children && obj.children.length > 0) {
        obj.children.forEach((opt: any, index: any) => {
          delete opt.isEditable,
            delete opt.level,
            delete opt.nodeId
        });
      }
      if (obj) {
        delete obj.isEditable,
          delete obj.level,
          delete obj.nodeId
      }
    });
    this.topBarData = clonedtopData;
  }
  //USED TO SAVE MENU DATA
  saveMenuData() {
    this.validationMsgArray = [];
    this.loaderService.showLoader();
    this.collapseAll();
    this.asyncFlag = true;
    let sideNavData: any;
    let topBarData: any;
    let response: any;
    let requestJson = {
      "menuType": this.menuModel.menuTypeId,
      "sideNavMenu": this.treeLocalData,
      "topNavMenu": this.topBarData
    }
    this.http.post('/api/dna/appmenus/save', requestJson).subscribe(
      res => {
        response = res;
      },
      err => {
        this.validationMsgArray.push('Unable to connect to server');
        this.createErrorData();
        this.asyncFlag = false;
        this.loaderService.hideLoader();
      },
      () => {
        if (response.success) {
          this.asyncFlag = false;
          this.loaderService.hideLoader();
          this.msgData.push('Menus Saved Successfully');
          this._notificationService.showSuccessData(this.msgData);
          this.uiCreateDEvent({ ui_created: true });
        } else {
          this.asyncFlag = false;
          this.loaderService.hideLoader();
          this.validationMsgArray.push(response.errorMessage);
          this.createErrorData();
        }
      }
    );
  }
  uiCreateDEvent(string: any) {
    window.postMessage(string, window.location.origin);
  }

}
export class MenuModel {
  menuTypeId: number;
  constructor() {
    this.menuTypeId = 1;
  }
}
