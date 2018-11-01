/**
 * Created by pratik on 22/2/18.
 */
import { HttpClient } from "@angular/common/http";
import {AfterViewInit, Component, ViewChild} from "@angular/core";
import { MessagingService } from "platform-commons";
import { OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RouteComponent } from "../route.component";
import { LocalStorageService, NotificationService } from "platform-commons";
import { AmexioNavBarComponent } from "amexio-ng-extensions";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: "home",
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild(AmexioNavBarComponent) public navtest: AmexioNavBarComponent;
  @ViewChild("navTab") navTab: any;
  @ViewChild("topnavbarid") topnavbarid: any;
  paddingtop: number;
  isFullScreen: boolean;
  fullscreenCheck: any;
  isRouteLoading: boolean = false;
  projectname: any;
  projectUUID: any;
  menus: any[] = [];
  projectmenus: any[] = [];
  projectList: any;
  confirmdialogue: boolean;
  msgData: any[] = [];
  validationMsgArray: any = [];
  // isValidateForm: boolean = false;
  projectSelectedFlag: boolean;
  getProjectName: any;
  userName: any;
  getpath: any;
  vm = null;
  publicIpAddress: any;
  previewURL: any;
  navigationpath: any;
  tabDataStore: any[] = [];
  warningdialogue: boolean;
  projectChangeMsg: string = '';
  sessiondialogue: boolean;
  sessionMsg: string = '';
  showVersionWindow : boolean;
  productinfo:any;
  showMigratedStatusDialogue = false;
  serviceMigrationFlag:boolean=false;
  confirmTaskdialogue:boolean=false;
  menuconfirmdialogue:boolean=false;
  constructor(
    public msgService: MessagingService,
    private _route: Router,
    private ls: LocalStorageService,
    private cookieService: CookieService,
   public _notificationService:NotificationService,
    private http: HttpClient
  ) {
    this.fullscreenCheck = this.checkFullScreen.bind(this);
    this.msgService.getMessage(this.fullscreenCheck);
    this.getProjectName = this.getProjectData.bind(this);
    this.msgService.getMessage(this.getProjectName);
    this.getpath = this.getnavigatepath.bind(this);
    this.msgService.getMessage(this.getpath);
    this.getpath = this.getnavigatepath.bind(this);
    this.msgService.getMessage(this.getpath);
    if(this.cookieService.get('tokenid')){
      this.getUserName();
      this.getAppMenus();
      this.getProjectDetails();
    }
  }
  ngOnInit() {
    let checkCookie: any;
    checkCookie = this.cookieService.get('tokenid');
    if (!checkCookie) {

      this._route.navigate(['login']);
    }
        this.getProductVersion();
  }
  ngAfterViewInit() {
    this.paddingtop = this.navtest.navbar.nativeElement.offsetHeight + 5;
  }
  checkFullScreen(data: any) {
    if (data.data.hasOwnProperty("fullscreen")) {
      this.isFullScreen = data.data.fullscreen;
    }
  }
  onLogoClick(){
    this.showVersionWindow=true;
  }
  onTitleClick(){
    this.showVersionWindow=true;
  }
  closeWindow(){
    this.showVersionWindow=false;
  }

  getProductVersion(){
      let productData:any;
    this.http.get('assets/json/productinfo.json').subscribe(
      response=>{
        productData=response;
      },
      error=>{

      },
      ()=>{
        this.productinfo=productData;
      }
    );
  }
  goToHelp(navTab:any){
  let title = "Help";
      if (!navTab.setActiveTab(title)) {
        let cmp = navTab.addDynamicTab(title, "black", true, RouteComponent);
        cmp.navigate("home/help");
      }
  }
  getnavigatepath(data: any) {
    if (data.data.hasOwnProperty("path", "title")) {
      let navigationpath = data.data.path;
      let title = data.data.title;
      if (!this.navTab.setActiveTab(title)) {
        let cmp = this.navTab.addDynamicTab(title, "black", true, RouteComponent);
        cmp.navigate(navigationpath);
      }
    }
  }
  onImageClick(imageId: string) {
    if (imageId == "api") {
      window.open("https://amexio.tech/amexio-api");
    } else if (imageId == "sed") {
      window.open("http://demo.amexio.tech/");
    } else if (imageId == "ee") {
      window.open("http://eedemo.amexio.tech/");
    } else if (imageId == "sourcecode") {
      window.open("http://source.amexio.tech/");
    } else if (imageId == "features") {
      window.open("https://amexio.tech");
    } else if (imageId == "download") {
      window.open("https://amexio.tech/download");
    }
  }

  // okErrorBtnClick() {
  //   // this.isValidateForm = false;
  //   this.validationMsgArray = [];
  // }

  //THIS IS USED TO GET TOP BAR MENUS
  getAppMenus() {
    let appData: any;
    this.http.get("/api/ide/ApplicationMenu/findApplicationMenus").subscribe(
      response => {
        appData = response;
      },
      error => {
         this.deleteTokenIdFromCookieAndRedirect();
      },
      () => {
        this.setMenus(appData);
        // this.msgData.push(appData.successMessage)
        // this._notificationService.showSuccessData(this.msgData)
      }
    );
  }

  //THIS IS USED FOR ROUTE TO PROJECT CREATION UI
  onNavLinkclick(navTab: any) {
    let checkCookie: any;
    checkCookie = this.cookieService.get('tokenid');
    if (checkCookie) {
      let title = "Project Creation";
        let cmp = navTab.addDynamicTab(title, "black", true, RouteComponent);
        cmp.navigate("home/project/create");
    } else {
      this.sessiondialogue = true;
      this.sessionMsg = 'Session time out, Please login again';
    }
  }
  setMenus(appData: any) {
    this.menus = [];
    appData.response.forEach((opt: any) => {
      if (!opt.isDisable) {
        this.menus.push(opt);
      }
    });
  }

  //THIS IS USED TO ACTIVATE OR ADD TAB ON CLICK OF NAV LINK
  createTab(navTab: any, event: any) {
    if (event.data.node.routerLink == 'home/designPipeline/service-defination' || event.data.node.routerLink =='home/codepipeline/gitConfiguration' || event.data.node.routerLink =='home/designPipeline/menu-builder') {
           this.serviceMigrationFlag = true;
      if (!this.ls.get('platformInfo').projectMigrated) {
             this.showMigratedStatusDialogue = true;
      } else {
            let title = event.data.node.text;
            if (!navTab.setActiveTab(event.data.node.text)) {
              let cmp = navTab.addDynamicTab(title, "black", true, RouteComponent);
              cmp.navigate(event.data.node.routerLink);
            }
      }
    } else {
           let title = event.data.node.text;
          if (!navTab.setActiveTab(event.data.node.text)) {
            let cmp = navTab.addDynamicTab(title, "black", true, RouteComponent);
            cmp.navigate(event.data.node.routerLink);
          }
    }

  }

  //THIS METHOD IS USED TO ROUTE TO PERTICULAR UI ON CLICK OF NAV LINK
  addtab(navTab: any, event: any) {
    let checkCookie: any;
    this.msgData=[];
    // this.navTab.setActiveTab(1);
    checkCookie = this.cookieService.get('tokenid');
    if (checkCookie) {

      this._route.navigate([event.data.node.routerLink]);
      if (event.data.node.isLeaf) {
        if (event.data.node.isProjectDependent) {
          if (this.projectSelectedFlag) {
            this.createTab(navTab, event);
          } else {
            this.msgData.push("Please select/create project ");
            this._notificationService.showWarningData(this.msgData);
          }
        }
        if (
          !event.data.node.isProjectDependent &&
          event.data.node.text !== "Logout"
        ) {
          this.createTab(navTab, event)
        }
        if (event.data.node.text == "Logout") {
          this.logout();
        }
      }
    }
    else {
      this.sessiondialogue = true;
      this.sessionMsg = 'Session time out, Please login again';
    }
  }

  //THIS IS USED TO SHOW CONFIRMATION MESSEGE ON LOGOUT CLICK
  logout() {
    this.confirmdialogue = !this.confirmdialogue;
  }

  //THIS IS USED TO LOGOUT AFTER CONFIRMATION FROM USER
  checkStatus(data: any) {
    let LogoutMsg: any;
    if (data === "ok") {
      let response: any;
      const headers = new Headers({
        "Content-Type": "application/json;charset=UTF-8"
      });
      this.http.post("/api/auth/login/logout", headers).subscribe(
        res => {
          response = res;
        },
        err => {
          this.validationMsgArray.push("Unable to connect to server");
          // this.isValidateForm = true;msgObj
          this._notificationService.showerrorData('',this.validationMsgArray);
        },
        () => {
          this._route.navigate(['login']);
          this.cookieService.delete("tokenid");
          localStorage.removeItem('platformInfo');
        }
      );

    }
  }
    showtask() {
    this.confirmTaskdialogue = !this.confirmTaskdialogue;
  }
  checkTaskStatus(data: any) {
      const taskObject = { data: {
        path: 'home/codepipeline/task-ui',
        title: 'Task Details'
      }};
      this.getnavigatepath(taskObject);
  }


  //GET NAME OF LOGGED IN USER
  getUserName() {
    let userData: any;
    const headers = new Headers({
      "Content-Type": "application/json;charset=UTF-8"
    });
    this.http.get("/api/user/person/findLoggedInUserInfo").subscribe(
      response => {
        userData = response;
      },
      error => {
         this.deleteTokenIdFromCookieAndRedirect();
       },
      () => {
        if (userData.success) {
          this.userName = userData.response.userName;
        }
      }
    );
  }

  //GET  NAME OF SELECTED PROJECT OR WORKING PROJECT
  getProjectData(data: any) {
    if (data.data.hasOwnProperty("projectId", "saveproject")) {
      const projectId = data.data.projectId;
      const saveprojectFlag = data.data.saveproject;
      this.msgData=[];
      let projectdata: any;
      this.http
        .get("/api/project/project/findByProjectUUID?projectUUID=" + projectId)
        .subscribe(
        response => {
          projectdata = response;
        },
        err => {
          this.validationMsgArray.push("Unable to connect to server");
          this._notificationService.showerrorData('',this.validationMsgArray);
          // this.isValidateForm = true;
        },
        () => {
          if (projectdata.success) {
            if (
              !projectdata.response.hasOwnProperty('desire3dVersionId') ||
              projectdata.response.desire3dVersionId == null ||
              projectdata.response.desire3dVersionId !=
              this.ls.get('platformInfo').desire3dversionid
            ) {
              this.projectname = projectdata.response.projectName;
              this.projectSelectedFlag = true;
              this.showMigratedStatusDialogue = true;
              this.warningdialogue = false;
             this.projectChangeMsg = 'Current workspace is set to ' + projectdata.response.projectName + '  project';
            }else {
              this.setLocalStorageData(true);
              if (this.projectname == projectdata.response.projectName || saveprojectFlag) {
                this.projectname = projectdata.response.projectName;
                this.projectSelectedFlag = true;
                this.warningdialogue = false;
                this.msgData=[];
                if(saveprojectFlag){
                 this.closeTabscall()
                this.showtask();
                }

              } else {
                this.projectname = projectdata.response.projectName;
                this.projectSelectedFlag = true;
                this.projectChangeMsg = 'Current workspace is set to ' + projectdata.response.projectName + '  project';
                this.warningdialogue = true;
              }
            }
          }
        }
        );
    }
  }

  migrateProject(event: any) {
    if (event === 'ok') {
      let response: any;
      /*  this.loaderService.showLoader();*/
      this.showMigratedStatusDialogue = false;
      this.warningdialogue = false;
      this.http.get('/api/project/migration/project').subscribe(
        (res: any) => {
          response = res;
        },
        (error: any) => {
         console.log(error);
        } ,
        ()=>{
          console.log('Migration successfully done');
        }
      );
      this.closeTabscall();
      const taskObject = { data: {
        path: 'home/codepipeline/task-ui',
        title: 'Task Details'
      }};
      this.getnavigatepath(taskObject);
      this.serviceMigrationFlag = false;
      this.setLocalStorageData(true);
      this.showMenu();
    } else {
        this.setLocalStorageData(false);
      this.showMigratedStatusDialogue = false;
      if (!this.serviceMigrationFlag) {
        this.warningdialogue = true;
      } else {
        this.serviceMigrationFlag = false;
      }
    }
  }
 showMenu(){
   this.menuconfirmdialogue = !this.menuconfirmdialogue;
 }
 menucheckStatus(data:any){
 if(data==="ok"){
    const menuObject = { data: {
        path: 'home/designPipeline/menu-builder',
        title: 'Menu Builder'
      }};
      this.getnavigatepath(menuObject);
 }
 }
  setLocalStorageData(status: boolean) {
    let desire3dversionid = this.ls.get('platformInfo');
    this.ls.remove('platformInfo');
    let platformInfo = {
      "desire3dversionid": 2,
      "projectMigrated": status
    };
    this.ls.set('platformInfo', platformInfo);
  }


  okWarningBtnClick() {
    this.warningdialogue = false;
    this.closeTabscall();

  }
  okSessionBtnClick() {
    this.sessiondialogue = false;
    this._route.navigate(['login']);
  }
  //CLOSE ALL OTHER  OPEN  TABS EXCEPT WORKING TAB
  closeTabscall() {
    let tabarray = ["Project Creation"];
    this.navTab.closeTabs(tabarray);
  }

  //ON RELOAD SHOW WORKING PROJECT NAME
  getProjectDetails() {
    let projectDetails: any;
    this.http.get("/api/project/project/getProjectDetails").subscribe(
      response => {
        projectDetails = response;
      },
      error => {
         this.deleteTokenIdFromCookieAndRedirect();
      },
      () => {
        if (projectDetails.success) {
          this.projectname = projectDetails.response.projectName;
          if (this.projectname) {
            this.projectSelectedFlag = true;
          }
        }
      }
    );
  }

  //SHOWS OR ACTIVATE PREVIEW OF WORKING PROJECT
  onPreview(navTab) {
    let checkCookie: any;
    checkCookie = this.cookieService.get('tokenid');
    if (checkCookie) {
     let title = "App Preview";
      if (!navTab.setActiveTab(title)) {
        let cmp = navTab.addDynamicTab(title, "black", true, RouteComponent);
        cmp.navigate("home/designPipeline/preview");
      }
    } else {
      this.sessiondialogue = true;
      this.sessionMsg = 'Session time out, Please login again';
    }
  }


   deleteTokenIdFromCookieAndRedirect(){
     if(this.cookieService.get('tokenid')){
       this.cookieService.delete('tokenid');
       this._route.navigate(['login']);
     }

   }
}

