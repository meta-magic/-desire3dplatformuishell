/**
 * Created by ketangote on 12/1/17.
 */

import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChild
} from '@angular/core';
import { TabPill } from '../basic/tab.pill.component';

@Component({
  selector: 'vertical-right-tab-view',
  template: `

    <div class="table">
      <div class="tablerow">
        <div class="tablecol verticalalign-tabcontent">
          <div class="tabcontent">
            <ng-content></ng-content>
          </div>
        </div>

        <div class="tablecol verticalalign-tabright">
          <div class="verticalnavtab verticalnavtab-right">
            <ul #tab>
              <li *ngFor="let tabnode of tabPills">
                <div class="defaultnode" [ngClass]="{'rightactivetab':tabnode.active}"    (click)="onTabClick(tabnode)">
                  <span *ngIf="tabnode.iconClass" [ngClass]="tabnode.iconClass"  aria-hidden="true"></span>
                  <span>{{tabnode.title}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>


  `
})
export class VerticalRightTabComponent
  implements OnInit, AfterViewInit, AfterContentInit {
  @Input() closable: boolean;

  @Input() position: string;

  @Input() tabPills: TabPill[];

  @ViewChild('tab', { read: ElementRef })
  public tabs: ElementRef;

  @ContentChildren(TabPill) queryTabs: QueryList<TabPill>;

  @Output() onClick: any = new EventEmitter<any>();

  @Input() tabLocalData: any;

  tabPreviewData: any;

  showprev: boolean = false;

  shownext: boolean = false;

  content: string;

  constructor(public render: Renderer2) {}

  ngOnInit() {
    //render tab pills from binded input
  }

  ngAfterViewInit() {
    if (
      this.tabs.nativeElement.scrollWidth > this.tabs.nativeElement.clientWidth
    ) {
      this.shownext = true;
    }
  }

  ngAfterContentInit() {}

  onTabClick(tab: any) {
    for (let i = 0; i < this.tabPills.length; i++) {
      if (this.tabPills[i] === tab) {
        this.tabPills[i]['active'] = true;
        this.onClick.emit(tab);
      } else {
        this.tabPills[i]['active'] = false;
      }
    }

    // this.content = tab.title;
  }

  next() {
    let nxt = this.tabs.nativeElement;
    nxt.scrollLeft = nxt.scrollLeft + 200;

    if (nxt.scrollWidth - nxt.offsetWidth - nxt.scrollLeft <= 0) {
      this.shownext = false;
    }
    this.showprev = true;
  }

  previous() {
    let prev = this.tabs.nativeElement;
    prev.scrollLeft = prev.scrollLeft - 200;

    if (prev.scrollLeft == 0) {
      this.showprev = false;
    }
    this.shownext = true;
  }
}
