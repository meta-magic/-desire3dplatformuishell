import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import sdk from '../../sdk';
import { Renderer2 } from '@angular/core';
@Component({
  selector: 'live-code',
  template: `
  <div  [ngClass]="{'loadingnav':isLoading}"  [attr.id]="elementId"></div>
  `
})
export class LiveCodeComponent implements OnInit {
  elementId: string;
  hostIpAddress: string;
  protocol: string;
  eventListener: Function;
  vm: any = null;
  isLoading: boolean = true;
  constructor(private http: HttpClient, private renderer: Renderer2) {
    this.findInstance();
  }
  ngOnInit() {
    this.elementId = new Date().getTime() + '_preview';
  }
  ngAfterViewInit() {
    this.eventListener = this.renderer.listen(
      'window',
      'message',
      this.handleMessage.bind(this)
    );
  }

  handleMessage(event: Event) {
    let message = event as MessageEvent;
    if (message && message.data) {
      if (message.data.ui_created) {
        setTimeout(() => {
          this.renderNGProject(true);
        }, 2000);
      }
    }
  }

  //FINDING CURRENT USER INSTANCE FOR INSTANCE ID
  findInstance() {
    this.renderNGProject(true);
  }
  //THIS METHOD IS USED FOR RENDER PROJECT IN STACKBLITZ
  renderNGProject(entireProject: boolean) {
    let responsedata: any;
    this.http.get('/api/codepipeline/cps/preview').subscribe(
      data => {
        responsedata = data;
        if (entireProject) {
          this.renderProject(responsedata.response);
        } else {
          this.fetchDeltaCode(responsedata.response);
        }
      },
      error => {},
      () => {}
    );
  }

  //THIS METHOD IS USED TO ITERATE FILE OBJECT FROM LIST AND OPEN PROJECT
  renderProject(data: any[]) {
    let filenodes: any = {};
    data.forEach(node => {
      filenodes[node.key] = node.value;
    });

    this.openProject(filenodes);
  }

  //BASED UPON PROJECT INFO RUN PROJECT IN STACKLITZ USING SDK
  openProject(fetchfiles: any) {
    // Create the project payload.
    const project = {
      files: fetchfiles,
      title: 'Test Stack Blitz Example',
      description: 'Test Stack Blitz Example',
      template: 'angular-cli',
      tags: ['stackblitz', 'sdk'],
      dependencies: {
        'core-js': '^2.4.1',
        rxjs: '^5.5.2',
        'zone.js': '^0.8.14',
        '@angular/core': '^5.0.0',
        '@angular/forms': '^5.0.0',
        '@angular/common': '^5.0.0',
        '@angular/http': '^5.0.0',
        '@angular/router': '^5.0.0',
        '@angular/compiler': '^5.0.0',
        '@angular/platform-browser': '^5.0.0',
        '@angular/platform-browser-dynamic': '^5.0.0',
        '@angular-devkit/core': '^0.6.3',
        'amexio-ng-extensions': '^4.2.0',
        'font-awesome': '4.7.0'
      }
    };
    let rect = document.getElementById(this.elementId).getBoundingClientRect();
    sdk
      .embedProject(this.elementId, project, {
        height: window.innerHeight - 180,
        hideDevTools: true,
        view: 'preview'
      })
      .then(vm => {
        this.vm = vm;
      });
    if (rect) {
      this.isLoading = false;
    }
    sdk.connect(document.getElementById(this.elementId) as HTMLFrameElement);
  }

  //TO FETCH CODE
  fetchDeltaCode(data: any[]) {
    let filenodes = {};
    data.forEach(node => {
      filenodes[node.key] = node.value;
    });

    if (this.vm) {
      this.vm.applyFsDiff({
        create: filenodes
      });
    } else {
      this.openProject(filenodes);
    }
  }
}


